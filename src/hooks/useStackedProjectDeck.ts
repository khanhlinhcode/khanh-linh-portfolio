import { useEffect, useRef } from 'react';

const DESKTOP_STACK_QUERY = '(min-width: 1024px) and (min-height: 620px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const STACK_TOP_GAP = 24;
const STACK_STEP = 18;
const SCALE_STEP = 0.03;
const OPACITY_STEP = 0.08;
const MAX_DEPTH = 2;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function getScrollContainer(element: HTMLElement) {
  let parent = element.parentElement;

  while (parent && parent !== document.body && parent !== document.documentElement) {
    const overflowY = window.getComputedStyle(parent).overflowY;

    if (overflowY === 'auto' || overflowY === 'scroll') {
      return parent;
    }

    parent = parent.parentElement;
  }

  return window;
}

export function useStackedProjectDeck() {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;

    if (!deck) {
      return;
    }

    const stickyItems = Array.from(
      deck.querySelectorAll<HTMLElement>('[data-project-sticky]'),
    );
    const pages = Array.from(deck.querySelectorAll<HTMLElement>('[data-project-page]'));

    if (stickyItems.length < 2 || stickyItems.length !== pages.length) {
      return;
    }

    const desktopStack = window.matchMedia(DESKTOP_STACK_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const scrollContainer = getScrollContainer(deck);
    const scrollTarget: EventTarget = scrollContainer;
    let frameId = 0;
    let resizeFrameId = 0;
    let controllerEnabled = false;
    let isNearViewport = false;
    let isDisposed = false;
    let headerHeight = 78;

    const previousValues = pages.map(() => ({
      active: false,
      covered: false,
      depth: Number.POSITIVE_INFINITY,
      opacity: Number.POSITIVE_INFINITY,
      scale: Number.POSITIVE_INFINITY,
    }));

    const readHeaderHeight = () => {
      headerHeight =
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        ) || 78;
    };

    const clearPageState = () => {
      pages.forEach((page, index) => {
        page.style.removeProperty('--stack-scale');
        page.style.removeProperty('--stack-opacity');
        page.style.removeProperty('--stack-depth');
        delete page.dataset.stackActive;
        delete page.dataset.stackCovered;
        delete page.dataset.liquidLandingDisabled;
        page.inert = false;
        previousValues[index] = {
          active: false,
          covered: false,
          depth: Number.POSITIVE_INFINITY,
          opacity: Number.POSITIVE_INFINITY,
          scale: Number.POSITIVE_INFINITY,
        };
      });
    };

    const updateStack = () => {
      frameId = 0;

      if (
        isDisposed ||
        !controllerEnabled ||
        !isNearViewport ||
        document.visibilityState === 'hidden'
      ) {
        return;
      }

      // Read phase: sticky wrappers are intentionally untransformed, so these
      // measurements stay stable while the inner pages scale.
      const containerTop = scrollContainer instanceof HTMLElement
        ? scrollContainer.getBoundingClientRect().top
        : 0;
      const itemRects = stickyItems.map((item) => item.getBoundingClientRect());
      const stickyTop = containerTop + headerHeight + STACK_TOP_GAP;
      let activeIndex = 0;

      for (let index = 1; index < itemRects.length; index += 1) {
        if (itemRects[index].top <= stickyTop + 1) {
          activeIndex = index;
        }
      }

      let transitionProgress = 0;

      if (activeIndex < itemRects.length - 1) {
        const nextTop = itemRects[activeIndex + 1].top;
        const transitionRange = Math.max(itemRects[activeIndex].height - STACK_STEP, 1);
        transitionProgress = clamp(1 - (nextTop - stickyTop) / transitionRange, 0, 1);
      }

      // Write phase: only compositor-friendly variables and discrete state
      // attributes are changed.
      pages.forEach((page, index) => {
        const isActive = index === activeIndex;
        const isCovered = index < activeIndex;
        const rawDepth = index <= activeIndex
          ? activeIndex - index + transitionProgress
          : 0;
        const depth = clamp(rawDepth, 0, MAX_DEPTH);
        const scale = 1 - depth * SCALE_STEP;
        const opacity = 1 - depth * OPACITY_STEP;
        const previous = previousValues[index];

        if (Math.abs(previous.scale - scale) > 0.0005) {
          page.style.setProperty('--stack-scale', scale.toFixed(4));
          previous.scale = scale;
        }

        if (Math.abs(previous.opacity - opacity) > 0.0005) {
          page.style.setProperty('--stack-opacity', opacity.toFixed(4));
          previous.opacity = opacity;
        }

        if (Math.abs(previous.depth - depth) > 0.01) {
          page.style.setProperty('--stack-depth', depth.toFixed(3));
          previous.depth = depth;
        }

        if (previous.active !== isActive) {
          if (isActive) {
            page.dataset.stackActive = 'true';
          } else {
            delete page.dataset.stackActive;
          }
          previous.active = isActive;
        }

        if (previous.covered !== isCovered) {
          if (isCovered) {
            page.dataset.stackCovered = 'true';
            page.dataset.liquidLandingDisabled = 'true';
          } else {
            delete page.dataset.stackCovered;
            delete page.dataset.liquidLandingDisabled;
          }
          page.inert = isCovered;
          previous.covered = isCovered;
        }
      });
    };

    const scheduleUpdate = () => {
      if (frameId || !controllerEnabled || !isNearViewport || document.hidden) {
        return;
      }

      frameId = window.requestAnimationFrame(updateStack);
    };

    const handleScroll = () => {
      scheduleUpdate();
    };

    const setControllerMode = () => {
      const shouldEnable = desktopStack.matches && !reducedMotion.matches;

      if (shouldEnable === controllerEnabled) {
        if (shouldEnable) {
          scheduleUpdate();
        }
        return;
      }

      controllerEnabled = shouldEnable;

      if (controllerEnabled) {
        readHeaderHeight();
        deck.dataset.stackController = 'true';
        scrollTarget.addEventListener('scroll', handleScroll, { passive: true });

        if (isNearViewport) {
          deck.dataset.stackReady = 'true';
          scheduleUpdate();
        }
        return;
      }

      scrollTarget.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      delete deck.dataset.stackController;
      delete deck.dataset.stackReady;
      clearPageState();
    };

    const handleResize = () => {
      if (!controllerEnabled || resizeFrameId) {
        return;
      }

      resizeFrameId = window.requestAnimationFrame(() => {
        resizeFrameId = 0;
        readHeaderHeight();
        scheduleUpdate();
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        delete deck.dataset.stackReady;
        return;
      }

      if (controllerEnabled && isNearViewport) {
        deck.dataset.stackReady = 'true';
        scheduleUpdate();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== deck) {
            const itemIndex = stickyItems.indexOf(entry.target as HTMLElement);

            if (entry.isIntersecting && itemIndex >= 0) {
              pages[itemIndex].dataset.projectEntered = 'true';
              observer.unobserve(entry.target);
            }
            return;
          }

          isNearViewport = entry.isIntersecting;

          if (!isNearViewport) {
            window.cancelAnimationFrame(frameId);
            frameId = 0;
            delete deck.dataset.stackReady;
            return;
          }

          if (controllerEnabled && !document.hidden) {
            deck.dataset.stackReady = 'true';
            scheduleUpdate();
          }
        });
      },
      {
        root: scrollContainer instanceof HTMLElement ? scrollContainer : null,
        rootMargin: '0px 0px -8% 0px',
        threshold: [0, 0.04],
      },
    );

    observer.observe(deck);
    stickyItems.forEach((item) => observer.observe(item));
    desktopStack.addEventListener('change', setControllerMode);
    reducedMotion.addEventListener('change', setControllerMode);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    setControllerMode();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(resizeFrameId);
      scrollTarget.removeEventListener('scroll', handleScroll);
      desktopStack.removeEventListener('change', setControllerMode);
      reducedMotion.removeEventListener('change', setControllerMode);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      delete deck.dataset.stackController;
      delete deck.dataset.stackReady;
      pages.forEach((page) => delete page.dataset.projectEntered);
      clearPageState();
    };
  }, []);

  return deckRef;
}

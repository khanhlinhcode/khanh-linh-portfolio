import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
};

type ViewportInsets = {
  horizontal: number;
  top: number;
  bottom: number;
};

type AnchorSide = 'bottom' | 'left' | 'right';

type LiquidAnchor = Point & {
  element: HTMLElement;
};

const flowAnchorDefinitions: Array<{ selector: string; side: AnchorSide }> = [
  { selector: '.hero-actions .button:first-child', side: 'bottom' },
  { selector: '#about .section-copy', side: 'right' },
  { selector: '#skills .skill-tier[data-tier="ai"]', side: 'left' },
  { selector: '#experience .timeline-block:first-child', side: 'right' },
  { selector: '#projects .project-card.featured, #projects .project-card:first-child', side: 'left' },
  { selector: '#education', side: 'right' },
  { selector: '#contact .contact-actions', side: 'left' },
  { selector: '#live-work .live-project-card:first-child', side: 'right' },
];

const landingCandidateSelector = [
  'main .button:not(.is-disabled)',
  'main .hero-showcase',
  'main .section-copy',
  'main .summary-strip > div',
  'main .about-card',
  'main .skill-card',
  'main .timeline-block',
  'main .project-card',
  'main .live-project-card',
  'main .info-block',
  'main .cert-list > div',
  'main .contact-panel',
].join(', ');

const burstFragments = [
  { delay: 0, rotate: -68, x: -58, y: -42 },
  { delay: 32, rotate: -20, x: -18, y: -61 },
  { delay: 14, rotate: 24, x: 14, y: -64 },
  { delay: 46, rotate: 68, x: 51, y: -42 },
  { delay: 20, rotate: 108, x: 63, y: -4 },
  { delay: 54, rotate: 148, x: 48, y: 39 },
  { delay: 26, rotate: 188, x: 8, y: 57 },
  { delay: 62, rotate: 220, x: -26, y: 53 },
  { delay: 18, rotate: 258, x: -57, y: 31 },
  { delay: 42, rotate: 302, x: -64, y: -8 },
];

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

const smootherstep = (value: number) => value * value * value * (value * (value * 6 - 15) + 10);

const seededUnit = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const TRAIL_FRAME_INTERVAL = 1000 / 30;
const MOBILE_BURST_TRAVEL_THRESHOLD = 14;

export default function LiquidJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const veilRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const trail = trailRef.current;
    const lens = lensRef.current;
    const veil = veilRef.current;
    const lensPosition = lens?.parentElement;
    const fragments = root ? Array.from(root.querySelectorAll<HTMLElement>('.liquid-fragment')) : [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactMotion = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    const narrowViewport = window.matchMedia('(max-width: 420px)');
    const simplifiedMotion = window.matchMedia('(max-width: 1080px), (pointer: coarse)');

    if (!root || !trail || !lens || !veil || !lensPosition || reducedMotion.matches) {
      return;
    }

    let flowAnchors: LiquidAnchor[] = [];
    let landingCandidates: HTMLElement[] = [];
    let liveProjectCards: HTMLElement[] = [];
    let liveProjectRange: { top: number; bottom: number } | undefined;
    const visibleLandingCandidates = new Set<HTMLElement>();
    let current: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let target: Point = current;
    let tailPoint: Point = current;
    let frameId = 0;
    let scrollFrameId = 0;
    let measureFrameId = 0;
    let settleTimer = 0;
    let contactTimer = 0;
    let dissolveTimer = 0;
    let activeContact: HTMLElement | undefined;
    let landingAnimation: Animation | undefined;
    let fragmentAnimations: Animation[] = [];
    let landingCandidateObserver: IntersectionObserver | undefined;
    let isMoving = false;
    let isAnimating = false;
    let started = false;
    let lastFrameTime = performance.now();
    let lastTrailFrameTime = Number.NEGATIVE_INFINITY;
    let lastScrollTime = performance.now();
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let liquidAngle = 0;
    let landingDeadline = 0;
    let landingReady: (() => void) | undefined;
    let flowInsets: ViewportInsets = { horizontal: 20, top: 84, bottom: 72 };
    let landingInsets: ViewportInsets = { horizontal: 18, top: 72, bottom: 52 };
    let scrollTravelSinceSettle = 0;
    let lastLandingElement: HTMLElement | undefined;
    let hasCompletedFirstBurst = false;
    let liveFlightWaypoint = Number.MIN_SAFE_INTEGER;
    let liveFlightTarget: Point | undefined;
    let isDisposed = false;

    const measureInsets = () => {
      if (compactMotion.matches) {
        const headerBottom =
          document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().bottom ?? 0;
        const tokenHeaderHeight =
          Number.parseFloat(
            window.getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
          ) || 72;
        const safeAreaBottom = Number.parseFloat(window.getComputedStyle(veil).paddingBottom) || 0;
        const safeTop = Math.max(headerBottom, tokenHeaderHeight) + 28;
        const safeBottom = 60 + safeAreaBottom;

        flowInsets = { horizontal: 44, top: Math.max(safeTop, 104), bottom: safeBottom };
        landingInsets = { horizontal: 44, top: Math.max(safeTop, 104), bottom: safeBottom };
        return;
      }

      flowInsets = { horizontal: 20, top: 84, bottom: 72 };
      landingInsets = { horizontal: 18, top: 72, bottom: 52 };
    };

    const measureAnchors = () => {
      measureInsets();

      landingCandidates = Array.from(document.querySelectorAll<HTMLElement>(landingCandidateSelector));
      liveProjectCards = Array.from(
        document.querySelectorAll<HTMLElement>('#live-work .live-project-card'),
      );
      const liveProjectSection = document.querySelector<HTMLElement>('#live-work');

      if (liveProjectSection) {
        const sectionRect = liveProjectSection.getBoundingClientRect();
        liveProjectRange = {
          top: sectionRect.top + window.scrollY,
          bottom: sectionRect.bottom + window.scrollY,
        };
      } else {
        liveProjectRange = undefined;
      }

      liveFlightWaypoint = Number.MIN_SAFE_INTEGER;
      liveFlightTarget = undefined;
      flowAnchors = flowAnchorDefinitions.flatMap(({ selector, side }) => {
        const element = document.querySelector<HTMLElement>(selector);

        if (!element) {
          return [];
        }

        const rect = element.getBoundingClientRect();
        const isCompactAnchor = rect.height < 76;
        const edgeOffset = isCompactAnchor ? 8 : 12;
        const x =
          side === 'bottom'
            ? rect.left + rect.width / 2
            : side === 'left'
              ? rect.left - edgeOffset
              : rect.right + edgeOffset;
        const y =
          side === 'bottom'
            ? rect.bottom + window.scrollY + edgeOffset
            : rect.top + window.scrollY + (isCompactAnchor ? rect.height / 2 : Math.min(42, rect.height * 0.22));
        const anchorHorizontalInset = compactMotion.matches ? flowInsets.horizontal : 22;

        return [
          {
            element,
            x: clamp(x, anchorHorizontalInset, window.innerWidth - anchorHorizontalInset),
            y,
          },
        ];
      });
      flowAnchors.sort((firstAnchor, secondAnchor) => firstAnchor.y - secondAnchor.y);
    };

    const scheduleAnchorMeasurement = () => {
      if (measureFrameId) {
        return;
      }

      measureFrameId = window.requestAnimationFrame(() => {
        measureFrameId = 0;
        measureAnchors();

        if (flowAnchors.length === 0) {
          return;
        }

        lastScrollY = window.scrollY;
        target = started ? getFlowTarget() : getInitialTarget();

        if (!started) {
          current = target;
          tailPoint = target;
        } else {
          current = {
            x: clamp(current.x, flowInsets.horizontal, window.innerWidth - flowInsets.horizontal),
            y: clamp(current.y, flowInsets.top, window.innerHeight - flowInsets.bottom),
          };
          tailPoint = {
            x: clamp(tailPoint.x, flowInsets.horizontal, window.innerWidth - flowInsets.horizontal),
            y: clamp(tailPoint.y, flowInsets.top, window.innerHeight - flowInsets.bottom),
          };
        }

        setPath(1, performance.now(), true);
      });
    };

    const setPath = (angleEase = 1, frameTime = performance.now(), forceTrail = false) => {
      const dx = current.x - tailPoint.x;
      const dy = current.y - tailPoint.y;
      const distance = Math.hypot(dx, dy);
      if (
        !simplifiedMotion.matches &&
        (forceTrail || frameTime - lastTrailFrameTime >= TRAIL_FRAME_INTERVAL)
      ) {
        const curve = clamp(distance * 0.16, 0, 15);
        const direction = dx >= 0 ? 1 : -1;
        const controlX = (tailPoint.x + current.x) / 2 - curve * direction;
        const controlY = (tailPoint.y + current.y) / 2 + curve;
        const path = `M ${tailPoint.x.toFixed(2)} ${tailPoint.y.toFixed(2)} Q ${controlX.toFixed(2)} ${controlY.toFixed(2)} ${current.x.toFixed(2)} ${current.y.toFixed(2)}`;

        trail.setAttribute('d', path);
        lastTrailFrameTime = frameTime;
      }

      if (distance > 0.6) {
        const desiredAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        const angleDelta = ((desiredAngle - liquidAngle + 540) % 360) - 180;
        liquidAngle += angleDelta * angleEase;
      }

      const stretch = clamp(1 + distance / 170 + Math.abs(scrollVelocity) * 0.035, 1, 1.28);
      const squash = clamp(1 - distance / 480 - Math.abs(scrollVelocity) * 0.018, 0.86, 1);
      const angle = liquidAngle.toFixed(2);

      lensPosition.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0) translate3d(-50%, -50%, 0)`;
      lens.style.transform = `rotate(${angle}deg) scaleX(${stretch.toFixed(3)}) scaleY(${squash.toFixed(3)})`;
    };

    const animate = (frameTime: number) => {
      const elapsed = clamp(frameTime - lastFrameTime, 8, 32);
      const speedInfluence = clamp(Math.abs(scrollVelocity) / 2.4, 0, 1);
      const positionEase = 1 - Math.exp(-elapsed / (isMoving ? lerp(68, 46, speedInfluence) : 82));
      const tailEase = 1 - Math.exp(-elapsed / (isMoving ? lerp(164, 132, speedInfluence) : 116));
      const angleEase = 1 - Math.exp(-elapsed / 92);
      lastFrameTime = frameTime;

      current = {
        x: lerp(current.x, target.x, positionEase),
        y: lerp(current.y, target.y, positionEase),
      };
      tailPoint = {
        x: lerp(tailPoint.x, current.x, tailEase),
        y: lerp(tailPoint.y, current.y, tailEase),
      };

      const tailDistance = Math.hypot(current.x - tailPoint.x, current.y - tailPoint.y);
      const maximumTailLength = 82;

      if (tailDistance > maximumTailLength) {
        const tailRatio = maximumTailLength / tailDistance;
        tailPoint = {
          x: current.x - (current.x - tailPoint.x) * tailRatio,
          y: current.y - (current.y - tailPoint.y) * tailRatio,
        };
      }

      setPath(angleEase, frameTime);

      const remaining = Math.hypot(target.x - current.x, target.y - current.y);
      const tailRemaining = Math.hypot(current.x - tailPoint.x, current.y - tailPoint.y);

      if (
        landingReady &&
        ((remaining < 1.5 && tailRemaining < 11) || frameTime >= landingDeadline)
      ) {
        const runLanding = landingReady;
        landingReady = undefined;
        runLanding();
      }

      if (isMoving || remaining > 0.35 || tailRemaining > 0.35) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      isAnimating = false;
    };

    const startAnimation = () => {
      if (isAnimating) {
        return;
      }

      isAnimating = true;
      lastFrameTime = performance.now();
      frameId = window.requestAnimationFrame(animate);
    };

    const getProjectFlightTarget = () => {
      const range = liveProjectRange;
      const focusDocumentY = window.scrollY + window.innerHeight * 0.46;

      if (!range || focusDocumentY < range.top || focusDocumentY > range.bottom) {
        liveFlightWaypoint = Number.MIN_SAFE_INTEGER;
        liveFlightTarget = undefined;
        return undefined;
      }

      const waypointSpan = compactMotion.matches ? 96 : 140;
      const waypoint = Math.floor((window.scrollY - range.top) / waypointSpan);

      if (waypoint === liveFlightWaypoint && liveFlightTarget) {
        return liveFlightTarget;
      }

      let card = liveProjectCards.find(
        (card) => card.dataset.stackActive === 'true' && card.dataset.stackCovered !== 'true',
      );
      let rect = card?.getBoundingClientRect();
      const visibleBottom = window.innerHeight - flowInsets.bottom;

      if (rect && (rect.bottom < flowInsets.top || rect.top > visibleBottom)) {
        card = undefined;
        rect = undefined;
      }

      if (!card || !rect) {
        const visibleCards = liveProjectCards
          .filter(
            (candidate) =>
              visibleLandingCandidates.has(candidate) &&
              candidate.dataset.liquidLandingDisabled !== 'true',
          )
          .map((candidate) => ({ card: candidate, rect: candidate.getBoundingClientRect() }))
          .filter(
            ({ rect: candidateRect }) =>
              candidateRect.bottom >= flowInsets.top && candidateRect.top <= visibleBottom,
          );
        const viewportCenter = window.innerHeight / 2;
        const nearestVisibleCard = visibleCards.reduce<(typeof visibleCards)[number] | undefined>(
          (nearest, candidate) => {
            if (!nearest) {
              return candidate;
            }

            const candidateCenter = candidate.rect.top + candidate.rect.height / 2;
            const nearestCenter = nearest.rect.top + nearest.rect.height / 2;
            return Math.abs(candidateCenter - viewportCenter) <
              Math.abs(nearestCenter - viewportCenter)
              ? candidate
              : nearest;
          },
          undefined,
        );

        card = nearestVisibleCard?.card;
        rect = nearestVisibleCard?.rect;
      }

      if (!card || !rect) {
        return undefined;
      }

      const edgeInset = compactMotion.matches ? 18 : 24;
      const safeLeft = clamp(
        rect.left + edgeInset,
        flowInsets.horizontal,
        window.innerWidth - flowInsets.horizontal,
      );
      const safeRight = clamp(
        rect.right - edgeInset,
        safeLeft,
        window.innerWidth - flowInsets.horizontal,
      );
      const safeTop = clamp(
        rect.top + edgeInset,
        flowInsets.top,
        window.innerHeight - flowInsets.bottom,
      );
      const safeBottom = clamp(
        rect.bottom - edgeInset,
        safeTop,
        window.innerHeight - flowInsets.bottom,
      );
      const cardIndex = Math.max(liveProjectCards.indexOf(card), 0);
      const seed = waypoint + (cardIndex + 1) * 37;
      const horizontalProgress = 0.18 + seededUnit(seed) * 0.64;
      const verticalProgress = 0.18 + seededUnit(seed + 11) * 0.64;
      const edge = Math.abs(waypoint + cardIndex) % 4;

      if (edge === 0) {
        liveFlightTarget = { x: lerp(safeLeft, safeRight, horizontalProgress), y: safeTop };
      } else if (edge === 1) {
        liveFlightTarget = { x: safeRight, y: lerp(safeTop, safeBottom, verticalProgress) };
      } else if (edge === 2) {
        liveFlightTarget = { x: lerp(safeLeft, safeRight, horizontalProgress), y: safeBottom };
      } else {
        liveFlightTarget = { x: safeLeft, y: lerp(safeTop, safeBottom, verticalProgress) };
      }

      liveFlightWaypoint = waypoint;
      return liveFlightTarget;
    };

    const getFlowTarget = () => {
      if (flowAnchors.length === 0) {
        return current;
      }

      const projectFlightTarget = getProjectFlightTarget();

      if (projectFlightTarget) {
        return projectFlightTarget;
      }

      const focusDocumentY = window.scrollY + window.innerHeight * 0.46;
      const first = flowAnchors[0];
      const last = flowAnchors[flowAnchors.length - 1];

      if (focusDocumentY <= first.y) {
        if (!compactMotion.matches) {
          return { x: first.x, y: first.y - window.scrollY };
        }

        return {
          x: clamp(first.x, flowInsets.horizontal, window.innerWidth - flowInsets.horizontal),
          y: clamp(first.y - window.scrollY, flowInsets.top, window.innerHeight - flowInsets.bottom),
        };
      }

      if (focusDocumentY >= last.y) {
        return {
          x: clamp(last.x, flowInsets.horizontal, window.innerWidth - flowInsets.horizontal),
          y: clamp(last.y - window.scrollY, flowInsets.top, window.innerHeight - flowInsets.bottom),
        };
      }

      const segmentIndex = flowAnchors.findIndex(
        (anchor, index) =>
          index < flowAnchors.length - 1 &&
          focusDocumentY >= anchor.y &&
          focusDocumentY <= flowAnchors[index + 1].y,
      );
      const start = flowAnchors[Math.max(segmentIndex, 0)];
      const end = flowAnchors[Math.max(segmentIndex + 1, 1)];
      const progress = clamp((focusDocumentY - start.y) / Math.max(end.y - start.y, 1), 0, 1);
      const easedProgress = smootherstep(progress);
      const arcDirection = segmentIndex % 2 === 0 ? 1 : -1;
      const arc = Math.sin(Math.PI * progress) * Math.min(36, window.innerWidth * 0.024) * arcDirection;
      const verticalDrift = Math.sin(Math.PI * progress) * 12;

      return {
        x: clamp(
          lerp(start.x, end.x, easedProgress) + arc,
          flowInsets.horizontal,
          window.innerWidth - flowInsets.horizontal,
        ),
        y: clamp(
          focusDocumentY - window.scrollY - verticalDrift,
          flowInsets.top,
          window.innerHeight - flowInsets.bottom,
        ),
      };
    };

    const getInitialTarget = () => {
      const firstAnchor = flowAnchors[0];

      if (!started && window.scrollY <= 32 && firstAnchor) {
        const initialBottomInset = compactMotion.matches ? landingInsets.bottom : 64;

        return {
          x: compactMotion.matches
            ? clamp(
                firstAnchor.x,
                landingInsets.horizontal,
                window.innerWidth - landingInsets.horizontal,
              )
            : firstAnchor.x,
          y: clamp(
            firstAnchor.y - window.scrollY,
            landingInsets.top,
            window.innerHeight - initialBottomInset,
          ),
        };
      }

      return getFlowTarget();
    };

    const getClosestEdgePoint = (rect: DOMRect, offset: number, preferTop = false) => {
      const safeRight = window.innerWidth - landingInsets.horizontal;
      const safeBottom = window.innerHeight - landingInsets.bottom;
      const cornerInset = Math.min(16, rect.width * 0.18, rect.height * 0.24);
      const visibleLeft = clamp(rect.left, landingInsets.horizontal, safeRight);
      const visibleRight = clamp(rect.right, landingInsets.horizontal, safeRight);
      const visibleTop = clamp(rect.top, landingInsets.top, safeBottom);
      const visibleBottom = clamp(rect.bottom, landingInsets.top, safeBottom);
      const horizontalStart = Math.min(visibleLeft + cornerInset, visibleRight);
      const horizontalEnd = Math.max(visibleRight - cornerInset, horizontalStart);
      const verticalStart = Math.min(visibleTop + cornerInset, visibleBottom);
      const verticalEnd = Math.max(visibleBottom - cornerInset, verticalStart);
      const horizontalX = clamp(current.x, horizontalStart, horizontalEnd);
      const verticalY = clamp(current.y, verticalStart, verticalEnd);

      if (preferTop) {
        return {
          x: horizontalX,
          y: clamp(rect.top - offset, landingInsets.top, safeBottom),
        };
      }

      const edgePoints: Point[] = [];
      const leftX = rect.left - offset;
      const rightX = rect.right + offset;
      const topY = rect.top - offset;
      const bottomY = rect.bottom + offset;

      if (leftX >= landingInsets.horizontal && leftX <= safeRight) {
        edgePoints.push({ x: leftX, y: verticalY });
      }
      if (rightX >= landingInsets.horizontal && rightX <= safeRight) {
        edgePoints.push({ x: rightX, y: verticalY });
      }
      if (topY >= landingInsets.top && topY <= safeBottom) {
        edgePoints.push({ x: horizontalX, y: topY });
      }
      if (bottomY >= landingInsets.top && bottomY <= safeBottom) {
        edgePoints.push({ x: horizontalX, y: bottomY });
      }

      if (edgePoints.length === 0) {
        return {
          x: horizontalX,
          y: clamp(visibleTop + 8, landingInsets.top, safeBottom),
        };
      }

      const closestPoint = edgePoints.reduce((closest, point) => {
        const pointDistance = Math.hypot(current.x - point.x, current.y - point.y);
        const closestDistance = Math.hypot(current.x - closest.x, current.y - closest.y);
        return pointDistance < closestDistance ? point : closest;
      });

      return {
        x: clamp(
          closestPoint.x,
          landingInsets.horizontal,
          window.innerWidth - landingInsets.horizontal,
        ),
        y: clamp(
          closestPoint.y,
          landingInsets.top,
          window.innerHeight - landingInsets.bottom,
        ),
      };
    };

    const getNearestLandingTarget = () => {
      let nearest: { element: HTMLElement; point: Point; score: number } | undefined;
      const candidateBottomInset = compactMotion.matches ? landingInsets.bottom : 36;

      if (
        !hasCompletedFirstBurst &&
        compactMotion.matches &&
        window.scrollY < window.innerHeight * 0.72
      ) {
        const heroShowcase = document.querySelector<HTMLElement>('.hero-showcase');
        const heroRect = heroShowcase?.getBoundingClientRect();

        if (
          heroShowcase &&
          heroRect &&
          heroRect.width >= 20 &&
          heroRect.height >= 20 &&
          heroRect.bottom >= landingInsets.top &&
          heroRect.top <= window.innerHeight - candidateBottomInset
        ) {
          return {
            element: heroShowcase,
            point: getClosestEdgePoint(heroRect, 10, true),
            score: 0,
          };
        }
      }

      const activeLiveProject = liveProjectCards.find(
        (card) => card.dataset.stackActive === 'true' && card.dataset.stackCovered !== 'true',
      );
      const activeLiveProjectRect = activeLiveProject?.getBoundingClientRect();

      if (
        activeLiveProject &&
        activeLiveProjectRect &&
        activeLiveProjectRect.bottom >= landingInsets.top &&
        activeLiveProjectRect.top <= window.innerHeight - candidateBottomInset
      ) {
        return {
          element: activeLiveProject,
          point: getClosestEdgePoint(activeLiveProjectRect, compactMotion.matches ? 9 : 11),
          score: 0,
        };
      }

      visibleLandingCandidates.forEach((element) => {
        if (element.dataset.liquidLandingDisabled === 'true') {
          return;
        }

        const rect = element.getBoundingClientRect();

        if (
          rect.width < 20 ||
          rect.height < 20 ||
          rect.bottom < landingInsets.top ||
          rect.top > window.innerHeight - candidateBottomInset ||
          rect.right < 0 ||
          rect.left > window.innerWidth
        ) {
          return;
        }

        const isButton = element.matches('.button');
        const point = getClosestEdgePoint(rect, isButton ? 8 : 11);
        const distance = Math.hypot(current.x - point.x, current.y - point.y);
        const score = distance * (isButton ? 0.84 : 1);

        if (!nearest || score < nearest.score) {
          nearest = { element, point, score };
        }
      });

      if (nearest) {
        return nearest;
      }

      const focusY = clamp(
        window.innerHeight * 0.46,
        landingInsets.top,
        window.innerHeight - landingInsets.bottom,
      );
      const fallback = flowAnchors.reduce((closest, anchor) => {
        const currentDistance = Math.abs(anchor.y - window.scrollY - focusY);
        const closestDistance = Math.abs(closest.y - window.scrollY - focusY);
        return currentDistance < closestDistance ? anchor : closest;
      });

      return {
        element: fallback.element,
        point: {
          x: compactMotion.matches
            ? clamp(current.x, landingInsets.horizontal, window.innerWidth - landingInsets.horizontal)
            : fallback.x,
          y: compactMotion.matches
            ? focusY
            : clamp(fallback.y - window.scrollY, landingInsets.top, window.innerHeight - 64),
        },
        score: 0,
      };
    };

    const settleAtNearestAnchor = () => {
      if (flowAnchors.length === 0) {
        return;
      }

      isMoving = false;
      scrollVelocity *= 0.32;
      root.classList.remove('is-moving', 'is-bursting');
      root.classList.add('is-settling');

      const nearest = getNearestLandingTarget();
      const compactBurst = compactMotion.matches;
      const narrowBurst = narrowViewport.matches;
      const suppressRepeatedBurst =
        hasCompletedFirstBurst &&
        compactBurst &&
        scrollTravelSinceSettle < MOBILE_BURST_TRAVEL_THRESHOLD &&
        lastLandingElement === nearest.element;

      if (!suppressRepeatedBurst) {
        root.classList.add('is-veiled');
      }

      target = nearest.point;
      startAnimation();

      window.clearTimeout(contactTimer);
      const landingDistance = Math.hypot(target.x - current.x, target.y - current.y);
      landingDeadline =
        performance.now() +
        (compactBurst
          ? clamp(112 + landingDistance * 0.22, 132, 198)
          : clamp(138 + landingDistance * 0.3, 158, 244));
      landingReady = () => {
        landingAnimation?.cancel();
        landingAnimation = undefined;
        fragmentAnimations.forEach((animation) => animation.cancel());
        fragmentAnimations = [];

        if (suppressRepeatedBurst) {
          scrollTravelSinceSettle = 0;
          root.classList.remove('is-settling', 'is-bursting', 'is-veiled');
          root.classList.add('is-settled');
          return;
        }

        root.classList.add('is-bursting');
        landingAnimation = lens.animate(
          [
            {
              opacity: 1,
              transform: `rotate(${liquidAngle.toFixed(2)}deg) scale3d(1.025, .985, 1)`,
            },
            {
              offset: 0.26,
              opacity: 1,
              transform: `rotate(${liquidAngle.toFixed(2)}deg) scale3d(.965, 1.055, 1)`,
            },
            {
              offset: 0.5,
              opacity: 0.9,
              transform: `rotate(${liquidAngle.toFixed(2)}deg) scale3d(1.1, .9, 1)`,
            },
            {
              opacity: 0,
              transform: `rotate(${liquidAngle.toFixed(2)}deg) scale3d(.28, .28, 1)`,
            },
          ],
          {
            duration: compactBurst ? 248 : 300,
            easing: 'cubic-bezier(.16, 1, .3, 1)',
            fill: 'forwards',
          },
        );
        hasCompletedFirstBurst = true;
        lastLandingElement = nearest.element;
        scrollTravelSinceSettle = 0;
        const activeFragments = narrowBurst
          ? fragments.slice(0, 3)
          : compactBurst
            ? fragments.slice(0, 4)
            : fragments;
        const burstScale = narrowBurst ? 0.55 : compactBurst ? 0.62 : 1;
        const burstDuration = narrowBurst ? 238 : compactBurst ? 252 : 330;

        fragmentAnimations = activeFragments.map((fragment, index) => {
          const burst = burstFragments[index];
          const burstX = burst.x * burstScale;
          const burstY = burst.y * burstScale;

          return fragment.animate(
            [
              {
                opacity: 0,
                transform: 'translate3d(-50%, -50%, 0) rotate(0) scale(.28)',
              },
              {
                offset: 0.16,
                opacity: 1,
                transform: `translate3d(calc(-50% + ${burstX * 0.28}px), calc(-50% + ${burstY * 0.28}px), 0) rotate(${burst.rotate * 0.2}deg) scale(1)`,
              },
              {
                offset: 0.58,
                opacity: 0.82,
                transform: `translate3d(calc(-50% + ${burstX * 0.74}px), calc(-50% + ${burstY * 0.74}px), 0) rotate(${burst.rotate * 0.72}deg) scale(.72)`,
              },
              {
                opacity: 0,
                transform: `translate3d(calc(-50% + ${burstX}px), calc(-50% + ${burstY}px), 0) rotate(${burst.rotate}deg) scale(.2)`,
              },
            ],
            {
              delay: burst.delay * (compactBurst ? 0.3 : 0.4),
              duration: burstDuration,
              easing: 'cubic-bezier(.16, 1, .3, 1)',
              fill: 'both',
            },
          );
        });

        activeContact?.classList.remove('is-liquid-contact');
        activeContact = nearest.element.matches('.section-copy') ? nearest.element : undefined;

        if (activeContact) {
          const contactElement = activeContact;
          contactElement.classList.add('is-liquid-contact');
          contactTimer = window.setTimeout(() => {
            contactElement.classList.remove('is-liquid-contact');
            activeContact = undefined;
          }, compactBurst ? 520 : 720);
        }

        window.clearTimeout(dissolveTimer);
        dissolveTimer = window.setTimeout(() => {
          root.classList.remove('is-settling', 'is-bursting', 'is-veiled');
          root.classList.add('is-settled');
        }, compactBurst ? 286 : 372);
      };
    };

    const processScroll = (now: number) => {
      scrollFrameId = 0;
      const scrollElapsed = Math.max(now - lastScrollTime, 16);
      const nextScrollY = window.scrollY;
      const scrollDelta = nextScrollY - lastScrollY;
      const instantVelocity = scrollDelta / scrollElapsed;

      if (Math.abs(scrollDelta) < 0.1) {
        lastScrollTime = now;
        lastScrollY = nextScrollY;
        return;
      }

      scrollTravelSinceSettle += Math.abs(scrollDelta);
      scrollVelocity = lerp(scrollVelocity, instantVelocity, 0.42);
      lastScrollTime = now;
      lastScrollY = nextScrollY;

      if (!started) {
        started = true;
        root.classList.add('is-started');
      }

      if (!isMoving) {
        isMoving = true;
        landingReady = undefined;
        window.clearTimeout(contactTimer);
        window.clearTimeout(dissolveTimer);
        landingAnimation?.cancel();
        landingAnimation = undefined;
        fragmentAnimations.forEach((animation) => animation.cancel());
        fragmentAnimations = [];
        activeContact?.classList.remove('is-liquid-contact');
        activeContact = undefined;
        root.classList.remove('is-settled', 'is-settling', 'is-bursting', 'is-veiled');
        root.classList.add('is-moving');
      }
      target = getFlowTarget();
      startAnimation();

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleAtNearestAnchor, compactMotion.matches ? 84 : 72);
    };

    const handleScroll = () => {
      if (!scrollFrameId) {
        scrollFrameId = window.requestAnimationFrame(processScroll);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        window.cancelAnimationFrame(scrollFrameId);
        frameId = 0;
        scrollFrameId = 0;
        window.clearTimeout(settleTimer);
        window.clearTimeout(contactTimer);
        window.clearTimeout(dissolveTimer);
        landingReady = undefined;
        landingAnimation?.cancel();
        landingAnimation = undefined;
        fragmentAnimations.forEach((animation) => animation.cancel());
        fragmentAnimations = [];
        activeContact?.classList.remove('is-liquid-contact');
        activeContact = undefined;
        isMoving = false;
        isAnimating = false;
        scrollTravelSinceSettle = 0;
        lastScrollY = window.scrollY;
        root.classList.remove('is-moving', 'is-settling', 'is-bursting', 'is-veiled');
        root.classList.add('is-settled');
      }
    };

    measureAnchors();

    if (flowAnchors.length === 0) {
      return;
    }

    landingCandidateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            visibleLandingCandidates.add(element);
          } else {
            visibleLandingCandidates.delete(element);
          }
        });
      },
      { rootMargin: '96px 0px', threshold: 0 },
    );
    landingCandidates.forEach((element) => landingCandidateObserver?.observe(element));

    current = getInitialTarget();
    target = current;
    tailPoint = current;
    setPath(1, performance.now(), true);
    root.classList.add('is-ready');

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', scheduleAnchorMeasurement);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    void document.fonts.ready.then(() => {
      if (!isDisposed) {
        scheduleAnchorMeasurement();
      }
    });

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(scrollFrameId);
      window.cancelAnimationFrame(measureFrameId);
      window.clearTimeout(settleTimer);
      window.clearTimeout(contactTimer);
      window.clearTimeout(dissolveTimer);
      landingReady = undefined;
      landingAnimation?.cancel();
      fragmentAnimations.forEach((animation) => animation.cancel());
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', scheduleAnchorMeasurement);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      landingCandidateObserver?.disconnect();
      visibleLandingCandidates.clear();
      activeContact?.classList.remove('is-liquid-contact');
      flowAnchors.forEach(({ element }) => element.classList.remove('is-liquid-contact'));
    };
  }, []);

  return (
    <div aria-hidden="true" className="liquid-journey" ref={rootRef}>
      <svg className="liquid-journey-canvas" focusable="false">
        <defs>
          <linearGradient id="liquid-journey-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--liquid-flow-start)" />
            <stop offset="0.5" stopColor="var(--liquid-flow-middle)" />
            <stop offset="1" stopColor="var(--liquid-flow-end)" />
          </linearGradient>
        </defs>
        <path className="liquid-journey-filament" ref={trailRef} />
      </svg>

      <span className="liquid-mobile-veil" ref={veilRef} />

      <span className="liquid-lens-position">
        <span className="liquid-lens" ref={lensRef}>
          <span className="liquid-lens-caustic" />
        </span>
        <span className="liquid-burst">
          {burstFragments.map((fragment, index) => (
            <span className="liquid-fragment" key={`${fragment.x}-${fragment.y}-${index}`} />
          ))}
        </span>
      </span>
    </div>
  );
}

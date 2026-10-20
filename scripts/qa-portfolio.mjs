import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Use an existing BrowserAct session; never creates a browser or touches a public app.
const [endpoint, outputDirectory] = process.argv.slice(2);
assert.ok(endpoint && outputDirectory, 'Usage: node scripts/qa-portfolio.mjs <CDP WebSocket URL> <artifact directory>');
const socket = new WebSocket(endpoint);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
let sequence = 0;
let sessionId;
const pending = new Map();
const exceptions = [];
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject, timer } = pending.get(message.id);
    clearTimeout(timer);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  }
};
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 30000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}
async function evaluate(expression) {
  const response = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
  return response.result.value;
}
const settle = () => evaluate('new Promise(r => setTimeout(r, 500))');
const results = [];
try {
  const { targetInfos } = await command('Target.getTargets');
  const target = targetInfos.find((target) => target.type === 'page' && target.url.startsWith('http://127.0.0.1:4175/'));
  assert.ok(target, 'Open the local preview in the browser session first.');
  ({ sessionId } = await command('Target.attachToTarget', { targetId: target.targetId, flatten: true }));
  await command('Runtime.enable');
  await command('Page.enable');
  await command('Page.bringToFront');
  await command('Page.reload');
  await evaluate('new Promise(r => setTimeout(r, 2000))');
  await mkdir(outputDirectory, { recursive: true });
  for (const width of [1440, 768, 375, 320]) {
    const height = width === 1440 ? 1000 : 900;
    await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 });
    for (const language of ['en', 'vi']) {
      for (const theme of ['dark', 'light']) {
        await evaluate(`(() => {
          [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '${language.toUpperCase()}').click();
          if (document.documentElement.dataset.theme !== '${theme}')
            document.querySelector('button[aria-label*="theme"], button[aria-label*="giao diện"]').click();
        })()`);
        await settle();
        const row = await evaluate(`(() => {
          const drowsy = document.querySelector('[data-project-id="drowsiness-edge-iot"]');
          const experience = document.querySelector('#experience');
          return {
            width: innerWidth, language: document.documentElement.lang, theme: document.documentElement.dataset.theme,
            overflow: document.documentElement.scrollWidth > innerWidth,
            projectCount: document.querySelectorAll('.project-card').length,
            liveCount: document.querySelectorAll('[data-project-page]').length,
            drowsyActions: drowsy.querySelectorAll('a,button,[role="button"],.project-links,.project-corner-icon').length,
            employmentDates: /20[0-9]{2}|Present|Hiện tại|Tháng [0-9]/i.test(experience.innerText),
            brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a=>a.hash),
          };
        })()`);
        assert.equal(row.width, width);
        assert.equal(row.language, language);
        assert.equal(row.theme, theme);
        assert.equal(row.overflow, false, `Overflow at ${width}/${language}/${theme}`);
        assert.equal(row.drowsyActions, 0);
        assert.equal(row.employmentDates, false);
        assert.equal(row.projectCount, 8);
        assert.equal(row.liveCount, 4);
        assert.deepEqual(row.brokenAnchors, []);
        results.push(row);
        if (width === 1440 || width === 375) {
          await evaluate(`document.querySelector('[data-project-id="drowsiness-edge-iot"]').scrollIntoView({block:'start',behavior:'instant'})`);
          await settle();
          const { data } = await command('Page.captureScreenshot', { format: 'png' });
          await writeFile(path.join(outputDirectory, `projects-${width}-${language}-${theme}.png`), Buffer.from(data, 'base64'));
        }
      }
    }
  }
  // Reduced motion must expose every deployed entry without sticky overlap or inert links.
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await settle();
  const reduced = await evaluate(`({
    matches: matchMedia('(prefers-reduced-motion: reduce)').matches,
    cards: [...document.querySelectorAll('[data-project-sticky]')].map(el => ({
      position: getComputedStyle(el).position, inert: el.querySelector('a').inert,
      transform: getComputedStyle(el.querySelector('a')).transform
    }))
  })`);
  assert.ok(reduced.matches && reduced.cards.every((card) => card.position !== 'sticky' && !card.inert && card.transform === 'none'));
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await evaluate(`document.querySelector('#live-work').scrollIntoView({block:'start',behavior:'instant'})`);
  await settle();
  const deck = await evaluate(`({ready: document.querySelector('[data-project-deck]').dataset.stackReady,
    padding: [...document.querySelectorAll('[data-project-sticky]')].map(el=>getComputedStyle(el).paddingTop)})`);
  assert.equal(deck.ready, 'true');
  assert.deepEqual(deck.padding, ['0px', '18px', '36px', '54px']);
  for (const index of [0, 1, 2, 3]) {
    await evaluate(`document.querySelectorAll('[data-project-sticky]')[${index}].scrollIntoView({block:'start',behavior:'instant'})`);
    await settle();
  }
  await evaluate(`document.querySelector('[href="https://fartamarket.company/"][data-project-page]').scrollIntoView({block:'center',behavior:'instant'})`);
  await settle();
  const { data } = await command('Page.captureScreenshot', { format: 'png' });
  await writeFile(path.join(outputDirectory, 'live-deck-desktop.png'), Buffer.from(data, 'base64'));
  await evaluate(`document.querySelector('#experience').scrollIntoView({block:'start',behavior:'instant'})`);
  await settle();
  const experienceImage = await command('Page.captureScreenshot', { format: 'png' });
  await writeFile(path.join(outputDirectory, 'experience-desktop.png'), Buffer.from(experienceImage.data, 'base64'));
  await evaluate(`document.querySelector('[data-project-id="farta-market"] a').focus()`);
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  const keyboard = await evaluate(`({
    href: document.activeElement.getAttribute('href'),
    outline: getComputedStyle(document.activeElement).outlineStyle,
    inert: !!document.activeElement.closest('[inert]')
  })`);
  assert.equal(keyboard.href, 'https://github.com/khanhlinhcode/Farta_Market');
  assert.equal(keyboard.inert, false);
  assert.notEqual(keyboard.outline, 'none');
  assert.deepEqual(exceptions, []);
  await writeFile(path.join(outputDirectory, 'results.json'), JSON.stringify({ results, reduced, deck, keyboard, exceptions }, null, 2));
  console.log(`PASS: ${results.length} viewport/language/theme combinations, reduced motion, 4-card deck, no runtime exceptions. Artifacts: ${outputDirectory}`);
} finally {
  if (sessionId) {
    await command('Emulation.setEmulatedMedia', { features: [] }).catch(() => {});
    await command('Emulation.clearDeviceMetricsOverride').catch(() => {});
  }
  socket.close();
}

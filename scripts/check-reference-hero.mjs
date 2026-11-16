import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({channel:'chrome',headless:true});
try {
 for (const width of [1440,390,320]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});
  await page.locator('.hero-content').evaluate(el=>el.getAnimations().forEach(a=>a.finish()));
  assert.equal(await page.locator('.hero-actions a').count(),2);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const canvas=page.locator('.hero-background canvas');
  const first=await canvas.evaluate(el=>el.toDataURL());
  await page.waitForTimeout(200);
  assert.notEqual(await canvas.evaluate(el=>el.toDataURL()),first);
  await page.getByRole('button',{name:'Pause background motion'}).click();
  await page.waitForTimeout(100);
  const paused=await canvas.evaluate(el=>el.toDataURL());
  await page.waitForTimeout(200);
  assert.equal(await canvas.evaluate(el=>el.toDataURL()),paused);
  await page.screenshot({path:`output/hero-reference/hero-${width}.png`});
  await page.getByRole('link',{name:'Explore my work',exact:false}).first().click();
  assert.ok(page.url().endsWith('#work'));
  await page.locator('.hero-contact').click();
  assert.ok(page.url().endsWith('#contact'));
  assert.deepEqual(errors,[]);
  console.log(`${width}px: layout, animation, pause, both links, no errors passed`);
  await page.close();
 }
 const page=await browser.newPage({reducedMotion:'reduce',viewport:{width:390,height:844}});
 await page.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.background-toggle').isVisible(),false);
 assert.equal(await page.locator('.hero-content').evaluate(el=>getComputedStyle(el).opacity),'1');
 const before=await page.locator('canvas').evaluate(el=>el.toDataURL());
 await page.waitForTimeout(200);
 assert.equal(await page.locator('canvas').evaluate(el=>el.toDataURL()),before);
 console.log('Reduced motion: visible content and static background passed');
} finally { await browser.close(); }

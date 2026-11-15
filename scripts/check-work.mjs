import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
await mkdir('qa',{recursive:true});const base='http://127.0.0.1:3000';
try{
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'no-preference',hasTouch:width<700});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.work-card').count(),7);
  for(const card of await page.locator('.work-card').all()){
   await card.scrollIntoViewIfNeeded();
   await card.locator('.project-image').evaluate(img=>img.decode());
   assert.ok(await card.locator('.logo-stack img').count()>0);
   assert.ok(await card.locator('.logo-stack img').evaluateAll(imgs=>imgs.every(img=>img.alt.length>0)));
   assert.ok(await card.locator('.card-cta').isVisible());
  }
  const card=page.locator('.work-card').first();await card.scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
  await page.screenshot({path:`qa/work-cards-${width}.png`});
  if(width===1440){
   const cover=card.locator('.cover-link');await cover.hover();
   const bounds=await card.boundingBox();await page.mouse.move(bounds.x+bounds.width*.72,bounds.y+bounds.height*.3);
   await page.waitForTimeout(450);
   assert.notEqual(await card.evaluate(el=>getComputedStyle(el).transform),'none');
   assert.notEqual(await card.locator('.project-image').evaluate(el=>getComputedStyle(el).transform),'none');
   assert.equal(await card.locator('.cover-overlay').evaluate(el=>getComputedStyle(el).opacity),'1');
   const cta=card.locator('.card-cta');await cta.focus();
   assert.equal(await card.locator('.cover-overlay').evaluate(el=>getComputedStyle(el).opacity),'1');
   await page.keyboard.press('Enter');await page.waitForURL('**/projects/at-workflow');
  }else{
   await card.locator('.card-cta').tap();await page.waitForURL('**/projects/at-workflow');
  }
  await page.goto(base+'/#technologies',{waitUntil:'networkidle'});
  await page.locator('#technologies').scrollIntoViewIfNeeded();
  assert.ok(await page.locator('.tech-group .logo-stack img').evaluateAll(imgs=>imgs.every(img=>img.alt&&getComputedStyle(img).width==='26px'||img.alt&&getComputedStyle(img).width==='28px')));
  for(const img of await page.locator('.tech-group img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);await context.close();console.log(`${width}px: seven cards, accessible logo-only stacks, keyboard/touch case links, no overflow/errors passed`);
 }
 const reduced=await browser.newContext({reducedMotion:'reduce'});const rp=await reduced.newPage();await rp.goto(base);const card=rp.locator('.work-card').first();await card.scrollIntoViewIfNeeded();await card.hover();
 assert.equal(await card.evaluate(el=>getComputedStyle(el).transform),'none');
 assert.equal(await card.locator('.project-image').evaluate(el=>getComputedStyle(el).transform),'none');await reduced.close();
 const nojs=await browser.newContext({javaScriptEnabled:false});const np=await nojs.newPage();await np.goto(base);assert.equal(await np.locator('.work-card').count(),7);await np.locator('.card-cta').first().click();await np.waitForURL('**/projects/at-workflow');await nojs.close();
 console.log('Reduced motion keeps cards static; JavaScript-disabled case-study navigation passes.');
}finally{await browser.close()}

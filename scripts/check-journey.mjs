import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});const base='http://127.0.0.1:3000';
await mkdir('qa',{recursive:true});
try{
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'no-preference'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.time-chapter').count(),5);
  assert.ok((await page.locator('#journey-atirao').textContent()).includes('May 2026 — Present'));
  assert.ok((await page.locator('#journey-simplon').textContent()).includes('October 2025 — March 2026'));
  for(const [id,year] of [['atirao','2026'],['simplon','2025'],['l2mi','2022'],['university','2019'],['baccalaureate','2018']]){
   const chapter=page.locator('#journey-'+id);
   await chapter.evaluate(el=>{const r=el.getBoundingClientRect();scrollTo(0,scrollY+r.top+r.height/2-innerHeight/2)});
   await page.waitForFunction(id=>document.querySelector(`.time-chapters-nav a[href="#journey-${id}"]`)?.getAttribute('aria-current')==='step',id);
   await page.waitForTimeout(350);
   assert.equal(await page.locator('.time-year>span').first().textContent(),year);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   if(id==='atirao'||id==='simplon')await page.screenshot({path:`qa/journey-${id}-${width}.png`});
  }
  await page.locator('.time-chapters-nav a[href="#journey-simplon"]').click();
  assert.ok(page.url().endsWith('#journey-simplon'));
  assert.deepEqual(errors,[]);await context.close();console.log(`${width}px: dates, five chronological chapters, active year changes, native chapter links, no overflow/errors passed`);
 }
 for(const options of [{reducedMotion:'reduce'},{javaScriptEnabled:false}]){
  const context=await browser.newContext(options);const page=await context.newPage();await page.goto(base,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.time-chapter').count(),5);
  await page.locator('#journey-atirao').scrollIntoViewIfNeeded();
  assert.ok(await page.locator('.chapter-content').evaluateAll(els=>els.every(el=>getComputedStyle(el).opacity==='1')));
  assert.ok(await page.locator('.chapter-content').evaluateAll(els=>els.every(el=>getComputedStyle(el).transform==='none')));
  await context.close();
 }
 console.log('Reduced motion and JavaScript disabled: all five chapters remain visible in a static timeline.');
}finally{await browser.close()}

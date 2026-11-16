import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});
  const start=await page.locator('.about-ribbons').evaluate(el=>getComputedStyle(el).transform);
  const top=await page.locator('#about').evaluate(el=>el.offsetTop);
  await page.evaluate(y=>scrollTo(0,y-350),top);
  await page.waitForTimeout(250);
  await page.screenshot({path:`output/hero-reference/transition-${width}.png`});
  const after=await page.locator('.about-ribbons').evaluate(el=>getComputedStyle(el).transform);
  assert.notEqual(start,after);
  await page.evaluate(y=>scrollTo(0,y+150),top);
  await page.waitForTimeout(250);
  await page.screenshot({path:`output/hero-reference/about-${width}.png`});
  assert.equal(await page.locator('#about-title').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.ok(await page.locator('.cv-download').getAttribute('download'));
  await page.locator('.about-copy').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  assert.ok(Number(await page.locator('.about-copy').evaluate(el=>getComputedStyle(el.parentElement).opacity))>.9);
  assert.deepEqual(errors,[]);
  console.log(`${width}px: scroll transition, content reveal, CV, no overflow or errors passed`);
  await page.close();
 }
 const page=await browser.newPage({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});
 await page.locator('#about-title').scrollIntoViewIfNeeded();
 assert.equal(await page.locator('.about-ribbons').evaluate(el=>getComputedStyle(el).transform),'none');
 assert.equal(await page.locator('.about-scroll-reveal').first().evaluate(el=>getComputedStyle(el).opacity),'1');
 console.log('Reduced motion: static transition and readable content passed');
 await page.close();
 const nojs=await browser.newPage({javaScriptEnabled:false});
 await nojs.goto('http://127.0.0.1:3001');
 assert.ok(await nojs.locator('#about-title').isVisible());
 assert.equal(await nojs.locator('.about-scroll-reveal').first().evaluate(el=>getComputedStyle(el).opacity),'1');
 console.log('JavaScript disabled: About content remains visible');
}finally{await browser.close()}

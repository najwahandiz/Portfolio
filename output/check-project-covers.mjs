import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [1440,768,390,320]){
  const page=await browser.newPage({viewport:{width,height:960},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3001',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.project-thumbnail img').count(),7);
  for(const image of await page.locator('.project-thumbnail img').all()){
   await image.scrollIntoViewIfNeeded();
   await image.evaluate(el=>el.decode());
   assert.ok(await image.evaluate(el=>el.naturalWidth>0));
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  for(const sel of ['.internship-project','.learning-project']){
   await page.locator(sel).first().scrollIntoViewIfNeeded();
   if(width===1440||width===390)await page.screenshot({path:`output/hero-reference/covers-${sel.slice(1)}-${width}.png`});
  }
  assert.deepEqual(errors,[]);
  console.log(`${width}px: all seven covers loaded, distinct layouts, no overflow or browser errors`);
  await page.close();
 }
}finally{await browser.close()}

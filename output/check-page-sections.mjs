import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [1440,768,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});
  for(const id of ['about','work','technologies','contact']){
   const y=await page.locator('#'+id).evaluate(el=>el.offsetTop);
   await page.evaluate(y=>scrollTo(0,y-85),y);
   await page.waitForTimeout(1000);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}: overflow at ${id}`);
   if(width!==768)await page.screenshot({path:`output/hero-reference/${id}-readable-${width}.png`});
  }
  const sizes=await page.locator('.portrait-caption,.portrait-note,.portrait-note>span:last-child,.about .languages,.about .languages b,.card-category,.card-role>span,.card-description,.work-label,.chapter-topline,.chapter-description,.section-heading>p,.contact .email').evaluateAll(els=>els.map(el=>({class:el.className,size:parseFloat(getComputedStyle(el).fontSize)})));
  assert.ok(sizes.every(el=>el.size>=12),JSON.stringify(sizes.filter(el=>el.size<12)));
  assert.ok(await page.locator('.technologies .logo-stack.labeled li').count()>10);
  assert.ok(await page.locator('.contact a[href^="mailto:"]').count()===2);
  assert.deepEqual(errors,[]);
  console.log(`${width}px: all sections, readable labels, named tools, no overflow or browser errors passed`);
  await page.close();
 }
 const reduced=await browser.newPage({reducedMotion:'reduce'});
 await reduced.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});
 await reduced.locator('#technologies').scrollIntoViewIfNeeded();
 assert.equal(await reduced.locator('#technologies .section-light svg').evaluate(el=>getComputedStyle(el).transform),'none');
 assert.ok(await reduced.locator('#technologies h2').isVisible());
 console.log('Reduced motion: static dividers and visible sections passed');
 const nojs=await browser.newPage({javaScriptEnabled:false});
 await nojs.goto('http://127.0.0.1:3001');
 for(const id of ['work','technologies','contact']) assert.ok(await nojs.locator('#'+id+' h2').isVisible());
 console.log('JavaScript disabled: all section content visible');
}finally{await browser.close()}

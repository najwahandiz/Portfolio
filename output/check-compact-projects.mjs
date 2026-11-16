import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:960}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});
  const chapters=page.locator('.time-chapter');
  for(let i=0;i<await chapters.count();i++){
   const y=await chapters.nth(i).evaluate(el=>el.getBoundingClientRect().top+scrollY);
   await page.evaluate(y=>scrollTo(0,y-220),y);
   await page.waitForTimeout(400);
   assert.ok(await chapters.nth(i).isVisible());
   assert.ok(Number(await chapters.nth(i).locator('.chapter-content').evaluate(el=>getComputedStyle(el).opacity))>.9);
   if(width===1440 && i>0){
    const rect=await page.locator('.time-intro').boundingBox();
    assert.ok(rect.y>=100 && rect.y<150,`Chapter ${i}: sticky intro at ${rect.y}`);
    assert.equal(await chapters.nth(i).getAttribute('class'),'time-chapter is-active');
   }
  }
  if(width===1440)await page.screenshot({path:'output/hero-reference/journey-sticky-fixed.png'});
  assert.equal(await page.locator('.internship-project').count(),4);
  assert.equal(await page.locator('.learning-project').count(),3);
  assert.equal(await page.locator('#work .card-role,#work .card-visual,#work .card-footer').count(),0);
  for(const card of await page.locator('.compact-project').all()){
   assert.ok(await card.locator('h3 a').getAttribute('href'));
   assert.ok(await card.locator('.project-technologies li').count()>0);
   if(width===1440)assert.ok((await card.boundingBox()).height<380);
  }
  for(const sel of ['.internship-grid','.personal-grid']){
   await page.locator(sel).scrollIntoViewIfNeeded();
   await page.waitForTimeout(1000);
   await page.screenshot({path:`output/hero-reference/${sel.slice(1)}-compact-${width}.png`});
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);
  console.log(`${width}px: all journey chapters visible, compact cards, technologies, no overflow or errors passed`);
  await page.close();
 }
}finally{await browser.close()}


import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const base='http://127.0.0.1:3000';
await mkdir('qa',{recursive:true});
try{
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:960},reducedMotion:'no-preference'});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base,{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.hero-welcome').evaluate(el=>getComputedStyle(el).visibility),'visible');
  assert.equal(await page.locator('.hero-content').evaluate(el=>getComputedStyle(el).opacity),'0');
  if(width!==320)await page.screenshot({path:`qa/welcome-${width}.png`});
  await page.waitForFunction(()=>{
   const lines=document.querySelectorAll('.hero-title-line');
   return Number(getComputedStyle(lines[0]).opacity)>0 && getComputedStyle(lines[2]).opacity==='0';
  });
  console.log(`${width}px: headline lines reveal in sequence`);
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.hero-bottom')).opacity==='1');
  assert.equal(await page.locator('.hero-welcome').evaluate(el=>getComputedStyle(el).visibility),'hidden');
  assert.equal(await page.locator('#hero-title').count(),1);
  assert.ok(await page.locator('.hero .button').isVisible());
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:`qa/animated-hero-${width}.png`});
  const ring=page.locator('.ambient-rings');
  const before=await ring.evaluate(el=>getComputedStyle(el).transform);
  await page.waitForTimeout(150);
  assert.notEqual(await ring.evaluate(el=>getComputedStyle(el).transform),before);
  await page.getByRole('button',{name:'Pause background motion'}).click();
  assert.equal(await ring.evaluate(el=>getComputedStyle(el).animationPlayState),'paused');
  await page.getByRole('button',{name:'Resume background motion'}).click();
  assert.equal(await ring.evaluate(el=>getComputedStyle(el).animationPlayState),'running');
  for(const slug of ['at-workflow','seo-analytics-dashboard']){
   assert.equal((await page.goto(base+'/projects/'+slug)).status(),200);
   const img=page.locator('.case-visual img');
   await img.scrollIntoViewIfNeeded();
   await img.evaluate(el=>el.decode());
   assert.ok((await img.getAttribute('src')).includes('black.png'));
   assert.ok((await page.locator('figcaption').textContent()).includes('demo data')||(await page.locator('figcaption').textContent()).includes('Fictional'));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  assert.deepEqual(errors,[]);
  await context.close();
  console.log(`${width}px: welcome → hero, animated background, pause/resume, black covers, no overflow or browser errors passed`);
 }
 const reduced=await browser.newContext({reducedMotion:'reduce'});
 const rp=await reduced.newPage();await rp.goto(base,{waitUntil:'domcontentloaded'});
 assert.equal(await rp.locator('.hero-welcome').isVisible(),false);
 assert.equal(await rp.locator('.hero-content').evaluate(el=>getComputedStyle(el).opacity),'1');
 assert.ok(await rp.locator('.hero-title-line,.hero-description,.hero-content>.button').evaluateAll(els=>els.every(el=>getComputedStyle(el).opacity==='1')));
 assert.equal(await rp.locator('.ambient-rings').evaluate(el=>getComputedStyle(el).animationName),'none');
 await rp.keyboard.press('Tab');assert.equal(await rp.locator(':focus').textContent(),'Skip to content');
 await reduced.close();
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const np=await nojs.newPage();await np.goto(base);
 assert.equal(await np.locator('.hero-welcome').isVisible(),false);
 assert.equal(await np.locator('.hero-content').evaluate(el=>getComputedStyle(el).opacity),'1');
 assert.ok(await np.locator('.hero-title-line,.hero-description,.hero-content>.button').evaluateAll(els=>els.every(el=>getComputedStyle(el).opacity==='1')));
 await np.getByRole('link',{name:'Explore my work'}).click();
 assert.ok(np.url().endsWith('#work'));
 await nojs.close();
 console.log('Reduced motion and JavaScript disabled: immediate static hero and usable navigation passed');
}finally{await browser.close()}

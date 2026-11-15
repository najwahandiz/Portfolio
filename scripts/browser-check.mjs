import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir,writeFile } from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
await mkdir('qa',{recursive:true});
const report=[];
const slugs=['at-workflow','atirao-website','at-boost','seo-analytics-dashboard','stockflow','beautymatch','aura-sadaqa'];
const base='http://127.0.0.1:3000';
try {
 for (const width of [1440,390,320]) {
  const context=await browser.newContext({viewport:{width,height:960},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  for (const path of ['/',...slugs.map(s=>`/projects/${s}`)]) {
   const response=await page.goto(base+path,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,path);
   await page.evaluate(()=>document.fonts.ready);
   for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();}
   await page.waitForFunction(()=>[...document.images].every(img=>img.complete));
   await page.evaluate(()=>scrollTo(0,0));
   assert.equal(await page.locator('h1').count(),1);
   assert.ok(await page.title());
   const overflow=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth}));
   if(overflow.document>overflow.viewport){await page.screenshot({path:`qa/overflow-${width}.png`,fullPage:true});console.log(await page.locator('body *').evaluateAll(els=>els.map(el=>({tag:el.tagName,cls:el.className,x:el.getBoundingClientRect().x,width:el.getBoundingClientRect().width})).filter(el=>el.x+el.width>innerWidth+1&&el.width>0).slice(0,25)));}
   assert.ok(overflow.document<=overflow.viewport,`${width} ${path} overflow: ${JSON.stringify(overflow)}`);
   const broken=await page.locator('img').evaluateAll(images=>images.filter(img=>img.complete&&img.naturalWidth===0).map(img=>img.src));
   assert.deepEqual(broken,[],`${path} broken images`);
   if(path==='/'){
    assert.equal(await page.locator('.project-card').count(),7);
    await page.screenshot({path:`qa/home-${width}.png`,fullPage:true});
    await page.screenshot({path:`qa/hero-${width}.png`});
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.screenshot({path:`qa/about-${width}.png`});
    await page.evaluate(()=>scrollTo(0,0));
   }
   if(path==='/projects/at-workflow')await page.screenshot({path:`qa/case-${width}.png`,fullPage:true});
   report.push(`${width}px ${path}: 200, one heading, no horizontal overflow or broken loaded images`);
  }
  assert.deepEqual(errors,[],`browser errors at ${width}px`);
  await page.goto(base,{waitUntil:'networkidle'});
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(),'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(()=>location.hash),'#main');
  const cover=page.locator('.featured .cover-link').first();
  await cover.focus();
  assert.equal(await page.locator('.featured .cover-overlay').first().evaluate(el=>getComputedStyle(el).opacity),'1');
  const transform=await page.locator('.featured .cover-frame').first().evaluate(el=>getComputedStyle(el).transform);
  assert.equal(transform,'none','reduced motion stops cover transform');
  await page.keyboard.press('Enter');
  await page.waitForURL('**/projects/at-workflow');
  report.push(`${width}px: skip link and keyboard case navigation pass; reduced-motion cover static`);
  await context.close();
 }
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await nojs.newPage();
 await page.goto(base);
 assert.equal(await page.locator('.project-card').count(),7);
 assert.ok(await page.locator('#hero-title').isVisible());
 await page.locator('.featured .text-link').first().click();
 await page.waitForURL('**/projects/at-workflow');
 assert.ok(await page.getByRole('heading',{name:'My contribution'}).isVisible());
 report.push('JavaScript disabled: homepage content and native case navigation pass');
 await nojs.close();
 const motion=await browser.newContext({reducedMotion:'no-preference',viewport:{width:1440,height:960}});
 const mp=await motion.newPage();
 await mp.goto(base,{waitUntil:'networkidle'});
 await mp.locator('.featured .cover-link').first().hover();
 await mp.waitForTimeout(650);
 assert.equal(await mp.locator('.featured .cover-overlay').first().evaluate(el=>getComputedStyle(el).opacity),'1');
 assert.notEqual(await mp.locator('.featured').first().evaluate(el=>getComputedStyle(el).transform),'none');
 report.push('Motion enabled: hover cover comes forward and role/stack/link overlay appears');
 await motion.close();
 await writeFile('qa/results.txt',report.join('\n')+'\n');
 console.log(report.join('\n'));
}finally{await browser.close();}

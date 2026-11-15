import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const browser=await chromium.launch({channel:'chrome',headless:true});
const base='http://127.0.0.1:3000';
await mkdir('qa',{recursive:true});
try{
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:960},reducedMotion:'no-preference',acceptDownloads:true});
  const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base,{waitUntil:'networkidle'});
  assert.deepEqual(await page.locator('main>section').evaluateAll(els=>els.slice(0,3).map(el=>el.id||'hero')),['hero','about','work']);
  assert.ok((await page.locator('.languages').textContent()).includes('DEUTSCH B1'));
  const reveal=page.locator('.about-scroll-reveal').first();
  const initial=await reveal.evaluate(el=>getComputedStyle(el).transform);
  const aboutTop=await page.locator('#about').evaluate(el=>el.getBoundingClientRect().top+scrollY);
  await page.evaluate(top=>scrollTo(0,top-140),aboutTop);
  await page.waitForTimeout(180);
  const after=await reveal.evaluate(el=>getComputedStyle(el).transform);
  assert.notEqual(after,initial,'portrait changes position as the section scrolls in');
  const button=page.getByRole('link',{name:/Click To Download My CV/});
  await button.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:`qa/about-reordered-${width}.png`});
  if(width===1440){
   await button.focus();assert.equal(await page.locator(':focus').getAttribute('download'),'Najwa-Handiz-CV.pdf');
   const downloadPromise=page.waitForEvent('download');await page.keyboard.press('Enter');const download=await downloadPromise;
   assert.equal(download.suggestedFilename(),'Najwa-Handiz-CV.pdf');
   const actual=await readFile(await download.path());const expected=await readFile('public/cv/Najwa-Handiz-CV.pdf');
   assert.equal(createHash('sha256').update(actual).digest('hex'),createHash('sha256').update(expected).digest('hex'));
  }
  assert.deepEqual(errors,[]);await context.close();
  console.log(`${width}px: section order, Deutsch B1, scroll reveal, CV button, no overflow or browser errors passed`);
 }
 for(const options of [{reducedMotion:'reduce'},{javaScriptEnabled:false}]){
  const context=await browser.newContext(options);const page=await context.newPage();await page.goto(base,{waitUntil:'networkidle'});
  await page.locator('#about').scrollIntoViewIfNeeded();
  assert.ok(await page.locator('.about-scroll-reveal').evaluateAll(els=>els.every(el=>getComputedStyle(el).opacity==='1')));
  assert.equal(await page.getByRole('link',{name:/Click To Download My CV/}).getAttribute('href'),'/cv/Najwa-Handiz-CV.pdf');
  await context.close();
 }
 console.log('Keyboard CV download matches original PDF. Reduced motion and no-JavaScript About content remain visible.');
}finally{await browser.close()}

# Validation

## Reverse-chronological journey — November 15, 2026

Added Atirao’s Web Developer Internship (May 2026–Present), explicit Simplon months (October 2025–March 2026), and the 2018–2019 Mathematical Sciences Category A baccalaureate from the supplied reference. The journey now has five chapters, a sticky changing year, a scroll-progress line, and scroll-driven chapter reveals. Work contributions use the existing project descriptions; no new outcomes or metrics were added.

`npm run build` passed. `node scripts/check-journey.mjs` passed at 1440px, 390px, and 320px, checking exact dates, all five chapters, changing active years, native anchor navigation, no horizontal overflow, and no browser errors. Reduced-motion and JavaScript-disabled checks confirm a fully visible static timeline. Desktop/mobile screenshots were reviewed.

## Interactive work cards and logo-only stacks — November 15, 2026

Work cards now use framed previews, spring-based pointer tilt and lift, cover zoom, a reveal pill, moving arrows, and stronger staggered scroll entrances. Roles and case-study links remain visible on touch screens. Technologies display as local logos with alternative text, native titles, and hover tooltips. The original SVG `viewbox` attributes were corrected to `viewBox` so logos size properly. Additional brand icons came from Simple Icons, Pinecone’s public favicon, and Google’s reCAPTCHA asset; generic API/retrieval concepts use local SVG symbols.

`npm run build` passed. `node scripts/check-work.mjs` passed at 1440px, 390px, and 320px: seven cards, labeled logo images, pointer transforms and overlays, keyboard/touch navigation, decoded technology icons, and no horizontal overflow or browser errors. Reduced-motion checks confirm static cards; JavaScript-disabled case-study navigation passes. Desktop/mobile screenshots were visually reviewed.

## About placement, languages, and CV — November 15, 2026

The homepage now places About directly after Hero and before Selected Work, with section numbering updated. Deutsch B1 was added. The new CV button downloads `public/cv/Najwa-Handiz-CV.pdf`, an unchanged copy of `Downloads/CV Najwa HANDIZ.pdf`. Its PDF signature and byte-for-byte integrity were verified. `npm run build` passed. `node scripts/check-about.mjs` passed at 1440px, 390px, and 320px, checking section order, the language label, actual scroll-driven movement, no horizontal overflow or browser errors, and the download link. A keyboard-triggered download matched the original PDF checksum. Reduced-motion and JavaScript-disabled checks confirmed visible static About content. Desktop/mobile screenshots were reviewed.

## Minimal covers and welcome sequence — November 15, 2026

The hero motion was subsequently strengthened with brighter orbital lines, moving points, light trails, and faster ambient movement. Welcome copy and the three headline lines now reveal separately, followed by the description and CTA. The production build and `check-hero.mjs` passed again at 1440px, 390px, and 320px, including a check that the first headline line appears before the last, pause/resume, reduced motion, and JavaScript-disabled text visibility.

`npm run build` passed after adding the black dashboard concepts and new hero. `node scripts/check-hero.mjs` passed at 1440px, 390px, and 320px. It verifies the welcome is initially visible, then leaves as the hero appears; the ambient background moves and can be paused/resumed; both new covers load on their case-study pages; there is no horizontal overflow or browser error. Reduced-motion and JavaScript-disabled checks confirm that the hero appears immediately with a static background. Keyboard skip navigation also passes. Desktop and mobile welcome/hero screenshots were visually reviewed. Final cover files and exact generation prompts are in `BLACK_COVER_PROMPTS.md`.

Completed on November 14, 2026 against the local production server.

Cover update rechecked on November 15, 2026: production build and the full browser-check script passed again at 1440px, 390px, and 320px, including all seven case-study routes and loading the replacement images. The supplied screenshots were visually reviewed in the project grid without cropping. The two generated dashboards were reviewed for professional presentation and demo-data labeling.

- `npm run build`: passed compilation, TypeScript validation, and static generation (homepage, seven case-study routes, sitemap, robots, and not-found page).
- `npm run typecheck`: passed.
- `node scripts/browser-check.mjs`: passed in installed Google Chrome. Tested 1440 × 960, 390 × 960, and 320 × 960 viewports.
- Homepage and all seven case-study pages: HTTP 200, one main heading, page titles present, no horizontal overflow, no broken images after scrolling to load every image, and no uncaught browser errors.
- Keyboard: skip link reaches main content; featured-cover focus exposes the overlay; Enter opens ATworkflow.
- Reduced motion: cover remains static; Motion entrances and viewport reveals are bypassed by the system preference.
- Motion enabled: hover moves the cover forward and exposes role, stack, and case-study cue.
- JavaScript disabled: hero and seven project cards remain visible; native case-study navigation reaches the contribution content.
- Screenshot review: desktop and mobile hero, selected work, About portrait, and ATworkflow case-study layout inspected. Screenshots and detailed browser results are in the ignored `qa/` directory.
- Social preview image, NH favicon asset, sitemap, and robots endpoint: HTTP 200.

## Content verification

The supplied HTML is the source for biography, dates, project responsibilities, technology names, and links. No project outcomes, client results, or performance metrics were invented. The ATworkflow platform is credited to the team, and Najwa’s employee leave-balance contribution is clearly identified. The November 15 cover update uses the supplied Atirao and AT Boost screenshots and AI-generated dashboard mockups with fictional demo data. Personal project visuals are unchanged. See `COVER_ASSETS.md` for paths and prompts.

The supplied Atirao, AT Boost, and AT Boost contact links were opened and resolved to the expected public pages. The supplied BeautyMatch demo URL returned HTTP 200 in a direct network check. No contact forms were submitted and no external product functionality was tested.

## Deployment status

GitHub and Vercel plugins were discovered but are not connected. No authenticated GitHub/Vercel CLI or existing repository was found in this workspace. No remote preview or production deployment was created. Connect the services to continue with a Vercel preview; production remains a separate step after review.

For a repeat browser check, start the production server with `npm run start`, then run `node scripts/browser-check.mjs`. The script uses the locally installed Chrome channel and does not need a Playwright browser download. Automated browser checks supplement visual review; they are not a complete screen-reader or device-lab audit.

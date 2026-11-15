import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
const mark=(await readFile('public/assets/nh-mark.png')).toString('base64');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#17151a"/><image href="data:image/png;base64,${mark}" x="70" y="55" width="110" height="110"/><text x="70" y="280" font-family="Georgia" font-size="76" fill="#eee9f0">Thoughtful websites.</text><text x="70" y="375" font-family="Georgia" font-style="italic" font-size="76" fill="#d6c1e5">Purposeful experiences.</text><text x="75" y="490" font-family="Arial" font-size="23" letter-spacing="3" fill="#d8a9bd">NAJWA HANDIZ / JUNIOR WEB DEVELOPER</text><path d="M75 550H1125" stroke="#3a303e" stroke-width="2"/></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/social-preview.png');

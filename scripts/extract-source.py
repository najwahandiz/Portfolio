from pathlib import Path
from bs4 import BeautifulSoup
import base64, json, re

root = Path(__file__).resolve().parent.parent
soup = BeautifulSoup((root/'source/Najwa_Handiz_Portfolio.html').read_text(encoding='utf-8'), 'html.parser')
assets = root/'public/assets'
assets.mkdir(parents=True, exist_ok=True)
def save_image(img, name):
    header, data = img['src'].split(',', 1)
    ext = 'webp' if 'webp' in header else 'png'
    filename = f'{name}.{ext}'
    (assets/filename).write_bytes(base64.b64decode(data))
    return '/assets/'+filename
save_image(soup.select_one('.brand-mark'), 'nh-mark')
save_image(soup.select_one('.about-portrait'), 'portrait')
projects=[]
for index, case in enumerate(soup.select('main.offline-case')):
    slug=case['id'].removeprefix('project-')
    meta={dt.get_text(strip=True):dt.find_next_sibling('dd').get_text(' ',strip=True) for dt in case.select('dt')}
    projects.append(dict(slug=slug,title=case.h1.get_text(),category=case.select_one('.eyebrow').get_text(),description=case.select_one('.intro').get_text(),cover=save_image(case.select_one('img'),slug),caption=case.figcaption.get_text(),role=meta['Role'],context=meta['Context'],technologies=[t.strip() for t in meta['Technologies'].split(',')],sections=[dict(title=sec.h2.get_text(),body=sec.p.get_text()) for sec in case.select('.case-story section')],links=[dict(label=a.get_text(' ',strip=True),href=a['href']) for a in case.select('.case-meta a')],professional=index<4))
logos={}
groups=[]
for group in soup.select('.tech-group'):
    names=[]
    for li in group.select('li'):
        name=li.get_text(' ',strip=True)
        svg=li.select_one('svg')
        if not svg: continue
        filename=re.sub(r'[^a-z0-9]+','-',name.lower()).strip('-')+'.svg'
        svg['xmlns']='http://www.w3.org/2000/svg'
        (assets/filename).write_text(str(svg),encoding='utf-8')
        logos[name]='/assets/'+filename
        names.append(name)
    groups.append(dict(title=group.h3.get_text(),names=names))
for li in soup.select('.project-tech li'):
    name=li.get('title') or li.get_text(' ',strip=True)
    svg=li.select_one('svg')
    if svg and name not in logos:
        filename=re.sub(r'[^a-z0-9]+','-',name.lower()).strip('-')+'.svg'
        svg['xmlns']='http://www.w3.org/2000/svg'
        (assets/filename).write_text(str(svg),encoding='utf-8')
        logos[name]='/assets/'+filename
data=root/'data'
data.mkdir(exist_ok=True)
(data/'projects.ts').write_text('export type Project = { slug: string; title: string; category: string; description: string; cover: string; caption: string; role: string; context: string; technologies: string[]; sections: {title: string; body: string}[]; links: {label: string; href: string}[]; professional: boolean };\n\nexport const projects: Project[] = '+json.dumps(projects,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(data/'technologies.ts').write_text('export const logos: Record<string, string> = '+json.dumps(logos,indent=2)+';\nexport const technologyGroups = '+json.dumps(groups,indent=2)+';\n',encoding='utf-8')
print('Extracted',len(projects),'projects and',len(logos),'logos')

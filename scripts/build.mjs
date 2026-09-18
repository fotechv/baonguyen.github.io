import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
const styleVersion = createHash('sha256').update(await readFile(path.join(root, 'assets/style.css'))).digest('hex').slice(0, 12);
const config = JSON.parse(await readFile(path.join(root, 'site.config.json'), 'utf8'));
const escape = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const inline = (s) => escape(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
const projects = [
  { slug: 'english-platform', name: 'English Platform', type: 'EDUCATION · WEB APPLICATION', category: 'web', number: '01', title: 'Một nền tảng.\nKết nối cả lớp học.', description: 'Kết nối quản lý trung tâm tiếng Anh, giảng dạy và học tập trong một hệ thống SaaS đa đơn vị.', tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'LiveKit'], color: 'education', label: 'Nền tảng giáo dục', mark: 'E', roles: ['Quản trị nền tảng', 'Quản lý trung tâm', 'Giáo viên & học viên'] },
  { slug: 'auto-video-platform', name: 'Auto Video Platform', type: 'AI & AUTOMATION · MEDIA', category: 'ai', number: '02', title: 'Từ một video.\nĐến nhiều ngôn ngữ.', description: 'Quy trình xử lý video với AI: nhận dạng giọng nói, tạo phụ đề, dịch nội dung và tổng hợp giọng đọc.', tech: ['Go', 'Python', 'FFmpeg', 'React'], color: 'video', label: 'AI & tự động hóa', mark: 'V', roles: ['Âm thanh', 'Nhận dạng', 'Dịch thuật', 'Giọng đọc'] },
  { slug: 'tablepro', name: 'TablePro', type: 'DEVELOPER TOOLS · DESKTOP', category: 'desktop', number: '03', title: 'Không gian làm việc\ncủa dữ liệu.', description: 'Database client bằng C++ và Qt, với SQL editor, data grid và hệ thống connector dạng plugin.', tech: ['C++20', 'Qt 6', 'CMake', 'SQL'], color: 'database', label: 'Ứng dụng desktop', mark: 'T', roles: ['MySQL', 'PostgreSQL', 'SQLite', 'MariaDB'] },
];

projects.push(
  { slug: 'world-will-die', name: 'World Will Die', type: 'DATA & SIMULATION · WORLD ECONOMY', category: 'simulation', number: '04', title: 'Khám phá dữ liệu.\nMô phỏng những khả năng.', description: 'Khám phá dữ liệu kinh tế thế giới, xây dựng kịch bản what-if và phân tích tác động qua đồ thị nhân quả.', tech: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL'], label: 'Dữ liệu & mô phỏng' },
  { slug: 'oxy-iot', name: 'OxyIoT', type: 'IOT · REALTIME MONITORING', category: 'iot', number: '05', title: 'Kết nối thiết bị.\nTheo dõi từng biến động.', description: 'Thu thập dữ liệu thiết bị oxygen qua MQTT và Modbus, lưu lịch sử và cập nhật thông số theo thời gian thực.', tech: ['Go', 'MQTT', 'MongoDB', 'Redis'], label: 'IoT & giám sát thiết bị' },
);
const projectCount = String(projects.length).padStart(2, '0');

function art(p) {
  if (p.category === 'simulation' || p.category === 'iot') {
    const simulation = p.category === 'simulation';
    return `<div class="art ${simulation ? 'education' : 'video'}" aria-hidden="true"><span class="art-label">${simulation ? 'EXPLORE A CONNECTED WORLD.' : 'CONNECTED DEVICES. LIVE INSIGHTS.'}</span><div class="wave">${Array.from({ length: 29 }, (_, i) => `<i style="--bar:${20 + ((i * 23) % 80)}%;background:currentColor"></i>`).join('')}</div><div class="language-line"><span>${simulation ? 'What if?' : 'O₂'}</span><span>${simulation ? 'World economy' : 'Telemetry'}</span></div><div class="pipeline"><span>${simulation ? 'DATA' : 'DEVICE'}</span><b>→</b><span>${simulation ? 'SCENARIO' : 'MQTT'}</span><b>→</b><span>${simulation ? 'SIMULATION' : 'INSIGHTS'}</span></div><span class="art-bottom">${simulation ? 'MODEL / SIMULATE / EXPLORE' : 'COLLECT / STORE / MONITOR'}</span></div>`;
  }
  if (p.category === 'web') return `<div class="art education" aria-hidden="true"><span class="art-label">LEARNING, CONNECTED.</span><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="edu-core">e<span>English Platform</span></div><span class="orbit-tag tag-one">Trung tâm</span><span class="orbit-tag tag-two">Giáo viên</span><span class="orbit-tag tag-three">Học viên</span><span class="art-bottom">ONE PLATFORM / MANY POSSIBILITIES</span></div>`;
  if (p.category === 'ai') return `<div class="art video" aria-hidden="true"><span class="art-label">A NEW VOICE FOR YOUR VIDEO.</span><div class="wave">${Array.from({ length: 29 }, (_, i) => `<i style="--bar:${[18,30,50,75,42,95,62,38,82,100,65,35,57,90,45][i % 15]}%"></i>`).join('')}</div><div class="language-line"><span>Xin chào.</span><span>Hello.</span><span>こんにちは。</span></div><div class="pipeline"><span>VIDEO</span><b>→</b><span>AI</span><b>→</b><span>VOICE</span></div><span class="art-bottom">SPEECH / TRANSLATE / RENDER</span></div>`;
  return `<div class="art database" aria-hidden="true"><span class="art-label">A CLEARER VIEW OF YOUR DATA.</span><div class="db-window"><div class="window-top"><i></i><i></i><i></i><span>workspace.sql</span></div><div class="query"><em>SELECT</em> ideas, possibilities<br><em>FROM</em> your_next_project;</div><div class="data-lines"><span>id</span><span>project</span><span>type</span><span>01</span><span>TablePro</span><span>desktop</span><span>02</span><span>UI Kit</span><span>design</span></div></div><span class="art-bottom">CONNECT / QUERY / EXPLORE</span></div>`;
}

function contact(prefix) {
  return `<section class="contact wrap" id="lien-he"><div><p class="eyebrow">CÙNG XÂY DỰNG ĐIỀU TIẾP THEO</p><h2>Bài toán của bạn.<br><span>Giải pháp phù hợp.</span></h2><p>Trao đổi về sản phẩm, yêu cầu tùy chỉnh hoặc một ý tưởng phần mềm mới.</p></div><div class="contact-action">${config.email ? `<a class="button dark" href="mailto:${escape(config.email)}">Trao đổi qua email <span>↗</span></a>` : `<a class="button dark" href="${escape(config.github)}" target="_blank" rel="noopener noreferrer">Kết nối trên GitHub <span>↗</span></a>`}<span>Giáo dục · AI · Dữ liệu & mô phỏng · IoT</span></div></section>`;
}

function layout({ title, description, body, prefix = './', canonical = '', kind = 'website' }) {
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f6f5f0"><title>${escape(title)} | ${escape(config.name)}</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${escape(config.url + '/' + canonical)}"><meta property="og:type" content="${kind}"><meta property="og:title" content="${escape(title)} | ${escape(config.name)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(config.url + '/' + canonical)}"><meta property="og:locale" content="vi_VN"><meta property="og:image" content="${escape(config.url)}/assets/social.svg"><meta name="twitter:card" content="summary"><link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${prefix}assets/style.css?v=${styleVersion}"><script src="${prefix}assets/site.js" defer></script></head>
<body><a class="skip" href="#main">Đến nội dung chính</a><header class="header wrap"><a class="brand" href="${prefix}" aria-label="${escape(config.name)} — Trang chủ"><span class="brand-icon">f<span>↗</span></span>${escape(config.name)}</a><nav aria-label="Điều hướng chính"><a href="${prefix}#du-an">Dự án</a><a href="${prefix}#cach-tiep-can">Cách tiếp cận</a><a class="nav-contact" href="#lien-he">Kết nối <span>↗</span></a></nav></header>
<main id="main">${body}${contact(prefix)}</main><footer class="footer wrap"><a class="brand small" href="${prefix}">${escape(config.name)}</a><p>Phần mềm từ ý tưởng đến ứng dụng.</p><a href="${escape(config.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a><span>© ${new Date().getFullYear()} ${escape(config.name)}</span></footer></body></html>`;
}

function card(p) {
  return `<article class="project-card" data-category="${p.category}"><a class="art-link" href="./projects/${p.slug}/" aria-label="Khám phá ${p.name}">${art(p)}<span class="art-open">↗</span></a><div class="project-info"><span class="project-number">/${p.number}</span><div><p class="eyebrow">${p.type}</p><h3><a href="./projects/${p.slug}/">${p.name}</a></h3><p>${p.description}</p><div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div></div><a class="circle-link" href="./projects/${p.slug}/" aria-label="Đọc về ${p.name}">↗</a></div></article>`;
}

const home = `<section class="hero wrap"><div class="hero-top"><p class="eyebrow"><span class="green-dot"></span> INDEPENDENT SOFTWARE PORTFOLIO</p><span class="edition">SELECTED WORK / 01—${projectCount}</span></div><h1>Ý tưởng thực tế.<br>Phần mềm <span class="serif">hữu ích.</span><span class="hero-asterisk" aria-hidden="true">✳</span></h1><div class="hero-bottom"><p>Tôi xây dựng các giải pháp cho giáo dục,<br class="desktop-br"> AI, công cụ dữ liệu, mô phỏng và IoT.<br class="desktop-br"> Khám phá chức năng và công nghệ phía sau mỗi dự án.</p><a class="button dark" href="#du-an">Khám phá dự án <span>↘</span></a></div><div class="hero-foot"><span>WEB APPLICATIONS</span><span>AI & AUTOMATION</span><span>DESKTOP SOFTWARE</span><span class="scroll-note">CUỘN ĐỂ KHÁM PHÁ ↓</span></div></section>
<section class="work wrap" id="du-an"><div class="section-heading"><div><p class="eyebrow">01 / DỰ ÁN TIÊU BIỂU</p><h2>Những điều đã xây dựng<span class="count">(${projectCount})</span></h2></div><p>Mỗi dự án, một bài toán.<br>Mỗi công nghệ, một vai trò.</p></div><div class="filters" role="group" aria-label="Lọc dự án" hidden><button type="button" class="active" data-filter="all" aria-pressed="true">Tất cả <span>${projectCount}</span></button><button type="button" data-filter="web" aria-pressed="false">Web application</button><button type="button" data-filter="ai" aria-pressed="false">AI & tự động hóa</button><button type="button" data-filter="desktop" aria-pressed="false">Desktop</button><button type="button" data-filter="simulation" aria-pressed="false">Dữ liệu & mô phỏng</button><button type="button" data-filter="iot" aria-pressed="false">IoT</button></div><p class="sr-only" id="filter-status" role="status" aria-live="polite"></p><div class="project-grid">${projects.map(card).join('')}</div></section>
<section class="approach" id="cach-tiep-can"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">02 / CÁCH TIẾP CẬN</p><h2>Bắt đầu từ bài toán.<br>Đi sâu vào giải pháp.</h2></div><p>Giao diện dễ hiểu, chức năng có mục đích<br>và kiến trúc có thể phát triển tiếp.</p></div><div class="principles"><div><span>01 — HIỂU NHU CẦU</span><h3>Đúng việc cần làm.</h3><p>Xác định người sử dụng và quy trình thực tế để chọn chức năng phù hợp cho sản phẩm.</p></div><div><span>02 — CHỌN CÔNG NGHỆ</span><h3>Mỗi lớp, một vai trò.</h3><p>Từ web với React, dịch vụ Go và Python đến ứng dụng desktop C++/Qt — lựa chọn theo bài toán.</p></div><div><span>03 — TỔ CHỨC HỆ THỐNG</span><h3>Sẵn nền tảng để mở rộng.</h3><p>Phân tách thành phần, tái sử dụng giao diện và tổ chức nghiệp vụ để thuận tiện phát triển về sau.</p></div></div></div></section>`;

// Deliberately limited to the headings, paragraphs, bold text and tables used by these articles.
function renderArticle(markdown) {
  const lines = markdown.replace(/^\uFEFF/, '').replaceAll('\r', '').split('\n');
  const toc = []; let result = ''; let i = 0;
  const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map(s => s.trim());
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line.startsWith('# ')) { i++; continue; }
    if (line.startsWith('## ')) {
      const label = line.slice(3); const id = `section-${toc.length + 1}`;
      toc.push({ label, id }); result += `<h2 id="${id}">${inline(label)}</h2>`; i++; continue;
    }
    if (line.startsWith('|')) {
      const headings = cells(line); i++;
      if (!/^\|[\s:|\-]+\|$/.test(lines[i]?.trim() || '')) throw new Error('Invalid Markdown table');
      i++; let rows = '';
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows += `<tr>${cells(lines[i++]).map(c => `<td>${inline(c)}</td>`).join('')}</tr>`; }
      result += `<div class="table-scroll" role="region" aria-label="Công nghệ sử dụng" tabindex="0"><table><thead><tr>${headings.map(h => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`; continue;
    }
    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith('## ') && !lines[i].startsWith('|')) paragraph.push(lines[i++].trim());
    result += `<p>${inline(paragraph.join(' '))}</p>`;
  }
  return { html: result, toc };
}

await mkdir(path.join(out, 'assets'), { recursive: true });
await cp(path.join(root, 'assets'), path.join(out, 'assets'), { recursive: true });
await writeFile(path.join(out, 'index.html'), layout({ title: 'Ý tưởng thực tế. Phần mềm hữu ích.', description: config.description, body: home }));
for (const p of projects) {
  const { html, toc } = renderArticle(await readFile(path.join(root, 'content/projects', `${p.slug}.md`), 'utf8'));
  const body = `<section class="project-hero wrap"><a class="back" href="../../#du-an">← Tất cả dự án</a><p class="eyebrow">DỰ ÁN / ${p.number} — ${p.type}</p><h1>${p.name}</h1><p class="project-lead">${p.title.replace('\n', ' ')}</p><div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>${art(p)}</section><div class="article-layout wrap"><aside class="article-aside"><p class="eyebrow">TRONG BÀI VIẾT</p><nav aria-label="Mục lục bài viết">${toc.map(t => `<a href="#${t.id}">${escape(t.label)}</a>`).join('')}</nav><a class="aside-contact" href="#lien-he">Trao đổi về dự án ↗</a></aside><article class="prose" aria-label="Giới thiệu ${p.name}">${html}</article></div><section class="more-projects wrap"><p class="eyebrow">TIẾP TỤC KHÁM PHÁ</p><div>${projects.filter(x => x !== p).map(x => `<a href="../${x.slug}/"><span>${x.label}</span><h2>${x.name} ↗</h2></a>`).join('')}</div></section>`;
  await mkdir(path.join(out, 'projects', p.slug), { recursive: true });
  await writeFile(path.join(out, 'projects', p.slug, 'index.html'), layout({ title: p.name, description: p.description, prefix: '../../', canonical: `projects/${p.slug}/`, kind: 'article', body }));
}
await writeFile(path.join(out, '404.html'), layout({ title: 'Không tìm thấy trang', description: 'Trang bạn tìm không tồn tại.', prefix: '/', body: '<section class="wrap not-found"><p class="eyebrow">404 / KHÔNG TÌM THẤY TRANG</p><h1>Một lối rẽ khác.</h1><p>Trang này không tồn tại hoặc đã đổi địa chỉ.</p><a class="button dark" href="/">Về trang chủ ↗</a></section>' }));
await writeFile(path.join(out, '.nojekyll'), '');
await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.url}/sitemap.xml\n`);
await writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['', ...projects.map(p => `projects/${p.slug}/`)].map(p => `<url><loc>${escape(config.url + '/' + p)}</loc></url>`).join('')}</urlset>`);
console.log(`Built homepage, ${projects.length} project articles, 404 and SEO files in dist/`);

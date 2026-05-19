import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const sourceDir =
  process.env.N8N_SOURCE_DIR ||
  '/Users/nefisebora/Dropbox/Obsidian Vault/Sync/Yapay Zeka Notlarım Obsidian/Yapay Zeka/Yapay Zeka Otomasyonları/n8n 101';
const vaultRoot =
  process.env.OBSIDIAN_VAULT_DIR ||
  '/Users/nefisebora/Dropbox/Obsidian Vault/Sync/Yapay Zeka Notlarım Obsidian';

const publicAssetDir = path.join(siteRoot, 'assets', 'source');
const cssPath = path.join(siteRoot, 'assets', 'site.css');
const jsPath = path.join(siteRoot, 'assets', 'site.js');
const reportPath = path.join(siteRoot, 'content-generation-report.md');

const groupDefinitions = [
  { id: 'rehber', label: 'Rehber', shortLabel: 'Rehber', title: 'n8n Rehberi', description: 'Ders sırasında hızlıca dönüp bakacağınız ekran görüntülü kaynak.' },
  { id: 'baslangic', label: 'Başlangıç', shortLabel: 'Başlangıç', title: 'Başlangıç ve Arayüz', description: 'n8n mantığı, hesap açma, arayüz ve ilk workflow fikri.' },
  { id: 'temel-akis', label: 'Temel Akış', shortLabel: 'Temel', title: 'Temel Workflow Mantığı', description: 'Node, webhook, HTTP request, koşullar ve ilk uygulamalı akışlar.' },
  { id: 'entegrasyonlar', label: 'Entegrasyonlar', shortLabel: 'Entegrasyon', title: 'Gerçek Entegrasyonlar', description: 'Google Sheets, Telegram ve uçtan uca mini proje akışı.' },
  { id: 'yonetim', label: 'Yönetim', shortLabel: 'Yönetim', title: 'Paylaşım, Hata Yönetimi ve API', description: 'Workflow dışa aktarma, hata okuma ve API mantığını sahada kullanma.' },
  { id: 'auth', label: 'Authentication', shortLabel: 'Auth', title: 'Authentication Rehberi', description: 'OAuth, API key ve sık kullanılan servis bağlantıları.' }
];

const docGroupRules = [
  [/^1- n8n Nedir/i, 'baslangic'],
  [/Otomasyon 1\./i, 'baslangic'],
  [/Otomasyon [2-5]\./i, 'temel-akis'],
  [/Otomasyon [6-9]\./i, 'entegrasyonlar'],
  [/Otomasyon 1[01]\./i, 'yonetim'],
  [/API/i, 'yonetim'],
  [/Authentication|Sık Kulland/i, 'auth']
];

function main() {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Kaynak klasör bulunamadı: ${sourceDir}`);
  }

  fs.rmSync(publicAssetDir, { recursive: true, force: true });
  fs.mkdirSync(publicAssetDir, { recursive: true });
  fs.mkdirSync(path.dirname(cssPath), { recursive: true });

  const assetIndex = indexAssets(vaultRoot);
  const copiedAssets = new Map();
  const missingAssets = new Set();
  const docs = readDocuments(sourceDir);
  const groups = buildGroups(docs);
  const bookHtml = buildBookHtml(groups, assetIndex, copiedAssets, missingAssets);

  fs.writeFileSync(path.join(siteRoot, 'index.html'), buildStaticHtml(groups, bookHtml));
  fs.writeFileSync(cssPath, buildStaticCss());
  fs.writeFileSync(jsPath, buildStaticJs(groups));
  fs.writeFileSync(path.join(siteRoot, 'src', 'content', 'book.html'), bookHtml);
  fs.writeFileSync(path.join(siteRoot, 'src', 'content', 'sections.tsx'), buildSectionsTs(groups));
  fs.writeFileSync(reportPath, buildReport(docs, copiedAssets, missingAssets));
}

function readDocuments(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const absolutePath = path.join(dir, file);
      return {
        file,
        absolutePath,
        title: cleanTitle(file.replace(/\.md$/i, '')),
        id: slugify(file.replace(/\.md$/i, '')),
        order: sortOrder(file),
        raw: fs.readFileSync(absolutePath, 'utf8')
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'tr'));
}

function sortOrder(file) {
  if (/^1- n8n Nedir/i.test(file)) return 1;
  const chapter = file.match(/Otomasyon\s+(\d+)\./i)?.[1];
  if (chapter) return 10 + Number(chapter);
  if (/API/i.test(file)) return 40;
  if (/BONUS\s*1/i.test(file)) return 50;
  if (/BONUS\s*2/i.test(file)) return 51;
  if (/Sık Kulland/i.test(file)) return 52;
  return 100;
}

function buildGroups(docs) {
  const groups = groupDefinitions.map((group) => ({
    ...group,
    docs: [],
    nav: group.id === 'rehber' ? [{ id: 'cover', label: 'Kapak' }, { id: 'okuma-rehberi', label: 'Okuma Rehberi' }] : []
  }));

  docs.forEach((doc) => {
    const groupId = docGroupRules.find(([pattern]) => pattern.test(doc.file))?.[1] || 'temel-akis';
    groups.find((group) => group.id === groupId)?.docs.push(doc);
  });

  return groups.filter((group) => group.id === 'rehber' || group.docs.length > 0);
}

function buildBookHtml(groups, assetIndex, copiedAssets, missingAssets) {
  const parts = [];
  parts.push('<article class="page-wrap lesson-content">');
  parts.push(`
<header id="cover" class="cover">
  <div class="kicker">n8n 101</div>
  <h1>n8n Rehberi</h1>
  <p class="subtitle">Ekran görüntüleriyle desteklenmiş, derste yanınızda açık kalacak otomasyon kaynağı.</p>
  <div class="cover-meta">
    <span>Nefise Bora</span>
    <span>Katılımcı rehberi</span>
    <span>${countDocs(groups)} konu</span>
  </div>
</header>

<section id="okuma-rehberi" class="box good">
  <div class="box-title">Okuma Rehberi</div>
  <p>Bu kaynak, n8n dersinde gösterilen kısa rehberleri tek bir sitede toplar. Bölümler kendi başına okunabilir; derste ilgili başlığa geçip ekran görüntülerini takip etmeniz için tasarlandı.</p>
  <p>Kaynak notların özgün sırası, başlık yapısı, ekran görüntüleri ve GIF destekleri korunmuştur. Doğrudan öğrenci hitabı, sistem kuralına uygun şekilde <strong>siz</strong> diliyle düzenlenmiştir.</p>
</section>`);

  groups
    .filter((group) => group.id !== 'rehber')
    .forEach((group) => {
      group.nav.push({ id: group.id, label: group.title });
      parts.push(`
<section id="${group.id}" class="module-divider">
  <div class="kicker">${escapeHtml(group.shortLabel)}</div>
  <h2>${escapeHtml(group.title)}</h2>
  <p>${escapeHtml(group.description)}</p>
</section>`);

      group.docs.forEach((doc) => {
        const { html, navItems } = renderDocument(doc, assetIndex, copiedAssets, missingAssets);
        group.nav.push({ id: doc.id, label: doc.title });
        navItems.forEach((item) => group.nav.push(item));
        parts.push(`
<section id="${doc.id}" class="guide-doc">
  <div class="chapter-tag">${escapeHtml(group.shortLabel)}</div>
  <h2>${escapeHtml(doc.title)}</h2>
  ${html}
</section>`);
      });
    });

  parts.push(`
<section id="iletisim" class="author-contact" aria-labelledby="iletisim-baslik">
  <div>
    <p class="author-kicker">İletişim</p>
    <h2 id="iletisim-baslik">Nefise Bora tarafından hazırlandı</h2>
    <p>Eğitim, n8n otomasyonları ve yapay zekâ destekli iş akışlarıyla ilgili bağlantıda kalmak için LinkedIn üzerinden ulaşabilirsiniz.</p>
  </div>
  <a class="author-link" href="https://www.linkedin.com/in/nefisebora/" target="_blank" rel="noreferrer">LinkedIn profiline git</a>
</section>`);
  parts.push('</article>');
  return parts.join('\n');
}

function renderDocument(doc, assetIndex, copiedAssets, missingAssets) {
  const navItems = [];
  const preparedMarkdown = prepareMarkdown(doc.raw, assetIndex, copiedAssets, missingAssets);
  const html = renderMarkdown(preparedMarkdown, doc.id, navItems);
  return { html, navItems };
}

function prepareMarkdown(markdown, assetIndex, copiedAssets, missingAssets) {
  let text = normalizeAddress(markdown);
  text = text.replace(/!\[\[([^\]\|]+)(?:\|[^\]]+)?\]\]/g, (_match, rawName) => {
    const assetName = rawName.trim();
    const webPath = copyAsset(assetName, assetIndex, copiedAssets, missingAssets);
    if (!webPath) {
      return `\n\n<div class="box warn"><div class="box-title">Eksik Görsel</div><p>${escapeHtml(assetName)} bulunamadı.</p></div>\n\n`;
    }

    const caption = readableAssetCaption(assetName);
    return `\n\n<figure class="screen-figure"><img src="${webPath}" alt="${escapeHtml(caption)}" loading="lazy" decoding="async" /><figcaption>${escapeHtml(caption)}</figcaption></figure>\n\n`;
  });

  text = text.replace(/\[\[([^\]\|]+)\|([^\]]+)\]\]/g, '$2');
  text = text.replace(/\[\[([^\]]+)\]\]/g, '$1');
  return text;
}

function renderMarkdown(markdown, docId, navItems) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = null;
  let table = [];
  let quote = [];
  let code = null;

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list) return;
    html.push(`<${list.type}>${list.items.map((item) => `<li>${inline(item)}</li>`).join('')}</${list.type}>`);
    list = null;
  }

  function flushTable() {
    if (!table.length) return;
    const rows = table
      .filter((row) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(row))
      .map((row) => row.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));
    if (rows.length) {
      const [head, ...body] = rows;
      html.push(`<table><thead><tr>${head.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
    }
    table = [];
  }

  function flushQuote() {
    if (!quote.length) return;
    html.push(`<blockquote>${quote.map((line) => `<p>${inline(line)}</p>`).join('')}</blockquote>`);
    quote = [];
  }

  function flushAll() {
    flushParagraph();
    flushList();
    flushTable();
    flushQuote();
  }

  for (const line of lines) {
    if (code) {
      if (/^```/.test(line)) {
        html.push(`<pre><code>${escapeHtml(code.lines.join('\n'))}</code></pre>`);
        code = null;
      } else {
        code.lines.push(line);
      }
      continue;
    }

    const fence = line.match(/^```(\w+)?/);
    if (fence) {
      flushAll();
      code = { lang: fence[1] || '', lines: [] };
      continue;
    }

    if (!line.trim()) {
      flushAll();
      continue;
    }

    if (/^<figure|^<div class="box/.test(line.trim())) {
      flushAll();
      html.push(line.trim());
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushAll();
      const depth = heading[1].length;
      const text = heading[2].trim();
      const id = `${docId}-${slugify(stripMarkdown(text))}`;
      if (depth <= 3) navItems.push({ id, label: stripMarkdown(text) });
      html.push(`<h${depth} id="${id}">${inline(text)}</h${depth}>`);
      continue;
    }

    if (/^\s*\|.+\|\s*$/.test(line)) {
      flushParagraph();
      flushList();
      flushQuote();
      table.push(line);
      continue;
    }

    const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      flushTable();
      flushQuote();
      const type = ordered ? 'ol' : 'ul';
      if (!list || list.type !== type) flushList();
      if (!list) list = { type, items: [] };
      list.items.push((unordered || ordered)[1]);
      continue;
    }

    const quoted = line.match(/^>\s?(.*)$/);
    if (quoted) {
      flushParagraph();
      flushList();
      flushTable();
      quote.push(quoted[1]);
      continue;
    }

    if (/^\s*---+\s*$/.test(line)) {
      flushAll();
      html.push('<hr />');
      continue;
    }

    flushTable();
    paragraph.push(line.trim());
  }

  if (code) html.push(`<pre><code>${escapeHtml(code.lines.join('\n'))}</code></pre>`);
  flushAll();
  return html.join('\n');
}

function inline(value) {
  let text = escapeHtml(value);
  const codeParts = [];
  text = text.replace(/`([^`]+)`/g, (_match, codeValue) => {
    const token = `@@CODE${codeParts.length}@@`;
    codeParts.push(`<code>${codeValue}</code>`);
    return token;
  });
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const external = /^https?:\/\//.test(href) ? ' target="_blank" rel="noreferrer"' : '';
    return `<a href="${href}"${external}>${label}</a>`;
  });
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  codeParts.forEach((codeValue, index) => {
    text = text.replace(`@@CODE${index}@@`, codeValue);
  });
  return text;
}

function normalizeAddress(markdown) {
  const replacements = [
    [/Tarayıcından/g, 'Tarayıcınızdan'],
    [/tarayıcından/g, 'tarayıcınızdan'],
    [/Elinde kahveni tut, rahatla/g, 'Kahvenizi alın, rahatlayın'],
    [/Hazırsan/g, 'Hazırsanız'],
    [/hazırsan/g, 'hazırsanız'],
    [/Merak etme/g, 'Merak etmeyin'],
    [/Endişe etme/g, 'Endişe etmeyin'],
    [/\bsenin\b/gi, 'sizin'],
    [/\bseni\b/gi, 'sizi'],
    [/\bsana\b/gi, 'size'],
    [/\bsen\b/gi, 'siz'],
    [/diyorsan/g, 'diyorsanız'],
    [/yerdesin/g, 'yerdesiniz'],
    [/bilmiyorsan/g, 'bilmiyorsanız'],
    [/istiyorsan/g, 'istiyorsanız'],
    [/İstersen/g, 'İsterseniz'],
    [/istersen/g, 'isterseniz'],
    [/öğreneceğiz/g, 'öğreneceğiz'],
    [/oluşturmanı/g, 'oluşturmanızı'],
    [/oluşturmanıza/g, 'oluşturmanıza'],
    [/tanımlarsın/g, 'tanımlarsınız'],
    [/yazarsın/g, 'yazarsınız'],
    [/yazmanı/g, 'yazmanızı'],
    [/kanıtlarsın/g, 'kanıtlarsınız'],
    [/diyorsun/g, 'diyorsunuz'],
    [/dersin/g, 'dersiniz'],
    [/onaylarsın/g, 'onaylarsınız'],
    [/seçersin/g, 'seçersiniz'],
    [/göreceksin/g, 'göreceksiniz'],
    [/alacaksın/g, 'alacaksınız'],
    [/geldiğinde/g, 'geldiğinde'],
    [/gittiğinde/g, 'gittiğinizde'],
    [/yaptığında/g, 'yaptığınızda'],
    [/ekranındasın/g, 'ekranındasınız'],
    [/görüyorsun/g, 'görüyorsunuz'],
    [/gerçekleştirdiğin/g, 'gerçekleştirdiğiniz'],
    [/işlemlerini/g, 'işlemlerinizi'],
    [/workflow’larını/g, 'workflow’larınızı'],
    [/workflow'larını/g, "workflow'larınızı"],
    [/otomasyonlarını/g, 'otomasyonlarınızı'],
    [/otomasyonlarını kurabileceğiniz/g, 'otomasyonlarınızı kurabileceğiniz'],
    [/otomasyonunu/g, 'otomasyonunuzu'],
    [/sistemini/g, 'sisteminizi'],
    [/sistemlerin/g, 'sistemleriniz'],
    [/sistemin/g, 'sisteminiz'],
    [/kodunu/g, 'kodunuzu'],
    [/botun/g, 'botunuz'],
    [/hesabını/g, 'hesabınızı'],
    [/Google hesabınla/g, 'Google hesabınızla'],
    [/aldığın/g, 'aldığınız'],
    [/indirdiğin/g, 'indirdiğiniz'],
    [/oluşturduğun/g, 'oluşturduğunuz'],
    [/istediğin/g, 'istediğiniz'],
    [/istediğin kişiyle/g, 'istediğiniz kişiyle'],
    [/ihtiyacına/g, 'ihtiyacınıza'],
    [/e-postana/g, 'e-postanıza'],
    [/e-posta adresin/g, 'e-posta adresiniz'],
    [/API Key’ini/g, 'API Key’inizi'],
    [/Anahtarını/g, 'Anahtarınızı'],
    [/kullanıcı adın/g, 'kullanıcı adınız'],
    [/test grubun/g, 'test grubunuz'],
    [/haberin olacak/g, 'haberiniz olacak'],
    [/işin bölünmeyecek/g, 'işiniz bölünmeyecek'],
    [/haberdarsın/g, 'haberdarsınız'],
    [/bağladın/g, 'bağladınız'],
    [/seçebilirsin/g, 'seçebilirsiniz'],
    [/edebilirsin/g, 'edebilirsiniz'],
    [/erişebilirsin/g, 'erişebilirsiniz'],
    [/ulaşmanı/g, 'ulaşmanızı'],
    [/görmeni/g, 'görmenizi'],
    [/kurabileceğin/g, 'kurabileceğiniz'],
    [/Kullanabileceğin/g, 'Kullanabileceğiniz'],
    [/kullanabileceğin/g, 'kullanabileceğiniz'],
    [/kullanabilirsin/g, 'kullanabilirsiniz'],
    [/kurabilirsin/g, 'kurabilirsiniz'],
    [/alabilirsin/g, 'alabilirsiniz'],
    [/ulaşabilirsin/g, 'ulaşabilirsiniz'],
    [/edebilirsin/g, 'edebilirsiniz'],
    [/görebilirsin/g, 'görebilirsiniz'],
    [/oluşturursun/g, 'oluşturursunuz'],
    [/yaparsın/g, 'yaparsınız'],
    [/tıklayabilirsin/g, 'tıklayabilirsiniz'],
    [/başlayabilirsin/g, 'başlayabilirsiniz'],
    [/kopyalayabilirsin/g, 'kopyalayabilirsiniz'],
    [/olursun/g, 'olursunuz'],
    [/çalışma masan/g, 'çalışma masanız'],
    [/canvas alanın/g, 'canvas alanınız'],
    [/robot yardımcın/g, 'robot yardımcınız'],
    [/otomasyon sistemin/g, 'otomasyon sisteminiz'],
    [/web sitendeki/g, 'web sitenizdeki'],
    [/web sitene/g, 'web sitenize'],
    [/ilgini/g, 'ilginizi'],
    [/hesabına/g, 'hesabınıza'],
    [/uygulamana/g, 'uygulamanıza'],
    [/uygulamanı/g, 'uygulamanızı'],
    [/oluşturacaksan/g, 'oluşturacaksanız'],
    [/kullanıyorsan/g, 'kullanıyorsanız'],
    [/oluşturmadıysan/g, 'oluşturmadıysanız'],
    [/adını göreceğin/g, 'adınızı göreceğiniz'],
    [/kuracağın/g, 'kuracağınız'],
    [/yapmana/g, 'yapmanıza'],
    [/olman/g, 'olmanız'],
    [/(?<![\p{L}])tıkla(?![\p{L}])/gu, 'tıklayın'],
    [/(?<![\p{L}])git(?![\p{L}])/gu, 'gidin'],
    [/(?<![\p{L}])gir(?![\p{L}])/gu, 'girin'],
    [/(?<![\p{L}])seç(?![\p{L}])/gu, 'seçin'],
    [/(?<![\p{L}])ekle(?![\p{L}])/gu, 'ekleyin'],
    [/(?<![\p{L}])ayarla(?![\p{L}])/gu, 'ayarlayın'],
    [/(?<![\p{L}])kopyala(?![\p{L}])/gu, 'kopyalayın'],
    [/(?<![\p{L}])yapıştır(?![\p{L}])/gu, 'yapıştırın'],
    [/(?<![\p{L}])yaz(?![\p{L}])/gu, 'yazın'],
    [/(?<![\p{L}])incele(?![\p{L}])/gu, 'inceleyin'],
    [/(?<![\p{L}])oku(?![\p{L}])/gu, 'okuyun'],
    [/(?<![\p{L}])bas(?![\p{L}])/gu, 'basın'],
    [/(?<![\p{L}])dön(?![\p{L}])/gu, 'dönün'],
    [/(?<![\p{L}])ver(?![\p{L}])/gu, 'verin'],
    [/(?<![\p{L}])kaydet(?![\p{L}])/gu, 'kaydedin'],
    [/(?<![\p{L}])yükle(?![\p{L}])/gu, 'yükleyin'],
    [/(?<![\p{L}])sakla(?![\p{L}])/gu, 'saklayın'],
    [/\bdeneyebilirsin\b/g, 'deneyebilirsiniz'],
    [/siz restorana gittin/g, 'siz restorana gittiniz'],
    [/Garsona "bir pizza" dedin/g, 'Garsona "bir pizza" dediniz'],
    [/pizzanı size getirdi/g, 'pizzanızı size getirdi'],
    [/işi kendin yapacaktın/g, 'işi kendiniz yapacaktınız'],
    [/siz kim olduğunu kanıtlarsınız/g, 'siz kim olduğunuzu kanıtlarsınız'],
    [/sizin Gmail’ine/g, 'sizin Gmail hesabınıza'],
    [/kim olduğunu kanıtla/g, 'kim olduğunuzu kanıtlayın'],
    [/bunu kopyalayın/gi, 'bunu kopyalayın'],
    [/Bunu kopyalayın/g, 'Bunu kopyalayın'],
    [/sizin adına/g, 'sizin adınıza'],
    [/sizin workflow’larının/g, 'sizin workflow’larınızın'],
    [/sizin workflow'larının/g, "sizin workflow'larınızın"],
    [/Böylece n8n’de “elle veri üretmeyi” öğrenmiş olursun/g, 'Böylece n8n’de “elle veri üretmeyi” öğrenmiş olursunuz'],
    [/Devam et, daha iyisini yaparsınız/g, 'Devam edin, daha iyisini yaparsınız'],
    [/Bu kadar basit! Artık kritik olaylardan anında haberdarsınız/g, 'Bu kadar basit. Artık kritik olaylardan anında haberdarsınız'],
    [/Bitti! Artık biri form gönderince otomatik e-posta alıyorsun/g, 'Bitti. Artık biri form gönderince otomatik e-posta alıyorsunuz'],
    [/Hadi başlayalım!/g, 'Başlayalım.'],
    [/Devam etmek ister misin/g, 'Devam etmek ister misiniz'],
    [/kayıt ol/g, 'kayıt olun'],
    [/kurmaya başla/g, 'kurmaya başlayın'],
    [/hesabınıza giriş yap/g, 'hesabınıza giriş yapın'],
    [/Google hesabınızla giriş yap/g, 'Google hesabınızla giriş yapın'],
    [/giriş yap →/g, 'giriş yapın →'],
    [/izinleri seç/g, 'izinleri seçin'],
    [/onu seç →/g, 'onu seçin →'],
    [/Gmail hesabı kullanıyorsanız <strong>External<\/strong>, Workspace kullanıyorsanız <strong>Internal<\/strong> seç/g, 'Gmail hesabı kullanıyorsanız **External**, Workspace kullanıyorsanız **Internal** seçin'],
    [/Uygulama türü olarak <strong>Web Application<\/strong> seç/g, 'Uygulama türü olarak **Web Application** seçin'],
    [/seç\. /g, 'seçin. '],
    [/seç  /g, 'seçin  '],
    [/seç \)/g, 'seçin)'],
    [/tamamla/g, 'tamamlayın'],
    [/yolunu izle/g, 'yolunu izleyin'],
    [/destek e-postanı/g, 'destek e-postanızı'],
    [/Destek e-postanı/g, 'Destek e-postanızı'],
    [/Unutma/g, 'Unutmayın'],
    [/yapman gerekiyor/g, 'yapmanız gerekiyor'],
    [/girmen yeterlidir/g, 'girmeniz yeterlidir'],
    [/mısın/g, 'mısınız'],
    [/misin/g, 'misiniz'],
    [/musun/g, 'musunuz'],
    [/kim olduğunuzu kanıtlayınması/g, 'kimliğinizi kanıtlamak'],
    [/sizin yerine/g, 'sizin yerinize'],
    [/siz restorana/g, 'Siz restorana'],
    [/siz mutfağa/g, 'Siz mutfağa'],
    [/siz kim/g, 'Siz kim'],
    [/siz ona/g, 'Siz ona'],
    [/siz n8n/g, 'Siz n8n'],
    [/siz onaylarsınız/g, 'Siz onaylarsınız'],
    [/siz de/g, 'Siz de'],
    [/siz Client/g, 'Siz Client'],
    [/Bu adımda hangi uygulama için credential oluşturacaksanız onu seç/g, 'Bu adımda hangi uygulama için credential oluşturacaksanız onu seçin'],
    [/Ona sorular sorabilir, metin yazdırabilir veya otomatik yanıtlar oluşturabilirsin/g, 'Ona sorular sorabilir, metin yazdırabilir veya otomatik yanıtlar oluşturabilirsiniz'],
    [/Tekrar giriş yaptığında/g, 'Tekrar giriş yaptığınızda'],
    [/beklemen gerekebilir/g, 'beklemeniz gerekebilir'],
    [/kurabiliyorsun/g, 'kurabiliyorsunuz'],
    [/kurmaya başlayınmadan/g, 'başlamadan'],
    [/canvas alanın/g, 'canvas alanınız'],
    [/tamamlayındık/g, 'tamamladık'],
    [/seçinin/g, 'seçin'],
    [/tamamlayınr/g, 'tamamlar'],
    [/oluşturabilirsin/g, 'oluşturabilirsiniz'],
    [/misiniziz/g, 'misiniz'],
    [/uygulamanızıza/g, 'uygulamanıza'],
    [/öğrenmiş olursunuzuz/g, 'öğrenmiş olursunuz'],
    [/Hesabına giriş yap/g, 'Hesabınıza giriş yapın'],
    [/kullanacağın servisleri ara ve enable yap/g, 'kullanacağınız servisleri arayın ve enable yapın'],
    [/İhtiyacına göre/g, 'İhtiyacınıza göre'],
    [/açabilirsin/g, 'açabilirsiniz'],
    [/Hayal et/g, 'Hayal edin'],
    [/kimin kimliğinizi kanıtlamak/g, 'kimliğinizi kanıtlamak'],
    [/sisteminizizi/g, 'sisteminizi'],
    [/edebilirsiniziz/g, 'edebilirsiniz'],
    [/yazını/g, 'yazı'],
    [/gerçekleyin/g, 'gerçekle'],
    [/seçinim/g, 'seçim'],
    [/dönünüş/g, 'dönüş']
  ];

  return replacements
    .reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), markdown)
    .replace(/başlayınmadan/g, 'başlamadan')
    .replace(/\*\*canvas\*\* alanın/g, '**canvas** alanınız')
    .replace(/edebilirsiniziz/g, 'edebilirsiniz')
    .replace(/misiniziz/g, 'misiniz')
    .replace(/oluşturabilirsiniziz/g, 'oluşturabilirsiniz')
    .replace(/Yeni içerikler oluşturabilirsiniz/g, 'Yeni içerikler oluşturabilir')
    .replace(/uygulamanızıza/g, 'uygulamanıza')
    .replace(/öğrenmiş olursunuzuz/g, 'öğrenmiş olursunuz')
    .replace(/tamamlayındık/g, 'tamamladık')
    .replace(/tamamlayınr/g, 'tamamlar')
    .replace(/seçinin/g, 'seçin')
    .replace(/Kurduğun sistem/g, 'Kurduğunuz sistem')
    .replace(/sisteminiz yedeğini/g, 'sisteminizin yedeğini')
    .replace(/Hesabına giriş yap/g, 'Hesabınıza giriş yapın')
    .replace(/hesabına giriş yap/g, 'hesabınıza giriş yapın')
    .replace(/hesabınızı bağla/g, 'hesabınızı bağlayın')
    .replace(/Yetkileri onayla/g, 'Yetkileri onaylayın')
    .replace(/Çalıştır ve/g, 'Çalıştırın ve')
    .replace(/Çalıştır  /g, 'Çalıştırın  ')
    .replace(/kontrol et/g, 'kontrol edin')
    .replace(/node ekleyin/g, 'node ekleyin')
    .replace(/node ekle/g, 'node ekleyin')
    .replace(/birbirine bağla/g, 'birbirine bağlayın')
    .replace(/aktif hale getir/g, 'aktif hale getirin')
    .replace(/bu kopyalayın/gi, 'bunu kopyalayın')
    .replace(/Git bu servisten veri al/g, 'Bu servisten veri al');
}

function indexAssets(root) {
  const index = new Map();
  walk(root, (file) => {
    if (!/\.(png|jpe?g|gif|webp)$/i.test(file)) return;
    if (file.includes(`${path.sep}.trash${path.sep}`)) return;
    const name = path.basename(file);
    if (!index.has(name)) index.set(name, file);
  });
  return index;
}

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(absolute, callback);
      return;
    }
    callback(absolute);
  });
}

function copyAsset(assetName, assetIndex, copiedAssets, missingAssets) {
  const source = assetIndex.get(assetName);
  if (!source) {
    missingAssets.add(assetName);
    return null;
  }
  if (copiedAssets.has(assetName)) return copiedAssets.get(assetName).webPath;

  const ext = path.extname(assetName);
  const base = slugify(path.basename(assetName, ext)) || `asset-${copiedAssets.size + 1}`;
  const fileName = `${base}${ext.toLowerCase()}`;
  const target = path.join(publicAssetDir, fileName);
  fs.copyFileSync(source, target);
  const webPath = `assets/source/${fileName}`;
  copiedAssets.set(assetName, { source, target, webPath });
  return webPath;
}

function buildStaticHtml(groups, bookHtml) {
  const moduleJson = JSON.stringify(
    groups.map((group) => ({
      id: group.id,
      label: group.label,
      startId: group.id === 'rehber' ? 'cover' : group.id,
      nav: group.nav
    }))
  ).replaceAll('</', '<\\/');

  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Nefise Bora'nın n8n 101 dersi için hazırlanan ekran görüntülü otomasyon rehberi." />
    <title>n8n Rehberi | Nefise Bora</title>
    <link rel="stylesheet" href="assets/site.css" />
  </head>
  <body>
    <div class="app-shell">
      <header class="top-nav" aria-label="Ana bölümler">
        <div class="top-nav-inner">
          <button class="mobile-nav-toggle" type="button" data-toggle-side>Bölümler</button>
          <div class="brand-lockup">
            <span>n8n Rehberi</span>
            <strong>Katılımcı Kaynağı</strong>
            <a href="https://www.linkedin.com/in/nefisebora/" target="_blank" rel="noreferrer">Nefise Bora tarafından hazırlandı</a>
          </div>
          <nav class="module-tabs" aria-label="Modül seçimi">
            ${groups.map((group) => `<a href="#${group.id === 'rehber' ? 'cover' : group.id}" data-module-tab="${group.id}">${escapeHtml(group.shortLabel)}</a>`).join('\n            ')}
          </nav>
        </div>
      </header>
      <main class="course-shell">
        <button class="side-nav-scrim" type="button" aria-label="Alt navigasyonu kapat" data-close-side></button>
        <aside class="side-nav" aria-label="Bölüm içindekiler" data-side-nav>
          <div class="side-nav-card">
            <div class="side-nav-heading">
              <span>İçindekiler</span>
              <strong data-side-title>Rehber</strong>
            </div>
            <nav data-side-list></nav>
          </div>
        </aside>
        <div class="content-column">${bookHtml}</div>
      </main>
    </div>
    <script type="application/json" id="module-data">${moduleJson}</script>
    <script src="assets/site.js"></script>
  </body>
</html>
`;
}

function buildStaticCss() {
  const original = fs.readFileSync(path.join(siteRoot, 'src', 'original.css'), 'utf8');
  const appCss = fs.readFileSync(path.join(siteRoot, 'src', 'styles.css'), 'utf8').replace("@import './original.css';", '');
  return `${original}\n\n${appCss}\n\n.module-tabs a {\n  min-height: 36px;\n  padding: 0 13px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  display: inline-flex;\n  align-items: center;\n  background: transparent;\n  color: var(--ink-muted);\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n  font-size: 13px;\n  font-weight: 700;\n  text-decoration: none;\n}\n.module-tabs a:hover,\n.module-tabs a.active {\n  border-color: rgba(255, 109, 90, 0.42);\n  background: rgba(255, 109, 90, 0.12);\n  color: var(--navy-dark);\n}\n.side-nav nav a {\n  width: 100%;\n  min-height: 34px;\n  border-left: 3px solid transparent;\n  border-radius: 3px;\n  display: flex;\n  align-items: center;\n  color: var(--ink-muted);\n  padding: 7px 8px 7px 12px;\n  text-align: left;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n  font-size: 13px;\n  line-height: 1.25;\n  text-decoration: none;\n}\n.side-nav nav a:hover,\n.side-nav nav a.active {\n  border-left-color: var(--gold);\n  background: rgba(255, 109, 90, 0.12);\n  color: var(--navy-dark);\n}\n.lesson-content { max-width: 880px; }\n@media print { .top-nav, .side-nav, .side-nav-scrim { display: none !important; } .course-shell { display: block; width: auto; } }\n`;
}

function buildStaticJs(groups) {
  return `const modules = JSON.parse(document.getElementById('module-data').textContent);
const tabs = Array.from(document.querySelectorAll('[data-module-tab]'));
const sideNav = document.querySelector('[data-side-nav]');
const sideList = document.querySelector('[data-side-list]');
const sideTitle = document.querySelector('[data-side-title]');
const toggleSide = document.querySelector('[data-toggle-side]');
const closeSide = document.querySelector('[data-close-side]');

function setSideOpen(open) {
  sideNav.classList.toggle('open', open);
  closeSide.classList.toggle('visible', open);
}

function renderSide(module) {
  sideTitle.textContent = module.label;
  sideList.innerHTML = module.nav.map((item) => '<a href="#' + item.id + '" data-side-link="' + item.id + '">' + item.label + '</a>').join('');
}

function activeModule() {
  let current = modules[0];
  for (const module of modules) {
    const target = document.getElementById(module.startId);
    if (target && target.getBoundingClientRect().top <= 140) current = module;
  }
  return current;
}

function activeAnchor(module) {
  let current = module.nav[0]?.id;
  for (const item of module.nav) {
    const target = document.getElementById(item.id);
    if (target && target.getBoundingClientRect().top <= 150) current = item.id;
  }
  return current;
}

function syncNav() {
  const module = activeModule();
  if (sideTitle.textContent !== module.label) renderSide(module);
  const anchor = activeAnchor(module);
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.moduleTab === module.id));
  document.querySelectorAll('[data-side-link]').forEach((link) => {
    link.classList.toggle('active', link.dataset.sideLink === anchor);
  });
}

toggleSide.addEventListener('click', () => setSideOpen(true));
closeSide.addEventListener('click', () => setSideOpen(false));
sideList.addEventListener('click', () => setSideOpen(false));
window.addEventListener('scroll', syncNav, { passive: true });
window.addEventListener('resize', syncNav);
renderSide(modules[0]);
syncNav();
`;
}

function buildSectionsTs(groups) {
  const modules = groups.map((group, index) => {
    const next = groups[index + 1];
    return {
      id: group.id,
      label: group.label,
      shortLabel: group.shortLabel,
      startId: group.id === 'rehber' ? 'cover' : group.id,
      endBeforeId: next ? (next.id === 'rehber' ? 'cover' : next.id) : undefined,
      nav: group.nav
    };
  });

  const ids = modules.map((module) => `'${module.id}'`).join(' | ');
  return `export type ModuleId = ${ids};

export interface NavItem {
  id: string;
  label: string;
}

export interface CourseModule {
  id: ModuleId;
  label: string;
  shortLabel: string;
  startId: string;
  endBeforeId?: string;
  nav: NavItem[];
}

export const courseModules: CourseModule[] = ${JSON.stringify(modules, null, 2)};

export const defaultModuleId: ModuleId = 'rehber';

export function getModuleById(id: string | null | undefined): CourseModule | undefined {
  return courseModules.find((module) => module.id === id);
}

export function getModuleForAnchor(anchorId: string): CourseModule | undefined {
  return courseModules.find((module) =>
    module.nav.some((item) => item.id === anchorId || module.startId === anchorId)
  );
}
`;
}

function buildReport(docs, copiedAssets, missingAssets) {
  const lines = [
    '# n8n Rehberi İçerik Üretim Raporu',
    '',
    `- Kaynak klasör: \`${sourceDir}\``,
    `- İşlenen Markdown dosyası: ${docs.length}`,
    `- Kopyalanan görsel/GIF: ${copiedAssets.size}`,
    `- Eksik görsel/GIF: ${missingAssets.size}`,
    '',
    '## İşlenen Dosyalar',
    ''
  ];

  docs.forEach((doc) => lines.push(`- ${doc.title}`));
  if (missingAssets.size > 0) {
    lines.push('', '## Eksik Görseller', '');
    Array.from(missingAssets).forEach((asset) => lines.push(`- ${asset}`));
  }
  lines.push('', '## Hitap Dili', '', '- Kaynak içerik site üretiminde `siz` hitabına normalize edildi.');
  return `${lines.join('\n')}\n`;
}

function countDocs(groups) {
  return groups.reduce((sum, group) => sum + group.docs.length, 0);
}

function readableAssetCaption(assetName) {
  return assetName
    .replace(/\.(png|jpe?g|gif|webp)$/i, '')
    .replace(/^Pasted image\s*/i, 'Ekran görüntüsü ')
    .replace(/[-_]+/g, ' ')
    .trim();
}

function cleanTitle(value) {
  return value.replace(/\s+/g, ' ').replace(/\s+–\s+/g, ' - ').trim();
}

function stripMarkdown(value) {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

main();

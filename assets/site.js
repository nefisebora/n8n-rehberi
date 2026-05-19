const modules = JSON.parse(document.getElementById('module-data').textContent);
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

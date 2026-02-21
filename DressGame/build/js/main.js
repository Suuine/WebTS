"use strict";
let LAYER_MAP = {};
let data = {};
const selected = {};
const categoryMenuEl = document.getElementById('category-menu');
const optionsListEl = document.getElementById('options-list');
const categoryLabelEl = document.getElementById('category-label');
fetch('./data.json')
    .then((response) => {
    if (!response.ok)
        throw new Error(`HTTP error: ${response.status}`);
    return response.json();
})
    .then((json) => {
    data = json;
    Object.keys(data).forEach((cat) => {
        selected[cat] = null;
    });
    Object.keys(data).forEach((cat) => {
        LAYER_MAP[cat] = cat
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .replace(/^-/, '');
    });
    buildCategoryMenu();
    const firstCat = Object.keys(data)[0];
    if (firstCat)
        showCategory(firstCat);
})
    .catch((err) => {
    categoryMenuEl.innerHTML = `<span class="error-msg">❌ Не вдалось завантажити data.json: ${err.message}</span>`;
    console.error('Fetch error:', err);
});
function buildCategoryMenu() {
    categoryMenuEl.innerHTML = '';
    Object.keys(data).forEach((cat) => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'category-btn';
        link.textContent = cat.replace(/([A-Z])/g, ' $1').trim();
        link.dataset['cat'] = cat;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showCategory(cat);
        });
        categoryMenuEl.appendChild(link);
    });
    const specialsLink = document.createElement('a');
    specialsLink.href = '#';
    specialsLink.className = 'category-btn specials';
    specialsLink.textContent = '✨ Specials';
    specialsLink.addEventListener('click', (e) => {
        e.preventDefault();
        const cats = Object.keys(data);
        const randomCat = cats[Math.floor(Math.random() * cats.length)];
        if (randomCat) {
            setActiveBtn(specialsLink);
            showCategory(randomCat, true);
        }
    });
    categoryMenuEl.appendChild(specialsLink);
}
function showCategory(cat, isSpecials = false) {
    if (!isSpecials) {
        const btn = categoryMenuEl.querySelector(`[data-cat="${cat}"]`);
        if (btn)
            setActiveBtn(btn);
    }
    const displayName = cat.replace(/([A-Z])/g, ' $1').trim();
    categoryLabelEl.innerHTML = isSpecials
        ? `${displayName} <span class="specials-badge">✨ Specials pick!</span>`
        : displayName;
    renderItems(cat);
}
function setActiveBtn(activeBtn) {
    categoryMenuEl.querySelectorAll('.category-btn').forEach((b) => {
        b.classList.remove('active');
    });
    activeBtn.classList.add('active');
}
function renderItems(cat) {
    optionsListEl.innerHTML = '';
    const items = data[cat];
    if (!items)
        return;
    const noneCard = document.createElement('div');
    noneCard.className = 'none-card' + (selected[cat] === null ? ' selected' : '');
    noneCard.title = 'None';
    noneCard.textContent = '✕';
    noneCard.addEventListener('click', () => applyItem(cat, null));
    optionsListEl.appendChild(noneCard);
    items.forEach((item) => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.name;
        img.title = item.name;
        img.className = 'item-icon' + (selected[cat] === item.id ? ' selected' : '');
        img.loading = 'lazy';
        img.addEventListener('click', () => applyItem(cat, item));
        optionsListEl.appendChild(img);
    });
}
function applyItem(cat, item) {
    selected[cat] = item ? item.id : null;
    const layerId = LAYER_MAP[cat];
    if (layerId) {
        const layer = document.getElementById(layerId);
        if (layer)
            layer.src = item ? item.src : '';
    }
    renderItems(cat);
}
//# sourceMappingURL=main.js.map
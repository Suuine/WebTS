interface ClothingItem {
    id: number;
    name: string;
    shortName: string;
    src: string;
    description: string;
}

interface GameData {
    [key: string]: ClothingItem[];
}

let LAYER_MAP: Record<string, string> = {};

let data: GameData = {};
const selected: Record<string, number | null> = {};


const categoryMenuEl  = document.getElementById('category-menu')!;
const optionsListEl   = document.getElementById('options-list')!;
const categoryLabelEl = document.getElementById('category-label')!;

fetch('./data.json')
    .then((response: Response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
    })
    .then((json: GameData) => {
        data = json;

        Object.keys(data).forEach((cat: string) => {
            selected[cat] = null;
        });

        Object.keys(data).forEach((cat: string) => {
    LAYER_MAP[cat] = cat
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');
});

        buildCategoryMenu();

        const firstCat = Object.keys(data)[0];
        if (firstCat) showCategory(firstCat);
    })
    .catch((err: Error) => {
        categoryMenuEl.innerHTML = `<span class="error-msg">❌ Не вдалось завантажити data.json: ${err.message}</span>`;
        console.error('Fetch error:', err);
    });

function buildCategoryMenu(): void {
    categoryMenuEl.innerHTML = '';

    Object.keys(data).forEach((cat: string) => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'category-btn';
        link.textContent = cat.replace(/([A-Z])/g, ' $1').trim();
        link.dataset['cat'] = cat;

        link.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            showCategory(cat);
        });

        categoryMenuEl.appendChild(link);
    });

    const specialsLink = document.createElement('a');
    specialsLink.href = '#';
    specialsLink.className = 'category-btn specials';
    specialsLink.textContent = '✨ Specials';

    specialsLink.addEventListener('click', (e: MouseEvent) => {
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

function showCategory(cat: string, isSpecials: boolean = false): void {
    if (!isSpecials) {
        const btn = categoryMenuEl.querySelector<HTMLElement>(`[data-cat="${cat}"]`);
        if (btn) setActiveBtn(btn);
    }

    const displayName = cat.replace(/([A-Z])/g, ' $1').trim();
    categoryLabelEl.innerHTML = isSpecials
        ? `${displayName} <span class="specials-badge">✨ Specials pick!</span>`
        : displayName;

    renderItems(cat);
}

function setActiveBtn(activeBtn: HTMLElement): void {
    categoryMenuEl.querySelectorAll('.category-btn').forEach((b: Element) => {
        b.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function renderItems(cat: string): void {
    optionsListEl.innerHTML = '';

    const items: ClothingItem[] | undefined = data[cat];
    if (!items) return;

    const noneCard = document.createElement('div');
    noneCard.className = 'none-card' + (selected[cat] === null ? ' selected' : '');
    noneCard.title = 'None';
    noneCard.textContent = '✕';
    noneCard.addEventListener('click', () => applyItem(cat, null));
    optionsListEl.appendChild(noneCard);

    items.forEach((item: ClothingItem) => {
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

function applyItem(cat: string, item: ClothingItem | null): void {
    selected[cat] = item ? item.id : null;

    const layerId: string | undefined = LAYER_MAP[cat];
    if (layerId) {
        const layer = document.getElementById(layerId) as HTMLImageElement | null;
        if (layer) layer.src = item ? item.src : '';
    }

    renderItems(cat);
}
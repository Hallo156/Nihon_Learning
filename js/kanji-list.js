/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* kanji-list.js — Kanji-Karteikarten: Flip-Cards, nach Level und Kategorie gruppiert.
   Kategorien sind ausklappbar (<details>/<summary>). Aufklapppzustand wird in
   sessionStorage gespeichert (bleibt bei Sprach-/Levelwechsel erhalten).
   Braucht: common.js, i18n.js, kanji-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getMeaning(k) {
    return currentLang === 'en' && k.meaning_en ? k.meaning_en : k.meaning_de;
}

/* ============ DOM ============ */

const cardsContainer = document.getElementById('kanjiCards');

/* ============ LEVEL-REIHENFOLGE & LABELS ============ */

const levelOrder = ['A1', 'A2', 'B1', 'B2'];

function getLevelLabel(level) {
    const labels = {
        'A1': { de: 'A1 — Grundstufe', en: 'A1 — Beginner' },
        'A2': { de: 'A2 — Aufbaustufe', en: 'A2 — Elementary' },
        'B1': { de: 'B1 — Mittelstufe', en: 'B1 — Intermediate' },
        'B2': { de: 'B2 — Fortgeschritten', en: 'B2 — Upper Intermediate' }
    };
    const entry = labels[level];
    return entry ? (currentLang === 'en' ? entry.en : entry.de) : level;
}

/* ============ KATEGORIE-REIHENFOLGE ============ */

const categoryOrder = {
    'A1': [
        'kanjiList.cat.zahlen',
        'kanjiList.cat.wochentage',
        'kanjiList.cat.zeit',
        'kanjiList.cat.kompass',
        'kanjiList.cat.grundbegriffe',
        'kanjiList.cat.verben',
        'kanjiList.cat.adjektive',
        'kanjiList.cat.essen',
        'kanjiList.cat.familie',
        'kanjiList.cat.schule',
        'kanjiList.cat.gesellschaft'
    ],
    'A2': [
        'kanjiList.cat.aktionen',
        'kanjiList.cat.koerper',
        'kanjiList.cat.weiteres',
        'kanjiList.cat.konzepte',
        'kanjiList.cat.fortgeschritten'
    ],
    'B1': [],
    'B2': []
};

/* ============ SESSIONSSTORAGE: AUFKLAPPPZUSTAND ============ */

function getCatStorageKey(level, catKey) {
    return 'catOpen_' + level + '_' + catKey;
}

function saveCatState(level, catKey, isOpen) {
    sessionStorage.setItem(getCatStorageKey(level, catKey), isOpen ? '1' : '0');
}

function loadCatState(level, catKey, defaultOpen) {
    const val = sessionStorage.getItem(getCatStorageKey(level, catKey));
    return val === null ? defaultOpen : val === '1';
}

/* ============ KARTEN RENDERN ============ */

function renderCards() {
    const levels = getActiveLevels();

    cardsContainer.innerHTML = '';

    let totalShown = 0;

    levelOrder.forEach(level => {
        if (!levels.includes(level)) return;

        const kanjiInLevel = kanjiData.filter(k => k.level === level);
        if (kanjiInLevel.length === 0) return;

        totalShown += kanjiInLevel.length;

        // Level-Gruppe
        const group = document.createElement('div');
        group.className = 'level-group';

        const heading = document.createElement('h2');
        heading.innerHTML = getLevelLabel(level) + ' <span class="level-count">(' + kanjiInLevel.length + ')</span>';
        group.appendChild(heading);

        // Kategorien innerhalb des Levels
        const catKeys = categoryOrder[level] || [];
        let isFirstCat = true;

        catKeys.forEach(catKey => {
            const kanjiInCat = kanjiInLevel.filter(k => k.category === catKey);
            if (kanjiInCat.length === 0) return;

            const details = document.createElement('details');
            details.className = 'category-section';

            // Aufklapppzustand laden (Standard: erste Kategorie offen)
            if (loadCatState(level, catKey, isFirstCat)) {
                details.setAttribute('open', '');
            }
            isFirstCat = false;

            // Zustand bei Toggle speichern
            details.addEventListener('toggle', () => {
                saveCatState(level, catKey, details.open);
            });

            // Summary (Kategorie-Kopfzeile)
            const summary = document.createElement('summary');
            summary.className = 'category-summary';

            const arrow = document.createElement('span');
            arrow.className = 'cat-arrow';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'category-name';
            nameSpan.textContent = t(catKey);

            const countSpan = document.createElement('span');
            countSpan.className = 'category-count';
            countSpan.textContent = '(' + kanjiInCat.length + ')';

            summary.appendChild(arrow);
            summary.appendChild(nameSpan);
            summary.appendChild(countSpan);
            details.appendChild(summary);

            // Karten-Grid
            const grid = document.createElement('div');
            grid.className = 'cards-grid';

            kanjiInCat.forEach(k => {
                const card = createFlipCard(k);
                grid.appendChild(card);
            });

            details.appendChild(grid);
            group.appendChild(details);
        });

        cardsContainer.appendChild(group);
    });

    if (totalShown === 0) {
        const msg = document.createElement('p');
        msg.className = 'no-kanji-msg';
        msg.textContent = t('kanjiList.noKanji');
        cardsContainer.appendChild(msg);
    }
}

/* ============ EINZELNE FLIP-CARD ============ */

function createFlipCard(k) {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.addEventListener('click', () => card.classList.toggle('flipped'));

    const inner = document.createElement('div');
    inner.className = 'flip-card-inner';

    // --- Vorderseite: Kanji ---
    const front = document.createElement('div');
    front.className = 'flip-card-front';

    const kanjiChar = document.createElement('div');
    kanjiChar.className = 'kanji-char';
    kanjiChar.textContent = k.kanji;
    front.appendChild(kanjiChar);

    const badge = document.createElement('span');
    badge.className = 'level-badge';
    badge.textContent = k.level;
    front.appendChild(badge);

    // --- Rückseite: Details ---
    const back = document.createElement('div');
    back.className = 'flip-card-back';

    const backKanji = document.createElement('div');
    backKanji.className = 'back-kanji';
    backKanji.textContent = k.kanji;
    back.appendChild(backKanji);

    const meaning = document.createElement('div');
    meaning.className = 'back-meaning';
    meaning.textContent = getMeaning(k).join(', ');
    back.appendChild(meaning);

    const reading = document.createElement('div');
    reading.className = 'back-reading';
    reading.textContent = 'On: ' + k.on + ' | Kun: ' + k.kun;
    back.appendChild(reading);

    const romaji = document.createElement('div');
    romaji.className = 'back-romaji';
    romaji.textContent = k.romaji;
    back.appendChild(romaji);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    return card;
}

/* ============ EVENT LISTENER ============ */

document.addEventListener('langchange', renderCards);
document.addEventListener('levelchange', renderCards);

/* ============ INIT ============ */

renderCards();

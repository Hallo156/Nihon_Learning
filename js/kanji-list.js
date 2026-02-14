/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* kanji-list.js — Kanji-Karteikarten: Flip-Cards nach Level gruppiert.
   Braucht: common.js, i18n.js, kanji-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getMeaning(k) {
    return currentLang === 'en' && k.meaning_en ? k.meaning_en : k.meaning_de;
}

/* ============ DOM ============ */

const cardsContainer = document.getElementById('kanjiCards');
const applyFilterBtn = document.getElementById('applyFilter');

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

/* ============ FILTER ============ */

function getSelectedLevels() {
    const levels = [];
    if (document.getElementById('levelA1').checked) levels.push('A1');
    if (document.getElementById('levelA2').checked) levels.push('A2');
    if (document.getElementById('levelB1').checked) levels.push('B1');
    if (document.getElementById('levelB2').checked) levels.push('B2');
    return levels;
}

/* ============ KARTEN RENDERN ============ */

function renderCards() {
    const levels = getSelectedLevels();
    if (levels.length === 0) {
        document.getElementById('levelA1').checked = true;
        levels.push('A1');
    }

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

        // Karten-Grid
        const grid = document.createElement('div');
        grid.className = 'cards-grid';

        kanjiInLevel.forEach(k => {
            const card = createFlipCard(k);
            grid.appendChild(card);
        });

        group.appendChild(grid);
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

    // --- Rueckseite: Details ---
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
    reading.textContent = "On: " + k.on + " | Kun: " + k.kun;
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

applyFilterBtn.addEventListener('click', renderCards);

document.addEventListener('langchange', renderCards);

/* ============ INIT ============ */

renderCards();

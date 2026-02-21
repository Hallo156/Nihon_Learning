/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* location-map.js — Stadtkarte Quiz.
   Benötigt: common.js, i18n.js, location-map-data.js */

/* ============ KOORDINATEN-HILFSFUNKTIONEN ============
   Grid-Koordinaten: x ∈ {0,1,2,3}, y ∈ {0,1,2,3}
   SVG-Pixel-Mapping (Kreuzungen):
     gridX: 0→10,  1→210, 2→405, 3→600
     gridY: 0→10,  1→160, 2→305, 3→430
*/

const SVG_CROSS_X = [10, 210, 405, 600];
const SVG_CROSS_Y = [10, 160, 305, 430];
const MAX_STEPS = 6;

function svgCX(gx) { return SVG_CROSS_X[gx]; }
function svgCY(gy) { return SVG_CROSS_Y[gy]; }

/* ============ STATE ============ */

let currentQuizType = 'nav';     // 'nav' | 'desc'
let answered = false;

// Navigation State
let navPlayerX = 0, navPlayerY = 0;
let navTargetX = 0, navTargetY = 0;
let navTargetBuilding = null;
let navStepCount = 0;
let navStepLog = [];             // Array der geklickten JP-Richtungsnamen

// Desc State
let currentDescQ = null;

const score = new ScoreTracker('correctCount', 'incorrectCount');

/* ============ SICHTBARKEITS-TOGGLES ============ */

let showRomaji      = localStorage.getItem('locMap.showRomaji')      !== 'false';
let showTranslation = localStorage.getItem('locMap.showTranslation') !== 'false';

function injectVisibilityToggles(container) {
    const wrap = document.createElement('div');
    wrap.className = 'map-vis-toggles';

    const btnR = document.createElement('button');
    btnR.id = 'toggleRomaji';
    btnR.className = 'map-vis-btn' + (showRomaji ? ' active' : '');
    btnR.textContent = '👁 ' + t('locMap.toggleRomaji');
    btnR.addEventListener('click', () => {
        showRomaji = !showRomaji;
        localStorage.setItem('locMap.showRomaji', String(showRomaji));
        btnR.classList.toggle('active', showRomaji);
        refreshPromptVisibility();
    });

    const btnT = document.createElement('button');
    btnT.id = 'toggleTranslation';
    btnT.className = 'map-vis-btn' + (showTranslation ? ' active' : '');
    btnT.textContent = '👁 ' + t('locMap.toggleTranslation');
    btnT.addEventListener('click', () => {
        showTranslation = !showTranslation;
        localStorage.setItem('locMap.showTranslation', String(showTranslation));
        btnT.classList.toggle('active', showTranslation);
        refreshPromptVisibility();
    });

    wrap.appendChild(btnR);
    wrap.appendChild(btnT);
    container.insertBefore(wrap, document.getElementById('mapContainer'));

    document.addEventListener('langchange', () => {
        btnR.textContent = '👁 ' + t('locMap.toggleRomaji');
        btnT.textContent = '👁 ' + t('locMap.toggleTranslation');
    });

    refreshPromptVisibility();
}

function refreshPromptVisibility() {
    // Container-Klassen für Karten-Labels
    const trainer = document.querySelector('.location-map-trainer');
    if (trainer) {
        trainer.classList.toggle('hide-romaji',      !showRomaji);
        trainer.classList.toggle('hide-translation', !showTranslation);
    }
    // Prompt-Elemente
    const romEl = document.querySelector('#mapPrompt .prompt-romaji');
    const subEl = document.querySelector('#mapPrompt .prompt-sub');
    if (romEl) romEl.style.display = showRomaji      ? 'block' : 'none';
    if (subEl) subEl.style.display = showTranslation ? 'block' : 'none';
}

/* ============ NAVIGATIONS-GENERATOR ============ */

function generateNavQuestion() {
    // Zufälliges Ziel-Gebäude
    const targetB = mapBuildings[Math.floor(Math.random() * mapBuildings.length)];
    navTargetBuilding = targetB;

    // 4 Ecken des Ziel-Gebäudes in Grid-Koordinaten
    const corners = [
        [targetB.col,     targetB.row    ],
        [targetB.col + 1, targetB.row    ],
        [targetB.col,     targetB.row + 1],
        [targetB.col + 1, targetB.row + 1]
    ];
    const targetCorner = corners[Math.floor(Math.random() * corners.length)];
    navTargetX = targetCorner[0];
    navTargetY = targetCorner[1];

    // Zufälliger Startpunkt (nicht gleich Ziel)
    let sx, sy;
    do {
        sx = Math.floor(Math.random() * 4);
        sy = Math.floor(Math.random() * 4);
    } while (sx === navTargetX && sy === navTargetY);
    navPlayerX = sx;
    navPlayerY = sy;

    navStepCount = 0;
    navStepLog = [];
}

/* ============ SVG-KARTE BUILDER ============ */

function buildMapSVG(highlightId, showPlayer, showTarget) {
    let s = '<svg viewBox="0 0 610 430" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">';

    // Straßen-Hintergrund
    s += '<rect x="0" y="0" width="610" height="430" fill="#c8d0d8"/>';

    // Straßen (Bänder)
    s += '<rect x="193" y="0"   width="34" height="430" fill="#dfe6ec"/>'; // vertikal 1
    s += '<rect x="388" y="0"   width="34" height="430" fill="#dfe6ec"/>'; // vertikal 2
    s += '<rect x="0"   y="143" width="610" height="34" fill="#dfe6ec"/>'; // horizontal 1
    s += '<rect x="0"   y="288" width="610" height="34" fill="#dfe6ec"/>'; // horizontal 2

    // Straßenmarkierungen (gestrichelte Mittellinien)
    const d = 'stroke="#bbb" stroke-width="1.5" stroke-dasharray="10,8"';
    s += `<line x1="0" y1="160" x2="610" y2="160" ${d}/>`; // horizontal 1 Mitte
    s += `<line x1="0" y1="305" x2="610" y2="305" ${d}/>`; // horizontal 2 Mitte
    s += `<line x1="210" y1="0" x2="210" y2="430" ${d}/>`; // vertikal 1 Mitte
    s += `<line x1="405" y1="0" x2="405" y2="430" ${d}/>`; // vertikal 2 Mitte

    // Glüh-Filter
    s += `<defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>`;

    // Gebäude
    mapBuildings.forEach(b => {
        const isHighlighted = b.id === highlightId;
        const isNavTarget = showTarget && navTargetBuilding && b.id === navTargetBuilding.id;
        const strokeColor = isHighlighted ? '#FFD700' : isNavTarget ? '#ff8c00' : 'rgba(0,0,0,0.25)';
        const strokeW = (isHighlighted || isNavTarget) ? 4 : 1.5;
        const filterAttr = (isHighlighted || isNavTarget) ? 'filter="url(#glow)"' : '';

        s += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="6"
            fill="${b.color}" stroke="${strokeColor}" stroke-width="${strokeW}" ${filterAttr}/>`;

        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2 - 10;
        const trans = currentLang === 'en' ? b.en : b.de;
        s += `<text x="${cx}" y="${cy}" class="building-label-jp" text-anchor="middle">${b.jp}</text>`;
        s += `<text x="${cx}" y="${cy + 15}" class="building-label-romaji" text-anchor="middle">${b.romaji}</text>`;
        s += `<text x="${cx}" y="${cy + 27}" class="building-label-trans" text-anchor="middle">${trans}</text>`;
    });

    // Ziel-Kreuzung (goldenes Z-Marker)
    if (showTarget) {
        const tx = svgCX(navTargetX), ty = svgCY(navTargetY);
        s += `<circle cx="${tx}" cy="${ty}" r="14" fill="#FFD700" stroke="#c8a000" stroke-width="2"/>`;
        s += `<text x="${tx}" y="${ty + 5}" font-size="13" font-weight="bold" fill="#5a3800" text-anchor="middle">Z</text>`;
    }

    // Spieler-Marker (weißer Kreis)
    if (showPlayer) {
        const px = svgCX(navPlayerX), py = svgCY(navPlayerY);
        s += `<circle cx="${px}" cy="${py}" r="13" fill="#fff" stroke="#007bff" stroke-width="2.5"
            filter="url(#glow)"/>`;
        s += `<text x="${px}" y="${py + 5}" font-size="12" font-weight="bold" fill="#007bff" text-anchor="middle">P</text>`;
    }

    s += '</svg>';
    return s;
}

/* ============ NAVIGATION LADEN ============ */

function loadNav() {
    answered = false;
    clearFeedback('feedbackArea');
    document.getElementById('nextButton').style.display = 'none';

    generateNavQuestion();
    renderNavUI();
}

function renderNavUI() {
    // Karte rendern
    document.getElementById('mapContainer').innerHTML = buildMapSVG(null, true, true);

    // Prompt
    const targetB = navTargetBuilding;
    const promptEl = document.getElementById('mapPrompt');
    promptEl.innerHTML = `
        <span class="prompt-jp">${targetB.jp} <span style="font-size:14px;color:#666;">の近くへ行ってください</span></span>
        <span class="prompt-romaji">${targetB.romaji} no chikaku e itte kudasai</span>
        <span class="prompt-sub">${currentLang === 'en'
            ? `Navigate to the ${targetB.en}! (reach any corner)`
            : `Gehe ${targetB.de_nav}! (erreiche eine Ecke)`}</span>`;
    refreshPromptVisibility();

    // Schritt-Zähler
    updateNavStepUI();

    // Schritt-Log leeren
    updateStepLog();

    // Buttons neu aufbauen und Disabled-State zurücksetzen
    renderDirectionButtons();
    const finBtn = document.getElementById('finalizeButton');
    finBtn.disabled = false;
    finBtn.style.display = 'inline-block';

    document.getElementById('navStepDisplay').style.display = 'block';
    document.getElementById('navStepLog').style.display = 'block';
    document.getElementById('dirButtonGrid').style.display = 'grid';
    document.getElementById('buildingChoices').style.display = 'none';
}

function updateNavStepUI() {
    const el = document.getElementById('navStepDisplay');
    el.textContent = `${currentLang === 'en' ? 'Step' : 'Schritt'} ${navStepCount} / ${MAX_STEPS}`;
}

function updateStepLog() {
    const el = document.getElementById('navStepLog');
    if (navStepLog.length === 0) {
        el.innerHTML = `<span class="step-log-label">${t('locMap.stepLog')}</span> <span class="step-log-empty">—</span>`;
    } else {
        el.innerHTML = `<span class="step-log-label">${t('locMap.stepLog')}</span> <span class="step-log-steps">${navStepLog.join(' → ')}</span>`;
    }
}

function renderDirectionButtons() {
    const dirs = ['migi', 'hidari', 'massugu', 'modoru'];
    shuffleArray(dirs);
    const grid = document.getElementById('dirButtonGrid');
    grid.innerHTML = '';
    dirs.forEach(dirId => {
        const d = directionData[dirId];
        const btn = document.createElement('button');
        btn.className = 'dir-button';
        btn.dataset.dir = dirId;
        btn.innerHTML = `<span class="dir-jp">${d.jp}</span>`;
        btn.addEventListener('click', () => handleDirClick(btn, dirId));
        grid.appendChild(btn);
    });
}

function handleDirClick(btn, dirId) {
    if (answered) return;

    const d = directionData[dirId];
    const nx = navPlayerX + d.dx;
    const ny = navPlayerY + d.dy;

    // Randprüfung
    if (nx < 0 || nx > 3 || ny < 0 || ny > 3) {
        btn.classList.add('wrong-flash');
        setTimeout(() => btn.classList.remove('wrong-flash'), 350);
        // Kurzer Feedback-Text
        const el = document.getElementById('feedbackArea');
        el.textContent = t('locMap.outOfBounds');
        el.className = 'feedback incorrect';
        el.style.display = 'block';
        setTimeout(() => { el.style.display = 'none'; el.className = 'feedback'; }, 1000);
        return;
    }

    // Schritt gültig
    navPlayerX = nx;
    navPlayerY = ny;
    navStepCount++;
    navStepLog.push(d.jp);

    // Karte aktualisieren
    document.getElementById('mapContainer').innerHTML = buildMapSVG(null, true, true);

    updateNavStepUI();
    updateStepLog();

    // Schritt-Limit
    if (navStepCount >= MAX_STEPS) {
        disableNavInput();
        // Erzwinge Finalisierung — wird automatisch ausgewertet
        finishNav(navPlayerX === navTargetX && navPlayerY === navTargetY, true);
        return;
    }

    // Buttons neu mischen
    renderDirectionButtons();
}

function handleFinalize() {
    if (answered) return;
    const isCorrect = navPlayerX === navTargetX && navPlayerY === navTargetY;
    disableNavInput();
    finishNav(isCorrect, false);
}

function disableNavInput() {
    answered = true;
    document.querySelectorAll('.dir-button').forEach(b => b.disabled = true);
    document.getElementById('finalizeButton').disabled = true;
}

function finishNav(isCorrect, forcedByLimit) {
    score[isCorrect ? 'addCorrect' : 'addIncorrect']();
    const targetB = navTargetBuilding;

    if (isCorrect) {
        showFeedback('feedbackArea', `<strong>${t('locMap.navSuccess')}</strong><br>
            <em>${currentLang === 'en'
                ? `You reached the corner of ${targetB.en}!`
                : `Du hast die Ecke des ${targetB.de}s erreicht!`}</em>`, true, true);
    } else {
        const limitMsg = forcedByLimit ? `<br><strong>${t('locMap.tooManySteps')}</strong>` : '';
        showFeedback('feedbackArea', `<strong>${t('locMap.wrongDir')}</strong>${limitMsg}<br>
            <em>${currentLang === 'en'
                ? `Target: ${targetB.en} (Z-marker corner)`
                : `Ziel: ${targetB.de} (Z-Marker-Ecke)`}</em>`, false, true);
    }

    if (isCorrect && isQuickAnswer()) {
        setTimeout(loadNav, 400);
    } else {
        document.getElementById('nextButton').style.display = 'inline-block';
    }
}

/* ============ BESCHREIBEN ============ */

function pickNextDesc() {
    return descQuestions[Math.floor(Math.random() * descQuestions.length)];
}

function loadDesc() {
    currentDescQ = pickNextDesc();
    answered = false;
    clearFeedback('feedbackArea');
    document.getElementById('nextButton').style.display = 'none';

    document.getElementById('mapContainer').innerHTML = buildMapSVG(currentDescQ.highlightBuilding, false, false);

    const promptEl = document.getElementById('mapPrompt');
    const qText = currentLang === 'en' ? currentDescQ.question_en : currentDescQ.question_de;
    promptEl.innerHTML = `
        <span class="prompt-jp">${currentDescQ.question_jp}</span>
        <span class="prompt-romaji">${currentDescQ.question_romaji}</span>
        <span class="prompt-sub">${qText}</span>`;
    refreshPromptVisibility();

    document.getElementById('navStepDisplay').style.display = 'none';
    document.getElementById('navStepLog').style.display = 'none';
    document.getElementById('dirButtonGrid').style.display = 'none';
    document.getElementById('finalizeButton').style.display = 'none';
    document.getElementById('buildingChoices').style.display = 'flex';

    const choicesEl = document.getElementById('buildingChoices');
    choicesEl.innerHTML = '';
    const choiceBuildings = currentDescQ.choices.map(id => mapBuildings.find(b => b.id === id));
    shuffleArray(choiceBuildings);
    choiceBuildings.forEach(b => {
        const btn = document.createElement('button');
        btn.className = 'building-choice-btn';
        btn.dataset.bid = b.id;
        const sub = currentLang === 'en' ? b.en : b.de;
        btn.innerHTML = `<span class="bcb-jp">${b.jp}</span><span class="bcb-sub">${sub}</span>`;
        btn.addEventListener('click', () => {
            if (answered) return;
            handleDescAnswer(b.id === currentDescQ.correctId, btn, choicesEl);
        });
        choicesEl.appendChild(btn);
    });
}

function handleDescAnswer(isCorrect, clickedBtn, choicesEl) {
    answered = true;
    Array.from(choicesEl.querySelectorAll('.building-choice-btn')).forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.bid === currentDescQ.correctId) btn.classList.add('correct-choice');
        else if (btn === clickedBtn && !isCorrect) btn.classList.add('wrong-choice');
    });

    if (isCorrect) {
        score.addCorrect();
        const exp = currentLang === 'en' ? currentDescQ.explanation_en : currentDescQ.explanation_de;
        showFeedback('feedbackArea', `<strong>${t('feedback.correct')}</strong><br><em>${exp}</em>`, true, true);
    } else {
        score.addIncorrect();
        const exp = currentLang === 'en' ? currentDescQ.explanation_en : currentDescQ.explanation_de;
        showFeedback('feedbackArea', `<strong>${t('feedback.wrong')}</strong><br><em>${exp}</em>`, false, true);
    }

    if (isCorrect && isQuickAnswer()) setTimeout(loadQuestion, 400);
    else document.getElementById('nextButton').style.display = 'inline-block';
}

/* ============ ZENTRALE LOAD-FUNKTION ============ */

function loadQuestion() {
    if (currentQuizType === 'nav') {
        loadNav();
    } else {
        loadDesc();
    }
}

/* ============ RESET ============ */

function resetQuiz() {
    score.reset();
    loadQuestion();
}

/* ============ EVENT LISTENER ============ */

document.getElementById('nextButton').addEventListener('click', loadQuestion);

document.getElementById('finalizeButton').addEventListener('click', handleFinalize);

document.getElementById('typeNav').addEventListener('click', () => {
    if (currentQuizType === 'nav') return;
    currentQuizType = 'nav';
    document.getElementById('typeNav').classList.add('active');
    document.getElementById('typeDesc').classList.remove('active');
    loadNav();
});

document.getElementById('typeDesc').addEventListener('click', () => {
    if (currentQuizType === 'desc') return;
    currentQuizType = 'desc';
    document.getElementById('typeDesc').classList.add('active');
    document.getElementById('typeNav').classList.remove('active');
    loadDesc();
});

document.addEventListener('langchange', loadQuestion);

/* ============ INIT ============ */

injectQuickAnswerButton(document.querySelector('.location-map-trainer'));
injectVisibilityToggles(document.querySelector('.location-map-trainer'));
loadNav();

/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* location-obj.js — Gegenstand-Position Quiz.
   Benötigt: common.js, i18n.js, location-obj-data.js */

/* ============ STATE ============ */

let currentMode = 'random';          // 'random' | 'semi-random'
let currentQuizType = 'beschreiben'; // 'beschreiben' | 'zeigen'
let currentPos = null;
let answered = false;
let remainingQuestions = [];
let incorrectQuestions = [];

const score = new ScoreTracker('correctCount', 'incorrectCount');

/* ============ SVG-BUILDER ============ */

function buildSceneSVG(activePosId, showHitAreas) {
    let s = '<svg viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">';

    // --- Hintergrund ---
    s += '<rect x="0" y="0" width="500" height="360" fill="#f4f6fb"/>';

    // --- Boden-Linie ---
    s += '<line x1="0" y1="340" x2="500" y2="340" stroke="#ccc" stroke-width="2"/>';

    // --- TISCH ---
    // Tischplatte
    s += '<rect x="150" y="200" width="200" height="18" rx="3" fill="#c8a070"/>';
    // Tischbeine
    s += '<rect x="168" y="218" width="14" height="70" rx="2" fill="#a07848"/>';
    s += '<rect x="318" y="218" width="14" height="70" rx="2" fill="#a07848"/>';
    // Label
    s += '<text x="250" y="196" class="scene-label" text-anchor="middle">テーブル</text>';

    // --- BOX ---
    s += '<rect x="30" y="240" width="80" height="60" rx="4" fill="#e8c870"/>';
    // Schachtel-Kanten
    s += '<line x1="30" y1="255" x2="110" y2="255" stroke="#c8a840" stroke-width="1.5"/>';
    s += '<line x1="70" y1="240" x2="70" y2="300" stroke="#c8a840" stroke-width="1.5"/>';
    // Label
    s += '<text x="70" y="235" class="scene-label" text-anchor="middle">箱</text>';
    s += '<text x="70" y="223" class="scene-label-small" text-anchor="middle">hako</text>';

    // --- REGAL ---
    // Pfosten links und rechts
    s += '<rect x="394" y="130" width="8" height="180" rx="2" fill="#8090a8"/>';
    s += '<rect x="458" y="130" width="8" height="180" rx="2" fill="#8090a8"/>';
    // Drei Bretter
    s += '<rect x="390" y="130" width="80" height="12" rx="2" fill="#a0b4cc"/>';
    s += '<rect x="390" y="180" width="80" height="12" rx="2" fill="#a0b4cc"/>';
    s += '<rect x="390" y="230" width="80" height="12" rx="2" fill="#a0b4cc"/>';
    // Label
    s += '<text x="430" y="125" class="scene-label" text-anchor="middle">棚</text>';
    s += '<text x="430" y="113" class="scene-label-small" text-anchor="middle">tana</text>';

    // --- BALL (nur im Beschreiben-Modus oder wenn activePosId gesetzt) ---
    if (activePosId) {
        const pos = locationObjPositions.find(p => p.id === activePosId);
        if (pos) {
            // Schatten
            s += `<ellipse cx="${pos.ballCx}" cy="${pos.ballCy + 22}" rx="16" ry="5" fill="rgba(0,0,0,0.12)"/>`;
            // Ball
            s += `<circle cx="${pos.ballCx}" cy="${pos.ballCy}" r="18" fill="#e74c3c" class="scene-ball"/>`;
            // Glanzpunkt
            s += `<circle cx="${pos.ballCx - 6}" cy="${pos.ballCy - 6}" r="5" fill="rgba(255,255,255,0.4)"/>`;
            // Label
            s += `<text x="${pos.ballCx}" y="${pos.ballCy + 36}" class="ball-label" text-anchor="middle">ボール</text>`;
        }
    }

    // --- HIT-AREAS (nur Zeigen-Modus) ---
    if (showHitAreas) {
        locationObjPositions.forEach(p => {
            s += `<rect id="hit_${p.id}" x="${p.hitX}" y="${p.hitY}" width="${p.hitW}" height="${p.hitH}"
                class="hit-area" data-pos="${p.id}" rx="6"/>`;
        });
    }

    s += '</svg>';
    return s;
}

/* ============ FRAGE LADEN ============ */

function pickNextPosition() {
    if (currentMode === 'random') {
        return locationObjPositions[Math.floor(Math.random() * locationObjPositions.length)];
    }
    // 70/30 Spaced Repetition
    if (incorrectQuestions.length > 0 && Math.random() < 0.3) {
        return incorrectQuestions[Math.floor(Math.random() * incorrectQuestions.length)];
    }
    if (remainingQuestions.length === 0) {
        remainingQuestions = [...locationObjPositions];
        shuffleArray(remainingQuestions);
    }
    return remainingQuestions.pop();
}

function loadQuestion() {
    answered = false;
    clearFeedback('feedbackArea');
    document.getElementById('nextButton').style.display = 'none';

    currentPos = pickNextPosition();

    if (currentQuizType === 'beschreiben') {
        loadBeschreiben();
    } else {
        loadZeigen();
    }
}

/* ============ BESCHREIBEN-MODUS ============ */

function loadBeschreiben() {
    const sceneEl = document.getElementById('sceneContainer');
    sceneEl.innerHTML = buildSceneSVG(currentPos.id, false);

    const displayEl = document.getElementById('displayArea');
    displayEl.textContent = t('locObj.promptBeschreiben');
    document.getElementById('zeigenInstruction').style.display = 'none';

    // 4 MC-Choices: korrekt + 3 falsche
    const others = locationObjPositions.filter(p => p.id !== currentPos.id);
    shuffleArray(others);
    const choices = [currentPos, ...others.slice(0, 3)];
    shuffleArray(choices);

    const choicesEl = document.getElementById('choicesArea');
    choicesEl.innerHTML = '';
    choices.forEach(pos => {
        const btn = document.createElement('button');
        btn.className = 'choice-button';
        btn.textContent = pos.jp;
        btn.addEventListener('click', () => {
            if (answered) return;
            handleBeschreibenAnswer(pos.id === currentPos.id, btn, choicesEl);
        });
        choicesEl.appendChild(btn);
    });
}

function handleBeschreibenAnswer(isCorrect, clickedBtn, choicesEl) {
    answered = true;

    // Buttons einfärben
    Array.from(choicesEl.querySelectorAll('.choice-button')).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentPos.jp) {
            btn.classList.add('correct-choice');
        } else if (btn === clickedBtn && !isCorrect) {
            btn.classList.add('wrong-choice');
        }
    });

    finishAnswer(isCorrect);
}

/* ============ ZEIGEN-MODUS ============ */

function loadZeigen() {
    const sceneEl = document.getElementById('sceneContainer');
    // Kein Ball im Zeigen-Modus
    sceneEl.innerHTML = buildSceneSVG(null, true);

    // JP-Phrase anzeigen
    const displayEl = document.getElementById('displayArea');
    displayEl.textContent = currentPos.jp;
    const instrEl = document.getElementById('zeigenInstruction');
    instrEl.style.display = 'block';

    document.getElementById('choicesArea').innerHTML = '';

    // Hit-Area-Klick-Handler auf SVG-Ebene
    const svg = sceneEl.querySelector('svg');
    svg.addEventListener('click', (e) => {
        if (answered) return;
        const hitEl = e.target.closest('.hit-area');
        if (!hitEl) return;
        handleZeigenAnswer(hitEl.dataset.pos, hitEl, svg);
    });
}

function handleZeigenAnswer(clickedPosId, clickedEl, svg) {
    answered = true;
    const isCorrect = clickedPosId === currentPos.id;

    // Alle Hit-Areas deaktivieren
    svg.querySelectorAll('.hit-area').forEach(el => {
        el.style.pointerEvents = 'none';
    });

    // Richtiges Feld grün markieren
    const correctEl = svg.querySelector(`#hit_${currentPos.id}`);
    if (correctEl) correctEl.classList.add('correct-hit');

    // Falsches Feld rot (falls nicht das richtige geklickt)
    if (!isCorrect) {
        clickedEl.classList.add('wrong-hit');
    }

    finishAnswer(isCorrect);
}

/* ============ ANTWORT AUSWERTEN ============ */

function finishAnswer(isCorrect) {
    const feedbackEl = document.getElementById('feedbackArea');

    if (isCorrect) {
        score.addCorrect();
        if (currentMode === 'semi-random') {
            incorrectQuestions = incorrectQuestions.filter(p => p.id !== currentPos.id);
        }
        const msg = `<strong>${t('feedback.correct')}</strong><br>
            <span style="font-size:18px;font-family:'Hiragino Sans','Meiryo',sans-serif;">${currentPos.jp}</span>
            <span style="color:#555;font-size:13px;"> (${currentPos.romaji})</span><br>
            <em>${currentLang === 'en' ? currentPos.en : currentPos.de}</em>`;
        showFeedback('feedbackArea', msg, true);
    } else {
        score.addIncorrect();
        if (currentMode === 'semi-random' && !incorrectQuestions.find(p => p.id === currentPos.id)) {
            incorrectQuestions.push(currentPos);
        }
        const msg = `<strong>${t('feedback.wrong')}</strong> ${t('feedback.correctIs')}<br>
            <span style="font-size:18px;font-family:'Hiragino Sans','Meiryo',sans-serif;">${currentPos.jp}</span>
            <span style="color:#555;font-size:13px;"> (${currentPos.romaji})</span><br>
            <em>${currentLang === 'en' ? currentPos.en : currentPos.de}</em>`;
        showFeedback('feedbackArea', msg, false);
    }

    if (isCorrect && isQuickAnswer()) {
        setTimeout(loadQuestion, 400);
    } else {
        document.getElementById('nextButton').style.display = 'inline-block';
    }
}

/* ============ RESET ============ */

function resetQuiz() {
    remainingQuestions = [...locationObjPositions];
    shuffleArray(remainingQuestions);
    incorrectQuestions = [];
    score.reset();
    loadQuestion();
}

/* ============ EVENT LISTENER ============ */

document.getElementById('nextButton').addEventListener('click', loadQuestion);

document.getElementById('modeRandom').addEventListener('click', () => {
    if (currentMode === 'random') return;
    currentMode = 'random';
    document.getElementById('modeRandom').classList.add('active');
    document.getElementById('modeSemiRandom').classList.remove('active');
    resetQuiz();
});

document.getElementById('modeSemiRandom').addEventListener('click', () => {
    if (currentMode === 'semi-random') return;
    currentMode = 'semi-random';
    document.getElementById('modeSemiRandom').classList.add('active');
    document.getElementById('modeRandom').classList.remove('active');
    resetQuiz();
});

document.getElementById('typeBeschreiben').addEventListener('click', () => {
    if (currentQuizType === 'beschreiben') return;
    currentQuizType = 'beschreiben';
    document.getElementById('typeBeschreiben').classList.add('active');
    document.getElementById('typeZeigen').classList.remove('active');
    resetQuiz();
});

document.getElementById('typeZeigen').addEventListener('click', () => {
    if (currentQuizType === 'zeigen') return;
    currentQuizType = 'zeigen';
    document.getElementById('typeZeigen').classList.add('active');
    document.getElementById('typeBeschreiben').classList.remove('active');
    resetQuiz();
});

document.addEventListener('langchange', loadQuestion);

/* ============ INIT ============ */

injectQuickAnswerButton(document.querySelector('.location-obj-trainer'));
remainingQuestions = [...locationObjPositions];
shuffleArray(remainingQuestions);
loadQuestion();

/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* location-obj.js — Gegenstand-Position Quiz.
   Benötigt: common.js, i18n.js, quiz-engine.js, location-obj-data.js */

/* ============ STATE ============ */

let currentQuizType = 'beschreiben'; // 'beschreiben' | 'zeigen'
let currentPos = null;

/* ============ SICHTBARKEITS-TOGGLES ============ */

const objContainer = document.querySelector('.location-obj-trainer');

const visState = buildVisibilityToggles({
    container: objContainer,
    insertBefore: document.getElementById('sceneContainer'),
    target: objContainer,
    toggles: [
        { key: 'locObj.showRomaji', i18nKey: 'locObj.toggleRomaji', cssClass: 'hide-romaji', defaultOn: true,
          onToggle: () => refreshVisibility() },
        { key: 'locObj.showTranslation', i18nKey: 'locObj.toggleTranslation', cssClass: 'hide-translation', defaultOn: true,
          onToggle: () => refreshVisibility() }
    ]
});

function refreshVisibility() {
    const showRomaji = visState['locObj.showRomaji'];
    const showTranslation = visState['locObj.showTranslation'];
    const romEl = document.getElementById('displayRomaji');
    const transEl = document.getElementById('displayTranslation');
    if (romEl) romEl.style.display = showRomaji ? 'block' : 'none';
    if (transEl) transEl.style.display = showTranslation ? 'block' : 'none';
    document.querySelectorAll('.choice-romaji').forEach(el => {
        el.style.display = showRomaji ? 'block' : 'none';
    });
    document.querySelectorAll('.choice-translation').forEach(el => {
        el.style.display = showTranslation ? 'block' : 'none';
    });
}

/* ============ SVG-BUILDER ============ */

function buildBall(pos) {
    let s = '';
    if (pos.id !== 'hinter_box' && pos.id !== 'in_regal') {
        s += `<ellipse cx="${pos.ballCx}" cy="${pos.ballCy + 22}" rx="16" ry="5" fill="rgba(0,0,0,0.12)"/>`;
    }
    s += `<circle cx="${pos.ballCx}" cy="${pos.ballCy}" r="18" fill="#e74c3c" class="scene-ball"/>`;
    s += `<circle cx="${pos.ballCx - 6}" cy="${pos.ballCy - 6}" r="5" fill="rgba(255,255,255,0.4)"/>`;
    s += `<text x="${pos.ballCx}" y="${pos.ballCy + 36}" class="ball-label" text-anchor="middle">ボール</text>`;
    return s;
}

function buildSceneSVG(activePosId, showHitAreas) {
    const pos = activePosId ? locationObjPositions.find(p => p.id === activePosId) : null;
    const ballBehindBox = pos && pos.id === 'hinter_box';
    const ballInShelf = pos && pos.id === 'in_regal';

    let s = '<svg viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">';
    s += '<rect x="0" y="0" width="500" height="360" fill="#f4f6fb"/>';
    s += '<line x1="0" y1="340" x2="500" y2="340" stroke="#ccc" stroke-width="2"/>';
    s += '<rect x="168" y="218" width="14" height="70" rx="2" fill="#a07848"/>';
    s += '<rect x="318" y="218" width="14" height="70" rx="2" fill="#a07848"/>';
    if (ballBehindBox && pos) s += buildBall(pos);
    s += '<rect x="30" y="240" width="80" height="60" rx="4" fill="#e8c870"/>';
    s += '<line x1="30" y1="255" x2="110" y2="255" stroke="#c8a840" stroke-width="1.5"/>';
    s += '<line x1="70" y1="240" x2="70" y2="300" stroke="#c8a840" stroke-width="1.5"/>';
    s += '<text x="70" y="235" class="scene-label" text-anchor="middle">箱</text>';
    s += '<text x="70" y="223" class="scene-label-small" text-anchor="middle">hako</text>';
    s += '<rect x="150" y="200" width="200" height="18" rx="3" fill="#c8a070"/>';
    s += '<text x="250" y="196" class="scene-label" text-anchor="middle">テーブル</text>';
    s += '<rect x="394" y="130" width="8" height="180" rx="2" fill="#8090a8"/>';
    s += '<rect x="458" y="130" width="8" height="180" rx="2" fill="#8090a8"/>';
    if (ballInShelf && pos) s += buildBall(pos);
    s += '<rect x="390" y="130" width="80" height="12" rx="2" fill="#a0b4cc"/>';
    s += '<rect x="390" y="180" width="80" height="12" rx="2" fill="#a0b4cc"/>';
    s += '<rect x="390" y="230" width="80" height="12" rx="2" fill="#a0b4cc"/>';
    s += '<text x="430" y="125" class="scene-label" text-anchor="middle">棚</text>';
    s += '<text x="430" y="113" class="scene-label-small" text-anchor="middle">tana</text>';
    if (pos && !ballBehindBox && !ballInShelf) s += buildBall(pos);

    if (showHitAreas) {
        locationObjPositions.forEach(p => {
            s += `<rect id="hit_${p.id}" x="${p.hitX}" y="${p.hitY}" width="${p.hitW}" height="${p.hitH}"
                class="hit-area" data-pos="${p.id}" rx="6"/>`;
        });
    }
    s += '</svg>';
    return s;
}

/* ============ BESCHREIBEN-MODUS ============ */

function loadBeschreiben(pos, eng) {
    const sceneEl = document.getElementById('sceneContainer');
    sceneEl.innerHTML = buildSceneSVG(pos.id, false);

    eng.displayArea.textContent = t('locObj.promptBeschreiben');
    document.getElementById('zeigenInstruction').style.display = 'none';

    const showRomaji = visState['locObj.showRomaji'];
    const showTranslation = visState['locObj.showTranslation'];

    const EXCLUDE_AS_DISTRACTOR = { 'neben_box': 'zwischen', 'zwischen': 'neben_box' };
    const excludeId = EXCLUDE_AS_DISTRACTOR[pos.id];
    const others = locationObjPositions.filter(p => p.id !== pos.id && p.id !== excludeId);
    shuffleArray(others);
    const choices = [pos, ...others.slice(0, 3)];
    shuffleArray(choices);

    eng.choicesArea.innerHTML = '';
    choices.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'choice-button';
        const trans = currentLang === 'en' ? p.en : p.de;
        btn.innerHTML = `<span class="choice-jp">${p.jp}</span>` +
            `<span class="choice-romaji" style="display:${showRomaji ? 'block' : 'none'}">${p.romaji}</span>` +
            `<span class="choice-translation" style="display:${showTranslation ? 'block' : 'none'}">${trans}</span>`;
        btn.dataset.posId = p.id;
        btn.addEventListener('click', () => {
            if (eng.answered) return;
            const isCorrect = p.id === pos.id;
            Array.from(eng.choicesArea.querySelectorAll('.choice-button')).forEach(b => {
                b.disabled = true;
                if (b.dataset.posId === pos.id) b.classList.add('correct-choice');
                else if (b === btn && !isCorrect) b.classList.add('wrong-choice');
            });
            eng.finishAnswer(isCorrect);
        });
        eng.choicesArea.appendChild(btn);
    });
}

/* ============ ZEIGEN-MODUS ============ */

function loadZeigen(pos, eng) {
    const sceneEl = document.getElementById('sceneContainer');
    sceneEl.innerHTML = buildSceneSVG(null, true);

    const showRomaji = visState['locObj.showRomaji'];
    const showTranslation = visState['locObj.showTranslation'];

    eng.displayArea.textContent = pos.jp;
    const romEl = document.getElementById('displayRomaji');
    romEl.textContent = pos.romaji;
    romEl.style.display = showRomaji ? 'block' : 'none';
    const transEl = document.getElementById('displayTranslation');
    transEl.textContent = currentLang === 'en' ? pos.en : pos.de;
    transEl.style.display = showTranslation ? 'block' : 'none';
    document.getElementById('zeigenInstruction').style.display = 'block';

    eng.choicesArea.innerHTML = '';

    const svg = sceneEl.querySelector('svg');
    svg.addEventListener('click', (e) => {
        if (eng.answered) return;
        const hitEl = e.target.closest('.hit-area');
        if (!hitEl) return;

        const accepted = [pos.id, ...(pos.alsoAccept || [])];
        const isCorrect = accepted.includes(hitEl.dataset.pos);

        svg.querySelectorAll('.hit-area').forEach(el => { el.style.pointerEvents = 'none'; });
        accepted.forEach(id => {
            const el = svg.querySelector(`#hit_${id}`);
            if (el) el.classList.add('correct-hit');
        });
        if (!isCorrect) hitEl.classList.add('wrong-hit');

        eng.finishAnswer(isCorrect);
    });
}

/* ============ QUIZ-ENGINE ============ */

const engine = new QuizEngine({
    feedbackId: 'feedbackArea',
    nextButtonId: 'nextButton',
    choicesAreaId: 'choicesArea',
    displayAreaId: 'displayArea',
    modeRandomId: 'modeRandom',
    modeSemiId: 'modeSemiRandom',
    correctSpanId: 'correctCount',
    incorrectSpanId: 'incorrectCount',
    quickAnswerTarget: '.location-obj-trainer',

    getPool: () => locationObjPositions,

    renderQuestion: (pos, eng) => {
        currentPos = pos;
        if (currentQuizType === 'beschreiben') {
            loadBeschreiben(pos, eng);
        } else {
            loadZeigen(pos, eng);
        }
    },

    buildFeedback: (pos, isCorrect) => {
        const jp = pos.jp;
        const romaji = pos.romaji;
        const trans = currentLang === 'en' ? pos.en : pos.de;
        if (isCorrect) {
            return `<strong>${t('feedback.correct')}</strong><br>
                <span style="font-size:18px;font-family:'Hiragino Sans','Meiryo',sans-serif;">${jp}</span>
                <span style="color:#555;font-size:13px;"> (${romaji})</span><br>
                <em>${trans}</em>`;
        } else {
            return `<strong>${t('feedback.wrong')}</strong> ${t('feedback.correctIs')}<br>
                <span style="font-size:18px;font-family:'Hiragino Sans','Meiryo',sans-serif;">${jp}</span>
                <span style="color:#555;font-size:13px;"> (${romaji})</span><br>
                <em>${trans}</em>`;
        }
    }
});

/* ============ QUIZ-TYP WECHSEL ============ */

document.getElementById('typeBeschreiben').addEventListener('click', () => {
    if (currentQuizType === 'beschreiben') return;
    currentQuizType = 'beschreiben';
    document.getElementById('typeBeschreiben').classList.add('active');
    document.getElementById('typeZeigen').classList.remove('active');
    engine.resetQuiz();
});

document.getElementById('typeZeigen').addEventListener('click', () => {
    if (currentQuizType === 'zeigen') return;
    currentQuizType = 'zeigen';
    document.getElementById('typeZeigen').classList.add('active');
    document.getElementById('typeBeschreiben').classList.remove('active');
    engine.resetQuiz();
});

/* ============ INIT ============ */

engine.loadQuestion();

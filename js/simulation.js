/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* simulation.js — Einkaufs-Simulations-Modul: Multiline-Dialoge mit Lückentexten.
   Braucht: common.js, i18n.js, quiz-engine.js, simulation-data.js */

/* ============ DOM-REFERENZEN ============ */

const sceneFiltersDiv    = document.getElementById('sceneFilters');
const applyFilterBtn     = document.getElementById('applyFilter');
const modeRandomBtn      = document.getElementById('modeRandom');
const modeSemiBtn        = document.getElementById('modeSemiRandom');
const inputModeToggle    = document.getElementById('inputModeToggle');
const inputModeMC        = document.getElementById('inputModeMC');
const inputModeText      = document.getElementById('inputModeText');
const dialogContainer    = document.getElementById('dialogContainer');
const nextButton         = document.getElementById('nextButton');

/* ============ SICHTBARKEITS-TOGGLE ============ */

const simContainer = document.querySelector('.simulation-trainer');

buildVisibilityToggles({
    container: simContainer,
    insertAfter: document.getElementById('inputModeToggle'),
    target: simContainer,
    toggles: [
        { key: 'sim_translation', i18nKey: 'vis.translation', cssClass: 'hide-translation', defaultOn: true }
    ]
});

/* ============ STATE ============ */

let currentMode      = 'random';   // 'random' | 'spaced'
let inputMode        = 'mc';       // 'mc' | 'text'
let activeScene      = null;       // aktuelle Szene (Dialog-Array)
let activeSceneId    = null;
let blankLines       = [];         // alle Blank-Zeilen der Szene
let blankIndex       = 0;          // welche Lücke gerade aktiv ist
let answered         = false;
let score            = null;       // ScoreTracker-Instanz
let revealedUpTo     = -1;         // Zeilen-Index bis zu dem Übersetzungen sichtbar sind

// Spaced Repetition
let scenePool        = [];
let remainingScenes  = [];
let incorrectScenes  = [];

/* ============ SZENENCHECKBOXEN ============ */

function buildSceneGroups() {
    const groups = [];
    simulationScenes.forEach(scene => {
        const labelKey = scene.label + '|' + scene.label_en;
        const existing = groups.find(g => g.labelKey === labelKey);
        if (existing) {
            existing.ids.push(scene.id);
        } else {
            groups.push({
                labelKey,
                label:    scene.label,
                label_en: scene.label_en,
                checked:  scene.checked,
                ids:      [scene.id],
            });
        }
    });
    return groups;
}

function buildSceneCheckboxes() {
    sceneFiltersDiv.innerHTML = '';
    buildSceneGroups().forEach(group => {
        const labelEl = document.createElement('label');
        const cb      = document.createElement('input');
        cb.type       = 'checkbox';
        cb.value      = group.ids.join(',');
        cb.checked    = group.checked;
        labelEl.appendChild(cb);
        labelEl.appendChild(document.createTextNode(
            ' ' + getLangField(group, 'label')
        ));
        sceneFiltersDiv.appendChild(labelEl);
    });
}

function getSelectedScenes() {
    const ids = [];
    sceneFiltersDiv.querySelectorAll('input[type=checkbox]:checked').forEach(cb => {
        cb.value.split(',').forEach(id => ids.push(id));
    });
    return ids;
}

function applySceneFilter() {
    scenePool        = getSelectedScenes();
    remainingScenes  = [...scenePool];
    incorrectScenes  = [];
    score.reset();
    loadNextScene();
}

/* ============ SZENEN-AUSWAHL ============ */

function pickNextScene() {
    if (currentMode === 'random') {
        if (scenePool.length === 0) return null;
        return scenePool[Math.floor(Math.random() * scenePool.length)];
    }
    // spaced: 70% remaining, 30% incorrect
    const useIncorrect = incorrectScenes.length > 0 && Math.random() < 0.3;
    if (useIncorrect) {
        return incorrectScenes[Math.floor(Math.random() * incorrectScenes.length)];
    }
    if (remainingScenes.length === 0) {
        remainingScenes = [...scenePool];
        incorrectScenes = [];
    }
    if (remainingScenes.length === 0) return null;
    const idx = Math.floor(Math.random() * remainingScenes.length);
    return remainingScenes.splice(idx, 1)[0];
}

/* ============ SZENE LADEN ============ */

function loadNextScene() {
    const sceneId = pickNextScene();
    if (!sceneId || !simulationDialogs[sceneId]) {
        dialogContainer.innerHTML = '<p style="color:#888;">' + t('sim.noScene') + '</p>';
        nextButton.style.display  = 'none';
        return;
    }
    activeSceneId = sceneId;
    activeScene   = simulationDialogs[sceneId];
    blankLines    = activeScene.filter(l => l.type === 'blank');
    blankIndex    = 0;
    answered      = false;
    revealedUpTo  = -1;

    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';

    renderDialog();
}

/* ============ DIALOG RENDERN ============ */

function renderDialog() {
    dialogContainer.innerHTML = '';

    activeScene.forEach((line, lineIdx) => {
        const row = document.createElement('div');
        row.className = 'dialog-row dialog-row--' + line.speaker;

        const speakerEl = document.createElement('span');
        speakerEl.className = 'dialog-speaker';
        speakerEl.textContent = line.speaker === 'ten'
            ? t('sim.speaker.staff')
            : t('sim.speaker.customer');

        const bubbleEl = document.createElement('div');
        bubbleEl.className = 'dialog-bubble';

        const trVisible = lineIdx <= revealedUpTo;

        if (line.type === 'text') {
            const jpSpan = document.createElement('span');
            jpSpan.className = 'dialog-jp';
            jpSpan.textContent = line.jp;
            bubbleEl.appendChild(jpSpan);

            if (trVisible) {
                const trSpan = document.createElement('span');
                trSpan.className = 'dialog-tr';
                trSpan.textContent = '(' + (getLangField(line, 'de', 'en') || '') + ')';
                bubbleEl.appendChild(trSpan);
            }
        } else {
            const blankPos = blankLines.indexOf(line);
            renderBlankLine(bubbleEl, line, blankPos, trVisible);
        }

        row.appendChild(speakerEl);
        row.appendChild(bubbleEl);
        dialogContainer.appendChild(row);
    });
}

function renderBlankLine(container, line, blankPos, trVisible) {
    container.innerHTML = '';

    const before = getLangField(line, 'before');
    const after  = getLangField(line, 'after');

    if (blankPos < blankIndex) {
        // Bereits beantwortet — zeige korrekte Antwort grün
        if (line.visual) {
            const vis = renderKoreroVisual(line);
            if (vis) container.appendChild(vis);
        }

        const filledSpan = document.createElement('span');
        filledSpan.className = 'dialog-jp';
        filledSpan.innerHTML = escHtml(before)
            + '<span class="blank-filled">' + escHtml(line.correct[0]) + '</span>'
            + escHtml(after);
        container.appendChild(filledSpan);

        if (trVisible) {
            const trSpan = document.createElement('span');
            trSpan.className = 'dialog-tr';
            trSpan.textContent = '(' + (getLangField(line, 'de', 'en') || '') + ')';
            container.appendChild(trSpan);
        }

    } else if (blankPos === blankIndex) {
        // Aktive Lücke
        if (line.visual) {
            const vis = renderKoreroVisual(line);
            if (vis) container.appendChild(vis);
        }

        const textBefore = document.createElement('span');
        textBefore.className = 'dialog-jp';
        textBefore.textContent = before;

        const blankBox = document.createElement('span');
        blankBox.className = 'dialog-blank active-blank';
        blankBox.id = 'activeBlank';
        blankBox.textContent = '＿＿＿';

        const textAfter = document.createElement('span');
        textAfter.className = 'dialog-jp';
        textAfter.textContent = after;

        container.appendChild(textBefore);
        container.appendChild(blankBox);
        container.appendChild(textAfter);

        if (!answered) {
            if (inputMode === 'mc' || line.mcOnly) {
                renderMCChoices(container, line);
            } else {
                renderTextInput(container, line);
            }
        }

    } else {
        // Noch nicht erreichte Lücke — zeige Platzhalter
        const placeholder = document.createElement('span');
        placeholder.className = 'dialog-jp';
        placeholder.innerHTML = escHtml(before)
            + '<span class="dialog-blank">＿＿＿</span>'
            + escHtml(after);
        container.appendChild(placeholder);
    }
}

function renderMCChoices(container, line) {
    const choicesWrap = document.createElement('div');
    choicesWrap.className = 'sim-choices';

    const choices = [...(line.choices || [])];
    shuffleArray(choices);
    choices.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = 'choice-button';
        btn.textContent = ch;
        btn.addEventListener('click', () => handleChoice(ch, line));
        choicesWrap.appendChild(btn);
    });
    container.appendChild(choicesWrap);
}

function renderTextInput(container, line) {
    const wrap  = document.createElement('div');
    wrap.className = 'sim-text-input';

    const inp   = document.createElement('input');
    inp.type    = 'text';
    inp.id      = 'simTextInput';
    inp.placeholder = t('input.answer');
    inp.setAttribute('data-i18n-placeholder', 'input.answer');

    const btn   = document.createElement('button');
    btn.className = 'choice-button';
    btn.textContent = t('btn.check');
    btn.setAttribute('data-i18n', 'btn.check');
    btn.addEventListener('click', () => checkText(inp.value.trim(), line));

    inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') checkText(inp.value.trim(), line);
    });

    wrap.appendChild(inp);
    wrap.appendChild(btn);
    container.appendChild(wrap);
    setTimeout(() => inp.focus(), 50);
}

/* ============ ANTWORT-VERARBEITUNG ============ */

function handleChoice(choice, line) {
    const correct = isCorrect(choice, line);
    document.querySelectorAll('.sim-choices .choice-button').forEach(btn => {
        btn.disabled = true;
        if (isCorrect(btn.textContent, line)) {
            btn.classList.add('correct-choice');
        } else if (btn.textContent === choice && !correct) {
            btn.classList.add('wrong-choice');
        }
    });
    finishBlank(correct, line);
}

function checkText(value, line) {
    if (!value) return;
    const correct = isCorrect(value, line);
    finishBlank(correct, line);
}

function isCorrect(value, line) {
    const v = value.trim().toLowerCase().replace(/\s+/g, '');
    return line.correct.some(c => c.toLowerCase().replace(/\s+/g, '') === v);
}

function finishBlank(isCorrect, line) {
    answered = true;

    // Übersetzungen bis einschließlich dieser Lücke enthüllen
    const lineIdx = activeScene.indexOf(line);
    revealedUpTo = lineIdx;

    // Aktiven Blank füllen
    const activeBlank = document.getElementById('activeBlank');
    if (activeBlank) {
        activeBlank.textContent = line.correct[0];
        activeBlank.classList.remove('active-blank');
        activeBlank.classList.add(isCorrect ? 'blank-filled' : 'blank-wrong');
    }

    // Eingabe-Elemente entfernen
    document.querySelectorAll('.sim-choices, .sim-text-input').forEach(el => el.remove());

    // Übersetzung der aktuellen Zeile einblenden (ohne vollständigen Re-render)
    const allBubbles = dialogContainer.querySelectorAll('.dialog-bubble');
    const currentBubble = allBubbles[lineIdx];
    if (currentBubble && !currentBubble.querySelector('.dialog-tr')) {
        const trSpan = document.createElement('span');
        trSpan.className = 'dialog-tr';
        trSpan.textContent = '(' + (getLangField(line, 'de', 'en') || '') + ')';
        currentBubble.appendChild(trSpan);
    }

    // Übersetzungen aller text-Zeilen davor enthüllen (seit letzter Lücke)
    activeScene.forEach((l, idx) => {
        if (idx > revealedUpTo) return;
        const bubble = allBubbles[idx];
        if (!bubble) return;
        if (bubble.querySelector('.dialog-tr')) return; // schon sichtbar
        const tr = document.createElement('span');
        tr.className = 'dialog-tr';
        tr.textContent = '(' + (getLangField(l, 'de', 'en') || '') + ')';
        bubble.appendChild(tr);
    });

    // Score + Feedback
    if (isCorrect) {
        score.addCorrect();
        showFeedback('feedbackArea', t('feedback.correct') + ' — ' + getLangField(line, 'explanation'), true);
    } else {
        score.addIncorrect();
        showFeedback('feedbackArea',
            t('feedback.wrong') + ' ' + t('feedback.correctIs') + ' ' + line.correct[0]
            + ' — ' + getLangField(line, 'explanation'), false);
        if (currentMode === 'spaced' && !incorrectScenes.includes(activeSceneId)) {
            incorrectScenes.push(activeSceneId);
        }
    }

    // Quick Answer
    if (isCorrect && isQuickAnswer()) {
        setTimeout(() => advanceBlank(), 400);
    } else {
        const nextKey = blankIndex + 1 < blankLines.length ? 'sim.nextBlank' : 'btn.next';
        nextButton.setAttribute('data-i18n', nextKey);
        nextButton.textContent = t(nextKey);
        nextButton.style.display = 'inline-block';
    }
}

function advanceBlank() {
    answered  = false;
    blankIndex++;
    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';

    if (blankIndex >= blankLines.length) {
        loadNextScene();
    } else {
        renderDialog();
    }
}

/* ============ KORE/SORE/ARE VISUELLER INDIKATOR ============ */

function renderKoreroVisual(line) {
    const v = line.visual;
    if (!v) return null;

    const youLabel   = t('sim.visual.you');
    const staffLabel = t('sim.speaker.staff');

    const wrap = document.createElement('div');
    wrap.className = 'korero-visual';

    function personCol(name) {
        const col = document.createElement('div');
        col.className = 'kv-person-wrap';
        col.innerHTML = '<span class="kv-person-face">👤</span>'
            + '<span class="kv-person-name">' + escHtml(name) + '</span>';
        return col;
    }

    function itemEl(extra) {
        const el = document.createElement('div');
        el.className = 'kv-item-wrap' + (extra ? ' ' + extra : '');
        el.innerHTML = '<span class="kv-item-emoji">' + v.item + '</span>';
        return el;
    }

    function connector() {
        const el = document.createElement('div');
        el.className = 'kv-connector';
        return el;
    }

    if (v.position === 'near-customer') {
        // [item] [👤 Du] ·····  [👤 Verk.]
        wrap.appendChild(itemEl());
        wrap.appendChild(personCol(youLabel));
        wrap.appendChild(connector());
        wrap.appendChild(personCol(staffLabel));
    } else if (v.position === 'near-staff') {
        // [👤 Du] ·····  [👤 Verk.] [item]
        wrap.appendChild(personCol(youLabel));
        wrap.appendChild(connector());
        wrap.appendChild(personCol(staffLabel));
        wrap.appendChild(itemEl());
    } else {
        // far: [👤 Du] ·· [item on shelf] ·· [👤 Verk.]
        wrap.appendChild(personCol(youLabel));
        wrap.appendChild(connector());
        wrap.appendChild(itemEl('kv-item-wrap--far'));
        wrap.appendChild(connector());
        wrap.appendChild(personCol(staffLabel));
    }

    return wrap;
}

/* ============ HILFSFUNKTIONEN ============ */

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/* ============ EVENT LISTENER ============ */

nextButton.addEventListener('click', advanceBlank);

modeRandomBtn.addEventListener('click', () => {
    currentMode = 'random';
    modeRandomBtn.classList.add('active');
    modeSemiBtn.classList.remove('active');
    applySceneFilter();
});

modeSemiBtn.addEventListener('click', () => {
    currentMode = 'spaced';
    modeSemiBtn.classList.add('active');
    modeRandomBtn.classList.remove('active');
    applySceneFilter();
});

inputModeMC.addEventListener('click', () => {
    inputMode = 'mc';
    inputModeMC.classList.add('active');
    inputModeText.classList.remove('active');
    if (!answered) renderDialog();
});

inputModeText.addEventListener('click', () => {
    inputMode = 'text';
    inputModeText.classList.add('active');
    inputModeMC.classList.remove('active');
    if (!answered) renderDialog();
});

applyFilterBtn.addEventListener('click', applySceneFilter);

document.addEventListener('langchange', () => {
    const prevSelected = getSelectedScenes();
    buildSceneCheckboxes();
    sceneFiltersDiv.querySelectorAll('input[type=checkbox]').forEach(cb => {
        cb.checked = prevSelected.includes(cb.value);
    });
    if (activeScene) renderDialog();
});

/* ============ INIT ============ */

score = new ScoreTracker('correctCount', 'incorrectCount');
buildSceneCheckboxes();
injectQuickAnswerButton(document.querySelector('.simulation-trainer'));
applySceneFilter();

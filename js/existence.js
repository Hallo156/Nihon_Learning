/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* existence.js — Leseverstehen-Modul: Texte zu Wohnungen lesen, Existenz-Fragen beantworten.
   Braucht: common.js, i18n.js, quiz-engine.js, existence-data.js */

/* ============ DOM-REFERENZEN ============ */

const existenceContainer  = document.querySelector('.existence-trainer');
const filtersDiv           = document.getElementById('existenceFilters');
const applyFilterBtn       = document.getElementById('applyFilter');
const passageContainer     = document.getElementById('passageContainer');
const passageTitleEl       = document.getElementById('passageTitle');
const passageContent       = document.getElementById('passageContent');
const questionProgressEl   = document.getElementById('questionProgress');
const displayArea          = document.getElementById('displayArea');
const choicesArea          = document.getElementById('choicesArea');
const inputArea            = document.getElementById('inputArea');
const textInput            = document.getElementById('textInput');
const checkButton          = document.getElementById('checkButton');
const feedbackArea         = document.getElementById('feedbackArea');
const nextButton           = document.getElementById('nextButton');

/* ============ SICHTBARKEITS-TOGGLES (Romaji + Übersetzung des Lesetexts) ============ */

buildVisibilityToggles({
    container: existenceContainer,
    insertBefore: passageContainer,
    target: existenceContainer,
    toggles: [
        { key: 'exist_romaji',       i18nKey: 'vis.romaji',       cssClass: 'hide-romaji',       defaultOn: false },
        { key: 'exist_translation',  i18nKey: 'vis.translation',  cssClass: 'hide-translation',  defaultOn: true  }
    ]
});

/* ============ STATE ============ */

const score     = new ScoreTracker('correctCount', 'incorrectCount');
let textPool    = [];    // alle Texte passend zu aktiven Filtern
let textQueue   = [];    // verbleibende Texte dieser Runde
let currentText = null;  // aktuell angezeigter Text
let currentQIdx = 0;     // aktuelle Frage im Text
let answered    = false;

/* ============ FILTER ============ */

function buildFilters() {
    filtersDiv.innerHTML = '';
    Object.entries(housingTypes).forEach(([key, val]) => {
        const label = document.createElement('label');
        const cb    = document.createElement('input');
        cb.type     = 'checkbox';
        cb.value    = key;
        cb.checked  = true;
        const displayLabel = val.jp + ' (' + getLangField(val, 'de', 'en') + ')';
        label.appendChild(cb);
        label.appendChild(document.createTextNode(' ' + displayLabel));
        filtersDiv.appendChild(label);
    });
}

function getActiveTypes() {
    const types = [];
    filtersDiv.querySelectorAll('input[type=checkbox]:checked').forEach(cb => types.push(cb.value));
    return types;
}

function applyFilter() {
    const types = getActiveTypes();
    if (types.length === 0) {
        showFeedback('feedbackArea', t('existence.noFilter'), false, false);
        return;
    }
    textPool = existenceTexts.filter(txt => types.includes(txt.type));
    textQueue = [...textPool];
    shuffleArray(textQueue);
    score.reset();
    clearFeedback('feedbackArea');
    loadNextText();
}

/* ============ TEXT LADEN ============ */

function loadNextText() {
    if (textQueue.length === 0) {
        textQueue = [...textPool];
        shuffleArray(textQueue);
    }
    currentText = textQueue.shift();
    currentQIdx = 0;
    renderPassage(currentText);
    loadQuestion();
}

function renderPassage(textData) {
    // Colored left border to indicate housing type
    passageContainer.className = 'reading-passage housing-' + textData.type;

    passageTitleEl.textContent = getLangField(textData, 'title_de', 'title_en');

    const jpLines     = textData.text_jp.split('\n');
    const romajiLines = textData.text_romaji ? textData.text_romaji.split('\n') : [];
    const transText   = getLangField(textData, 'text_de', 'text_en');
    const transLines  = transText.split('\n');

    passageContent.innerHTML = '';

    jpLines.forEach(function(jpLine, i) {
        const group = document.createElement('div');
        group.className = 'passage-line-group';

        const jpSpan = document.createElement('span');
        jpSpan.className = 'line-jp';
        jpSpan.textContent = jpLine;
        group.appendChild(jpSpan);

        if (romajiLines[i] !== undefined && romajiLines[i] !== '') {
            const romajiSpan = document.createElement('span');
            romajiSpan.className = 'line-romaji';
            romajiSpan.textContent = romajiLines[i];
            group.appendChild(romajiSpan);
        }

        if (transLines[i] !== undefined && transLines[i] !== '') {
            const transSpan = document.createElement('span');
            transSpan.className = 'line-trans';
            transSpan.textContent = transLines[i];
            group.appendChild(transSpan);
        }

        passageContent.appendChild(group);
    });

    passageContainer.style.display = '';
}

/* ============ FRAGE LADEN ============ */

function loadQuestion() {
    const q = currentText.questions[currentQIdx];
    answered = false;

    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';
    choicesArea.innerHTML    = '';
    inputArea.style.display  = 'none';
    textInput.value          = '';

    const total = currentText.questions.length;
    questionProgressEl.textContent = t('existence.questionOf', currentQIdx + 1, total);

    displayArea.innerHTML =
        '<div class="question-text">' + getLangField(q, 'prompt_de', 'prompt_en') + '</div>';

    if (q.type === 'mc') {
        renderChoices(q);
    } else {
        inputArea.style.display = '';
        setTimeout(() => textInput.focus(), 50);
    }
}

/* ============ MULTIPLE CHOICE ============ */

function renderChoices(q) {
    q.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-button existence-choice';
        btn.innerHTML =
            '<span class="choice-jp">'    + choice.jp + '</span>' +
            '<span class="choice-trans">' + getLangField(choice, 'de', 'en') + '</span>';
        btn.addEventListener('click', () => handleMCAnswer(choice, q));
        choicesArea.appendChild(btn);
    });
}

function handleMCAnswer(choice, q) {
    if (answered) return;
    answered = true;

    const isCorrect = q.correct.includes(choice.jp);

    choicesArea.querySelectorAll('.choice-button').forEach(btn => {
        btn.disabled = true;
        const jp = btn.querySelector('.choice-jp').textContent;
        if (q.correct.includes(jp)) {
            btn.classList.add('correct-choice');
        } else if (jp === choice.jp && !isCorrect) {
            btn.classList.add('wrong-choice');
        }
    });

    finishQuestion(isCorrect, q);
}

/* ============ TEXTEINGABE ============ */

function handleTextSubmit() {
    if (answered) return;
    const input = textInput.value.trim();
    if (!input) return;
    answered = true;

    const q         = currentText.questions[currentQIdx];
    const isCorrect = q.correct.some(v => v.toLowerCase() === input.toLowerCase());
    finishQuestion(isCorrect, q);
}

/* ============ ANTWORT AUSWERTEN ============ */

function finishQuestion(isCorrect, q) {
    if (isCorrect) { score.addCorrect(); } else { score.addIncorrect(); }

    const isLast = currentQIdx >= currentText.questions.length - 1;

    let html = '<strong>' + (isCorrect ? t('feedback.correct') : t('feedback.wrong')) + '</strong>';
    if (!isCorrect) {
        html += ' <span class="correct-answer">' +
                t('feedback.correctIs') + ' <em>' + q.correct[0] + '</em></span>';
    }
    html += '<br><span class="existence-explanation">' +
            getLangField(q, 'explanation_de', 'explanation_en') + '</span>';

    showFeedback('feedbackArea', html, isCorrect, true);

    // Quick Answer: bei richtig + nicht letzte Frage automatisch weiter
    if (isCorrect && isQuickAnswer() && !isLast) {
        setTimeout(() => { if (answered) advanceQuestion(); }, 400);
        return;
    }

    const btnKey = isLast ? 'existence.nextText' : 'btn.next';
    nextButton.textContent            = t(btnKey);
    nextButton.dataset.isLastQuestion = isLast ? '1' : '0';
    nextButton.style.display          = 'block';
}

function advanceQuestion() {
    currentQIdx++;
    if (currentQIdx >= currentText.questions.length) {
        loadNextText();
    } else {
        loadQuestion();
    }
}

/* ============ NACHSCHLAG-SIDEBAR ============ */

buildReferenceSidebar({
    storageKey: 'sidebar_existence',
    buildContent: function(container) {
        if (currentLang === 'en') {
            existenceReference.build_en(container);
        } else {
            existenceReference.build_de(container);
        }
    }
});

/* ============ EVENT LISTENER ============ */

applyFilterBtn.addEventListener('click', applyFilter);

nextButton.addEventListener('click', () => {
    if (nextButton.dataset.isLastQuestion === '1') {
        loadNextText();
    } else {
        advanceQuestion();
    }
});

textInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleTextSubmit();
});

checkButton.addEventListener('click', handleTextSubmit);

document.addEventListener('langchange', () => {
    buildFilters();
    if (currentText) {
        renderPassage(currentText);
        const q = currentText.questions[currentQIdx];
        const el = displayArea.querySelector('.question-text');
        if (el) el.textContent = getLangField(q, 'prompt_de', 'prompt_en');
        if (q && q.type === 'mc' && !answered) {
            choicesArea.innerHTML = '';
            renderChoices(q);
        } else if (q && q.type === 'mc') {
            choicesArea.querySelectorAll('.choice-button').forEach((btn, i) => {
                const transEl = btn.querySelector('.choice-trans');
                if (transEl && q.choices[i]) {
                    transEl.textContent = getLangField(q.choices[i], 'de', 'en');
                }
            });
        }
        questionProgressEl.textContent =
            t('existence.questionOf', currentQIdx + 1, currentText.questions.length);
        if (nextButton.style.display !== 'none') {
            const isLast = nextButton.dataset.isLastQuestion === '1';
            nextButton.textContent = t(isLast ? 'existence.nextText' : 'btn.next');
        }
    }
});

/* ============ INIT ============ */

injectQuickAnswerButton();
buildFilters();
applyFilter();

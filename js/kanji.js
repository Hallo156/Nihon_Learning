/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* kanji.js — Kanji-Trainer: 3 Quiz-Typen, Stufenfilter, Spaced Repetition.
   Braucht: common.js, i18n.js, quiz-engine.js, kanji-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getMeaning(k) {
    return currentLang === 'en' && k.meaning_en ? k.meaning_en : k.meaning_de;
}

/* ============ STATE ============ */

let currentQuizType = 'kanji-de';   // 'kanji-de' | 'de-kanji' | 'kanji-reading'
let filteredKanji = [];

/* ============ DOM (modul-spezifisch) ============ */

const typeKanjiDeBtn = document.getElementById('typeKanjiDe');
const typeDeKanjiBtn = document.getElementById('typeDeKanji');
const typeKanjiReadingBtn = document.getElementById('typeKanjiReading');

/* ============ STUFENFILTER ============ */

function applyLevelFilter() {
    const levels = getActiveLevels();
    filteredKanji = kanjiData.filter(k => levels.includes(k.level));
    if (filteredKanji.length === 0) {
        filteredKanji = kanjiData.filter(k => k.level === 'A1');
    }
    engine.resetQuiz();
}

/* ============ MULTIPLE-CHOICE GENERIERUNG ============ */

function buildMeaningChoices() {
    const correct = getMeaning(engine.currentQuestion)[0];
    let choices = [correct];
    const pool = filteredKanji.filter(k => k.kanji !== engine.currentQuestion.kanji);
    shuffleArray(pool);
    for (const k of pool) {
        if (choices.length >= 4) break;
        const m = getMeaning(k)[0];
        if (!choices.includes(m)) choices.push(m);
    }
    shuffleArray(choices);
    return choices;
}

function buildKanjiChoices() {
    const correct = engine.currentQuestion.kanji;
    let choices = [correct];
    const pool = filteredKanji.filter(k => k.kanji !== engine.currentQuestion.kanji);
    shuffleArray(pool);
    for (const k of pool) {
        if (choices.length >= 4) break;
        if (!choices.includes(k.kanji)) choices.push(k.kanji);
    }
    shuffleArray(choices);
    return choices;
}

/* ============ QUIZ-ENGINE ============ */

const engine = new QuizEngine({
    feedbackId: 'feedbackArea',
    nextButtonId: 'nextButton',
    choicesAreaId: 'choicesArea',
    textInputId: 'textInput',
    checkButtonId: 'checkButton',
    displayAreaId: 'displayArea',
    modeRandomId: 'modeRandom',
    modeSemiId: 'modeSemiRandom',
    correctSpanId: 'correctCount',
    incorrectSpanId: 'incorrectCount',
    quickAnswerTarget: '.score',

    getPool: () => filteredKanji,

    renderQuestion: (k, eng) => {
        if (currentQuizType === 'kanji-de') {
            eng.displayArea.className = 'kanji-display';
            eng.displayArea.textContent = k.kanji;
            eng.textInput.placeholder = t('kanji.phMeaning');
            const choices = buildMeaningChoices();
            eng.renderChoiceButtons(choices, selected => {
                const isCorrect = getMeaning(k).some(m => m.toLowerCase() === selected.toLowerCase());
                eng.finishAnswer(isCorrect);
            });
        } else if (currentQuizType === 'de-kanji') {
            eng.displayArea.className = 'meaning-display';
            eng.displayArea.textContent = getMeaning(k)[0];
            eng.textInput.placeholder = t('kanji.phKanji');
            const choices = buildKanjiChoices();
            eng.renderChoiceButtons(choices, selected => {
                eng.finishAnswer(selected === k.kanji);
            });
        } else {
            eng.displayArea.className = 'kanji-display';
            eng.displayArea.textContent = k.kanji;
            eng.textInput.placeholder = t('kanji.phReading');
            eng.choicesArea.innerHTML = '';
        }
    },

    checkText: (input, k) => {
        if (currentQuizType === 'kanji-de') {
            const allMeanings = [...k.meaning_de, ...(k.meaning_en || [])];
            return allMeanings.some(m => m.toLowerCase() === input.toLowerCase());
        } else if (currentQuizType === 'de-kanji') {
            const allAnswers = [k.kanji, k.romaji, ...k.romaji_variants];
            return allAnswers.some(a => a.toLowerCase() === input.toLowerCase());
        } else {
            const allReadings = [k.romaji, ...k.romaji_variants];
            return allReadings.some(r => r.toLowerCase() === input.toLowerCase());
        }
    },

    buildFeedback: (k, isCorrect) => {
        let html = '';
        if (isCorrect) {
            html += '<strong>' + t('feedback.correct') + '</strong><br>';
        } else {
            html += '<strong>' + t('feedback.wrong') + '</strong> ';
            if (currentQuizType === 'kanji-de') {
                html += t('feedback.correctIs') + ' "' + getMeaning(k)[0] + '"<br>';
            } else if (currentQuizType === 'de-kanji') {
                html += t('feedback.correctIs') + ' ' + k.kanji + '<br>';
            } else {
                html += t('feedback.correctIs') + ' "' + k.romaji + '"<br>';
            }
        }
        html += '<span class="kanji-info">';
        html += '漢字: ' + k.kanji + ' <span class="level-badge">' + k.level + '</span><br>';
        html += t('kanji.meaning') + ': ' + getMeaning(k).join(', ') + '<br>';
        html += "On'yomi: " + k.on + " | Kun'yomi: " + k.kun + ' | Romaji: ' + k.romaji;
        html += '</span>';
        return html;
    }
});

/* ============ QUIZ-TYP WECHSEL ============ */

function switchQuizType(type) {
    currentQuizType = type;
    typeKanjiDeBtn.classList.toggle('active', type === 'kanji-de');
    typeDeKanjiBtn.classList.toggle('active', type === 'de-kanji');
    typeKanjiReadingBtn.classList.toggle('active', type === 'kanji-reading');
    engine.resetQuiz();
}

/* ============ EVENT LISTENER (modul-spezifisch) ============ */

typeKanjiDeBtn.addEventListener('click', () => switchQuizType('kanji-de'));
typeDeKanjiBtn.addEventListener('click', () => switchQuizType('de-kanji'));
typeKanjiReadingBtn.addEventListener('click', () => switchQuizType('kanji-reading'));

document.addEventListener('levelchange', applyLevelFilter);

/* ============ INIT ============ */

applyLevelFilter();

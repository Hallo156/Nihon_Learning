/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* kanji-vocab.js — Kanji-Vokabular-Quiz: 3 Typen, dynamischer Stufenfilter, Spaced Repetition.
   Braucht: common.js, i18n.js, quiz-engine.js, kanji-data.js, kanji-vocab-data.js */

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getMeaning(v) {
    return currentLang === 'en' && v.meaning_en ? v.meaning_en : v.meaning_de;
}

/* ============ DYNAMISCHER LEVEL-RECHNER ============ */

const LEVEL_ORDER = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4 };
const kanjiLevelMap = {};
for (const entry of kanjiData) {
    kanjiLevelMap[entry.kanji] = entry.level;
}

function computeVocabLevel(word) {
    let maxLevel = null;
    for (const char of word) {
        const lvl = kanjiLevelMap[char];
        if (lvl && (!maxLevel || LEVEL_ORDER[lvl] > LEVEL_ORDER[maxLevel])) {
            maxLevel = lvl;
        }
    }
    return maxLevel || 'A1';
}

/* ============ STATE ============ */

let currentQuizType = 'word-de';    // 'word-de' | 'de-word' | 'word-reading'
let filteredVocab = [];

/* ============ DOM (modul-spezifisch) ============ */

const typeWordDeBtn = document.getElementById('typeWordDe');
const typeDeWordBtn = document.getElementById('typeDeWord');
const typeWordReadingBtn = document.getElementById('typeWordReading');

/* ============ STUFENFILTER ============ */

function applyLevelFilter() {
    const levels = getActiveLevels();
    filteredVocab = kanjiVocabData.filter(v => levels.includes(computeVocabLevel(v.word)));
    if (filteredVocab.length === 0) {
        filteredVocab = kanjiVocabData.filter(v => computeVocabLevel(v.word) === 'A1');
    }
    engine.resetQuiz();
}

/* ============ MULTIPLE-CHOICE GENERIERUNG ============ */

function buildMeaningChoices() {
    const correct = getMeaning(engine.currentQuestion)[0];
    let choices = [correct];
    const pool = filteredVocab.filter(v => v.word !== engine.currentQuestion.word);
    shuffleArray(pool);
    for (const v of pool) {
        if (choices.length >= 4) break;
        const m = getMeaning(v)[0];
        if (!choices.includes(m)) choices.push(m);
    }
    shuffleArray(choices);
    return choices;
}

function buildWordChoices() {
    const correct = engine.currentQuestion.word;
    let choices = [correct];
    const pool = filteredVocab.filter(v => v.word !== engine.currentQuestion.word);
    shuffleArray(pool);
    for (const v of pool) {
        if (choices.length >= 4) break;
        if (!choices.includes(v.word)) choices.push(v.word);
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

    getPool: () => filteredVocab,

    renderQuestion: (v, eng) => {
        if (currentQuizType === 'word-de') {
            eng.displayArea.className = 'word-display';
            eng.displayArea.textContent = v.word;
            eng.textInput.placeholder = t('kanjiVocab.phMeaning');
            const choices = buildMeaningChoices();
            eng.renderChoiceButtons(choices, selected => {
                const isCorrect = getMeaning(v).some(m => m.toLowerCase() === selected.toLowerCase());
                eng.finishAnswer(isCorrect);
            });
        } else if (currentQuizType === 'de-word') {
            eng.displayArea.className = 'meaning-display';
            eng.displayArea.textContent = getMeaning(v)[0];
            eng.textInput.placeholder = t('kanjiVocab.phWord');
            const choices = buildWordChoices();
            eng.renderChoiceButtons(choices, selected => {
                eng.finishAnswer(selected === v.word);
            });
        } else {
            eng.displayArea.className = 'word-display';
            eng.displayArea.textContent = v.word;
            eng.textInput.placeholder = t('kanjiVocab.phReading');
            eng.choicesArea.innerHTML = '';
        }
    },

    checkText: (input, v) => {
        if (currentQuizType === 'word-de') {
            const allMeanings = [...v.meaning_de, ...(v.meaning_en || [])];
            return allMeanings.some(m => m.toLowerCase() === input.toLowerCase());
        } else if (currentQuizType === 'de-word') {
            const allAnswers = [v.word, v.reading, v.romaji, ...v.romaji_variants];
            return allAnswers.some(a => a.toLowerCase() === input.toLowerCase());
        } else {
            const allReadings = [v.reading, v.romaji, ...v.romaji_variants];
            return allReadings.some(r => r.toLowerCase() === input.toLowerCase());
        }
    },

    buildFeedback: (v, isCorrect) => {
        const level = computeVocabLevel(v.word);
        let html = '';
        if (isCorrect) {
            html += '<strong>' + t('feedback.correct') + '</strong><br>';
        } else {
            html += '<strong>' + t('feedback.wrong') + '</strong> ';
            if (currentQuizType === 'word-de') {
                html += t('feedback.correctIs') + ' "' + getMeaning(v)[0] + '"<br>';
            } else if (currentQuizType === 'de-word') {
                html += t('feedback.correctIs') + ' ' + v.word + ' (' + v.reading + ')<br>';
            } else {
                html += t('feedback.correctIs') + ' "' + v.reading + '" (' + v.romaji + ')<br>';
            }
        }
        html += '<span class="kanji-info">';
        html += '語彙: ' + v.word + ' <span class="level-badge">' + level + '</span><br>';
        html += t('kanjiVocab.reading') + ': ' + v.reading + ' (' + v.romaji + ')<br>';
        html += t('kanjiVocab.meaning') + ': ';
        html += v.meaning_de.join(', ');
        if (v.meaning_en && v.meaning_en.length > 0) {
            html += ' / ' + v.meaning_en.join(', ');
        }
        html += '</span>';
        return html;
    }
});

/* ============ QUIZ-TYP WECHSEL ============ */

function switchQuizType(type) {
    currentQuizType = type;
    typeWordDeBtn.classList.toggle('active', type === 'word-de');
    typeDeWordBtn.classList.toggle('active', type === 'de-word');
    typeWordReadingBtn.classList.toggle('active', type === 'word-reading');
    engine.resetQuiz();
}

/* ============ EVENT LISTENER (modul-spezifisch) ============ */

typeWordDeBtn.addEventListener('click', () => switchQuizType('word-de'));
typeDeWordBtn.addEventListener('click', () => switchQuizType('de-word'));
typeWordReadingBtn.addEventListener('click', () => switchQuizType('word-reading'));

document.addEventListener('levelchange', applyLevelFilter);

/* ============ INIT ============ */

applyLevelFilter();

/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* verb.js — Verb-Trainer: Satzluecken mit Multiple-Choice (15 Verben)
   Zwei Modi per Toggle: "Zufaellig" und "Wiederholung" (Spaced Repetition 70/30).
   Braucht: common.js, i18n.js */

/* ============ DATEN ============ */

const verbsData = [
    { verb_masu: "いきます", romaji: "ikimasu", meaning_de: "gehen", meaning_en: "to go", sentence_jp_blank: "わたし は がっこう へ ＿＿＿＿＿。", sentence_jp_filled: "わたし は がっこう へ いきます。", sentence_de_filled: "Ich gehe zur Schule.", sentence_en_filled: "I go to school." },
    { verb_masu: "かえります", romaji: "kaerimasu", meaning_de: "zurückkehren", meaning_en: "to return", sentence_jp_blank: "きょう は うち へ はやく ＿＿＿＿＿。", sentence_jp_filled: "きょう は うち へ はやく かえります。", sentence_de_filled: "Heute kehre ich früh nach Hause zurück.", sentence_en_filled: "Today I return home early." },
    { verb_masu: "かきます", romaji: "kakimasu", meaning_de: "schreiben", meaning_en: "to write", sentence_jp_blank: "ともだち に てがみ を ＿＿＿＿＿。", sentence_jp_filled: "ともだち に てがみ を かきます。", sentence_de_filled: "Ich schreibe einen Brief an einen Freund.", sentence_en_filled: "I write a letter to a friend." },
    { verb_masu: "よみます", romaji: "yomimasu", meaning_de: "lesen", meaning_en: "to read", sentence_jp_blank: "まいばん、ほん を ＿＿＿＿＿。", sentence_jp_filled: "まいばん、ほん を よみます。", sentence_de_filled: "Jeden Abend lese ich ein Buch.", sentence_en_filled: "Every evening I read a book." },
    { verb_masu: "ききます", romaji: "kikimasu", meaning_de: "hören/fragen", meaning_en: "to listen/ask", sentence_jp_blank: "よく ラジオ を ＿＿＿＿＿。", sentence_jp_filled: "よく ラジオ を ききます。", sentence_de_filled: "Ich höre oft Radio.", sentence_en_filled: "I often listen to the radio." },
    { verb_masu: "みます", romaji: "mimasu", meaning_de: "sehen/schauen", meaning_en: "to watch/see", sentence_jp_blank: "しゅうまつ に えいが を ＿＿＿＿＿。", sentence_jp_filled: "しゅうまつ に えいが を みます。", sentence_de_filled: "Am Wochenende schaue ich einen Film.", sentence_en_filled: "On the weekend I watch a movie." },
    { verb_masu: "たべます", romaji: "tabemasu", meaning_de: "essen", meaning_en: "to eat", sentence_jp_blank: "レストラン で ばんごはん を ＿＿＿＿＿。", sentence_jp_filled: "レストラン で ばんごはん を たべます。", sentence_de_filled: "Ich esse im Restaurant zu Abend.", sentence_en_filled: "I eat dinner at a restaurant." },
    { verb_masu: "のみます", romaji: "nomimasu", meaning_de: "trinken", meaning_en: "to drink", sentence_jp_blank: "まいにち コーヒー を ＿＿＿＿＿。", sentence_jp_filled: "まいにち コーヒー を のみます。", sentence_de_filled: "Jeden Tag trinke ich Kaffee.", sentence_en_filled: "Every day I drink coffee." },
    { verb_masu: "かいます", romaji: "kaimasu", meaning_de: "kaufen", meaning_en: "to buy", sentence_jp_blank: "デパート で くつ を ＿＿＿＿＿。", sentence_jp_filled: "デパート で くつ を かいます。", sentence_de_filled: "Ich kaufe Schuhe im Kaufhaus.", sentence_en_filled: "I buy shoes at the department store." },
    { verb_masu: "つくります", romaji: "tsukurimasu", meaning_de: "machen/herstellen", meaning_en: "to make/create", sentence_jp_blank: "おかあさん が りょうり を ＿＿＿＿＿。", sentence_jp_filled: "おかあさん が りょうり を つくります。", sentence_de_filled: "Meine Mutter kocht (macht Essen).", sentence_en_filled: "My mother cooks (makes food)." },
    { verb_masu: "はなします", romaji: "hanashimasu", meaning_de: "sprechen", meaning_en: "to speak", sentence_jp_blank: "せんせい と にほんご で ＿＿＿＿＿。", sentence_jp_filled: "せんせい と にほんご で はなします。", sentence_de_filled: "Ich spreche mit dem Lehrer auf Japanisch.", sentence_en_filled: "I speak with the teacher in Japanese." },
    { verb_masu: "します", romaji: "shimasu", meaning_de: "tun/machen", meaning_en: "to do", sentence_jp_blank: "どようび に スポーツ を ＿＿＿＿＿。", sentence_jp_filled: "どようび に スポーツ を します。", sentence_de_filled: "Am Samstag treibe ich Sport.", sentence_en_filled: "On Saturday I do sports." },
    { verb_masu: "きます", romaji: "kimasu", meaning_de: "kommen", meaning_en: "to come", sentence_jp_blank: "あした、ともだち が ＿＿＿＿＿。", sentence_jp_filled: "あした、ともだち が きます。", sentence_de_filled: "Morgen kommt ein Freund.", sentence_en_filled: "Tomorrow a friend is coming." },
    { verb_masu: "ねます", romaji: "nemasu", meaning_de: "schlafen", meaning_en: "to sleep", sentence_jp_blank: "きのう は じゅうじ に ＿＿＿＿＿。", sentence_jp_filled: "きのう は じゅうじ に ねました。", sentence_de_filled: "Gestern bin ich um 10 Uhr schlafen gegangen.", sentence_en_filled: "Yesterday I went to sleep at 10 o'clock." },
    { verb_masu: "おきます", romaji: "okimasu", meaning_de: "aufstehen", meaning_en: "to wake up", sentence_jp_blank: "けさ、ろくじ に ＿＿＿＿＿。", sentence_jp_filled: "けさ、ろくじ に おきました。", sentence_de_filled: "Heute Morgen bin ich um 6 Uhr aufgestanden.", sentence_en_filled: "This morning I woke up at 6 o'clock." }
];

/* ============ HELFER: Sprach-abhängige Felder ============ */

function getMeaning(v) {
    return currentLang === 'en' ? v.meaning_en : v.meaning_de;
}
function getSentenceFilled(v) {
    return currentLang === 'en' ? v.sentence_en_filled : v.sentence_de_filled;
}

/* ============ STATE ============ */

let currentQuestion = null;
let currentMode = 'random';         // 'random' | 'semi-random'
let remainingQuestions = [];         // Semi-Random: noch nicht gezeigte Fragen
let incorrectQuestions = [];         // Semi-Random: falsch beantwortete Fragen

/* ============ DOM ============ */

const questionArea = document.getElementById('questionArea');
const choicesArea = document.getElementById('choicesArea');
const feedbackArea = document.getElementById('feedbackArea');
const nextButton = document.getElementById('nextButton');
const score = new ScoreTracker('correctCount', 'incorrectCount');
const modeRandomBtn = document.getElementById('modeRandom');
const modeSemiBtn = document.getElementById('modeSemiRandom');

/* ============ FRAGEN-AUSWAHL ============ */

function selectNextQuestion() {
    if (currentMode === 'random') {
        return verbsData[Math.floor(Math.random() * verbsData.length)];
    }
    if (remainingQuestions.length === 0 && incorrectQuestions.length === 0) {
        remainingQuestions = [...verbsData];
        shuffleArray(remainingQuestions);
    }
    if (incorrectQuestions.length > 0 && Math.random() < 0.3) {
        return incorrectQuestions.shift();
    }
    return remainingQuestions.shift();
}

/* ============ FRAGE LADEN + ANZEIGEN ============ */

function loadQuestion() {
    currentQuestion = selectNextQuestion();
    questionArea.textContent = currentQuestion.sentence_jp_blank.replace("＿＿＿＿＿", " ______ ");

    let choices = [currentQuestion.verb_masu];
    while (choices.length < 3) {
        const random = verbsData[Math.floor(Math.random() * verbsData.length)].verb_masu;
        if (!choices.includes(random)) choices.push(random);
    }
    shuffleArray(choices);

    choicesArea.innerHTML = '';
    choices.forEach(choiceText => {
        const button = document.createElement('button');
        button.classList.add('choice-button');
        button.textContent = choiceText;
        button.addEventListener('click', () => handleAnswer(choiceText));
        choicesArea.appendChild(button);
    });

    clearFeedback('feedbackArea');
    nextButton.style.display = 'none';
}

/* ============ ANTWORT PRUEFEN ============ */

function handleAnswer(selectedVerb) {
    choicesArea.querySelectorAll('.choice-button').forEach(btn => btn.disabled = true);

    let feedbackHTML = '';
    if (selectedVerb === currentQuestion.verb_masu) {
        feedbackArea.className = 'feedback correct';
        feedbackHTML += `<strong>${t('verb.correctVerb', currentQuestion.verb_masu)}</strong><br>`;
        score.addCorrect();
    } else {
        feedbackArea.className = 'feedback incorrect';
        feedbackHTML += `<strong>${t('verb.wrongSel', selectedVerb)}</strong><br>`;
        feedbackHTML += `${t('verb.correctAns', currentQuestion.verb_masu)}<br>`;
        score.addIncorrect();
        if (currentMode === 'semi-random') {
            incorrectQuestions.push(currentQuestion);
        }
    }

    feedbackHTML += `${t('verb.fullSentence')}: <strong>${currentQuestion.sentence_jp_filled}</strong><br>`;
    feedbackHTML += `<span class="translation">${t('verb.meaningLabel')}: "${getSentenceFilled(currentQuestion)}"</span><br>`;
    feedbackHTML += `<span class="romaji">(${currentQuestion.verb_masu} - ${currentQuestion.romaji} - ${getMeaning(currentQuestion)})</span>`;

    feedbackArea.innerHTML = feedbackHTML;

    if (selectedVerb === currentQuestion.verb_masu && isQuickAnswer()) {
        setTimeout(loadQuestion, 400);
    } else {
        nextButton.style.display = 'block';
    }
}

/* ============ MODUS-WECHSEL ============ */

function switchMode(mode) {
    currentMode = mode;
    modeRandomBtn.classList.toggle('active', mode === 'random');
    modeSemiBtn.classList.toggle('active', mode === 'semi-random');
    score.reset();
    remainingQuestions = [...verbsData];
    shuffleArray(remainingQuestions);
    incorrectQuestions = [];
    loadQuestion();
}

/* ============ LANGCHANGE ============ */

document.addEventListener('langchange', () => {
    if (currentQuestion) loadQuestion();
});

/* ============ INIT ============ */

nextButton.addEventListener('click', loadQuestion);
modeRandomBtn.addEventListener('click', () => switchMode('random'));
modeSemiBtn.addEventListener('click', () => switchMode('semi-random'));

/* Quick Answer Button injizieren */
const scoreEl = document.querySelector('.score');
if (scoreEl) injectQuickAnswerButton(scoreEl.parentElement);

remainingQuestions = [...verbsData];
shuffleArray(remainingQuestions);
loadQuestion();

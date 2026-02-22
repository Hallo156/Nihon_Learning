/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* verb.js — Verb-Trainer: Bedeutungs-Quiz (15 Verben, Satz → Bedeutung wählen).
   Zeigt vollständigen JP-Satz mit hervorgehobenem Verb; Nutzer wählt korrekte Bedeutung.
   Zwei Modi per Toggle: "Zufällig" und "Wiederholung" (Spaced Repetition 70/30).
   Braucht: common.js, i18n.js, quiz-engine.js */

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

/* ============ DOM ============ */

const questionArea = document.getElementById('questionArea');
let verbRomajiEl = null;

/* ============ SICHTBARKEITS-TOGGLE (nur Romaji) ============ */

const verbContainer = document.querySelector('.verb-trainer');

const visState = buildVisibilityToggles({
    container: verbContainer,
    insertAfter: document.querySelector('.verb-trainer .mode-toggle'),
    target: verbContainer,
    toggles: [
        { key: 'verb_romaji', i18nKey: 'vis.romaji', cssClass: 'hide-romaji', defaultOn: true }
    ]
});

/* Romaji-Hint-Element unterhalb des Satzes */
verbRomajiEl = document.createElement('div');
verbRomajiEl.className = 'verb-romaji-hint';
questionArea.insertAdjacentElement('afterend', verbRomajiEl);

/* ============ QUIZ-ENGINE ============ */

const engine = new QuizEngine({
    feedbackId:      'feedbackArea',
    nextButtonId:    'nextButton',
    choicesAreaId:   'choicesArea',
    modeRandomId:    'modeRandom',
    modeSemiId:      'modeSemiRandom',
    correctSpanId:   'correctCount',
    incorrectSpanId: 'incorrectCount',
    quickAnswerTarget: '.score',

    getPool: () => verbsData,

    renderQuestion: (v, eng) => {
        /* Vollständiger Satz — kein Highlight, Nutzer liest den ganzen Satz */
        questionArea.textContent = v.sentence_jp_filled;

        /* Romaji-Hint: (verb = romaji) */
        if (verbRomajiEl) verbRomajiEl.textContent = '(' + v.verb_masu + ' = ' + v.romaji + ')';

        /* 3 Bedeutungs-Choices in aktiver Sprache */
        let choices = [v];
        while (choices.length < 3) {
            const rand = verbsData[Math.floor(Math.random() * verbsData.length)];
            if (!choices.some(c => c.verb_masu === rand.verb_masu)) choices.push(rand);
        }
        shuffleArray(choices);

        eng.choicesArea.innerHTML = '';
        choices.forEach(verbObj => {
            const btn = document.createElement('button');
            btn.classList.add('choice-button');
            btn.textContent = getMeaning(verbObj);
            btn.addEventListener('click', () => {
                if (eng.answered) return;
                eng.choicesArea.querySelectorAll('.choice-button').forEach(b => { b.disabled = true; });
                eng.finishAnswer(verbObj.verb_masu === v.verb_masu);
            });
            eng.choicesArea.appendChild(btn);
        });
    },

    buildFeedback: (v, isCorrect) => {
        let html = '';
        if (isCorrect) {
            html += `<strong>${t('verb.correctMeaning', getMeaning(v))}</strong><br>`;
        } else {
            html += `<strong>${t('verb.wrong')}</strong><br>`;
            html += `${t('verb.correctAns', getMeaning(v))}<br>`;
        }
        html += `${t('verb.fullSentence')}: <strong>${v.sentence_jp_filled}</strong><br>`;
        html += `<em>${getSentenceFilled(v)}</em><br>`;
        html += `<span class="romaji">(${v.verb_masu} &mdash; ${v.romaji} &mdash; ${getMeaning(v)})</span>`;
        return html;
    }
});

/* ============ NACHSCHLAG-SIDEBAR ============ */

const verbReference = {
    verben: {
        title: 'ます-Form Verben',
        title_en: 'ます-Form Verbs',
        html: '<p>Die <strong>ます-Form</strong> ist die h&ouml;fliche Gegenwartsform japanischer Verben. Sie wird im Alltag und in formellen Situationen verwendet.</p>' +
            '<table class="ref-table"><thead><tr><th>Verb</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>いきます</td><td>ikimasu</td><td>gehen</td></tr>' +
            '<tr><td>かえります</td><td>kaerimasu</td><td>zur&uuml;ckkehren</td></tr>' +
            '<tr><td>かきます</td><td>kakimasu</td><td>schreiben</td></tr>' +
            '<tr><td>よみます</td><td>yomimasu</td><td>lesen</td></tr>' +
            '<tr><td>ききます</td><td>kikimasu</td><td>h&ouml;ren / fragen</td></tr>' +
            '<tr><td>みます</td><td>mimasu</td><td>sehen / schauen</td></tr>' +
            '<tr><td>たべます</td><td>tabemasu</td><td>essen</td></tr>' +
            '<tr><td>のみます</td><td>nomimasu</td><td>trinken</td></tr>' +
            '<tr><td>かいます</td><td>kaimasu</td><td>kaufen</td></tr>' +
            '<tr><td>つくります</td><td>tsukurimasu</td><td>machen / herstellen</td></tr>' +
            '<tr><td>はなします</td><td>hanashimasu</td><td>sprechen</td></tr>' +
            '<tr><td>します</td><td>shimasu</td><td>tun / machen</td></tr>' +
            '<tr><td>きます</td><td>kimasu</td><td>kommen</td></tr>' +
            '<tr><td>ねます</td><td>nemasu</td><td>schlafen</td></tr>' +
            '<tr><td>おきます</td><td>okimasu</td><td>aufstehen</td></tr>' +
            '</tbody></table>',
        html_en: '<p>The <strong>ます form</strong> is the polite present tense of Japanese verbs. It is used in everyday and formal situations.</p>' +
            '<table class="ref-table"><thead><tr><th>Verb</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>いきます</td><td>ikimasu</td><td>to go</td></tr>' +
            '<tr><td>かえります</td><td>kaerimasu</td><td>to return</td></tr>' +
            '<tr><td>かきます</td><td>kakimasu</td><td>to write</td></tr>' +
            '<tr><td>よみます</td><td>yomimasu</td><td>to read</td></tr>' +
            '<tr><td>ききます</td><td>kikimasu</td><td>to listen / to ask</td></tr>' +
            '<tr><td>みます</td><td>mimasu</td><td>to watch / to see</td></tr>' +
            '<tr><td>たべます</td><td>tabemasu</td><td>to eat</td></tr>' +
            '<tr><td>のみます</td><td>nomimasu</td><td>to drink</td></tr>' +
            '<tr><td>かいます</td><td>kaimasu</td><td>to buy</td></tr>' +
            '<tr><td>つくります</td><td>tsukurimasu</td><td>to make / to create</td></tr>' +
            '<tr><td>はなします</td><td>hanashimasu</td><td>to speak</td></tr>' +
            '<tr><td>します</td><td>shimasu</td><td>to do</td></tr>' +
            '<tr><td>きます</td><td>kimasu</td><td>to come</td></tr>' +
            '<tr><td>ねます</td><td>nemasu</td><td>to sleep</td></tr>' +
            '<tr><td>おきます</td><td>okimasu</td><td>to wake up</td></tr>' +
            '</tbody></table>'
    },
    partikel: {
        title: 'Wichtige Partikel mit Verben',
        title_en: 'Important Particles with Verbs',
        html: '<ul>' +
            '<li><strong>を (wo)</strong> — Objekt-Partikel: ほん<strong>を</strong>よみます (ein Buch lesen)</li>' +
            '<li><strong>に (ni)</strong> — Ziel / Zeitpunkt: がっこう<strong>に</strong>いきます (zur Schule gehen)</li>' +
            '<li><strong>へ (e)</strong> — Richtung: うち<strong>へ</strong>かえります (nach Hause zur&uuml;ckkehren)</li>' +
            '<li><strong>で (de)</strong> — Ort / Mittel: レストラン<strong>で</strong>たべます (im Restaurant essen)</li>' +
            '<li><strong>と (to)</strong> — Mit / zusammen: せんせい<strong>と</strong>はなします (mit dem Lehrer sprechen)</li>' +
            '<li><strong>が (ga)</strong> — Subjekt: ともだち<strong>が</strong>きます (ein Freund kommt)</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>を (wo)</strong> — Object particle: ほん<strong>を</strong>よみます (read a book)</li>' +
            '<li><strong>に (ni)</strong> — Target / Time: がっこう<strong>に</strong>いきます (go to school)</li>' +
            '<li><strong>へ (e)</strong> — Direction: うち<strong>へ</strong>かえります (return home)</li>' +
            '<li><strong>で (de)</strong> — Place / Means: レストラン<strong>で</strong>たべます (eat at a restaurant)</li>' +
            '<li><strong>と (to)</strong> — With / Together: せんせい<strong>と</strong>はなします (speak with the teacher)</li>' +
            '<li><strong>が (ga)</strong> — Subject: ともだち<strong>が</strong>きます (a friend comes)</li>' +
            '</ul>'
    }
};

buildReferenceSidebar({
    storageKey: 'sidebar_verb',
    buildContent: function (container) {
        ['verben', 'partikel'].forEach(function (key) {
            var ref = verbReference[key];
            var details = document.createElement('details');
            details.className = 'ref-block';
            details.innerHTML = '<summary>' + getLangField(ref, 'title', 'title_en') + '</summary>' +
                '<div class="ref-body">' + getLangField(ref, 'html', 'html_en') + '</div>';
            container.appendChild(details);
        });
    }
});

/* ============ INIT ============ */

engine.loadQuestion();

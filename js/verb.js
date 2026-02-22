/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* verb.js — Verb-Trainer: Bedeutungs- + Zeitform-Quiz (15 Verben, 4 Formen je).
   Zeigt vollständigen JP-Satz; Nutzer wählt Bedeutung + Zeitform aus 4 Choices.
   Filter für Gegenwart / Vergangenheit / Verneinung (Geg.+Vgh.).
   Braucht: common.js, i18n.js, quiz-engine.js */

/* ============ DATEN ============ */

const verbsData = [
    { verb_masu: 'いきます', romaji: 'ikimasu', meaning_de: 'gehen', meaning_en: 'to go',
      forms: {
        present:     { jp: 'わたし は がっこう へ いきます。',           de: 'Ich gehe zur Schule.',                    en: 'I go to school.',                      verb_jp: 'いきます',           verb_romaji: 'ikimasu' },
        past:        { jp: 'わたし は がっこう へ いきました。',         de: 'Ich ging zur Schule.',                    en: 'I went to school.',                    verb_jp: 'いきました',         verb_romaji: 'ikimashita' },
        neg_present: { jp: 'わたし は がっこう へ いきません。',         de: 'Ich gehe nicht zur Schule.',              en: 'I don\'t go to school.',               verb_jp: 'いきません',         verb_romaji: 'ikimasen' },
        neg_past:    { jp: 'わたし は がっこう へ いきませんでした。',   de: 'Ich ging nicht zur Schule.',              en: 'I didn\'t go to school.',              verb_jp: 'いきませんでした',   verb_romaji: 'ikimasen deshita' }
    }},
    { verb_masu: 'かえります', romaji: 'kaerimasu', meaning_de: 'zurückkehren', meaning_en: 'to return',
      forms: {
        present:     { jp: 'きょう は うち へ はやく かえります。',         de: 'Heute kehre ich früh nach Hause zurück.',    en: 'Today I return home early.',            verb_jp: 'かえります',         verb_romaji: 'kaerimasu' },
        past:        { jp: 'きのう は うち へ はやく かえりました。',       de: 'Gestern kehrte ich früh nach Hause zurück.', en: 'Yesterday I returned home early.',      verb_jp: 'かえりました',       verb_romaji: 'kaerimashita' },
        neg_present: { jp: 'きょう は うち へ はやく かえりません。',       de: 'Heute kehre ich nicht früh zurück.',         en: 'Today I don\'t return home early.',    verb_jp: 'かえりません',       verb_romaji: 'kaerimasen' },
        neg_past:    { jp: 'きのう は うち へ はやく かえりませんでした。', de: 'Gestern kehrte ich nicht früh zurück.',      en: 'Yesterday I didn\'t return home early.', verb_jp: 'かえりませんでした', verb_romaji: 'kaerimasen deshita' }
    }},
    { verb_masu: 'かきます', romaji: 'kakimasu', meaning_de: 'schreiben', meaning_en: 'to write',
      forms: {
        present:     { jp: 'ともだち に てがみ を かきます。',           de: 'Ich schreibe einen Brief an einen Freund.', en: 'I write a letter to a friend.',        verb_jp: 'かきます',           verb_romaji: 'kakimasu' },
        past:        { jp: 'ともだち に てがみ を かきました。',         de: 'Ich schrieb einen Brief an einen Freund.', en: 'I wrote a letter to a friend.',        verb_jp: 'かきました',         verb_romaji: 'kakimashita' },
        neg_present: { jp: 'ともだち に てがみ を かきません。',         de: 'Ich schreibe keinen Brief an einen Freund.', en: 'I don\'t write a letter to a friend.', verb_jp: 'かきません',         verb_romaji: 'kakimasen' },
        neg_past:    { jp: 'ともだち に てがみ を かきませんでした。',   de: 'Ich schrieb keinen Brief an einen Freund.', en: 'I didn\'t write a letter to a friend.', verb_jp: 'かきませんでした',   verb_romaji: 'kakimasen deshita' }
    }},
    { verb_masu: 'よみます', romaji: 'yomimasu', meaning_de: 'lesen', meaning_en: 'to read',
      forms: {
        present:     { jp: 'まいばん、ほん を よみます。',           de: 'Jeden Abend lese ich ein Buch.',       en: 'Every evening I read a book.',          verb_jp: 'よみます',           verb_romaji: 'yomimasu' },
        past:        { jp: 'きのう は ほん を よみました。',         de: 'Gestern las ich ein Buch.',            en: 'Yesterday I read a book.',              verb_jp: 'よみました',         verb_romaji: 'yomimashita' },
        neg_present: { jp: 'まいばん、ほん を よみません。',         de: 'Jeden Abend lese ich kein Buch.',      en: 'Every evening I don\'t read a book.',   verb_jp: 'よみません',         verb_romaji: 'yomimasen' },
        neg_past:    { jp: 'きのう は ほん を よみませんでした。',   de: 'Gestern las ich kein Buch.',           en: 'Yesterday I didn\'t read a book.',      verb_jp: 'よみませんでした',   verb_romaji: 'yomimasen deshita' }
    }},
    { verb_masu: 'ききます', romaji: 'kikimasu', meaning_de: 'hören / fragen', meaning_en: 'to listen / ask',
      forms: {
        present:     { jp: 'よく ラジオ を ききます。',           de: 'Ich höre oft Radio.',           en: 'I often listen to the radio.',         verb_jp: 'ききます',           verb_romaji: 'kikimasu' },
        past:        { jp: 'きのう は ラジオ を ききました。',     de: 'Gestern hörte ich Radio.',      en: 'Yesterday I listened to the radio.',   verb_jp: 'ききました',         verb_romaji: 'kikimashita' },
        neg_present: { jp: 'よく ラジオ を ききません。',         de: 'Ich höre nicht oft Radio.',     en: 'I don\'t often listen to the radio.',  verb_jp: 'ききません',         verb_romaji: 'kikimasen' },
        neg_past:    { jp: 'きのう は ラジオ を ききませんでした。', de: 'Gestern hörte ich kein Radio.', en: 'Yesterday I didn\'t listen to the radio.', verb_jp: 'ききませんでした', verb_romaji: 'kikimasen deshita' }
    }},
    { verb_masu: 'みます', romaji: 'mimasu', meaning_de: 'sehen / schauen', meaning_en: 'to watch / see',
      forms: {
        present:     { jp: 'しゅうまつ に えいが を みます。',             de: 'Am Wochenende schaue ich einen Film.',    en: 'On the weekend I watch a movie.',      verb_jp: 'みます',             verb_romaji: 'mimasu' },
        past:        { jp: 'せんしゅう、えいが を みました。',             de: 'Letzte Woche sah ich einen Film.',        en: 'Last week I watched a movie.',         verb_jp: 'みました',           verb_romaji: 'mimashita' },
        neg_present: { jp: 'しゅうまつ に えいが を みません。',           de: 'Am Wochenende schaue ich keinen Film.',  en: 'On the weekend I don\'t watch a movie.', verb_jp: 'みません',          verb_romaji: 'mimasen' },
        neg_past:    { jp: 'せんしゅう、えいが を みませんでした。',       de: 'Letzte Woche sah ich keinen Film.',      en: 'Last week I didn\'t watch a movie.',   verb_jp: 'みませんでした',     verb_romaji: 'mimasen deshita' }
    }},
    { verb_masu: 'たべます', romaji: 'tabemasu', meaning_de: 'essen', meaning_en: 'to eat',
      forms: {
        present:     { jp: 'レストラン で ばんごはん を たべます。',         de: 'Ich esse im Restaurant zu Abend.',       en: 'I eat dinner at a restaurant.',         verb_jp: 'たべます',           verb_romaji: 'tabemasu' },
        past:        { jp: 'レストラン で ばんごはん を たべました。',       de: 'Ich aß im Restaurant zu Abend.',         en: 'I ate dinner at a restaurant.',         verb_jp: 'たべました',         verb_romaji: 'tabemashita' },
        neg_present: { jp: 'レストラン で ばんごはん を たべません。',       de: 'Ich esse im Restaurant nicht zu Abend.', en: 'I don\'t eat dinner at a restaurant.',  verb_jp: 'たべません',         verb_romaji: 'tabemasen' },
        neg_past:    { jp: 'レストラン で ばんごはん を たべませんでした。', de: 'Ich aß im Restaurant nicht zu Abend.',   en: 'I didn\'t eat dinner at a restaurant.', verb_jp: 'たべませんでした',   verb_romaji: 'tabemasen deshita' }
    }},
    { verb_masu: 'のみます', romaji: 'nomimasu', meaning_de: 'trinken', meaning_en: 'to drink',
      forms: {
        present:     { jp: 'まいにち コーヒー を のみます。',           de: 'Jeden Tag trinke ich Kaffee.',        en: 'Every day I drink coffee.',           verb_jp: 'のみます',           verb_romaji: 'nomimasu' },
        past:        { jp: 'きのう は コーヒー を のみました。',         de: 'Gestern trank ich Kaffee.',           en: 'Yesterday I drank coffee.',           verb_jp: 'のみました',         verb_romaji: 'nomimashita' },
        neg_present: { jp: 'まいにち コーヒー を のみません。',         de: 'Jeden Tag trinke ich keinen Kaffee.', en: 'Every day I don\'t drink coffee.',   verb_jp: 'のみません',         verb_romaji: 'nomimasen' },
        neg_past:    { jp: 'きのう は コーヒー を のみませんでした。',   de: 'Gestern trank ich keinen Kaffee.',    en: 'Yesterday I didn\'t drink coffee.',   verb_jp: 'のみませんでした',   verb_romaji: 'nomimasen deshita' }
    }},
    { verb_masu: 'かいます', romaji: 'kaimasu', meaning_de: 'kaufen', meaning_en: 'to buy',
      forms: {
        present:     { jp: 'デパート で くつ を かいます。',           de: 'Ich kaufe Schuhe im Kaufhaus.',         en: 'I buy shoes at the department store.',      verb_jp: 'かいます',           verb_romaji: 'kaimasu' },
        past:        { jp: 'デパート で くつ を かいました。',         de: 'Ich kaufte Schuhe im Kaufhaus.',        en: 'I bought shoes at the department store.',   verb_jp: 'かいました',         verb_romaji: 'kaimashita' },
        neg_present: { jp: 'デパート で くつ を かいません。',         de: 'Ich kaufe keine Schuhe im Kaufhaus.',   en: 'I don\'t buy shoes at the department store.', verb_jp: 'かいません',       verb_romaji: 'kaimasen' },
        neg_past:    { jp: 'デパート で くつ を かいませんでした。',   de: 'Ich kaufte keine Schuhe im Kaufhaus.',  en: 'I didn\'t buy shoes at the department store.', verb_jp: 'かいませんでした', verb_romaji: 'kaimasen deshita' }
    }},
    { verb_masu: 'つくります', romaji: 'tsukurimasu', meaning_de: 'machen / herstellen', meaning_en: 'to make / create',
      forms: {
        present:     { jp: 'おかあさん が りょうり を つくります。',         de: 'Meine Mutter kocht.',          en: 'My mother cooks.',             verb_jp: 'つくります',         verb_romaji: 'tsukurimasu' },
        past:        { jp: 'おかあさん が りょうり を つくりました。',       de: 'Meine Mutter kochte.',         en: 'My mother cooked.',            verb_jp: 'つくりました',       verb_romaji: 'tsukurimashita' },
        neg_present: { jp: 'おかあさん が りょうり を つくりません。',       de: 'Meine Mutter kocht nicht.',    en: 'My mother doesn\'t cook.',     verb_jp: 'つくりません',       verb_romaji: 'tsukurimasen' },
        neg_past:    { jp: 'おかあさん が りょうり を つくりませんでした。', de: 'Meine Mutter kochte nicht.',   en: 'My mother didn\'t cook.',      verb_jp: 'つくりませんでした', verb_romaji: 'tsukurimasen deshita' }
    }},
    { verb_masu: 'はなします', romaji: 'hanashimasu', meaning_de: 'sprechen', meaning_en: 'to speak',
      forms: {
        present:     { jp: 'せんせい と にほんご で はなします。',         de: 'Ich spreche mit dem Lehrer auf Japanisch.',     en: 'I speak with the teacher in Japanese.',       verb_jp: 'はなします',         verb_romaji: 'hanashimasu' },
        past:        { jp: 'せんせい と にほんご で はなしました。',       de: 'Ich sprach mit dem Lehrer auf Japanisch.',      en: 'I spoke with the teacher in Japanese.',       verb_jp: 'はなしました',       verb_romaji: 'hanashimashita' },
        neg_present: { jp: 'せんせい と にほんご で はなしません。',       de: 'Ich spreche nicht mit dem Lehrer auf Japanisch.', en: 'I don\'t speak with the teacher in Japanese.', verb_jp: 'はなしません',     verb_romaji: 'hanashimasen' },
        neg_past:    { jp: 'せんせい と にほんご で はなしませんでした。', de: 'Ich sprach nicht mit dem Lehrer auf Japanisch.', en: 'I didn\'t speak with the teacher in Japanese.', verb_jp: 'はなしませんでした', verb_romaji: 'hanashimasen deshita' }
    }},
    { verb_masu: 'します', romaji: 'shimasu', meaning_de: 'tun / machen', meaning_en: 'to do',
      forms: {
        present:     { jp: 'どようび に スポーツ を します。',           de: 'Am Samstag treibe ich Sport.',        en: 'On Saturday I do sports.',         verb_jp: 'します',             verb_romaji: 'shimasu' },
        past:        { jp: 'どようび に スポーツ を しました。',         de: 'Am Samstag trieb ich Sport.',         en: 'On Saturday I did sports.',        verb_jp: 'しました',           verb_romaji: 'shimashita' },
        neg_present: { jp: 'どようび に スポーツ を しません。',         de: 'Am Samstag treibe ich keinen Sport.', en: 'On Saturday I don\'t do sports.',  verb_jp: 'しません',           verb_romaji: 'shimasen' },
        neg_past:    { jp: 'どようび に スポーツ を しませんでした。',   de: 'Am Samstag trieb ich keinen Sport.',  en: 'On Saturday I didn\'t do sports.', verb_jp: 'しませんでした',     verb_romaji: 'shimasen deshita' }
    }},
    { verb_masu: 'きます', romaji: 'kimasu', meaning_de: 'kommen', meaning_en: 'to come',
      forms: {
        present:     { jp: 'あした、ともだち が きます。',           de: 'Morgen kommt ein Freund.',        en: 'Tomorrow a friend is coming.',     verb_jp: 'きます',             verb_romaji: 'kimasu' },
        past:        { jp: 'きのう、ともだち が きました。',         de: 'Gestern kam ein Freund.',          en: 'Yesterday a friend came.',         verb_jp: 'きました',           verb_romaji: 'kimashita' },
        neg_present: { jp: 'あした、ともだち が きません。',         de: 'Morgen kommt kein Freund.',        en: 'Tomorrow a friend isn\'t coming.', verb_jp: 'きません',           verb_romaji: 'kimasen' },
        neg_past:    { jp: 'きのう、ともだち が きませんでした。',   de: 'Gestern kam kein Freund.',         en: 'Yesterday a friend didn\'t come.', verb_jp: 'きませんでした',     verb_romaji: 'kimasen deshita' }
    }},
    { verb_masu: 'ねます', romaji: 'nemasu', meaning_de: 'schlafen', meaning_en: 'to sleep',
      forms: {
        present:     { jp: 'まいばん じゅうじ に ねます。',           de: 'Jeden Abend schlafe ich um 10 Uhr.',               en: 'Every evening I go to sleep at 10.',     verb_jp: 'ねます',             verb_romaji: 'nemasu' },
        past:        { jp: 'きのう は じゅうじ に ねました。',         de: 'Gestern bin ich um 10 Uhr schlafen gegangen.',     en: 'Yesterday I went to sleep at 10.',      verb_jp: 'ねました',           verb_romaji: 'nemashita' },
        neg_present: { jp: 'まいばん じゅうじ に ねません。',         de: 'Jeden Abend schlafe ich nicht um 10 Uhr.',         en: 'Every evening I don\'t go to sleep at 10.', verb_jp: 'ねません',        verb_romaji: 'nemasen' },
        neg_past:    { jp: 'きのう は じゅうじ に ねませんでした。',   de: 'Gestern bin ich nicht um 10 Uhr schlafen gegangen.', en: 'Yesterday I didn\'t go to sleep at 10.', verb_jp: 'ねませんでした',   verb_romaji: 'nemasen deshita' }
    }},
    { verb_masu: 'おきます', romaji: 'okimasu', meaning_de: 'aufstehen', meaning_en: 'to wake up',
      forms: {
        present:     { jp: 'まいあさ ろくじ に おきます。',           de: 'Jeden Morgen stehe ich um 6 Uhr auf.',              en: 'Every morning I wake up at 6.',     verb_jp: 'おきます',           verb_romaji: 'okimasu' },
        past:        { jp: 'けさ、ろくじ に おきました。',             de: 'Heute Morgen bin ich um 6 Uhr aufgestanden.',      en: 'This morning I woke up at 6.',      verb_jp: 'おきました',         verb_romaji: 'okimashita' },
        neg_present: { jp: 'まいあさ ろくじ に おきません。',         de: 'Jeden Morgen stehe ich nicht um 6 Uhr auf.',       en: 'Every morning I don\'t wake up at 6.', verb_jp: 'おきません',       verb_romaji: 'okimasen' },
        neg_past:    { jp: 'けさ、ろくじ に おきませんでした。',       de: 'Heute Morgen bin ich nicht um 6 Uhr aufgestanden.', en: 'This morning I didn\'t wake up at 6.', verb_jp: 'おきませんでした', verb_romaji: 'okimasen deshita' }
    }}
];

/* ============ FILTER-STATE ============ */

let activeVerbFormFilters = { present: true, past: true, negation: true };

function buildVerbPool() {
    const keys = [];
    if (activeVerbFormFilters.present)  keys.push('present');
    if (activeVerbFormFilters.past)     keys.push('past');
    if (activeVerbFormFilters.negation) { keys.push('neg_present'); keys.push('neg_past'); }
    const items = [];
    verbsData.forEach(v => {
        keys.forEach(fk => {
            const f = v.forms[fk];
            items.push({ base: v, formKey: fk, sentence_jp: f.jp, sentence_de: f.de, sentence_en: f.en,
                         verb_jp: f.verb_jp, verb_romaji: f.verb_romaji });
        });
    });
    return items;
}

function getFormLabel(formKey) {
    switch (formKey) {
        case 'present':     return t('form.present');
        case 'past':        return t('form.past');
        case 'neg_present': return t('form.negPresent');
        case 'neg_past':    return t('form.negPast');
        default:            return formKey;
    }
}

function getVerbMeaning(v) { return currentLang === 'en' ? v.meaning_en : v.meaning_de; }
function getItemSentence(item) { return currentLang === 'en' ? item.sentence_en : item.sentence_de; }

/* ============ DOM ============ */

const questionArea = document.getElementById('questionArea');
let verbRomajiEl = null;

/* ============ SICHTBARKEITS-TOGGLE ============ */

const verbContainer = document.querySelector('.verb-trainer');

const visState = buildVisibilityToggles({
    container: verbContainer,
    insertAfter: document.querySelector('.verb-trainer .mode-toggle'),
    target: verbContainer,
    toggles: [
        { key: 'verb_romaji', i18nKey: 'vis.romaji', cssClass: 'hide-romaji', defaultOn: true }
    ]
});

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

    getPool: () => buildVerbPool(),

    renderQuestion: (item, eng) => {
        questionArea.textContent = item.sentence_jp;
        if (verbRomajiEl) verbRomajiEl.textContent = '(' + item.verb_jp + ' = ' + item.verb_romaji + ')';

        /* Distractors: 3 items from active pool, distinct (base+form) from current */
        const pool = buildVerbPool();
        const others = pool.filter(x => !(x.base.verb_masu === item.base.verb_masu && x.formKey === item.formKey));
        shuffleArray(others);

        /* Try to include: 1 same-verb-diff-form, 1 diff-verb-same-form, 1 random */
        const distractors = [];
        const sameVerbDiff = others.find(x => x.base.verb_masu === item.base.verb_masu);
        if (sameVerbDiff) distractors.push(sameVerbDiff);
        const diffVerbSame = others.find(x => x.base.verb_masu !== item.base.verb_masu && x.formKey === item.formKey && !distractors.includes(x));
        if (diffVerbSame) distractors.push(diffVerbSame);
        for (const x of others) {
            if (distractors.length >= 3) break;
            if (!distractors.includes(x)) distractors.push(x);
        }

        const choices = [item, ...distractors.slice(0, 3)];
        shuffleArray(choices);

        eng.choicesArea.innerHTML = '';
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.classList.add('choice-button');
            btn.innerHTML = '<span class="choice-meaning">' + getVerbMeaning(choice.base) + '</span>' +
                            '<span class="choice-form">' + getFormLabel(choice.formKey) + '</span>';
            btn.addEventListener('click', () => {
                if (eng.answered) return;
                eng.choicesArea.querySelectorAll('.choice-button').forEach(b => { b.disabled = true; });
                eng.finishAnswer(choice.base.verb_masu === item.base.verb_masu && choice.formKey === item.formKey);
            });
            eng.choicesArea.appendChild(btn);
        });
    },

    buildFeedback: (item, isCorrect) => {
        const meaning = getVerbMeaning(item.base);
        const formLabel = getFormLabel(item.formKey);
        const choiceLabel = meaning + ' – ' + formLabel;
        let html = '';
        if (isCorrect) {
            html += `<strong>${t('verb.correctMeaning', choiceLabel)}</strong><br>`;
        } else {
            html += `<strong>${t('verb.wrong')}</strong><br>`;
            html += `${t('verb.correctAns', choiceLabel)}<br>`;
        }
        html += `${t('verb.fullSentence')}: <strong>${item.sentence_jp}</strong><br>`;
        html += `<em>${getItemSentence(item)}</em><br>`;
        html += `<span class="romaji">(${item.verb_jp} &mdash; ${item.verb_romaji} &mdash; ${meaning})</span>`;
        return html;
    },

    onLangChange: () => { /* choice buttons rebuild on next loadQuestion */ }
});

/* ============ FORM-FILTER ============ */

document.getElementById('applyFormFilter').addEventListener('click', () => {
    activeVerbFormFilters.present  = document.getElementById('filterPresent').checked;
    activeVerbFormFilters.past     = document.getElementById('filterPast').checked;
    activeVerbFormFilters.negation = document.getElementById('filterNeg').checked;
    if (!activeVerbFormFilters.present && !activeVerbFormFilters.past && !activeVerbFormFilters.negation) {
        document.getElementById('filterPresent').checked = true;
        activeVerbFormFilters.present = true;
    }
    engine.resetQuiz();
});

/* ============ NACHSCHLAG-SIDEBAR ============ */

const verbReference = {
    zeitformen: {
        title:    'Verb-Zeitformen (ます-Form)',
        title_en: 'Verb Tenses (ます Form)',
        html: '<table class="ref-table"><thead><tr><th>Form</th><th>Endung</th><th>Beispiel (いきます)</th></tr></thead><tbody>' +
              '<tr><td><strong>Gegenwart (+)</strong></td><td>〜ます</td><td>いきます</td></tr>' +
              '<tr><td><strong>Vergangenheit (+)</strong></td><td>〜ました</td><td>いきました</td></tr>' +
              '<tr><td><strong>Verneinung Geg. (−)</strong></td><td>〜ません</td><td>いきません</td></tr>' +
              '<tr><td><strong>Verneinung Vgh. (−)</strong></td><td>〜ませんでした</td><td>いきませんでした</td></tr>' +
              '</tbody></table>',
        html_en: '<table class="ref-table"><thead><tr><th>Form</th><th>Ending</th><th>Example (いきます)</th></tr></thead><tbody>' +
              '<tr><td><strong>Present (+)</strong></td><td>〜ます</td><td>いきます</td></tr>' +
              '<tr><td><strong>Past (+)</strong></td><td>〜ました</td><td>いきました</td></tr>' +
              '<tr><td><strong>Negative Pres. (−)</strong></td><td>〜ません</td><td>いきません</td></tr>' +
              '<tr><td><strong>Negative Past (−)</strong></td><td>〜ませんでした</td><td>いきませんでした</td></tr>' +
              '</tbody></table>'
    },
    verben: {
        title:    'ます-Form Verben',
        title_en: 'ます-Form Verbs',
        html: '<table class="ref-table"><thead><tr><th>Verb</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
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
        html_en: '<table class="ref-table"><thead><tr><th>Verb</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
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
        title:    'Wichtige Partikel mit Verben',
        title_en: 'Important Particles with Verbs',
        html: '<ul>' +
              '<li><strong>を (wo)</strong> — Objekt: ほん<strong>を</strong>よみます</li>' +
              '<li><strong>に (ni)</strong> — Ziel / Zeitpunkt: がっこう<strong>に</strong>いきます</li>' +
              '<li><strong>へ (e)</strong> — Richtung: うち<strong>へ</strong>かえります</li>' +
              '<li><strong>で (de)</strong> — Ort / Mittel: レストラン<strong>で</strong>たべます</li>' +
              '<li><strong>と (to)</strong> — Mit / zusammen: せんせい<strong>と</strong>はなします</li>' +
              '<li><strong>が (ga)</strong> — Subjekt: ともだち<strong>が</strong>きます</li>' +
              '</ul>',
        html_en: '<ul>' +
              '<li><strong>を (wo)</strong> — Object: ほん<strong>を</strong>よみます (read a book)</li>' +
              '<li><strong>に (ni)</strong> — Target / Time: がっこう<strong>に</strong>いきます (go to school)</li>' +
              '<li><strong>へ (e)</strong> — Direction: うち<strong>へ</strong>かえります (return home)</li>' +
              '<li><strong>で (de)</strong> — Place / Means: レストラン<strong>で</strong>たべます (eat at a restaurant)</li>' +
              '<li><strong>と (to)</strong> — With: せんせい<strong>と</strong>はなします (speak with the teacher)</li>' +
              '<li><strong>が (ga)</strong> — Subject: ともだち<strong>が</strong>きます (a friend comes)</li>' +
              '</ul>'
    }
};

buildReferenceSidebar({
    storageKey: 'sidebar_verb',
    buildContent: function (container) {
        ['zeitformen', 'verben', 'partikel'].forEach(function (key) {
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

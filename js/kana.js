/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* kana.js — Kana-Trainer: Zeigt Hiragana/Katakana, Nutzer tippt Romaji.
   6 Kategorien per Checkbox-Filter waehlbar. Akzeptiert Romaji-Varianten (si/shi etc.).
   Braucht: common.js, i18n.js */

/* ============ DATEN (6 Kategorien, ~230 Zeichen) ============ */

const kanaData = {
    hiraganaBasic: [
        { kana: 'あ', romaji: 'a' }, { kana: 'い', romaji: 'i' }, { kana: 'う', romaji: 'u' }, { kana: 'え', romaji: 'e' }, { kana: 'お', romaji: 'o' },
        { kana: 'か', romaji: 'ka' }, { kana: 'き', romaji: 'ki' }, { kana: 'く', romaji: 'ku' }, { kana: 'け', romaji: 'ke' }, { kana: 'こ', romaji: 'ko' },
        { kana: 'さ', romaji: 'sa' }, { kana: 'し', romaji: 'shi' }, { kana: 'す', romaji: 'su' }, { kana: 'せ', romaji: 'se' }, { kana: 'そ', romaji: 'so' },
        { kana: 'た', romaji: 'ta' }, { kana: 'ち', romaji: 'chi' }, { kana: 'つ', romaji: 'tsu' }, { kana: 'て', romaji: 'te' }, { kana: 'と', romaji: 'to' },
        { kana: 'な', romaji: 'na' }, { kana: 'に', romaji: 'ni' }, { kana: 'ぬ', romaji: 'nu' }, { kana: 'ね', romaji: 'ne' }, { kana: 'の', romaji: 'no' },
        { kana: 'は', romaji: 'ha' }, { kana: 'ひ', romaji: 'hi' }, { kana: 'ふ', romaji: 'fu' }, { kana: 'へ', romaji: 'he' }, { kana: 'ほ', romaji: 'ho' },
        { kana: 'ま', romaji: 'ma' }, { kana: 'み', romaji: 'mi' }, { kana: 'む', romaji: 'mu' }, { kana: 'め', romaji: 'me' }, { kana: 'も', romaji: 'mo' },
        { kana: 'や', romaji: 'ya' }, { kana: 'ゆ', romaji: 'yu' }, { kana: 'よ', romaji: 'yo' },
        { kana: 'ら', romaji: 'ra' }, { kana: 'り', romaji: 'ri' }, { kana: 'る', romaji: 'ru' }, { kana: 'れ', romaji: 're' }, { kana: 'ろ', romaji: 'ro' },
        { kana: 'わ', romaji: 'wa' }, { kana: 'を', romaji: 'wo' }, { kana: 'ん', romaji: 'n' }
    ],
    katakanaBasic: [
        { kana: 'ア', romaji: 'a' }, { kana: 'イ', romaji: 'i' }, { kana: 'ウ', romaji: 'u' }, { kana: 'エ', romaji: 'e' }, { kana: 'オ', romaji: 'o' },
        { kana: 'カ', romaji: 'ka' }, { kana: 'キ', romaji: 'ki' }, { kana: 'ク', romaji: 'ku' }, { kana: 'ケ', romaji: 'ke' }, { kana: 'コ', romaji: 'ko' },
        { kana: 'サ', romaji: 'sa' }, { kana: 'シ', romaji: 'shi' }, { kana: 'ス', romaji: 'su' }, { kana: 'セ', romaji: 'se' }, { kana: 'ソ', romaji: 'so' },
        { kana: 'タ', romaji: 'ta' }, { kana: 'チ', romaji: 'chi' }, { kana: 'ツ', romaji: 'tsu' }, { kana: 'テ', romaji: 'te' }, { kana: 'ト', romaji: 'to' },
        { kana: 'ナ', romaji: 'na' }, { kana: 'ニ', romaji: 'ni' }, { kana: 'ヌ', romaji: 'nu' }, { kana: 'ネ', romaji: 'ne' }, { kana: 'ノ', romaji: 'no' },
        { kana: 'ハ', romaji: 'ha' }, { kana: 'ヒ', romaji: 'hi' }, { kana: 'フ', romaji: 'fu' }, { kana: 'ヘ', romaji: 'he' }, { kana: 'ホ', romaji: 'ho' },
        { kana: 'マ', romaji: 'ma' }, { kana: 'ミ', romaji: 'mi' }, { kana: 'ム', romaji: 'mu' }, { kana: 'メ', romaji: 'me' }, { kana: 'モ', romaji: 'mo' },
        { kana: 'ヤ', romaji: 'ya' }, { kana: 'ユ', romaji: 'yu' }, { kana: 'ヨ', romaji: 'yo' },
        { kana: 'ラ', romaji: 'ra' }, { kana: 'リ', romaji: 'ri' }, { kana: 'ル', romaji: 'ru' }, { kana: 'レ', romaji: 're' }, { kana: 'ロ', romaji: 'ro' },
        { kana: 'ワ', romaji: 'wa' }, { kana: 'ヲ', romaji: 'wo' }, { kana: 'ン', romaji: 'n' }
    ],
    hiraganaDakuten: [
        { kana: 'が', romaji: 'ga' }, { kana: 'ぎ', romaji: 'gi' }, { kana: 'ぐ', romaji: 'gu' }, { kana: 'げ', romaji: 'ge' }, { kana: 'ご', romaji: 'go' },
        { kana: 'ざ', romaji: 'za' }, { kana: 'じ', romaji: 'ji' }, { kana: 'ず', romaji: 'zu' }, { kana: 'ぜ', romaji: 'ze' }, { kana: 'ぞ', romaji: 'zo' },
        { kana: 'だ', romaji: 'da' }, { kana: 'ぢ', romaji: 'ji' }, { kana: 'づ', romaji: 'zu' }, { kana: 'で', romaji: 'de' }, { kana: 'ど', romaji: 'do' },
        { kana: 'ば', romaji: 'ba' }, { kana: 'び', romaji: 'bi' }, { kana: 'ぶ', romaji: 'bu' }, { kana: 'べ', romaji: 'be' }, { kana: 'ぼ', romaji: 'bo' },
        { kana: 'ぱ', romaji: 'pa' }, { kana: 'ぴ', romaji: 'pi' }, { kana: 'ぷ', romaji: 'pu' }, { kana: 'ぺ', romaji: 'pe' }, { kana: 'ぽ', romaji: 'po' }
    ],
    katakanaDakuten: [
        { kana: 'ガ', romaji: 'ga' }, { kana: 'ギ', romaji: 'gi' }, { kana: 'グ', romaji: 'gu' }, { kana: 'ゲ', romaji: 'ge' }, { kana: 'ゴ', romaji: 'go' },
        { kana: 'ザ', romaji: 'za' }, { kana: 'ジ', romaji: 'ji' }, { kana: 'ズ', romaji: 'zu' }, { kana: 'ゼ', romaji: 'ze' }, { kana: 'ゾ', romaji: 'zo' },
        { kana: 'ダ', romaji: 'da' }, { kana: 'ヂ', romaji: 'ji' }, { kana: 'ヅ', romaji: 'zu' }, { kana: 'デ', romaji: 'de' }, { kana: 'ド', romaji: 'do' },
        { kana: 'バ', romaji: 'ba' }, { kana: 'ビ', romaji: 'bi' }, { kana: 'ブ', romaji: 'bu' }, { kana: 'ベ', romaji: 'be' }, { kana: 'ボ', romaji: 'bo' },
        { kana: 'パ', romaji: 'pa' }, { kana: 'ピ', romaji: 'pi' }, { kana: 'プ', romaji: 'pu' }, { kana: 'ペ', romaji: 'pe' }, { kana: 'ポ', romaji: 'po' }
    ],
    hiraganaYoon: [
        { kana: 'きゃ', romaji: 'kya' }, { kana: 'きゅ', romaji: 'kyu' }, { kana: 'きょ', romaji: 'kyo' },
        { kana: 'しゃ', romaji: 'sha' }, { kana: 'しゅ', romaji: 'shu' }, { kana: 'しょ', romaji: 'sho' },
        { kana: 'ちゃ', romaji: 'cha' }, { kana: 'ちゅ', romaji: 'chu' }, { kana: 'ちょ', romaji: 'cho' },
        { kana: 'にゃ', romaji: 'nya' }, { kana: 'にゅ', romaji: 'nyu' }, { kana: 'にょ', romaji: 'nyo' },
        { kana: 'ひゃ', romaji: 'hya' }, { kana: 'ひゅ', romaji: 'hyu' }, { kana: 'ひょ', romaji: 'hyo' },
        { kana: 'みゃ', romaji: 'mya' }, { kana: 'みゅ', romaji: 'myu' }, { kana: 'みょ', romaji: 'myo' },
        { kana: 'りゃ', romaji: 'rya' }, { kana: 'りゅ', romaji: 'ryu' }, { kana: 'りょ', romaji: 'ryo' },
        { kana: 'ぎゃ', romaji: 'gya' }, { kana: 'ぎゅ', romaji: 'gyu' }, { kana: 'ぎょ', romaji: 'gyo' },
        { kana: 'じゃ', romaji: 'ja' }, { kana: 'じゅ', romaji: 'ju' }, { kana: 'じょ', romaji: 'jo' },
        { kana: 'ぢゃ', romaji: 'ja' }, { kana: 'ぢゅ', romaji: 'ju' }, { kana: 'ぢょ', romaji: 'jo' },
        { kana: 'びゃ', romaji: 'bya' }, { kana: 'びゅ', romaji: 'byu' }, { kana: 'びょ', romaji: 'byo' },
        { kana: 'ぴゃ', romaji: 'pya' }, { kana: 'ぴゅ', romaji: 'pyu' }, { kana: 'ぴょ', romaji: 'pyo' }
    ],
    katakanaYoon: [
        { kana: 'キャ', romaji: 'kya' }, { kana: 'キュ', romaji: 'kyu' }, { kana: 'キョ', romaji: 'kyo' },
        { kana: 'シャ', romaji: 'sha' }, { kana: 'シュ', romaji: 'shu' }, { kana: 'ショ', romaji: 'sho' },
        { kana: 'チャ', romaji: 'cha' }, { kana: 'チュ', romaji: 'chu' }, { kana: 'チョ', romaji: 'cho' },
        { kana: 'ニャ', romaji: 'nya' }, { kana: 'ニュ', romaji: 'nyu' }, { kana: 'ニョ', romaji: 'nyo' },
        { kana: 'ヒャ', romaji: 'hya' }, { kana: 'ヒュ', romaji: 'hyu' }, { kana: 'ヒョ', romaji: 'hyo' },
        { kana: 'ミャ', romaji: 'mya' }, { kana: 'ミュ', romaji: 'myu' }, { kana: 'ミョ', romaji: 'myo' },
        { kana: 'リャ', romaji: 'rya' }, { kana: 'リュ', romaji: 'ryu' }, { kana: 'リョ', romaji: 'ryo' },
        { kana: 'ギャ', romaji: 'gya' }, { kana: 'ギュ', romaji: 'gyu' }, { kana: 'ギョ', romaji: 'gyo' },
        { kana: 'ジャ', romaji: 'ja' }, { kana: 'ジュ', romaji: 'ju' }, { kana: 'ジョ', romaji: 'jo' },
        { kana: 'ヂャ', romaji: 'ja' }, { kana: 'ヂュ', romaji: 'ju' }, { kana: 'ヂョ', romaji: 'jo' },
        { kana: 'ビャ', romaji: 'bya' }, { kana: 'ビュ', romaji: 'byu' }, { kana: 'ビョ', romaji: 'byo' },
        { kana: 'ピャ', romaji: 'pya' }, { kana: 'ピュ', romaji: 'pyu' }, { kana: 'ピョ', romaji: 'pyo' }
    ]
};

/* ============ STATE ============ */

let currentKana = null;
let activeKanaList = [];
const score = new ScoreTracker('correctCount', 'incorrectCount');

/* ============ DOM ============ */

const kanaDisplay = document.getElementById('kanaDisplay');
const romajiInput = document.getElementById('romajiInput');
const checkButton = document.getElementById('checkButton');
const nextButton = document.getElementById('nextButton');
const feedbackArea = document.getElementById('feedbackArea');
const statsDisplay = document.getElementById('statsDisplay');

const hiraganaBasicCheckbox = document.getElementById('hiraganaBasic');
const katakanaBasicCheckbox = document.getElementById('katakanaBasic');
const hiraganaDakutenCheckbox = document.getElementById('hiraganaDakuten');
const katakanaDakutenCheckbox = document.getElementById('katakanaDakuten');
const hiraganaYoonCheckbox = document.getElementById('hiraganaYoon');
const katakanaYoonCheckbox = document.getElementById('katakanaYoon');
const applyFiltersButton = document.getElementById('applyFiltersButton');

/* ============ FILTER-LOGIK ============ */

function updateActiveKanaList() {
    activeKanaList = [];
    if (hiraganaBasicCheckbox.checked) activeKanaList.push(...kanaData.hiraganaBasic);
    if (katakanaBasicCheckbox.checked) activeKanaList.push(...kanaData.katakanaBasic);
    if (hiraganaDakutenCheckbox.checked) activeKanaList.push(...kanaData.hiraganaDakuten);
    if (katakanaDakutenCheckbox.checked) activeKanaList.push(...kanaData.katakanaDakuten);
    if (hiraganaYoonCheckbox.checked) activeKanaList.push(...kanaData.hiraganaYoon);
    if (katakanaYoonCheckbox.checked) activeKanaList.push(...kanaData.katakanaYoon);

    statsDisplay.textContent = t('kana.stats', activeKanaList.length);

    if (activeKanaList.length === 0) {
        kanaDisplay.textContent = t('kana.noSelection');
        currentKana = null;
        return false;
    }
    return true;
}

/* ============ NAECHSTES ZEICHEN ============ */

function loadNextKana() {
    if (!updateActiveKanaList()) return;

    currentKana = activeKanaList[Math.floor(Math.random() * activeKanaList.length)];
    kanaDisplay.textContent = currentKana ? currentKana.kana : '-';

    romajiInput.value = '';
    feedbackArea.textContent = '';
    feedbackArea.className = 'feedback';
    romajiInput.focus();
}

/* ============ ANTWORT PRUEFEN (mit Romaji-Varianten) ============ */

function checkAnswer() {
    if (!currentKana) {
        feedbackArea.textContent = t('kana.noFilter');
        feedbackArea.className = 'feedback incorrect';
        return;
    }

    const userAnswer = romajiInput.value.trim().toLowerCase();
    let acceptedAnswers = [currentKana.romaji.toLowerCase()];

    // Kunrei-shiki Varianten: し=si, ち=ti, つ=tu, ふ=hu, じ/ぢ=di, ず/づ=du
    if (currentKana.kana === 'し' || currentKana.kana === 'シ') acceptedAnswers.push('si');
    else if (currentKana.kana === 'ち' || currentKana.kana === 'チ') acceptedAnswers.push('ti');
    else if (currentKana.kana === 'つ' || currentKana.kana === 'ツ') acceptedAnswers.push('tu');
    else if (currentKana.kana === 'ふ' || currentKana.kana === 'フ') acceptedAnswers.push('hu');
    else if (currentKana.kana === 'じ' || currentKana.kana === 'ジ' || currentKana.kana === 'ぢ' || currentKana.kana === 'ヂ') acceptedAnswers.push('di');
    else if (currentKana.kana === 'ず' || currentKana.kana === 'ズ' || currentKana.kana === 'づ' || currentKana.kana === 'ヅ') acceptedAnswers.push('du');

    // Yoon-Varianten: sh→sy, ch→ty, j→zy/jy
    if (currentKana.romaji.includes('sh')) acceptedAnswers.push(currentKana.romaji.replace('sh', 'sy'));
    if (currentKana.romaji.includes('ch')) acceptedAnswers.push(currentKana.romaji.replace('ch', 'ty'));
    if (currentKana.romaji.startsWith('j') && currentKana.romaji.length > 1 && currentKana.romaji !== 'ji') {
        acceptedAnswers.push(currentKana.romaji.replace('j', 'zy'));
        acceptedAnswers.push(currentKana.romaji.replace('j', 'jy'));
    }

    if (acceptedAnswers.includes(userAnswer)) {
        feedbackArea.textContent = t('feedback.correct');
        feedbackArea.className = 'feedback correct';
        score.addCorrect();
        setTimeout(loadNextKana, isQuickAnswer() ? 400 : 800);
    } else {
        feedbackArea.textContent = t('kana.wrong', currentKana.romaji);
        feedbackArea.className = 'feedback incorrect';
        score.addIncorrect();
    }
}

/* ============ LANGCHANGE ============ */

document.addEventListener('langchange', () => {
    updateActiveKanaList();
});

/* ============ INIT ============ */

checkButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', loadNextKana);
applyFiltersButton.addEventListener('click', function () {
    score.reset();
    loadNextKana();
});
romajiInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') checkAnswer();
});

/* Quick Answer Button injizieren */
const scoreEl = document.querySelector('.score');
if (scoreEl) injectQuickAnswerButton(scoreEl.parentElement);

loadNextKana();

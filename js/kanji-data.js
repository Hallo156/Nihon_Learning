/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* kanji-data.js — Kanji-Daten nach Stufen (A1-B2).
   Wird von kanji.js genutzt. Braucht: nichts (reine Daten). */

/* Datenstruktur pro Eintrag:
   kanji           — das Kanji-Zeichen
   meaning_de      — Array: erstes = Hauptbedeutung (Anzeige), alle werden akzeptiert
   meaning_en      — Array: erstes = Hauptbedeutung (EN), alle werden akzeptiert
   on              — On'yomi (Anzeige im Feedback)
   kun             — Kun'yomi (Anzeige im Feedback)
   romaji          — primaere Lesung (akzeptiert bei Eingabe)
   romaji_variants — weitere akzeptierte Lesungen
   level           — 'A1' | 'A2' | 'B1' | 'B2' */

const kanjiData = [

    /* ============ A1 — Zahlen ============ */

    { kanji: '一', meaning_de: ['eins', '1'], meaning_en: ['one', '1'], on: 'イチ', kun: 'ひと(つ)', romaji: 'ichi', romaji_variants: ['hitotsu'], level: 'A1' },
    { kanji: '二', meaning_de: ['zwei', '2'], meaning_en: ['two', '2'], on: 'ニ', kun: 'ふた(つ)', romaji: 'ni', romaji_variants: ['futatsu'], level: 'A1' },
    { kanji: '三', meaning_de: ['drei', '3'], meaning_en: ['three', '3'], on: 'サン', kun: 'みっ(つ)', romaji: 'san', romaji_variants: ['mittsu'], level: 'A1' },
    { kanji: '四', meaning_de: ['vier', '4'], meaning_en: ['four', '4'], on: 'シ', kun: 'よ(つ)', romaji: 'shi', romaji_variants: ['yon', 'yottsu', 'si'], level: 'A1' },
    { kanji: '五', meaning_de: ['fünf', '5', 'fuenf'], meaning_en: ['five', '5'], on: 'ゴ', kun: 'いつ(つ)', romaji: 'go', romaji_variants: ['itsutsu'], level: 'A1' },
    { kanji: '六', meaning_de: ['sechs', '6'], meaning_en: ['six', '6'], on: 'ロク', kun: 'むっ(つ)', romaji: 'roku', romaji_variants: ['muttsu'], level: 'A1' },
    { kanji: '七', meaning_de: ['sieben', '7'], meaning_en: ['seven', '7'], on: 'シチ', kun: 'なな(つ)', romaji: 'shichi', romaji_variants: ['nana', 'nanatsu', 'sichi'], level: 'A1' },
    { kanji: '八', meaning_de: ['acht', '8'], meaning_en: ['eight', '8'], on: 'ハチ', kun: 'やっ(つ)', romaji: 'hachi', romaji_variants: ['yattsu'], level: 'A1' },
    { kanji: '九', meaning_de: ['neun', '9'], meaning_en: ['nine', '9'], on: 'キュウ', kun: 'ここの(つ)', romaji: 'kyuu', romaji_variants: ['ku', 'kokonotsu', 'kyū'], level: 'A1' },
    { kanji: '十', meaning_de: ['zehn', '10'], meaning_en: ['ten', '10'], on: 'ジュウ', kun: 'とお', romaji: 'juu', romaji_variants: ['too', 'jū'], level: 'A1' },
    { kanji: '百', meaning_de: ['hundert', '100'], meaning_en: ['hundred', '100'], on: 'ヒャク', kun: '—', romaji: 'hyaku', romaji_variants: [], level: 'A1' },
    { kanji: '千', meaning_de: ['tausend', '1000'], meaning_en: ['thousand', '1000'], on: 'セン', kun: 'ち', romaji: 'sen', romaji_variants: ['chi'], level: 'A1' },
    { kanji: '万', meaning_de: ['zehntausend', '10000'], meaning_en: ['ten thousand', '10000'], on: 'マン、バン', kun: '—', romaji: 'man', romaji_variants: ['ban'], level: 'A1' },

    /* ============ A1 — Wochentage ============ */

    { kanji: '日', meaning_de: ['Tag', 'Sonne'], meaning_en: ['day', 'sun'], on: 'ニチ、ジツ', kun: 'ひ、び', romaji: 'nichi', romaji_variants: ['hi', 'bi', 'jitsu'], level: 'A1' },
    { kanji: '月', meaning_de: ['Monat', 'Mond'], meaning_en: ['month', 'moon'], on: 'ゲツ、ガツ', kun: 'つき', romaji: 'getsu', romaji_variants: ['tsuki', 'gatsu'], level: 'A1' },
    { kanji: '火', meaning_de: ['Feuer'], meaning_en: ['fire'], on: 'カ', kun: 'ひ', romaji: 'ka', romaji_variants: ['hi'], level: 'A1' },
    { kanji: '水', meaning_de: ['Wasser'], meaning_en: ['water'], on: 'スイ', kun: 'みず', romaji: 'sui', romaji_variants: ['mizu'], level: 'A1' },
    { kanji: '木', meaning_de: ['Baum', 'Holz'], meaning_en: ['tree', 'wood'], on: 'モク、ボク', kun: 'き', romaji: 'moku', romaji_variants: ['ki', 'boku'], level: 'A1' },
    { kanji: '金', meaning_de: ['Gold', 'Geld'], meaning_en: ['gold', 'money'], on: 'キン、コン', kun: 'かね', romaji: 'kin', romaji_variants: ['kane', 'kon'], level: 'A1' },
    { kanji: '土', meaning_de: ['Erde', 'Boden'], meaning_en: ['earth', 'soil', 'ground'], on: 'ド、ト', kun: 'つち', romaji: 'do', romaji_variants: ['tsuchi', 'to'], level: 'A1' },

    /* ============ A1 — Zeit ============ */

    { kanji: '年', meaning_de: ['Jahr'], meaning_en: ['year'], on: 'ネン', kun: 'とし', romaji: 'nen', romaji_variants: ['toshi'], level: 'A1' },
    { kanji: '今', meaning_de: ['jetzt', 'heute'], meaning_en: ['now', 'present'], on: 'コン、キン', kun: 'いま', romaji: 'ima', romaji_variants: ['kon', 'kin'], level: 'A1' },
    { kanji: '先', meaning_de: ['vorher', 'früher', 'frueher'], meaning_en: ['before', 'previous', 'ahead'], on: 'セン', kun: 'さき', romaji: 'sen', romaji_variants: ['saki'], level: 'A1' },
    { kanji: '前', meaning_de: ['vor', 'vorher', 'vorne'], meaning_en: ['before', 'front', 'in front'], on: 'ゼン', kun: 'まえ', romaji: 'mae', romaji_variants: ['zen'], level: 'A1' },
    { kanji: '後', meaning_de: ['nach', 'hinter', 'danach'], meaning_en: ['after', 'behind', 'later'], on: 'ゴ、コウ', kun: 'あと、うし(ろ)', romaji: 'ato', romaji_variants: ['go', 'kou', 'ushiro', 'kō'], level: 'A1' },
    { kanji: '午', meaning_de: ['Mittag'], meaning_en: ['noon', 'midday'], on: 'ゴ', kun: '—', romaji: 'go', romaji_variants: [], level: 'A1' },
    { kanji: '時', meaning_de: ['Zeit', 'Stunde', 'Uhr'], meaning_en: ['time', 'hour', 'clock'], on: 'ジ', kun: 'とき', romaji: 'ji', romaji_variants: ['toki'], level: 'A1' },
    { kanji: '分', meaning_de: ['Minute', 'Teil', 'teilen'], meaning_en: ['minute', 'part', 'divide'], on: 'ブン、フン', kun: 'わ(かる)', romaji: 'fun', romaji_variants: ['bun', 'wakaru', 'pun'], level: 'A1' },
    { kanji: '半', meaning_de: ['halb', 'Hälfte', 'Haelfte'], meaning_en: ['half'], on: 'ハン', kun: 'なか(ば)', romaji: 'han', romaji_variants: ['nakaba'], level: 'A1' },

    /* ============ A1 — Kompass & Richtungen ============ */

    { kanji: '東', meaning_de: ['Osten', 'Ost'], meaning_en: ['east'], on: 'トウ', kun: 'ひがし', romaji: 'higashi', romaji_variants: ['tou', 'tō'], level: 'A1' },
    { kanji: '西', meaning_de: ['Westen', 'West'], meaning_en: ['west'], on: 'セイ、サイ', kun: 'にし', romaji: 'nishi', romaji_variants: ['sei', 'sai'], level: 'A1' },
    { kanji: '南', meaning_de: ['Süden', 'Sued', 'Sueden'], meaning_en: ['south'], on: 'ナン', kun: 'みなみ', romaji: 'minami', romaji_variants: ['nan'], level: 'A1' },
    { kanji: '北', meaning_de: ['Norden', 'Nord'], meaning_en: ['north'], on: 'ホク', kun: 'きた', romaji: 'kita', romaji_variants: ['hoku'], level: 'A1' },
    { kanji: '右', meaning_de: ['rechts'], meaning_en: ['right'], on: 'ウ、ユウ', kun: 'みぎ', romaji: 'migi', romaji_variants: ['u', 'yuu', 'yū'], level: 'A1' },
    { kanji: '左', meaning_de: ['links'], meaning_en: ['left'], on: 'サ', kun: 'ひだり', romaji: 'hidari', romaji_variants: ['sa'], level: 'A1' },

    /* ============ A1 — Grundbegriffe ============ */

    { kanji: '人', meaning_de: ['Mensch', 'Person'], meaning_en: ['person', 'human'], on: 'ジン、ニン', kun: 'ひと', romaji: 'hito', romaji_variants: ['jin', 'nin'], level: 'A1' },
    { kanji: '大', meaning_de: ['groß', 'gross'], meaning_en: ['big', 'large'], on: 'ダイ、タイ', kun: 'おお(きい)', romaji: 'dai', romaji_variants: ['ookii', 'tai', 'oo'], level: 'A1' },
    { kanji: '小', meaning_de: ['klein'], meaning_en: ['small', 'little'], on: 'ショウ', kun: 'ちい(さい)、こ', romaji: 'shou', romaji_variants: ['chiisai', 'ko', 'shō'], level: 'A1' },
    { kanji: '山', meaning_de: ['Berg'], meaning_en: ['mountain'], on: 'サン', kun: 'やま', romaji: 'yama', romaji_variants: ['san'], level: 'A1' },
    { kanji: '川', meaning_de: ['Fluss'], meaning_en: ['river'], on: 'セン', kun: 'かわ', romaji: 'kawa', romaji_variants: ['sen'], level: 'A1' },
    { kanji: '上', meaning_de: ['oben', 'über', 'ueber'], meaning_en: ['above', 'up', 'over'], on: 'ジョウ', kun: 'うえ、あ(がる)', romaji: 'ue', romaji_variants: ['jou', 'agaru', 'jō'], level: 'A1' },
    { kanji: '下', meaning_de: ['unten', 'unter'], meaning_en: ['below', 'down', 'under'], on: 'カ、ゲ', kun: 'した、さ(がる)', romaji: 'shita', romaji_variants: ['ka', 'ge', 'sagaru'], level: 'A1' },
    { kanji: '中', meaning_de: ['Mitte', 'in', 'innen'], meaning_en: ['middle', 'inside', 'center'], on: 'チュウ', kun: 'なか', romaji: 'naka', romaji_variants: ['chuu', 'chū'], level: 'A1' },
    { kanji: '本', meaning_de: ['Buch', 'Ursprung'], meaning_en: ['book', 'origin'], on: 'ホン', kun: 'もと', romaji: 'hon', romaji_variants: ['moto'], level: 'A1' },
    { kanji: '口', meaning_de: ['Mund'], meaning_en: ['mouth'], on: 'コウ、ク', kun: 'くち', romaji: 'kuchi', romaji_variants: ['kou', 'ku', 'kō'], level: 'A1' },
    { kanji: '駅', meaning_de: ['Bahnhof', 'Station'], meaning_en: ['station'], on: 'エキ', kun: '—', romaji: 'eki', romaji_variants: [], level: 'A1' },

    /* ============ A1 — Verben & Taetigkeiten ============ */

    { kanji: '行', meaning_de: ['gehen'], meaning_en: ['go'], on: 'コウ、ギョウ', kun: 'い(く)', romaji: 'iku', romaji_variants: ['kou', 'gyou', 'kō', 'gyō'], level: 'A1' },
    { kanji: '来', meaning_de: ['kommen'], meaning_en: ['come'], on: 'ライ', kun: 'く(る)', romaji: 'kuru', romaji_variants: ['rai'], level: 'A1' },
    { kanji: '見', meaning_de: ['sehen', 'schauen'], meaning_en: ['see', 'look', 'watch'], on: 'ケン', kun: 'み(る)', romaji: 'miru', romaji_variants: ['ken'], level: 'A1' },
    { kanji: '食', meaning_de: ['essen'], meaning_en: ['eat', 'food'], on: 'ショク', kun: 'た(べる)', romaji: 'taberu', romaji_variants: ['shoku'], level: 'A1' },
    { kanji: '飲', meaning_de: ['trinken'], meaning_en: ['drink'], on: 'イン', kun: 'の(む)', romaji: 'nomu', romaji_variants: ['in'], level: 'A1' },
    { kanji: '買', meaning_de: ['kaufen'], meaning_en: ['buy', 'purchase'], on: 'バイ', kun: 'か(う)', romaji: 'kau', romaji_variants: ['bai'], level: 'A1' },
    { kanji: '読', meaning_de: ['lesen'], meaning_en: ['read'], on: 'ドク、トク', kun: 'よ(む)', romaji: 'yomu', romaji_variants: ['doku', 'toku'], level: 'A1' },
    { kanji: '書', meaning_de: ['schreiben'], meaning_en: ['write'], on: 'ショ', kun: 'か(く)', romaji: 'kaku', romaji_variants: ['sho'], level: 'A1' },
    { kanji: '聞', meaning_de: ['hören', 'hoeren', 'fragen'], meaning_en: ['hear', 'listen', 'ask'], on: 'ブン、モン', kun: 'き(く)', romaji: 'kiku', romaji_variants: ['bun', 'mon'], level: 'A1' },
    { kanji: '話', meaning_de: ['sprechen', 'Gespräch', 'Gespraech'], meaning_en: ['speak', 'talk', 'conversation'], on: 'ワ', kun: 'はな(す)', romaji: 'hanasu', romaji_variants: ['wa', 'hanashi'], level: 'A1' },
    { kanji: '言', meaning_de: ['sagen', 'Wort'], meaning_en: ['say', 'word'], on: 'ゲン、ゴン', kun: 'い(う)', romaji: 'iu', romaji_variants: ['gen', 'gon'], level: 'A1' },

    /* ============ A1 — Adjektive ============ */

    { kanji: '新', meaning_de: ['neu'], meaning_en: ['new'], on: 'シン', kun: 'あたら(しい)', romaji: 'shin', romaji_variants: ['atarashii', 'sin'], level: 'A1' },
    { kanji: '古', meaning_de: ['alt'], meaning_en: ['old'], on: 'コ', kun: 'ふる(い)', romaji: 'furui', romaji_variants: ['ko'], level: 'A1' },

    /* ============ A1 — Essen ============ */

    { kanji: '魚', meaning_de: ['Fisch'], meaning_en: ['fish'], on: 'ギョ', kun: 'さかな、うお', romaji: 'sakana', romaji_variants: ['gyo', 'uo'], level: 'A1' },
    { kanji: '肉', meaning_de: ['Fleisch'], meaning_en: ['meat'], on: 'ニク', kun: '—', romaji: 'niku', romaji_variants: [], level: 'A1' },
    { kanji: '卵', meaning_de: ['Ei'], meaning_en: ['egg'], on: 'ラン', kun: 'たまご', romaji: 'tamago', romaji_variants: ['ran'], level: 'A1' },

    /* ============ A2 — Familie ============ */

    { kanji: '男', meaning_de: ['Mann', 'männlich', 'maennlich'], meaning_en: ['man', 'male'], on: 'ダン、ナン', kun: 'おとこ', romaji: 'otoko', romaji_variants: ['dan', 'nan'], level: 'A2' },
    { kanji: '女', meaning_de: ['Frau', 'weiblich'], meaning_en: ['woman', 'female'], on: 'ジョ、ニョ', kun: 'おんな', romaji: 'onna', romaji_variants: ['jo', 'nyo', 'jyo'], level: 'A2' },
    { kanji: '子', meaning_de: ['Kind'], meaning_en: ['child'], on: 'シ、ス', kun: 'こ', romaji: 'ko', romaji_variants: ['shi', 'su', 'si'], level: 'A2' },
    { kanji: '友', meaning_de: ['Freund'], meaning_en: ['friend'], on: 'ユウ', kun: 'とも', romaji: 'tomo', romaji_variants: ['yuu', 'yū'], level: 'A2' },
    { kanji: '父', meaning_de: ['Vater'], meaning_en: ['father'], on: 'フ', kun: 'ちち', romaji: 'chichi', romaji_variants: ['fu'], level: 'A2' },
    { kanji: '母', meaning_de: ['Mutter'], meaning_en: ['mother'], on: 'ボ', kun: 'はは', romaji: 'haha', romaji_variants: ['bo'], level: 'A2' },

    /* ============ A2 — Aktionen ============ */

    { kanji: '出', meaning_de: ['ausgehen', 'herausgehen', 'hinausgehen'], meaning_en: ['go out', 'exit', 'leave'], on: 'シュツ', kun: 'で(る)、だ(す)', romaji: 'deru', romaji_variants: ['shutsu', 'dasu'], level: 'A2' },
    { kanji: '入', meaning_de: ['eintreten', 'hineingehen'], meaning_en: ['enter', 'go in'], on: 'ニュウ', kun: 'い(る)、はい(る)', romaji: 'hairu', romaji_variants: ['nyuu', 'iru', 'nyū'], level: 'A2' },
    { kanji: '休', meaning_de: ['ausruhen', 'Pause', 'frei haben'], meaning_en: ['rest', 'break', 'take a day off'], on: 'キュウ', kun: 'やす(む)', romaji: 'yasumu', romaji_variants: ['kyuu', 'kyū'], level: 'A2' },
    { kanji: '立', meaning_de: ['stehen', 'aufstehen'], meaning_en: ['stand', 'stand up'], on: 'リツ', kun: 'た(つ)', romaji: 'tatsu', romaji_variants: ['ritsu'], level: 'A2' },

    /* ============ A2 — Koerper ============ */

    { kanji: '目', meaning_de: ['Auge'], meaning_en: ['eye'], on: 'モク、ボク', kun: 'め', romaji: 'me', romaji_variants: ['moku', 'boku'], level: 'A2' },
    { kanji: '手', meaning_de: ['Hand'], meaning_en: ['hand'], on: 'シュ', kun: 'て', romaji: 'te', romaji_variants: ['shu'], level: 'A2' },
    { kanji: '足', meaning_de: ['Fuß', 'Fuss', 'Bein'], meaning_en: ['foot', 'leg'], on: 'ソク', kun: 'あし', romaji: 'ashi', romaji_variants: ['soku'], level: 'A2' },

    /* ============ A2 — Weiteres ============ */

    { kanji: '車', meaning_de: ['Auto', 'Wagen', 'Fahrzeug'], meaning_en: ['car', 'vehicle'], on: 'シャ', kun: 'くるま', romaji: 'kuruma', romaji_variants: ['sha'], level: 'A2' },
    { kanji: '電', meaning_de: ['Elektrizität', 'Strom', 'elektrisch'], meaning_en: ['electricity', 'electric'], on: 'デン', kun: '—', romaji: 'den', romaji_variants: [], level: 'A2' },
    { kanji: '学', meaning_de: ['lernen', 'Studium'], meaning_en: ['learn', 'study'], on: 'ガク', kun: 'まな(ぶ)', romaji: 'gaku', romaji_variants: ['manabu'], level: 'A2' },
    { kanji: '校', meaning_de: ['Schule'], meaning_en: ['school'], on: 'コウ', kun: '—', romaji: 'kou', romaji_variants: ['kō'], level: 'A2' },

    /* ============ B1 — Starter ============ */

    { kanji: '会', meaning_de: ['treffen', 'Versammlung', 'Gesellschaft'], meaning_en: ['meet', 'meeting', 'society'], on: 'カイ、エ', kun: 'あ(う)', romaji: 'au', romaji_variants: ['kai', 'e'], level: 'B1' },
    { kanji: '社', meaning_de: ['Firma', 'Gesellschaft'], meaning_en: ['company', 'society'], on: 'シャ', kun: 'やしろ', romaji: 'sha', romaji_variants: ['yashiro'], level: 'B1' },
    { kanji: '仕', meaning_de: ['dienen', 'Arbeit'], meaning_en: ['serve', 'work'], on: 'シ、ジ', kun: 'つか(える)', romaji: 'shi', romaji_variants: ['ji', 'tsukaeru', 'si'], level: 'B1' },
    { kanji: '事', meaning_de: ['Sache', 'Angelegenheit'], meaning_en: ['thing', 'matter', 'affair'], on: 'ジ、ズ', kun: 'こと', romaji: 'koto', romaji_variants: ['ji', 'zu'], level: 'B1' },
    { kanji: '長', meaning_de: ['lang', 'Chef', 'Leiter'], meaning_en: ['long', 'leader', 'chief'], on: 'チョウ', kun: 'なが(い)', romaji: 'nagai', romaji_variants: ['chou', 'chō'], level: 'B1' },
    { kanji: '高', meaning_de: ['hoch', 'teuer'], meaning_en: ['high', 'tall', 'expensive'], on: 'コウ', kun: 'たか(い)', romaji: 'takai', romaji_variants: ['kou', 'kō'], level: 'B1' },
    { kanji: '安', meaning_de: ['billig', 'günstig', 'guenstig', 'ruhig'], meaning_en: ['cheap', 'inexpensive', 'safe'], on: 'アン', kun: 'やす(い)', romaji: 'yasui', romaji_variants: ['an'], level: 'B1' },
    { kanji: '多', meaning_de: ['viel', 'viele'], meaning_en: ['many', 'much'], on: 'タ', kun: 'おお(い)', romaji: 'ooi', romaji_variants: ['ta'], level: 'B1' },
    { kanji: '少', meaning_de: ['wenig', 'wenige'], meaning_en: ['few', 'little'], on: 'ショウ', kun: 'すく(ない)、すこ(し)', romaji: 'sukunai', romaji_variants: ['shou', 'sukoshi', 'shō'], level: 'B1' },
    { kanji: '思', meaning_de: ['denken', 'glauben'], meaning_en: ['think', 'believe'], on: 'シ', kun: 'おも(う)', romaji: 'omou', romaji_variants: ['shi', 'si'], level: 'B1' },
    { kanji: '知', meaning_de: ['wissen', 'kennen'], meaning_en: ['know'], on: 'チ', kun: 'し(る)', romaji: 'shiru', romaji_variants: ['chi'], level: 'B1' },
    { kanji: '教', meaning_de: ['lehren', 'unterrichten'], meaning_en: ['teach', 'instruct'], on: 'キョウ', kun: 'おし(える)', romaji: 'oshieru', romaji_variants: ['kyou', 'kyō'], level: 'B1' },
    { kanji: '国', meaning_de: ['Land', 'Staat'], meaning_en: ['country', 'nation'], on: 'コク', kun: 'くに', romaji: 'kuni', romaji_variants: ['koku'], level: 'B1' },

    /* ============ B2 — Starter ============ */

    { kanji: '経', meaning_de: ['Erfahrung', 'Wirtschaft', 'durchlaufen'], meaning_en: ['experience', 'economy', 'pass through'], on: 'ケイ、キョウ', kun: 'へ(る)', romaji: 'kei', romaji_variants: ['kyou', 'heru', 'kyō'], level: 'B2' },
    { kanji: '済', meaning_de: ['Wirtschaft', 'erledigt', 'helfen'], meaning_en: ['economy', 'finish', 'settle'], on: 'サイ、セイ', kun: 'す(む)', romaji: 'sai', romaji_variants: ['sei', 'sumu'], level: 'B2' },
    { kanji: '政', meaning_de: ['Politik', 'Regierung'], meaning_en: ['politics', 'government'], on: 'セイ、ショウ', kun: 'まつりごと', romaji: 'sei', romaji_variants: ['shou', 'matsurigoto', 'shō'], level: 'B2' },
    { kanji: '治', meaning_de: ['regieren', 'heilen'], meaning_en: ['govern', 'heal', 'cure'], on: 'チ、ジ', kun: 'おさ(める)、なお(す)', romaji: 'chi', romaji_variants: ['ji', 'osameru', 'naosu'], level: 'B2' },
    { kanji: '問', meaning_de: ['Frage', 'fragen', 'Problem'], meaning_en: ['question', 'ask', 'problem'], on: 'モン', kun: 'と(う)', romaji: 'mon', romaji_variants: ['tou', 'tō'], level: 'B2' },
    { kanji: '題', meaning_de: ['Thema', 'Titel', 'Aufgabe'], meaning_en: ['topic', 'title', 'problem'], on: 'ダイ', kun: '—', romaji: 'dai', romaji_variants: [], level: 'B2' },
    { kanji: '答', meaning_de: ['Antwort', 'antworten'], meaning_en: ['answer', 'reply'], on: 'トウ', kun: 'こた(える)', romaji: 'kotaeru', romaji_variants: ['tou', 'tō'], level: 'B2' },
    { kanji: '説', meaning_de: ['erklären', 'erklaeren', 'Theorie'], meaning_en: ['explain', 'theory'], on: 'セツ、ゼイ', kun: 'と(く)', romaji: 'setsu', romaji_variants: ['zei', 'toku'], level: 'B2' },
    { kanji: '関', meaning_de: ['Beziehung', 'Zusammenhang', 'Schranke'], meaning_en: ['relation', 'connection', 'barrier'], on: 'カン', kun: 'せき、かか(わる)', romaji: 'kan', romaji_variants: ['seki', 'kakawaru'], level: 'B2' },
    { kanji: '係', meaning_de: ['Beziehung', 'Verbindung', 'zuständig', 'zustaendig'], meaning_en: ['relation', 'connection', 'in charge'], on: 'ケイ', kun: 'かか(り)', romaji: 'kei', romaji_variants: ['kakari'], level: 'B2' },
    { kanji: '決', meaning_de: ['entscheiden', 'bestimmen'], meaning_en: ['decide', 'determine'], on: 'ケツ', kun: 'き(める)', romaji: 'kimeru', romaji_variants: ['ketsu'], level: 'B2' },
    { kanji: '定', meaning_de: ['festlegen', 'bestimmen', 'Regel'], meaning_en: ['fix', 'determine', 'rule'], on: 'テイ、ジョウ', kun: 'さだ(める)', romaji: 'tei', romaji_variants: ['jou', 'sadameru', 'jō'], level: 'B2' },
    { kanji: '変', meaning_de: ['ändern', 'aendern', 'seltsam', 'verändern'], meaning_en: ['change', 'strange', 'unusual'], on: 'ヘン', kun: 'か(わる)、か(える)', romaji: 'hen', romaji_variants: ['kawaru', 'kaeru'], level: 'B2' },
    { kanji: '特', meaning_de: ['besonders', 'speziell'], meaning_en: ['special', 'particular'], on: 'トク', kun: '—', romaji: 'toku', romaji_variants: [], level: 'B2' },
    { kanji: '別', meaning_de: ['anders', 'besonders', 'Unterschied', 'Trennung'], meaning_en: ['different', 'special', 'separate'], on: 'ベツ', kun: 'わか(れる)', romaji: 'betsu', romaji_variants: ['wakareru'], level: 'B2' }
];

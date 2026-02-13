/* numbers-data.js — Zahlen & Zaehlwoerter (助数詞): Segmente, Grundzahlen, Counter-Tabellen, Referenz.
   Braucht: common.js, i18n.js. Geladen vor numbers.js. */

/* ============ SEGMENTE ============ */

const numbersSegments = [
    { id: 'basic_1_10',     label: 'Zahlen 1–10',              label_en: 'Numbers 1–10',              checked: true },
    { id: 'basic_11_100',   label: 'Zahlen 11–100',            label_en: 'Numbers 11–100',            checked: false },
    { id: 'basic_100_10000',label: 'Zahlen 100–10.000',        label_en: 'Numbers 100–10,000',        checked: false },
    { id: 'counter_tsu',    label: 'つ (Allgemein)',            label_en: 'つ (General)',               checked: false },
    { id: 'counter_nin',    label: '人 (Personen)',             label_en: '人 (People)',                checked: false },
    { id: 'counter_hon',    label: '本 (Länglich)',             label_en: '本 (Long objects)',          checked: false },
    { id: 'counter_mai',    label: '枚 (Flach)',               label_en: '枚 (Flat objects)',          checked: false },
    { id: 'counter_hiki',   label: '匹 (Kleine Tiere)',        label_en: '匹 (Small animals)',        checked: false },
    { id: 'counter_dai',    label: '台 (Maschinen/Fahrzeuge)', label_en: '台 (Machines/Vehicles)',     checked: false },
    { id: 'counter_satsu',  label: '冊 (Bücher)',              label_en: '冊 (Books)',                 checked: false },
    { id: 'counter_hai',    label: '杯 (Becher/Gläser)',       label_en: '杯 (Cups/Glasses)',         checked: false },
    { id: 'counter_ko',     label: '個 (Kleine Gegenstände)',   label_en: '個 (Small items)',           checked: false },
    { id: 'counter_kai',    label: '回 (Male/Wiederholungen)', label_en: '回 (Times/Occurrences)',    checked: false }
];

/* ============ GRUNDZAHLEN ============ */

const basicNumbers = {
    basic_1_10: [
        { n: 1,  kanji: '一', reading: 'いち',   romaji: 'ichi' },
        { n: 2,  kanji: '二', reading: 'に',     romaji: 'ni' },
        { n: 3,  kanji: '三', reading: 'さん',   romaji: 'san' },
        { n: 4,  kanji: '四', reading: 'し',     romaji: 'shi',  alt_reading: 'よん', alt_romaji: 'yon' },
        { n: 5,  kanji: '五', reading: 'ご',     romaji: 'go' },
        { n: 6,  kanji: '六', reading: 'ろく',   romaji: 'roku' },
        { n: 7,  kanji: '七', reading: 'しち',   romaji: 'shichi', alt_reading: 'なな', alt_romaji: 'nana' },
        { n: 8,  kanji: '八', reading: 'はち',   romaji: 'hachi' },
        { n: 9,  kanji: '九', reading: 'きゅう', romaji: 'kyuu', alt_reading: 'く', alt_romaji: 'ku' },
        { n: 10, kanji: '十', reading: 'じゅう', romaji: 'juu' }
    ],
    basic_11_100: [
        { n: 11, kanji: '十一', reading: 'じゅういち',     romaji: 'juuichi' },
        { n: 12, kanji: '十二', reading: 'じゅうに',       romaji: 'juuni' },
        { n: 13, kanji: '十三', reading: 'じゅうさん',     romaji: 'juusan' },
        { n: 14, kanji: '十四', reading: 'じゅうよん',     romaji: 'juuyon',   alt_reading: 'じゅうし', alt_romaji: 'juushi' },
        { n: 15, kanji: '十五', reading: 'じゅうご',       romaji: 'juugo' },
        { n: 16, kanji: '十六', reading: 'じゅうろく',     romaji: 'juuroku' },
        { n: 17, kanji: '十七', reading: 'じゅうなな',     romaji: 'juunana',  alt_reading: 'じゅうしち', alt_romaji: 'juushichi' },
        { n: 18, kanji: '十八', reading: 'じゅうはち',     romaji: 'juuhachi' },
        { n: 19, kanji: '十九', reading: 'じゅうきゅう',   romaji: 'juukyuu',  alt_reading: 'じゅうく', alt_romaji: 'juuku' },
        { n: 20, kanji: '二十', reading: 'にじゅう',       romaji: 'nijuu' },
        { n: 30, kanji: '三十', reading: 'さんじゅう',     romaji: 'sanjuu' },
        { n: 40, kanji: '四十', reading: 'よんじゅう',     romaji: 'yonjuu' },
        { n: 50, kanji: '五十', reading: 'ごじゅう',       romaji: 'gojuu' },
        { n: 60, kanji: '六十', reading: 'ろくじゅう',     romaji: 'rokujuu' },
        { n: 70, kanji: '七十', reading: 'ななじゅう',     romaji: 'nanajuu' },
        { n: 80, kanji: '八十', reading: 'はちじゅう',     romaji: 'hachijuu' },
        { n: 90, kanji: '九十', reading: 'きゅうじゅう',   romaji: 'kyuujuu' },
        { n: 100, kanji: '百', reading: 'ひゃく',          romaji: 'hyaku' }
    ],
    basic_100_10000: [
        { n: 100,   kanji: '百',     reading: 'ひゃく',         romaji: 'hyaku' },
        { n: 200,   kanji: '二百',   reading: 'にひゃく',       romaji: 'nihyaku' },
        { n: 300,   kanji: '三百',   reading: 'さんびゃく',     romaji: 'sanbyaku' },
        { n: 400,   kanji: '四百',   reading: 'よんひゃく',     romaji: 'yonhyaku' },
        { n: 500,   kanji: '五百',   reading: 'ごひゃく',       romaji: 'gohyaku' },
        { n: 600,   kanji: '六百',   reading: 'ろっぴゃく',     romaji: 'roppyaku' },
        { n: 700,   kanji: '七百',   reading: 'ななひゃく',     romaji: 'nanahyaku' },
        { n: 800,   kanji: '八百',   reading: 'はっぴゃく',     romaji: 'happyaku' },
        { n: 900,   kanji: '九百',   reading: 'きゅうひゃく',   romaji: 'kyuuhyaku' },
        { n: 1000,  kanji: '千',     reading: 'せん',           romaji: 'sen' },
        { n: 2000,  kanji: '二千',   reading: 'にせん',         romaji: 'nisen' },
        { n: 3000,  kanji: '三千',   reading: 'さんぜん',       romaji: 'sanzen' },
        { n: 4000,  kanji: '四千',   reading: 'よんせん',       romaji: 'yonsen' },
        { n: 5000,  kanji: '五千',   reading: 'ごせん',         romaji: 'gosen' },
        { n: 8000,  kanji: '八千',   reading: 'はっせん',       romaji: 'hassen' },
        { n: 10000, kanji: '一万',   reading: 'いちまん',       romaji: 'ichiman' }
    ]
};

/* ============ COUNTER-DATEN ============ */

const counterData = {
    tsu: {
        kanji: 'つ',
        description: 'Allgemeiner Zähler für Dinge (1–10). Nutzt das japanische Zahlensystem.',
        description_en: 'General counter for things (1–10). Uses the native Japanese number system.',
        use_de: 'Beliebige Gegenstände, wenn man den speziellen Zähler nicht kennt',
        use_en: 'Any objects, when you don\'t know the specific counter',
        items: [
            { n: 1,  reading: 'ひとつ',   romaji: 'hitotsu' },
            { n: 2,  reading: 'ふたつ',   romaji: 'futatsu' },
            { n: 3,  reading: 'みっつ',   romaji: 'mittsu' },
            { n: 4,  reading: 'よっつ',   romaji: 'yottsu' },
            { n: 5,  reading: 'いつつ',   romaji: 'itsutsu' },
            { n: 6,  reading: 'むっつ',   romaji: 'muttsu' },
            { n: 7,  reading: 'ななつ',   romaji: 'nanatsu' },
            { n: 8,  reading: 'やっつ',   romaji: 'yattsu' },
            { n: 9,  reading: 'ここのつ', romaji: 'kokonotsu' },
            { n: 10, reading: 'とお',     romaji: 'too' }
        ],
        examples: [
            { jp: 'りんご を ひとつ ください。', de: 'Einen Apfel, bitte.', en: 'One apple, please.' },
            { jp: 'いす が みっつ あります。', de: 'Es gibt drei Stühle.', en: 'There are three chairs.' }
        ]
    },
    nin: {
        kanji: '人',
        description: 'Zähler für Personen. 1 und 2 sind unregelmäßig (ひとり, ふたり).',
        description_en: 'Counter for people. 1 and 2 are irregular (ひとり, ふたり).',
        use_de: 'Menschen, Personen',
        use_en: 'Humans, people',
        items: [
            { n: 1,  reading: 'ひとり',       romaji: 'hitori' },
            { n: 2,  reading: 'ふたり',       romaji: 'futari' },
            { n: 3,  reading: 'さんにん',     romaji: 'sannin' },
            { n: 4,  reading: 'よにん',       romaji: 'yonin' },
            { n: 5,  reading: 'ごにん',       romaji: 'gonin' },
            { n: 6,  reading: 'ろくにん',     romaji: 'rokunin' },
            { n: 7,  reading: 'しちにん',     romaji: 'shichinin', alt_romaji: 'nananin' },
            { n: 8,  reading: 'はちにん',     romaji: 'hachinin' },
            { n: 9,  reading: 'きゅうにん',   romaji: 'kyuunin' },
            { n: 10, reading: 'じゅうにん',   romaji: 'juunin' }
        ],
        examples: [
            { jp: 'がくせい が ごにん います。', de: 'Es gibt fünf Studenten.', en: 'There are five students.' },
            { jp: 'ひとり で いきます。', de: 'Ich gehe allein.', en: 'I go alone.' }
        ]
    },
    hon: {
        kanji: '本',
        description: 'Zähler für längliche Gegenstände. Lautverschiebungen bei 1, 3, 6, 8, 10.',
        description_en: 'Counter for long, cylindrical objects. Sound changes at 1, 3, 6, 8, 10.',
        use_de: 'Stifte, Flaschen, Bäume, Regenschirme, Bananen, Straßen',
        use_en: 'Pens, bottles, trees, umbrellas, bananas, streets',
        items: [
            { n: 1,  reading: 'いっぽん',     romaji: 'ippon' },
            { n: 2,  reading: 'にほん',       romaji: 'nihon' },
            { n: 3,  reading: 'さんぼん',     romaji: 'sanbon' },
            { n: 4,  reading: 'よんほん',     romaji: 'yonhon' },
            { n: 5,  reading: 'ごほん',       romaji: 'gohon' },
            { n: 6,  reading: 'ろっぽん',     romaji: 'roppon' },
            { n: 7,  reading: 'ななほん',     romaji: 'nanahon' },
            { n: 8,  reading: 'はっぽん',     romaji: 'happon' },
            { n: 9,  reading: 'きゅうほん',   romaji: 'kyuuhon' },
            { n: 10, reading: 'じゅっぽん',   romaji: 'juppon' }
        ],
        examples: [
            { jp: 'えんぴつ が にほん あります。', de: 'Es gibt zwei Bleistifte.', en: 'There are two pencils.' },
            { jp: 'ビール を いっぽん ください。', de: 'Ein Bier, bitte.', en: 'One beer, please.' }
        ]
    },
    mai: {
        kanji: '枚',
        description: 'Zähler für flache Gegenstände. Keine Lautverschiebungen.',
        description_en: 'Counter for flat, thin objects. No sound changes.',
        use_de: 'Papier, Teller, Hemden, Briefmarken, Karten, Pizzastücke',
        use_en: 'Paper, plates, shirts, stamps, cards, pizza slices',
        items: [
            { n: 1,  reading: 'いちまい',     romaji: 'ichimai' },
            { n: 2,  reading: 'にまい',       romaji: 'nimai' },
            { n: 3,  reading: 'さんまい',     romaji: 'sanmai' },
            { n: 4,  reading: 'よんまい',     romaji: 'yonmai' },
            { n: 5,  reading: 'ごまい',       romaji: 'gomai' },
            { n: 6,  reading: 'ろくまい',     romaji: 'rokumai' },
            { n: 7,  reading: 'ななまい',     romaji: 'nanamai' },
            { n: 8,  reading: 'はちまい',     romaji: 'hachimai' },
            { n: 9,  reading: 'きゅうまい',   romaji: 'kyuumai' },
            { n: 10, reading: 'じゅうまい',   romaji: 'juumai' }
        ],
        examples: [
            { jp: 'かみ を さんまい ください。', de: 'Drei Blatt Papier, bitte.', en: 'Three sheets of paper, please.' },
            { jp: 'きって が にまい あります。', de: 'Es gibt zwei Briefmarken.', en: 'There are two stamps.' }
        ]
    },
    hiki: {
        kanji: '匹',
        description: 'Zähler für kleine/mittelgroße Tiere. Lautverschiebungen bei 1, 3, 6, 8, 10.',
        description_en: 'Counter for small/medium animals. Sound changes at 1, 3, 6, 8, 10.',
        use_de: 'Katzen, Hunde, Fische, Insekten, Frösche',
        use_en: 'Cats, dogs, fish, insects, frogs',
        items: [
            { n: 1,  reading: 'いっぴき',     romaji: 'ippiki' },
            { n: 2,  reading: 'にひき',       romaji: 'nihiki' },
            { n: 3,  reading: 'さんびき',     romaji: 'sanbiki' },
            { n: 4,  reading: 'よんひき',     romaji: 'yonhiki' },
            { n: 5,  reading: 'ごひき',       romaji: 'gohiki' },
            { n: 6,  reading: 'ろっぴき',     romaji: 'roppiki' },
            { n: 7,  reading: 'ななひき',     romaji: 'nanahiki' },
            { n: 8,  reading: 'はっぴき',     romaji: 'happiki' },
            { n: 9,  reading: 'きゅうひき',   romaji: 'kyuuhiki' },
            { n: 10, reading: 'じゅっぴき',   romaji: 'juppiki' }
        ],
        examples: [
            { jp: 'ねこ が さんびき います。', de: 'Es gibt drei Katzen.', en: 'There are three cats.' },
            { jp: 'さかな を いっぴき かいました。', de: 'Ich habe einen Fisch gekauft.', en: 'I bought one fish.' }
        ]
    },
    dai: {
        kanji: '台',
        description: 'Zähler für Maschinen und Fahrzeuge. Keine Lautverschiebungen.',
        description_en: 'Counter for machines and vehicles. No sound changes.',
        use_de: 'Autos, Computer, Fernseher, Waschmaschinen, Fahrräder',
        use_en: 'Cars, computers, TVs, washing machines, bicycles',
        items: [
            { n: 1,  reading: 'いちだい',     romaji: 'ichidai' },
            { n: 2,  reading: 'にだい',       romaji: 'nidai' },
            { n: 3,  reading: 'さんだい',     romaji: 'sandai' },
            { n: 4,  reading: 'よんだい',     romaji: 'yondai' },
            { n: 5,  reading: 'ごだい',       romaji: 'godai' },
            { n: 6,  reading: 'ろくだい',     romaji: 'rokudai' },
            { n: 7,  reading: 'ななだい',     romaji: 'nanadai' },
            { n: 8,  reading: 'はちだい',     romaji: 'hachidai' },
            { n: 9,  reading: 'きゅうだい',   romaji: 'kyuudai' },
            { n: 10, reading: 'じゅうだい',   romaji: 'juudai' }
        ],
        examples: [
            { jp: 'くるま が にだい あります。', de: 'Es gibt zwei Autos.', en: 'There are two cars.' },
            { jp: 'パソコン を いちだい かいました。', de: 'Ich habe einen Computer gekauft.', en: 'I bought one computer.' }
        ]
    },
    satsu: {
        kanji: '冊',
        description: 'Zähler für gebundene Bücher und Hefte. Lautverschiebung bei 1, 8, 10.',
        description_en: 'Counter for bound books and notebooks. Sound changes at 1, 8, 10.',
        use_de: 'Bücher, Hefte, Magazine, Wörterbücher',
        use_en: 'Books, notebooks, magazines, dictionaries',
        items: [
            { n: 1,  reading: 'いっさつ',     romaji: 'issatsu' },
            { n: 2,  reading: 'にさつ',       romaji: 'nisatsu' },
            { n: 3,  reading: 'さんさつ',     romaji: 'sansatsu' },
            { n: 4,  reading: 'よんさつ',     romaji: 'yonsatsu' },
            { n: 5,  reading: 'ごさつ',       romaji: 'gosatsu' },
            { n: 6,  reading: 'ろくさつ',     romaji: 'rokusatsu' },
            { n: 7,  reading: 'ななさつ',     romaji: 'nanasatsu' },
            { n: 8,  reading: 'はっさつ',     romaji: 'hassatsu' },
            { n: 9,  reading: 'きゅうさつ',   romaji: 'kyuusatsu' },
            { n: 10, reading: 'じゅっさつ',   romaji: 'jussatsu' }
        ],
        examples: [
            { jp: 'ほん を さんさつ よみました。', de: 'Ich habe drei Bücher gelesen.', en: 'I read three books.' },
            { jp: 'じしょ が いっさつ あります。', de: 'Es gibt ein Wörterbuch.', en: 'There is one dictionary.' }
        ]
    },
    hai: {
        kanji: '杯',
        description: 'Zähler für Getränke in Bechern/Gläsern. Lautverschiebungen bei 1, 3, 6, 8, 10.',
        description_en: 'Counter for drinks in cups/glasses. Sound changes at 1, 3, 6, 8, 10.',
        use_de: 'Tassen Kaffee/Tee, Gläser Wasser/Bier, Schalen Reis',
        use_en: 'Cups of coffee/tea, glasses of water/beer, bowls of rice',
        items: [
            { n: 1,  reading: 'いっぱい',     romaji: 'ippai' },
            { n: 2,  reading: 'にはい',       romaji: 'nihai' },
            { n: 3,  reading: 'さんばい',     romaji: 'sanbai' },
            { n: 4,  reading: 'よんはい',     romaji: 'yonhai' },
            { n: 5,  reading: 'ごはい',       romaji: 'gohai' },
            { n: 6,  reading: 'ろっぱい',     romaji: 'roppai' },
            { n: 7,  reading: 'ななはい',     romaji: 'nanahai' },
            { n: 8,  reading: 'はっぱい',     romaji: 'happai' },
            { n: 9,  reading: 'きゅうはい',   romaji: 'kyuuhai' },
            { n: 10, reading: 'じゅっぱい',   romaji: 'juppai' }
        ],
        examples: [
            { jp: 'コーヒー を いっぱい のみます。', de: 'Ich trinke eine Tasse Kaffee.', en: 'I drink one cup of coffee.' },
            { jp: 'ビール を さんばい のみました。', de: 'Ich habe drei Gläser Bier getrunken.', en: 'I drank three glasses of beer.' }
        ]
    },
    ko: {
        kanji: '個',
        description: 'Zähler für kleine, kompakte Gegenstände. Lautverschiebung bei 1, 6, 8, 10.',
        description_en: 'Counter for small, compact objects. Sound changes at 1, 6, 8, 10.',
        use_de: 'Äpfel, Eier, Bälle, Steine, Kisten',
        use_en: 'Apples, eggs, balls, stones, boxes',
        items: [
            { n: 1,  reading: 'いっこ',       romaji: 'ikko' },
            { n: 2,  reading: 'にこ',         romaji: 'niko' },
            { n: 3,  reading: 'さんこ',       romaji: 'sanko' },
            { n: 4,  reading: 'よんこ',       romaji: 'yonko' },
            { n: 5,  reading: 'ごこ',         romaji: 'goko' },
            { n: 6,  reading: 'ろっこ',       romaji: 'rokko' },
            { n: 7,  reading: 'ななこ',       romaji: 'nanako' },
            { n: 8,  reading: 'はっこ',       romaji: 'hakko' },
            { n: 9,  reading: 'きゅうこ',     romaji: 'kyuuko' },
            { n: 10, reading: 'じゅっこ',     romaji: 'jukko' }
        ],
        examples: [
            { jp: 'たまご を いっこ たべました。', de: 'Ich habe ein Ei gegessen.', en: 'I ate one egg.' },
            { jp: 'りんご が ごこ あります。', de: 'Es gibt fünf Äpfel.', en: 'There are five apples.' }
        ]
    },
    kai: {
        kanji: '回',
        description: 'Zähler für Häufigkeit/Wiederholungen. Keine Lautverschiebungen.',
        description_en: 'Counter for frequency/occurrences. No sound changes.',
        use_de: 'Male, Versuche, Wiederholungen, Runden',
        use_en: 'Times, attempts, repetitions, rounds',
        items: [
            { n: 1,  reading: 'いっかい',     romaji: 'ikkai' },
            { n: 2,  reading: 'にかい',       romaji: 'nikai' },
            { n: 3,  reading: 'さんかい',     romaji: 'sankai' },
            { n: 4,  reading: 'よんかい',     romaji: 'yonkai' },
            { n: 5,  reading: 'ごかい',       romaji: 'gokai' },
            { n: 6,  reading: 'ろっかい',     romaji: 'rokkai' },
            { n: 7,  reading: 'ななかい',     romaji: 'nanakai' },
            { n: 8,  reading: 'はっかい',     romaji: 'hakkai' },
            { n: 9,  reading: 'きゅうかい',   romaji: 'kyuukai' },
            { n: 10, reading: 'じゅっかい',   romaji: 'jukkai' }
        ],
        examples: [
            { jp: 'いっかい やってみてください。', de: 'Bitte versuchen Sie es einmal.', en: 'Please try it once.' },
            { jp: 'にほん に さんかい いきました。', de: 'Ich war dreimal in Japan.', en: 'I went to Japan three times.' }
        ]
    }
};

/* ============ COUNTER-BEISPIEL-OBJEKTE (fuer counter_choice Fragen) ============ */

const counterExamples = [
    { item_de: 'Stifte',         item_en: 'pens',         counter: 'hon' },
    { item_de: 'Flaschen',       item_en: 'bottles',      counter: 'hon' },
    { item_de: 'Bäume',          item_en: 'trees',        counter: 'hon' },
    { item_de: 'Regenschirme',   item_en: 'umbrellas',    counter: 'hon' },
    { item_de: 'Bananen',        item_en: 'bananas',      counter: 'hon' },
    { item_de: 'Papier',         item_en: 'paper',        counter: 'mai' },
    { item_de: 'Teller',         item_en: 'plates',       counter: 'mai' },
    { item_de: 'Hemden',         item_en: 'shirts',       counter: 'mai' },
    { item_de: 'Briefmarken',    item_en: 'stamps',       counter: 'mai' },
    { item_de: 'Fotos',          item_en: 'photos',       counter: 'mai' },
    { item_de: 'Katzen',         item_en: 'cats',         counter: 'hiki' },
    { item_de: 'Hunde',          item_en: 'dogs',         counter: 'hiki' },
    { item_de: 'Fische',         item_en: 'fish',         counter: 'hiki' },
    { item_de: 'Insekten',       item_en: 'insects',      counter: 'hiki' },
    { item_de: 'Autos',          item_en: 'cars',         counter: 'dai' },
    { item_de: 'Computer',       item_en: 'computers',    counter: 'dai' },
    { item_de: 'Fernseher',      item_en: 'TVs',          counter: 'dai' },
    { item_de: 'Fahrräder',      item_en: 'bicycles',     counter: 'dai' },
    { item_de: 'Bücher',         item_en: 'books',        counter: 'satsu' },
    { item_de: 'Hefte',          item_en: 'notebooks',    counter: 'satsu' },
    { item_de: 'Magazine',       item_en: 'magazines',    counter: 'satsu' },
    { item_de: 'Tassen Kaffee',  item_en: 'cups of coffee', counter: 'hai' },
    { item_de: 'Gläser Wasser',  item_en: 'glasses of water', counter: 'hai' },
    { item_de: 'Schalen Reis',   item_en: 'bowls of rice', counter: 'hai' },
    { item_de: 'Äpfel',          item_en: 'apples',       counter: 'ko' },
    { item_de: 'Eier',           item_en: 'eggs',         counter: 'ko' },
    { item_de: 'Bälle',          item_en: 'balls',        counter: 'ko' },
    { item_de: 'Steine',         item_en: 'stones',       counter: 'ko' },
    { item_de: 'Personen',       item_en: 'people',       counter: 'nin' },
    { item_de: 'Studenten',      item_en: 'students',     counter: 'nin' },
    { item_de: 'Kinder',         item_en: 'children',     counter: 'nin' }
];

/* ============ REFERENZ-INHALTE ============ */

function buildNumbersReference() {
    const ref = {};

    /* --- Grundzahlen --- */
    ref.basic_1_10 = {
        title: 'Zahlen 1–10', title_en: 'Numbers 1–10',
        html: buildBasicRefTable(basicNumbers.basic_1_10),
        html_en: buildBasicRefTable(basicNumbers.basic_1_10)
    };
    ref.basic_11_100 = {
        title: 'Zahlen 11–100', title_en: 'Numbers 11–100',
        html: buildBasicRefTable(basicNumbers.basic_11_100),
        html_en: buildBasicRefTable(basicNumbers.basic_11_100)
    };
    ref.basic_100_10000 = {
        title: 'Zahlen 100–10.000', title_en: 'Numbers 100–10,000',
        html: buildBasicRefTable(basicNumbers.basic_100_10000),
        html_en: buildBasicRefTable(basicNumbers.basic_100_10000)
    };

    /* --- Counter --- */
    Object.keys(counterData).forEach(key => {
        const c = counterData[key];
        const segId = 'counter_' + key;
        ref[segId] = {
            title: c.kanji + ' — ' + c.description,
            title_en: c.kanji + ' — ' + c.description_en,
            html: buildCounterRefHtml(c, 'de'),
            html_en: buildCounterRefHtml(c, 'en')
        };
    });

    return ref;
}

function buildBasicRefTable(numbers) {
    let html = '<table class="ref-table"><tr><th>#</th><th>Kanji</th><th>Kana</th><th>Romaji</th></tr>';
    numbers.forEach(num => {
        html += '<tr><td>' + num.n + '</td><td>' + num.kanji + '</td><td>' + num.reading + '</td><td>' + num.romaji + '</td></tr>';
        if (num.alt_reading) {
            html += '<tr><td></td><td></td><td>' + num.alt_reading + '</td><td>' + num.alt_romaji + '</td></tr>';
        }
    });
    html += '</table>';
    return html;
}

function buildCounterRefHtml(counter, lang) {
    const useLbl = lang === 'en' ? 'Used for' : 'Verwendet für';
    const useText = lang === 'en' ? counter.use_en : counter.use_de;
    const exLbl = lang === 'en' ? 'Examples' : 'Beispiele';

    let html = '<p><strong>' + useLbl + ':</strong> ' + useText + '</p>';
    html += '<table class="ref-table"><tr><th>#</th><th>Kana</th><th>Romaji</th></tr>';
    counter.items.forEach(item => {
        html += '<tr><td>' + item.n + '</td><td>' + item.reading + '</td><td>' + item.romaji + '</td></tr>';
    });
    html += '</table>';

    if (counter.examples && counter.examples.length > 0) {
        html += '<p><strong>' + exLbl + ':</strong></p><ul>';
        counter.examples.forEach(ex => {
            const translation = lang === 'en' ? ex.en : ex.de;
            html += '<li>' + ex.jp + '<br><em>' + translation + '</em></li>';
        });
        html += '</ul>';
    }
    return html;
}

const numbersReference = buildNumbersReference();

/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* location-map-data.js — Daten für Stadtkarte-Modul.
   Gebäude (korrigierte SVG-Koordinaten), Richtungsdaten, Beschreibungs-Fragen.
   Navigations-Fragen werden dynamisch generiert (kein navQuestions-Array). */

/* ============ SVG-LAYOUT ============
   viewBox: 0 0 610 430
   Straßen vertikal:   x=193..227  (Mitte x=210)
   Straßen vertikal:   x=388..422  (Mitte x=405)
   Straßen horizontal: y=143..177  (Mitte y=160)
   Straßen horizontal: y=288..322  (Mitte y=305)

   Gebäude-Blöcke:
     col0: x=5..188    col1: x=232..383   col2: x=427..605
     row0: y=5..138    row1: y=182..283   row2: y=327..425

   Kreuzungs-Grid → SVG-Pixel:
     gridX: 0→10,  1→210, 2→405, 3→600
     gridY: 0→10,  1→160, 2→305, 3→430

   Gebäude-Ecken in Grid-Koordinaten:
     eki:         (0,0)(1,0)(0,1)(1,1)
     gakkou:      (1,0)(2,0)(1,1)(2,1)
     konbini:     (2,0)(3,0)(2,1)(3,1)
     byouin:      (0,1)(1,1)(0,2)(1,2)
     kouen:       (1,1)(2,1)(1,2)(2,2)
     ginkou:      (2,1)(3,1)(2,2)(3,2)
     yuubinkyoku: (0,2)(1,2)(0,3)(1,3)
     toshokan:    (1,2)(2,2)(1,3)(2,3)
   ============ */

/* ============ GEBÄUDE ============ */

const mapBuildings = [
    { id: 'eki',         jp: '駅',      romaji: 'Eki',        de: 'Bahnhof',    de_nav: 'zum Bahnhof',       en: 'Station',           color: '#4a90d9', col: 0, row: 0, x: 5,   y: 5,   w: 183, h: 133 },
    { id: 'gakkou',      jp: '学校',    romaji: 'Gakkō',      de: 'Schule',     de_nav: 'zur Schule',        en: 'School',            color: '#e67e22', col: 1, row: 0, x: 232, y: 5,   w: 151, h: 133 },
    { id: 'konbini',     jp: 'コンビニ', romaji: 'Konbini',    de: 'Konbini',    de_nav: 'zum Konbini',       en: 'Convenience Store', color: '#27ae60', col: 2, row: 0, x: 427, y: 5,   w: 178, h: 133 },
    { id: 'byouin',      jp: '病院',    romaji: 'Byōin',      de: 'Krankenhaus',de_nav: 'zum Krankenhaus',   en: 'Hospital',          color: '#e74c3c', col: 0, row: 1, x: 5,   y: 182, w: 183, h: 101 },
    { id: 'kouen',       jp: '公園',    romaji: 'Kōen',       de: 'Park',       de_nav: 'zum Park',          en: 'Park',              color: '#2ecc71', col: 1, row: 1, x: 232, y: 182, w: 151, h: 101 },
    { id: 'ginkou',      jp: '銀行',    romaji: 'Ginkō',      de: 'Bank',       de_nav: 'zur Bank',          en: 'Bank',              color: '#9b59b6', col: 2, row: 1, x: 427, y: 182, w: 178, h: 101 },
    { id: 'yuubinkyoku', jp: '郵便局',  romaji: 'Yūbinkyoku', de: 'Postamt',    de_nav: 'zum Postamt',       en: 'Post Office',       color: '#f39c12', col: 0, row: 2, x: 5,   y: 327, w: 183, h: 98  },
    { id: 'toshokan',    jp: '図書館',  romaji: 'Toshokan',   de: 'Bibliothek', de_nav: 'zur Bibliothek',    en: 'Library',           color: '#16a085', col: 1, row: 2, x: 232, y: 327, w: 151, h: 98  }
];

/* ============ RICHTUNGEN ============ */

const directionData = {
    migi:    { jp: 'みぎ',    romaji: 'migi',    key: 'locMap.dir.migi',    dx: 1,  dy: 0  },
    hidari:  { jp: 'ひだり',  romaji: 'hidari',  key: 'locMap.dir.hidari',  dx: -1, dy: 0  },
    massugu: { jp: 'まっすぐ', romaji: 'massugu', key: 'locMap.dir.massugu', dx: 0,  dy: -1 },
    modoru:  { jp: 'もどる',  romaji: 'modoru',  key: 'locMap.dir.modoru',  dx: 0,  dy: 1  }
};

/* ============ BESCHREIBUNGS-FRAGEN ============ */

const descQuestions = [
    {
        id: 'desc_01',
        highlightBuilding: 'eki',
        question_jp: '駅の右に何がありますか？',
        question_romaji: 'Eki no migi ni nani ga arimasu ka?',
        question_de: 'Was ist rechts vom Bahnhof?',
        question_en: 'What is to the right of the Station?',
        correctId: 'gakkou',
        choices: ['gakkou', 'byouin', 'konbini', 'kouen'],
        explanation_de: '学校 (Schule) ist rechts vom Bahnhof (駅).',
        explanation_en: '学校 (School) is to the right of the Station (駅).'
    },
    {
        id: 'desc_02',
        highlightBuilding: 'konbini',
        question_jp: 'コンビニの左に何がありますか？',
        question_romaji: 'Konbini no hidari ni nani ga arimasu ka?',
        question_de: 'Was ist links vom Konbini?',
        question_en: 'What is to the left of the Convenience Store?',
        correctId: 'gakkou',
        choices: ['gakkou', 'eki', 'ginkou', 'kouen'],
        explanation_de: '学校 (Schule) ist links vom Konbini.',
        explanation_en: '学校 (School) is to the left of the Convenience Store.'
    },
    {
        id: 'desc_03',
        highlightBuilding: 'byouin',
        question_jp: '病院の右に何がありますか？',
        question_romaji: 'Byōin no migi ni nani ga arimasu ka?',
        question_de: 'Was ist rechts vom Krankenhaus?',
        question_en: 'What is to the right of the Hospital?',
        correctId: 'kouen',
        choices: ['kouen', 'eki', 'gakkou', 'ginkou'],
        explanation_de: '公園 (Park) ist rechts vom Krankenhaus (病院).',
        explanation_en: '公園 (Park) is to the right of the Hospital (病院).'
    },
    {
        id: 'desc_04',
        highlightBuilding: 'gakkou',
        question_jp: '学校の下に何がありますか？',
        question_romaji: 'Gakkō no shita ni nani ga arimasu ka?',
        question_de: 'Was ist unter der Schule?',
        question_en: 'What is below the School?',
        correctId: 'kouen',
        choices: ['kouen', 'byouin', 'toshokan', 'ginkou'],
        explanation_de: '公園 (Park) ist unter der Schule (学校).',
        explanation_en: '公園 (Park) is below the School (学校).'
    },
    {
        id: 'desc_05',
        highlightBuilding: 'kouen',
        question_jp: '公園の左に何がありますか？',
        question_romaji: 'Kōen no hidari ni nani ga arimasu ka?',
        question_de: 'Was ist links vom Park?',
        question_en: 'What is to the left of the Park?',
        correctId: 'byouin',
        choices: ['byouin', 'eki', 'ginkou', 'yuubinkyoku'],
        explanation_de: '病院 (Krankenhaus) ist links vom Park (公園).',
        explanation_en: '病院 (Hospital) is to the left of the Park (公園).'
    },
    {
        id: 'desc_06',
        highlightBuilding: 'ginkou',
        question_jp: '銀行の左に何がありますか？',
        question_romaji: 'Ginkō no hidari ni nani ga arimasu ka?',
        question_de: 'Was ist links von der Bank?',
        question_en: 'What is to the left of the Bank?',
        correctId: 'kouen',
        choices: ['kouen', 'gakkou', 'byouin', 'toshokan'],
        explanation_de: '公園 (Park) ist links von der Bank (銀行).',
        explanation_en: '公園 (Park) is to the left of the Bank (銀行).'
    },
    {
        id: 'desc_07',
        highlightBuilding: 'yuubinkyoku',
        question_jp: '郵便局の右に何がありますか？',
        question_romaji: 'Yūbinkyoku no migi ni nani ga arimasu ka?',
        question_de: 'Was ist rechts vom Postamt?',
        question_en: 'What is to the right of the Post Office?',
        correctId: 'toshokan',
        choices: ['toshokan', 'kouen', 'byouin', 'ginkou'],
        explanation_de: '図書館 (Bibliothek) ist rechts vom Postamt (郵便局).',
        explanation_en: '図書館 (Library) is to the right of the Post Office (郵便局).'
    },
    {
        id: 'desc_08',
        highlightBuilding: 'toshokan',
        question_jp: '図書館の上に何がありますか？',
        question_romaji: 'Toshokan no ue ni nani ga arimasu ka?',
        question_de: 'Was ist über der Bibliothek?',
        question_en: 'What is above the Library?',
        correctId: 'kouen',
        choices: ['kouen', 'gakkou', 'byouin', 'yuubinkyoku'],
        explanation_de: '公園 (Park) ist über der Bibliothek (図書館).',
        explanation_en: '公園 (Park) is above the Library (図書館).'
    },
    {
        id: 'desc_09',
        highlightBuilding: 'eki',
        question_jp: '駅の下に何がありますか？',
        question_romaji: 'Eki no shita ni nani ga arimasu ka?',
        question_de: 'Was ist unter dem Bahnhof?',
        question_en: 'What is below the Station?',
        correctId: 'byouin',
        choices: ['byouin', 'kouen', 'yuubinkyoku', 'gakkou'],
        explanation_de: '病院 (Krankenhaus) ist unter dem Bahnhof (駅).',
        explanation_en: '病院 (Hospital) is below the Station (駅).'
    },
    {
        id: 'desc_10',
        highlightBuilding: 'konbini',
        question_jp: 'コンビニの下に何がありますか？',
        question_romaji: 'Konbini no shita ni nani ga arimasu ka?',
        question_de: 'Was ist unter dem Konbini?',
        question_en: 'What is below the Convenience Store?',
        correctId: 'ginkou',
        choices: ['ginkou', 'kouen', 'toshokan', 'gakkou'],
        explanation_de: '銀行 (Bank) ist unter dem Konbini.',
        explanation_en: '銀行 (Bank) is below the Convenience Store.'
    },
    {
        id: 'desc_11',
        highlightBuilding: 'byouin',
        question_jp: '病院の上に何がありますか？',
        question_romaji: 'Byōin no ue ni nani ga arimasu ka?',
        question_de: 'Was ist über dem Krankenhaus?',
        question_en: 'What is above the Hospital?',
        correctId: 'eki',
        choices: ['eki', 'gakkou', 'yuubinkyoku', 'konbini'],
        explanation_de: '駅 (Bahnhof) ist über dem Krankenhaus (病院).',
        explanation_en: '駅 (Station) is above the Hospital (病院).'
    },
    {
        id: 'desc_12',
        highlightBuilding: 'ginkou',
        question_jp: '銀行の上に何がありますか？',
        question_romaji: 'Ginkō no ue ni nani ga arimasu ka?',
        question_de: 'Was ist über der Bank?',
        question_en: 'What is above the Bank?',
        correctId: 'konbini',
        choices: ['konbini', 'gakkou', 'eki', 'kouen'],
        explanation_de: 'コンビニ ist über der Bank (銀行).',
        explanation_en: 'The Convenience Store is above the Bank (銀行).'
    }
];

/* ============ NACHSCHLAG-REFERENZ ============ */

const locationMapReference = {
    richtungen: {
        title: 'Richtungsw\u00f6rter',
        title_en: 'Direction Words',
        html: '<table class="ref-table"><thead><tr><th>Japanisch</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>みぎ</td><td>migi</td><td>rechts</td></tr>' +
            '<tr><td>ひだり</td><td>hidari</td><td>links</td></tr>' +
            '<tr><td>まっすぐ</td><td>massugu</td><td>geradeaus</td></tr>' +
            '<tr><td>もどる</td><td>modoru</td><td>zur&uuml;ck / umkehren</td></tr>' +
            '</tbody></table>' +
            '<p><strong>Navigation:</strong> W&auml;hle bei jedem Schritt die richtige Richtung, um zum Ziel zu gelangen.</p>',
        html_en: '<table class="ref-table"><thead><tr><th>Japanese</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>みぎ</td><td>migi</td><td>right</td></tr>' +
            '<tr><td>ひだり</td><td>hidari</td><td>left</td></tr>' +
            '<tr><td>まっすぐ</td><td>massugu</td><td>straight ahead</td></tr>' +
            '<tr><td>もどる</td><td>modoru</td><td>go back / return</td></tr>' +
            '</tbody></table>' +
            '<p><strong>Navigation:</strong> Choose the correct direction at each step to reach your destination.</p>'
    },
    gebaeude: {
        title: 'Geb\u00e4ude',
        title_en: 'Buildings',
        html: '<table class="ref-table"><thead><tr><th>Kanji</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>駅</td><td>Eki</td><td>Bahnhof</td></tr>' +
            '<tr><td>学校</td><td>Gakk&omacr;</td><td>Schule</td></tr>' +
            '<tr><td>コンビニ</td><td>Konbini</td><td>Konbini</td></tr>' +
            '<tr><td>病院</td><td>By&omacr;in</td><td>Krankenhaus</td></tr>' +
            '<tr><td>公園</td><td>K&omacr;en</td><td>Park</td></tr>' +
            '<tr><td>銀行</td><td>Gink&omacr;</td><td>Bank</td></tr>' +
            '<tr><td>郵便局</td><td>Y&umacr;binkyoku</td><td>Postamt</td></tr>' +
            '<tr><td>図書館</td><td>Toshokan</td><td>Bibliothek</td></tr>' +
            '</tbody></table>',
        html_en: '<table class="ref-table"><thead><tr><th>Kanji</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>駅</td><td>Eki</td><td>Station</td></tr>' +
            '<tr><td>学校</td><td>Gakk&omacr;</td><td>School</td></tr>' +
            '<tr><td>コンビニ</td><td>Konbini</td><td>Convenience Store</td></tr>' +
            '<tr><td>病院</td><td>By&omacr;in</td><td>Hospital</td></tr>' +
            '<tr><td>公園</td><td>K&omacr;en</td><td>Park</td></tr>' +
            '<tr><td>銀行</td><td>Gink&omacr;</td><td>Bank</td></tr>' +
            '<tr><td>郵便局</td><td>Y&umacr;binkyoku</td><td>Post Office</td></tr>' +
            '<tr><td>図書館</td><td>Toshokan</td><td>Library</td></tr>' +
            '</tbody></table>'
    },
    fragen: {
        title: 'Frageform',
        title_en: 'Question Pattern',
        html: '<ul>' +
            '<li><strong>Muster:</strong> [Geb&auml;ude] の [Richtung] に 何がありますか？</li>' +
            '<li>駅<strong>の右に</strong>何がありますか？ = Was ist <strong>rechts vom</strong> Bahnhof?</li>' +
            '<li>学校<strong>の下に</strong>何がありますか？ = Was ist <strong>unter</strong> der Schule?</li>' +
            '<li><strong>上 (ue)</strong> = oben / &uuml;ber &bull; <strong>下 (shita)</strong> = unten / unter</li>' +
            '<li><strong>右 (migi)</strong> = rechts &bull; <strong>左 (hidari)</strong> = links</li>' +
            '</ul>',
        html_en: '<ul>' +
            '<li><strong>Pattern:</strong> [Building] の [Direction] に 何がありますか？</li>' +
            '<li>駅<strong>の右に</strong>何がありますか？ = What is <strong>to the right of</strong> the Station?</li>' +
            '<li>学校<strong>の下に</strong>何がありますか？ = What is <strong>below</strong> the School?</li>' +
            '<li><strong>上 (ue)</strong> = above &bull; <strong>下 (shita)</strong> = below</li>' +
            '<li><strong>右 (migi)</strong> = right &bull; <strong>左 (hidari)</strong> = left</li>' +
            '</ul>'
    }
};

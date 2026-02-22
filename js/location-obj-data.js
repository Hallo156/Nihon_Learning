/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* location-obj-data.js — Daten für Gegenstand-Position-Modul.
   9 Positionen mit SVG-Koordinaten für Ball und Hit-Areas (Zeigen-Modus). */

/* ============ POSITIONS-DATEN ============ */

const locationObjPositions = [
    {
        id: 'auf_tisch',
        jp: 'テーブルの上に',
        romaji: 'teburu no ue ni',
        de: 'auf dem Tisch',
        en: 'on the table',
        ballCx: 250, ballCy: 185,
        hitX: 205, hitY: 165, hitW: 90, hitH: 40
    },
    {
        id: 'unter_tisch',
        jp: 'テーブルの下に',
        romaji: 'teburu no shita ni',
        de: 'unter dem Tisch',
        en: 'under the table',
        ballCx: 250, ballCy: 268,
        hitX: 205, hitY: 248, hitW: 90, hitH: 50
    },
    {
        id: 'neben_box',
        jp: '箱の横に',
        romaji: 'hako no yoko ni',
        de: 'neben der Box',
        en: 'beside the box',
        ballCx: 145, ballCy: 262,
        hitX: 112, hitY: 238, hitW: 60, hitH: 54,
        alsoAccept: ['zwischen']
    },
    {
        id: 'vor_box',
        jp: '箱の前に',
        romaji: 'hako no mae ni',
        de: 'vor der Box',
        en: 'in front of the box',
        ballCx: 70, ballCy: 320,
        hitX: 44, hitY: 300, hitW: 52, hitH: 50
    },
    {
        id: 'hinter_box',
        jp: '箱の後ろに',
        romaji: 'hako no ushiro ni',
        de: 'hinter der Box',
        en: 'behind the box',
        ballCx: 70, ballCy: 249,
        hitX: 44, hitY: 220, hitW: 52, hitH: 46
    },
    {
        id: 'neben_regal',
        jp: '棚の横に',
        romaji: 'tana no yoko ni',
        de: 'neben dem Regal',
        en: 'beside the shelf',
        ballCx: 368, ballCy: 190,
        hitX: 340, hitY: 170, hitW: 44, hitH: 46
    },
    {
        id: 'vor_regal',
        jp: '棚の前に',
        romaji: 'tana no mae ni',
        de: 'vor dem Regal',
        en: 'in front of the shelf',
        ballCx: 430, ballCy: 316,
        hitX: 404, hitY: 296, hitW: 52, hitH: 50
    },
    {
        id: 'zwischen',
        jp: '箱とテーブルの間に',
        romaji: 'hako to teburu no aida ni',
        de: 'zwischen Box und Tisch',
        en: 'between the box and table',
        ballCx: 132, ballCy: 262,
        hitX: 112, hitY: 238, hitW: 60, hitH: 54,
        alsoAccept: ['neben_box']
    },
    {
        id: 'auf_regal',
        jp: '棚の上に',
        romaji: 'tana no ue ni',
        de: 'auf dem Regal',
        en: 'on the shelf',
        ballCx: 430, ballCy: 116,
        hitX: 404, hitY: 96, hitW: 52, hitH: 46
    },
    {
        id: 'in_regal',
        jp: '棚の中に',
        romaji: 'tana no naka ni',
        de: 'im Regal',
        en: 'in the shelf',
        ballCx: 430, ballCy: 205,
        hitX: 404, hitY: 188, hitW: 52, hitH: 38
    }
];

/* ============ NACHSCHLAG-REFERENZ ============ */

const locationObjReference = {
    positions: {
        title: 'Positionsw\u00f6rter',
        title_en: 'Position Words',
        html: '<table class="ref-table"><thead><tr><th>Japanisch</th><th>Romaji</th><th>Bedeutung</th></tr></thead><tbody>' +
            '<tr><td>上 (うえ)</td><td>ue</td><td>oben / auf</td></tr>' +
            '<tr><td>下 (した)</td><td>shita</td><td>unten / unter</td></tr>' +
            '<tr><td>前 (まえ)</td><td>mae</td><td>vorne / vor</td></tr>' +
            '<tr><td>後ろ (うしろ)</td><td>ushiro</td><td>hinten / hinter</td></tr>' +
            '<tr><td>横 (よこ)</td><td>yoko</td><td>neben / seitlich</td></tr>' +
            '<tr><td>中 (なか)</td><td>naka</td><td>innen / in</td></tr>' +
            '<tr><td>間 (あいだ)</td><td>aida</td><td>zwischen</td></tr>' +
            '</tbody></table>',
        html_en: '<table class="ref-table"><thead><tr><th>Japanese</th><th>Romaji</th><th>Meaning</th></tr></thead><tbody>' +
            '<tr><td>上 (うえ)</td><td>ue</td><td>above / on</td></tr>' +
            '<tr><td>下 (した)</td><td>shita</td><td>below / under</td></tr>' +
            '<tr><td>前 (まえ)</td><td>mae</td><td>in front of</td></tr>' +
            '<tr><td>後ろ (うしろ)</td><td>ushiro</td><td>behind</td></tr>' +
            '<tr><td>横 (よこ)</td><td>yoko</td><td>beside / next to</td></tr>' +
            '<tr><td>中 (なか)</td><td>naka</td><td>inside / in</td></tr>' +
            '<tr><td>間 (あいだ)</td><td>aida</td><td>between</td></tr>' +
            '</tbody></table>'
    },
    muster: {
        title: 'Satzmuster',
        title_en: 'Sentence Patterns',
        html: '<ul>' +
            '<li><strong>Grundmuster:</strong> [Objekt] の [Position] に あります</li>' +
            '<li>テーブル<strong>の上に</strong>あります = Es ist <strong>auf dem Tisch</strong></li>' +
            '<li>箱<strong>の前に</strong>あります = Es ist <strong>vor der Box</strong></li>' +
            '<li>棚<strong>の中に</strong>あります = Es ist <strong>im Regal</strong></li>' +
            '<li>箱<strong>と</strong>テーブル<strong>の間に</strong>あります = Es ist <strong>zwischen</strong> Box <strong>und</strong> Tisch</li>' +
            '</ul>' +
            '<p><strong>Objekte in dieser &Uuml;bung:</strong></p>' +
            '<ul><li>テーブル (t&emacr;buru) = Tisch</li><li>箱 (hako) = Box</li><li>棚 (tana) = Regal</li><li>ボール (b&omacr;ru) = Ball</li></ul>',
        html_en: '<ul>' +
            '<li><strong>Basic pattern:</strong> [Object] の [Position] に あります</li>' +
            '<li>テーブル<strong>の上に</strong>あります = It is <strong>on the table</strong></li>' +
            '<li>箱<strong>の前に</strong>あります = It is <strong>in front of the box</strong></li>' +
            '<li>棚<strong>の中に</strong>あります = It is <strong>in the shelf</strong></li>' +
            '<li>箱<strong>と</strong>テーブル<strong>の間に</strong>あります = It is <strong>between</strong> box <strong>and</strong> table</li>' +
            '</ul>' +
            '<p><strong>Objects in this exercise:</strong></p>' +
            '<ul><li>テーブル (t&emacr;buru) = Table</li><li>箱 (hako) = Box</li><li>棚 (tana) = Shelf</li><li>ボール (b&omacr;ru) = Ball</li></ul>'
    }
};

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

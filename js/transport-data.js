/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* transport-data.js — Verkehr & Fortbewegung: Orte, Transportmittel, Routen-Szenarien */

/* ============ ORTE ============ */
/* Jeder Ort hat ein SVG-Icon (inline, als Text-Zeichen oder einfache SVG-Form) */

const transportPlaces = [
    { id: 'home',       jp: 'いえ',         kanji: '家',          romaji: 'ie',           de: 'Zuhause',          en: 'Home',             icon: '🏠' },
    { id: 'station',    jp: 'えき',         kanji: '駅',          romaji: 'eki',          de: 'Bahnhof',          en: 'Train Station',     icon: '🚉' },
    { id: 'school',     jp: 'がっこう',     kanji: '学校',        romaji: 'gakkou',       de: 'Schule',           en: 'School',            icon: '🏫' },
    { id: 'airport',    jp: 'くうこう',     kanji: '空港',        romaji: 'kuukou',       de: 'Flughafen',        en: 'Airport',           icon: '✈️' },
    { id: 'hospital',   jp: 'びょういん',   kanji: '病院',        romaji: 'byouin',       de: 'Krankenhaus',      en: 'Hospital',          icon: '🏥' },
    { id: 'park',       jp: 'こうえん',     kanji: '公園',        romaji: 'kouen',        de: 'Park',             en: 'Park',              icon: '🌳' },
    { id: 'supermarket',jp: 'スーパー',     kanji: 'スーパー',    romaji: 'suupaa',       de: 'Supermarkt',       en: 'Supermarket',       icon: '🛒' },
    { id: 'busstop',    jp: 'バスてい',     kanji: 'バス停',      romaji: 'basutei',      de: 'Bushaltestelle',   en: 'Bus Stop',          icon: '🚌' },
    { id: 'subwaystation', jp: 'ちかてつのえき', kanji: '地下鉄の駅', romaji: 'chikatetsu no eki', de: 'U-Bahn-Station', en: 'Subway Station', icon: '🚇' },
    { id: 'hotel',      jp: 'ホテル',       kanji: 'ホテル',      romaji: 'hoteru',       de: 'Hotel',            en: 'Hotel',             icon: '🏨' },
    { id: 'office',     jp: 'かいしゃ',     kanji: '会社',        romaji: 'kaisha',       de: 'Büro / Firma',     en: 'Office / Company',  icon: '🏢' },
    { id: 'convenience',jp: 'コンビニ',     kanji: 'コンビニ',    romaji: 'konbini',      de: 'Convenience Store',en: 'Convenience Store', icon: '🏪' },
];

/* ============ TRANSPORTMITTEL ============ */
/* Jedes Transportmittel hat ein einfaches SVG-Icon-Markup */

const transportModes = [
    {
        id: 'walk',
        jp: 'あるいて',
        kanji: '歩いて',
        romaji: 'aruite',
        de: 'zu Fuß',
        en: 'on foot',
        verb_jp: 'あるきます',
        verb_kanji: '歩きます',
        verb_romaji: 'arukimasu',
        particle: 'で',
        icon: 'walk',
        color: '#4caf50'
    },
    {
        id: 'train',
        jp: 'でんしゃ',
        kanji: '電車',
        romaji: 'densha',
        de: 'Zug / Bahn',
        en: 'train',
        verb_jp: 'のります',
        verb_kanji: '乗ります',
        verb_romaji: 'norimasu',
        particle: 'で',
        icon: 'train',
        color: '#c0392b'   /* Lokomotiven-Rot */
    },
    {
        id: 'subway',
        jp: 'ちかてつ',
        kanji: '地下鉄',
        romaji: 'chikatetsu',
        de: 'U-Bahn',
        en: 'subway',
        verb_jp: 'のります',
        verb_kanji: '乗ります',
        verb_romaji: 'norimasu',
        particle: 'で',
        icon: 'subway',
        color: '#7f8c8d'   /* silbergrau für U-Bahn */
    },
    {
        id: 'bus',
        jp: 'バス',
        kanji: 'バス',
        romaji: 'basu',
        de: 'Bus',
        en: 'bus',
        verb_jp: 'のります',
        verb_kanji: '乗ります',
        verb_romaji: 'norimasu',
        particle: 'で',
        icon: 'bus',
        color: '#f5c800'   /* kräftiges Gelb für Bus */
    },
    {
        id: 'taxi',
        jp: 'タクシー',
        kanji: 'タクシー',
        romaji: 'takushii',
        de: 'Taxi',
        en: 'taxi',
        verb_jp: 'のります',
        verb_kanji: '乗ります',
        verb_romaji: 'norimasu',
        particle: 'で',
        icon: 'taxi',
        color: '#ffc107'
    },
    {
        id: 'car',
        jp: 'くるま',
        kanji: '車',
        romaji: 'kuruma',
        de: 'Auto',
        en: 'car',
        verb_jp: 'のります',
        verb_kanji: '乗ります',
        verb_romaji: 'norimasu',
        particle: 'で',
        icon: 'car',
        color: '#f44336'
    },
    {
        id: 'plane',
        jp: 'ひこうき',
        kanji: '飛行機',
        romaji: 'hikouki',
        de: 'Flugzeug',
        en: 'airplane',
        verb_jp: 'のります',
        verb_kanji: '乗ります',
        verb_romaji: 'norimasu',
        particle: 'で',
        icon: 'plane',
        color: '#00bcd4'
    },
    {
        id: 'bike',
        jp: 'じてんしゃ',
        kanji: '自転車',
        romaji: 'jitensha',
        de: 'Fahrrad',
        en: 'bicycle',
        verb_jp: 'のります',
        verb_kanji: '乗ります',
        verb_romaji: 'norimasu',
        particle: 'で',
        icon: 'bike',
        color: '#8bc34a'
    }
];

/* ============ VORGEGEBENE ROUTEN-SZENARIEN ============ */
/*
  Jede Route ist eine Kette aus abwechselnden Ort→Transport→Ort→Transport→…→Ort Elementen.
  nodes[]: Array von {type:'place'|'transport', id:string}
  Zu jeder Route gibt es Fragen (questions[]), die den Nutzer durch die Kette führen.

  Fragetypen:
    'mode'    — Welches Transportmittel wird benutzt? (Lücke auf dem Strich)
    'place'   — Welcher Ort ist das Ziel / der Startpunkt? (Lücke am Punkt)
    'verb'    — のります (einsteigen) / おります (aussteigen) Frage (kein Chain-Gap)
*/


const transportRoutes = [
    // ── Einfache Routen ──────────────────────────────────────────────────────
    {
        id: 'route_school_simple',
        label:    { de: 'Zur Schule (einfach)',      en: 'To School (simple)' },
        difficulty: 'easy',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'walk' },
            { type: 'place',     id: 'busstop' },
            { type: 'transport', id: 'bus' },
            { type: 'place',     id: 'school' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie kommt man von Zuhause zum Busbahnhof?',
                prompt_en: 'How do you get from home to the bus stop?',
                promptArgs: [],
                correct: ['あるいて', 'aruite', '歩いて'],
                correctId: 'walk',
                choices: ['walk','bus','train','taxi'],
                sentenceOptions: [
                    { modeId: 'walk',  jp: 'バスていまで　あるいて　いきます。', romaji: 'Basutei made aruite ikimasu.',  de: 'Ich gehe zu Fuß zur Bushaltestelle.',    en: 'I walk to the bus stop.' },
                    { modeId: 'bus',   jp: 'バスていまで　バスで　いきます。',   romaji: 'Basutei made basu de ikimasu.',  de: 'Ich fahre mit dem Bus zur Bushaltestelle.', en: 'I go to the bus stop by bus.' },
                    { modeId: 'train', jp: 'バスていまで　でんしゃで　いきます。',romaji: 'Basutei made densha de ikimasu.',de: 'Ich fahre mit dem Zug zur Bushaltestelle.',  en: 'I go to the bus stop by train.' },
                    { modeId: 'taxi',  jp: 'バスていまで　タクシーで　いきます。',romaji: 'Basutei made takushii de ikimasu.',de: 'Ich fahre mit dem Taxi zur Bushaltestelle.',en: 'I go to the bus stop by taxi.' }
                ],
                explanation_de: 'Von Zuhause zur Bushaltestelle geht man zu Fuß. Der Satz lautet: バスていまで あるいて いきます。',
                explanation_en: 'From home to the bus stop, you walk. The sentence is: バスていまで あるいて いきます。'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Wie fährt man von der Bushaltestelle zur Schule?',
                prompt_en: 'How do you get from the bus stop to school?',
                promptArgs: [],
                correct: ['バス', 'バスで', 'basu', 'basu de'],
                correctId: 'bus',
                choices: ['bus','train','walk','subway'],
                sentenceOptions: [
                    { modeId: 'bus',    jp: 'がっこうまで　バスで　いきます。',     romaji: 'Gakkou made basu de ikimasu.',     de: 'Ich fahre mit dem Bus zur Schule.',     en: 'I go to school by bus.' },
                    { modeId: 'train',  jp: 'がっこうまで　でんしゃで　いきます。',  romaji: 'Gakkou made densha de ikimasu.',   de: 'Ich fahre mit dem Zug zur Schule.',     en: 'I go to school by train.' },
                    { modeId: 'walk',   jp: 'がっこうまで　あるいて　いきます。',    romaji: 'Gakkou made aruite ikimasu.',      de: 'Ich gehe zu Fuß zur Schule.',           en: 'I walk to school.' },
                    { modeId: 'subway', jp: 'がっこうまで　ちかてつで　いきます。',  romaji: 'Gakkou made chikatetsu de ikimasu.',de: 'Ich fahre mit der U-Bahn zur Schule.', en: 'I go to school by subway.' }
                ],
                explanation_de: 'Von der Bushaltestelle zur Schule fährt man mit dem Bus: がっこうまで バスで いきます。',
                explanation_en: 'From the bus stop to school, you take the bus: がっこうまで バスで いきます。'
            }
        ]
    },
    {
        id: 'route_park_walk',
        label:    { de: 'In den Park (zu Fuß)',      en: 'To the Park (on foot)' },
        difficulty: 'easy',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'walk' },
            { type: 'place',     id: 'park' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie geht man von Zuhause in den Park?',
                prompt_en: 'How do you get from home to the park?',
                promptArgs: [],
                correct: ['あるいて', 'aruite', '歩いて'],
                correctId: 'walk',
                choices: ['walk','bus','train','car'],
                sentenceOptions: [
                    { modeId: 'walk',  jp: 'こうえんまで　あるいて　いきます。',   romaji: 'Kouen made aruite ikimasu.',   de: 'Ich gehe zu Fuß in den Park.',       en: 'I walk to the park.' },
                    { modeId: 'bus',   jp: 'こうえんまで　バスで　いきます。',     romaji: 'Kouen made basu de ikimasu.',  de: 'Ich fahre mit dem Bus in den Park.', en: 'I go to the park by bus.' },
                    { modeId: 'train', jp: 'こうえんまで　でんしゃで　いきます。', romaji: 'Kouen made densha de ikimasu.',de: 'Ich fahre mit dem Zug in den Park.', en: 'I go to the park by train.' },
                    { modeId: 'car',   jp: 'こうえんまで　くるまで　いきます。',   romaji: 'Kouen made kuruma de ikimasu.',de: 'Ich fahre mit dem Auto in den Park.',en: 'I go to the park by car.' }
                ],
                explanation_de: 'In den Park geht man zu Fuß: こうえんまで あるいて いきます。',
                explanation_en: 'You walk to the park: こうえんまで あるいて いきます。'
            }
        ]
    },
    {
        id: 'route_supermarket_taxi',
        label:    { de: 'Zum Supermarkt (Taxi)',     en: 'To Supermarket (taxi)' },
        difficulty: 'easy',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'taxi' },
            { type: 'place',     id: 'supermarket' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie fährt man zum Supermarkt?',
                prompt_en: 'How do you get to the supermarket?',
                promptArgs: [],
                correct: ['タクシー', 'タクシーで', 'takushii', 'takushii de'],
                correctId: 'taxi',
                choices: ['taxi','walk','bus','bike'],
                sentenceOptions: [
                    { modeId: 'taxi',  jp: 'スーパーまで　タクシーで　いきます。',  romaji: 'Suupaa made takushii de ikimasu.',  de: 'Ich fahre mit dem Taxi zum Supermarkt.',    en: 'I go to the supermarket by taxi.' },
                    { modeId: 'walk',  jp: 'スーパーまで　あるいて　いきます。',    romaji: 'Suupaa made aruite ikimasu.',        de: 'Ich gehe zu Fuß zum Supermarkt.',           en: 'I walk to the supermarket.' },
                    { modeId: 'bus',   jp: 'スーパーまで　バスで　いきます。',      romaji: 'Suupaa made basu de ikimasu.',       de: 'Ich fahre mit dem Bus zum Supermarkt.',     en: 'I go to the supermarket by bus.' },
                    { modeId: 'bike',  jp: 'スーパーまで　じてんしゃで　いきます。',romaji: 'Suupaa made jitensha de ikimasu.',   de: 'Ich fahre mit dem Fahrrad zum Supermarkt.',en: 'I go to the supermarket by bike.' }
                ],
                explanation_de: 'Mit dem Taxi zum Supermarkt: スーパーまで タクシーで いきます。',
                explanation_en: 'By taxi to the supermarket: スーパーまで タクシーで いきます。'
            }
        ]
    },

    // ── Mittlere Routen ──────────────────────────────────────────────────────
    {
        id: 'route_office_train',
        label:    { de: 'Zur Arbeit (Zug)',          en: 'To Work (train)' },
        difficulty: 'medium',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'walk' },
            { type: 'place',     id: 'station' },
            { type: 'transport', id: 'train' },
            { type: 'place',     id: 'office' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie kommt man von Zuhause zum Bahnhof?',
                prompt_en: 'How do you get from home to the station?',
                promptArgs: [],
                correct: ['あるいて', 'aruite', '歩いて'],
                correctId: 'walk',
                choices: ['walk','taxi','bus','bike'],
                sentenceOptions: [
                    { modeId: 'walk',  jp: 'えきまで　あるいて　いきます。',      romaji: 'Eki made aruite ikimasu.',      de: 'Ich gehe zu Fuß zum Bahnhof.',        en: 'I walk to the station.' },
                    { modeId: 'taxi',  jp: 'えきまで　タクシーで　いきます。',    romaji: 'Eki made takushii de ikimasu.',  de: 'Ich fahre mit dem Taxi zum Bahnhof.', en: 'I go to the station by taxi.' },
                    { modeId: 'bus',   jp: 'えきまで　バスで　いきます。',        romaji: 'Eki made basu de ikimasu.',      de: 'Ich fahre mit dem Bus zum Bahnhof.',  en: 'I go to the station by bus.' },
                    { modeId: 'bike',  jp: 'えきまで　じてんしゃで　いきます。',  romaji: 'Eki made jitensha de ikimasu.',  de: 'Ich fahre mit dem Fahrrad zum Bahnhof.',en: 'I go to the station by bike.' }
                ],
                explanation_de: 'Zum Bahnhof geht man zu Fuß: えきまで あるいて いきます。',
                explanation_en: 'You walk to the station: えきまで あるいて いきます。'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Wie fährt man vom Bahnhof zur Firma?',
                prompt_en: 'How do you get from the station to the office?',
                promptArgs: [],
                correct: ['でんしゃ', '電車', 'densha', 'でんしゃで', 'densha de'],
                correctId: 'train',
                choices: ['train','subway','bus','car'],
                sentenceOptions: [
                    { modeId: 'train',  jp: 'かいしゃまで　でんしゃで　いきます。',  romaji: 'Kaisha made densha de ikimasu.',    de: 'Ich fahre mit dem Zug zur Firma.',      en: 'I go to the office by train.' },
                    { modeId: 'subway', jp: 'かいしゃまで　ちかてつで　いきます。',  romaji: 'Kaisha made chikatetsu de ikimasu.',de: 'Ich fahre mit der U-Bahn zur Firma.',   en: 'I go to the office by subway.' },
                    { modeId: 'bus',    jp: 'かいしゃまで　バスで　いきます。',      romaji: 'Kaisha made basu de ikimasu.',       de: 'Ich fahre mit dem Bus zur Firma.',      en: 'I go to the office by bus.' },
                    { modeId: 'car',    jp: 'かいしゃまで　くるまで　いきます。',    romaji: 'Kaisha made kuruma de ikimasu.',     de: 'Ich fahre mit dem Auto zur Firma.',     en: 'I go to the office by car.' }
                ],
                explanation_de: 'Mit dem Zug zur Firma: かいしゃまで でんしゃで いきます。',
                explanation_en: 'By train to the office: かいしゃまで でんしゃで いきます。'
            }
        ]
    },
    {
        id: 'route_hospital_subway',
        label:    { de: 'Zum Krankenhaus (U-Bahn)', en: 'To Hospital (subway)' },
        difficulty: 'medium',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'walk' },
            { type: 'place',     id: 'subwaystation' },
            { type: 'transport', id: 'subway' },
            { type: 'place',     id: 'hospital' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie kommt man zur U-Bahn-Station?',
                prompt_en: 'How do you reach the subway station?',
                promptArgs: [],
                correct: ['あるいて', 'aruite', '歩いて'],
                correctId: 'walk',
                choices: ['walk','bus','car','taxi'],
                sentenceOptions: [
                    { modeId: 'walk',  jp: 'ちかてつのえきまで　あるいて　いきます。',  romaji: 'Chikatetsu no eki made aruite ikimasu.',   de: 'Ich gehe zu Fuß zur U-Bahn-Station.',        en: 'I walk to the subway station.' },
                    { modeId: 'bus',   jp: 'ちかてつのえきまで　バスで　いきます。',    romaji: 'Chikatetsu no eki made basu de ikimasu.',  de: 'Ich fahre mit dem Bus zur U-Bahn-Station.',  en: 'I go to the subway station by bus.' },
                    { modeId: 'car',   jp: 'ちかてつのえきまで　くるまで　いきます。',  romaji: 'Chikatetsu no eki made kuruma de ikimasu.',de: 'Ich fahre mit dem Auto zur U-Bahn-Station.', en: 'I go to the subway station by car.' },
                    { modeId: 'taxi',  jp: 'ちかてつのえきまで　タクシーで　いきます。',romaji: 'Chikatetsu no eki made takushii de ikimasu.',de: 'Ich fahre mit dem Taxi zur U-Bahn-Station.', en: 'I go to the subway station by taxi.' }
                ],
                explanation_de: 'Zur U-Bahn-Station geht man zu Fuß: ちかてつのえきまで あるいて いきます。',
                explanation_en: 'You walk to the subway station: ちかてつのえきまで あるいて いきます。'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Wie fährt man zum Krankenhaus?',
                prompt_en: 'How do you get to the hospital?',
                promptArgs: [],
                correct: ['ちかてつ', '地下鉄', 'chikatetsu', 'ちかてつで', 'chikatetsu de'],
                correctId: 'subway',
                choices: ['subway','train','bus','taxi'],
                sentenceOptions: [
                    { modeId: 'subway', jp: 'びょういんまで　ちかてつで　いきます。',  romaji: 'Byouin made chikatetsu de ikimasu.',de: 'Ich fahre mit der U-Bahn zum Krankenhaus.',en: 'I go to the hospital by subway.' },
                    { modeId: 'train',  jp: 'びょういんまで　でんしゃで　いきます。',  romaji: 'Byouin made densha de ikimasu.',    de: 'Ich fahre mit dem Zug zum Krankenhaus.',   en: 'I go to the hospital by train.' },
                    { modeId: 'bus',    jp: 'びょういんまで　バスで　いきます。',      romaji: 'Byouin made basu de ikimasu.',      de: 'Ich fahre mit dem Bus zum Krankenhaus.',   en: 'I go to the hospital by bus.' },
                    { modeId: 'taxi',   jp: 'びょういんまで　タクシーで　いきます。',  romaji: 'Byouin made takushii de ikimasu.',  de: 'Ich fahre mit dem Taxi zum Krankenhaus.',  en: 'I go to the hospital by taxi.' }
                ],
                explanation_de: 'Mit der U-Bahn zum Krankenhaus: びょういんまで ちかてつで いきます。',
                explanation_en: 'By subway to the hospital: びょういんまで ちかてつで いきます。'
            }
        ]
    },
    {
        id: 'route_bike_konbini',
        label:    { de: 'Zum Konbini (Fahrrad)',    en: 'To Convenience Store (bike)' },
        difficulty: 'easy',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'bike' },
            { type: 'place',     id: 'convenience' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie fährt man zum Konbini?',
                prompt_en: 'How do you get to the convenience store?',
                promptArgs: [],
                correct: ['じてんしゃ', '自転車', 'jitensha', 'じてんしゃで', 'jitensha de'],
                correctId: 'bike',
                choices: ['bike','walk','bus','car'],
                sentenceOptions: [
                    { modeId: 'bike',  jp: 'コンビニまで　じてんしゃで　いきます。',romaji: 'Konbini made jitensha de ikimasu.',de: 'Ich fahre mit dem Fahrrad zum Konbini.',en: 'I go to the convenience store by bike.' },
                    { modeId: 'walk',  jp: 'コンビニまで　あるいて　いきます。',    romaji: 'Konbini made aruite ikimasu.',    de: 'Ich gehe zu Fuß zum Konbini.',          en: 'I walk to the convenience store.' },
                    { modeId: 'bus',   jp: 'コンビニまで　バスで　いきます。',      romaji: 'Konbini made basu de ikimasu.',   de: 'Ich fahre mit dem Bus zum Konbini.',    en: 'I go to the convenience store by bus.' },
                    { modeId: 'car',   jp: 'コンビニまで　くるまで　いきます。',    romaji: 'Konbini made kuruma de ikimasu.', de: 'Ich fahre mit dem Auto zum Konbini.',   en: 'I go to the convenience store by car.' }
                ],
                explanation_de: 'Mit dem Fahrrad zum Konbini: コンビニまで じてんしゃで いきます。',
                explanation_en: 'By bike to the convenience store: コンビニまで じてんしゃで いきます。'
            }
        ]
    },

    // ── Flugzeug-Routen ───────────────────────────────────────────────────────
    {
        id: 'route_plane_simple',
        label:    { de: 'Mit dem Flugzeug (einfach)',  en: 'By Airplane (simple)' },
        difficulty: 'easy',
        nodes: [
            { type: 'place',     id: 'airport' },
            { type: 'transport', id: 'plane' },
            { type: 'place',     id: 'hotel' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Womit reist man vom Flughafen zum Hotel?',
                prompt_en: 'How do you travel from the airport to the hotel?',
                promptArgs: [],
                correct: ['ひこうき', '飛行機', 'hikouki', 'ひこうきで', 'hikouki de'],
                correctId: 'plane',
                choices: ['plane','train','bus','taxi'],
                sentenceOptions: [
                    { modeId: 'plane', jp: 'ホテルまで　ひこうきで　いきます。',   romaji: 'Hoteru made hikouki de ikimasu.',   de: 'Ich fliege mit dem Flugzeug zum Hotel.',  en: 'I go to the hotel by airplane.' },
                    { modeId: 'train', jp: 'ホテルまで　でんしゃで　いきます。',   romaji: 'Hoteru made densha de ikimasu.',    de: 'Ich fahre mit dem Zug zum Hotel.',        en: 'I go to the hotel by train.' },
                    { modeId: 'bus',   jp: 'ホテルまで　バスで　いきます。',       romaji: 'Hoteru made basu de ikimasu.',      de: 'Ich fahre mit dem Bus zum Hotel.',        en: 'I go to the hotel by bus.' },
                    { modeId: 'taxi',  jp: 'ホテルまで　タクシーで　いきます。',   romaji: 'Hoteru made takushii de ikimasu.', de: 'Ich fahre mit dem Taxi zum Hotel.',       en: 'I go to the hotel by taxi.' }
                ],
                explanation_de: 'Mit dem Flugzeug zum Hotel: ホテルまで ひこうきで いきます。',
                explanation_en: 'By airplane to the hotel: ホテルまで ひこうきで いきます。'
            }
        ]
    },
    {
        id: 'route_plane_medium',
        label:    { de: 'Flugreise (mit Umsteigen)',   en: 'Flight Trip (with transfer)' },
        difficulty: 'medium',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'taxi' },
            { type: 'place',     id: 'airport' },
            { type: 'transport', id: 'plane' },
            { type: 'place',     id: 'hotel' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Womit fährt man von Zuhause zum Flughafen?',
                prompt_en: 'How do you get from home to the airport?',
                promptArgs: [],
                correct: ['タクシー', 'takushii', 'タクシーで', 'takushii de'],
                correctId: 'taxi',
                choices: ['taxi','bus','train','car'],
                sentenceOptions: [
                    { modeId: 'taxi',  jp: 'くうこうまで　タクシーで　いきます。',  romaji: 'Kuukou made takushii de ikimasu.',  de: 'Ich fahre mit dem Taxi zum Flughafen.',   en: 'I go to the airport by taxi.' },
                    { modeId: 'bus',   jp: 'くうこうまで　バスで　いきます。',      romaji: 'Kuukou made basu de ikimasu.',      de: 'Ich fahre mit dem Bus zum Flughafen.',    en: 'I go to the airport by bus.' },
                    { modeId: 'train', jp: 'くうこうまで　でんしゃで　いきます。',  romaji: 'Kuukou made densha de ikimasu.',    de: 'Ich fahre mit dem Zug zum Flughafen.',    en: 'I go to the airport by train.' },
                    { modeId: 'car',   jp: 'くうこうまで　くるまで　いきます。',    romaji: 'Kuukou made kuruma de ikimasu.',    de: 'Ich fahre mit dem Auto zum Flughafen.',   en: 'I go to the airport by car.' }
                ],
                explanation_de: 'Mit dem Taxi zum Flughafen: くうこうまで タクシーで いきます。',
                explanation_en: 'By taxi to the airport: くうこうまで タクシーで いきます。'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Womit fliegt man vom Flughafen zum Hotel?',
                prompt_en: 'How do you fly from the airport to the hotel?',
                promptArgs: [],
                correct: ['ひこうき', '飛行機', 'hikouki', 'ひこうきで', 'hikouki de'],
                correctId: 'plane',
                choices: ['plane','train','subway','bus'],
                sentenceOptions: [
                    { modeId: 'plane',  jp: 'ホテルまで　ひこうきで　いきます。',   romaji: 'Hoteru made hikouki de ikimasu.',     de: 'Ich fliege mit dem Flugzeug zum Hotel.',  en: 'I go to the hotel by airplane.' },
                    { modeId: 'train',  jp: 'ホテルまで　でんしゃで　いきます。',   romaji: 'Hoteru made densha de ikimasu.',      de: 'Ich fahre mit dem Zug zum Hotel.',        en: 'I go to the hotel by train.' },
                    { modeId: 'subway', jp: 'ホテルまで　ちかてつで　いきます。',   romaji: 'Hoteru made chikatetsu de ikimasu.', de: 'Ich fahre mit der U-Bahn zum Hotel.',     en: 'I go to the hotel by subway.' },
                    { modeId: 'bus',    jp: 'ホテルまで　バスで　いきます。',       romaji: 'Hoteru made basu de ikimasu.',        de: 'Ich fahre mit dem Bus zum Hotel.',        en: 'I go to the hotel by bus.' }
                ],
                explanation_de: 'Mit dem Flugzeug zum Hotel: ホテルまで ひこうきで いきます。',
                explanation_en: 'By airplane to the hotel: ホテルまで ひこうきで いきます。'
            }
        ]
    },
    {
        id: 'route_plane_complex',
        label:    { de: 'Große Reise (komplex)',        en: 'Big Journey (complex)' },
        difficulty: 'hard',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'train' },
            { type: 'place',     id: 'airport' },
            { type: 'transport', id: 'plane' },
            { type: 'place',     id: 'hotel' },
            { type: 'transport', id: 'walk' },
            { type: 'place',     id: 'park' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Womit kommt man von Zuhause zum Flughafen?',
                prompt_en: 'How do you get from home to the airport?',
                promptArgs: [],
                correct: ['でんしゃ', '電車', 'densha', 'でんしゃで', 'densha de'],
                correctId: 'train',
                choices: ['train','bus','taxi','car'],
                sentenceOptions: [
                    { modeId: 'train', jp: 'くうこうまで　でんしゃで　いきます。',  romaji: 'Kuukou made densha de ikimasu.',   de: 'Ich fahre mit dem Zug zum Flughafen.',   en: 'I go to the airport by train.' },
                    { modeId: 'bus',   jp: 'くうこうまで　バスで　いきます。',      romaji: 'Kuukou made basu de ikimasu.',     de: 'Ich fahre mit dem Bus zum Flughafen.',   en: 'I go to the airport by bus.' },
                    { modeId: 'taxi',  jp: 'くうこうまで　タクシーで　いきます。',  romaji: 'Kuukou made takushii de ikimasu.', de: 'Ich fahre mit dem Taxi zum Flughafen.',  en: 'I go to the airport by taxi.' },
                    { modeId: 'car',   jp: 'くうこうまで　くるまで　いきます。',    romaji: 'Kuukou made kuruma de ikimasu.',   de: 'Ich fahre mit dem Auto zum Flughafen.',  en: 'I go to the airport by car.' }
                ],
                explanation_de: 'Mit dem Zug zum Flughafen: くうこうまで でんしゃで いきます。',
                explanation_en: 'By train to the airport: くうこうまで でんしゃで いきます。'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Womit reist man vom Flughafen zum Hotel?',
                prompt_en: 'How do you travel from the airport to the hotel?',
                promptArgs: [],
                correct: ['ひこうき', '飛行機', 'hikouki', 'ひこうきで', 'hikouki de'],
                correctId: 'plane',
                choices: ['plane','train','bus','taxi'],
                sentenceOptions: [
                    { modeId: 'plane', jp: 'ホテルまで　ひこうきで　いきます。',  romaji: 'Hoteru made hikouki de ikimasu.',   de: 'Ich fliege mit dem Flugzeug zum Hotel.', en: 'I go to the hotel by airplane.' },
                    { modeId: 'train', jp: 'ホテルまで　でんしゃで　いきます。',  romaji: 'Hoteru made densha de ikimasu.',    de: 'Ich fahre mit dem Zug zum Hotel.',       en: 'I go to the hotel by train.' },
                    { modeId: 'bus',   jp: 'ホテルまで　バスで　いきます。',      romaji: 'Hoteru made basu de ikimasu.',      de: 'Ich fahre mit dem Bus zum Hotel.',       en: 'I go to the hotel by bus.' },
                    { modeId: 'taxi',  jp: 'ホテルまで　タクシーで　いきます。',  romaji: 'Hoteru made takushii de ikimasu.', de: 'Ich fahre mit dem Taxi zum Hotel.',      en: 'I go to the hotel by taxi.' }
                ],
                explanation_de: 'Mit dem Flugzeug zum Hotel: ホテルまで ひこうきで いきます。',
                explanation_en: 'By airplane to the hotel: ホテルまで ひこうきで いきます。'
            },
            {
                stepIndex: 5,
                type: 'mode',
                prompt_de: 'Wie kommt man vom Hotel in den Park?',
                prompt_en: 'How do you get from the hotel to the park?',
                promptArgs: [],
                correct: ['あるいて', 'aruite', '歩いて'],
                correctId: 'walk',
                choices: ['walk','taxi','bus','bike'],
                sentenceOptions: [
                    { modeId: 'walk',  jp: 'こうえんまで　あるいて　いきます。',    romaji: 'Kouen made aruite ikimasu.',    de: 'Ich gehe zu Fuß in den Park.',        en: 'I walk to the park.' },
                    { modeId: 'taxi',  jp: 'こうえんまで　タクシーで　いきます。',  romaji: 'Kouen made takushii de ikimasu.',de: 'Ich fahre mit dem Taxi in den Park.', en: 'I go to the park by taxi.' },
                    { modeId: 'bus',   jp: 'こうえんまで　バスで　いきます。',      romaji: 'Kouen made basu de ikimasu.',   de: 'Ich fahre mit dem Bus in den Park.',  en: 'I go to the park by bus.' },
                    { modeId: 'bike',  jp: 'こうえんまで　じてんしゃで　いきます。',romaji: 'Kouen made jitensha de ikimasu.',de: 'Ich fahre mit dem Fahrrad in den Park.',en: 'I go to the park by bike.' }
                ],
                explanation_de: 'Zu Fuß in den Park: こうえんまで あるいて いきます。',
                explanation_en: 'Walk to the park: こうえんまで あるいて いきます。'
            }
        ]
    },

    // ── Komplexe Routen (viel Umsteigen) ─────────────────────────────────────
    {
        id: 'route_airport_complex',
        label:    { de: 'Zum Flughafen (komplex)',   en: 'To Airport (complex)' },
        difficulty: 'hard',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'walk' },
            { type: 'place',     id: 'busstop' },
            { type: 'transport', id: 'bus' },
            { type: 'place',     id: 'station' },
            { type: 'transport', id: 'train' },
            { type: 'place',     id: 'airport' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie kommt man von Zuhause zur Bushaltestelle?',
                prompt_en: 'How do you get from home to the bus stop?',
                promptArgs: [],
                correct: ['あるいて', 'aruite', '歩いて'],
                correctId: 'walk',
                choices: ['walk','bus','taxi','bike'],
                sentenceOptions: [
                    { modeId: 'walk',  jp: 'バスていまで　あるいて　いきます。',    romaji: 'Basutei made aruite ikimasu.',    de: 'Ich gehe zu Fuß zur Bushaltestelle.',    en: 'I walk to the bus stop.' },
                    { modeId: 'bus',   jp: 'バスていまで　バスで　いきます。',      romaji: 'Basutei made basu de ikimasu.',   de: 'Ich fahre mit dem Bus zur Bushaltestelle.',en: 'I go to the bus stop by bus.' },
                    { modeId: 'taxi',  jp: 'バスていまで　タクシーで　いきます。',  romaji: 'Basutei made takushii de ikimasu.',de: 'Ich fahre mit dem Taxi zur Bushaltestelle.',en: 'I go to the bus stop by taxi.' },
                    { modeId: 'bike',  jp: 'バスていまで　じてんしゃで　いきます。',romaji: 'Basutei made jitensha de ikimasu.',de: 'Ich fahre mit dem Fahrrad zur Bushaltestelle.',en: 'I go to the bus stop by bike.' }
                ],
                explanation_de: 'Zu Fuß zur Bushaltestelle: バスていまで あるいて いきます。',
                explanation_en: 'Walk to the bus stop: バスていまで あるいて いきます。'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Womit fährt man zur Bahnstation?',
                prompt_en: 'How do you get to the train station?',
                promptArgs: [],
                correct: ['バス', 'バスで', 'basu', 'basu de'],
                correctId: 'bus',
                choices: ['bus','subway','taxi','walk'],
                sentenceOptions: [
                    { modeId: 'bus',    jp: 'えきまで　バスで　いきます。',        romaji: 'Eki made basu de ikimasu.',        de: 'Ich fahre mit dem Bus zum Bahnhof.',        en: 'I go to the station by bus.' },
                    { modeId: 'subway', jp: 'えきまで　ちかてつで　いきます。',    romaji: 'Eki made chikatetsu de ikimasu.',  de: 'Ich fahre mit der U-Bahn zum Bahnhof.',    en: 'I go to the station by subway.' },
                    { modeId: 'taxi',   jp: 'えきまで　タクシーで　いきます。',    romaji: 'Eki made takushii de ikimasu.',    de: 'Ich fahre mit dem Taxi zum Bahnhof.',       en: 'I go to the station by taxi.' },
                    { modeId: 'walk',   jp: 'えきまで　あるいて　いきます。',      romaji: 'Eki made aruite ikimasu.',         de: 'Ich gehe zu Fuß zum Bahnhof.',              en: 'I walk to the station.' }
                ],
                explanation_de: 'Mit dem Bus zum Bahnhof: えきまで バスで いきます。',
                explanation_en: 'By bus to the station: えきまで バスで いきます。'
            },
            {
                stepIndex: 5,
                type: 'mode',
                prompt_de: 'Womit fährt man vom Bahnhof zum Flughafen?',
                prompt_en: 'How do you get from the station to the airport?',
                promptArgs: [],
                correct: ['でんしゃ', '電車', 'densha', 'でんしゃで', 'densha de'],
                correctId: 'train',
                choices: ['train','bus','taxi','plane'],
                sentenceOptions: [
                    { modeId: 'train', jp: 'くうこうまで　でんしゃで　いきます。',  romaji: 'Kuukou made densha de ikimasu.',    de: 'Ich fahre mit dem Zug zum Flughafen.',   en: 'I go to the airport by train.' },
                    { modeId: 'bus',   jp: 'くうこうまで　バスで　いきます。',      romaji: 'Kuukou made basu de ikimasu.',      de: 'Ich fahre mit dem Bus zum Flughafen.',   en: 'I go to the airport by bus.' },
                    { modeId: 'taxi',  jp: 'くうこうまで　タクシーで　いきます。',  romaji: 'Kuukou made takushii de ikimasu.', de: 'Ich fahre mit dem Taxi zum Flughafen.',  en: 'I go to the airport by taxi.' },
                    { modeId: 'plane', jp: 'くうこうまで　ひこうきで　いきます。',  romaji: 'Kuukou made hikouki de ikimasu.',   de: 'Ich fliege mit dem Flugzeug zum Flughafen.', en: 'I go to the airport by airplane.' }
                ],
                explanation_de: 'Mit dem Zug zum Flughafen: くうこうまで でんしゃで いきます。',
                explanation_en: 'By train to the airport: くうこうまで でんしゃで いきます。'
            }
        ]
    },
    {
        id: 'route_hotel_complex',
        label:    { de: 'Zum Hotel (viel Umsteigen)', en: 'To Hotel (many transfers)' },
        difficulty: 'hard',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'car' },
            { type: 'place',     id: 'station' },
            { type: 'transport', id: 'train' },
            { type: 'place',     id: 'subwaystation' },
            { type: 'transport', id: 'subway' },
            { type: 'place',     id: 'hotel' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie kommt man zum Bahnhof?',
                prompt_en: 'How do you get to the station?',
                promptArgs: [],
                correct: ['くるま', '車', 'kuruma', 'くるまで', 'kuruma de'],
                correctId: 'car',
                choices: ['car','bus','walk','bike'],
                sentenceOptions: [
                    { modeId: 'car',   jp: 'えきまで　くるまで　いきます。',      romaji: 'Eki made kuruma de ikimasu.',    de: 'Ich fahre mit dem Auto zum Bahnhof.',     en: 'I go to the station by car.' },
                    { modeId: 'bus',   jp: 'えきまで　バスで　いきます。',        romaji: 'Eki made basu de ikimasu.',      de: 'Ich fahre mit dem Bus zum Bahnhof.',      en: 'I go to the station by bus.' },
                    { modeId: 'walk',  jp: 'えきまで　あるいて　いきます。',      romaji: 'Eki made aruite ikimasu.',       de: 'Ich gehe zu Fuß zum Bahnhof.',            en: 'I walk to the station.' },
                    { modeId: 'bike',  jp: 'えきまで　じてんしゃで　いきます。',  romaji: 'Eki made jitensha de ikimasu.',  de: 'Ich fahre mit dem Fahrrad zum Bahnhof.', en: 'I go to the station by bike.' }
                ],
                explanation_de: 'Mit dem Auto zum Bahnhof: えきまで くるまで いきます。',
                explanation_en: 'By car to the station: えきまで くるまで いきます。'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Womit fährt man zur U-Bahn-Station?',
                prompt_en: 'How do you get to the subway station?',
                promptArgs: [],
                correct: ['でんしゃ', '電車', 'densha', 'でんしゃで', 'densha de'],
                correctId: 'train',
                choices: ['train','bus','taxi','subway'],
                sentenceOptions: [
                    { modeId: 'train',  jp: 'ちかてつのえきまで　でんしゃで　いきます。',  romaji: 'Chikatetsu no eki made densha de ikimasu.',    de: 'Ich fahre mit dem Zug zur U-Bahn-Station.',        en: 'I go to the subway station by train.' },
                    { modeId: 'bus',    jp: 'ちかてつのえきまで　バスで　いきます。',      romaji: 'Chikatetsu no eki made basu de ikimasu.',      de: 'Ich fahre mit dem Bus zur U-Bahn-Station.',        en: 'I go to the subway station by bus.' },
                    { modeId: 'taxi',   jp: 'ちかてつのえきまで　タクシーで　いきます。',  romaji: 'Chikatetsu no eki made takushii de ikimasu.',  de: 'Ich fahre mit dem Taxi zur U-Bahn-Station.',       en: 'I go to the subway station by taxi.' },
                    { modeId: 'subway', jp: 'ちかてつのえきまで　ちかてつで　いきます。',  romaji: 'Chikatetsu no eki made chikatetsu de ikimasu.',de: 'Ich fahre mit der U-Bahn zur U-Bahn-Station.',    en: 'I go to the subway station by subway.' }
                ],
                explanation_de: 'Mit dem Zug zur U-Bahn-Station: ちかてつのえきまで でんしゃで いきます。',
                explanation_en: 'By train to the subway station: ちかてつのえきまで でんしゃで いきます。'
            },
            {
                stepIndex: 5,
                type: 'mode',
                prompt_de: 'Womit gelangt man zum Hotel?',
                prompt_en: 'How do you reach the hotel?',
                promptArgs: [],
                correct: ['ちかてつ', '地下鉄', 'chikatetsu', 'ちかてつで', 'chikatetsu de'],
                correctId: 'subway',
                choices: ['subway','taxi','bus','train'],
                sentenceOptions: [
                    { modeId: 'subway', jp: 'ホテルまで　ちかてつで　いきます。',  romaji: 'Hoteru made chikatetsu de ikimasu.', de: 'Ich fahre mit der U-Bahn zum Hotel.',  en: 'I go to the hotel by subway.' },
                    { modeId: 'taxi',   jp: 'ホテルまで　タクシーで　いきます。',  romaji: 'Hoteru made takushii de ikimasu.',   de: 'Ich fahre mit dem Taxi zum Hotel.',    en: 'I go to the hotel by taxi.' },
                    { modeId: 'bus',    jp: 'ホテルまで　バスで　いきます。',      romaji: 'Hoteru made basu de ikimasu.',       de: 'Ich fahre mit dem Bus zum Hotel.',     en: 'I go to the hotel by bus.' },
                    { modeId: 'train',  jp: 'ホテルまで　でんしゃで　いきます。',  romaji: 'Hoteru made densha de ikimasu.',     de: 'Ich fahre mit dem Zug zum Hotel.',     en: 'I go to the hotel by train.' }
                ],
                explanation_de: 'Mit der U-Bahn zum Hotel: ホテルまで ちかてつで いきます。',
                explanation_en: 'By subway to the hotel: ホテルまで ちかてつで いきます。'
            }
        ]
    },
    {
        id: 'route_school_complex',
        label:    { de: 'Zur Schule (komplex)',      en: 'To School (complex)' },
        difficulty: 'hard',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'bike' },
            { type: 'place',     id: 'subwaystation' },
            { type: 'transport', id: 'subway' },
            { type: 'place',     id: 'station' },
            { type: 'transport', id: 'walk' },
            { type: 'place',     id: 'school' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie kommt man zur U-Bahn-Station?',
                prompt_en: 'How do you get to the subway station?',
                promptArgs: [],
                correct: ['じてんしゃ', '自転車', 'jitensha', 'じてんしゃで', 'jitensha de'],
                correctId: 'bike',
                choices: ['bike','walk','bus','car'],
                sentenceOptions: [
                    { modeId: 'bike',  jp: 'ちかてつのえきまで　じてんしゃで　いきます。',romaji: 'Chikatetsu no eki made jitensha de ikimasu.',de: 'Ich fahre mit dem Fahrrad zur U-Bahn-Station.',en: 'I go to the subway station by bike.' },
                    { modeId: 'walk',  jp: 'ちかてつのえきまで　あるいて　いきます。',   romaji: 'Chikatetsu no eki made aruite ikimasu.',    de: 'Ich gehe zu Fuß zur U-Bahn-Station.',          en: 'I walk to the subway station.' },
                    { modeId: 'bus',   jp: 'ちかてつのえきまで　バスで　いきます。',     romaji: 'Chikatetsu no eki made basu de ikimasu.',   de: 'Ich fahre mit dem Bus zur U-Bahn-Station.',    en: 'I go to the subway station by bus.' },
                    { modeId: 'car',   jp: 'ちかてつのえきまで　くるまで　いきます。',   romaji: 'Chikatetsu no eki made kuruma de ikimasu.', de: 'Ich fahre mit dem Auto zur U-Bahn-Station.',   en: 'I go to the subway station by car.' }
                ],
                explanation_de: 'Mit dem Fahrrad zur U-Bahn-Station: ちかてつのえきまで じてんしゃで いきます。',
                explanation_en: 'By bike to the subway station: ちかてつのえきまで じてんしゃで いきます。'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Womit fährt man zum Bahnhof?',
                prompt_en: 'How do you get to the train station?',
                promptArgs: [],
                correct: ['ちかてつ', '地下鉄', 'chikatetsu', 'ちかてつで', 'chikatetsu de'],
                correctId: 'subway',
                choices: ['subway','train','bus','taxi'],
                sentenceOptions: [
                    { modeId: 'subway', jp: 'えきまで　ちかてつで　いきます。',    romaji: 'Eki made chikatetsu de ikimasu.',  de: 'Ich fahre mit der U-Bahn zum Bahnhof.',   en: 'I go to the station by subway.' },
                    { modeId: 'train',  jp: 'えきまで　でんしゃで　いきます。',    romaji: 'Eki made densha de ikimasu.',      de: 'Ich fahre mit dem Zug zum Bahnhof.',      en: 'I go to the station by train.' },
                    { modeId: 'bus',    jp: 'えきまで　バスで　いきます。',        romaji: 'Eki made basu de ikimasu.',        de: 'Ich fahre mit dem Bus zum Bahnhof.',      en: 'I go to the station by bus.' },
                    { modeId: 'taxi',   jp: 'えきまで　タクシーで　いきます。',    romaji: 'Eki made takushii de ikimasu.',    de: 'Ich fahre mit dem Taxi zum Bahnhof.',     en: 'I go to the station by taxi.' }
                ],
                explanation_de: 'Mit der U-Bahn zum Bahnhof: えきまで ちかてつで いきます。',
                explanation_en: 'By subway to the station: えきまで ちかてつで いきます。'
            },
            {
                stepIndex: 5,
                type: 'mode',
                prompt_de: 'Wie geht man von der Bahnstation zur Schule?',
                prompt_en: 'How do you get from the station to school?',
                promptArgs: [],
                correct: ['あるいて', 'aruite', '歩いて'],
                correctId: 'walk',
                choices: ['walk','bus','taxi','bike'],
                sentenceOptions: [
                    { modeId: 'walk',  jp: 'がっこうまで　あるいて　いきます。',    romaji: 'Gakkou made aruite ikimasu.',     de: 'Ich gehe zu Fuß zur Schule.',           en: 'I walk to school.' },
                    { modeId: 'bus',   jp: 'がっこうまで　バスで　いきます。',      romaji: 'Gakkou made basu de ikimasu.',    de: 'Ich fahre mit dem Bus zur Schule.',     en: 'I go to school by bus.' },
                    { modeId: 'taxi',  jp: 'がっこうまで　タクシーで　いきます。',  romaji: 'Gakkou made takushii de ikimasu.',de: 'Ich fahre mit dem Taxi zur Schule.',    en: 'I go to school by taxi.' },
                    { modeId: 'bike',  jp: 'がっこうまで　じてんしゃで　いきます。',romaji: 'Gakkou made jitensha de ikimasu.',de: 'Ich fahre mit dem Fahrrad zur Schule.', en: 'I go to school by bike.' }
                ],
                explanation_de: 'Zu Fuß zur Schule: がっこうまで あるいて いきます。',
                explanation_en: 'Walk to school: がっこうまで あるいて いきます。'
            }
        ]
    },
    // ── のります・おります-Routen ──────────────────────────────────────────────
    // Für Verb-Fragen: correctId = 'norimasu' oder 'orimasu' (kein echter transport mode)
    // sentenceOptions.modeId matcht correctId für MC-Auswertung
    {
        id: 'route_norimasu_train',
        label:    { de: 'Zug: Einsteigen',            en: 'Train: Boarding' },
        difficulty: 'easy',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'train' },
            { type: 'place',     id: 'school' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Welches Verb benutzt man, wenn man in den Zug einsteigt?',
                prompt_en: 'Which verb do you use when boarding the train?',
                promptArgs: [],
                correct: ['のります', 'norimasu', 'のる', 'noru', 'でんしゃにのります', 'densha ni norimasu'],
                correctId: 'norimasu',
                choices: [],
                sentenceOptions: [
                    { modeId: 'norimasu', jp: 'でんしゃに　のります。',  romaji: 'Densha ni norimasu.',   de: 'Ich steige in den Zug ein.  (に のります)',  en: 'I board the train.  (に のります)' },
                    { modeId: 'orimasu',  jp: 'でんしゃを　おります。',  romaji: 'Densha wo orimasu.',    de: 'Ich steige aus dem Zug aus.  (を おります)', en: 'I get off the train.  (を おります)' },
                    { modeId: 'ikimasu',  jp: 'でんしゃで　いきます。',  romaji: 'Densha de ikimasu.',    de: 'Ich fahre mit dem Zug.  (で いきます)',      en: 'I go by train.  (で いきます)' },
                    { modeId: 'kimasu',   jp: 'でんしゃで　きます。',    romaji: 'Densha de kimasu.',     de: 'Ich komme mit dem Zug.  (で きます)',        en: 'I come by train.  (で きます)' }
                ],
                explanation_de: 'Einsteigen = に のります (ni norimasu). Partikel に markiert das Fahrzeug beim Einsteigen.',
                explanation_en: 'To board = に のります (ni norimasu). Particle に marks the vehicle when boarding.'
            }
        ]
    },
    {
        id: 'route_orimasu_train',
        label:    { de: 'Zug: Aussteigen',            en: 'Train: Alighting' },
        difficulty: 'easy',
        nodes: [
            { type: 'place',     id: 'station' },
            { type: 'transport', id: 'train' },
            { type: 'place',     id: 'office' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Welches Verb benutzt man, wenn man aus dem Zug aussteigt?',
                prompt_en: 'Which verb do you use when getting off the train?',
                promptArgs: [],
                correct: ['おります', 'orimasu', 'おりる', 'oriru', 'でんしゃをおります', 'densha wo orimasu'],
                correctId: 'orimasu',
                choices: [],
                sentenceOptions: [
                    { modeId: 'orimasu',  jp: 'でんしゃを　おります。',  romaji: 'Densha wo orimasu.',    de: 'Ich steige aus dem Zug aus.  (を おります)', en: 'I get off the train.  (を おります)' },
                    { modeId: 'norimasu', jp: 'でんしゃに　のります。',  romaji: 'Densha ni norimasu.',   de: 'Ich steige in den Zug ein.  (に のります)',  en: 'I board the train.  (に のります)' },
                    { modeId: 'ikimasu',  jp: 'でんしゃで　いきます。',  romaji: 'Densha de ikimasu.',    de: 'Ich fahre mit dem Zug.  (で いきます)',      en: 'I go by train.  (で いきます)' },
                    { modeId: 'kimasu',   jp: 'でんしゃで　きます。',    romaji: 'Densha de kimasu.',     de: 'Ich komme mit dem Zug.  (で きます)',        en: 'I come by train.  (で きます)' }
                ],
                explanation_de: 'Aussteigen = を おります (wo orimasu). Partikel を markiert das Fahrzeug beim Aussteigen.',
                explanation_en: 'To alight = を おります (wo orimasu). Particle を marks the vehicle when alighting.'
            }
        ]
    },
    {
        id: 'route_norimasu_subway',
        label:    { de: 'U-Bahn: Einsteigen',         en: 'Subway: Boarding' },
        difficulty: 'medium',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'subway' },
            { type: 'place',     id: 'hospital' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie sagt man „Ich steige in die U-Bahn ein"?',
                prompt_en: 'How do you say "I board the subway"?',
                promptArgs: [],
                correct: ['のります', 'norimasu', 'ちかてつにのります', 'chikatetsu ni norimasu'],
                correctId: 'norimasu',
                choices: [],
                sentenceOptions: [
                    { modeId: 'norimasu', jp: 'ちかてつに　のります。',  romaji: 'Chikatetsu ni norimasu.',  de: 'Ich steige in die U-Bahn ein.  (に のります)',  en: 'I board the subway.  (に のります)' },
                    { modeId: 'orimasu',  jp: 'ちかてつを　おります。',  romaji: 'Chikatetsu wo orimasu.',   de: 'Ich steige aus der U-Bahn aus.  (を おります)', en: 'I get off the subway.  (を おります)' },
                    { modeId: 'ikimasu',  jp: 'ちかてつで　いきます。',  romaji: 'Chikatetsu de ikimasu.',   de: 'Ich fahre mit der U-Bahn.  (で いきます)',      en: 'I go by subway.  (で いきます)' },
                    { modeId: 'kimasu',   jp: 'ちかてつで　きます。',    romaji: 'Chikatetsu de kimasu.',    de: 'Ich komme mit der U-Bahn.  (で きます)',        en: 'I come by subway.  (で きます)' }
                ],
                explanation_de: 'ちかてつに のります。 — に のります = einsteigen.',
                explanation_en: 'ちかてつに のります。 — に のります = to board.'
            }
        ]
    },
    {
        id: 'route_norimasu_bus',
        label:    { de: 'Bus: Einsteigen & Weiterfahren', en: 'Bus: Board & Continue' },
        difficulty: 'medium',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'bus' },
            { type: 'place',     id: 'park' },
            { type: 'transport', id: 'walk' },
            { type: 'place',     id: 'supermarket' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Wie sagt man „Ich steige in den Bus ein"?',
                prompt_en: 'How do you say "I board the bus"?',
                promptArgs: [],
                correct: ['のります', 'norimasu', 'バスにのります', 'basu ni norimasu'],
                correctId: 'norimasu',
                choices: [],
                sentenceOptions: [
                    { modeId: 'norimasu', jp: 'バスに　のります。',       romaji: 'Basu ni norimasu.',       de: 'Ich steige in den Bus ein.  (に のります)',  en: 'I board the bus.  (に のります)' },
                    { modeId: 'orimasu',  jp: 'バスを　おります。',       romaji: 'Basu wo orimasu.',        de: 'Ich steige aus dem Bus aus.  (を おります)', en: 'I get off the bus.  (を おります)' },
                    { modeId: 'ikimasu',  jp: 'バスで　いきます。',       romaji: 'Basu de ikimasu.',        de: 'Ich fahre mit dem Bus.  (で いきます)',      en: 'I go by bus.  (で いきます)' },
                    { modeId: 'kimasu',   jp: 'バスで　きます。',          romaji: 'Basu de kimasu.',         de: 'Ich komme mit dem Bus.  (で きます)',        en: 'I come by bus.  (で きます)' }
                ],
                explanation_de: 'バスに のります。 — に のります = einsteigen.',
                explanation_en: 'バスに のります。 — に のります = to board.'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Wie kommt man vom Park zum Supermarkt?',
                prompt_en: 'How do you get from the park to the supermarket?',
                promptArgs: [],
                correct: ['あるいて', 'aruite', '歩いて'],
                correctId: 'walk',
                choices: [],
                sentenceOptions: [
                    { modeId: 'walk',  jp: 'スーパーまで　あるいて　いきます。',     romaji: 'Suupaa made aruite ikimasu.',     de: 'Ich gehe zu Fuß zum Supermarkt.',        en: 'I walk to the supermarket.' },
                    { modeId: 'bus',   jp: 'スーパーまで　バスで　いきます。',       romaji: 'Suupaa made basu de ikimasu.',    de: 'Ich fahre mit dem Bus zum Supermarkt.',  en: 'I go to the supermarket by bus.' },
                    { modeId: 'bike',  jp: 'スーパーまで　じてんしゃで　いきます。', romaji: 'Suupaa made jitensha de ikimasu.',de: 'Ich fahre mit dem Fahrrad zum Supermarkt.',en: 'I go to the supermarket by bike.' },
                    { modeId: 'taxi',  jp: 'スーパーまで　タクシーで　いきます。',   romaji: 'Suupaa made takushii de ikimasu.',de: 'Ich fahre mit dem Taxi zum Supermarkt.', en: 'I go to the supermarket by taxi.' }
                ],
                explanation_de: 'Zu Fuß zum Supermarkt: スーパーまで あるいて いきます。',
                explanation_en: 'Walk to the supermarket: スーパーまで あるいて いきます。'
            }
        ]
    },
    {
        id: 'route_norimasu_complex',
        label:    { de: 'Umsteigen: のります & おります', en: 'Transfer: のります & おります' },
        difficulty: 'hard',
        nodes: [
            { type: 'place',     id: 'home' },
            { type: 'transport', id: 'bus' },
            { type: 'place',     id: 'station' },
            { type: 'transport', id: 'train' },
            { type: 'place',     id: 'office' }
        ],
        questions: [
            {
                stepIndex: 1,
                type: 'mode',
                prompt_de: 'Am Haus: Wie sagt man „Ich steige in den Bus ein"?',
                prompt_en: 'At home: How do you say "I board the bus"?',
                promptArgs: [],
                correct: ['のります', 'norimasu', 'バスにのります', 'basu ni norimasu'],
                correctId: 'norimasu',
                choices: [],
                sentenceOptions: [
                    { modeId: 'norimasu', jp: 'バスに　のります。',       romaji: 'Basu ni norimasu.',       de: 'Ich steige in den Bus ein.  (に のります)',  en: 'I board the bus.  (に のります)' },
                    { modeId: 'orimasu',  jp: 'バスを　おります。',       romaji: 'Basu wo orimasu.',        de: 'Ich steige aus dem Bus aus.  (を おります)', en: 'I get off the bus.  (を おります)' },
                    { modeId: 'ikimasu',  jp: 'バスで　いきます。',       romaji: 'Basu de ikimasu.',        de: 'Ich fahre mit dem Bus.  (で いきます)',      en: 'I go by bus.  (で いきます)' },
                    { modeId: 'kimasu',   jp: 'バスで　きます。',          romaji: 'Basu de kimasu.',         de: 'Ich komme mit dem Bus.  (で きます)',        en: 'I come by bus.  (で きます)' }
                ],
                explanation_de: 'Einsteigen in den Bus: バスに のります (basu ni norimasu).',
                explanation_en: 'Board the bus: バスに のります (basu ni norimasu).'
            },
            {
                stepIndex: 3,
                type: 'mode',
                prompt_de: 'Am Bahnhof umsteigen: Wie sagt man „Ich steige aus dem Bus aus"?',
                prompt_en: 'Transferring at the station: How do you say "I get off the bus"?',
                promptArgs: [],
                correct: ['おります', 'orimasu', 'バスをおります', 'basu wo orimasu'],
                correctId: 'orimasu',
                choices: [],
                sentenceOptions: [
                    { modeId: 'orimasu',  jp: 'でんしゃを　おります。',   romaji: 'Densha wo orimasu.',    de: 'Ich steige aus dem Zug aus.  (を おります)',  en: 'I get off the train.  (を おります)' },
                    { modeId: 'norimasu', jp: 'でんしゃに　のります。',   romaji: 'Densha ni norimasu.',   de: 'Ich steige in den Zug ein.  (に のります)',   en: 'I board the train.  (に のります)' },
                    { modeId: 'ikimasu',  jp: 'でんしゃで　いきます。',   romaji: 'Densha de ikimasu.',    de: 'Ich fahre mit dem Zug.  (で いきます)',       en: 'I go by train.  (で いきます)' },
                    { modeId: 'kimasu',   jp: 'でんしゃで　きます。',     romaji: 'Densha de kimasu.',     de: 'Ich komme mit dem Zug.  (で きます)',         en: 'I come by train.  (で きます)' }
                ],
                explanation_de: 'Aussteigen: を おります (wo orimasu). Am Bahnhof: でんしゃを おります。',
                explanation_en: 'To alight: を おります (wo orimasu). At the station: でんしゃを おります。'
            }
        ]
    }
];

/* Lookup-Helfer */
function getPlace(id)     { return transportPlaces.find(p => p.id === id); }
function getMode(id)      { return transportModes.find(m => m.id === id); }

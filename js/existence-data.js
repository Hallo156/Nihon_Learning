/* Japanisch Lernprogramm — Erstellt von Hi156 unter Verwendung von Claude (Anthropic) */

/* existence-data.js — Lesetexte zu Wohnungen/Häusern mit Quiz-Fragen (Existenz: あります/います).
   Genutzt von: existence.js */

/* ============ GEBÄUDE-TYPEN ============ */

const housingTypes = {
    manshon: { jp: 'マンション', romaji: 'manshon',  de: 'Kondominium',      en: 'Condominium'      },
    apaato:  { jp: 'アパート',   romaji: 'apāto',    de: 'Mietwohnung',       en: 'Apartment'        },
    hotel:   { jp: 'ホテル',     romaji: 'hoteru',   de: 'Hotel',              en: 'Hotel'            },
    ikkenya: { jp: '一軒家',     romaji: 'ikkenya',  de: 'Einfamilienhaus',    en: 'House'            }
};

/* ============ LESETEXTE ============ */

const existenceTexts = [

    /* ---- MANSHON 1: Yamada Jun (1 Person, kein Haustier) ---- */
    {
        id: 'manshon1',
        type: 'manshon',
        title_de: 'Yamada Juns Wohnung',
        title_en: "Yamada Jun's Apartment",
        text_jp:
            'わたしは やまだじゅんです。\n' +
            'マンションの 5かいに すんでいます。\n' +
            'リビングに テーブルが 1つと いすが 4つ あります。\n' +
            'テレビも あります。\n' +
            'キッチンに れいぞうこが あります。\n' +
            'ベッドルームに ベッドが 1つと タンスが 1つ あります。\n' +
            'おふろと トイレが あります。\n' +
            'ペットは いません。',
        text_de:
            'Ich bin Yamada Jun.\n' +
            'Ich wohne im 5. Stock eines Kondominiums.\n' +
            'Im Wohnzimmer gibt es einen Tisch und 4 Stühle.\n' +
            'Es gibt auch einen Fernseher.\n' +
            'In der Küche gibt es einen Kühlschrank.\n' +
            'Im Schlafzimmer gibt es ein Bett und eine Kommode.\n' +
            'Es gibt ein Bad und eine Toilette.\n' +
            'Ich habe keine Haustiere.',
        text_en:
            'I am Yamada Jun.\n' +
            'I live on the 5th floor of a condominium.\n' +
            'In the living room there is a table and 4 chairs.\n' +
            'There is also a TV.\n' +
            'In the kitchen there is a refrigerator.\n' +
            'In the bedroom there is a bed and a dresser.\n' +
            'There is a bathroom and a toilet.\n' +
            'I have no pets.',
        text_romaji:
            'Watashi wa Yamada Jun desu.\n' +
            'Manshon no 5-kai ni sunde imasu.\n' +
            'Ribingu ni tēburu ga hitotsu to isu ga yottsu arimasu.\n' +
            'Terebi mo arimasu.\n' +
            'Kicchin ni reizōko ga arimasu.\n' +
            'Beddo rūmu ni beddo ga hitotsu to tansu ga hitotsu arimasu.\n' +
            'Ofuro to toire ga arimasu.\n' +
            'Petto wa imasen.',
        questions: [
            {
                prompt_de: 'Was für ein Gebäude ist das?',
                prompt_en: 'What kind of building is this?',
                type: 'mc',
                correct: ['マンション'],
                choices: [
                    { jp: 'マンション', de: 'Kondominium',     en: 'Condominium' },
                    { jp: 'アパート',   de: 'Mietwohnung',     en: 'Apartment'   },
                    { jp: 'ホテル',     de: 'Hotel',            en: 'Hotel'       },
                    { jp: '一軒家',     de: 'Einfamilienhaus',  en: 'House'       }
                ],
                explanation_de: '「マンションの 5かいに すんでいます」→ Es ist ein Kondominium.',
                explanation_en: '「マンションの 5かいに すんでいます」→ It is a condominium.'
            },
            {
                prompt_de: 'Wie viele Stühle gibt es im Wohnzimmer?',
                prompt_en: 'How many chairs are there in the living room?',
                type: 'fill',
                correct: ['4', 'よん', 'yon', '4つ', 'よっつ'],
                explanation_de: '「いすが 4つ あります」→ Es gibt 4 Stühle.',
                explanation_en: '「いすが 4つ あります」→ There are 4 chairs.'
            },
            {
                prompt_de: 'Was gibt es im Schlafzimmer?',
                prompt_en: 'What is in the bedroom?',
                type: 'mc',
                correct: ['ベッドとタンス'],
                choices: [
                    { jp: 'ベッドとタンス',  de: 'Bett und Kommode',  en: 'Bed and Dresser'  },
                    { jp: 'テーブルとソファ', de: 'Tisch und Sofa',    en: 'Table and Sofa'   },
                    { jp: 'れいぞうこ',      de: 'Kühlschrank',        en: 'Refrigerator'     },
                    { jp: 'テレビとソファ',  de: 'TV und Sofa',        en: 'TV and Sofa'      }
                ],
                explanation_de: '「ベッドが 1つと タンスが 1つ あります」→ Im Schlafzimmer gibt es ein Bett und eine Kommode.',
                explanation_en: '「ベッドが 1つと タンスが 1つ あります」→ In the bedroom there is a bed and a dresser.'
            },
            {
                prompt_de: 'Gibt es Haustiere?',
                prompt_en: 'Are there any pets?',
                type: 'mc',
                correct: ['いません'],
                choices: [
                    { jp: 'います',   de: 'Ja, es gibt welche',  en: 'Yes, there are'      },
                    { jp: 'いません', de: 'Nein, es gibt keine', en: 'No, there are none'  }
                ],
                explanation_de: '「ペットは いません」→ Es gibt keine Haustiere.',
                explanation_en: '「ペットは いません」→ There are no pets.'
            },
            {
                prompt_de: 'In welchem Stockwerk wohnt Yamada-san?',
                prompt_en: 'On which floor does Yamada-san live?',
                type: 'fill',
                correct: ['5', 'ご', 'go', '5かい', 'ごかい'],
                explanation_de: '「マンションの 5かいに すんでいます」→ Im 5. Stock.',
                explanation_en: '「マンションの 5かいに すんでいます」→ On the 5th floor.'
            }
        ]
    },

    /* ---- MANSHON 2: Familie Satou (4 Personen, 1 Hund) ---- */
    {
        id: 'manshon2',
        type: 'manshon',
        title_de: 'Die Wohnung der Familie Satou',
        title_en: "The Satou Family's Apartment",
        text_jp:
            'わたしたちは さとうかぞくです。\n' +
            'マンションの 3かいに すんでいます。\n' +
            'かぞくは 4にん います。\n' +
            'リビングに おおきい テーブルと いすが 6つ あります。\n' +
            'ソファも あります。\n' +
            'キッチンに れいぞうこと せんたくきが あります。\n' +
            'ベッドルームが 2つ あります。\n' +
            '1つめの ベッドルームに ベッドが 2つ あります。\n' +
            '2つめの ベッドルームに デスクが 1つと ベッドが 2つ あります。\n' +
            'おふろと トイレが あります。\n' +
            'にわは ありません。\n' +
            'いぬが 1ぴき います。',
        text_de:
            'Wir sind die Familie Satou.\n' +
            'Wir wohnen im 3. Stock eines Kondominiums.\n' +
            'Unsere Familie hat 4 Personen.\n' +
            'Im Wohnzimmer gibt es einen großen Tisch und 6 Stühle.\n' +
            'Es gibt auch ein Sofa.\n' +
            'In der Küche gibt es einen Kühlschrank und eine Waschmaschine.\n' +
            'Es gibt 2 Schlafzimmer.\n' +
            'Im ersten Schlafzimmer gibt es 2 Betten.\n' +
            'Im zweiten Schlafzimmer gibt es 1 Schreibtisch und 2 Betten.\n' +
            'Es gibt ein Bad und eine Toilette.\n' +
            'Wir haben keinen Garten.\n' +
            'Wir haben 1 Hund.',
        text_en:
            'We are the Satou family.\n' +
            'We live on the 3rd floor of a condominium.\n' +
            'Our family has 4 members.\n' +
            'In the living room there is a big table and 6 chairs.\n' +
            'There is also a sofa.\n' +
            'In the kitchen there is a refrigerator and a washing machine.\n' +
            'There are 2 bedrooms.\n' +
            'In the first bedroom there are 2 beds.\n' +
            'In the second bedroom there is 1 desk and 2 beds.\n' +
            'There is a bathroom and a toilet.\n' +
            'We have no garden.\n' +
            'We have 1 dog.',
        text_romaji:
            'Watashitachi wa Satou-kazoku desu.\n' +
            'Manshon no 3-kai ni sunde imasu.\n' +
            'Kazoku wa 4-nin imasu.\n' +
            'Ribingu ni ōkii tēburu to isu ga muttsu arimasu.\n' +
            'Sofa mo arimasu.\n' +
            'Kicchin ni reizōko to sentakuki ga arimasu.\n' +
            'Beddo rūmu ga futatsu arimasu.\n' +
            'Hitotsume no beddo rūmu ni beddo ga futatsu arimasu.\n' +
            'Futatsume no beddo rūmu ni desuku ga hitotsu to beddo ga futatsu arimasu.\n' +
            'Ofuro to toire ga arimasu.\n' +
            'Niwa wa arimasen.\n' +
            'Inu ga ippiki imasu.',
        questions: [
            {
                prompt_de: 'Wie viele Personen wohnen hier?',
                prompt_en: 'How many people live here?',
                type: 'fill',
                correct: ['4', 'よん', 'yon', '4にん', 'よにん'],
                explanation_de: '「かぞくは 4にん います」→ Die Familie hat 4 Personen.',
                explanation_en: '「かぞくは 4にん います」→ The family has 4 members.'
            },
            {
                prompt_de: 'Gibt es ein Sofa im Wohnzimmer?',
                prompt_en: 'Is there a sofa in the living room?',
                type: 'mc',
                correct: ['あります'],
                choices: [
                    { jp: 'あります',   de: 'Ja, es gibt eines',   en: 'Yes, there is one'   },
                    { jp: 'ありません', de: 'Nein, es gibt keines', en: 'No, there is none'   }
                ],
                explanation_de: '「ソファも あります」→ Es gibt auch ein Sofa.',
                explanation_en: '「ソファも あります」→ There is also a sofa.'
            },
            {
                prompt_de: 'Wie viele Schlafzimmer gibt es?',
                prompt_en: 'How many bedrooms are there?',
                type: 'fill',
                correct: ['2', 'に', 'ni', '2つ', 'ふたつ'],
                explanation_de: '「ベッドルームが 2つ あります」→ Es gibt 2 Schlafzimmer.',
                explanation_en: '「ベッドルームが 2つ あります」→ There are 2 bedrooms.'
            },
            {
                prompt_de: 'Gibt es einen Garten?',
                prompt_en: 'Is there a garden?',
                type: 'mc',
                correct: ['ありません'],
                choices: [
                    { jp: 'あります',   de: 'Ja, es gibt einen',   en: 'Yes, there is one'  },
                    { jp: 'ありません', de: 'Nein, es gibt keinen', en: 'No, there is none'  }
                ],
                explanation_de: '「にわは ありません」→ Wir haben keinen Garten.',
                explanation_en: '「にわは ありません」→ We have no garden.'
            },
            {
                prompt_de: 'Wie viele Hunde gibt es?',
                prompt_en: 'How many dogs are there?',
                type: 'fill',
                correct: ['1', 'いち', 'ichi', '1ぴき', 'いっぴき'],
                explanation_de: '「いぬが 1ぴき います」→ Es gibt 1 Hund.',
                explanation_en: '「いぬが 1ぴき います」→ There is 1 dog.'
            }
        ]
    },

    /* ---- APAATO 1: Suzuki Hana (1 Person, 1 Katze) ---- */
    {
        id: 'apaato1',
        type: 'apaato',
        title_de: 'Suzuki Hanas Wohnung',
        title_en: "Suzuki Hana's Apartment",
        text_jp:
            'わたしは すずきはなです。\n' +
            'アパートの 1かいに すんでいます。\n' +
            'リビングに ちいさい テーブルと いすが 2つ あります。\n' +
            'テレビは ありません。\n' +
            'キッチンに れいぞうこと せんたくきが あります。\n' +
            'ベッドルームに ベッドが 1つ あります。\n' +
            'タンスは ありません。\n' +
            'おふろと トイレが あります。\n' +
            'ねこが 1ぴき います。',
        text_de:
            'Ich bin Suzuki Hana.\n' +
            'Ich wohne im Erdgeschoss einer Mietwohnung.\n' +
            'Im Wohnzimmer gibt es einen kleinen Tisch und 2 Stühle.\n' +
            'Ich habe keinen Fernseher.\n' +
            'In der Küche gibt es einen Kühlschrank und eine Waschmaschine.\n' +
            'Im Schlafzimmer gibt es 1 Bett.\n' +
            'Ich habe keine Kommode.\n' +
            'Es gibt ein Bad und eine Toilette.\n' +
            'Ich habe 1 Katze.',
        text_en:
            'I am Suzuki Hana.\n' +
            'I live on the 1st floor of an apartment.\n' +
            'In the living room there is a small table and 2 chairs.\n' +
            'I have no TV.\n' +
            'In the kitchen there is a refrigerator and a washing machine.\n' +
            'In the bedroom there is 1 bed.\n' +
            'I have no dresser.\n' +
            'There is a bathroom and a toilet.\n' +
            'I have 1 cat.',
        text_romaji:
            'Watashi wa Suzuki Hana desu.\n' +
            'Apāto no 1-kai ni sunde imasu.\n' +
            'Ribingu ni chiisai tēburu to isu ga futatsu arimasu.\n' +
            'Terebi wa arimasen.\n' +
            'Kicchin ni reizōko to sentakuki ga arimasu.\n' +
            'Beddo rūmu ni beddo ga hitotsu arimasu.\n' +
            'Tansu wa arimasen.\n' +
            'Ofuro to toire ga arimasu.\n' +
            'Neko ga ippiki imasu.',
        questions: [
            {
                prompt_de: 'Was für ein Gebäude ist das?',
                prompt_en: 'What kind of building is this?',
                type: 'mc',
                correct: ['アパート'],
                choices: [
                    { jp: 'マンション', de: 'Kondominium',    en: 'Condominium' },
                    { jp: 'アパート',   de: 'Mietwohnung',    en: 'Apartment'   },
                    { jp: 'ホテル',     de: 'Hotel',           en: 'Hotel'       },
                    { jp: '一軒家',     de: 'Einfamilienhaus', en: 'House'       }
                ],
                explanation_de: '「アパートの 1かいに すんでいます」→ Es ist eine Mietwohnung.',
                explanation_en: '「アパートの 1かいに すんでいます」→ It is an apartment.'
            },
            {
                prompt_de: 'Gibt es einen Fernseher?',
                prompt_en: 'Is there a TV?',
                type: 'mc',
                correct: ['ありません'],
                choices: [
                    { jp: 'あります',   de: 'Ja, es gibt einen',   en: 'Yes, there is one' },
                    { jp: 'ありません', de: 'Nein, es gibt keinen', en: 'No, there is none' }
                ],
                explanation_de: '「テレビは ありません」→ Es gibt keinen Fernseher.',
                explanation_en: '「テレビは ありません」→ There is no TV.'
            },
            {
                prompt_de: 'Was gibt es in der Küche?',
                prompt_en: 'What is in the kitchen?',
                type: 'mc',
                correct: ['れいぞうことせんたくき'],
                choices: [
                    { jp: 'れいぞうことせんたくき', de: 'Kühlschrank und Waschmaschine', en: 'Refrigerator and washing machine' },
                    { jp: 'テーブルといす',          de: 'Tisch und Stühle',             en: 'Table and chairs'                },
                    { jp: 'れいぞうこだけ',          de: 'Nur ein Kühlschrank',           en: 'Only a refrigerator'             },
                    { jp: 'ソファとテレビ',           de: 'Sofa und Fernseher',           en: 'Sofa and TV'                     }
                ],
                explanation_de: '「キッチンに れいぞうこと せんたくきが あります」→ In der Küche gibt es einen Kühlschrank und eine Waschmaschine.',
                explanation_en: '「キッチンに れいぞうこと せんたくきが あります」→ In the kitchen there is a refrigerator and a washing machine.'
            },
            {
                prompt_de: 'Wie viele Katzen gibt es?',
                prompt_en: 'How many cats are there?',
                type: 'fill',
                correct: ['1', 'いち', 'ichi', '1ぴき', 'いっぴき'],
                explanation_de: '「ねこが 1ぴき います」→ Es gibt 1 Katze.',
                explanation_en: '「ねこが 1ぴき います」→ There is 1 cat.'
            },
            {
                prompt_de: 'Gibt es eine Kommode?',
                prompt_en: 'Is there a dresser?',
                type: 'mc',
                correct: ['ありません'],
                choices: [
                    { jp: 'あります',   de: 'Ja, es gibt eine',   en: 'Yes, there is one' },
                    { jp: 'ありません', de: 'Nein, es gibt keine', en: 'No, there is none' }
                ],
                explanation_de: '「タンスは ありません」→ Es gibt keine Kommode.',
                explanation_en: '「タンスは ありません」→ There is no dresser.'
            }
        ]
    },

    /* ---- APAATO 2: Nakamura (2 Personen, kein Haustier) ---- */
    {
        id: 'apaato2',
        type: 'apaato',
        title_de: 'Nakamuras Wohnung',
        title_en: "The Nakamuras' Apartment",
        text_jp:
            'わたしは なかむらけんじです。\n' +
            'つまの なかむらあやと いっしょに アパートの 2かいに すんでいます。\n' +
            'リビングに テーブルと いすが 2つ あります。\n' +
            'テレビと ソファが あります。\n' +
            'キッチンに れいぞうこが あります。\n' +
            'せんたくきは ありません。\n' +
            'ベッドルームに ベッドが 1つと タンスが 2つ あります。\n' +
            'おふろと トイレが あります。\n' +
            'ペットは いません。',
        text_de:
            'Ich bin Nakamura Kenji.\n' +
            'Ich wohne zusammen mit meiner Frau Nakamura Aya im 2. Stock einer Mietwohnung.\n' +
            'Im Wohnzimmer gibt es einen Tisch und 2 Stühle.\n' +
            'Es gibt einen Fernseher und ein Sofa.\n' +
            'In der Küche gibt es einen Kühlschrank.\n' +
            'Wir haben keine Waschmaschine.\n' +
            'Im Schlafzimmer gibt es 1 Bett und 2 Kommoden.\n' +
            'Es gibt ein Bad und eine Toilette.\n' +
            'Wir haben keine Haustiere.',
        text_en:
            'I am Nakamura Kenji.\n' +
            'I live together with my wife Nakamura Aya on the 2nd floor of an apartment.\n' +
            'In the living room there is a table and 2 chairs.\n' +
            'There is a TV and a sofa.\n' +
            'In the kitchen there is a refrigerator.\n' +
            'We have no washing machine.\n' +
            'In the bedroom there is 1 bed and 2 dressers.\n' +
            'There is a bathroom and a toilet.\n' +
            'We have no pets.',
        text_romaji:
            'Watashi wa Nakamura Kenji desu.\n' +
            'Tsuma no Nakamura Aya to issho ni apāto no 2-kai ni sunde imasu.\n' +
            'Ribingu ni tēburu to isu ga futatsu arimasu.\n' +
            'Terebi to sofa ga arimasu.\n' +
            'Kicchin ni reizōko ga arimasu.\n' +
            'Sentakuki wa arimasen.\n' +
            'Beddo rūmu ni beddo ga hitotsu to tansu ga futatsu arimasu.\n' +
            'Ofuro to toire ga arimasu.\n' +
            'Petto wa imasen.',
        questions: [
            {
                prompt_de: 'Wie viele Personen wohnen hier?',
                prompt_en: 'How many people live here?',
                type: 'fill',
                correct: ['2', 'に', 'ni', '2にん', 'ふたり'],
                explanation_de: '「つまの なかむらあやと いっしょに すんでいます」→ 2 Personen wohnen hier.',
                explanation_en: '「tsuma no Nakamura Aya to issho ni sunde imasu」→ 2 people live here.'
            },
            {
                prompt_de: 'Gibt es eine Waschmaschine?',
                prompt_en: 'Is there a washing machine?',
                type: 'mc',
                correct: ['ありません'],
                choices: [
                    { jp: 'あります',   de: 'Ja, es gibt eine',   en: 'Yes, there is one' },
                    { jp: 'ありません', de: 'Nein, es gibt keine', en: 'No, there is none' }
                ],
                explanation_de: '「せんたくきは ありません」→ Wir haben keine Waschmaschine.',
                explanation_en: '「せんたくきは ありません」→ We have no washing machine.'
            },
            {
                prompt_de: 'Was gibt es außerdem im Wohnzimmer (neben Tisch und Stühlen)?',
                prompt_en: 'What else is in the living room (besides the table and chairs)?',
                type: 'mc',
                correct: ['テレビとソファ'],
                choices: [
                    { jp: 'テレビとソファ',  de: 'TV und Sofa',       en: 'TV and Sofa'     },
                    { jp: 'れいぞうこ',      de: 'Kühlschrank',        en: 'Refrigerator'    },
                    { jp: 'ベッドとタンス',  de: 'Bett und Kommode',   en: 'Bed and Dresser' },
                    { jp: 'ソファだけ',      de: 'Nur ein Sofa',       en: 'Only a sofa'     }
                ],
                explanation_de: '「テレビと ソファが あります」→ Es gibt einen Fernseher und ein Sofa.',
                explanation_en: '「テレビと ソファが あります」→ There is a TV and a sofa.'
            },
            {
                prompt_de: 'Wie viele Kommoden gibt es im Schlafzimmer?',
                prompt_en: 'How many dressers are in the bedroom?',
                type: 'fill',
                correct: ['2', 'に', 'ni', '2つ', 'ふたつ'],
                explanation_de: '「タンスが 2つ あります」→ Es gibt 2 Kommoden.',
                explanation_en: '「タンスが 2つ あります」→ There are 2 dressers.'
            },
            {
                prompt_de: 'Gibt es Haustiere?',
                prompt_en: 'Are there any pets?',
                type: 'mc',
                correct: ['いません'],
                choices: [
                    { jp: 'います',   de: 'Ja, es gibt welche',  en: 'Yes, there are'     },
                    { jp: 'いません', de: 'Nein, es gibt keine', en: 'No, there are none' }
                ],
                explanation_de: '「ペットは いません」→ Wir haben keine Haustiere.',
                explanation_en: '「ペットは いません」→ We have no pets.'
            }
        ]
    },

    /* ---- HOTEL: Zimmer 203 ---- */
    {
        id: 'hotel1',
        type: 'hotel',
        title_de: 'Hotelzimmer 203',
        title_en: 'Hotel Room 203',
        text_jp:
            'わたしは いま ホテルに とまっています。\n' +
            '203ごうしつに とまっています。\n' +
            'へやに ベッドが 2つ あります。\n' +
            'ちいさい テーブルと いすが 2つ あります。\n' +
            'テレビと れいぞうこが あります。\n' +
            'クローゼットも あります。\n' +
            'おふろと トイレが あります。\n' +
            'ペットは いません。',
        text_de:
            'Ich übernachte gerade in einem Hotel.\n' +
            'Ich übernachte in Zimmer 203.\n' +
            'Im Zimmer gibt es 2 Betten.\n' +
            'Es gibt einen kleinen Tisch und 2 Stühle.\n' +
            'Es gibt einen Fernseher und einen Kühlschrank.\n' +
            'Es gibt auch einen Kleiderschrank.\n' +
            'Es gibt ein Bad und eine Toilette.\n' +
            'Ich habe keine Haustiere dabei.',
        text_en:
            'I am currently staying at a hotel.\n' +
            'I am staying in room 203.\n' +
            'In the room there are 2 beds.\n' +
            'There is a small table and 2 chairs.\n' +
            'There is a TV and a refrigerator.\n' +
            'There is also a closet.\n' +
            'There is a bathroom and a toilet.\n' +
            'I have no pets with me.',
        text_romaji:
            'Watashi wa ima hoteru ni tomatte imasu.\n' +
            '203-gōshitsu ni tomatte imasu.\n' +
            'Heya ni beddo ga futatsu arimasu.\n' +
            'Chiisai tēburu to isu ga futatsu arimasu.\n' +
            'Terebi to reizōko ga arimasu.\n' +
            'Kurōzetto mo arimasu.\n' +
            'Ofuro to toire ga arimasu.\n' +
            'Petto wa imasen.',
        questions: [
            {
                prompt_de: 'Was für ein Gebäude ist das?',
                prompt_en: 'What kind of building is this?',
                type: 'mc',
                correct: ['ホテル'],
                choices: [
                    { jp: 'マンション', de: 'Kondominium',    en: 'Condominium' },
                    { jp: 'アパート',   de: 'Mietwohnung',    en: 'Apartment'   },
                    { jp: 'ホテル',     de: 'Hotel',           en: 'Hotel'       },
                    { jp: '一軒家',     de: 'Einfamilienhaus', en: 'House'       }
                ],
                explanation_de: '「ホテルに とまっています」→ Es ist ein Hotel.',
                explanation_en: '「ホテルに とまっています」→ It is a hotel.'
            },
            {
                prompt_de: 'Wie viele Betten gibt es?',
                prompt_en: 'How many beds are there?',
                type: 'fill',
                correct: ['2', 'に', 'ni', '2つ', 'ふたつ'],
                explanation_de: '「ベッドが 2つ あります」→ Es gibt 2 Betten.',
                explanation_en: '「ベッドが 2つ あります」→ There are 2 beds.'
            },
            {
                prompt_de: 'Gibt es einen Kühlschrank?',
                prompt_en: 'Is there a refrigerator?',
                type: 'mc',
                correct: ['あります'],
                choices: [
                    { jp: 'あります',   de: 'Ja, es gibt einen',   en: 'Yes, there is one' },
                    { jp: 'ありません', de: 'Nein, es gibt keinen', en: 'No, there is none' }
                ],
                explanation_de: '「テレビと れいぞうこが あります」→ Es gibt einen Fernseher und einen Kühlschrank.',
                explanation_en: '「テレビと れいぞうこが あります」→ There is a TV and a refrigerator.'
            },
            {
                prompt_de: 'Gibt es einen Kleiderschrank?',
                prompt_en: 'Is there a closet?',
                type: 'mc',
                correct: ['あります'],
                choices: [
                    { jp: 'あります',   de: 'Ja, es gibt einen',   en: 'Yes, there is one' },
                    { jp: 'ありません', de: 'Nein, es gibt keinen', en: 'No, there is none' }
                ],
                explanation_de: '「クローゼットも あります」→ Es gibt auch einen Kleiderschrank.',
                explanation_en: '「クローゼットも あります」→ There is also a closet.'
            },
            {
                prompt_de: 'Welche Zimmernummer hat das Zimmer?',
                prompt_en: 'What is the room number?',
                type: 'fill',
                correct: ['203', 'にひゃくさん', 'nihyakusan'],
                explanation_de: '「203ごうしつに とまっています」→ Das Zimmer hat die Nummer 203.',
                explanation_en: '「203ごうしつに とまっています」→ The room number is 203.'
            }
        ]
    },

    /* ---- IKKENYA: Familie Tanaka (4 Personen, 2 Hunde, Garten) ---- */
    {
        id: 'ikkenya1',
        type: 'ikkenya',
        title_de: 'Das Haus der Familie Tanaka',
        title_en: "The Tanaka Family's House",
        text_jp:
            'わたしたちは たなかかぞくです。\n' +
            'いっけんやに すんでいます。\n' +
            'かぞくは 4にん います。\n' +
            '1かいに リビングと キッチンと おふろと トイレが あります。\n' +
            'リビングに おおきい テーブルと いすが 6つ あります。\n' +
            'ソファも あります。\n' +
            'キッチンに れいぞうこと せんたくきが あります。\n' +
            '2かいに ベッドルームが 3つ あります。\n' +
            'にわに きが 2ほん あります。\n' +
            'いぬが 2ひき います。',
        text_de:
            'Wir sind die Familie Tanaka.\n' +
            'Wir wohnen in einem Einfamilienhaus.\n' +
            'Unsere Familie hat 4 Personen.\n' +
            'Im Erdgeschoss gibt es ein Wohnzimmer, eine Küche, ein Bad und eine Toilette.\n' +
            'Im Wohnzimmer gibt es einen großen Tisch und 6 Stühle.\n' +
            'Es gibt auch ein Sofa.\n' +
            'In der Küche gibt es einen Kühlschrank und eine Waschmaschine.\n' +
            'Im Obergeschoss gibt es 3 Schlafzimmer.\n' +
            'Im Garten gibt es 2 Bäume.\n' +
            'Wir haben 2 Hunde.',
        text_en:
            'We are the Tanaka family.\n' +
            'We live in a house.\n' +
            'Our family has 4 members.\n' +
            'On the 1st floor there is a living room, a kitchen, a bathroom, and a toilet.\n' +
            'In the living room there is a big table and 6 chairs.\n' +
            'There is also a sofa.\n' +
            'In the kitchen there is a refrigerator and a washing machine.\n' +
            'On the 2nd floor there are 3 bedrooms.\n' +
            'In the garden there are 2 trees.\n' +
            'We have 2 dogs.',
        text_romaji:
            'Watashitachi wa Tanaka-kazoku desu.\n' +
            'Ikkenya ni sunde imasu.\n' +
            'Kazoku wa 4-nin imasu.\n' +
            '1-kai ni ribingu to kicchin to ofuro to toire ga arimasu.\n' +
            'Ribingu ni ōkii tēburu to isu ga muttsu arimasu.\n' +
            'Sofa mo arimasu.\n' +
            'Kicchin ni reizōko to sentakuki ga arimasu.\n' +
            '2-kai ni beddo rūmu ga mittsu arimasu.\n' +
            'Niwa ni ki ga nihon arimasu.\n' +
            'Inu ga nihiki imasu.',
        questions: [
            {
                prompt_de: 'Was für ein Gebäude ist das?',
                prompt_en: 'What kind of building is this?',
                type: 'mc',
                correct: ['いっけんや'],
                choices: [
                    { jp: 'マンション', de: 'Kondominium',    en: 'Condominium' },
                    { jp: 'アパート',   de: 'Mietwohnung',    en: 'Apartment'   },
                    { jp: 'ホテル',     de: 'Hotel',           en: 'Hotel'       },
                    { jp: 'いっけんや', de: 'Einfamilienhaus', en: 'House'       }
                ],
                explanation_de: '「いっけんやに すんでいます」→ Es ist ein Einfamilienhaus.',
                explanation_en: '「いっけんやに すんでいます」→ It is a house.'
            },
            {
                prompt_de: 'Wie viele Personen wohnen hier?',
                prompt_en: 'How many people live here?',
                type: 'fill',
                correct: ['4', 'よん', 'yon', '4にん', 'よにん'],
                explanation_de: '「かぞくは 4にん います」→ Unsere Familie hat 4 Personen.',
                explanation_en: '「かぞくは 4にん います」→ Our family has 4 members.'
            },
            {
                prompt_de: 'Wie viele Schlafzimmer gibt es im Obergeschoss?',
                prompt_en: 'How many bedrooms are there on the 2nd floor?',
                type: 'fill',
                correct: ['3', 'さん', 'san', '3つ', 'みっつ'],
                explanation_de: '「2かいに ベッドルームが 3つ あります」→ Im Obergeschoss gibt es 3 Schlafzimmer.',
                explanation_en: '「2かいに ベッドルームが 3つ あります」→ On the 2nd floor there are 3 bedrooms.'
            },
            {
                prompt_de: 'Wie viele Bäume gibt es im Garten?',
                prompt_en: 'How many trees are in the garden?',
                type: 'fill',
                correct: ['2', 'に', 'ni', '2ほん', 'にほん'],
                explanation_de: '「にわに きが 2ほん あります」→ Im Garten gibt es 2 Bäume.',
                explanation_en: '「にわに きが 2ほん あります」→ In the garden there are 2 trees.'
            },
            {
                prompt_de: 'Was gibt es im Erdgeschoss?',
                prompt_en: 'What is on the 1st floor?',
                type: 'mc',
                correct: ['リビング・キッチン・おふろ・トイレ'],
                choices: [
                    { jp: 'リビング・キッチン・おふろ・トイレ', de: 'Wohnzimmer, Küche, Bad, Toilette',  en: 'Living room, kitchen, bathroom, toilet' },
                    { jp: 'ベッドルームが 3つ',                 de: '3 Schlafzimmer',                   en: '3 Bedrooms'                            },
                    { jp: 'にわとき',                           de: 'Garten und Bäume',                 en: 'Garden and trees'                      },
                    { jp: 'テーブルとソファだけ',                de: 'Nur Tisch und Sofa',               en: 'Only table and sofa'                   }
                ],
                explanation_de: '「1かいに リビングと キッチンと おふろと トイレが あります」→ Im Erdgeschoss gibt es ein Wohnzimmer, eine Küche, ein Bad und eine Toilette.',
                explanation_en: '「1かいに リビングと キッチンと おふろと トイレが あります」→ On the 1st floor there is a living room, a kitchen, a bathroom, and a toilet.'
            },
            {
                prompt_de: 'Wie viele Hunde gibt es?',
                prompt_en: 'How many dogs are there?',
                type: 'fill',
                correct: ['2', 'に', 'ni', '2ひき', 'にひき'],
                explanation_de: '「いぬが 2ひき います」→ Wir haben 2 Hunde.',
                explanation_en: '「いぬが 2ひき います」→ We have 2 dogs.'
            }
        ]
    }
];

/* ============ NACHSCHLAG-REFERENZ ============ */

const existenceReference = {
    build_de: function(container) {
        container.innerHTML = `
<details class="ref-block" open>
  <summary>Grammatik: あります / います</summary>
  <div class="ref-body">
    <table class="ref-table">
      <tr><th>Form</th><th>Bedeutung</th><th>Verwendung</th></tr>
      <tr><td>〜が あります</td><td>es gibt 〜</td><td>Gegenstände, Dinge</td></tr>
      <tr><td>〜が います</td><td>es gibt 〜</td><td>Personen, Tiere</td></tr>
      <tr><td>〜は ありません</td><td>es gibt kein 〜</td><td>Verneinung (Dinge)</td></tr>
      <tr><td>〜は いません</td><td>es gibt kein 〜</td><td>Verneinung (Personen/Tiere)</td></tr>
      <tr><td>〜に 〜が あります</td><td>in 〜 gibt es 〜</td><td>Ort + Gegenstand</td></tr>
    </table>
  </div>
</details>
<details class="ref-block">
  <summary>Gebäudetypen</summary>
  <div class="ref-body">
    <table class="ref-table">
      <tr><th>Japanisch</th><th>Deutsch</th></tr>
      <tr><td>マンション</td><td>Kondominium (Eigentumswohnung)</td></tr>
      <tr><td>アパート</td><td>Mietwohnung</td></tr>
      <tr><td>ホテル</td><td>Hotel</td></tr>
      <tr><td>一軒家 (いっけんや)</td><td>Einfamilienhaus</td></tr>
    </table>
  </div>
</details>
<details class="ref-block">
  <summary>Räume</summary>
  <div class="ref-body">
    <table class="ref-table">
      <tr><th>Japanisch</th><th>Deutsch</th></tr>
      <tr><td>リビング</td><td>Wohnzimmer</td></tr>
      <tr><td>キッチン / だいどころ</td><td>Küche</td></tr>
      <tr><td>ベッドルーム / しんしつ</td><td>Schlafzimmer</td></tr>
      <tr><td>おふろ</td><td>Bad / Badezimmer</td></tr>
      <tr><td>トイレ</td><td>Toilette</td></tr>
      <tr><td>にわ</td><td>Garten</td></tr>
    </table>
  </div>
</details>
<details class="ref-block">
  <summary>Möbel &amp; Gegenstände</summary>
  <div class="ref-body">
    <table class="ref-table">
      <tr><th>Japanisch</th><th>Deutsch</th></tr>
      <tr><td>テーブル</td><td>Tisch</td></tr>
      <tr><td>いす</td><td>Stuhl</td></tr>
      <tr><td>ソファ</td><td>Sofa</td></tr>
      <tr><td>ベッド</td><td>Bett</td></tr>
      <tr><td>タンス</td><td>Kommode / Schrank</td></tr>
      <tr><td>デスク</td><td>Schreibtisch</td></tr>
      <tr><td>テレビ</td><td>Fernseher</td></tr>
      <tr><td>れいぞうこ</td><td>Kühlschrank</td></tr>
      <tr><td>せんたくき</td><td>Waschmaschine</td></tr>
      <tr><td>クローゼット</td><td>Kleiderschrank</td></tr>
    </table>
  </div>
</details>`;
    },
    build_en: function(container) {
        container.innerHTML = `
<details class="ref-block" open>
  <summary>Grammar: あります / います</summary>
  <div class="ref-body">
    <table class="ref-table">
      <tr><th>Form</th><th>Meaning</th><th>Usage</th></tr>
      <tr><td>〜が あります</td><td>there is/are 〜</td><td>Objects, things</td></tr>
      <tr><td>〜が います</td><td>there is/are 〜</td><td>People, animals</td></tr>
      <tr><td>〜は ありません</td><td>there is no 〜</td><td>Negation (things)</td></tr>
      <tr><td>〜は いません</td><td>there is no 〜</td><td>Negation (people/animals)</td></tr>
      <tr><td>〜に 〜が あります</td><td>in 〜 there is 〜</td><td>Location + object</td></tr>
    </table>
  </div>
</details>
<details class="ref-block">
  <summary>Building Types</summary>
  <div class="ref-body">
    <table class="ref-table">
      <tr><th>Japanese</th><th>English</th></tr>
      <tr><td>マンション</td><td>Condominium</td></tr>
      <tr><td>アパート</td><td>Apartment</td></tr>
      <tr><td>ホテル</td><td>Hotel</td></tr>
      <tr><td>一軒家 (いっけんや)</td><td>House</td></tr>
    </table>
  </div>
</details>
<details class="ref-block">
  <summary>Rooms</summary>
  <div class="ref-body">
    <table class="ref-table">
      <tr><th>Japanese</th><th>English</th></tr>
      <tr><td>リビング</td><td>Living room</td></tr>
      <tr><td>キッチン / だいどころ</td><td>Kitchen</td></tr>
      <tr><td>ベッドルーム / しんしつ</td><td>Bedroom</td></tr>
      <tr><td>おふろ</td><td>Bathroom</td></tr>
      <tr><td>トイレ</td><td>Toilet</td></tr>
      <tr><td>にわ</td><td>Garden</td></tr>
    </table>
  </div>
</details>
<details class="ref-block">
  <summary>Furniture &amp; Objects</summary>
  <div class="ref-body">
    <table class="ref-table">
      <tr><th>Japanese</th><th>English</th></tr>
      <tr><td>テーブル</td><td>Table</td></tr>
      <tr><td>いす</td><td>Chair</td></tr>
      <tr><td>ソファ</td><td>Sofa</td></tr>
      <tr><td>ベッド</td><td>Bed</td></tr>
      <tr><td>タンス</td><td>Dresser / Wardrobe</td></tr>
      <tr><td>デスク</td><td>Desk</td></tr>
      <tr><td>テレビ</td><td>TV</td></tr>
      <tr><td>れいぞうこ</td><td>Refrigerator</td></tr>
      <tr><td>せんたくき</td><td>Washing machine</td></tr>
      <tr><td>クローゼット</td><td>Closet</td></tr>
    </table>
  </div>
</details>`;
    }
};

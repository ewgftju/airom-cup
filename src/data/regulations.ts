import type { Language } from "@/i18n/translations";

export const regulationsDocument = {
  pdf: "/regulations/airom-cup-2026-2014.pdf",
  cover: "/regulations/airom-cup-2026-2014-cover.jpg",
};

export const sectionIds = [
  "goals", "venue", "participants", "admission", "format", "rules", "medical", "fees",
] as const;

type Fee = { basis: string; price: string; includes: string };
type Clause = { text?: string; points?: string[]; fees?: Fee[] };
type Section = { title: string; clauses: Clause[] };

type Regulations = {
  title: [string, string];
  subtitle: string;
  dates: string;
  location: string;
  approval: string;
  original: string;
  fileInfo: string;
  open: string;
  download: string;
  contents: string;
  toContents: string;
  translationNote?: string;
  sections: Record<(typeof sectionIds)[number], Section>;
};

export const regulations: Record<Language, Regulations> = {
  ru: {
    title: ["Положение", "турнира"],
    subtitle: "Международный кубок «AIROM CUP» по баскетболу среди юношей 2014 года рождения и младше",
    dates: "23–25 ноября 2026",
    location: "Атырау, Казахстан",
    approval: "Утвердил О. Н. Пастух, директор ТОО «AiRom World Service».",
    original: "Подписанный оригинал",
    fileInfo: "PDF · 3 стр. · 1,5 МБ · на русском",
    open: "Открыть скан",
    download: "Скачать оригинал",
    contents: "Содержание",
    toContents: "К содержанию",
    sections: {
      goals: {
        title: "Цели и задачи",
        clauses: [{
          points: [
            "Развитие и популяризация баскетбола.",
            "Повышение индивидуального мастерства юных баскетболистов.",
            "Выявление перспективных молодых игроков.",
            "Обмена опытом работы детских тренеров.",
          ],
        }],
      },
      venue: {
        title: "Место и время проведения турнира",
        clauses: [{
          text: "Сроки и место проведения МЕЖДУНАРОДНОГО КУБКА «AIROM CUP» по баскетболу среди юношей 2014 г.р. и младше:",
          points: ["Место проведения: г. Атырау, Казахстан.", "Даты проведения: 23–25 ноября 2026 года."],
        }],
      },
      participants: {
        title: "Участники соревнований",
        clauses: [
          { text: "В Кубке могут принимать участие игроки из зарубежных стран, а также сборные команды РК." },
          { text: "К участию допускаются команды численностью не менее 10 человек. Команды, в составе которых менее 10 человек, не допускаются к участию в соревнованиях." },
          { text: "В случае невозможности сформировать команду исключительно из игроков одного года рождения, допускается включение двух игроков 2013 г.р., и игроков младшего возраста." },
        ],
      },
      admission: {
        title: "Допуск команд к турниру",
        clauses: [{
          text: "Не позднее чем за 7 дней команды обязаны предоставить следующие документы для допуска к соревнованиям:",
          points: [
            "Техническую заявку установленного образца.",
            "Команда, не оплатившая взнос, к соревнованию не допускается.",
          ],
        }],
      },
      format: {
        title: "Система проведения Кубка",
        clauses: [
          {
            text: "Система проведения Кубка определяется заблаговременно и зависит от количества заявленных команд.",
            points: [
              "При участии не более 8 команд соревнования проводятся по круговой системе.",
              "При участии 9 команд и более команды делятся на подгруппы с последующим определением победителей.",
            ],
          },
          { text: "Возможные изменения и дополнения к настоящему Положению рассматриваются до начала Кубка и утверждаются организаторами соревнований." },
        ],
      },
      rules: {
        title: "Правила проведения соревнований",
        clauses: [
          { text: "Матч состоит из четырех четвертей по 10 минут игрового времени каждая." },
          { text: "При разнице в счёте 25 очков и более до конца матча применяется правило непрерывного игрового времени («грязное время»)." },
          { text: "Разрешена любая форма защиты (в том числе зонная и смешанная)." },
          { text: "Игры турнира будут проводиться мячом № 7." },
          {
            text: "Каждую игру обслуживают:",
            points: [
              "Двое судей на поле.",
              "Бригада судей (секретарей) — не менее трех человек: статист, протоколист, оператор табло.",
            ],
          },
          { text: "Обращения команд по поводу замены судей, назначенных на матчи Кубка, не принимаются и не рассматриваются." },
        ],
      },
      medical: {
        title: "Медико-санитарное обеспечение",
        clauses: [{ text: "Принимающая сторона в обязательном порядке обеспечивает медицинское обслуживание участников Кубка." }],
      },
      fees: {
        title: "Финансовые условия",
        clauses: [
          {
            text: "Для участия в Кубке команда обязана внести вступительный взнос, выбрав один из вариантов участия:",
            fees: [
              { basis: "В сутки за каждого участника", price: "15 000 тенге / 25 EUR / 30 USD / 2 800 рублей", includes: "В указанную сумму входят: проживание, питание, трансфер, судейство, наградная продукция." },
              { basis: "За команду", price: "150 000 тенге / 27 500 рублей / 330 USD / 295 EUR", includes: "В указанную стоимость входят: судейство, трансфер чтобы встретить/проводить команду на вокзал/аэропорт, наградная продукция." },
            ],
          },
          {
            text: "Все финансовые расходы, связанные с организацией и проведением Кубка, несёт ТОО «AiRom World Service», в том числе:",
            points: ["Решение организационных вопросов.", "Предоставление спортивного зала.", "Проведение церемоний открытия и закрытия Кубка.", "Награждение команд (кубки, медали, дипломы).", "Информационное освещение мероприятия."],
          },
          { text: "Все расходы приезжих команд (проезд, проживание, питание и др.) осуществляются за счёт командирующих организаций." },
        ],
      },
    },
  },
  kk: {
    title: ["Турнир", "ережесі"],
    subtitle: "2014 жылы туған және одан кіші жасөспірім ұлдар арасындағы баскетболдан «AIROM CUP» халықаралық кубогы",
    dates: "2026 жылғы 23–25 қараша",
    location: "Атырау, Қазақстан",
    approval: "«AiRom World Service» ЖШС директоры О. Н. Пастух бекіткен.",
    original: "Қол қойылған түпнұсқа",
    fileInfo: "PDF · 3 бет · 1,5 МБ · орыс тілінде",
    open: "Сканды ашу",
    download: "Түпнұсқаны жүктеу",
    contents: "Мазмұны",
    toContents: "Мазмұнына оралу",
    translationNote: "Бұл аударма танысу үшін берілген. Бекітілген түпнұсқа PDF файлында орыс тілінде берілген.",
    sections: {
      goals: {
        title: "Мақсаты мен міндеттері",
        clauses: [{
          points: [
            "Баскетболды дамыту және кеңінен насихаттау.",
            "Жас баскетболшылардың жеке шеберлігін арттыру.",
            "Болашағы зор жас ойыншыларды анықтау.",
            "Балалар жаттықтырушыларының тәжірибе алмасуына мүмкіндік беру.",
          ],
        }],
      },
      venue: {
        title: "Турнирдің өтетін орны мен мерзімі",
        clauses: [{
          text: "2014 жылы туған және одан кіші жасөспірім ұлдар арасындағы баскетболдан «AIROM CUP» халықаралық кубогының өтетін орны мен мерзімі:",
          points: ["Өтетін орны: Атырау қаласы, Қазақстан.", "Өтетін мерзімі: 2026 жылғы 23–25 қараша."],
        }],
      },
      participants: {
        title: "Жарысқа қатысушылар",
        clauses: [
          { text: "Кубокқа шет елдердің ойыншылары, сондай-ақ Қазақстан Республикасының құрама командалары қатыса алады." },
          { text: "Жарысқа кемінде 10 адамнан тұратын командалар жіберіледі. Құрамында 10 адамнан аз команда жарысқа жіберілмейді." },
          { text: "Команданы тек бір жылы туған ойыншылардан жасақтау мүмкін болмаған жағдайда, оның құрамына 2013 жылы туған екі ойыншыны және жасы кіші ойыншыларды қосуға рұқсат етіледі." },
        ],
      },
      admission: {
        title: "Командаларды турнирге жіберу",
        clauses: [{
          text: "Жарысқа жіберілу үшін командалар жарыс басталғанға дейін кемінде 7 күн бұрын мына құжатты ұсынуға міндетті:",
          points: ["Белгіленген үлгідегі техникалық өтінім.", "Жарнаны төлемеген команда жарысқа жіберілмейді."],
        }],
      },
      format: {
        title: "Кубокты өткізу жүйесі",
        clauses: [
          {
            text: "Кубокты өткізу жүйесі алдын ала анықталады және өтінім берген командалар санына байланысты.",
            points: ["8 немесе одан аз команда қатысса, жарыс айналмалы жүйемен өтеді.", "9 немесе одан көп команда қатысса, командалар кіші топтарға бөлінеді, содан кейін жеңімпаздар анықталады."],
          },
          { text: "Осы Ережеге енгізілуі мүмкін өзгерістер мен толықтырулар Кубок басталғанға дейін қаралады және оларды жарысты ұйымдастырушылар бекітеді." },
        ],
      },
      rules: {
        title: "Жарысты өткізу қағидалары",
        clauses: [
          { text: "Матч әрқайсысы 10 минут ойын уақытына созылатын төрт кезеңнен тұрады." },
          { text: "Есеп айырмасы 25 ұпайға немесе одан да көпке жеткенде, матч аяқталғанға дейін үздіксіз ойын уақыты ережесі қолданылады («лас уақыт»)." },
          { text: "Қорғаныстың кез келген түріне, оның ішінде аймақтық және аралас қорғанысқа рұқсат етіледі." },
          { text: "Турнир ойындары № 7 доппен өткізіледі." },
          {
            text: "Әр ойынға мына төрешілер қызмет көрсетеді:",
            points: ["Алаңдағы екі төреші.", "Кемінде үш адамнан тұратын төрешілер (хатшылар) тобы: статистик, хаттама жүргізуші және табло операторы."],
          },
          { text: "Командалардың Кубок матчтарына тағайындалған төрешілерді ауыстыру туралы өтініштері қабылданбайды және қаралмайды." },
        ],
      },
      medical: {
        title: "Медициналық-санитарлық қамтамасыз ету",
        clauses: [{ text: "Қабылдаушы тарап Кубокқа қатысушыларға медициналық қызмет көрсетуді қамтамасыз етуге міндетті." }],
      },
      fees: {
        title: "Қаржылық шарттар",
        clauses: [
          {
            text: "Кубокқа қатысу үшін команда төмендегі нұсқалардың бірін таңдап, жарна төлеуге міндетті:",
            fees: [
              { basis: "Әр қатысушы үшін тәулігіне", price: "15 000 теңге / 25 EUR / 30 USD / 2 800 рубль", includes: "Сомаға тұру, тамақтану, трансфер, төрешілер қызметі және марапаттау бұйымдары кіреді." },
              { basis: "Команда үшін", price: "150 000 теңге / 27 500 рубль / 330 USD / 295 EUR", includes: "Сомаға төрешілер қызметі, команданы вокзалдан немесе әуежайдан қарсы алу және шығарып салу трансфері, сондай-ақ марапаттау бұйымдары кіреді." },
            ],
          },
          {
            text: "Кубокты ұйымдастыруға және өткізуге байланысты барлық қаржылық шығыстарды «AiRom World Service» ЖШС көтереді, оның ішінде:",
            points: ["Ұйымдастыру мәселелерін шешу.", "Спорт залын ұсыну.", "Кубоктың ашылу және жабылу салтанаттарын өткізу.", "Командаларды марапаттау (кубоктар, медальдар, дипломдар).", "Іс-шараны ақпараттық тұрғыдан жариялау."],
          },
          { text: "Келген командалардың барлық шығындарын (жол жүру, тұру, тамақтану және т.б.) оларды жіберген ұйымдар өтейді." },
        ],
      },
    },
  },
  en: {
    title: ["Tournament", "regulations"],
    subtitle: "AIROM CUP international basketball tournament for boys born in 2014 or later",
    dates: "23–25 November 2026",
    location: "Atyrau, Kazakhstan",
    approval: "Approved by O. N. Pastukh, Director of AiRom World Service LLP.",
    original: "Signed original",
    fileInfo: "PDF · 3 pages · 1.5 MB · in Russian",
    open: "View scan",
    download: "Download original",
    contents: "Contents",
    toContents: "Back to contents",
    translationNote: "This translation is for reference. The signed Russian original is available as a PDF.",
    sections: {
      goals: {
        title: "Aims and objectives",
        clauses: [{
          points: [
            "Develop and promote basketball.",
            "Improve young basketball players’ individual skills.",
            "Identify promising young players.",
            "Give youth coaches an opportunity to share their experience.",
          ],
        }],
      },
      venue: {
        title: "Tournament venue and dates",
        clauses: [{
          text: "The AIROM CUP international basketball tournament for boys born in 2014 or later will take place as follows:",
          points: ["Venue: Atyrau, Kazakhstan.", "Dates: 23–25 November 2026."],
        }],
      },
      participants: {
        title: "Participants",
        clauses: [
          { text: "Players from other countries and representative teams from Kazakhstan may participate in the Cup." },
          { text: "Teams must have at least 10 members. Teams with fewer than 10 members will not be admitted to the competition." },
          { text: "If a team cannot field a squad made up entirely of players born in the same year, it may include two players born in 2013 as well as younger players." },
        ],
      },
      admission: {
        title: "Team admission",
        clauses: [{
          text: "To be admitted to the competition, teams must submit the following document at least 7 days in advance:",
          points: ["A technical entry form in the prescribed format.", "Teams that have not paid the entry fee will not be admitted."],
        }],
      },
      format: {
        title: "Competition format",
        clauses: [
          {
            text: "The Cup format is determined in advance and depends on the number of teams entered.",
            points: ["With 8 teams or fewer, the competition follows a round-robin format.", "With 9 teams or more, teams are divided into groups and the winners are then determined."],
          },
          { text: "Any changes or additions to these regulations are considered before the Cup begins and approved by the competition organizers." },
        ],
      },
      rules: {
        title: "Playing rules",
        clauses: [
          { text: "Each game consists of four quarters of 10 minutes of playing time each." },
          { text: "Once the score difference reaches 25 points or more, a running clock applies until the end of the game." },
          { text: "Any form of defense is allowed, including zone and mixed defenses." },
          { text: "A size 7 basketball will be used for tournament games." },
          {
            text: "Each game is officiated by:",
            points: ["Two referees on the court.", "A crew of at least three table officials: a statistician, a scorekeeper and a scoreboard operator."],
          },
          { text: "Requests from teams to replace referees assigned to Cup games will not be accepted or considered." },
        ],
      },
      medical: {
        title: "Medical services",
        clauses: [{ text: "The host must provide medical services for Cup participants." }],
      },
      fees: {
        title: "Financial terms",
        clauses: [
          {
            text: "To participate in the Cup, a team must pay an entry fee under one of the following options:",
            fees: [
              { basis: "Per participant, per day", price: "15,000 KZT / 25 EUR / 30 USD / 2,800 RUB", includes: "Includes accommodation, meals, transfers, officiating and awards." },
              { basis: "Per team", price: "150,000 KZT / 27,500 RUB / 330 USD / 295 EUR", includes: "Includes officiating, transfers to meet and see off the team at the railway station or airport, and awards." },
            ],
          },
          {
            text: "AiRom World Service LLP bears all expenses related to organizing and running the Cup, including:",
            points: ["Handling organizational matters.", "Providing the sports hall.", "Holding the opening and closing ceremonies.", "Presenting team awards (cups, medals and diplomas).", "Providing media coverage of the event."],
          },
          { text: "The organizations sending visiting teams cover all their teams’ expenses, including travel, accommodation and meals." },
        ],
      },
    },
  },
};

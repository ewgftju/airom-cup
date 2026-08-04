"use client";

import Image from "next/image";
import Link from "next/link";
import type { PastResult } from "@/data/pastResults";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Language } from "@/i18n/translations";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import styles from "./ProtocolPage.module.css";

const protocolCopy: Record<Language, {
  back: string;
  archive: string;
  title: string;
  published: string;
  archiveCode: string;
  discipline: string;
  basketball: string;
  summary: string;
  event: string;
  category: string;
  dates: string;
  location: string;
  locationValue: string;
  organizer: string;
  organizerValue: string;
  participants: string;
  games: string;
  gamesDescription: string;
  finalTable: string;
  standingsDescription: string;
  number: string;
  stage: string;
  match: string;
  score: string;
  place: string;
  group: string;
  team: string;
  points: string;
  status: string;
  noGames: string;
  footer: string;
}> = {
  ru: {
    back: "К АРХИВУ РЕЗУЛЬТАТОВ",
    archive: "ОФИЦИАЛЬНЫЙ АРХИВ AIROM CUP",
    title: "ТУРНИРНЫЙ ПРОТОКОЛ",
    published: "ОПУБЛИКОВАН",
    archiveCode: "АРХИВНЫЙ КОД",
    discipline: "ДИСЦИПЛИНА",
    basketball: "БАСКЕТБОЛ",
    summary: "СВОДНАЯ ИНФОРМАЦИЯ",
    event: "ТУРНИР",
    category: "КАТЕГОРИЯ",
    dates: "ДАТА / СТАТУС",
    location: "МЕСТО ПРОВЕДЕНИЯ",
    locationValue: "АТЫРАУ · КАЗАХСТАН",
    organizer: "ОРГАНИЗАТОР",
    organizerValue: "AIROM JUNIOR SPORT ACADEMY",
    participants: "УЧАСТНИКОВ",
    games: "ВСЕ ИГРЫ ТУРНИРА",
    gamesDescription: "Полный перечень матчей и зафиксированный итоговый счёт.",
    finalTable: "ИТОГОВАЯ ТАБЛИЦА",
    standingsDescription: "Все команды и их итоговое положение в турнире.",
    number: "№",
    stage: "ЭТАП",
    match: "МАТЧ",
    score: "СЧЁТ",
    place: "МЕСТО",
    group: "ГРУППА",
    team: "КОМАНДА",
    points: "ОЧКИ",
    status: "СТАТУС",
    noGames: "СЧЁТ МАТЧЕЙ НЕ СОХРАНЁН",
    footer: "AIROM CUP · OFFICIAL RESULTS ARCHIVE",
  },
  kk: {
    back: "НӘТИЖЕЛЕР МҰРАҒАТЫНА",
    archive: "AIROM CUP РЕСМИ МҰРАҒАТЫ",
    title: "ТУРНИР ХАТТАМАСЫ",
    published: "ЖАРИЯЛАНДЫ",
    archiveCode: "МҰРАҒАТ КОДЫ",
    discipline: "СПОРТ ТҮРІ",
    basketball: "БАСКЕТБОЛ",
    summary: "ЖАЛПЫ АҚПАРАТ",
    event: "ТУРНИР",
    category: "САНАТ",
    dates: "КҮНІ / МӘРТЕБЕСІ",
    location: "ӨТЕТІН ЖЕРІ",
    locationValue: "АТЫРАУ · ҚАЗАҚСТАН",
    organizer: "ҰЙЫМДАСТЫРУШЫ",
    organizerValue: "AIROM JUNIOR SPORT ACADEMY",
    participants: "ҚАТЫСУШЫ",
    games: "ТУРНИРДІҢ БАРЛЫҚ ОЙЫНДАРЫ",
    gamesDescription: "Матчтардың толық тізімі және тіркелген қорытынды есеп.",
    finalTable: "ҚОРЫТЫНДЫ КЕСТЕ",
    standingsDescription: "Барлық командалар және олардың турнирдегі қорытынды орны.",
    number: "№",
    stage: "КЕЗЕҢ",
    match: "МАТЧ",
    score: "ЕСЕП",
    place: "ОРЫН",
    group: "ТОП",
    team: "КОМАНДА",
    points: "ҰПАЙ",
    status: "МӘРТЕБЕ",
    noGames: "МАТЧ ЕСЕПТЕРІ САҚТАЛМАҒАН",
    footer: "AIROM CUP · OFFICIAL RESULTS ARCHIVE",
  },
  en: {
    back: "BACK TO RESULTS ARCHIVE",
    archive: "OFFICIAL AIROM CUP ARCHIVE",
    title: "TOURNAMENT PROTOCOL",
    published: "PUBLISHED",
    archiveCode: "ARCHIVE CODE",
    discipline: "DISCIPLINE",
    basketball: "BASKETBALL",
    summary: "TOURNAMENT SUMMARY",
    event: "EVENT",
    category: "CATEGORY",
    dates: "DATE / STATUS",
    location: "LOCATION",
    locationValue: "ATYRAU · KAZAKHSTAN",
    organizer: "ORGANIZER",
    organizerValue: "AIROM JUNIOR SPORT ACADEMY",
    participants: "TEAMS",
    games: "ALL TOURNAMENT GAMES",
    gamesDescription: "Every recorded fixture and its official final score.",
    finalTable: "FINAL STANDINGS",
    standingsDescription: "Every team and its final tournament position.",
    number: "NO.",
    stage: "STAGE",
    match: "MATCH",
    score: "SCORE",
    place: "PLACE",
    group: "GROUP",
    team: "TEAM",
    points: "PTS",
    status: "STATUS",
    noGames: "MATCH SCORES WERE NOT RECORDED",
    footer: "AIROM CUP · OFFICIAL RESULTS ARCHIVE",
  },
};

export default function ProtocolPage({ result }: { result: PastResult }) {
  const { language } = useLanguage();
  const copy = protocolCopy[language];
  const archiveCode = `AC-${result.id.toUpperCase()}`;

  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />

      <header className={styles.header}>
        <Link href="/results" className={styles.backLink}>
          <span aria-hidden="true">←</span>
          {copy.back}
        </Link>

        <Link href="/" className={styles.brand} aria-label="AIROM CUP">
          <Image src="/images/logos/airom-cup-logo.png" alt="AIROM CUP" width={64} height={64} priority />
          <div>
            <strong>AIROM CUP</strong>
            <span>RESULTS ARCHIVE</span>
          </div>
        </Link>

        <LanguageSwitcher />
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p>{copy.archive}</p>
          <h1>{copy.title}</h1>
          <div className={styles.category}>{result.category[language]}</div>
        </div>

        <div className={styles.heroMeta}>
          <span className={styles.published}><i aria-hidden="true" />{copy.published}</span>
          <div><span>{copy.archiveCode}</span><strong>{archiveCode}</strong></div>
          <div><span>{copy.discipline}</span><strong>{copy.basketball}</strong></div>
        </div>
      </section>

      <section className={styles.document}>
        <div className={styles.documentTopline}>
          <span>AIROM CUP</span>
          <strong>{copy.summary}</strong>
          <span>{String(result.standings.length).padStart(2, "0")} {copy.participants}</span>
        </div>

        <div className={styles.summary}>
          <div><span>{copy.event}</span><strong>{result.event[language]}</strong></div>
          <div><span>{copy.category}</span><strong>{result.category[language]}</strong></div>
          <div><span>{copy.dates}</span><strong>{result.dates[language]}</strong></div>
          <div><span>{copy.location}</span><strong>{copy.locationValue}</strong></div>
          <div><span>{copy.organizer}</span><strong>{copy.organizerValue}</strong></div>
        </div>

        <div className={styles.sectionHeading}>
          <div><span>01</span><h2>{copy.games}</h2></div>
          <p>{copy.gamesDescription}</p>
        </div>

        {result.games.length > 0 ? (
          <div className={styles.gamesTable} role="table" aria-label={copy.games}>
            <div className={styles.gamesHead} role="row">
              <span role="columnheader">{copy.number}</span>
              <span role="columnheader">{copy.stage}</span>
              <span role="columnheader">{copy.match}</span>
              <span role="columnheader">{copy.score}</span>
              <span role="columnheader" aria-hidden="true" />
            </div>
            {result.games.map((game, index) => (
              <div className={styles.gameRow} role="row" key={`${game.teamA}-${game.teamB}-${index}`}>
                <span className={styles.gameNumber} role="cell">{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.gameStage} role="cell">{game.stage?.[language] ?? "—"}</span>
                <strong className={styles.teamA} role="cell">{game.teamA}</strong>
                <b className={styles.gameScore} role="cell">
                  <i>{game.scoreA}</i><em>:</em><i>{game.scoreB}</i>
                </b>
                <strong className={styles.teamB} role="cell">{game.teamB}</strong>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noGames}>
            <strong>{copy.noGames}</strong>
            <p>{result.dataNote?.[language]}</p>
          </div>
        )}

        <div className={styles.sectionHeading}>
          <div><span>02</span><h2>{copy.finalTable}</h2></div>
          <p>{copy.standingsDescription}</p>
        </div>

        <div className={styles.standingsTable} role="table" aria-label={copy.finalTable}>
          <div className={styles.standingsHead} role="row">
            <span role="columnheader">{copy.place}</span>
            <span role="columnheader">{copy.group}</span>
            <span role="columnheader">{copy.team}</span>
            <span role="columnheader">{copy.points}</span>
            <span role="columnheader">{copy.status}</span>
          </div>
          {result.standings.map((standing) => (
            <div className={styles.standingRow} role="row" key={`${standing.group ?? "all"}-${standing.place}-${standing.team}`}>
              <strong className={styles.position} role="cell">{standing.place}</strong>
              <span className={styles.group} role="cell">{standing.group ? `${copy.group} ${standing.group}` : "—"}</span>
              <strong className={styles.standingTeam} role="cell">{standing.team}</strong>
              <b className={styles.points} role="cell">{standing.points ?? "—"}</b>
              <span className={styles.note} role="cell">{standing.note?.[language] ?? "—"}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>{copy.footer}</span>
        <span>{archiveCode}</span>
      </footer>
    </main>
  );
}

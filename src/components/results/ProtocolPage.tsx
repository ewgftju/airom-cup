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
  standings: string;
  groupStandings: string;
  place: string;
  group: string;
  team: string;
  result: string;
  prize: string;
  groupLeader: string;
  sourceTitle: string;
  sourceDescription: string;
  openSource: string;
  note: string;
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
    standings: "ИТОГОВЫЕ РЕЗУЛЬТАТЫ",
    groupStandings: "ЛИДЕРЫ ГРУППОВОГО ЭТАПА",
    place: "МЕСТО",
    group: "ГРУППА",
    team: "КОМАНДА",
    result: "РЕЗУЛЬТАТ",
    prize: "ПРИЗОВОЕ МЕСТО",
    groupLeader: "ЛИДЕР ГРУППЫ",
    sourceTitle: "ИСХОДНЫЙ ДОКУМЕНТ",
    sourceDescription: "Веб-протокол составлен по оригинальной турнирной таблице. Исходный файл сохранён в архиве без изменений.",
    openSource: "ОТКРЫТЬ ИСХОДНЫЙ ФАЙЛ",
    note: "Результаты опубликованы в архиве AIROM CUP на основании предоставленного турнирного протокола.",
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
    standings: "ҚОРЫТЫНДЫ НӘТИЖЕЛЕР",
    groupStandings: "ТОПТЫҚ КЕЗЕҢ КӨШБАСШЫЛАРЫ",
    place: "ОРЫН",
    group: "ТОП",
    team: "КОМАНДА",
    result: "НӘТИЖЕ",
    prize: "ЖҮЛДЕЛІ ОРЫН",
    groupLeader: "ТОП КӨШБАСШЫСЫ",
    sourceTitle: "БАСТАПҚЫ ҚҰЖАТ",
    sourceDescription: "Веб-хаттама түпнұсқа турнир кестесі негізінде жасалды. Бастапқы файл мұрағатта өзгеріссіз сақталған.",
    openSource: "БАСТАПҚЫ ФАЙЛДЫ АШУ",
    note: "Нәтижелер ұсынылған турнир хаттамасы негізінде AIROM CUP мұрағатында жарияланды.",
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
    standings: "FINAL STANDINGS",
    groupStandings: "GROUP-STAGE LEADERS",
    place: "PLACE",
    group: "GROUP",
    team: "TEAM",
    result: "RESULT",
    prize: "PODIUM FINISH",
    groupLeader: "GROUP LEADER",
    sourceTitle: "SOURCE DOCUMENT",
    sourceDescription: "This web protocol is based on the original tournament table. The source file is preserved in the archive without alteration.",
    openSource: "OPEN SOURCE FILE",
    note: "The results are published in the AIROM CUP archive on the basis of the supplied tournament protocol.",
    footer: "AIROM CUP · OFFICIAL RESULTS ARCHIVE",
  },
};

export default function ProtocolPage({ result }: { result: PastResult }) {
  const { language } = useLanguage();
  const copy = protocolCopy[language];
  const isGroups = result.format === "groups";
  const archiveCode = `AC-${result.id.toUpperCase()}`;

  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />

      <header className={styles.header}>
        <Link href="/#results" className={styles.backLink}>
          <span aria-hidden="true">←</span>
          {copy.back}
        </Link>

        <Link href="/" className={styles.brand} aria-label="AIROM CUP">
          <Image
            src="/images/logos/airom-cup-logo.png"
            alt="AIROM CUP"
            width={64}
            height={64}
            priority
          />
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
          <span className={styles.status}>
            <i aria-hidden="true" />
            {copy.published}
          </span>
          <div>
            <span>{copy.archiveCode}</span>
            <strong>{archiveCode}</strong>
          </div>
          <div>
            <span>{copy.discipline}</span>
            <strong>{copy.basketball}</strong>
          </div>
        </div>
      </section>

      <section className={styles.document}>
        <div className={styles.documentTopline}>
          <span>AIROM CUP</span>
          <strong>{copy.summary}</strong>
          <span>{String(result.standings.length).padStart(2, "0")}</span>
        </div>

        <div className={styles.summary}>
          <div>
            <span>{copy.event}</span>
            <strong>{result.event[language]}</strong>
          </div>
          <div>
            <span>{copy.category}</span>
            <strong>{result.category[language]}</strong>
          </div>
          <div>
            <span>{copy.dates}</span>
            <strong>{result.dates[language]}</strong>
          </div>
          <div>
            <span>{copy.location}</span>
            <strong>{copy.locationValue}</strong>
          </div>
          <div>
            <span>{copy.organizer}</span>
            <strong>{copy.organizerValue}</strong>
          </div>
        </div>

        <div className={styles.standingsHeader}>
          <div>
            <span>02</span>
            <h2>{isGroups ? copy.groupStandings : copy.standings}</h2>
          </div>
          <p>{copy.note}</p>
        </div>

        <div className={styles.table} role="table" aria-label={isGroups ? copy.groupStandings : copy.standings}>
          <div className={styles.tableHead} role="row">
            <span role="columnheader">{isGroups ? copy.group : copy.place}</span>
            <span role="columnheader">{copy.team}</span>
            <span role="columnheader">{copy.result}</span>
          </div>

          {result.standings.map((standing, index) => (
            <div className={styles.tableRow} role="row" key={`${standing.place}-${standing.team}`}>
              <div
                role="cell"
                className={`${styles.position} ${!isGroups && index < 3 ? styles[`place${index + 1}`] : ""}`}
              >
                <small>{isGroups ? copy.group : copy.place}</small>
                <strong>{standing.place}</strong>
              </div>
              <div className={styles.team} role="cell">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{standing.team}</strong>
              </div>
              <div className={styles.resultBadge} role="cell">
                {isGroups ? copy.groupLeader : copy.prize}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.source}>
          <div className={styles.sourceMark} aria-hidden="true">PDF</div>
          <div>
            <span>{copy.sourceTitle}</span>
            <p>{copy.sourceDescription}</p>
          </div>
          <a href={result.protocolUrl} target="_blank" rel="noreferrer">
            {copy.openSource}
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>{copy.footer}</span>
        <span>{archiveCode}</span>
      </footer>
    </main>
  );
}

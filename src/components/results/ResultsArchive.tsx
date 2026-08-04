"use client";

import Image from "next/image";
import Link from "next/link";
import { pastResults } from "@/data/pastResults";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Language } from "@/i18n/translations";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import styles from "./ResultsArchive.module.css";

const archiveCopy: Record<Language, {
  back: string;
  eyebrow: string;
  title: string;
  description: string;
  current: string;
  archive: string;
  teams: string;
  games: string;
  winner: string;
  groupWinners: string;
  open: string;
  unavailable: string;
}> = {
  ru: {
    back: "НА ГЛАВНУЮ",
    eyebrow: "ОФИЦИАЛЬНЫЙ АРХИВ AIROM CUP",
    title: "РЕЗУЛЬТАТЫ ТУРНИРОВ",
    description: "Полные цифровые протоколы: все участники, сыгранные матчи, счёт и итоговое положение команд.",
    current: "ТУРНИРЫ AIROM CUP 2026",
    archive: "АРХИВНЫЕ ТУРНИРЫ",
    teams: "КОМАНД",
    games: "МАТЧЕЙ",
    winner: "ПОБЕДИТЕЛЬ",
    groupWinners: "ЛИДЕРЫ ГРУПП",
    open: "ОТКРЫТЬ ПРОТОКОЛ",
    unavailable: "СЧЁТ НЕ СОХРАНЁН",
  },
  kk: {
    back: "БАСТЫ БЕТКЕ",
    eyebrow: "AIROM CUP РЕСМИ МҰРАҒАТЫ",
    title: "ТУРНИР НӘТИЖЕЛЕРІ",
    description: "Толық цифрлық хаттамалар: барлық қатысушылар, ойналған матчтар, есеп және командалардың қорытынды орны.",
    current: "AIROM CUP 2026 ТУРНИРЛЕРІ",
    archive: "МҰРАҒАТ ТУРНИРЛЕРІ",
    teams: "КОМАНДА",
    games: "МАТЧ",
    winner: "ЖЕҢІМПАЗ",
    groupWinners: "ТОП КӨШБАСШЫЛАРЫ",
    open: "ХАТТАМАНЫ АШУ",
    unavailable: "ЕСЕП САҚТАЛМАҒАН",
  },
  en: {
    back: "BACK HOME",
    eyebrow: "OFFICIAL AIROM CUP ARCHIVE",
    title: "TOURNAMENT RESULTS",
    description: "Complete digital protocols with every team, fixture, score and final tournament standing.",
    current: "AIROM CUP 2026 TOURNAMENTS",
    archive: "ARCHIVED TOURNAMENTS",
    teams: "TEAMS",
    games: "GAMES",
    winner: "WINNER",
    groupWinners: "GROUP LEADERS",
    open: "OPEN PROTOCOL",
    unavailable: "SCORES NOT RECORDED",
  },
};

export default function ResultsArchive() {
  const { language } = useLanguage();
  const copy = archiveCopy[language];

  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <header className={styles.header}>
        <Link href="/" className={styles.back}><span aria-hidden="true">←</span>{copy.back}</Link>
        <Link href="/" className={styles.brand} aria-label="AIROM CUP">
          <Image src="/images/logos/airom-cup-logo.png" alt="AIROM CUP" width={60} height={60} priority />
          <strong>AIROM CUP</strong>
        </Link>
        <LanguageSwitcher />
      </header>

      <section className={styles.intro}>
        <p>{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <span>{copy.description}</span>
      </section>

      {(["2026", "archive"] as const).map((collection, sectionIndex) => {
        const items = pastResults.filter((result) => result.collection === collection);

        return (
          <section className={styles.collection} key={collection}>
            <div className={styles.collectionTitle}>
              <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
              <h2>{collection === "2026" ? copy.current : copy.archive}</h2>
              <i>{String(items.length).padStart(2, "0")}</i>
            </div>

            <div className={styles.cards}>
              {items.map((result) => {
                const leaders = result.standings.filter((standing) => standing.place === 1);

                return (
                  <article className={styles.card} key={result.id}>
                    <div className={styles.cardTop}>
                      <span>{result.event[language]}</span>
                      <i>{result.dates[language]}</i>
                    </div>
                    <h3>{result.category[language]}</h3>

                    <div className={styles.metrics}>
                      <div><strong>{String(result.standings.length).padStart(2, "0")}</strong><span>{copy.teams}</span></div>
                      <div><strong>{String(result.games.length).padStart(2, "0")}</strong><span>{result.games.length ? copy.games : copy.unavailable}</span></div>
                    </div>

                    <div className={styles.leader}>
                      <span>{result.format === "groups" ? copy.groupWinners : copy.winner}</span>
                      <strong>
                        {leaders.map((standing) => `${standing.group ? `${standing.group} · ` : ""}${standing.team}`).join(" / ")}
                      </strong>
                    </div>

                    <Link href={`/results/${result.id}`}>
                      {copy.open}
                      <b aria-hidden="true">→</b>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}

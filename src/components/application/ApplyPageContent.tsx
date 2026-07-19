"use client";

import Link from "next/link";
import ApplicationForm from "@/components/application/ApplicationForm";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";
import { applyCopy, localizeTournament } from "@/i18n/translations";
import type { Tournament } from "@/data/tournaments";
import styles from "@/app/apply/Apply.module.css";

export default function ApplyPageContent({ selectedTournament }: { selectedTournament?: Tournament }) {
  const { language } = useLanguage();
  const copy = applyCopy[language].page;
  const tournament = selectedTournament ? localizeTournament(selectedTournament, language) : undefined;
  const isTournamentMode = Boolean(tournament);

  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orangeGlow} aria-hidden="true" />
      <div className={styles.blueGlow} aria-hidden="true" />

      <header className={styles.header}>
        <Link href="/" className={styles.backLink}><span>←</span>{copy.back}</Link>
        <div className={styles.brand}>AIROM CUP</div>
        <div className={styles.applyHeaderActions}>
          <LanguageSwitcher />
          <span className={styles.stepIndicator}>{copy.application}</span>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.intro}>
          <p className={styles.eyebrow}>{copy.join}</p>
          <h1 className={styles.title}>
            {(isTournamentMode ? copy.tournamentTitle : copy.customTitle)[0]}
            <br />
            <span>{(isTournamentMode ? copy.tournamentTitle : copy.customTitle)[1]}</span>
          </h1>
          <p className={styles.description}>{isTournamentMode ? copy.tournamentDescription : copy.customDescription}</p>

          <div className={styles.modeSwitch}>
            <Link href="/#tournaments" className={`${styles.modeButton} ${isTournamentMode ? styles.modeButtonActive : ""}`}>
              <span className={styles.modeNumber}>01</span>
              <span>{copy.choose[0]}<br />{copy.choose[1]}</span>
            </Link>
            <Link href="/apply?mode=custom" className={`${styles.modeButton} ${!isTournamentMode ? styles.modeButtonActive : ""}`}>
              <span className={styles.modeNumber}>02</span>
              <span>{copy.custom[0]}<br />{copy.custom[1]}</span>
            </Link>
          </div>
        </section>

        <section className={styles.formArea}>
          {isTournamentMode && tournament ? (
            <div className={styles.selectedTournament}>
              <div className={styles.selectedHeader}><span>{copy.selected}</span><strong>01</strong></div>
              <p className={styles.international}>INTERNATIONAL</p>
              <h2 className={styles.tournamentTitle}>{tournament.title}</h2>
              <div className={styles.tournamentLine} />
              <div className={styles.tournamentInfo}>
                <div><span>{copy.category}</span><strong>{tournament.categoryLabel}</strong></div>
                <div><span>{copy.age}</span><strong>{tournament.age}</strong></div>
                <div><span>{copy.dates}</span><strong>{tournament.dates}</strong></div>
                <div><span>{copy.location}</span><strong>{tournament.location}</strong></div>
              </div>
            </div>
          ) : (
            <div className={styles.customSummary}>
              <div className={styles.questionMark} aria-hidden="true">?</div>
              <p className={styles.customEyebrow}>{copy.customEyebrow}</p>
              <h2 className={styles.customTitle}>
                {copy.customSummary[0]}<br />{copy.customSummary[1]}<br /><span>{copy.customSummary[2]}</span>
              </h2>
              <div className={styles.customList}>
                {copy.customItems.map((item, index) => (
                  <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>
                ))}
              </div>
            </div>
          )}

          <ApplicationForm mode={isTournamentMode ? "tournament" : "custom"} tournament={tournament} />
        </section>
      </div>

      <footer className={styles.footer}>
        <span>{copy.footer}</span><span>AIROM CUP</span><span>{copy.application}</span>
      </footer>
    </main>
  );
}


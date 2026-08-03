"use client";

import Link from "next/link";
import { tournaments } from "@/data/tournaments";
import { pastResults } from "@/data/pastResults";
import { homeCopy, localizeTournament } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./CalendarResults.module.css";

export function CalendarSection() {
  const { language } = useLanguage();
  const copy = homeCopy[language];
  const calendar = tournaments
    .filter((tournament) => tournament.isActive)
    .map((tournament) => localizeTournament(tournament, language));
  const months = calendar.reduce<(typeof calendar)[]>((groups, tournament) => {
    const existing = groups.find((group) => group[0]?.dates === tournament.dates);

    if (existing) {
      existing.push(tournament);
    } else {
      groups.push([tournament]);
    }

    return groups;
  }, []);

  return (
      <section id="calendar" className={styles.calendarSection}>
        <div className={styles.calendarGrid} aria-hidden="true" />
        <div className={styles.calendarBall} aria-hidden="true" />

        <div className={styles.inner}>
          <div className={styles.calendarHeading}>
            <div>
              <p className={styles.eyebrow}>{copy.calendar.eyebrow}</p>
              <h2 className={styles.calendarTitle}>
                {copy.calendar.title1}
                {" "}
                <span>{copy.calendar.title2}</span>
              </h2>
            </div>
            <p className={styles.calendarDescription}>
              {copy.calendar.description}
            </p>
          </div>

          <div className={styles.schedule}>
            {months.map((month, monthIndex) => (
              <article key={month[0].dates} className={styles.monthCard}>
                <div className={styles.monthTopline}>
                  <span>{String(monthIndex + 1).padStart(2, "0")}</span>
                  <i>{copy.calendar.status}</i>
                </div>

                <h3>{month[0].dates}</h3>

                <div className={styles.monthEvents}>
                  {month.map((tournament) => (
                    <div key={tournament.id} className={styles.monthEvent}>
                      <div>
                        <span>{copy.calendar.category}</span>
                        <strong>{tournament.age}</strong>
                        <small>{tournament.categoryLabel}</small>
                      </div>
                      <Link
                        href={`/apply?mode=tournament&id=${tournament.id}`}
                        aria-label={`${copy.calendar.apply}: ${tournament.dates}, ${tournament.age}`}
                      >
                        {copy.calendar.apply}
                        <b aria-hidden="true">→</b>
                      </Link>
                    </div>
                  ))}
                </div>

                <p className={styles.monthLocation}>
                  <span>{copy.calendar.location}</span>
                  {month[0].location}
                </p>
              </article>
            ))}
          </div>

          <div className={styles.calendarFooter}>
            <div className={styles.calendarNote}>
              <span>*</span>
              <p>{copy.calendar.note}</p>
            </div>

            <aside id="custom-request" className={styles.customRequest}>
              <div>
                <p>{copy.tournaments.customEyebrow}</p>
                <h3>
                  {copy.tournaments.custom1} {copy.tournaments.custom2}{" "}
                  <span>{copy.tournaments.custom3}</span>
                </h3>
                <small>{copy.tournaments.customDescription}</small>
              </div>
              <Link href="/apply?mode=custom">
                {copy.tournaments.propose}
                <b aria-hidden="true">→</b>
              </Link>
            </aside>
          </div>
        </div>
      </section>
  );
}

export function ResultsSection() {
  const { language } = useLanguage();
  const copy = homeCopy[language];

  return (
      <section id="results" className={styles.resultsSection}>
        <div className={styles.resultsGrid} aria-hidden="true" />
        <div className={styles.resultsNumber} aria-hidden="true">03</div>

        <div className={styles.inner}>
          <div className={styles.resultsHeading}>
            <div>
              <p className={styles.resultsEyebrow}>{copy.results.eyebrow}</p>
              <h2 className={styles.resultsTitle}>
                {copy.results.title1}
                <br />
                <span>{copy.results.title2}</span>
              </h2>
            </div>
            <p>{copy.results.description}</p>
          </div>

          {(["2026", "archive"] as const).map((collection) => {
            const collectionResults = pastResults.filter(
              (result) => result.collection === collection,
            );

            return (
              <div key={collection} className={styles.resultCollection}>
                <div className={styles.collectionTitle}>
                  <span>{collection === "2026" ? "01" : "02"}</span>
                  <h3>
                    {collection === "2026"
                      ? copy.results.current
                      : copy.results.archive}
                  </h3>
                  <i>{String(collectionResults.length).padStart(2, "0")}</i>
                </div>

                <div className={styles.resultCards}>
                  {collectionResults.map((result) => (
                    <article key={result.id} className={styles.resultCard}>
                      <div className={styles.resultTopline}>
                        <span>{result.event[language]}</span>
                        <i>{result.dates[language]}</i>
                      </div>

                      <h4>{result.category[language]}</h4>

                      <p className={styles.standingsLabel}>
                        {result.format === "groups"
                          ? copy.results.groupLeaders
                          : copy.results.podium}
                      </p>

                      <ol
                        className={`${styles.standings} ${
                          result.format === "groups"
                            ? styles.groupStandings
                            : ""
                        }`}
                      >
                        {result.standings.map((standing) => (
                          <li key={`${standing.place}-${standing.team}`}>
                            <span
                              className={
                                standing.place === "1"
                                  ? styles.gold
                                  : standing.place === "2"
                                    ? styles.silver
                                    : standing.place === "3"
                                      ? styles.bronze
                                      : styles.group
                              }
                            >
                              {result.format === "groups"
                                ? `${copy.results.group} ${standing.place}`
                                : standing.place}
                            </span>
                            <strong>{standing.team}</strong>
                          </li>
                        ))}
                      </ol>

                      <Link
                        href={`/results/${result.id}`}
                        className={styles.protocolLink}
                      >
                        {copy.results.protocol}
                        <b>↗</b>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
  );
}

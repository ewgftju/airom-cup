"use client";

import Link from "next/link";
import { tournaments } from "@/data/tournaments";
import { useLanguage } from "@/i18n/LanguageProvider";
import { homeCopy, localizeTournament } from "@/i18n/translations";
import styles from "./Tournaments.module.css";

export default function Tournaments() {
  const { language } = useLanguage();
  const copy = homeCopy[language].tournaments;
  const activeTournaments =
    tournaments.filter(
      (tournament) => tournament.isActive
    ).map((tournament) => localizeTournament(tournament, language));

  return (

    <section id="tournaments" className={styles.section}>
      <div className={styles.sectionNumber} aria-hidden="true">
        02
      </div>

      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>
              {copy.eyebrow}
            </p>

            <h2 className={styles.title}>
              {copy.title1}
              <br />
              <span>{copy.title2}</span>
            </h2>
          </div>

          <p className={styles.description}>
            {copy.description}
          </p>
        </div>

        <div className={styles.cards}>
          {activeTournaments.map(
            (tournament, index) => (
            <article
              key={tournament.id}
              className={styles.tournamentCard}
            >
              <div
                className={styles.cardNoise}
                aria-hidden="true"
              />

              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.badge}>
                  {tournament.badge}
                </span>
              </div>

              <div className={styles.cardMain}>
                <p className={styles.cardEyebrow}>
                  {copy.international}
                </p>

                <h3 className={styles.cardTitle}>
                  {tournament.title}
                </h3>

                <div className={styles.orangeLine} />

                <div className={styles.category}>
                  <span>{copy.category}</span>

                  <strong>
                    {tournament.categoryLabel}
                  </strong>
                </div>

                <div className={styles.age}>
                  {tournament.age}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div>
                  <span className={styles.metaLabel}>
                    {copy.dates}
                  </span>

                  <strong className={styles.metaValue}>
                    {tournament.dates}
                  </strong>
                </div>

                <div>
                  <span className={styles.metaLabel}>
                    {copy.location}
                  </span>

                  <strong className={styles.metaValue}>
                    {tournament.location}
                  </strong>
                </div>
              </div>

              <Link
                href={`/apply?mode=tournament&id=${tournament.id}`}
                className={styles.applyButton}
                >
                {copy.choose}
                <span>→</span>
                </Link>
            </article>
          ))}

          <article
            id="custom-request"
            className={styles.customCard}
          >
            <div
              className={styles.customCircle}
              aria-hidden="true"
            />

            <div
              className={styles.customNumber}
              aria-hidden="true"
            >
              ?
            </div>

            <p className={styles.customEyebrow}>
              {copy.customEyebrow}
            </p>

            <h3 className={styles.customTitle}>
              {copy.custom1}
              <br />
              {copy.custom2}
              <br />
              <span>{copy.custom3}</span>
            </h3>

            <p className={styles.customDescription}>
              {copy.customDescription}
            </p>

            <div className={styles.preferences}>
              <div>
                <span>01</span>
                <p>{copy.preferences[0]}</p>
              </div>

              <div>
                <span>02</span>
                <p>{copy.preferences[1]}</p>
              </div>

              <div>
                <span>03</span>
                <p>{copy.preferences[2]}</p>
              </div>
            </div>

            <Link
            href="/apply?mode=custom"
            className={styles.customButton}
            >
            {copy.propose}
            <span>→</span>
            </Link>
          </article>
        </div>

        <div className={styles.bottomLine}>
          <span>AIROM CUP</span>

          <span>
            {copy.bottom}
          </span>
        </div>
      </div>
    </section>
  );
}

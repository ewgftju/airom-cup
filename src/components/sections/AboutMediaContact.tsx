"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { homeCopy } from "@/i18n/translations";
import styles from "./AboutMediaContact.module.css";

const instagramUrl = "https://www.instagram.com/airom_academy/";
const email = "bcbarsy@mail.ru";
const pastVideos = [
  "https://www.instagram.com/p/DZy7zvAoXou/",
  "https://www.instagram.com/p/DXcZuj0APZg/",
];

export default function AboutMediaContact() {
  const { language } = useLanguage();
  const copy = homeCopy[language];

  return (
    <>
      <section id="about" className={styles.aboutSection}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.number} aria-hidden="true">03</div>

        <div className={styles.inner}>
          <div className={styles.aboutIntro}>
            <div className={styles.aboutHeading}>
              <p className={styles.eyebrow}>{copy.about.eyebrow}</p>
              <h2 className={styles.title}>
                {copy.about.title1}
                <br />
                <span>{copy.about.title2}</span>
              </h2>
            </div>

            <div className={styles.aboutText}>
              <p className={styles.lead}>{copy.about.lead}</p>
              <p>{copy.about.body}</p>
            </div>
          </div>

          <div className={styles.facts}>
            {copy.about.facts.map((fact) => (
              <div key={fact.value}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>

          <div id="videos" className={styles.archive}>
            <div className={styles.archiveHeading}>
              <div>
                <p className={styles.eyebrow}>{copy.videos.eyebrow}</p>
                <h3 className={styles.archiveTitle}>
                  {copy.videos.title1} <span>{copy.videos.title2}</span>
                </h3>
              </div>
              <p>{copy.videos.description}</p>
            </div>

            <div className={styles.videoGrid}>
              {pastVideos.map((videoUrl, index) => {
                const item = copy.videos.items[index];

                return (
                  <a
                    key={videoUrl}
                    href={videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.videoCard} ${index === 1 ? styles.videoCardAlt : ""}`}
                    aria-label={`${copy.videos.watch}: ${item}`}
                  >
                    <span className={styles.videoTopline}>
                      <b>RECAP {String(index + 1).padStart(2, "0")}</b>
                      <i>INSTAGRAM ↗</i>
                    </span>

                    <div className={styles.logoMark}>
                      <Image
                        src="/images/logos/airom-cup-logo.png"
                        alt=""
                        width={360}
                        height={360}
                      />
                    </div>

                    <span className={styles.play} aria-hidden="true">▶</span>

                    <span className={styles.videoBottom}>
                      <strong>{item}</strong>
                      <b>{copy.videos.watch}</b>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer id="contacts" className={styles.contactSection}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.contactGlow} aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.contactHeading}>
            <p className={styles.eyebrow}>{copy.contact.eyebrow}</p>
            <h2 className={styles.contactTitle}>
              {copy.contact.title1}
              <br />
              <span>{copy.contact.title2}</span>
            </h2>
            <p className={styles.contactDescription}>{copy.contact.description}</p>
          </div>

          <div className={styles.contactLinks}>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              <span>{copy.contact.instagram}</span>
              <strong>@airom_academy</strong>
              <b>↗</b>
            </a>
            <a href={`mailto:${email}`}>
              <span>{copy.contact.email}</span>
              <strong>{email}</strong>
              <b>→</b>
            </a>
            <div>
              <span>{copy.contact.information}</span>
              <strong>{copy.contact.informationValue}</strong>
            </div>
          </div>

          <div className={styles.copyright}>
            <span>{copy.contact.copyright}</span>
            <span>© {new Date().getFullYear()} AIROM CUP</span>
          </div>
        </div>
      </footer>
    </>
  );
}

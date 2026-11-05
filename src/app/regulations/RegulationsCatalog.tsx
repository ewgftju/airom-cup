"use client";

import Image from "next/image";
import Link from "next/link";
import { catalogCopy, regulationEditions } from "@/data/regulationEditions";
import { useLanguage } from "@/i18n/LanguageProvider";
import { homeCopy } from "@/i18n/translations";
import RegulationsHeader from "./RegulationsHeader";
import styles from "./Regulations.module.css";

export default function RegulationsCatalog() {
  const { language } = useLanguage();
  const copy = catalogCopy[language];

  return (
    <main className={styles.page}>
      <RegulationsHeader />
      <div className={styles.catalogIntro}>
        <Link className={styles.back} href="/#about">
          <span aria-hidden="true">←</span>{homeCopy[language].nav.about}
        </Link>
        <div className={styles.event}>{copy.location}</div>
        <h1>{copy.title[0]}{" "}<em>{copy.title[1]}</em></h1>
      </div>
      <div className={styles.catalogGrid}>
        {regulationEditions.map((edition) => (
          <article className={styles.editionCard} key={edition.slug}>
            <div className={styles.editionHeading}>
              <div>
                <p className={styles.editionDate}>{edition.dates[language]}</p>
                <h2>{copy.category(edition.birthYear)}</h2>
              </div>
              <Image src={edition.cover} width={480} height={339} alt="" className={styles.editionCover} />
            </div>
            <div className={styles.editionActions}>
              <Link href={`/regulations/${edition.slug}`} className={styles.download}
                aria-label={`${copy.read} · ${edition.dates[language]}, ${copy.category(edition.birthYear)}`}>
                {copy.read}<span aria-hidden="true">→</span>
              </Link>
              <a href={edition.pdf} download className={styles.pdfLink}
                aria-label={`${copy.download} · ${edition.dates[language]}`}>
                {copy.download}<span aria-hidden="true">↓</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

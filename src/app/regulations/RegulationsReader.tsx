"use client";

import Image from "next/image";
import Link from "next/link";
import RegulationsHeader from "./RegulationsHeader";
import { regulations, sectionIds } from "@/data/regulations";
import { useLanguage } from "@/i18n/LanguageProvider";
import { catalogCopy, type RegulationEdition } from "@/data/regulationEditions";
import styles from "./Regulations.module.css";

export default function RegulationsReader({ edition }: { edition: RegulationEdition }) {
  const { language } = useLanguage();
  const copy = regulations[language](edition);
  const catalog = catalogCopy[language];
  const contents = (
    <ol className={styles.contentsList}>
      {sectionIds.map((id) => (
        <li key={id}><a href={`#${id}`}>{copy.sections[id].title}</a></li>
      ))}
    </ol>
  );

  return (
    <main className={styles.page}>
      <RegulationsHeader />

      <div className={styles.intro}>
        <div>
          <Link href="/regulations" className={styles.back}>
            <span aria-hidden="true">←</span>{catalog.back}
          </Link>
          <div className={styles.event}><span>{edition.dates[language]}</span><span>{catalog.location}</span></div>
          <h1>{copy.title[0]}{" "}<em>{copy.title[1]}</em></h1>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>

        <aside className={styles.original}>
          <div className={styles.fileSummary}>
            <Image src={edition.cover} width={480} height={339} alt="" className={styles.cover} />
            <div>
              <h2>{copy.original}</h2>
              <p className={styles.fileInfo}>{copy.fileInfo}</p>
            </div>
          </div>
          <p className={styles.approval}>{copy.approval}</p>
          <div className={styles.fileActions}>
            <a className={styles.download} href={edition.pdf} download>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" />
              </svg>
              {copy.download}
            </a>
            <a className={styles.open} href={edition.pdf} target="_blank" rel="noopener noreferrer">
              {copy.open} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </div>

      <div className={styles.reader}>
        <nav id="contents" className={styles.contents} aria-label={copy.contents} tabIndex={-1}>
          <div className={styles.wideContents}>
            <h2>{copy.contents}</h2>
            {contents}
          </div>
          <details className={styles.smallContents}>
            <summary>{copy.contents}</summary>
            {contents}
          </details>
        </nav>

        <article className={styles.article} aria-label={copy.title.join(" ")}>
          {copy.translationNote && <p className={styles.note}>{copy.translationNote}</p>}
          {sectionIds.map((id, sectionIndex) => {
            const section = copy.sections[id];
            return (
              <section key={id} id={id} tabIndex={-1} className={styles.chapter}>
                <h2><span className={styles.number}>{sectionIndex + 1}.</span>{section.title}</h2>
                {section.clauses.map((clause, clauseIndex) => (
                  <div className={styles.clause} key={clauseIndex}>
                    {clause.text && <span className={styles.clauseNumber}>{sectionIndex + 1}.{clauseIndex + 1}.</span>}
                    <div className={styles.clauseBody}>
                      {clause.text && <p>{clause.text}</p>}
                      {clause.points && <ul>{clause.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                      {clause.fees && (
                        <dl className={styles.fees}>
                          {clause.fees.map((fee) => (
                            <div key={fee.basis}>
                              <dt>{fee.basis}</dt>
                              <dd><strong>{fee.price}</strong><p>{fee.includes}</p></dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            );
          })}
          <a href="#contents" className={styles.toContents}><span aria-hidden="true">↑</span>{copy.toContents}</a>
        </article>
      </div>
    </main>
  );
}

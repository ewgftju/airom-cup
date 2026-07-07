import Link from "next/link";
import { tournaments } from "@/data/tournaments";
import styles from "./Tournaments.module.css";

export default function Tournaments() {
  return (
    <section id="tournaments" className={styles.section}>
      <div className={styles.sectionNumber} aria-hidden="true">
        02
      </div>

      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>
              CHOOSE YOUR FORMAT
            </p>

            <h2 className={styles.title}>
              ВЫБЕРИ ТУРНИР
              <br />
              <span>ИЛИ ПРЕДЛОЖИ СВОЙ.</span>
            </h2>
          </div>

          <p className={styles.description}>
            Присоединяйтесь к уже объявленному Airom Cup
            или укажите, какой турнир был бы интересен
            именно вашей команде.
          </p>
        </div>

        <div className={styles.cards}>
          {tournaments.map((tournament, index) => (
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
                  INTERNATIONAL
                </p>

                <h3 className={styles.cardTitle}>
                  {tournament.title}
                </h3>

                <div className={styles.orangeLine} />

                <div className={styles.category}>
                  <span>КАТЕГОРИЯ</span>

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
                    ДАТЫ
                  </span>

                  <strong className={styles.metaValue}>
                    {tournament.dates}
                  </strong>
                </div>

                <div>
                  <span className={styles.metaLabel}>
                    МЕСТО
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
                ВЫБРАТЬ ЭТОТ ТУРНИР
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
              YOUR TOURNAMENT
            </p>

            <h3 className={styles.customTitle}>
              НЕ НАШЁЛ
              <br />
              ПОДХОДЯЩИЙ
              <br />
              <span>ТУРНИР?</span>
            </h3>

            <p className={styles.customDescription}>
              Расскажите нам, какой турнир нужен вашей
              команде.
            </p>

            <div className={styles.preferences}>
              <div>
                <span>01</span>
                <p>ЮНОШИ ИЛИ ДЕВУШКИ</p>
              </div>

              <div>
                <span>02</span>
                <p>ВОЗРАСТ ИГРОКОВ</p>
              </div>

              <div>
                <span>03</span>
                <p>УДОБНЫЕ ДАТЫ</p>
              </div>
            </div>

            <Link
            href="/apply?mode=custom"
            className={styles.customButton}
            >
            ПРЕДЛОЖИТЬ СВОЙ ВАРИАНТ
            <span>→</span>
            </Link>
          </article>
        </div>

        <div className={styles.bottomLine}>
          <span>AIROM CUP</span>

          <span>
            YOUR TEAM · YOUR DATES · YOUR TOURNAMENT
          </span>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Декоративный фон */}
      <div className={styles.glowOrange} aria-hidden="true" />
      <div className={styles.glowBlue} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      {/* Верхняя часть */}
      <header className={styles.header}>
        <a href="#" className={styles.company}>
          <Image
            src="/images/logos/airom-academy-logo.png"
            alt="Airom Junior Sport Academy"
            width={60}
            height={60}
            priority
          />

          <div className={styles.companyText}>
            <span>JUNIOR SPORT</span>
            <strong>ACADEMY</strong>
          </div>
        </a>

        <a
  href="#tournaments"
  className={styles.headerButton}
>
  ПОДАТЬ ЗАЯВКУ
</a>
      </header>

      {/* Основной контент */}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>
            INTERNATIONAL BASKETBALL TOURNAMENT
          </p>

          <h1 className={styles.title}>
            ТВОЯ КОМАНДА.
            <br />
            <span>ТВОИ ДАТЫ.</span>
            <br />
            ТВОЙ AIROM CUP.
          </h1>

          <p className={styles.description}>
            Выбери объявленный турнир или предложи свой вариант:
            укажи команду, возраст, категорию и удобные даты.
          </p>

          <div className={styles.actions}>
            <a
                href="#tournaments"
                className={styles.primaryButton}
            >
                ВЫБРАТЬ ТУРНИР
            </a>

            <a
                href="#custom-request"
                className={styles.secondaryButton}
            >
                ПРЕДЛОЖИТЬ СВОЙ ВАРИАНТ
            </a>
            </div>
        </div>

        {/* Логотип турнира */}
        <div className={styles.logoArea}>
          <div className={styles.logoNumber}>01</div>

          <div className={styles.logoCircle}>
            <Image
              src="/images/logos/airom-cup-logo.png"
              alt="International Airom Cup Basketball"
              width={520}
              height={520}
              className={styles.cupLogo}
              priority
            />
          </div>
        </div>
      </div>

      {/* Нижняя информация */}
      <footer className={styles.footer}>
        <span>ATYRAU · KAZAKHSTAN</span>

        <span className={styles.footerCenter}>
          BOYS · GIRLS · INTERNATIONAL
        </span>

        <span>AIROM CUP</span>
      </footer>

      {/* Большая фоновая надпись */}
      <div className={styles.verticalText} aria-hidden="true">
        AIROM
      </div>
    </section>
  );
}
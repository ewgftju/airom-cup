"use client";

import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";
import { homeCopy } from "@/i18n/translations";
import styles from "./Hero.module.css";

export default function Hero() {
  const { language } = useLanguage();
  const copy = homeCopy[language];

  return (
    <section className={styles.hero}>
      {/* Декоративный фон */}
      <div className={styles.glowOrange} aria-hidden="true" />
      <div className={styles.glowBlue} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      {/* Верхняя часть */}
      <header className={styles.header}>
        <a href="#" className={styles.company} aria-label="AIROM Junior Sport Academy">
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

        <nav className={styles.navigation} aria-label="Main navigation">
          <a href="#about">{copy.nav.about}</a>
          <a href="#contacts">{copy.nav.contacts}</a>
        </nav>

        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <a href="#tournaments" className={styles.headerButton}>
            {copy.nav.apply}
          </a>
        </div>
      </header>

      {/* Основной контент */}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>
            {copy.hero.eyebrow}
          </p>

          <h1 className={styles.title}>
            {copy.hero.title1}
            <br />
            <span>{copy.hero.title2}</span>
            <br />
            {copy.hero.title3}
          </h1>

          <p className={styles.description}>
            {copy.hero.description}
          </p>

          <div className={styles.actions}>
            <a
                href="#tournaments"
                className={styles.primaryButton}
            >
                {copy.hero.choose}
            </a>

            <a
                href="#custom-request"
                className={styles.secondaryButton}
            >
                {copy.hero.custom}
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
        <span>{copy.hero.location}</span>

        <span className={styles.footerCenter}>
          {copy.hero.categories}
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

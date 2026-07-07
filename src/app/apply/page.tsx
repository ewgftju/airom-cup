import Link from "next/link";
import ApplicationForm from "@/components/application/ApplicationForm";
import { tournaments } from "@/data/tournaments";
import styles from "./Apply.module.css";


type ApplyPageProps = {
  searchParams: Promise<{
    mode?: string | string[];
    id?: string | string[];
  }>;
};

export default async function ApplyPage({
  searchParams,
}: ApplyPageProps) {
  const params = await searchParams;

  const mode = Array.isArray(params.mode)
    ? params.mode[0]
    : params.mode;

  const tournamentId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

const selectedTournament =
  mode === "tournament"
    ? tournaments.find(
        (tournament) =>
          tournament.id === tournamentId &&
          tournament.isActive
      )
    : undefined;

  const isTournamentMode = Boolean(selectedTournament);

  return (
    <main className={styles.page}>
      {/* Декоративный фон */}
      <div
        className={styles.grid}
        aria-hidden="true"
      />

      <div
        className={styles.orangeGlow}
        aria-hidden="true"
      />

      <div
        className={styles.blueGlow}
        aria-hidden="true"
      />

      {/* Верхняя панель */}
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.backLink}
        >
          <span>←</span>
          НА ГЛАВНУЮ
        </Link>

        <div className={styles.brand}>
          AIROM CUP
        </div>

        <span className={styles.stepIndicator}>
          APPLICATION
        </span>
      </header>

      <div className={styles.container}>
        {/* Левая часть */}
        <section className={styles.intro}>
          <p className={styles.eyebrow}>
            JOIN AIROM CUP
          </p>

          <h1 className={styles.title}>
            {isTournamentMode ? (
              <>
                ЗАЯВКА
                <br />
                <span>НА ТУРНИР.</span>
              </>
            ) : (
              <>
                ПРЕДЛОЖИ
                <br />
                <span>СВОЙ ТУРНИР.</span>
              </>
            )}
          </h1>

          <p className={styles.description}>
            {isTournamentMode
              ? "Расскажите нам о своей команде. Мы получим заявку и свяжемся с вашим представителем."
              : "Укажите, какая команда хочет приехать, возраст игроков и удобные даты. Ваше предложение поможет нам определить следующий Airom Cup."}
          </p>

          {/* Переключатель сценария */}
          <div className={styles.modeSwitch}>
            <Link
              href="/#tournaments"
              className={`${styles.modeButton} ${
                isTournamentMode
                  ? styles.modeButtonActive
                  : ""
              }`}
            >
              <span className={styles.modeNumber}>
                01
              </span>

              <span>
                ВЫБРАТЬ
                <br />
                ТУРНИР
              </span>
            </Link>

            <Link
              href="/apply?mode=custom"
              className={`${styles.modeButton} ${
                !isTournamentMode
                  ? styles.modeButtonActive
                  : ""
              }`}
            >
              <span className={styles.modeNumber}>
                02
              </span>

              <span>
                СВОЙ
                <br />
                ВАРИАНТ
              </span>
            </Link>
          </div>
        </section>

        {/* Правая часть */}
        <section className={styles.formArea}>
          {/* Выбранный турнир */}
          {isTournamentMode && selectedTournament ? (
            <div className={styles.selectedTournament}>
              <div className={styles.selectedHeader}>
                <span>ВЫБРАННЫЙ ТУРНИР</span>

                <strong>01</strong>
              </div>

              <p className={styles.international}>
                INTERNATIONAL
              </p>

              <h2 className={styles.tournamentTitle}>
                {selectedTournament.title}
              </h2>

              <div className={styles.tournamentLine} />

              <div className={styles.tournamentInfo}>
                <div>
                  <span>КАТЕГОРИЯ</span>

                  <strong>
                    {selectedTournament.categoryLabel}
                  </strong>
                </div>

                <div>
                  <span>ВОЗРАСТ</span>

                  <strong>
                    {selectedTournament.age}
                  </strong>
                </div>

                <div>
                  <span>ДАТЫ</span>

                  <strong>
                    {selectedTournament.dates}
                  </strong>
                </div>

                <div>
                  <span>МЕСТО</span>

                  <strong>
                    {selectedTournament.location}
                  </strong>
                </div>
              </div>
            </div>
          ) : (
            /* Свой вариант */
            <div className={styles.customSummary}>
              <div
                className={styles.questionMark}
                aria-hidden="true"
              >
                ?
              </div>

              <p className={styles.customEyebrow}>
                YOUR TOURNAMENT
              </p>

              <h2 className={styles.customTitle}>
                МЫ ХОТИМ
                <br />
                УЗНАТЬ,
                <br />
                <span>ЧТО НУЖНО ВАМ.</span>
              </h2>

              <div className={styles.customList}>
                <div>
                  <span>01</span>
                  <p>КОМАНДА И ГОРОД</p>
                </div>

                <div>
                  <span>02</span>
                  <p>ЮНОШИ ИЛИ ДЕВУШКИ</p>
                </div>

                <div>
                  <span>03</span>
                  <p>ВОЗРАСТ ИГРОКОВ</p>
                </div>

                <div>
                  <span>04</span>
                  <p>УДОБНЫЕ ДАТЫ</p>
                </div>
              </div>
            </div>
          )}

          {/* Место будущей формы */}
          <ApplicationForm
          key={
            selectedTournament?.id ??
            "custom-tournament-request"
          }
          mode={
            isTournamentMode
              ? "tournament"
              : "custom"
          }
          tournament={selectedTournament}
        />
        </section>
      </div>

      <footer className={styles.footer}>
        <span>ATYRAU · KAZAKHSTAN</span>

        <span>
          YOUR TEAM · YOUR DATES · YOUR AIROM CUP
        </span>

        <span>2026</span>
      </footer>

      <div
        className={styles.pageNumber}
        aria-hidden="true"
      >
        03
      </div>
    </main>
  );
}
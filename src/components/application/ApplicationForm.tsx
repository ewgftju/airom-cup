"use client";

import { useState } from "react";
import styles from "./ApplicationForm.module.css";

type ApplicationFormProps = {
  mode: "tournament" | "custom";

tournament?: {
  id: string;

  title: string;

  category: "boys" | "girls";
  categoryLabel: string;

  age: string;

  eligibleBirthYears: string[];

  dates: string;

  location: string;
  };
};

type Gender = "" | "boys" | "girls";

type ApplicationData = {
  teamName: string;
  country: string;
  city: string;

  gender: Gender;
  birthYear: string;
  customBirthYear: string;

  preferredYear: string;
  preferredPeriods: string[];
  customDates: string;
  
  contactName: string;
  phone: string;
  email: string;
  comment: string;
  consentAccepted: boolean;

  tournamentConfirmed: boolean;
};

const initialFormData: ApplicationData = {
  teamName: "",
  country: "",
  city: "",

  gender: "",
  birthYear: "",
  customBirthYear: "",

  preferredYear: "",
  preferredPeriods: [],
  customDates: "",

    contactName: "",
  phone: "",
  email: "",
  comment: "",
  consentAccepted: false,
  
  tournamentConfirmed: false,
};

const birthYears = [
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
];

const preferredYears = [
  {
    value: "2026",
    label: "2026",
  },
  {
    value: "2027",
    label: "2027",
  },
  {
    value: "2028",
    label: "2028",
  },
  {
    value: "flexible",
    label: "НЕ ВАЖНО",
  },
];

const periodOptions = [
  {
    value: "jan-feb",
    label: "ЯНВАРЬ — ФЕВРАЛЬ",
  },
  {
    value: "mar-apr",
    label: "МАРТ — АПРЕЛЬ",
  },
  {
    value: "may-jun",
    label: "МАЙ — ИЮНЬ",
  },
  {
    value: "jul-aug",
    label: "ИЮЛЬ — АВГУСТ",
  },
  {
    value: "sep-oct",
    label: "СЕНТЯБРЬ — ОКТЯБРЬ",
  },
  {
    value: "nov-dec",
    label: "НОЯБРЬ — ДЕКАБРЬ",
  },
];

type TextField =
  | "teamName"
  | "country"
  | "city"
  | "gender"
  | "birthYear"
  | "customBirthYear"
  | "preferredYear"
  | "customDates"
  | "contactName"
  | "phone"
  | "email"
  | "comment";

export default function ApplicationForm({
  mode,
  tournament,
}: ApplicationFormProps) {

    const createInitialFormData =
    (): ApplicationData => ({
      ...initialFormData,

      gender:
        mode === "tournament" &&
        tournament
          ? tournament.category
          : "",
    });

  const [step, setStep] = useState(1);

  const [isSubmitted, setIsSubmitted] =
  useState(false);

  const [isSubmitting, setIsSubmitting] =
  useState(false);

  const [submitError, setSubmitError] =
  useState("");
  
const [formData, setFormData] =
  useState<ApplicationData>(
    () => createInitialFormData()
  );

  /* -------------------------------- */
  /* ОБНОВЛЕНИЕ ПОЛЕЙ */
  /* -------------------------------- */

  const updateField = (
    field: TextField,
    value: string
  ) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };

  /* -------------------------------- */
  /* ПРОВЕРКА ШАГА 1 */
  /* -------------------------------- */

  const isStepOneValid =
    formData.teamName.trim().length > 0 &&
    formData.country.trim().length > 0 &&
    formData.city.trim().length > 0;

  /* -------------------------------- */
  /* ПРОВЕРКА ШАГА 2 */
  /* -------------------------------- */

  const hasValidBirthYear =
    formData.birthYear === "other"
      ? /^\d{4}$/.test(
          formData.customBirthYear.trim()
        )
      : formData.birthYear.length > 0;

  const isStepTwoValid =
  mode === "tournament"
    ? Boolean(
        tournament &&
        hasValidBirthYear
      )
    : Boolean(
        formData.gender.length > 0 &&
        hasValidBirthYear
      );

  /* -------------------------------- */
  /* ПРОВЕРКА ШАГА 3 */
  /* -------------------------------- */

  const hasCustomDatePreference =
    formData.preferredPeriods.length > 0 ||
    formData.customDates.trim().length >= 3;

  const isStepThreeValid =
    mode === "tournament"
      ? Boolean(
          tournament &&
            formData.tournamentConfirmed
        )
      : Boolean(
          formData.preferredYear &&
            hasCustomDatePreference
        );

        /* -------------------------------- */
/* ПРОВЕРКА ШАГА 4 */
/* -------------------------------- */

const isEmailValid =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    formData.email.trim()
  );

const phoneDigits =
  formData.phone.replace(/\D/g, "");

const isPhoneValid =
  phoneDigits.length >= 10;

const isStepFourValid =
  formData.contactName.trim().length >= 2 &&
  isPhoneValid &&
  isEmailValid &&
  formData.consentAccepted;

  /* -------------------------------- */
  /* НАВИГАЦИЯ */
  /* -------------------------------- */

  const goToStepTwo = () => {
    if (!isStepOneValid) {
      return;
    }

    setStep(2);
  };

  const goToStepThree = () => {
    if (!isStepTwoValid) {
      return;
    }

    setStep(3);
  };

  const goToStepFour = () => {
    if (!isStepThreeValid) {
      return;
    }

    setStep(4);
  };

  const goBack = () => {
    setStep((currentStep) =>
      Math.max(1, currentStep - 1)
    );
  };

  /* -------------------------------- */
  /* ВЫБОР ГОДА РОЖДЕНИЯ */
  /* -------------------------------- */

  const selectBirthYear = (
    year: string
  ) => {
    setFormData((currentData) => ({
      ...currentData,

      birthYear: year,

      customBirthYear:
        year === "other"
          ? currentData.customBirthYear
          : "",
    }));
  };

  /* -------------------------------- */
  /* ВЫБОР ПЕРИОДОВ */
  /* -------------------------------- */

  const togglePeriod = (
    periodValue: string
  ) => {
    setFormData((currentData) => {
      const periodAlreadySelected =
        currentData.preferredPeriods.includes(
          periodValue
        );

      return {
        ...currentData,

        preferredPeriods:
          periodAlreadySelected
            ? currentData.preferredPeriods.filter(
                (period) =>
                  period !== periodValue
              )
            : [
                ...currentData.preferredPeriods,
                periodValue,
              ],
      };
    });
  };

  /* -------------------------------- */
  /* ПОДТВЕРЖДЕНИЕ ТУРНИРА */
  /* -------------------------------- */

  const toggleTournamentConfirmation =
    () => {
      setFormData((currentData) => ({
        ...currentData,

        tournamentConfirmed:
          !currentData.tournamentConfirmed,
      }));
    };

    /* -------------------------------- */
/* СОГЛАСИЕ */
/* -------------------------------- */

const toggleConsent = () => {
  setFormData((currentData) => ({
    ...currentData,

    consentAccepted:
      !currentData.consentAccepted,
  }));
};

  /* -------------------------------- */
  /* ПОДПИСИ ДЛЯ СВОДКИ */
  /* -------------------------------- */

  const finalBirthYear =
    formData.birthYear === "other"
      ? formData.customBirthYear
      : formData.birthYear;

  const genderLabel =
    formData.gender === "boys"
      ? "ЮНОШИ"
      : formData.gender === "girls"
        ? "ДЕВУШКИ"
        : "";

  const preferredYearLabel =
    formData.preferredYear === "flexible"
      ? "НЕ ВАЖНО"
      : formData.preferredYear;

  const selectedPeriodLabels =
    periodOptions
      .filter((period) =>
        formData.preferredPeriods.includes(
          period.value
        )
      )
      .map((period) => period.label);

   /* -------------------------------- */
  /* ОТПРАВКА */
  /* -------------------------------- */

  const submitApplication = async () => {
    if (
      !isStepFourValid ||
      isSubmitting
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const applicationPayload = {
      mode,

      tournament:
        mode === "tournament" &&
        tournament
          ? {
              id: tournament.id,
              title: tournament.title,
            }
          : null,

      team: {
        name:
          formData.teamName.trim(),

        country:
          formData.country.trim(),

        city:
          formData.city.trim(),

        gender:
          formData.gender,

        birthYear:
          finalBirthYear,
      },

      preferredTiming:
        mode === "custom"
          ? {
              year:
                formData.preferredYear,

              periods:
                formData.preferredPeriods,

              customDates:
                formData.customDates.trim(),
            }
          : null,

      contact: {
        name:
          formData.contactName.trim(),

        phone:
          formData.phone.trim(),

        email:
          formData.email
            .trim()
            .toLowerCase(),

        comment:
          formData.comment.trim(),
      },

      consentAccepted:
        formData.consentAccepted,
    };

    try {
      const response = await fetch(
        "/api/applications",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            applicationPayload
          ),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Не удалось отправить заявку"
        );
      }

      console.log(
        "AIROM CUP APPLICATION SAVED:",
        result
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error(
        "APPLICATION SUBMIT ERROR:",
        error
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------------------------------- */
  /* НОВАЯ ЗАЯВКА */
  /* -------------------------------- */

const startNewApplication = () => {
  setFormData(
    createInitialFormData()
  );

  setStep(1);

  setIsSubmitted(false);

  setIsSubmitting(false);

  setSubmitError("");
};

  const progress = step * 25;

  return (
    <div className={styles.form}>
      {/* ================================= */}
      {/* ПРОГРЕСС */}
      {/* ================================= */}

      <div className={styles.progressHeader}>
        <span>
          ШАГ {String(step).padStart(2, "0")} / 04
        </span>

        <strong>{progress}%</strong>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressValue}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* ================================= */}
      {/* ШАГ 1 — КОМАНДА */}
      {/* ================================= */}

      {step === 1 && (
        <>
          <p className={styles.eyebrow}>
            STEP ONE
          </p>

          <h2 className={styles.title}>
            РАССКАЖИТЕ
            <br />
            О КОМАНДЕ
          </h2>

          <p className={styles.description}>
            Начнём с основной информации
            о вашей команде.
          </p>

          <div className={styles.fields}>
            <label className={styles.field}>
              <span>
                НАЗВАНИЕ КОМАНДЫ
              </span>

              <input
                type="text"
                value={formData.teamName}
                onChange={(event) =>
                  updateField(
                    "teamName",
                    event.target.value
                  )
                }
                placeholder="Например: Barsy Atyrau"
                autoComplete="organization"
              />
            </label>

            <label className={styles.field}>
              <span>СТРАНА</span>

              <input
                type="text"
                value={formData.country}
                onChange={(event) =>
                  updateField(
                    "country",
                    event.target.value
                  )
                }
                placeholder="Например: Казахстан"
                autoComplete="country-name"
              />
            </label>

            <label className={styles.field}>
              <span>ГОРОД</span>

              <input
                type="text"
                value={formData.city}
                onChange={(event) =>
                  updateField(
                    "city",
                    event.target.value
                  )
                }
                placeholder="Например: Атырау"
                autoComplete="address-level2"
              />
            </label>
          </div>

          <button
            type="button"
            className={styles.nextButton}
            disabled={!isStepOneValid}
            onClick={goToStepTwo}
          >
            ПРОДОЛЖИТЬ

            <span>→</span>
          </button>
        </>
      )}

           {/* ================================= */}
      {/* ШАГ 2 — КАТЕГОРИЯ И ВОЗРАСТ */}
      {/* ================================= */}

      {step === 2 && (
        <>
          <p className={styles.eyebrow}>
            STEP TWO
          </p>

          <h2 className={styles.title}>
            {mode === "tournament" ? (
              <>
                ВАША
                <br />
                <span>КОМАНДА.</span>
              </>
            ) : (
              <>
                КТО
                <br />
                <span>ПРИЕДЕТ?</span>
              </>
            )}
          </h2>

          <p className={styles.description}>
            {mode === "tournament"
              ? "Категория определяется условиями выбранного турнира. Укажите фактический год рождения игроков вашей команды."
              : "Выберите категорию команды и год рождения игроков."}
          </p>

          <div className={styles.stepTwoContent}>
            {mode === "tournament" &&
            tournament ? (
              <>
                {/* ------------------------- */}
                {/* ЗАКРЕПЛЁННАЯ КАТЕГОРИЯ */}
                {/* ------------------------- */}

                <div
                  className={
                    styles.questionBlock
                  }
                >
                  <p
                    className={
                      styles.questionLabel
                    }
                  >
                    КАТЕГОРИЯ КОМАНДЫ
                  </p>

                  <div
                    className={
                      styles.lockedCategoryCard
                    }
                  >
                    <div
                      className={
                        styles.lockedCategoryMain
                      }
                    >
                      <span>
                        ЗАДАНО УСЛОВИЯМИ
                        ТУРНИРА
                      </span>

                      <strong>
                        {
                          tournament.categoryLabel
                        }
                      </strong>
                    </div>

                    <span
                      className={
                        styles.lockedCategoryMark
                      }
                    >
                      ✓
                    </span>
                  </div>

                  <p
                    className={
                      styles.tournamentAgeRule
                    }
                  >
                    УСЛОВИЕ ТУРНИРА ·{" "}
                    <strong>
                      {tournament.age}
                    </strong>
                  </p>
                </div>

                {/* ------------------------- */}
                {/* ДОСТУПНЫЕ ГОДЫ */}
                {/* ------------------------- */}

                <div
                  className={
                    styles.questionBlock
                  }
                >
                  <p
                    className={
                      styles.questionLabel
                    }
                  >
                    ГОД РОЖДЕНИЯ ВАШЕЙ
                    КОМАНДЫ
                  </p>

                  <div
                    className={
                      styles.yearOptions
                    }
                  >
                    {tournament.eligibleBirthYears.map(
                      (year) => (
                        <button
                          key={year}
                          type="button"
                          className={`${styles.yearButton} ${
                            formData.birthYear ===
                            year
                              ? styles.yearButtonActive
                              : ""
                          }`}
                          onClick={() =>
                            selectBirthYear(
                              year
                            )
                          }
                        >
                          {year}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* ------------------------- */}
                {/* СВОЙ ВАРИАНТ */}
                {/* ------------------------- */}

                <div
                  className={
                    styles.questionBlock
                  }
                >
                  <p
                    className={
                      styles.questionLabel
                    }
                  >
                    КАТЕГОРИЯ КОМАНДЫ
                  </p>

                  <div
                    className={
                      styles.genderOptions
                    }
                  >
                    <button
                      type="button"
                      className={`${styles.genderCard} ${
                        formData.gender ===
                        "boys"
                          ? styles.genderCardActive
                          : ""
                      }`}
                      onClick={() =>
                        updateField(
                          "gender",
                          "boys"
                        )
                      }
                    >
                      <span
                        className={
                          styles.optionNumber
                        }
                      >
                        01
                      </span>

                      <strong>
                        ЮНОШИ
                      </strong>

                      <span
                        className={
                          styles.optionMark
                        }
                      >
                        {formData.gender ===
                        "boys"
                          ? "✓"
                          : "→"}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.genderCard} ${
                        formData.gender ===
                        "girls"
                          ? styles.genderCardActive
                          : ""
                      }`}
                      onClick={() =>
                        updateField(
                          "gender",
                          "girls"
                        )
                      }
                    >
                      <span
                        className={
                          styles.optionNumber
                        }
                      >
                        02
                      </span>

                      <strong>
                        ДЕВУШКИ
                      </strong>

                      <span
                        className={
                          styles.optionMark
                        }
                      >
                        {formData.gender ===
                        "girls"
                          ? "✓"
                          : "→"}
                      </span>
                    </button>
                  </div>
                </div>

                <div
                  className={
                    styles.questionBlock
                  }
                >
                  <p
                    className={
                      styles.questionLabel
                    }
                  >
                    ГОД РОЖДЕНИЯ ИГРОКОВ
                  </p>

                  <div
                    className={
                      styles.yearOptions
                    }
                  >
                    {birthYears.map(
                      (year) => (
                        <button
                          key={year}
                          type="button"
                          className={`${styles.yearButton} ${
                            formData.birthYear ===
                            year
                              ? styles.yearButtonActive
                              : ""
                          }`}
                          onClick={() =>
                            selectBirthYear(
                              year
                            )
                          }
                        >
                          {year}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      className={`${styles.yearButton} ${
                        formData.birthYear ===
                        "other"
                          ? styles.yearButtonActive
                          : ""
                      }`}
                      onClick={() =>
                        selectBirthYear(
                          "other"
                        )
                      }
                    >
                      ДРУГОЙ
                    </button>
                  </div>

                  {formData.birthYear ===
                    "other" && (
                    <label
                      className={
                        styles.customYearField
                      }
                    >
                      <span>
                        УКАЖИТЕ ГОД
                        РОЖДЕНИЯ
                      </span>

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={
                          formData.customBirthYear
                        }
                        onChange={(
                          event
                        ) =>
                          updateField(
                            "customBirthYear",
                            event.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="Например: 2017"
                      />
                    </label>
                  )}
                </div>
              </>
            )}
          </div>

          <div
            className={
              styles.formNavigation
            }
          >
            <button
              type="button"
              className={
                styles.previousButton
              }
              onClick={goBack}
            >
              <span>←</span>

              НАЗАД
            </button>

            <button
              type="button"
              className={
                styles.nextButtonCompact
              }
              disabled={!isStepTwoValid}
              onClick={goToStepThree}
            >
              ПРОДОЛЖИТЬ

              <span>→</span>
            </button>
          </div>
        </>
      )}

      {/* ================================= */}
      {/* ШАГ 3 — ГОТОВЫЙ ТУРНИР */}
      {/* ================================= */}

      {step === 3 &&
        mode === "tournament" && (
          <>
            <p className={styles.eyebrow}>
              STEP THREE
            </p>

            <h2 className={styles.title}>
              ПОДТВЕРДИТЕ
              <br />
              <span>ВЫБОР.</span>
            </h2>

            <p className={styles.description}>
              Проверьте выбранный турнир
              перед продолжением.
            </p>

            {tournament && (
              <div
                className={
                  styles.stepThreeContent
                }
              >
                <div
                  className={
                    styles.confirmationCard
                  }
                >
                  <p
                    className={
                      styles.confirmationEyebrow
                    }
                  >
                    SELECTED TOURNAMENT
                  </p>

                  <h3
                    className={
                      styles.confirmationTitle
                    }
                  >
                    {tournament.title}
                  </h3>

                  <div
                    className={
                      styles.confirmationMeta
                    }
                  >
                    <div>
                      <span>КАТЕГОРИЯ</span>

                      <strong>
                        {
                          tournament.categoryLabel
                        }
                      </strong>
                    </div>

                    <div>
                      <span>ВОЗРАСТ</span>

                      <strong>
                        {tournament.age}
                      </strong>
                    </div>

                    <div>
                      <span>ДАТЫ</span>

                      <strong>
                        {tournament.dates}
                      </strong>
                    </div>

                    <div>
                      <span>МЕСТО</span>

                      <strong>
                        {tournament.location}
                      </strong>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`${styles.confirmButton} ${
                    formData.tournamentConfirmed
                      ? styles.confirmButtonActive
                      : ""
                  }`}
                  onClick={
                    toggleTournamentConfirmation
                  }
                >
                  <span>
                    {formData.tournamentConfirmed
                      ? "✓"
                      : "○"}
                  </span>

                  {formData.tournamentConfirmed
                    ? "ВЫБОР ПОДТВЕРЖДЁН"
                    : "ПОДТВЕРЖДАЮ ВЫБОР"}
                </button>
              </div>
            )}

            <div
              className={styles.formNavigation}
            >
              <button
                type="button"
                className={
                  styles.previousButton
                }
                onClick={goBack}
              >
                <span>←</span>
                НАЗАД
              </button>

              <button
                type="button"
                className={
                  styles.nextButtonCompact
                }
                disabled={!isStepThreeValid}
                onClick={goToStepFour}
              >
                ПРОДОЛЖИТЬ
                <span>→</span>
              </button>
            </div>
          </>
        )}

      {/* ================================= */}
      {/* ШАГ 3 — СВОЙ ВАРИАНТ */}
      {/* ================================= */}

      {step === 3 &&
        mode === "custom" && (
          <>
            <p className={styles.eyebrow}>
              STEP THREE
            </p>

            <h2 className={styles.title}>
              КОГДА ВАМ
              <br />
              <span>УДОБНО?</span>
            </h2>

            <p className={styles.description}>
              Выберите примерные сроки.
              Можно указать несколько периодов.
            </p>

            <div
              className={styles.stepThreeContent}
            >
              {/* ГОД */}

              <div className={styles.timingSection}>
                <div
                  className={styles.timingHeading}
                >
                  <p
                    className={
                      styles.questionLabel
                    }
                  >
                    ЖЕЛАТЕЛЬНЫЙ ГОД
                  </p>
                </div>

                <div
                  className={
                    styles.preferredYearOptions
                  }
                >
                  {preferredYears.map(
                    (yearOption) => (
                      <button
                        key={yearOption.value}
                        type="button"
                        className={`${styles.preferredYearButton} ${
                          formData.preferredYear ===
                          yearOption.value
                            ? styles.preferredYearButtonActive
                            : ""
                        }`}
                        onClick={() =>
                          updateField(
                            "preferredYear",
                            yearOption.value
                          )
                        }
                      >
                        {yearOption.label}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* ПЕРИОДЫ */}

              <div className={styles.timingSection}>
                <div
                  className={styles.timingHeading}
                >
                  <p
                    className={
                      styles.questionLabel
                    }
                  >
                    ПРИМЕРНЫЙ ПЕРИОД
                  </p>

                  <span
                    className={
                      styles.timingHint
                    }
                  >
                    МОЖНО НЕСКОЛЬКО
                  </span>
                </div>

                <div
                  className={
                    styles.periodOptions
                  }
                >
                  {periodOptions.map(
                    (period) => {
                      const isSelected =
                        formData.preferredPeriods.includes(
                          period.value
                        );

                      return (
                        <button
                          key={period.value}
                          type="button"
                          className={`${styles.periodButton} ${
                            isSelected
                              ? styles.periodButtonActive
                              : ""
                          }`}
                          onClick={() =>
                            togglePeriod(
                              period.value
                            )
                          }
                        >
                          <span>
                            {period.label}
                          </span>

                          <strong>
                            {isSelected
                              ? "✓"
                              : "+"}
                          </strong>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* СВОЙ ВАРИАНТ */}

              <label
                className={
                  styles.customDatesField
                }
              >
                <span>
                  СВОЙ ВАРИАНТ ДАТ
                </span>

                <input
                  type="text"
                  value={formData.customDates}
                  onChange={(event) =>
                    updateField(
                      "customDates",
                      event.target.value
                    )
                  }
                  placeholder="Например: 15–25 июня"
                />
              </label>
            </div>

            <div
              className={styles.formNavigation}
            >
              <button
                type="button"
                className={
                  styles.previousButton
                }
                onClick={goBack}
              >
                <span>←</span>
                НАЗАД
              </button>

              <button
                type="button"
                className={
                  styles.nextButtonCompact
                }
                disabled={!isStepThreeValid}
                onClick={goToStepFour}
              >
                ПРОДОЛЖИТЬ
                <span>→</span>
              </button>
            </div>
          </>
        )}

      {/* ================================= */}
{/* ШАГ 4 — КОНТАКТЫ */}
{/* ================================= */}

{step === 4 && !isSubmitted && (
  <>
    <p className={styles.eyebrow}>
      STEP FOUR
    </p>

    <h2 className={styles.title}>
      КАК С ВАМИ
      <br />
      <span>СВЯЗАТЬСЯ?</span>
    </h2>

    <p className={styles.description}>
      Оставьте контакты представителя
      команды. Мы свяжемся с вами после
      получения заявки.
    </p>

    <div className={styles.contactContent}>
      <div className={styles.contactFields}>
        <label className={styles.field}>
          <span>
            ИМЯ И ФАМИЛИЯ
          </span>

          <input
            type="text"
            value={formData.contactName}
            onChange={(event) =>
              updateField(
                "contactName",
                event.target.value
              )
            }
            placeholder="Например: Данияр Сериков"
            autoComplete="name"
          />
        </label>

        <label className={styles.field}>
          <span>
            ТЕЛЕФОН / WHATSAPP
          </span>

          <input
            type="tel"
            value={formData.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value
              )
            }
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
          />
        </label>

        <label className={styles.field}>
          <span>EMAIL</span>

          <input
            type="email"
            value={formData.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
            placeholder="team@example.com"
            autoComplete="email"
          />
        </label>

        <label className={styles.commentField}>
          <span>
            КОММЕНТАРИЙ
          </span>

          <textarea
            value={formData.comment}
            onChange={(event) =>
              updateField(
                "comment",
                event.target.value
              )
            }
            placeholder="Дополнительная информация или пожелания"
            rows={3}
          />
        </label>
      </div>

      <button
        type="button"
        className={`${styles.consentButton} ${
          formData.consentAccepted
            ? styles.consentButtonActive
            : ""
        }`}
        onClick={toggleConsent}
      >
        <span className={styles.consentMark}>
          {formData.consentAccepted
            ? "✓"
            : ""}
        </span>

        <span className={styles.consentText}>
          СОГЛАШАЮСЬ НА ОБРАБОТКУ
          ПРЕДОСТАВЛЕННЫХ ДАННЫХ
        </span>
      </button>
          
          {submitError && (
  <div className={styles.submitError}>
    <strong>
      НЕ УДАЛОСЬ ОТПРАВИТЬ ЗАЯВКУ
    </strong>

    <span>
      {submitError}
    </span>
  </div>
)}

          {submitError && (
  <div className={styles.submitError}>
    <strong>
      НЕ УДАЛОСЬ ОТПРАВИТЬ ЗАЯВКУ
    </strong>

    <span>
      {submitError}
    </span>
  </div>
)}

    </div>

    <div className={styles.formNavigation}>
      <button
        type="button"
        className={styles.previousButton}
        onClick={goBack}
      >
        <span>←</span>

        НАЗАД
      </button>

      <button
  type="button"
  className={styles.submitButton}
  disabled={
    !isStepFourValid ||
    isSubmitting
  }
  onClick={submitApplication}
>
  {isSubmitting
    ? "ОТПРАВЛЯЕМ..."
    : "ОТПРАВИТЬ ЗАЯВКУ"}

  <span>
    {isSubmitting ? "…" : "→"}
  </span>
</button>
    </div>
  </>
)}

{/* ================================= */}
{/* УСПЕШНАЯ ОТПРАВКА */}
{/* ================================= */}

{isSubmitted && (
  <div className={styles.successScreen}>
    <div className={styles.successMark}>
      ✓
    </div>

    <p className={styles.eyebrow}>
      APPLICATION RECEIVED
    </p>

    <h2 className={styles.successTitle}>
      ЗАЯВКА
      <br />
      <span>ПРИНЯТА.</span>
    </h2>

    <p className={styles.successDescription}>
      Спасибо, {formData.contactName}.
      Заявка вашей команды успешно отправлена.
      Мы получили данные и свяжемся
      с вашим представителем.
    </p>

    <div className={styles.successSummary}>
      <div>
        <span>КОМАНДА</span>

        <strong>
          {formData.teamName}
        </strong>
      </div>

      <div>
        <span>КАТЕГОРИЯ</span>

        <strong>
          {genderLabel}
        </strong>
      </div>

      <div>
        <span>КОНТАКТ</span>

        <strong>
          {formData.phone}
        </strong>
      </div>
    </div>

    <button
      type="button"
      className={styles.newApplicationButton}
      onClick={startNewApplication}
    >
      НОВАЯ ЗАЯВКА

      <span>→</span>
    </button>

  </div>
)}
    </div>
  );
}
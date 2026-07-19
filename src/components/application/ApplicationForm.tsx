"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { applyCopy } from "@/i18n/translations";
import styles from "./ApplicationForm.module.css";

type ApplicationFormProps = {
  mode: "tournament" | "custom";

  tournament?: {
    id: string;

    title: string;

    allowedCategories: ("boys" | "girls")[];
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

const preferredYearValues = ["2026", "2027", "2028", "flexible"];
const periodValues = ["jan-feb", "mar-apr", "may-jun", "jul-aug", "sep-oct", "nov-dec"];

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
  const { language } = useLanguage();
  const copy = applyCopy[language].form;
  const categoryLabels: Record<"boys" | "girls", string> = { boys: copy.boys, girls: copy.girls };
  const preferredYears = preferredYearValues.map((value) => ({ value, label: value === "flexible" ? copy.flexible : value }));
  const periodOptions = periodValues.map((value, index) => ({ value, label: copy.periods[index] }));

  const createInitialFormData =
  (): ApplicationData => ({
    ...initialFormData,

    gender:
      mode === "tournament" &&
      tournament &&
      tournament.allowedCategories.length === 1
        ? tournament.allowedCategories[0]
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

const isAllowedTournamentGender =
  mode === "tournament" &&
  tournament
    ? tournament.allowedCategories.includes(
        formData.gender as "boys" | "girls"
      )
    : true;

const isStepTwoValid =
  mode === "tournament"
    ? Boolean(
        tournament &&
        isAllowedTournamentGender &&
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
      ? copy.boys
      : formData.gender === "girls"
        ? copy.girls
        : "";

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
            copy.sendErrorDetail
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
          : copy.sendErrorDetail
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
          {copy.step} {String(step).padStart(2, "0")} / 04
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
            {copy.stepOne}
          </p>

          <h2 className={styles.title}>
            {copy.teamTitle[0]}
            <br />
            {copy.teamTitle[1]}
          </h2>

          <p className={styles.description}>
            {copy.teamDescription}
          </p>

          <div className={styles.fields}>
            <label className={styles.field}>
              <span>
                {copy.teamName}
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
                placeholder={copy.teamPlaceholder}
                autoComplete="organization"
              />
            </label>

            <label className={styles.field}>
              <span>{copy.country}</span>

              <input
                type="text"
                value={formData.country}
                onChange={(event) =>
                  updateField(
                    "country",
                    event.target.value
                  )
                }
                placeholder={copy.countryPlaceholder}
                autoComplete="country-name"
              />
            </label>

            <label className={styles.field}>
              <span>{copy.city}</span>

              <input
                type="text"
                value={formData.city}
                onChange={(event) =>
                  updateField(
                    "city",
                    event.target.value
                  )
                }
                placeholder={copy.cityPlaceholder}
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
            {copy.continue}

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
      {copy.stepTwo}
    </p>

    <h2 className={styles.title}>
      {mode === "tournament" ? (
        <>
          {copy.tournamentTeamTitle[0]}
          <br />
          <span>{copy.tournamentTeamTitle[1]}</span>
        </>
      ) : (
        <>
          {copy.customTeamTitle[0]}
          <br />
          <span>{copy.customTeamTitle[1]}</span>
        </>
      )}
    </h2>

    <p className={styles.description}>
      {mode === "tournament"
        ? copy.tournamentTeamDescription
        : copy.customTeamDescription}
    </p>

    <div className={styles.stepTwoContent}>
      {mode === "tournament" &&
      tournament ? (
        <>
          {/* КАТЕГОРИИ ВЫБРАННОГО ТУРНИРА */}

          <div className={styles.questionBlock}>
            <p className={styles.questionLabel}>
              {copy.teamCategory}
            </p>

            {tournament.allowedCategories.length ===
            1 ? (
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
                    {copy.setByTournament}
                  </span>

                  <strong>
                    {
                      categoryLabels[
                        tournament
                          .allowedCategories[0]
                      ]
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
            ) : (
              <div className={styles.genderOptions}>
                {tournament.allowedCategories.map(
                  (category, index) => (
                    <button
                      key={category}
                      type="button"
                      className={`${styles.genderCard} ${
                        formData.gender ===
                        category
                          ? styles.genderCardActive
                          : ""
                      }`}
                      onClick={() =>
                        updateField(
                          "gender",
                          category
                        )
                      }
                    >
                      <span
                        className={
                          styles.optionNumber
                        }
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <strong>
                        {categoryLabels[category]}
                      </strong>

                      <span
                        className={
                          styles.optionMark
                        }
                      >
                        {formData.gender ===
                        category
                          ? "✓"
                          : "→"}
                      </span>
                    </button>
                  )
                )}
              </div>
            )}

            <p
              className={
                styles.tournamentAgeRule
              }
            >
              {copy.tournamentRule} ·{" "}
              <strong>{tournament.age}</strong>
            </p>
          </div>

          {/* ГОДЫ ВЫБРАННОГО ТУРНИРА */}

          <div className={styles.questionBlock}>
            <p className={styles.questionLabel}>
              {copy.teamBirthYear}
            </p>

            <div className={styles.yearOptions}>
              {tournament.eligibleBirthYears.map(
                (year) => (
                  <button
                    key={year}
                    type="button"
                    className={`${styles.yearButton} ${
                      formData.birthYear === year
                        ? styles.yearButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      selectBirthYear(year)
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
          {/* СВОЙ ВАРИАНТ */}

          <div className={styles.questionBlock}>
            <p className={styles.questionLabel}>
              {copy.teamCategory}
            </p>

            <div className={styles.genderOptions}>
              <button
                type="button"
                className={`${styles.genderCard} ${
                  formData.gender === "boys"
                    ? styles.genderCardActive
                    : ""
                }`}
                onClick={() =>
                  updateField("gender", "boys")
                }
              >
                <span className={styles.optionNumber}>
                  01
                </span>

                <strong>{copy.boys}</strong>

                <span className={styles.optionMark}>
                  {formData.gender === "boys"
                    ? "✓"
                    : "→"}
                </span>
              </button>

              <button
                type="button"
                className={`${styles.genderCard} ${
                  formData.gender === "girls"
                    ? styles.genderCardActive
                    : ""
                }`}
                onClick={() =>
                  updateField("gender", "girls")
                }
              >
                <span className={styles.optionNumber}>
                  02
                </span>

                <strong>{copy.girls}</strong>

                <span className={styles.optionMark}>
                  {formData.gender === "girls"
                    ? "✓"
                    : "→"}
                </span>
              </button>
            </div>
          </div>

          <div className={styles.questionBlock}>
            <p className={styles.questionLabel}>
              {copy.playersBirthYear}
            </p>

            <div className={styles.yearOptions}>
              {birthYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  className={`${styles.yearButton} ${
                    formData.birthYear === year
                      ? styles.yearButtonActive
                      : ""
                  }`}
                  onClick={() =>
                    selectBirthYear(year)
                  }
                >
                  {year}
                </button>
              ))}

              <button
                type="button"
                className={`${styles.yearButton} ${
                  formData.birthYear ===
                  "other"
                    ? styles.yearButtonActive
                    : ""
                }`}
                onClick={() =>
                  selectBirthYear("other")
                }
              >
                {copy.other}
              </button>
            </div>

            {formData.birthYear === "other" && (
              <label
                className={
                  styles.customYearField
                }
              >
                <span>
                  {copy.enterBirthYear}
                </span>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={formData.customBirthYear}
                  onChange={(event) =>
                    updateField(
                      "customBirthYear",
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder={copy.birthYearPlaceholder}
                />
              </label>
            )}
          </div>
        </>
      )}
    </div>

    <div className={styles.formNavigation}>
      <button
        type="button"
        className={styles.previousButton}
        onClick={goBack}
      >
        <span>←</span>

        {copy.back}
      </button>

      <button
        type="button"
        className={styles.nextButtonCompact}
        disabled={!isStepTwoValid}
        onClick={goToStepThree}
      >
        {copy.continue}

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
              {copy.stepThree}
            </p>

            <h2 className={styles.title}>
              {copy.confirmTitle[0]}
              <br />
              <span>{copy.confirmTitle[1]}</span>
            </h2>

            <p className={styles.description}>
              {copy.confirmDescription}
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
                    {copy.selectedTournament}
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
                      <span>{applyCopy[language].page.category}</span>

                      <strong>
                        {
                          tournament.categoryLabel
                        }
                      </strong>
                    </div>

                    <div>
                      <span>{applyCopy[language].page.age}</span>

                      <strong>
                        {tournament.age}
                      </strong>
                    </div>

                    <div>
                      <span>{applyCopy[language].page.dates}</span>

                      <strong>
                        {tournament.dates}
                      </strong>
                    </div>

                    <div>
                      <span>{applyCopy[language].page.location}</span>

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
                    ? copy.confirmed
                    : copy.confirm}
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
                {copy.back}
              </button>

              <button
                type="button"
                className={
                  styles.nextButtonCompact
                }
                disabled={!isStepThreeValid}
                onClick={goToStepFour}
              >
                {copy.continue}
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
              {copy.stepThree}
            </p>

            <h2 className={styles.title}>
              {copy.timingTitle[0]}
              <br />
              <span>{copy.timingTitle[1]}</span>
            </h2>

            <p className={styles.description}>
              {copy.timingDescription}
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
                    {copy.preferredYear}
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
                    {copy.approximatePeriod}
                  </p>

                  <span
                    className={
                      styles.timingHint
                    }
                  >
                    {copy.multiple}
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
                  {copy.customDates}
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
                  placeholder={copy.datesPlaceholder}
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
                {copy.back}
              </button>

              <button
                type="button"
                className={
                  styles.nextButtonCompact
                }
                disabled={!isStepThreeValid}
                onClick={goToStepFour}
              >
                {copy.continue}
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
      {copy.stepFour}
    </p>

    <h2 className={styles.title}>
      {copy.contactTitle[0]}
      <br />
      <span>{copy.contactTitle[1]}</span>
    </h2>

    <p className={styles.description}>
      {copy.contactDescription}
    </p>

    <div className={styles.contactContent}>
      <div className={styles.contactFields}>
        <label className={styles.field}>
          <span>
            {copy.name}
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
            placeholder={copy.namePlaceholder}
            autoComplete="name"
          />
        </label>

        <label className={styles.field}>
          <span>
            {copy.phone}
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
          <span>{copy.email}</span>

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
            {copy.comment}
          </span>

          <textarea
            value={formData.comment}
            onChange={(event) =>
              updateField(
                "comment",
                event.target.value
              )
            }
            placeholder={copy.commentPlaceholder}
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
          {copy.consent}
        </span>
      </button>
          
          {submitError && (
  <div className={styles.submitError}>
    <strong>
      {copy.sendError}
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

        {copy.back}
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
    ? copy.sending
    : copy.submit}

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
      {copy.received}
    </p>

    <h2 className={styles.successTitle}>
      {copy.successTitle[0]}
      <br />
      <span>{copy.successTitle[1]}</span>
    </h2>

    <p className={styles.successDescription}>
  {copy.successStart}, {formData.contactName}. {copy.successText}
</p>

    <div className={styles.successSummary}>
      <div>
        <span>{copy.team}</span>

        <strong>
          {formData.teamName}
        </strong>
      </div>

      <div>
        <span>{copy.category}</span>

        <strong>
          {genderLabel}
        </strong>
      </div>

      <div>
        <span>{copy.contact}</span>

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
      {copy.newApplication}

      <span>→</span>
    </button>

  </div>
)}
    </div>
  );
}

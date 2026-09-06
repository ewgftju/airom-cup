import { redirect } from "next/navigation";
import { tournaments } from "@/data/tournaments";

import { logout } from "./actions";
import styles from "./Admin.module.css";

import { createClient } from
  "@/lib/supabase/server";

import { supabaseAdmin } from
  "@/lib/supabaseAdmin";

type ApplicationRow = {
  id: string;
  created_at: string;

  status: string;
  mode: "tournament" | "custom";

  tournament_title: string | null;
  tournament_id: string | null;

  team_name: string;
  country: string;
  city: string;

  gender: "boys" | "girls";
  birth_year: string;

  preferred_year: string | null;
  preferred_periods: string[];
  custom_dates: string | null;
  comment: string | null;

  contact_name: string;
  phone: string;
  email: string;
};

const statusLabels: Record<string, string> = {
  new: "НОВАЯ",
  contacted: "СВЯЗАЛИСЬ",
  approved: "ПРИНЯТА",
  rejected: "ОТКЛОНЕНА",
};

const periodLabels: Record<string, string> = {
  "jan-feb": "ЯНВАРЬ — ФЕВРАЛЬ",
  "mar-apr": "МАРТ — АПРЕЛЬ",
  "may-jun": "МАЙ — ИЮНЬ",
  "jul-aug": "ИЮЛЬ — АВГУСТ",
  "sep-oct": "СЕНТЯБРЬ — ОКТЯБРЬ",
  "nov-dec": "НОЯБРЬ — ДЕКАБРЬ",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Atyrau",
  }).format(new Date(value));
}

export default async function AdminPage() {
  /* -------------------------------- */
  /* ПРОВЕРКА АВТОРИЗАЦИИ */
  /* -------------------------------- */

  const supabase = await createClient();

  const {
    data,
    error: authError,
  } = await supabase.auth.getClaims();

  const claims =
    data?.claims as
      | {
          email?: string;
        }
      | undefined;

  const currentEmail =
    claims?.email
      ?.trim()
      .toLowerCase() ?? "";

  const allowedEmail =
    process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase() ?? "";

  if (
    authError ||
    !currentEmail ||
    currentEmail !== allowedEmail
  ) {
    redirect("/admin/login");
  }

  /* -------------------------------- */
  /* ЗАГРУЗКА ДАННЫХ */
  /* -------------------------------- */

  const [
    totalResult,
    tournamentResult,
    customResult,
    newResult,
    recentResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("applications")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabaseAdmin
      .from("applications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("mode", "tournament"),

    supabaseAdmin
      .from("applications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("mode", "custom"),

    supabaseAdmin
      .from("applications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "new"),

    supabaseAdmin
      .from("applications")
      .select(`
        id,
        created_at,
        status,
        mode,
        tournament_title,
        tournament_id,
        team_name,
        country,
        city,
        gender,
        birth_year,
        preferred_year,
        preferred_periods,
        custom_dates,
        comment,
        contact_name,
        phone,
        email
      `)
      .order("created_at", {
        ascending: false,
      }),
  ]);

  if (recentResult.error) {
    console.error(
      "ADMIN APPLICATIONS ERROR:",
      recentResult.error
    );
  }

  const applications =
    (recentResult.data ??
      []) as ApplicationRow[];

  return (
    <main className={styles.page}>
      {/* HEADER */}

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            AIROM CUP · CONTROL CENTER
          </p>

          <h1 className={styles.title}>
            ADMIN
            <span>DASHBOARD.</span>
          </h1>
        </div>

        <div className={styles.adminActions}>
          <div className={styles.adminIdentity}>
            <span>ADMINISTRATOR</span>

            <strong>{currentEmail}</strong>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className={styles.logoutButton}
            >
              ВЫЙТИ
              <span>→</span>
            </button>
          </form>
        </div>
      </header>

      {/* СТАТИСТИКА */}

      <section className={styles.stats}>
        <AdminStat
          number="01"
          label="ВСЕГО ЗАЯВОК"
          value={totalResult.count ?? 0}
        />

        <AdminStat
          number="02"
          label="НА ГОТОВЫЕ ТУРНИРЫ"
          value={
            tournamentResult.count ?? 0
          }
        />

        <AdminStat
          number="03"
          label="СВОЙ ВАРИАНТ"
          value={customResult.count ?? 0}
        />

        <AdminStat
          number="04"
          label="НОВЫЕ"
          value={newResult.count ?? 0}
          accent
        />
      </section>

      {/* ПОСЛЕДНИЕ ЗАЯВКИ */}

      <section className={styles.applications}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>
              APPLICATIONS
            </p>

            <h2>
              ВСЕ
              <span>ЗАЯВКИ.</span>
            </h2>
          </div>

          <span className={styles.resultCount}>
            ПОКАЗАНО · {applications.length} / {totalResult.count ?? "—"}
          </span>
        </div>

        {recentResult.error ? (
          <div className={styles.emptyState} role="alert">
            <strong>НЕ УДАЛОСЬ ЗАГРУЗИТЬ ЗАЯВКИ</strong>
            <span>Обновите страницу через минуту. Ошибка загрузки не означает, что заявки удалены.</span>
          </div>
        ) : applications.length === 0 ? (
          <div className={styles.emptyState}>
            <strong>
              ЗАЯВОК ПОКА НЕТ
            </strong>

            <span>
              Новые заявки появятся здесь
              автоматически.
            </span>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ДАТА</th>
                  <th>ТИП</th>
                  <th>КОМАНДА</th>
                  <th>КАТЕГОРИЯ</th>
                  <th>ГОД РОЖДЕНИЯ</th>
                  <th>
                    ТУРНИР / ПЕРИОД
                  </th>
                  <th>КОНТАКТ</th>
                  <th>СТАТУС</th>
                </tr>
              </thead>

              <tbody>
                {applications.map(
                  (application) => {
                    const event = tournaments.find((item) => item.id === application.tournament_id);
                    const timing = application.mode === "tournament"
                      ? event ? `${event.dates} · ${event.year}` : application.tournament_title || "ТУРНИР"
                      : [
                          application.preferred_year === "flexible" ? "ГОД НЕ ВАЖЕН" : application.preferred_year,
                          (application.preferred_periods ?? []).map((period) => periodLabels[period] ?? period).join(", "),
                          application.custom_dates,
                        ].filter(Boolean).join(" · ") || "НЕ УКАЗАНО";

                    return (
                      <tr key={application.id}>
                        <td>
                          <span
                            className={
                              styles.date
                            }
                          >
                            {formatDate(
                              application.created_at
                            )}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              application.mode ===
                              "tournament"
                                ? styles
                                    .typeTournament
                                : styles.typeCustom
                            }
                          >
                            {application.mode ===
                            "tournament"
                              ? "ТУРНИР"
                              : "СВОЙ ВАРИАНТ"}
                          </span>
                        </td>

                        <td>
                          <strong>
                            {
                              application.team_name
                            }
                          </strong>

                          <span
                            className={
                              styles.subText
                            }
                          >
                            {application.city} ·{" "}
                            {
                              application.country
                            }
                          </span>
                        </td>

                        <td>
                          {application.gender ===
                          "boys"
                            ? "ЮНОШИ"
                            : "ДЕВУШКИ"}
                        </td>

                        <td>
                          <strong>
                            {
                              application.birth_year
                            }
                          </strong>
                        </td>

                        <td>
                          <span
                            className={
                              styles.timing
                            }
                          >
                            {timing}
                          </span>
                          {application.comment && (
                            <details className={styles.comment}>
                              <summary>Комментарий</summary>
                              <p>{application.comment}</p>
                            </details>
                          )}
                        </td>

                        <td>
                          <strong>
                            {
                              application.contact_name
                            }
                          </strong>

                          <span
                            className={
                              styles.subText
                            }
                          >
                            <a href={`tel:${application.phone.replace(/[^\d+]/g, "")}`}>{application.phone}</a>
                          </span>
                          <a className={styles.subText} href={`mailto:${application.email}`}>{application.email}</a>
                        </td>

                        <td>
                          <span
                            className={
                              styles.status
                            }
                          >
                            {statusLabels[
                              application.status
                            ] ??
                              application.status}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <span>
          AIROM CUP · ADMIN SYSTEM
        </span>

        <span>
          APPLICATION MANAGEMENT
        </span>

        <span>2026</span>
      </footer>
    </main>
  );
}

function AdminStat({
  number,
  label,
  value,
  accent = false,
}: {
  number: string;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <article
      className={`${styles.statCard} ${
        accent ? styles.statCardAccent : ""
      }`}
    >
      <div className={styles.statHeader}>
        <span>{number}</span>

        <span>LIVE DATA</span>
      </div>

      <strong className={styles.statValue}>
        {value}
      </strong>

      <p className={styles.statLabel}>
        {label}
      </p>
    </article>
  );
}

import Link from "next/link";

import { login } from "./actions";
import styles from "./Login.module.css";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  const errorMessages: Record<string, string> = {
    empty: "Введите email и пароль.",
    invalid: "Неверный email или пароль.",
    forbidden:
      "У этой учётной записи нет доступа к админке.",
  };

  const errorMessage = params.error
    ? errorMessages[params.error]
    : "";

  return (
    <main className={styles.page}>
      <div
        className={styles.grid}
        aria-hidden="true"
      />

      <div
        className={styles.number}
        aria-hidden="true"
      >
        A
      </div>

      <Link
        href="/"
        className={styles.backLink}
      >
        ← НА САЙТ
      </Link>

      <section className={styles.card}>
        <div className={styles.brand}>
          AIROM CUP
        </div>

        <p className={styles.eyebrow}>
          ADMINISTRATION
        </p>

        <h1 className={styles.title}>
          ADMIN
          <br />
          <span>ACCESS.</span>
        </h1>

        <p className={styles.description}>
          Вход в панель управления заявками
          и аналитикой турниров.
        </p>

        <form
          action={login}
          className={styles.form}
        >
          <label className={styles.field}>
            <span>EMAIL</span>

            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className={styles.field}>
            <span>ПАРОЛЬ</span>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {errorMessage && (
            <div className={styles.error}>
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
          >
            ВОЙТИ

            <span>→</span>
          </button>
        </form>
      </section>

      <footer className={styles.footer}>
        AIROM CUP · ADMIN SYSTEM
      </footer>
    </main>
  );
}
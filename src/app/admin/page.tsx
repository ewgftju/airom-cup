import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminEmail } from "@/lib/adminAuth";
import { loadAdminApplications } from "@/lib/loadAdminApplications";
import { deleteApplication, logout } from "./actions";
import AdminApplications from "./AdminApplications";
import styles from "./Admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const currentEmail = await getAdminEmail();
  if (!currentEmail) redirect("/admin/login");
  let applications;
  try {
    applications = await loadAdminApplications();
  } catch {
    console.error("ADMIN APPLICATIONS: failed to load complete list");
  }
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <Link href="/" className={styles.eyebrow}>← AIROM CUP · НА САЙТ</Link>
          <h1 className={styles.title}>ЗАЯВКИ <span>КОМАНД.</span></h1>
        </div>
        <div className={styles.adminActions}>
          <div className={styles.adminIdentity}><span>АДМИНИСТРАТОР</span><strong>{currentEmail}</strong></div>
          <form action={logout}><button type="submit" className={styles.logoutButton}>Выйти →</button></form>
        </div>
      </header>
      {applications ? <AdminApplications applications={applications} deleteAction={deleteApplication} /> : (
        <div className={styles.emptyState} role="alert">
          <strong>Не удалось загрузить заявки</strong>
          <p>Обновите страницу через минуту. Ошибка загрузки не означает, что заявки удалены.</p>
          <a href="/admin">Обновить список</a>
        </div>
      )}
      <footer className={styles.footer}>AIROM CUP · Управление заявками</footer>
    </main>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { tournaments } from "@/data/tournaments";
import {
  applicationPeriod, cupYear, emptyFilters, filterApplications, formatApplicationDate, statusLabels,
  type ApplicationFilters, type ApplicationRow, type DeleteApplicationResult,
} from "@/lib/adminApplications";
import styles from "./Admin.module.css";

const pageSize = 25;
const unique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b, "ru", { numeric: true }));

export default function AdminApplications({ applications, deleteAction }: {
  applications: ApplicationRow[];
  deleteAction: (id: string) => Promise<DeleteApplicationResult>;
}) {
  const [filters, setFilters] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ApplicationRow | null>(null);
  const [notice, setNotice] = useState<{ error: boolean; text: string } | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [deleting, startDelete] = useTransition();
  const dialog = useRef<HTMLDialogElement>(null);
  const cancelButton = useRef<HTMLButtonElement>(null);
  const filtered = useMemo(() => filterApplications(applications, filters), [applications, filters]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const years = unique(applications.map(cupYear));
  const birthYears = unique(applications.map((row) => String(row.birth_year)));
  const statuses = unique(applications.map((row) => row.status));
  const eventIds = unique(applications.flatMap((row) => row.tournament_id ? [row.tournament_id] : []));

  useEffect(() => {
    if (selected && !dialog.current?.open) {
      dialog.current?.showModal();
      cancelButton.current?.focus();
    }
  }, [selected]);

  function updateFilter<K extends keyof ApplicationFilters>(key: K, value: ApplicationFilters[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setPage(1);
  }
  function resetFilters() { setFilters(emptyFilters); setPage(1); }
  function closeDialog() { dialog.current?.close(); setSelected(null); setDeleteError(""); }
  function confirmDelete() {
    if (!selected || deleting) return;
    const id = String(selected.id);
    setDeleteError("");
    startDelete(async () => {
      try {
        const result = await deleteAction(id);
        if (!result.ok) { setDeleteError(result.message); return; }
        setNotice({ error: false, text: result.message });
        closeDialog();
      } catch {
        setDeleteError("Не удалось связаться с сервером. Обновите список перед повторной попыткой.");
      }
    });
  }
  async function exportExcel() {
    setExporting(true);
    setNotice(null);
    try {
      const { downloadApplications } = await import("@/lib/exportApplications");
      await downloadApplications(filtered);
      setNotice({ error: false, text: `Файл Excel подготовлен. Заявок: ${filtered.length}.` });
    } catch {
      setNotice({ error: true, text: "Не удалось создать Excel. Повторите выгрузку." });
    } finally { setExporting(false); }
  }

  return (
    <>
      <section className={styles.stats} aria-label="Статистика заявок">
        {[
          ["Всего заявок", applications.length],
          ["На турниры", applications.filter((row) => row.mode === "tournament").length],
          ["Свой вариант", applications.filter((row) => row.mode === "custom").length],
          ["Новые", applications.filter((row) => row.status === "new").length],
        ].map(([label, value], index) => (
          <article key={label} className={`${styles.statCard} ${index === 3 ? styles.statCardAccent : ""}`}>
            <span className={styles.statLabel}>{label}</span><strong className={styles.statValue}>{value}</strong>
          </article>
        ))}
      </section>
      <section className={styles.applications} aria-labelledby="applications-heading">
        <div className={styles.sectionHeader}>
          <div><p className={styles.sectionEyebrow}>УПРАВЛЕНИЕ ЗАЯВКАМИ</p><h2 id="applications-heading">Все команды</h2></div>
          <button className={styles.exportButton} disabled={exporting || filtered.length === 0 || deleting} onClick={exportExcel}>
            {exporting ? "Готовим файл…" : `Скачать Excel · ${filtered.length}`} <span aria-hidden="true">↓</span>
          </button>
        </div>
        <div className={styles.filters}>
          <label className={styles.search}><span>Поиск</span><input type="search" value={filters.search} onChange={(event) => updateFilter("search", event.target.value)} placeholder="Команда, город, страна или контакт" /></label>
          <label><span>Год кубка</span><select value={filters.year} onChange={(event) => updateFilter("year", event.target.value)}><option value="">Все годы</option>{years.map((year) => <option key={year}>{year}</option>)}</select></label>
          <label><span>Год рождения</span><select value={filters.birthYear} onChange={(event) => updateFilter("birthYear", event.target.value)}><option value="">Все возрасты</option>{birthYears.map((year) => <option key={year}>{year}</option>)}</select></label>
          <label><span>Тип заявки</span><select value={filters.mode} onChange={(event) => updateFilter("mode", event.target.value)}><option value="">Все типы</option><option value="tournament">Турнир</option><option value="custom">Свой вариант</option></select></label>
          <label><span>Статус</span><select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}><option value="">Все статусы</option>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status] ?? status}</option>)}</select></label>
          <label className={styles.tournamentFilter}><span>Турнир</span><select value={filters.tournament} onChange={(event) => updateFilter("tournament", event.target.value)}><option value="">Все турниры</option>{eventIds.map((id) => {
            const event = tournaments.find((item) => item.id === id);
            return <option key={id} value={id}>{event ? `${event.age} · ${event.dates} · ${event.year}` : applications.find((row) => row.tournament_id === id)?.tournament_title || id}</option>;
          })}</select></label>
          <label className={styles.sortFilter}><span>Сортировка</span><select value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value as ApplicationFilters["sort"])}>
            <option value="newest">Сначала новые</option><option value="oldest">Сначала старые</option><option value="team">Команда: А–Я</option><option value="birthYear">Год рождения: по возрастанию</option><option value="year">Год кубка: по возрастанию</option>
          </select></label>
          <button className={styles.resetButton} onClick={resetFilters}>Сбросить фильтры</button>
        </div>
        <div className={styles.listMeta}><span role="status">Найдено: <strong>{filtered.length}</strong> из {applications.length}</span><span>В Excel попадут все найденные заявки</span></div>
        {notice && <p className={notice.error ? styles.error : styles.notice} role={notice.error ? "alert" : "status"}>{notice.text}</p>}
        {filtered.length === 0 ? <div className={styles.emptyState}><strong>{applications.length ? "По этим условиям заявок нет" : "Заявок пока нет"}</strong><p>{applications.length ? "Измените поиск или сбросьте фильтры." : "Новые заявки появятся здесь после обновления страницы."}</p></div> : (
          <div className={styles.tableWrapper} role="region" aria-label="Заявки команд — таблица с горизонтальной прокруткой" tabIndex={0}>
            <table className={styles.table}>
              <thead><tr><th scope="col">Дата заявки</th><th scope="col">Команда / тип</th><th scope="col">Категория</th><th scope="col">Год рождения</th><th scope="col">Год кубка</th><th scope="col">Контакт</th><th scope="col">Статус</th><th scope="col">Действия</th></tr></thead>
              <tbody>{visible.map((row) => <tr key={row.id}>
                <td><time dateTime={row.created_at} className={styles.date}>{formatApplicationDate(row.created_at)}</time></td>
                <td><strong>{row.team_name}</strong><span className={styles.subText}>{row.city} · {row.country}</span><span className={row.mode === "tournament" ? styles.typeTournament : styles.typeCustom}>{row.mode === "tournament" ? "Турнир" : "Свой вариант"}</span></td>
                <td>{row.gender === "boys" ? "Юноши" : "Девушки"}</td><td><strong>{row.birth_year}</strong></td>
                <td><strong className={styles.cupYear}>{cupYear(row)}</strong><details className={styles.details}><summary>Детали</summary><p>{row.mode === "tournament" ? row.tournament_title : "Пожелания по датам"}<br />{applicationPeriod(row)}</p>{row.comment && <p><b>Комментарий:</b><br />{row.comment}</p>}</details></td>
                <td><strong>{row.contact_name}</strong><a className={styles.subText} href={`tel:${row.phone.replace(/[^\d+]/g, "")}`}>{row.phone}</a>{row.email && <a className={styles.subText} href={`mailto:${row.email}`}>{row.email}</a>}</td>
                <td><span className={styles.status}>{statusLabels[row.status] ?? row.status}</span></td>
                <td><button className={styles.deleteButton} disabled={deleting} onClick={() => { setSelected(row); setDeleteError(""); }} aria-label={`Удалить заявку команды ${row.team_name}`}>Удалить</button></td>
              </tr>)}</tbody>
            </table>
          </div>
        )}
        {filtered.length > 0 && <nav className={styles.pagination} aria-label="Страницы заявок">
          <span>{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} из {filtered.length}</span>
          <div><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>← Назад</button><span>{currentPage} / {pages}</span><button disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>Далее →</button></div>
        </nav>}
      </section>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="delete-title" aria-describedby="delete-description" onCancel={(event) => { if (deleting) event.preventDefault(); }} onClose={() => { setSelected(null); setDeleteError(""); }}>
        <p className={styles.sectionEyebrow}>УДАЛЕНИЕ ЗАЯВКИ</p>
        <h2 id="delete-title">Удалить заявку?</h2>
        <p className={styles.deleteTeam}>{selected?.team_name}</p>
        <p>{selected?.city} · {selected?.birth_year} г. р. · Кубок {selected ? cupYear(selected) : ""}</p>
        <p id="delete-description">Заявка и её контактные данные будут удалены без возможности восстановления.</p>
        {deleteError && <p role="alert" className={styles.error}>{deleteError}</p>}
        <div className={styles.dialogActions}><button ref={cancelButton} className={styles.resetButton} disabled={deleting} onClick={closeDialog}>Отмена</button><button className={styles.confirmDelete} disabled={deleting} onClick={confirmDelete}>{deleting ? "Удаляем…" : "Да, удалить заявку"}</button></div>
      </dialog>
    </>
  );
}

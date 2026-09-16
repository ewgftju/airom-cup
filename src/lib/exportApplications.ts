import ExcelJS from "exceljs";
import { applicationPeriod, cupYear, formatApplicationDate, statusLabels, type ApplicationRow } from "./adminApplications";

export async function buildApplicationsWorkbook(rows: ApplicationRow[]) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "AIROM CUP";
  const sheet = workbook.addWorksheet("Заявки", { views: [{ state: "frozen", ySplit: 1 }] });
  sheet.columns = [
    ["ID", 38], ["Дата заявки (Атырау)", 23], ["Тип заявки", 18], ["Команда", 28],
    ["Страна", 22], ["Город", 22], ["Категория", 16], ["Год рождения", 17],
    ["Год проведения кубка", 24], ["Турнир", 24], ["Игровые дни / пожелания", 38],
    ["Контактное лицо", 28], ["Телефон", 23], ["Email", 34], ["Статус", 18], ["Комментарий", 55],
  ].map(([header, width]) => ({ header: String(header), width: Number(width) }));
  for (const row of rows) {
    // String cells preserve +, = and leading zeroes; never interpret user input as formulas.
    sheet.addRow([
      String(row.id), formatApplicationDate(row.created_at), row.mode === "tournament" ? "Турнир" : "Свой вариант",
      row.team_name, row.country, row.city, row.gender === "boys" ? "Юноши" : "Девушки", String(row.birth_year),
      cupYear(row), row.tournament_title ?? "Свой вариант", applicationPeriod(row), row.contact_name, row.phone,
      row.email, statusLabels[row.status] ?? row.status, row.comment ?? "",
    ]);
  }
  sheet.getRow(1).font = { bold: true, color: { argb: "FF071B34" } };
  sheet.getRow(1).height = 32;
  sheet.autoFilter = { from: "A1", to: `P${rows.length + 1}` };
  sheet.eachRow((row) => { row.alignment = { vertical: "top", wrapText: true }; });
  return workbook.xlsx.writeBuffer();
}

export async function downloadApplications(rows: ApplicationRow[]) {
  const buffer = await buildApplicationsWorkbook(rows);
  const blob = new Blob([new Uint8Array(buffer)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `AIROM_CUP_applications_${new Date().toISOString().slice(0, 10)}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

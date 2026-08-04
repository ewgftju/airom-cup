import type { Metadata } from "next";
import ResultsArchive from "@/components/results/ResultsArchive";

export const metadata: Metadata = {
  title: "Результаты турниров — AIROM CUP",
  description: "Архив результатов AIROM CUP: участники, все матчи, счёт и итоговые таблицы турниров.",
};

export default function ResultsPage() {
  return <ResultsArchive />;
}

import type { Metadata } from "next";
import RegulationsCatalog from "./RegulationsCatalog";

export const metadata: Metadata = {
  title: "Положения турниров — AIROM CUP",
  description: "Положения международных баскетбольных турниров AIROM CUP в Атырау. Выбор по дате и возрасту, полные тексты и подписанные оригиналы в PDF.",
};

export default function RegulationsPage() {
  return <RegulationsCatalog />;
}

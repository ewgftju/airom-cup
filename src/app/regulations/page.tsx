import type { Metadata } from "next";
import RegulationsReader from "./RegulationsReader";

export const metadata: Metadata = {
  title: "Положение турнира · 23–25 ноября 2026 — AIROM CUP",
  description: "Положение AIROM CUP в Атырау для юношей 2014 года рождения и младше. Допуск команд, правила, взносы и подписанный оригинал в PDF.",
};

export default function RegulationsPage() {
  return <RegulationsReader />;
}

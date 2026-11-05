import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogCopy, regulationEditions } from "@/data/regulationEditions";
import RegulationsReader from "../RegulationsReader";

type PageProps = { params: Promise<{ edition: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return regulationEditions.map(({ slug }) => ({ edition: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { edition } = await params;
  const tournament = regulationEditions.find(({ slug }) => slug === edition);
  if (!tournament) notFound();

  return {
    title: `Положение турнира · ${tournament.dates.ru} — AIROM CUP`,
    description: `${catalogCopy.ru.category(tournament.birthYear)}. AIROM CUP в Атырау. Допуск команд, правила, взносы и подписанный оригинал в PDF.`,
  };
}

export default async function RegulationPage({ params }: PageProps) {
  const { edition } = await params;
  const tournament = regulationEditions.find(({ slug }) => slug === edition);
  if (!tournament) notFound();
  return <RegulationsReader edition={tournament} />;
}

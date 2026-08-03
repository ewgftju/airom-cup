import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProtocolPage from "@/components/results/ProtocolPage";
import { pastResults } from "@/data/pastResults";

type ResultPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return pastResults.map((result) => ({ id: result.id }));
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = pastResults.find((item) => item.id === id);

  if (!result) return {};

  return {
    title: `${result.category.ru} — протокол AIROM CUP`,
    description: `Турнирный протокол ${result.event.ru}: ${result.category.ru}.`,
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;
  const result = pastResults.find((item) => item.id === id);

  if (!result) notFound();

  return <ProtocolPage result={result} />;
}

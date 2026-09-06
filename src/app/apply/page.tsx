import ApplyPageContent from "@/components/application/ApplyPageContent";
import { tournaments } from "@/data/tournaments";
import { redirect } from "next/navigation";

type ApplyPageProps = {
  searchParams: Promise<{ mode?: string | string[]; id?: string | string[] }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const params = await searchParams;
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const tournamentId = Array.isArray(params.id) ? params.id[0] : params.id;
  const selectedTournament = mode === "tournament"
    ? tournaments.find((tournament) => tournament.id === tournamentId && tournament.isActive)
    : undefined;

  if (mode === "tournament" && !selectedTournament) {
    redirect("/#calendar");
  }

  return <ApplyPageContent selectedTournament={selectedTournament} />;
}

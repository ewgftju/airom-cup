import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { ApplicationRow } from "@/lib/adminApplications";

const columns = "id,created_at,status,mode,tournament_title,tournament_id,team_name,country,city,gender,birth_year,preferred_year,preferred_periods,custom_dates,comment,contact_name,phone,email";

/** Page through PostgREST's row cap so filters and exports cover every application. */
export async function loadAdminApplications(): Promise<ApplicationRow[]> {
  const rows: ApplicationRow[] = [];
  const batchSize = 250;
  for (let offset = 0; ; offset += batchSize) {
    const { data, error } = await supabaseAdmin.from("applications")
      .select(columns).order("created_at", { ascending: false }).order("id", { ascending: false })
      .range(offset, offset + batchSize - 1);
    if (error) throw new Error("Could not load applications", { cause: error });
    const batch = (data ?? []) as ApplicationRow[];
    rows.push(...batch);
    if (batch.length < batchSize) return rows;
  }
}

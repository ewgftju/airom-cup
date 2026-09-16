import { createClient } from "@/lib/supabase/server";

/** Verify the live session for every admin read and mutation. */
export async function getAdminEmail(): Promise<string | null> {
  const allowed = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!allowed) return null;
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    const email = data.user?.email?.trim().toLowerCase();
    return !error && email === allowed ? email : null;
  } catch {
    return null;
  }
}

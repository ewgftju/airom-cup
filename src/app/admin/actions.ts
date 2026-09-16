"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAdminEmail } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { DeleteApplicationResult } from "@/lib/adminApplications";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function deleteApplication(id: string): Promise<DeleteApplicationResult> {
  if (!await getAdminEmail()) return { ok: false, message: "Сессия истекла или нет доступа. Войдите в админку заново." };
  if (typeof id !== "string" || !/^(?:[1-9]\d{0,19}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(id)) {
    return { ok: false, message: "Некорректная заявка. Обновите страницу." };
  }
  try {
    const { data, error } = await supabaseAdmin.from("applications").delete().eq("id", id).select("id").maybeSingle();
    if (error) return { ok: false, message: "Не удалось удалить заявку. Попробуйте ещё раз." };
    revalidatePath("/admin");
    return { ok: true, message: data ? "Заявка удалена." : "Заявка уже удалена. Список обновлён." };
  } catch {
    return { ok: false, message: "Нет связи с сервером. Обновите список, прежде чем повторить удаление." };
  }
}

"use server";

import { redirect } from "next/navigation";

import { createClient } from
  "@/lib/supabase/server";

export async function login(
  formData: FormData
) {
  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") ?? ""
  );

  if (!email || !password) {
    redirect(
      "/admin/login?error=empty"
    );
  }

  const supabase =
    await createClient();

  const { error } =
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      });

  if (error) {
    redirect(
      "/admin/login?error=invalid"
    );
  }

  const { data } =
    await supabase.auth.getClaims();

  const claims =
    data?.claims as
      | {
          email?: string;
        }
      | undefined;

  const authenticatedEmail =
    claims?.email
      ?.trim()
      .toLowerCase() ?? "";

  const adminEmail =
    process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase() ?? "";

  if (
    !authenticatedEmail ||
    authenticatedEmail !== adminEmail
  ) {
    await supabase.auth.signOut();

    redirect(
      "/admin/login?error=forbidden"
    );
  }

  redirect("/admin");
}
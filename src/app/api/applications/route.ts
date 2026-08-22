import { supabaseAdmin } from "@/lib/supabaseAdmin";

type ApplicationRequest = {
  mode: "tournament" | "custom";

  tournament: {
    id: string;
    title: string;
  } | null;

  team: {
    name: string;
    country: string;
    city: string;
    gender: "boys" | "girls";
    birthYear: string;
  };

  preferredTiming: {
    year: string;
    periods: string[];
    customDates: string;
  } | null;

  contact: {
    name: string;
    phone: string;
    email: string;
    comment: string;
  };

  consentAccepted: boolean;
};

type SupabaseError = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

function isTransientDnsError(
  error: SupabaseError | null
) {
  if (!error) {
    return false;
  }

  const description = [
    error.message,
    error.details,
    error.hint,
    error.code,
  ]
    .filter(Boolean)
    .join(" ");

  return /\b(?:ENOTFOUND|EAI_AGAIN)\b/i.test(
    description
  );
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as ApplicationRequest;

    /* ----------------------------- */
    /* ПРОВЕРКА РЕЖИМА */
    /* ----------------------------- */

    if (
      body.mode !== "tournament" &&
      body.mode !== "custom"
    ) {
      return Response.json(
        {
          error:
            "Некорректный режим заявки",
        },
        {
          status: 400,
        }
      );
    }

    /* ----------------------------- */
    /* ПРОВЕРКА КОМАНДЫ */
    /* ----------------------------- */

    if (
      !body.team?.name ||
      !body.team?.country ||
      !body.team?.city
    ) {
      return Response.json(
        {
          error:
            "Не заполнены данные команды",
        },
        {
          status: 400,
        }
      );
    }

    if (
      body.team.gender !== "boys" &&
      body.team.gender !== "girls"
    ) {
      return Response.json(
        {
          error:
            "Некорректная категория команды",
        },
        {
          status: 400,
        }
      );
    }

    /* ----------------------------- */
    /* ПРОВЕРКА КОНТАКТОВ */
    /* ----------------------------- */

    if (
      !body.contact?.name ||
      !body.contact?.phone ||
      !body.contact?.email
    ) {
      return Response.json(
        {
          error:
            "Не заполнены контактные данные",
        },
        {
          status: 400,
        }
      );
    }

    if (body.consentAccepted !== true) {
      return Response.json(
        {
          error:
            "Необходимо согласие на обработку данных",
        },
        {
          status: 400,
        }
      );
    }

    /* ----------------------------- */
    /* СОХРАНЕНИЕ */
    /* ----------------------------- */

    const applicationRecord = {
      mode: body.mode,

      tournament_id:
        body.tournament?.id ?? null,

      tournament_title:
        body.tournament?.title ?? null,

      team_name:
        body.team.name.trim(),

      country:
        body.team.country.trim(),

      city:
        body.team.city.trim(),

      gender:
        body.team.gender,

      birth_year:
        body.team.birthYear,

      preferred_year:
        body.preferredTiming?.year ??
        null,

      preferred_periods:
        body.preferredTiming?.periods ??
        [],

      custom_dates:
        body.preferredTiming
          ?.customDates || null,

      contact_name:
        body.contact.name.trim(),

      phone:
        body.contact.phone.trim(),

      email:
        body.contact.email
          .trim()
          .toLowerCase(),

      comment:
        body.contact.comment?.trim() ||
        null,

      consent_accepted:
        body.consentAccepted,
    };

    let insertResult =
      await supabaseAdmin
        .from("applications")
        .insert(applicationRecord)
        .select("id, created_at")
        .single();

    const initialInsertError =
      insertResult.error;

    if (
      initialInsertError &&
      isTransientDnsError(
        initialInsertError
      )
    ) {
      console.warn(
        "SUPABASE INSERT RETRY:",
        initialInsertError.message
      );

      await wait(500);

      insertResult =
        await supabaseAdmin
          .from("applications")
          .insert(applicationRecord)
          .select("id, created_at")
          .single();
    }

    const { data, error } =
      insertResult;

    if (error) {
      console.error(
        "SUPABASE INSERT ERROR:",
        error
      );

      const isTemporarilyUnavailable =
        isTransientDnsError(error);

      return Response.json(
        {
          error:
            isTemporarilyUnavailable
              ? "Сервис приёма заявок временно недоступен. Повторите отправку через минуту."
              : "Не удалось сохранить заявку",
        },
        {
          status:
            isTemporarilyUnavailable
              ? 503
              : 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        application: data,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "APPLICATION API ERROR:",
      error
    );

    return Response.json(
      {
        error:
          "Внутренняя ошибка сервера",
      },
      {
        status: 500,
      }
    );
  }
}

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

    const { data, error } =
      await supabaseAdmin
        .from("applications")
        .insert({
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
        })
        .select("id, created_at")
        .single();

    if (error) {
      console.error(
        "SUPABASE INSERT ERROR:",
        error
      );

      return Response.json(
        {
          error:
            "Не удалось сохранить заявку",
        },
        {
          status: 500,
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
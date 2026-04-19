import { t } from "elysia";

export const Model = {
  query: t.Object({
    id: t.String({
      description: "ID akun yang mau dicek",
      example: "471192087",
    }),
    zone: t.String({
      description: "Zone akun yang mau dicek",
      example: "2416",
    }),
  }),
  success: t.Partial(
    t.Object(
      {
        success: t.Literal(true, { description: "status" }),
        data: t.Partial(
          t.Object({
            game: t.String({ description: "game yang di-request" }),
            account: t.Partial(
              t.Object(
                {
                  id: t.String({ description: "ID akun" }),
                  zone: t.String({ description: "Zone akun" }),
                  ign: t.String({ description: "in-game name" }),
                },
                { description: "detail akun" },
              ),
            ),
          }),
        ),
      },
      {
        description: "akun yang dicari ketemu",
        example: {
          success: true,
          data: {
            game: "Mobile Legends: Bang Bang",
            account: {
              id: "471192087",
              zone: "2416",
              ign: "Sa2-3",
            },
          },
        },
      },
    ),
  ),
  badRequest: t.Partial(
    t.Object(
      {
        success: t.Literal(false, { description: "status" }),
        errors: t.Array(
          t.Partial(
            t.Object({
              path: t.String({ description: "tempat salahnye" }),
              message: t.String({ description: "pesan error singkat" }),
              summary: t.String({ description: "pesan error panjang lebar" }),
            }),
          ),
          { description: "detail error" },
        ),
      },
      {
        description: "salah format request",
        example: {
          success: false,
          errors: [
            {
              path: "/id",
              message: "Expected string",
              summary: "Expected property 'id' to be string but found: undefined",
            },
            {
              path: "/zone",
              message: "Expected string",
              summary: "Expected property 'zone' to be string but found: undefined",
            },
          ],
        },
      },
    ),
  ),
};

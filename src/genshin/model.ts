import { t } from "elysia";

import { Error } from "../utils/model.js";

export const Model = {
  query: t.Object({
    uid: t.String({ description: "uid akun yang mau dicari", example: "800029362" }),
  }),
  success: t.Partial(
    t.Object(
      {
        success: t.Literal(true, { description: "status" }),
        data: t.Partial(
          t.Object({
            game: t.String({ description: "game yang direquest" }),
            account: t.Partial(
              t.Object(
                {
                  uid: t.String({ description: "UID akun yang dicari" }),
                  server: t.String({ description: "Server akun" }),
                  ign: t.String({ description: "in-game name" }),
                },
                {
                  description: "detail akun",
                },
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
            game: "Genshin Impact",
            account: {
              uid: "800029362",
              server: "Asia",
              ign: "A***a",
            },
          },
        },
      },
    ),
  ),
  badRequest: Error.badRequest([
    {
      path: "/uid",
      message: "Expected string",
      summary: "Expected property 'uid' to be string but found: undefined",
    },
  ]),
};

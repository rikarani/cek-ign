import { t } from "elysia";

import { Model as BaseModel, Error } from "../utils/model.js";

export const Model = {
  query: BaseModel.query({
    uid: t.String({ description: "uid akun yang mau dicari", example: "800029362" }),
  }),
  success: BaseModel.success(
    {
      uid: t.String({ description: "UID akun yang dicari" }),
      server: t.String({ description: "Server akun" }),
    },
    {
      game: "Genshin Impact",
      account: {
        uid: "800029362",
        server: "Asia",
        ign: "A***a",
      },
    },
  ),
  badRequest: Error.badRequest([
    {
      path: "/uid",
      message: "Expected string",
      summary: "Expected property 'uid' to be string but found: undefined",
    },
  ]),
};

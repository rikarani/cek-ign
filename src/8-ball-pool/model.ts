import { t } from "elysia";

import { Error, Model as BaseModel } from "../utils/model.js";

export const Model = {
  query: BaseModel.query({
    id: t.String({ pattern: "^[0-9]+$", description: "ID akun yang mau dicek", example: "2180533717" }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun", example: "2180533717" }),
    },
    {
      game: "8 Ball Pool",
      account: {
        id: "2180533717",
        ign: "J**n S***c",
      },
    },
  ),
  badRequest: Error.badRequest([
    {
      path: "/id",
      message: "Expected string",
      summary: "Expected property 'id' to be string but found: undefined",
    },
  ]),
};

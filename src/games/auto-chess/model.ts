import { t } from "elysia";

import { Model as BaseModel, Error } from "../utils/model.js";

export const Model = {
  query: BaseModel.query({
    id: t.String({ pattern: "^[A-Z0-9]+$", description: "ID akun", example: "GTFWF1" }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun yang dicari" }),
    },
    {
      game: "Auto Chess",
      account: {
        id: "GTFWF1",
        ign: "Esther",
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

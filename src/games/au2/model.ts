import { t } from "elysia";

import { Model as BaseModel, Error } from "../../utils/model.js";

export const Model = {
  query: BaseModel.query({
    id: t.String({ pattern: "^[0-9]+$", description: "ID akun yang mau dicek", example: "662311" }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun yang dicari" }),
    },
    {
      game: "AU2",
      account: {
        id: "662311",
        ign: "Juan Bour",
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

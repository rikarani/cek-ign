import { t } from "elysia";

import { Model as BaseModel, Error } from "../../utils/model.js";

export const Model = {
  query: BaseModel.query({
    id: t.String({ pattern: "^[0-9]+$", description: "ID akun yang mau dicek", example: "123456789" }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun" }),
    },
    {
      game: "Captain Tsubasa: Dream Team",
      account: {
        id: "123456789",
        ign: "Florenz",
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

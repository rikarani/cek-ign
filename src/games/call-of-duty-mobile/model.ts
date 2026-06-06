import { t } from "elysia";

import { Model as BaseModel, Error } from "../../utils/model";

export const Model = {
  query: BaseModel.query({
    id: t.String({ pattern: "^[0-9]+$", description: "ID akun yang mau dicek", example: "10808316016143544796" }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun yang dicari" }),
    },
    {
      game: "Call of Duty Mobile",
      account: {
        id: "10808316016143544796",
        ign: "tanoniha",
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

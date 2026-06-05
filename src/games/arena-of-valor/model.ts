import { t } from "elysia";

import { Model as BaseModel, Error } from "../utils/model.js";

export const Model = {
  query: BaseModel.query({
    id: t.String({ pattern: "^[0-9]+$", description: "ID akun yang mau dicek", example: "888347346994333" }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun yang dicari" }),
    },
    {
      game: "Arena of Valor",
      account: {
        id: "888347346994333",
        ign: "BangRams",
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

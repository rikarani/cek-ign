import { t } from "elysia";

import { Model as BaseModel, Error } from "../utils/model.js";

export const Model = {
  query: BaseModel.query({
    id: t.String({ description: "ID akun", example: "3e031e" }),
    platform: t.UnionEnum(["ios", "android", "windows"], { default: "ios", description: "Platform" }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun yang dicari" }),
    },
    {
      game: "Asphalt 9: Legends",
      account: {
        id: "3e031e",
        ign: "3e031e",
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

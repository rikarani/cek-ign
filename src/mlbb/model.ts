import { t } from "elysia";

import { Model as BaseModel, Error } from "../utils/model.js";

export const Model = {
  query: BaseModel.query({
    id: t.String({ description: "ID akun yang mau dicek", example: "471192087" }),
    zone: t.String({ description: "Zone akun yang mau dicek", example: "2416" }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun" }),
      zone: t.String({ description: "Zone akun" }),
    },
    {
      game: "Mobile Legends: Bang Bang",
      account: {
        id: "471192087",
        zone: "2416",
        ign: "Sa2-3",
      },
    },
  ),
  badRequest: Error.badRequest([
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
  ]),
};

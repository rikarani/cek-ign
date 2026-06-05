import { t } from "elysia";

import { Model as BaseModel, Error } from "../../utils/model.js";
import { servers, type ServerName } from "./servers.js";

export const Model = {
  query: BaseModel.query({
    id: t.String({ pattern: "^[0-9]+$", description: "ID akun", example: "271394707" }),
    server: t.UnionEnum(Object.keys(servers) as [ServerName, ...ServerName[]], {
      description: "Server akun",
      default: "Washington",
    }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: "ID akun yang dicari" }),
      server: t.UnionEnum(Object.keys(servers) as [ServerName, ...ServerName[]], {
        description: "Server akun yang dicari",
      }),
    },
    {
      game: "Azur Lane",
      account: {
        id: "271394707",
        server: "Washington",
        ign: "Motsihpem",
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

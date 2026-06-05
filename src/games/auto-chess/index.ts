import { Elysia } from "elysia";

import { Model } from "./model.js";
import { AutoChess } from "./service.js";

import { Error } from "../../utils/model.js";

export default new Elysia().get("/auto-chess", ({ query: { id } }) => AutoChess.check({ id }), {
  query: Model.query,
  response: {
    200: Model.success,
    400: Model.badRequest,
    404: Error.notFound,
    503: Error.serverError,
  },
  error({ error, code, set }) {
    if (code === "VALIDATION") {
      set.status = "Bad Request";

      return {
        success: false,
        errors: error.all.map((e) => ({
          path: e.path,
          message: e.message,
          summary: e.summary,
        })),
      };
    }
  },
  detail: {
    summary: "Auto Chess",
    description:
      "game strategi berbasis catur di mana pemain bertarung dengan mengatur bidak di papan untuk mengalahkan lawan dalam pertempuran otomatis",
  },
});

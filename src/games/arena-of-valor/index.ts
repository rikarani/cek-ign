import { Elysia } from "elysia";

import { Model } from "./model.js";
import { ArenaOfValor } from "./service.js";

import { Error } from "../../utils/model.js";

export default new Elysia().get("/arena-of-valor", ({ query: { id } }) => ArenaOfValor.check({ id }), {
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
    summary: "Arena of Valor",
    description:
      "game MOBA mobile yang dikembangkan oleh TiMi Studios, di mana pemain bertarung dalam tim 5v5 untuk menghancurkan base lawan dengan strategi, kerja sama, dan pemilihan hero yang tepat",
  },
});

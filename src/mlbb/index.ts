import { Elysia } from "elysia";

import { Model } from "./model.js";
import { Mlbb } from "./service.js";
import { Error } from "../utils/model.js";

export default new Elysia().get("/mlbb", ({ query: { id, zone } }) => Mlbb.check({ id, zone }), {
  query: Model.query,
  response: {
    200: Model.success,
    400: Model.badRequest,
    404: Error.notFound,
    503: Error.serverError,
  },
  error({ code, error, set }) {
    if (code === "VALIDATION") {
      set.status = "Bad Request";

      return {
        success: false,
        errors: error.all
          .filter((error) => error.type === 54)
          .map((error) => {
            return {
              path: error.path,
              message: error.message,
              summary: error.summary,
            };
          }),
      };
    }
  },
  detail: {
    summary: "Mobile Legends: Bang-Bang",
    description:
      "game MOBA mobile yang dikembangkan oleh Moonton, di mana pemain bertarung dalam tim 5v5 untuk menghancurkan base lawan dengan strategi, kerja sama, dan pemilihan hero yang tepat",
  },
});

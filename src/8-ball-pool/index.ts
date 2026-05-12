import { Elysia } from "elysia";

import { Model } from "./model.js";
import { Error } from "../utils/model.js";
import { EightBallPool } from "./service.js";

export default new Elysia().get("/8-ball-pool", ({ query: { id } }) => EightBallPool.check({ id }), {
  query: Model.query,
  response: {
    200: Model.success,
    400: Model.badRequest,
    404: Error.notFound,
    503: Error.serverError,
  },
  error: ({ code, error, set }) => {
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
    summary: "8 Ball Pool",
    description:
      "game billiard online populer yang dikembangkan oleh Miniclip, di mana pemain bertanding secara real-time menggunakan aturan 8-ball klasik dengan mengandalkan akurasi dan strategi",
  },
});

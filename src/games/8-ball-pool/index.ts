import { Elysia } from "elysia";

import { Model } from "./model";
import { EightBallPool } from "./service";

import { Error } from "../../utils/model";

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
  },
});

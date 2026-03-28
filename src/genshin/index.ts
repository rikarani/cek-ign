import { Elysia } from "elysia";

import { Model } from "./model.js";
import { Genshin } from "./service.js";

export default new Elysia().get("/genshin", ({ query: { uid } }) => Genshin.check({ uid }), {
  query: Model.query(),
  response: {
    200: Model.success(),
    400: Model.badRequest(),
    404: Model.notFound(),
    422: Model.wrongUid(),
    503: Model.serverError(),
  },
  error({ code, error, set }) {
    if (code === "VALIDATION") {
      set.status = "Bad Request";

      return {
        success: false,
        errors: error.all
          .filter((e) => e.type === 54)
          .map((e) => {
            return {
              path: e.path,
              message: e.message,
              summary: e.summary,
            };
          }),
      };
    }
  },
  detail: {
    summary: "Genshin Impact",
    description: "game kikir dari hoyopers",
  },
});

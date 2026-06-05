import { Elysia } from "elysia";

import { Model } from "./model.js";
import { AU2 } from "./service.js";

import { Error } from "../../utils/model.js";

export default new Elysia().get("/au2", ({ query: { id } }) => AU2.check({ id }), {
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
    summary: "AU2",
    description:
      "game rhythm mobile yang menawarkan pengalaman menari dan bersosialisasi dengan pemain lain di dunia virtual penuh warna",
  },
});

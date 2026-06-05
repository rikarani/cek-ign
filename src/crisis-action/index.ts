import { Elysia } from "elysia";

import { Model } from "./model.js";
import { CrisisAction } from "./service.js";

import { Error } from "../utils/model.js";

export default new Elysia().get("/crisis-action", ({ query: { id } }) => CrisisAction.check({ id }), {
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
    summary: "Crisis Action",
    description:
      "game FPS mobile yang menghadirkan pertempuran taktis seru di berbagai medan perang dengan beragam mode permainan dan senjata yang dapat dikustomisasi",
  },
});

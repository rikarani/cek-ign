import { Elysia } from "elysia";

import { Model } from "./model";
import { CallOfDutyMobile } from "./service";

import { Error } from "../../utils/model";

export default new Elysia().get("/call-of-duty-mobile", ({ query: { id } }) => CallOfDutyMobile.check({ id }), {
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
    summary: "Call of Duty Mobile",
  },
});

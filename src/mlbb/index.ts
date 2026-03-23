import { Elysia } from "elysia";

import { model } from "./model";
import { Mlbb } from "./service";

export default new Elysia().get("/mlbb", ({ query: { id, zone } }) => Mlbb.check({ id, zone }), {
  query: model.query,
  response: {
    200: model.response.success,
    400: model.response.badRequest,
    404: model.response.notFound,
    503: model.response.serviceUnavailable,
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
    description: "game kikir dari munton",
  },
});

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
    description: "Game mobile bergenre multiplayer online battle arena yang dikembangkan dan diterbitkan oleh Moonton",
  },
});

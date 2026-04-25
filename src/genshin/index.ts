import { Elysia } from "elysia";

import { Model } from "./model.js";
import { Genshin } from "./service.js";
import { Error } from "../utils/model.js";

export default new Elysia().get("/genshin", ({ query: { uid } }) => Genshin.check({ uid }), {
  query: Model.query,
  response: {
    200: Model.success,
    400: Model.badRequest,
    404: Error.notFound,
    422: Error.invalidUid,
    503: Error.serverError,
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
    description:
      "game action RPG open-world yang dikembangkan oleh miHoYo, di mana pemain menjelajahi dunia Teyvat, menyelesaikan quest, dan bertarung menggunakan sistem elemen serta karakter yang beragam",
  },
});

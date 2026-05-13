import { Elysia } from "elysia";

import { Model } from "./model.js";
import { Asphalt9Legends } from "./service.js";

import { Error } from "../utils/model.js";

export default new Elysia().get("/asphalt-9-legends", ({ query }) => Asphalt9Legends.check(query), {
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
    summary: "Asphalt 9: Legends",
    description:
      "game balap mobile yang dikembangkan oleh Gameloft, di mana pemain mengendarai mobil-mobil ikonik dari merek ternama dunia dalam balapan aksi penuh kecepatan dan trik udara spektakuler",
  },
});

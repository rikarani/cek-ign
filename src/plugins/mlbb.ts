import { Elysia, t, StatusMap } from "elysia";

import { mlbb } from "@/handlers/mlbb";

export default new Elysia({ name: "mlbb" })
  .model({
    "mlbb.query": t.Object({
      id: t.String(),
      zone: t.String(),
    }),
    "mlbb.response": t.Object({
      success: t.Boolean(),
      code: t.Numeric(),
      data: t.Object({
        game: t.String(),
        account: t.Object({
          ign: t.String(),
          id: t.String(),
          zone: t.String(),
        }),
      }),
    }),
  })
  .get("/mlbb", ({ query: { id, zone } }) => mlbb({ id, zone }), {
    query: "mlbb.query",
    response: "mlbb.response",
    error({ code, error, set }) {
      if (code === "VALIDATION") {
        return {
          success: false,
          code: StatusMap["Unprocessable Content"],
          errors: error.all
            .filter((err) => {
              return "type" in err && err.type === 54;
            })
            .map((err) => {
              return {
                path: "path" in err && err.path,
                name: "message" in err && err.message,
                message: err.summary,
              };
            }),
        };
      }

      if (code === "UNKNOWN") {
        set.status = "Not Found";

        return {
          success: false,
          code: StatusMap["Not Found"],
          error: {
            name: error.name,
            message: error.message,
          },
        };
      }
    },
  });

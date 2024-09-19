import { Elysia, t } from "elysia";

import { mlbb } from "@/handlers/mlbb";

export default new Elysia({ name: "mlbb" })
  .model({
    "mlbb.query": t.Object({
      id: t.String(),
      zone: t.String(),
    }),
    "mlbb.response": t.Object({
      game: t.String(),
      account: t.Object({
        ign: t.String(),
        id: t.String(),
        zone: t.String(),
      }),
    }),
  })
  .get("/mlbb", ({ query: { id, zone } }) => mlbb({ id, zone }), {
    query: "mlbb.query",
    response: "mlbb.response",
    error({ code, error, set }) {
      if (code === "VALIDATION") {
        return {
          errors: error.all
            .filter((x) => {
              return "type" in x && x.type === 54;
            })
            .map((x) => {
              return {
                path: "path" in x && x.path,
                message: "message" in x && x.message,
                summary: x.summary,
              };
            }),
        };
      }

      if (code === "UNKNOWN") {
        set.status = "Not Found";

        return {
          error: {
            name: error.name,
            message: error.message,
          },
        };
      }
    },
  });

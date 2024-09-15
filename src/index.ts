import { Elysia } from "elysia";

import { mlbbModel } from "@/models/mlbb";
import { mlbb } from "@/handlers/mlbb";

const app = new Elysia()
  .use(mlbbModel)
  .get("/mlbb", ({ query: { id, zone } }) => mlbb({ id, zone }), {
    query: "mlbb.query",
    response: "mlbb.response",
    error({ error, code, set }) {
      set.headers["content-type"] = "application/json";

      if (code === "VALIDATION") {
        return {
          success: false,
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
          success: false,
          error: {
            name: error.name,
            message: error.message,
          },
        };
      }
    },
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

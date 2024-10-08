import { Elysia, t } from "elysia";

import { genshin } from "@/handlers/genshin";

export default new Elysia({ name: "genshin" })
  .model({
    "genshin.query": t.Object({
      uid: t.String(),
    }),
    "genshin.response": t.Object({
      game: t.String(),
      account: t.Object({
        ign: t.String(),
        uid: t.String(),
        server: t.String(),
      }),
    }),
  })
  .get("/genshin", ({ query: { uid } }) => genshin({ uid }), {
    query: "genshin.query",
    response: "genshin.response",
    error({ code, error, set }) {
      if (code === "VALIDATION") {
        return {
          errors: error.all
            .filter((err) => {
              return "type" in err && err.type === 54;
            })
            .map((err) => {
              return {
                path: "path" in err && err.path,
                message: "message" in err && err.message,
                summary: err.summary,
              };
            }),
        };
      }

      if (code === "UNKNOWN") {
        if (error.name === "Invalid UID") {
          set.status = "Bad Request";
        } else if (error.name === "Not Found") {
          set.status = "Not Found";
        }

        return {
          name: error.name,
          message: error.message,
        };
      }
    },
  });

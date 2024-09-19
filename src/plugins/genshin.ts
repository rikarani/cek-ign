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
        if (error.name === "Invalid UID") {
          set.status = "Unprocessable Content";
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

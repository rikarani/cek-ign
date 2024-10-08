import { Elysia, t } from "elysia";

export default new Elysia({ name: "HSR" })
  .model({
    "hsr.query": t.Object({
      uid: t.String(),
    }),
    "hsr.response": t.Object({
      game: t.String(),
      account: t.Object({
        ign: t.String(),
        uid: t.String(),
        server: t.String(),
      }),
    }),
  })
  .get("/hsr", ({ query: { uid } }) => {}, {
    query: "hsr.query",
    response: "hsr.response",
  });

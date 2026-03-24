import { Elysia } from "elysia";

import { model } from "./model.js";
import { Genshin } from "./service.js";

export default new Elysia().get("/genshin", ({ query: { uid } }) => Genshin.check({ uid }), {
  query: model.query,
  detail: {
    summary: "Genshin Impact",
    description: "game kikir dari hoyopers",
  },
});

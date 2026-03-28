import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";

import { config } from "./utils/config.js";

import mlbb from "./mlbb/index.js";
import genshin from "./genshin/index.js";

const app = new Elysia()
  .use(cors(config.cors))
  .use(openapi(config.openapi))
  .group("/api", (app) => app.use(mlbb).use(genshin))
  .get("/", ({ redirect }) => redirect("/openapi"));

if (process.env.NODE_ENV !== "production") {
  app.listen(config.port);
  console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
}

export default app;

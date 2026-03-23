import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";

import { config } from "@/utils/config";

import mlbb from "@/mlbb";

const app = new Elysia()
  .use(cors(config.cors))
  .use(openapi(config.openapi))
  .group("/api", (app) => app.use(mlbb))
  .get("/", ({ redirect }) => redirect("/openapi"));

if (process.env.NODE_ENV !== "production") {
  app.listen(config.port);
  console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
}

export default app;

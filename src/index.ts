import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";

import { config } from "./utils/config.js";

import eightBallPool from "./games/8-ball-pool/index.js";
import aov from "./games/arena-of-valor/index.js";
import au2 from "./games/au2/index.js";
import autoChess from "./games/auto-chess/index.js";
import azurLane from "./azur-lane/index.js";

const app = new Elysia()
  .use(cors(config.cors))
  .use(openapi(config.openapi))
  .group("/api", (app) => app.use(eightBallPool).use(aov).use(au2).use(autoChess).use(azurLane))
  .get("/", ({ redirect }) => redirect("/openapi"));

if (process.env.NODE_ENV !== "production") {
  app.listen(config.port);
  console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
}

export default app;

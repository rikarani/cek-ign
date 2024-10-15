import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

import { port, swaggerConfig, corsConfig } from "@/utils/config";
import { mlbb, genshin } from "@/plugins";

const app = new Elysia()
  .use(swagger(swaggerConfig))
  .use(cors(corsConfig))
  .use(mlbb)
  .use(genshin)
  .get("/spec", () => Bun.file("./src/openapi.yaml"))
  .listen(port);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

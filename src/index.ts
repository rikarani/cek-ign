import { Elysia } from "elysia";

import { mlbb, genshin } from "./plugins";

const app = new Elysia().use(mlbb).use(genshin).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

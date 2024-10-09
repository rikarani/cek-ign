import { Elysia } from "elysia";

import { mlbb, genshin } from "./plugins";

const port = process.env.PORT || 6969;
const app = new Elysia().use(mlbb).use(genshin).listen(port);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

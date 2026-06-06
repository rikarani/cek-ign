import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";

import { config } from "./utils/config";

import eightBallPool from "./games/8-ball-pool/index";
import aov from "./games/arena-of-valor/index";
import au2 from "./games/au2/index";
import autoChess from "./games/auto-chess/index";
import azurLane from "./games/azur-lane/index";
import callOfDutyMobile from "./games/call-of-duty-mobile/index";
import captainTsubasa from "./games/captain-tsubasa-dream-team/index";
import crisisAction from "./games/crisis-action";
import dragonCity from "./games/dragon-city";

const app = new Elysia()
  .use(cors(config.cors))
  .use(openapi(config.openapi))
  .group("/api", (app) =>
    app
      .use(eightBallPool)
      .use(aov)
      .use(au2)
      .use(autoChess)
      .use(azurLane)
      .use(callOfDutyMobile)
      .use(captainTsubasa)
      .use(crisisAction)
      .use(dragonCity),
  )
  .get("/", ({ redirect }) => redirect("/openapi"));

if (process.env.NODE_ENV !== "production") {
  app.listen(config.port);
  console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
}

export default app;

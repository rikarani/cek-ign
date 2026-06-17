import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';

import { config } from './utils/config';

import au2 from './games/au2';
import aov from './games/arena-of-valor';
import azurLane from './games/azur-lane';
import autoChess from './games/auto-chess';
import dragonCity from './games/dragon-city';
import dragonRaja from './games/dragon-raja';
import eightBallPool from './games/8-ball-pool';
import crisisAction from './games/crisis-action';
import callOfDutyMobile from './games/call-of-duty-mobile';
import captainTsubasa from './games/captain-tsubasa-dream-team';
import footballMaster2 from './games/football-master-2';
import freeFire from './games/free-fire';
import genshinImpact from './games/genshin-impact';

const app = new Elysia()
  .use(cors(config.cors))
  .use(openapi(config.openapi))
  .group('/api', (app) =>
    app
      .use(eightBallPool)
      .use(aov)
      .use(au2)
      .use(autoChess)
      .use(azurLane)
      .use(callOfDutyMobile)
      .use(captainTsubasa)
      .use(crisisAction)
      .use(dragonCity)
      .use(dragonRaja)
      .use(footballMaster2)
      .use(freeFire)
      .use(genshinImpact),
  )
  .get('/', ({ redirect }) => redirect('/openapi'));

if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port);
  console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
}

export default app;

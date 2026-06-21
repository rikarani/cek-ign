import { Elysia } from 'elysia';

import { cors } from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';

import { config } from './utils/config';

import aov from './games/arena-of-valor';
import azurLane from './games/azur-lane';
import callOfDutyMobile from './games/call-of-duty-mobile';
import freeFire from './games/free-fire';
import genshinImpact from './games/genshin-impact';
import honkaiImpact3 from './games/honkai-impact-3';
import honkaiStarRail from './games/honkai-star-rail';
import loveAndDeepspace from './games/love-and-deepspace';
import magicChessGoGo from './games/magic-chess-go-go';
import mobileLegends from './games/mobile-legends';
import onmyojiArena from './games/onmyoji-arena';
import stellaSora from './games/stella-sora';
import zenlessZoneZero from './games/zenless-zone-zero';

const app = new Elysia()
  .use(cors(config.cors))
  .use(openapi(config.openapi))
  .use(aov)
  .use(azurLane)
  .use(callOfDutyMobile)
  .use(freeFire)
  .use(genshinImpact)
  .use(honkaiImpact3)
  .use(honkaiStarRail)
  .use(loveAndDeepspace)
  .use(magicChessGoGo)
  .use(mobileLegends)
  .use(onmyojiArena)
  .use(stellaSora)
  .use(zenlessZoneZero)
  .get('/', ({ redirect }) => redirect('/openapi'));

if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port);
}

export default app;

import { t } from 'elysia';

import { type Server, servers } from './server';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    uid: t.String({
      pattern: '^[0-9]+$',
      description: 'UID akun yang mau dicek',
      example: '700001772',
    }),
  }),
  success: BaseModel.success(
    {
      uid: t.String({ description: 'UID akun yang dicari' }),
      server: t.UnionEnum(Object.keys(servers) as [Server, ...Server[]], { description: 'Server akun yang dicari' }),
    },
    {
      game: 'Genshin Impact',
      account: {
        uid: '700001772',
        server: 'Europe',
        ign: 'A*******r',
      },
    },
  ),
  badRequest: ResponseError.badRequest([
    {
      path: '/uid',
      message: 'Expected string',
      summary: "Expected property 'uid' to be string but found: undefined",
    },
  ]),
};

import { t } from 'elysia';

import { type Server, servers } from './server';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    uid: t.String({
      pattern: '^[0-9]+$',
      description: 'UID akun yang mau dicek',
      example: '802124509',
    }),
  }),
  success: BaseModel.success(
    {
      uid: t.String({ description: 'UID akun yang dicari' }),
      server: t.UnionEnum(Object.keys(servers) as [Server, ...Server[]], { description: 'Server akun yang dicari' }),
    },
    {
      game: 'Honkai: Star Rail',
      account: {
        uid: '802124509',
        server: 'Asia',
        ign: 'M*******y',
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

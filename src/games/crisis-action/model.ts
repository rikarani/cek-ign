import { t } from 'elysia';

import { type Servers, servers } from './server';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    id: t.String({
      pattern: '^[0-9]+$',
      description: 'ID akun yang mau dicek',
      example: '483395457',
    }),
    server: t.UnionEnum(Object.keys(servers) as [Servers, ...Servers[]], {
      description: 'Server akun yang mau dicek',
    }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: 'ID akun yang dicari' }),
      server: t.UnionEnum(Object.keys(servers) as [Servers, ...Servers[]], {
        description: 'Server akun yang dicari',
      }),
    },
    {
      game: 'Crisis Action',
      account: {
        id: '483395457',
        server: 'Alliance',
        ign: 'kontorru',
      },
    },
  ),
  badRequest: ResponseError.badRequest([
    {
      path: '/id',
      message: 'Expected string',
      summary: "Expected property 'id' to be string but found: undefined",
    },
  ]),
};

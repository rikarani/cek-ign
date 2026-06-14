import { t } from 'elysia';

import { type ServerName, servers } from './server';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    id: t.String({
      pattern: '^[0-9]+$',
      description: 'ID akun yang mau dicek',
      example: '271394707',
    }),
    server: t.UnionEnum(Object.keys(servers) as [ServerName, ...ServerName[]], {
      description: 'Server akun yang mau dicek',
      default: 'Washington',
    }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: 'ID akun yang dicari' }),
      server: t.UnionEnum(Object.keys(servers) as [ServerName, ...ServerName[]], {
        description: 'Server akun yang dicari',
      }),
    },
    {
      game: 'Azur Lane',
      account: {
        id: '271394707',
        server: 'Washington',
        ign: 'Motsihpem',
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

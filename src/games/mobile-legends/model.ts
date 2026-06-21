import { t } from 'elysia';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    id: t.String({
      pattern: '^[0-9]+$',
      description: 'ID akun yang mau dicek',
      example: '1625684102',
    }),
    zone: t.String({
      pattern: '^[0-9]+$',
      description: 'Zone akun yang mau dicek',
      example: '18139',
    }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: 'ID akun yang dicari' }),
      zone: t.String({ description: 'Zone akun yang dicari' }),
    },
    {
      game: 'Mobile Legends: Bang Bang',
      account: {
        id: '1625684102',
        zone: '18139',
        ign: 'erika already yours',
      },
    },
  ),
  badRequest: ResponseError.badRequest([
    {
      path: '/id',
      message: 'Expected string',
      summary: "Expected property 'id' to be string but found: undefined",
    },
    {
      path: '/zone',
      message: 'Expected string',
      summary: "Expected property 'zone' to be string but found: undefined",
    },
  ]),
};

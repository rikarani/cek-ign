import { t } from 'elysia';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    id: t.String({
      pattern: '^[0-9]+$',
      description: 'ID akun yang mau dicek',
      example: '30794',
    }),
    zone: t.String({
      pattern: '^[0-9]+$',
      description: 'Zone akun yang mau dicek',
      example: '1001',
    }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: 'ID akun yang dicari' }),
      zone: t.String({ description: 'Zone akun yang dicari' }),
    },
    {
      game: 'Magic Chess: Go Go',
      account: {
        id: '30794',
        zone: '1001',
        ign: 'Ruth.Emily@0',
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

import { t } from 'elysia';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    id: t.String({ pattern: '^[0-9]+$', description: 'ID akun yang mau dicek', example: '116502997' }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: 'ID akun yang dicari' }),
    },
    {
      game: 'Free Fire',
      account: {
        id: '116502997',
        ign: 'jhonidamn361',
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

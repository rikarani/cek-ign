import { t } from 'elysia';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    id: t.String({
      pattern: '^[0-9]+$',
      description: 'ID akun yang mau dicek',
      example: '81001445172',
    }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: 'ID akun yang dicari' }),
    },
    {
      game: 'Love and Deepspace',
      account: {
        id: '81001445172',
        ign: 'HestiaLuna',
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

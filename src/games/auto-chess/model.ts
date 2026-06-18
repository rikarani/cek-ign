import { t } from 'elysia';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    id: t.String({
      pattern: '^[A-Z0-9]+$',
      description: 'ID akun yang mau dicek',
      example: 'GTFWF1',
    }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: 'ID akun yang dicari' }),
    },
    {
      game: 'Auto Chess',
      account: {
        id: 'GTFWF1',
        ign: 'Esther',
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

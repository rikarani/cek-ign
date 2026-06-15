import { t } from 'elysia';

import { Model as BaseModel, ResponseError } from '../../utils/model.js';

export const Model = {
  query: BaseModel.query({
    id: t.String({
      pattern: '^SXM2_soccer2_prd_\\d+_[a-zA-Z0-9]+$',
      description: 'ID akun yang mau dicek',
      example: 'SXM2_soccer2_prd_296_ia8kvv',
    }),
  }),
  success: BaseModel.success(
    {
      id: t.String({ description: 'ID akun yang dicari' }),
    },
    {
      game: 'Football Master 2',
      account: {
        id: 'SXM2_soccer2_prd_296_ia8kvv',
        ign: 'YT GANTA GURKY',
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

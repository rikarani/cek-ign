import { t } from 'elysia';

import { Model as BaseModel, ResponseError } from '../../utils/model';

export const Model = {
  query: BaseModel.query({
    uid: t.String({
      pattern: '^[0-9]+$',
      description: 'UID akun yang mau dicek',
      example: '20309731',
    }),
  }),
  success: BaseModel.success(
    {
      uid: t.String({ description: 'UID akun yang dicari' }),
    },
    {
      game: 'Honkai Impact 3',
      account: {
        uid: '20309731',
        ign: 'K****i',
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

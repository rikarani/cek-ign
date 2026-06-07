import type { UnwrapSchema } from 'elysia';

import type { Model } from './model';

import type { Response } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { AccountNotFoundError } from '../../utils/errors';

export const EightBallPool = {
  async check({ id }: UnwrapSchema<typeof Model.query>): Promise<Response<UnwrapSchema<typeof Model.success>>> {
    const data = await Fetcher.codashop({
      vpp: { id: '205678', price: '140000', vp: '0' },
      user: { userId: id, zoneId: '' },
      voucherTypeName: 'EIGHT_BALL_POOL',
    });

    if (data.errorCode === '-100') {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          id,
          ign: decodeURIComponent(data.confirmationFields.username).replace(/\+/g, ' '),
        },
      },
    };
  },
};

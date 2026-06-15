import type { Model } from './model.js';

import type { Query, Success } from '../../types/helper.js';

import { Fetcher } from '../../utils/fetcher.js';
import { decodeIgn } from '../../utils/helper.js';
import { AccountNotFoundError } from '../../utils/errors.js';

export const FreeFire = {
  async check({ id }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop({
      vpp: { id: '28153', price: '1000000', vp: '0' },
      user: { userId: id, zoneId: '' },
      voucherTypeName: 'FREE_FIRE',
    });

    if (data.errorCode === '-100') {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: 'Free Fire',
        account: {
          id,
          ign: decodeIgn(data.confirmationFields.username),
        },
      },
    };
  },
};

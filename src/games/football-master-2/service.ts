import type { Model } from './model.js';

import type { Query, Success } from '../../types/helper.js';

import { Fetcher } from '../../utils/fetcher.js';
import { decodeIgn } from '../../utils/helper.js';
import { AccountNotFoundError } from '../../utils/errors.js';

export const FootballMaster2 = {
  async check({ id }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop({
      vpp: { id: '185403', price: '1000000', vp: '0' },
      user: { userId: id, zoneId: '' },
      voucherTypeName: 'FOOTBALL_MASTER',
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
          ign: decodeIgn(data.confirmationFields.username),
        },
      },
    };
  },
};

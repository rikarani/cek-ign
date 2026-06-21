import type { Model } from './model';

import type { Query, Success } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const OnmyojiArena = {
  async check({ id }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('id_ID', {
      vpp: { id: '46404', price: '15000', vp: '0' },
      user: { userId: id, zoneId: '' },
      voucherTypeName: 'ONMYOJI_ARENA',
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

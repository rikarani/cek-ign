import type { Model } from './model';

import type { Query, Success } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const HonkaiImpact3 = {
  async check({ uid }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('en_US', {
      vpp: { id: '48355', price: '81000', vp: '0' },
      user: { userId: uid, zoneId: '' },
      voucherTypeName: 'HONKAI_IMPACT',
    });

    if (data.errorCode === '-100') {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          uid,
          ign: decodeIgn(data.confirmationFields.username),
        },
      },
    };
  },
};

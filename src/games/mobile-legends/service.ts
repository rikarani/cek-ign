import type { Model } from './model';

import type { Query, Success } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const MobileLegends = {
  async check({ id, zone }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('id_ID', {
      vpp: { id: '27684', price: '527250', vp: '0' },
      user: { userId: id, zoneId: zone },
      voucherTypeName: 'MOBILE_LEGENDS',
    });

    if (data.errorCode === 1003) {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          id,
          zone,
          ign: decodeIgn(data.confirmationFields.username),
        },
      },
    };
  },
};

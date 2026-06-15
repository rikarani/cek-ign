import type { Model } from './model';

import type { Query, Success } from '../../types/helper';

import { servers } from './server';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const AzurLane = {
  async check({ id, server }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop({
      vpp: { id: '99716', price: '590000', vp: '0' },
      user: { userId: id, zoneId: `${servers[server]}` },
      voucherTypeName: 'AZUR_LANE',
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
          server,
          ign: decodeIgn(data.confirmationFields.username),
        },
      },
    };
  },
};

import type { UnwrapSchema } from 'elysia';

import type { Model } from './model';

import type { Response } from '../../types/helper';

import { servers } from './server';

import { Fetcher } from '../../utils/fetcher';
import { AccountNotFoundError } from '../../utils/errors';

export const CrisisAction = {
  async check({ id, server }: UnwrapSchema<typeof Model.query>): Promise<Response<UnwrapSchema<typeof Model.success>>> {
    const data = await Fetcher.codashop({
      vpp: { id: '3745', price: '300000', vp: '0' },
      user: { userId: id, zoneId: servers[server] },
      voucherTypeName: 'HEROGAMES',
    });

    if (data.errorCode === '-100' || data.errorCode === '-102') {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          id,
          server,
          ign: decodeURIComponent(data.confirmationFields.username).replace(/\+/g, ' '),
        },
      },
    };
  },
};

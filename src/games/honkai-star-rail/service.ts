import type { Model } from './model';
import type { Server } from './server';

import type { Query, Success } from '../../types/helper';

import { servers, getServer } from './server';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const HonkaiStarRail = {
  async check({ uid }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('id_ID', {
      vpp: { id: '855424', price: '79000', vp: '0' },
      user: { userId: uid, zoneId: getServer(uid) },
      voucherTypeName: 'HONKAI_STAR_RAIL',
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
          server: Object.keys(servers).find((x) => servers[x as Server] === data.confirmationFields.zoneId) as Server,
          ign: decodeIgn(data.confirmationFields.username),
        },
      },
    };
  },
};

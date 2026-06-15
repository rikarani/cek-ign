import type { Model } from './model';

import type { Query, Success } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const AU2 = {
  async check({ id }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.dancingIdol(id);

    if (data.msgCode === 2509) {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: 'AU2',
        account: {
          id,
          ign: decodeIgn(data.data.rolename),
        },
      },
    };
  },
};

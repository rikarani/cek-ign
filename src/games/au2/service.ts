import type { UnwrapSchema } from 'elysia';

import type { Model } from './model';

import type { Response } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { AccountNotFoundError } from '../../utils/errors';

export const AU2 = {
  async check({ id }: UnwrapSchema<typeof Model.query>): Promise<Response<UnwrapSchema<typeof Model.success>>> {
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
          ign: decodeURIComponent(data.data.rolename).replace(/\+/g, ' '),
        },
      },
    };
  },
};

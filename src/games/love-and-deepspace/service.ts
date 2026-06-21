import type { Model } from './model';

import type { Query, Success } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const LoveAndDeepspace = {
  async check({ id }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('id_ID', {
      vpp: { id: '1', price: '89000', vp: '0' },
      user: { userId: id, zoneId: '' },
      lvtId: '11684',
      voucherTypeName: 'INFOLD_GAMES-LOVE_AND_DEEPSPACE',
      dynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInNrdUlkXCI6XCIxXzQwMDBcIixcImV2ZW50UGFja2FnZVwiOlwiMFwiLFwiZGVub21JbWFnZVVybFwiOlwiXCIsXCJkZW5vbU5hbWVcIjpcIkF1cnVtIFBhc3MgKDMwIERheXMpXCIsXCJkZW5vbUNhdGVnb3J5TmFtZVwiOlwiXCIsXCJ0YWdzXCI6W1wiUE9QVUxBUlwiXSxcImNvdW50cnkyTmFtZVwiOlwiSURcIixcImx2dElkXCI6MTE2ODQsXCJkZWZhdWx0UHJpY2VcIjo4OTAwMC4wLFwiZGVmYXVsdEN1cnJlbmN5XCI6XCJJRFJcIixcImFkZGl0aW9uYWxJbmZvXCI6e1wiTG95YWx0eUN1cnJlbmN5RGV0YWlsXCI6XCJ7XFxcInByaWNpbmdTY2hlbWVcXFwiOlxcXCJwYWlkX2N1cnJlbmN5XFxcIixcXFwibG95YWx0eUVhcm5lZEFtb3VudFxcXCI6MC4wLFxcXCJsb3lhbHR5QnVybmVkQW1vdW50XFxcIjowLjB9XCJ9fSIsImlhdCI6MTc4MTk1NDk2MywiZXhwIjoxNzgyMjE0MTYzfQ.BzBSPq8A6XIdZ3a0GpYuybOjVKZu3uoTjg_iSNZ_zhw',
      pricePointDynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInBjSWRcIjoyMjcsXCJwY05hbWVcIjpcIkdPX1BBWVwiLFwicHJpY2VcIjo4OTAwMC4wLFwiY3VycmVuY3lcIjpcIklEUlwiLFwiYXBpUHJpY2VcIjo4OTAwMC4wLFwiYXBpUHJpY2VDdXJyZW5jeVwiOlwiSURSXCIsXCJkaXNjb3VudFByaWNlXCI6ODkwMDAuMCxcInByaWNlQmVmb3JlVGF4XCI6ODkwMDAuMCxcInRheEFtb3VudFwiOjAuMCxcInNrdUlkXCI6XCIxXzQwMDBcIixcImx2dElkXCI6MTE2ODQsXCJzcG9uc29yZWRQcm9tb0lkXCI6bnVsbH0iLCJpYXQiOjE3ODE5NTQ5NjMsImV4cCI6MTc4MjIxNDE2M30.ykaUIGF88-j5wCLgjfDaMNdMgZ_4GlwEnboqJYybhwM',
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

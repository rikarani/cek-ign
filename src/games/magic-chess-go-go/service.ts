import type { Model } from './model';

import type { Query, Success } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const MagicChess = {
  async check({ id, zone }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('id_ID', {
      vpp: { id: '1', price: '1582', vp: '0' },
      user: { userId: id, zoneId: zone },
      voucherTypeName: '106-MAGIC_CHESS',
      lvtId: '12777',
      dynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInNrdUlkXCI6XCJjb20ubW9vbnRvbi5kaWFtb25kX210X2lkXzVfbXRfaWQzcmRwYXltZW50XCIsXCJldmVudFBhY2thZ2VcIjpcIjBcIixcImRlbm9tSW1hZ2VVcmxcIjpcIlwiLFwiZGVub21OYW1lXCI6XCI1IERpYW1vbmRzXCIsXCJkZW5vbUNhdGVnb3J5TmFtZVwiOlwiXCIsXCJ0YWdzXCI6W10sXCJjb3VudHJ5Mk5hbWVcIjpcIklEXCIsXCJsdnRJZFwiOjEyNzc3LFwiZGVmYXVsdFByaWNlXCI6MC4wLFwiZGVmYXVsdEN1cnJlbmN5XCI6XCJcIixcImFkZGl0aW9uYWxJbmZvXCI6e1wiTG95YWx0eUN1cnJlbmN5RGV0YWlsXCI6XCJ7XFxcInByaWNpbmdTY2hlbWVcXFwiOlxcXCJwYWlkX2N1cnJlbmN5XFxcIixcXFwibG95YWx0eUVhcm5lZEFtb3VudFxcXCI6MC4wLFxcXCJsb3lhbHR5QnVybmVkQW1vdW50XFxcIjowLjB9XCJ9fSIsImlhdCI6MTc4MTk4NjExMywiZXhwIjoxNzgyMjQ1MzEzfQ.sVsf6D8sa2uz_MHVST12rDxPnP_4MopaBQi0NgJL6uM',
      pricePointDynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInBjSWRcIjoyMjcsXCJwY05hbWVcIjpcIkdPX1BBWVwiLFwicHJpY2VcIjoxNTgyLjAsXCJjdXJyZW5jeVwiOlwiSURSXCIsXCJhcGlQcmljZVwiOjE1MDAuMCxcImFwaVByaWNlQ3VycmVuY3lcIjpcIklEUlwiLFwiZGlzY291bnRQcmljZVwiOjE1ODIuMCxcInByaWNlQmVmb3JlVGF4XCI6MTU4Mi4wLFwidGF4QW1vdW50XCI6MC4wLFwic2t1SWRcIjpcImNvbS5tb29udG9uLmRpYW1vbmRfbXRfaWRfNV9tdF9pZDNyZHBheW1lbnRcIixcImx2dElkXCI6MTI3NzcsXCJzcG9uc29yZWRQcm9tb0lkXCI6bnVsbH0iLCJpYXQiOjE3ODE5ODYxMTMsImV4cCI6MTc4MjI0NTMxM30.hz4pNHgFbi35ucwROb2fwz45zjeCM594FtVj_LB_A8M',
    });

    if (data.errorCode === '-500') {
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

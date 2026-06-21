import type { Model } from './model';

import type { Query, Success } from '../../types/helper';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const StellaSora = {
  async check({ id }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('id_ID', {
      vpp: { id: '1', price: '16500', vp: '0' },
      user: { userId: id, zoneId: '' },
      voucherTypeName: '547-STELLA_SORA',
      lvtId: '15510',
      dynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInNrdUlkXCI6XCJnZW0udGllcjdcIixcImV2ZW50UGFja2FnZVwiOlwiMFwiLFwiZGVub21JbWFnZVVybFwiOlwiXCIsXCJkZW5vbU5hbWVcIjpcIiA3NSBTdGVsbGFuaXRlIEx1bWluYVwiLFwiZGVub21DYXRlZ29yeU5hbWVcIjpcIlwiLFwidGFnc1wiOltdLFwiY291bnRyeTJOYW1lXCI6XCJJRFwiLFwibHZ0SWRcIjoxNTUxMCxcImRlZmF1bHRQcmljZVwiOjE2NTAwLjAsXCJkZWZhdWx0Q3VycmVuY3lcIjpcIklEUlwiLFwiYWRkaXRpb25hbEluZm9cIjp7XCJMb3lhbHR5Q3VycmVuY3lEZXRhaWxcIjpcIntcXFwicHJpY2luZ1NjaGVtZVxcXCI6XFxcInBhaWRfY3VycmVuY3lcXFwiLFxcXCJsb3lhbHR5RWFybmVkQW1vdW50XFxcIjowLjAsXFxcImxveWFsdHlCdXJuZWRBbW91bnRcXFwiOjAuMH1cIn19IiwiaWF0IjoxNzgyMDMyNzAwLCJleHAiOjE3ODIyOTE5MDB9.2ll2SAVO-Wppan8OUK9oKYPdbAX-ZJ3pbJeeL1TZLus',
      pricePointDynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInBjSWRcIjoyMjcsXCJwY05hbWVcIjpcIkdPX1BBWVwiLFwicHJpY2VcIjoxNjUwMC4wLFwiY3VycmVuY3lcIjpcIklEUlwiLFwiYXBpUHJpY2VcIjoxNjUwMC4wLFwiYXBpUHJpY2VDdXJyZW5jeVwiOlwiSURSXCIsXCJkaXNjb3VudFByaWNlXCI6MTY1MDAuMCxcInByaWNlQmVmb3JlVGF4XCI6MTY1MDAuMCxcInRheEFtb3VudFwiOjAuMCxcInNrdUlkXCI6XCJnZW0udGllcjdcIixcImx2dElkXCI6MTU1MTAsXCJzcG9uc29yZWRQcm9tb0lkXCI6bnVsbH0iLCJpYXQiOjE3ODIwMzI3MDAsImV4cCI6MTc4MjI5MTkwMH0.J9RcgYrkhBBuJ48ShLXwxi68KKRKXwi4svwk-FmlZTI',
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

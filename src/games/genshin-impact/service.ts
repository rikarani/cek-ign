import type { Model } from './model';
import type { Server } from './server';

import type { Query, Success } from '../../types/helper';

import { servers, getServer } from './server';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const GenshinImpact = {
  async check({ uid }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('en_US', {
      vpp: { id: '1', price: '4.99', vp: '0' },
      user: { userId: uid, zoneId: getServer(uid) },
      voucherTypeName: 'GENSHIN_IMPACT',
      lvtId: '3965',
      dynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInNrdUlkXCI6XCJ5c19nbGJfYmxlc3NvZm1vb25fdGllcjVcIixcImV2ZW50UGFja2FnZVwiOlwiMFwiLFwiZGVub21JbWFnZVVybFwiOlwiXCIsXCJkZW5vbU5hbWVcIjpcIkJsZXNzaW5nIG9mIHRoZSBXZWxraW4gTW9vblwiLFwiZGVub21DYXRlZ29yeU5hbWVcIjpcIlwiLFwidGFnc1wiOltcIlBPUFVMQVJcIl0sXCJjb3VudHJ5Mk5hbWVcIjpcIlVTXCIsXCJsdnRJZFwiOjM5NjUsXCJkZWZhdWx0UHJpY2VcIjowLjAsXCJkZWZhdWx0Q3VycmVuY3lcIjpcIlwiLFwiYWRkaXRpb25hbEluZm9cIjp7XCJMb3lhbHR5Q3VycmVuY3lEZXRhaWxcIjpcIntcXFwicHJpY2luZ1NjaGVtZVxcXCI6XFxcInBhaWRfY3VycmVuY3lcXFwiLFxcXCJsb3lhbHR5RWFybmVkQW1vdW50XFxcIjowLjAsXFxcImxveWFsdHlCdXJuZWRBbW91bnRcXFwiOjAuMH1cIn19IiwiaWF0IjoxNzgxOTg1NTI1LCJleHAiOjE3ODIyNDQ3MjV9.dflT6S1B3X0hIs9NthHR7T1MUO1439RIxaNStiDNIxQ',
      pricePointDynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInBjSWRcIjoxMDA2LFwicGNOYW1lXCI6XCJDQVJEUEFZTUVOVFNcIixcInByaWNlXCI6NC45OSxcImN1cnJlbmN5XCI6XCJVU0RcIixcImFwaVByaWNlXCI6NC45OSxcImFwaVByaWNlQ3VycmVuY3lcIjpcIlVTRFwiLFwiZGlzY291bnRQcmljZVwiOjQuOTksXCJwcmljZUJlZm9yZVRheFwiOjQuOTksXCJ0YXhBbW91bnRcIjowLjAsXCJza3VJZFwiOlwieXNfZ2xiX2JsZXNzb2Ztb29uX3RpZXI1XCIsXCJsdnRJZFwiOjM5NjUsXCJzcG9uc29yZWRQcm9tb0lkXCI6bnVsbH0iLCJpYXQiOjE3ODE5ODU1MjUsImV4cCI6MTc4MjI0NDcyNX0.ouJ600RNhinUw307BGUs5bpUSU-FBQpPKJEnuQZSY5k',
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

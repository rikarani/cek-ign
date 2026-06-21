import type { Model } from './model';
import type { Server } from './server';

import type { Query, Success } from '../../types/helper';

import { servers, getServer } from './server';

import { Fetcher } from '../../utils/fetcher';
import { decodeIgn } from '../../utils/helper';
import { AccountNotFoundError } from '../../utils/errors';

export const ZenlessZoneZero = {
  async check({ uid }: Query<typeof Model.query>): Promise<Success<typeof Model.success>> {
    const data = await Fetcher.codashop('id_ID', {
      vpp: { id: '1', price: '16000', vp: '0' },
      user: { userId: uid, zoneId: getServer(uid) },
      voucherTypeName: 'ZENLESS_ZONE_ZERO',
      lvtId: '12242',
      dynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInNrdUlkXCI6XCJuYXBnbGJ0b3B1cDYwcm1iNjAwXCIsXCJldmVudFBhY2thZ2VcIjpcIjBcIixcImRlbm9tSW1hZ2VVcmxcIjpcIlwiLFwiZGVub21OYW1lXCI6XCJNb25vY2hyb21lIMOXNjBcIixcImRlbm9tQ2F0ZWdvcnlOYW1lXCI6XCJcIixcInRhZ3NcIjpbXSxcImNvdW50cnkyTmFtZVwiOlwiSURcIixcImx2dElkXCI6MTIyNDIsXCJkZWZhdWx0UHJpY2VcIjowLjAsXCJkZWZhdWx0Q3VycmVuY3lcIjpcIlwiLFwiYWRkaXRpb25hbEluZm9cIjp7XCJMb3lhbHR5Q3VycmVuY3lEZXRhaWxcIjpcIntcXFwicHJpY2luZ1NjaGVtZVxcXCI6XFxcInBhaWRfY3VycmVuY3lcXFwiLFxcXCJsb3lhbHR5RWFybmVkQW1vdW50XFxcIjowLjAsXFxcImxveWFsdHlCdXJuZWRBbW91bnRcXFwiOjAuMH1cIn19IiwiaWF0IjoxNzgyMDM3NjI4LCJleHAiOjE3ODIyOTY4Mjh9.iB2Kz1stFCe0TTtKMa7s4VDC6ci2qikyj8pNbHiWkS8',
      pricePointDynamicSkuToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInBjSWRcIjoyMjcsXCJwY05hbWVcIjpcIkdPX1BBWVwiLFwicHJpY2VcIjoxNjAwMC4wLFwiY3VycmVuY3lcIjpcIklEUlwiLFwiYXBpUHJpY2VcIjoxNjAwMC4wLFwiYXBpUHJpY2VDdXJyZW5jeVwiOlwiSURSXCIsXCJkaXNjb3VudFByaWNlXCI6MTYwMDAuMCxcInByaWNlQmVmb3JlVGF4XCI6MTYwMDAuMCxcInRheEFtb3VudFwiOjAuMCxcInNrdUlkXCI6XCJuYXBnbGJ0b3B1cDYwcm1iNjAwXCIsXCJsdnRJZFwiOjEyMjQyLFwic3BvbnNvcmVkUHJvbW9JZFwiOm51bGx9IiwiaWF0IjoxNzgyMDM3NjI4LCJleHAiOjE3ODIyOTY4Mjh9.IZizK-iejU0eKXI9fHVeh0GFE3k90HvITc4bZgfu2-A',
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

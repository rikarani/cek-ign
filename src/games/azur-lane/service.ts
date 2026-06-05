import { UnwrapSchema } from "elysia";

import { Model } from "./model.js";
import { servers, type ServerName } from "./servers.js";

import { keys } from "../../utils/helper.js";
import { Fetcher } from "../../utils/fetcher.js";
import { AccountNotFoundError } from "../../utils/errors.js";

import { Response } from "../../types/helper.js";

export const AzurLane = {
  async check({ id, server }: UnwrapSchema<typeof Model.query>): Promise<Response<UnwrapSchema<typeof Model.success>>> {
    const data = await Fetcher.codashop({
      vpp: { id: "99716", price: "590000", vp: "0" },
      user: { userId: id, zoneId: `${servers[server]}` },
      voucherTypeName: "AZUR_LANE",
    });

    if (data.errorCode === "-100") {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          id,
          server: keys(servers).find((s) => servers[s] === data.user.zoneId) as ServerName,
          ign: decodeURIComponent(data.confirmationFields.username).replace(/\+/g, " "),
        },
      },
    };
  },
};

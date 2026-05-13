import { UnwrapSchema } from "elysia";

import { Model } from "./model.js";

import { Fetcher } from "../utils/fetcher.js";
import { AccountNotFoundError } from "../utils/errors.js";

import { Response } from "../types/helper.js";

type Success = Response<UnwrapSchema<typeof Model.success>>;

export const Asphalt9Legends = {
  async check({ id, platform }: UnwrapSchema<typeof Model.query>): Promise<Success> {
    const data = await Fetcher.codashop({
      vpp: { id: "114548", price: "479700", vp: "0" },
      user: { userId: id, zoneId: platform },
      voucherTypeName: "GAMELOFT_A9",
    });

    if (data.errorCode === "-100") {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: "Asphalt 9: Legends",
        account: {
          id,
          ign: decodeURIComponent(data.confirmationFields.username).replace(/\+/g, " "),
        },
      },
    };
  },
};

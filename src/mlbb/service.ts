import type { UnwrapSchema } from "elysia";

import type { Response } from "../types/helper.js";

import { Model } from "./model.js";
import { Fetcher } from "../utils/fetcher.js";
import { AccountNotFoundError } from "../utils/errors.js";

type Success = UnwrapSchema<typeof Model.success>;

export abstract class Mlbb {
  public static async check({ id, zone }: UnwrapSchema<typeof Model.query>): Promise<Response<Success>> {
    const data = await Fetcher.codashop({
      vpp: {
        id: "27684",
        price: "527250",
        vp: "0",
      },
      user: {
        userId: id,
        zoneId: zone,
      },
      voucherTypeName: "MOBILE_LEGENDS",
    });

    if (!data.success) {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          id,
          zone,
          ign: decodeURIComponent(data.confirmationFields.username).replace(/\+/g, " "),
        },
      },
    };
  }
}

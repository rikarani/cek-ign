import { UnwrapSchema } from "elysia";

import { Model } from "./model.js";

import { Fetcher } from "../../utils/fetcher.js";
import { AccountNotFoundError } from "../../utils/errors.js";

import { Response } from "../../types/helper.js";

export const CaptainTsubasa = {
  async check({ id }: UnwrapSchema<typeof Model.query>): Promise<Response<UnwrapSchema<typeof Model.success>>> {
    const data = await Fetcher.codashop({
      vpp: { id: "352113", price: "1099000", vp: "0" },
      user: { userId: id, zoneId: "" },
      voucherTypeName: "CAPTAIN_TSUBASA",
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
          ign: data.confirmationFields.username,
        },
      },
    };
  },
};

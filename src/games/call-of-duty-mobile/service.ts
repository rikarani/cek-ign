import { UnwrapSchema } from "elysia";

import { Model } from "./model.js";

import { Fetcher } from "../../utils/fetcher.js";
import { AccountNotFoundError } from "../../utils/errors.js";

import { Response } from "../../types/helper.js";

export const CallOfDutyMobile = {
  async check({ id }: UnwrapSchema<typeof Model.query>): Promise<Response<UnwrapSchema<typeof Model.success>>> {
    const data = await Fetcher.codashop({
      vpp: { id: "46251", price: "2000000", vp: "0" },
      user: { userId: id, zoneId: "" },
      voucherTypeName: "CALL_OF_DUTY",
    });

    if (data.errorCode === 12) {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          id,
          ign: data.confirmationFields.roles[0].role,
        },
      },
    };
  },
};

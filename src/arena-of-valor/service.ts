import { UnwrapSchema } from "elysia";

import { Model } from "./model.js";

import { Fetcher } from "../utils/fetcher.js";
import { AccountNotFoundError } from "../utils/errors.js";

import { Response } from "../types/helper.js";

export const ArenaOfValor = {
  async check({ id }: UnwrapSchema<typeof Model.query>): Promise<Response<UnwrapSchema<typeof Model.success>>> {
    const data = await Fetcher.codashop({
      vpp: { id: "8003", price: "300000", vp: "0" },
      user: { userId: `${id}`, zoneId: "" },
      voucherTypeName: "AOV",
    });

    if (data.errorCode === 12) {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: "Arena of Valor",
        account: {
          id,
          ign: decodeURIComponent(data.confirmationFields.roles[0].role).replace(/\+/g, " "),
        },
      },
    };
  },
};

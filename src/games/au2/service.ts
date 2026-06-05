import { UnwrapSchema } from "elysia";

import { Model } from "./model.js";

import { Fetcher } from "../utils/fetcher.js";
import { AccountNotFoundError } from "../utils/errors.js";

import { Response } from "../types/helper.js";

export const AU2 = {
  async check({ id }: UnwrapSchema<typeof Model.query>): Promise<Response<UnwrapSchema<typeof Model.success>>> {
    const data = await Fetcher.dancingIdol(id);

    if (data.msgCode === 2509) {
      throw new AccountNotFoundError();
    }

    return {
      success: true,
      data: {
        game: "AU2",
        account: {
          id,
          ign: decodeURIComponent(data.data.rolename).replace(/\+/g, " "),
        },
      },
    };
  },
};

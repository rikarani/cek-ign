import { UnwrapSchema } from "elysia";

import { Model } from "./model";

import { Fetcher } from "../../utils/fetcher";
import { AccountNotFoundError } from "../../utils/errors";

import { Response } from "../../types/helper";

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

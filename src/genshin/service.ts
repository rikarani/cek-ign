import type { UnwrapSchema } from "elysia";
import type { Response } from "../types/helper.js";

import { Model } from "./model.js";
import { Fetcher } from "../utils/fetcher.js";
import { AccountNotFoundError, InvalidUidError, AccountRegionError } from "../utils/errors.js";

type Success = UnwrapSchema<typeof Model.success>;

export abstract class Genshin {
  public static async check({ uid }: UnwrapSchema<typeof Model.query>): Promise<Response<Success>> {
    const data = await Fetcher.codashop({
      vpp: { id: "116054", price: "16500", vp: "0" },
      user: { userId: uid, zoneId: this.getServerByUid(uid) },
      voucherTypeName: "GENSHIN_IMPACT",
    });

    if (data.errorCode === "-100") {
      throw new AccountNotFoundError();
    }

    if (data.errorCode === "-200") {
      throw new AccountRegionError();
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          uid,
          server: this.getServerByCode(data.confirmationFields.zoneId),
          ign: decodeURIComponent(data.confirmationFields.username).replace("/\+/g", " "),
        },
      },
    };
  }

  private static server = {
    America: "os_usa",
    Europe: "os_euro",
    Asia: "os_asia",
    Other: "os_ok",
  } as const;

  private static getServerByUid(uid: string) {
    if (uid.startsWith("6")) {
      return this.server.America;
    }

    if (uid.startsWith("7")) {
      return this.server.Europe;
    }

    if (uid.startsWith("8") || uid.startsWith("18")) {
      return this.server.Asia;
    }

    if (uid.startsWith("9")) {
      return this.server.Other;
    }

    throw new InvalidUidError();
  }

  private static getServerByCode(server: string): string {
    return Object.keys(this.server).find((x) => this.server[x as keyof typeof this.server] === server) as string;
  }
}

import type { UnwrapSchema } from "elysia";
import type { Response } from "../types/helper.js";
import type { CodashopResponse } from "../types/shared.js";

import { model } from "./model.js";
import { ExternalServerError, AccountNotFoundError, InvalidAccountError } from "../utils/errors.js";

type Success = UnwrapSchema<typeof model.response.success>;

export abstract class Genshin {
  private static server = {
    America: "os_usa",
    Europe: "os_euro",
    Asia: "os_asia",
    Other: "os_ok",
  } as const;

  public static async check({ uid }: UnwrapSchema<typeof model.query>): Promise<Response<Success>> {
    const hit = await fetch("https://order-sg.codashop.com/initPayment.action", {
      method: "POST",
      headers: {
        Origin: "https://www.codashop.com",
        Referer: "https://www.codashop.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
      },
      body: new URLSearchParams({
        "voucherPricePoint.id": "116054",
        "voucherPricePoint.price": "16500",
        "voucherPricePoint.variablePrice": "0",
        "user.userId": uid,
        "user.zoneId": this.getServerByUid(uid),
        voucherTypeName: "GENSHIN_IMPACT",
        shopLang: "id_ID",
      }),
    });

    if (!hit.ok) {
      throw new ExternalServerError("Request ke API Codashop Gagal");
    }

    const data: Pick<CodashopResponse, "is_publisher_validate_error" | "errorCode" | "confirmationFields"> =
      await hit.json();

    if (data.is_publisher_validate_error) {
      if (data.errorCode === "-100") {
        throw new AccountNotFoundError("Akun Tidak Ditemukan");
      }

      if (data.errorCode === "-200") {
        throw new ExternalServerError("Ada Kesalahan di API Codashop");
      }
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          uid,
          server: this.getKeyByValue(data.confirmationFields.zoneId),
          ign: decodeURIComponent(data.confirmationFields.username),
        },
      },
    };
  }

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

    throw new InvalidAccountError("Masukkan UID yang bener");
  }

  private static getKeyByValue(server: string): string {
    return Object.keys(this.server).find((x) => this.server[x as keyof typeof this.server] === server)!;
  }
}

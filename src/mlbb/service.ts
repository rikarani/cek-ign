import type { UnwrapSchema } from "elysia";

import type { Response } from "../types/helper";
import type { CodashopResponse } from "../types/shared";

import { model } from "./model";
import { ExternalServerError, AccountNotFoundError } from "../utils/errors";

type Success = UnwrapSchema<typeof model.response.success>;

export abstract class Mlbb {
  public static async check({ id, zone }: UnwrapSchema<typeof model.query>): Promise<Response<Success>> {
    const hit = await fetch("https://order-sg.codashop.com/initPayment.action", {
      method: "POST",
      headers: {
        Origin: "https://www.codashop.com",
        Referer: "https://www.codashop.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
      },
      body: new URLSearchParams({
        "voucherPricePoint.id": "27684",
        "voucherPricePoint.price": "527250",
        "voucherPricePoint.variablePrice": "0",
        "user.userId": id,
        "user.zoneId": zone,
        voucherTypeName: "MOBILE_LEGENDS",
        shopLang: "id_ID",
      }),
    });

    if (!hit.ok) {
      throw new ExternalServerError("Layanan Tidak Tersedia");
    }

    const data: Pick<CodashopResponse, "success" | "confirmationFields"> = await hit.json();

    if (!data.success) {
      throw new AccountNotFoundError("Akun Tidak Ditemukan");
    }

    return {
      success: true,
      data: {
        game: data.confirmationFields.productName,
        account: {
          id,
          zone,
          ign: data.confirmationFields.username,
        },
      },
    };
  }
}

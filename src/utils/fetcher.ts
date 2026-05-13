import { CodashopResponse, DancingIdolResponse } from "../types/shared.js";
import { ExternalServerError } from "./errors.js";

type Codashop = {
  vpp: {
    id: string;
    price: string;
    vp: string;
  };
  user: {
    userId: string;
    zoneId: string;
  };
  voucherTypeName: string;
  shopLang?: string;
};

export const Fetcher = {
  async codashop({ vpp, user, voucherTypeName, shopLang = "id_ID" }: Codashop): Promise<CodashopResponse> {
    const hit = await fetch("https://order-sg.codashop.com/initPayment.action", {
      method: "POST",
      headers: {
        Origin: "https://www.codashop.com",
        Referer: "https://www.codashop.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Mobile Safari/537.36",
      },
      body: new URLSearchParams({
        "voucherPricePoint.id": vpp.id,
        "voucherPricePoint.price": vpp.price,
        "voucherPricePoint.variablePrice": vpp.vp,
        "user.userId": user.userId,
        "user.zoneId": user.zoneId,
        voucherTypeName,
        shopLang,
      }),
    });

    if (!hit.ok) {
      throw new ExternalServerError();
    }

    return await hit.json();
  },
  async dancingIdol(id: string): Promise<DancingIdolResponse> {
    const hit = await fetch(`http://dancingidol.uniuhk.com/api/role/info?roleId=${id}`, {
      method: "GET",
      headers: {
        Host: "dancingidol.uniuhk.com",
        Referer: "http://dancingidol.uniuhk.com/payment",
      },
    });

    if (!hit.ok) {
      throw new ExternalServerError();
    }

    return await hit.json();
  },
};

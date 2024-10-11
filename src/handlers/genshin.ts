import { StatusMap } from "elysia";
import { NotFound } from "@/errors/NotFound";
import { getServer } from "@/utils/getServer";

import { Genshin } from "@/types/Server";
import { type Response } from "@/types/Response";

type Query = {
  uid: string;
};

export async function genshin({ uid }: Query) {
  const server = getServer({ uid });

  const hit = await fetch("https://order-sg.codashop.com/initPayment.action", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://www.codashop.com",
      Referer: "https://www.codashop.com/",
    },
    body: new URLSearchParams({
      "voucherPricePoint.id": "116054",
      "voucherPricePoint.price": "16500",
      "voucherPricePoint.variablePrice": "0",
      "user.userId": uid,
      "user.zoneId": server,
      voucherTypeName: "GENSHIN_IMPACT",
      shopLang: "id_ID",
    }),
  });

  const response: Pick<Response, "errorCode" | "confirmationFields" | "user"> = await hit.json();

  if (response.errorCode === "-100") {
    throw new NotFound("IGN Tidak Ditemukan");
  }

  return {
    success: true,
    code: StatusMap.OK,
    data: {
      game: response.confirmationFields.productName,
      account: {
        ign: response.confirmationFields.username,
        uid: response.user.userId,
        server: render(response.user.zoneId),
      },
    },
  };
}

function render(code: string): string {
  return Object.keys(Genshin).find((x) => Genshin[x as keyof typeof Genshin] === code) as string;
}

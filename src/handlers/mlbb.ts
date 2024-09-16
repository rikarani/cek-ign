import { type Response } from "@/types/Response";

import { NotFound } from "@/errors/NotFound";

type Query = {
  id: string;
  zone: string;
};

function formatResponse(text: string) {
  return text.replace(/\+/g, " ");
}

export async function mlbb({ id, zone }: Query) {
  const hit = await fetch("https://order-sg.codashop.com/initPayment.action", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://www.codashop.com",
      Referer: "https://www.codashop.com/",
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

  const response: Pick<Response, "success" | "confirmationFields" | "user"> = await hit.json();

  if (!response.success) {
    throw new NotFound("IGN Tidak Ditemukan");
  }

  return {
    ign: formatResponse(response.confirmationFields.username),
    id: response.user.userId,
    zone: response.user.zoneId,
  };
}

type Params = {
  uid: string;
};

export async function hsr({ uid }: Params) {
  const server = "";

  const hit = await fetch("https://order-sg.codashop.com/initPayment.action", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://www.codashop.com",
      Referer: "https://www.codashop.com/",
    },
    body: new URLSearchParams({
      "voucherPricePoint.id": "855316",
      "voucherPricePoint.price": "16000",
      "voucherPricePoint.variablePrice": "0",
      "user.userId": uid,
      "user.zoneId": "1", // ganti sesuai server
      voucherTypeName: "HONKAI_STAR_RAIL",
      shopLang: "id_ID",
    }),
  });

  const response = await hit.json();
}

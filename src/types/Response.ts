export type Response = {
  initCallBackendAPI: boolean;
  orderId: string;
  errorCode: string;
  confirmation: boolean;
  isUserConfirmation: boolean;
  errorMsg: string;
  paymentChannel: string;
  result: string;
  channelPrice: string;
  confirmationFields: {
    zipCode: string;
    country: string;
    totalPrice: string;
    create_role_country: string;
    userIdAndZoneId: string;
    userId: string;
    productName: string;
    paymentChannel: string;
    this_login_country: string;
    channelPrice: string;
    price: string;
    zoneId: string;
    verifiedMsisdn: string;
    priceBeforeTax: string;
    taxAmount: string;
    email: string;
    inputRoleId: string;
    username: string;
  };
  success: boolean;
  denom: string;
  user: {
    userId: string;
    zoneId: string;
  };
  isThirdPartyMerchant: boolean;
  txnId: string;
};

export type CodashopResponse = {
  initCallBackendAPI: boolean;
  orderId: string;
  is_publisher_validate_error: boolean;
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
    userIdAndZoneId: string;
    userId: string;
    productName: string;
    paymentChannel: string;
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

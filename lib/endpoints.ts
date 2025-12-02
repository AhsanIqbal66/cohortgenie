interface Endpoints {
  [key: string]: string;
}

const ENDPOINTS: Endpoints = {
  LOGIN: "users/login",
  SIGNUP: "users/register",
  GETLOGIN: "users/current-user",
  FORGOTPASSWORD: "users/forgot-password",
  RESETPASSWORD: "users/reset-password",
  TWOFA: "users/verify-otp",
  // COHORTDATA
  COHORTDATA: "revenue/financial-report",
  STEP2INTEG: "/quickbooks/callback",
  //
  INVOICE: "/quickbooks/invoice",
  CUSTOMER: "/quickbooks/customer",
  SALESRECEIPT: "/quickbooks/salesreceipt",
  REFUNDRECEIPT: "/quickbooks/refundreceipt",
  CREDITMEMO: "/quickbooks/creditmemo",
  //
  COMPARISON: "/revenue/compare-periods",
};

export { ENDPOINTS };

import { PurchaseRequest, purchaseRules } from "./purchase.js";
import { PreauthRequest, preauthRules } from "./preauth.js";

export type TransactionRequest = PurchaseRequest | PreauthRequest;
export type Rules = typeof preauthRules | typeof purchaseRules;

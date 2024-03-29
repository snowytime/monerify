import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "amount", "pan", "expdate", "cryptType"],
    optional: [
        "statusCheck",
        "custId",
        "dynamicDescriptor",
        "walletIndicator",
        "avsInfo",
        "cvdInfo",
        "cofInfo",
        "custInfo",
        "recurringCycle",
    ],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.Purchase } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.Purchase } & BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

export { Request as PurchaseRequest, Response as PurchaseResponse, rules as purchaseRules };

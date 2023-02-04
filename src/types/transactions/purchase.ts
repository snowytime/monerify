import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

/* ultimately it is this map that controls exactly what is required and what is optional */
export const purchaseRules = {
    required: ["orderId", "amount", "pan", "expdate", "cryptType"],
    optional: [
        "statusCheck",
        "custId",
        "dynamicDescriptor",
        "walletIndicator",
        "avs",
        "cvdInfo",
        "cof",
        "customer",
        "recurringCycle",
    ],
} as const;

/* formulating the purchase properties using the map above and the global properties */
type RequiredProperties = {
    [K in (typeof purchaseRules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof purchaseRules)["optional"][number]]?: GlobalProperties[K];
};

// this is the final type that we will use when constructing the purchase object and will be intersected with the other transactions
export type PurchaseRequest = { type: Transaction.Purchase } & RequiredProperties &
    OptionalProperties;

/* we want to construct the purchase response from the global response interface */
export type PurchaseResponse = BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

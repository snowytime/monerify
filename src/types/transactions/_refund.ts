import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

export const preauthRules = {
    required: ["orderId", "amount", "pan", "cryptType", "expdate"],
    optional: [
        "dynamicDescriptor",
        "statusCheck",
        "custId",
        "avs",
        "cvdInfo",
        "cof",
        "walletIndicator",
        "customer",
    ],
} as const;

/* formulating the purchase properties using the map above and the global properties */
type RequiredProperties = {
    [K in (typeof preauthRules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof preauthRules)["optional"][number]]?: GlobalProperties[K];
};

// this is the final type that we will use when constructing the purchase object and will be intersected with the other transactions
export type PreauthRequest = { type: Transaction.PreAuth } & RequiredProperties &
    OptionalProperties;

/* we want to construct the purchase response from the global response interface */
export type PreauthResponse = BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

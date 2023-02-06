import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "dataKey", "expdate", "cryptType"],
    optional: [
        "avsInfo",
        "cofInfo",
        "cvdInfo",
        "custInfo",
        "statusCheck",
        "custId",
        "dynamicDescriptor",
        "recurringCycle",
    ],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultPurchase } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultPurchase } & BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

export {
    rules as vaultPurchaseRules,
    Request as VaultPurchaseRequest,
    Response as VaultPurchaseResponse,
};

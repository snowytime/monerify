import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "amount", "pan", "cryptType", "expdate"],
    optional: [
        "dynamicDescriptor",
        "statusCheck",
        "custId",
        "avsInfo",
        "cvdInfo",
        "cofInfo",
        "walletIndicator",
        "custInfo",
    ],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.PreAuth } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.PreAuth } & BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

export { Request as PreauthRequest, Response as PreauthResponse, rules as preauthRules };

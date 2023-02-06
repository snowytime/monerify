import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["dataKey", "orderId", "amount", "cryptType"],
    optional: [
        "dynamicDescriptor",
        "statusCheck",
        "custId",
        "avsInfo",
        "cvdInfo",
        "cofInfo",
        "custInfo",
    ],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultPreAuth } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultPreAuth } & BaseTransactionResponse &
    Partial<
        Pick<
            GlobalResponse,
            | "dataKey"
            | "resSuccess"
            | "paymentType"
            | "resCustId"
            | "resPhone"
            | "resEmail"
            | "resNote"
        >
    >;

export {
    rules as vaultPreauthRules,
    Request as VaultPreauthRequest,
    Response as VaultPreauthResponse,
};

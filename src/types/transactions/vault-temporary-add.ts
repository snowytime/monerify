import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["dataKey", "cryptType", "expdate"],
    optional: ["custId", "avsInfo", "cofInfo", "email", "phone", "note"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultSaveTemporaryToken } & RequiredProperties &
    OptionalProperties;

type Response = { type: Transaction.VaultSaveTemporaryToken } & BaseTransactionResponse &
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
    rules as vaultSaveTemporaryTokenRules,
    Request as VaultSaveTemporaryTokenRequest,
    Response as VaultSaveTemporaryTokenResponse,
};

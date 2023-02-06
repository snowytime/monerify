import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["pan", "expdate", "duration", "cryptType"],
    optional: [],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultTemporaryToken } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultTemporaryToken } & BaseTransactionResponse &
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
    rules as vaultTemporaryTokenRules,
    Request as VaultTemporaryTokenRequest,
    Response as VaultTemporaryTokenResponse,
};

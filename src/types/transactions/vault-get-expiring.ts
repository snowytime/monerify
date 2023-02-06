import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: [],
    optional: [],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultGetExpiring } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultGetExpiring } & BaseTransactionResponse &
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
    rules as vaultGetExpiringRules,
    Request as VaultGetExpiringRequest,
    Response as VaultGetExpiringResponse,
};

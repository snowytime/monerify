import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["dataKey"],
    optional: [],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultIsCorporate } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultIsCorporate } & BaseTransactionResponse &
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
    rules as vaultIsCorporateRules,
    Request as VaultIsCorporateRequest,
    Response as VaultIsCorporateResponse,
};

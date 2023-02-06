/*
Tokenize a previous transaction
*/

import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "txnNumber"],
    optional: ["custId", "dataKeyFormat", "email", "phone", "note", "avsInfo", "cofInfo"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultTokenize } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultTokenize } & BaseTransactionResponse &
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
    rules as vaultTokenizeRules,
    Request as VaultTokenizeRequest,
    Response as VaultTokenizeResponse,
};

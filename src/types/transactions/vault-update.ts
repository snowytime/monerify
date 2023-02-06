import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["dataKey"],
    optional: [
        "pan",
        "expdate",
        "cryptType",
        "custId",
        "avsInfo",
        "cofInfo",
        "note",
        "phone",
        "email",
    ],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultUpdate } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultUpdate } & BaseTransactionResponse &
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
    rules as vaultUpdateRules,
    Request as VaultUpdateRequest,
    Response as VaultUpdateResponse,
};

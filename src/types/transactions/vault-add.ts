import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["pan", "expdate", "cryptType"],
    optional: ["custId", "dataKeyFormat", "avsInfo", "cofInfo", "note", "phone", "email"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultAdd } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultAdd } & BaseTransactionResponse &
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

export { rules as vaultAddRules, Request as VaultAddRequest, Response as VaultAddResponse };

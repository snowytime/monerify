import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "amount", "pan", "expdate", "cryptType"],
    optional: ["custId", "dynamicDescriptor", "statusCheck"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultIndependentRefund } & RequiredProperties &
    OptionalProperties;

type Response = { type: Transaction.VaultIndependentRefund } & BaseTransactionResponse &
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
    rules as vaultIndependentRefundRules,
    Request as VaultIndependentRefundRequest,
    Response as VaultIndependentRefundResponse,
};

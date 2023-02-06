import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "amount", "pan", "expdate", "cryptType"],
    optional: ["statusCheck", "custId", "dynamicDescriptor"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.IndependentRefund } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.IndependentRefund } & BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

export {
    rules as independentRefundRules,
    Request as IndependentRefundRequest,
    Response as IndependentRefundResponse,
};

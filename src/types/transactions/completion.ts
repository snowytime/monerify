import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "amount", "txnNumber", "cryptType"],
    optional: [
        "statusCheck",
        "custId",
        "dynamicDescriptor",
        "commcardInvoice",
        "commcardTaxAmount",
    ],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.PreAuthCompletion } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.PreAuthCompletion } & BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

export { rules as completionRules, Request as CompletionRequest, Response as CompletionResponse };

import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "txnNumber", "cryptType"],
    optional: ["statusCheck", "custId", "dynamicDescriptor"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.Correction } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.Correction } & BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

export { rules as correctionRules, Request as CorrectionRequest, Response as CorrectionResponse };

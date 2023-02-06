import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "pan", "expdate", "cryptType"],
    optional: ["avsInfo", "cofInfo", "cvdInfo"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.Verification } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.Verification } & BaseTransactionResponse &
    Partial<
        Pick<GlobalResponse, "cvdResultCode" | "avsResultCode" | "statusCode" | "statusMessage">
    >;

export {
    rules as verificationRules,
    Request as VerificationRequest,
    Response as VerificationResponse,
};

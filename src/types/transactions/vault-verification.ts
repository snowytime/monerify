import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId", "dataKey", "expdate", "cryptType"],
    optional: ["avsInfo", "cofInfo", "cvdInfo"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.VaultVerification } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.VaultVerification } & BaseTransactionResponse &
    Partial<Pick<GlobalResponse, "avsResultCode" | "statusCode" | "statusMessage">>;

export {
    rules as vaultVerificationRules,
    Request as VaultVerificationRequest,
    Response as VaultVerificationResponse,
};

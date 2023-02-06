import { Transaction } from "../enums.js";
import { GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["ecrNo"],
    optional: ["statusCheck"],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.BatchClose } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.BatchClose } & Partial<
    Pick<
        GlobalResponse,
        | "ecrNo"
        | "terminalIds"
        | "purchaseCount"
        | "purchaseAmount"
        | "refundCount"
        | "refundAmount"
        | "correctionCount"
        | "correctionAmount"
    >
>;

export { rules as batchCloseRules, Request as BatchCloseRequest, Response as BatchCloseResponse };

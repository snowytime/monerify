import { Transaction } from "../enums.js";
import { GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["ecrNo"],
    optional: [],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.OpenTotals } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.OpenTotals } & Partial<
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

export { rules as openTotalsRules, Request as OpenTotalsRequest, Response as OpenTotalsResponse };

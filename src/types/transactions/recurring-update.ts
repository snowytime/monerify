import { Transaction } from "../enums.js";
import { BaseTransactionResponse, GlobalProperties, GlobalResponse } from "./shared.js";

const rules = {
    required: ["orderId"],
    optional: [
        "custId",
        "pan",
        "expdate",
        "recurAmount",
        "addNum",
        "totalNum",
        "hold",
        "terminate",
        "issuerId",
    ],
} as const;

type RequiredProperties = {
    [K in (typeof rules)["required"][number]]: GlobalProperties[K];
};
type OptionalProperties = {
    [K in (typeof rules)["optional"][number]]?: GlobalProperties[K];
};

type Request = { type: Transaction.RecurringUpdate } & RequiredProperties & OptionalProperties;

type Response = { type: Transaction.RecurringUpdate } & BaseTransactionResponse &
    Partial<Pick<GlobalResponse, "recurUpdateSuccess" | "nextRecurDate" | "recurEndDate">>;

export {
    Request as RecurringUpdateRequest,
    Response as RecurringUpdateResponse,
    rules as recurringUpdateRules,
};

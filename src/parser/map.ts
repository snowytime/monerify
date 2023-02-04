import { Transaction } from "../types/index.js";
import { Rules } from "../types/transactions/global.js";
import { preauthRules } from "../types/transactions/preauth.js";
import { purchaseRules } from "../types/transactions/purchase.js";

export const allowedMap: { [key in Transaction]?: Rules } = {
    // vault
    // [Transaction.VaultAdd]: {
    //     required: ["pan", "expdate", "cryptType"],
    //     optional: [
    //         "custId",
    //         "dataKeyFormat",
    //         "email",
    //         "phone",
    //         "note",
    //         "avs",
    //         "cvdInfo",
    //         "cof",
    //         "statusCheck",
    //     ],
    // },
    // [Transaction.VaultUpdate]: {
    //     required: ["dataKey"],
    //     optional: [
    //         "pan",
    //         "cryptType",
    //         "expdate",
    //         "custId",
    //         "phone",
    //         "email",
    //         "note",
    //         "avs",
    //         "cof",
    //         "statusCheck",
    //     ],
    // },
    // [Transaction.VaultRemove]: {
    //     required: ["dataKey"],
    //     optional: ["statusCheck"],
    // },
    // [Transaction.VaultLookupMasked]: {
    //     required: ["dataKey"],
    //     optional: ["statusCheck"],
    // },
    // [Transaction.VaultLookupFull]: {
    //     required: ["dataKey"],
    //     optional: ["statusCheck"],
    // },
    // [Transaction.VaultTemporaryToken]: {
    //     required: ["pan", "expdate", "cryptType", "duration"],
    //     optional: ["statusCheck"],
    // },
    // [Transaction.VaultSaveTemporaryToken]: {
    //     required: ["dataKey", "cryptType", "expdate"],
    //     optional: ["custId", "email", "phone", "note", "avs", "cof", "statusCheck"],
    // },
    // [Transaction.VaultIsCorporate]: {
    //     required: ["dataKey"],
    //     optional: ["statusCheck"],
    // },
    // [Transaction.VaultGetExpiring]: {
    //     required: [],
    //     optional: ["statusCheck"],
    // },
    // [Transaction.VaultIndependentRefund]: {
    //     required: ["dataKey", "orderId", "amount", "cryptType"],
    //     optional: ["custId", "statusCheck", "dynamicDescriptor"],
    // },
    // [Transaction.VaultTokenize]: {
    //     required: ["txnNumber", "orderId"],
    //     optional: [
    //         "custId",
    //         "dataKeyFormat",
    //         "email",
    //         "phone",
    //         "note",
    //         "avs",
    //         "cof",
    //         "statusCheck",
    //     ],
    // },
    // [Transaction.VaultPreAuth]: {
    //     required: ["dataKey", "orderId", "amount", "cryptType"],
    //     optional: [
    //         "dynamicDescriptor",
    //         "statusCheck",
    //         "expdate",
    //         "custId",
    //         "customer",
    //         "avs",
    //         "cvdInfo",
    //         "cof",
    //     ],
    // },
    // regular
    [Transaction.Purchase]: purchaseRules,
    [Transaction.PreAuth]: preauthRules,
    // [Transaction.PreAuthCompletion]: {
    //     required: ["orderId", "amount", "txnNumber", "cryptType"],
    //     optional: [
    //         "statusCheck",
    //         "dynamicDescriptor",
    //         "custId",
    //         "commcardInvoice",
    //         "commcardTaxAmount",
    //     ],
    // },
    // [Transaction.Verification]: {
    //     required: ["orderId", "pan", "expdate", "cryptType"],
    //     optional: ["avs", "cvdInfo", "cof", "statusCheck"],
    // },
    // [Transaction.Verification]: {
    //     required: ["orderId", "dataKey", "cryptType", "expdate"],
    //     optional: ["avs", "cvdInfo", "cof", "statusCheck"],
    // },
    // [Transaction.IndependentRefund]: {
    //     required: ["orderId", "amount", "pan", "expdate", "cryptType"],
    //     optional: ["custId", "dynamicDescriptor", "statusCheck"],
    // },
    // [Transaction.Correction]: {
    //     required: ["orderId", "txnNumber", "cryptType"],
    //     optional: ["statusCheck", "custId", "dynamicDescriptor"],
    // },
    // [Transaction.Refund]: {
    //     required: ["orderId", "amount", "txnNumber", "cryptType"],
    //     optional: ["custId", "statusCheck", "dynamicDescriptor"],
    // },
    // [Transaction.BatchClose]: {
    //     required: ["ecrNo"],
    //     optional: ["statusCheck"],
    // },
    // [Transaction.OpenTotals]: {
    //     required: ["ecrNo"],
    //     optional: [],
    // },
    // [Transaction.RecurringUpdate]: {
    //     required: ["orderId"],
    //     optional: [
    //         "custId",
    //         "pan",
    //         "expdate",
    //         "recurAmount",
    //         "addNum",
    //         "totalNum",
    //         "hold",
    //         "terminate",
    //         "cof",
    //     ],
    // },
};

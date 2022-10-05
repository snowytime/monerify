import { TransactionTypes, TransactionActions } from "./types";

export const process = (props: TransactionTypes) => {};

process({
    type: TransactionActions.Refund,
    crypt: "7",
    orderId: "SACCDLS0021",
    amount: "30.00",
    transactionNumber: "55",
});

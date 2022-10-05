/**
 * Global types and enums to control the purchases
 */
type Crypt = "1" | "2" | "3" | "4" | "5" | "6" | "7";
type PaymentIndicator = "C" | "R" | "V" | "U" | "Z";
type PaymentInformation = "0" | "1";
type CvdIndicator = "0" | "1" | "2" | "9";
// make a global interface with all available values
interface Properties {
    // purchase
    pan: string;
    expiry: string;
    crypt: Crypt;
    amount: string;
    transactionNumber: string;
    key: string;
    orderId: string;
    keyFormat: string;
    // optionals
    statusCheck: boolean;
    customerId: string;
    descriptor: string;
    // other
    ecr: string;
    // verification
    cof: COF;
    avs: AVS;
    cvd: CVD;
    // info
    email: string;
    phone: string;
    note: string;
    duration: string; // only applies to temporary storage of credentials in the vault
}
export enum TransactionActions {
    // vault saving data
    VaultAdd,
    VaultUpdate,
    VaultRemove,
    VaultLookup,
    VaultTemp,
    VaultSaveTemp,
    VaultIsCorporate,
    VaultGetExpiring,
    VaultIndependentRefund,
    // transactions without vault
    Purchase,
    PreAuth,
    PreAuthCompletion,
    Verification,
    IndependentRefund,
    // vault transactions
    VaultPurchase,
    VaultPreAuth,
    VaultVerification,
    // non-credential transactions
    Correction,
    Refund,
    BatchClose,
    OpenTotals,
}
// required for all transactions regardless of type
export interface GlobalTransaction {
    api: string;
    storeId: string;
    statusCheck?: boolean;
}
// config that is to be set once for the application
export type Config = {
    testMode?: boolean;
} & Pick<GlobalTransaction, "api" | "storeId">;
// avs specifics
export interface AVS {
    streetNumber: string;
    streetName: string;
    zipCode: string;
}
// this is for the three numbers on the back
export interface CVD {
    cvdIndicator: CvdIndicator;
    cvdValue: string;
}
// credential on file -> needed for converting to vault
export interface COF {
    paymentIndicator: PaymentIndicator;
    paymentInformation: PaymentInformation;
    issuerId: string;
}
// vault add transaction type
export type VaultAdd = { type: TransactionActions.VaultAdd } & Pick<
    Properties,
    "pan" | "expiry" | "crypt"
> &
    Partial<
        Pick<
            Properties,
            | "customerId"
            | "keyFormat"
            | "email"
            | "phone"
            | "note"
            | "avs"
            | "cvd"
            | "cof"
        >
    >;
// vault update credential type
export type VaultUpdate = { type: TransactionActions.VaultUpdate } & Pick<
    Properties,
    "key"
> &
    Partial<
        Pick<
            Properties,
            | "pan"
            | "crypt"
            | "expiry"
            | "customerId"
            | "phone"
            | "email"
            | "note"
            | "cof"
            | "avs"
        >
    >;
// vault remove credentials
export type VaultARemove = { type: TransactionActions.VaultRemove } & Pick<
    Properties,
    "key"
>;
// vault lookup credentials type
export type VaultLookup = { type: TransactionActions.VaultLookup } & Pick<
    Properties,
    "key"
>;
// vault temporary credentials
export type VaultTemp = { type: TransactionActions.VaultTemp } & Pick<
    Properties,
    "pan" | "expiry" | "crypt" | "duration"
>;
// vault save temporary credentials
export type VaultSaveTemp = { type: TransactionActions.VaultSaveTemp } & Pick<
    Properties,
    "key" | "crypt" | "expiry"
> &
    Partial<
        Pick<
            Properties,
            "customerId" | "email" | "phone" | "note" | "avs" | "cof"
        >
    >;
// check if vault card is a corporate card
export type VaultIsCorporate = {
    type: TransactionActions.VaultIsCorporate;
} & Pick<Properties, "key">;
// get vault cards that are expiring
export type VaultGetExpiring = {
    type: TransactionActions.VaultIsCorporate;
    // note that there is nothing required to be sent to get the expiring cards.
    // TODO This returns a really weird object with the expiring fields
    // will need to be properly parsed (UGH) and made into an array prior to returning
};
// ordinary one off purchase
export type Purchase = { type: TransactionActions.Purchase } & Pick<
    Properties,
    "pan" | "crypt" | "expiry" | "amount" | "orderId"
> &
    Partial<
        Pick<
            Properties,
            "avs" | "cvd" | "cof" | "statusCheck" | "customerId" | "descriptor"
        >
    >;
// pre auth purchase
export type PreAuth = { type: TransactionActions.PreAuth } & Pick<
    Properties,
    "pan" | "crypt" | "expiry" | "amount" | "orderId"
> &
    Partial<
        Pick<
            Properties,
            "avs" | "cvd" | "cof" | "statusCheck" | "customerId" | "descriptor"
        >
    >;
// pre auth completion
export type PreAuthCompletion = {
    type: TransactionActions.PreAuthCompletion;
} & Pick<Properties, "orderId" | "amount" | "transactionNumber" | "crypt"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;
// verification
export type Verification = {
    type: TransactionActions.Verification;
} & Pick<Properties, "pan" | "expiry" | "amount" | "crypt" | "orderId"> &
    Partial<Pick<Properties, "avs" | "cvd" | "cof">>;
// vault purchase
export type VaultPurchase = {
    type: TransactionActions.VaultPurchase;
} & Pick<Properties, "key" | "orderId" | "amount" | "crypt" | "expiry"> &
    Partial<
        Pick<
            Properties,
            "avs" | "cvd" | "cof" | "statusCheck" | "customerId" | "descriptor"
        >
    >;
// vault pre auth
export type VaultPreAuth = {
    type: TransactionActions.VaultPreAuth;
} & Pick<Properties, "key" | "orderId" | "amount" | "crypt" | "expiry"> &
    Partial<
        Pick<
            Properties,
            "avs" | "cvd" | "cof" | "statusCheck" | "customerId" | "descriptor"
        >
    >;
// vault card verification
export type VaultVerification = {
    type: TransactionActions.VaultVerification;
} & Pick<Properties, "key" | "orderId" | "crypt" | "expiry"> &
    Partial<Pick<Properties, "avs" | "cvd" | "cof">>;
// vault independent refund
export type VaultIndependentRefund = {
    type: TransactionActions.VaultIndependentRefund;
} & Pick<Properties, "key" | "orderId" | "crypt" | "amount"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;
// correction
export type Correction = {
    type: TransactionActions.Correction;
} & Pick<Properties, "orderId" | "transactionNumber" | "crypt"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;
// refund
export type Refund = {
    type: TransactionActions.Refund;
} & Pick<Properties, "orderId" | "amount" | "crypt" | "transactionNumber"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;

// refund
export type IndependentRefund = {
    type: TransactionActions.IndependentRefund;
} & Pick<Properties, "orderId" | "amount" | "pan" | "expiry" | "crypt"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;

// get all open totals
export type OpenTotals = { type: TransactionActions.OpenTotals } & Pick<
    Properties,
    "ecr"
>;

// batch close
export type BatchClose = { type: TransactionActions.BatchClose } & Pick<
    Properties,
    "ecr"
> &
    Partial<Pick<Properties, "statusCheck">>;

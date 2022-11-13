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
    expdate: string;
    crypt_type: Crypt;
    amount: string;
    txn_number: string;
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
    VaultAdd = "res_cc_add",
    VaultUpdate = "res_cc_update",
    VaultRemove = "res_delete",
    VaultLookup = "res_lookup_masked",
    VaultTemp = "res_temp_add",
    VaultSaveTemp = "res_add_token",
    VaultIsCorporate = "res_is_corporatecard",
    VaultGetExpiring = "res_get_expiring",
    VaultIndependentRefund = "res_ind_refund_cc",
    VaultTokenize = "res_tokenize_cc",
    // transactions without vault
    Purchase = "purchase",
    PreAuth = "preauth",
    PreAuthCompletion = "completion",
    Verification = "verification",
    IndependentRefund = "independent_refund",
    // vault transactions
    VaultPurchase = "res_purchase_cc",
    VaultPreAuth = "res_preauth_cc",
    VaultVerification = "res_card_verification_cc",
    // non-credential transactions
    Correction = "purchase_correction",
    Refund = "refund",
    BatchClose = "batch_close",
    OpenTotals = "open_totals",
}

// required for all transactions regardless of type
export interface GlobalTransaction {
    api: string;
    store: string;
    statusCheck?: boolean;
}

// config that is to be set once for the application
export type Config = {
    testMode?: boolean;
} & Pick<GlobalTransaction, "api" | "store">;

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
    "pan" | "expdate" | "crypt_type"
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
            | "crypt_type"
            | "expdate"
            | "customerId"
            | "phone"
            | "email"
            | "note"
            | "cof"
            | "avs"
        >
    >;

// vault remove credentials
export type VaultRemove = { type: TransactionActions.VaultRemove } & Pick<
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
    "pan" | "expdate" | "crypt_type" | "duration"
>;

// vault save temporary credentials
export type VaultSaveTemp = { type: TransactionActions.VaultSaveTemp } & Pick<
    Properties,
    "key" | "crypt_type" | "expdate"
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
    type: TransactionActions.VaultGetExpiring;
    // note that there is nothing required to be sent to get the expiring cards.
    // TODO This returns a really weird object with the expiring fields
    // will need to be properly parsed (UGH) and made into an array prior to returning
};

// ordinary one off purchase
export type Purchase = { type: TransactionActions.Purchase } & Pick<
    Properties,
    "pan" | "crypt_type" | "expdate" | "amount" | "orderId"
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
    "pan" | "crypt_type" | "expdate" | "amount" | "orderId"
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
} & Pick<Properties, "orderId" | "amount" | "txn_number" | "crypt_type"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;

// verification
export type Verification = {
    type: TransactionActions.Verification;
} & Pick<Properties, "pan" | "expdate" | "amount" | "crypt_type" | "orderId"> &
    Partial<Pick<Properties, "avs" | "cvd" | "cof">>;

// vault purchase
export type VaultPurchase = {
    type: TransactionActions.VaultPurchase;
} & Pick<Properties, "key" | "orderId" | "amount" | "crypt_type" | "expdate"> &
    Partial<
        Pick<
            Properties,
            "avs" | "cvd" | "cof" | "statusCheck" | "customerId" | "descriptor"
        >
    >;

// vault pre auth
export type VaultPreAuth = {
    type: TransactionActions.VaultPreAuth;
} & Pick<Properties, "key" | "orderId" | "amount" | "crypt_type" | "expdate"> &
    Partial<
        Pick<
            Properties,
            "avs" | "cvd" | "cof" | "statusCheck" | "customerId" | "descriptor"
        >
    >;

// vault card verification
export type VaultVerification = {
    type: TransactionActions.VaultVerification;
} & Pick<Properties, "key" | "orderId" | "crypt_type" | "expdate"> &
    Partial<Pick<Properties, "avs" | "cvd" | "cof">>;

// vault independent refund
export type VaultIndependentRefund = {
    type: TransactionActions.VaultIndependentRefund;
} & Pick<Properties, "key" | "orderId" | "crypt_type" | "amount"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;

// vault add previous card used to vault
export type VaultTokenize = {
    type: TransactionActions.VaultTokenize;
} & Pick<Properties, "orderId" | "txn_number"> &
    Partial<
        Pick<
            Properties,
            | "customerId"
            | "keyFormat"
            | "email"
            | "phone"
            | "note"
            | "avs"
            | "cof"
        >
    >;

// correction
export type Correction = {
    type: TransactionActions.Correction;
} & Pick<Properties, "orderId" | "txn_number" | "crypt_type"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;

// refund
export type Refund = {
    type: TransactionActions.Refund;
} & Pick<Properties, "orderId" | "amount" | "crypt_type" | "txn_number"> &
    Partial<Pick<Properties, "statusCheck" | "customerId" | "descriptor">>;

// refund
export type IndependentRefund = {
    type: TransactionActions.IndependentRefund;
} & Pick<Properties, "orderId" | "amount" | "pan" | "expdate" | "crypt_type"> &
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

// unify all transaction types into a singular type
export type TransactionTypes =
    | VaultAdd
    | VaultUpdate
    | VaultRemove
    | VaultLookup
    | VaultTemp
    | VaultSaveTemp
    | VaultIsCorporate
    | VaultGetExpiring
    | VaultIndependentRefund
    | Purchase
    | PreAuth
    | PreAuthCompletion
    | Verification
    | IndependentRefund
    | VaultPurchase
    | VaultPreAuth
    | VaultVerification
    | Correction
    | Refund
    | OpenTotals
    | BatchClose
    | VaultTokenize;

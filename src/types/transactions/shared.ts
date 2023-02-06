import {
    Crypt,
    CVDIndicator,
    PaymentIndicator,
    PaymentInformation,
    Transaction,
} from "../enums.js";

export interface Config {
    storeId: string;
    apiToken: string;
    mode: "production" | "development";
}

export interface Avs {
    avsStreetNumber: string;
    avsStreetName: string;
    avsZipCode: string;
}

export interface Cvd {
    cvdIndicator: CVDIndicator;
    cvdValue: string;
}

export interface Cof {
    paymentIndicator: PaymentIndicator;
    paymentInformation: PaymentInformation;
    issuerId: string;
}

export interface ConfFeeInfo {
    convenienceAmount: string;
}

export interface Customer {
    email: string;
    instructions: string;
    billingInformation: {
        firstName: string;
        lastName: string;
        companyName: string;
        address: string;
        city: string;
        province: string;
        postalCode: string;
        country: string;
        phone: string;
        fax: string;
        tax1: string; // federal tax
        tax2: string; // provincial tax
        tax3: string; // local tax
        shippingCost: string;
    };
    shippingInformation: {
        firstName: string;
        lastName: string;
        companyName: string;
        address: string;
        city: string;
        province: string;
        postalCode: string;
        country: string;
        phone: string;
        fax: string;
        tax1: string; // federal tax
        tax2: string; // provincial tax
        tax3: string; // local tax
        shippingCost: string;
    };
    items: {
        name: string;
        quantity: string;
        productCode: string;
        extendedAmount: string;
    }[];
}

export interface RecurringCycle {
    recurUnit: string;
    startNow: boolean;
    startDate: string;
    numRecurs: number;
    period: number;
    recurAmount: string;
}

/* these are all the possible properties that can be passed */
export interface GlobalProperties {
    type: Transaction;
    orderId: string;
    amount: string;
    pan: string;
    expdate: string;
    cryptType: Crypt;
    statusCheck: boolean;
    custId: string;
    dynamicDescriptor: string;
    walletIndicator: string;
    avsInfo: Avs;
    cvdInfo: Cvd;
    cofInfo: Cof;
    custInfo: Customer;
    recurringCycle: RecurringCycle;
    dataKey: string;
    txnNumber: string;
    commcardInvoice: string;
    commcardTaxAmount: string;
    ecrNo: string;
    recurAmount: string;
    addNum: string;
    totalNum: string;
    issuerId: string;
    hold: string;
    terminate: string;
    dataKeyFormat: string;
    note: string;
    phone: string;
    email: string;
    duration: string;
}

export type Map = {
    required: Partial<keyof GlobalProperties>[];
    optional: Partial<keyof GlobalProperties>[];
};

/* these are all the possible properties that can be returned */
export interface GlobalResponse {
    bankTotals: string;
    receiptId: string;
    referenceNum: string;
    responseCode: string;
    iSO: string;
    authCode: string;
    transTime: string;
    transDate: string;
    transType: string;
    complete: string;
    message: string;
    transAmount: string;
    cardType: string;
    transID: string;
    timedOut: string;
    ticket: string;
    // other
    corporateCard: string;
    isVisaDebit: string;
    // cvd
    cvdResultCode: string;
    // avs
    avsResultCode: string;
    iTDResponse: string;
    // status check
    statusCode: string;
    statusMessage: string;
    // recurring
    recurSuccess: string;
    recurUpdateSuccess: string;
    nextRecurDate: string;
    recurEndDate: string;
    // convenience fee
    cfSuccess: string;
    cfStatus: string;
    feeAmount: string;
    feeRate: string;
    feeType: string;
    // vault
    dataKey: string;
    resSuccess: string;
    paymentType: string;
    resCustId: string;
    resPhone: string;
    resEmail: string;
    resNote: string;
    resMaskedPan: string;
    resPan: string;
    resExpdate: string;
    resCryptType: string;
    resAvsStreetNumber: string;
    resAvsStreetName: string;
    resAvsZipCode: string;
    expPaymentType: string;
    expCustId: string;
    expPhone: string;
    expEmail: string;
    expNote: string;
    expMaskedPan: string;
    expExpdate: string;
    expCryptType: string;
    expAvsStreetNumber: string;
    expAvsStreetName: string;
    expAvsZipCode: string;
    // batch close
    ecrNo: string;
    terminalIds: string;
    purchaseCount: string;
    purchaseAmount: string;
    refundCount: string;
    refundAmount: string;
    correctionCount: string;
    correctionAmount: string;
}

/* for all transactions this is the base response */
/* Each method will have slightly different optional properties */
export type BaseTransactionResponse = Pick<
    GlobalResponse,
    | "receiptId"
    | "referenceNum"
    | "responseCode"
    | "iSO"
    | "authCode"
    | "transTime"
    | "transDate"
    | "transType"
    | "complete"
    | "message"
    | "transAmount"
    | "cardType"
    | "transID"
    | "timedOut"
    | "ticket"
    | "corporateCard"
    | "isVisaDebit"
    | "bankTotals"
>;

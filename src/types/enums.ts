export enum Crypt {
    MailSingle = "1",
    MailRecurring = "2",
    MailInstalment = "3",
    MailUnknown = "4",
    AuthEcommerce = "5",
    NonAuthEcommerce = "6",
    SslEnabled = "7",
}

export enum PaymentIndicator {
    UnscheduledCredentialOnFile = "C", // first transaction only
    Recurring = "R", // first and subsequent transactions
    RecurringVariablePayment = "V", // first and subsequent transactions
    UnscheduledMerchantInitiated = "U", // subsequent transactions
    UnscheduledCustomerInitiated = "Z", // subsequent transactions
}

export enum PaymentInformation {
    FirstInSeries = "0", // first transaction in a series (storing payment details provided by the cardholder)
    SubsequentTransaction = "2", // subsequent transactions (using previously stored payment details)
}

export enum CVDIndicator {
    Bypassed = "0", // CVD value is deliberately bypassed or is not provided by the merchant.
    Present = "1", // CVD value is present.
    Illegible = "2", // CVD value is on the card, but is illegible.
    NoImprint = "9", // Cardholder states that the card has no CVD imprint.
}

/*
Transaction types:
1. Vault actions - these are actions that are done on data using keys rather than card details
2. Transactions without vault - these are transactions that are done using card details

If you intend on saving the card details of a user for future transactions, it is a recommended
practice to use the vault actions first, then use the vault transactions for future transactions.

For one-off transactions, you can use the transactions without vault. What I recommend is to ask
the user if they want to save their card details for future transactions. If they do, then you
can use the vault actions to save the card details, then use the vault transactions for future
transactions. Otherwise, just use the transactions without vault.

My recommendation:
Take advantage of the temporary storage of credentials in the vault, and store the credentials
for a short period of time (1-2 days). This way, you can ask the user if they want to save their
card details for future transactions, and if they do, you can save the credentials in the vault
for future transactions. If they don't, then you can just delete the credentials from the vault
after the transaction is complete.
*/
export enum Transaction {
    // vault saving data
    VaultAdd = "res_add_cc",
    VaultUpdate = "res_update_cc",
    VaultRemove = "res_delete",
    VaultLookupMasked = "res_lookup_masked",
    VaultLookupFull = "res_lookup_full",
    VaultTemporaryToken = "res_temp_add",
    VaultSaveTemporaryToken = "res_add_token",
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
    RecurringUpdate = "recur_update",
}

export enum Endpoint {
    QA_CA = "https://esqa.moneris.com/gateway2/servlet/MpgRequest",
    Production_CA = "https://www3.moneris.com/gateway2/servlet/MpgRequest",
}

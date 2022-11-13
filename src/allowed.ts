export const allowed = {
    res_cc_add: ["pan", "expdate", "crypt_type"],
    res_cc_update: ["key"],
    res_delete: ["key"],
    res_lookup_masked: ["key"],
    res_temp_add: ["pan", "expdate", "crypt_type", "duration"],
    res_add_token: ["key", "crypt_type", "expdate"],
    res_is_corporatecard: ["key"],
    res_get_expiring: [],
    res_ind_refund_cc: ["key", "orderId", "crypt_type", "amount"],
    res_tokenize_cc: ["orderId", "txn_number"],
    // transactions without vault
    purchase: ["pan", "crypt_type", "expdate", "amount", "orderId"],
    preauth: ["pan", "crypt_type", "expdate", "amount", "orderId"],
    completion: ["orderId", "amount", "txn_number", "crypt_type"],
    verification: ["pan", "expdate", "amount", "crypt_type", "orderId"],
    independent_refund: ["orderId", "amount", "pan", "expdate", "crypt_type"],
    // vault transactions
    res_purchase_cc: ["key", "orderId", "amount", "crypt_type", "expdate"],
    res_preauth_cc: ["key", "orderId", "amount", "crypt_type", "expdate"],
    res_card_verification_cc: ["key", "orderId", "crypt_type", "expdate"],
    // non-credential transactions
    purchase_correction: ["orderId", "txn_number", "crypt_type"],
    refund: ["orderId", "amount", "crypt_type", "txn_number"],
    batch_close: ["ecr"],
    open_totals: ["ecr"],
};

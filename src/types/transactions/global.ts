import { PurchaseRequest, PurchaseResponse, purchaseRules } from "./purchase.js";
import { PreauthRequest, PreauthResponse, preauthRules } from "./preauth.js";
import { RefundRequest, RefundResponse, refundRules } from "./refund.js";
import { CompletionRequest, CompletionResponse, completionRules } from "./completion.js";
import {
    IndependentRefundRequest,
    IndependentRefundResponse,
    independentRefundRules,
} from "./independent-refund.js";
import { CorrectionRequest, CorrectionResponse, correctionRules } from "./correction.js";
import { VerificationRequest, VerificationResponse, verificationRules } from "./verification.js";
import {
    VaultVerificationRequest,
    VaultVerificationResponse,
    vaultVerificationRules,
} from "./vault-verification.js";
import {
    RecurringUpdateRequest,
    RecurringUpdateResponse,
    recurringUpdateRules,
} from "./recurring-update.js";
import { BatchCloseRequest, BatchCloseResponse, batchCloseRules } from "./batch-close.js";
import { OpenTotalsRequest, OpenTotalsResponse, openTotalsRules } from "./open-totals.js";
import { VaultAddRequest, VaultAddResponse, vaultAddRules } from "./vault-add.js";
import { VaultUpdateRequest, VaultUpdateResponse, vaultUpdateRules } from "./vault-update.js";
import { VaultRemoveRequest, VaultRemoveResponse, vaultRemoveRules } from "./vault-delete.js";
import {
    VaultGetExpiringRequest,
    VaultGetExpiringResponse,
    vaultGetExpiringRules,
} from "./vault-get-expiring.js";
import {
    VaultIsCorporateRequest,
    VaultIsCorporateResponse,
    vaultIsCorporateRules,
} from "./vault-is-corporate.js";
import {
    VaultLookupFullRequest,
    VaultLookupFullResponse,
    vaultLookupFullRules,
} from "./vault-lookup-full.js";
import {
    VaultLookupMaskedRequest,
    VaultLookupMaskedResponse,
    vaultLookupMaskedRules,
} from "./vault-lookup-masked.js";
import { VaultPreauthRequest, VaultPreauthResponse, vaultPreauthRules } from "./vault-preauth.js";
import {
    VaultTemporaryTokenRequest,
    VaultTemporaryTokenResponse,
    vaultTemporaryTokenRules,
} from "./vault-temporary-token.js";
import {
    VaultSaveTemporaryTokenRequest,
    VaultSaveTemporaryTokenResponse,
    vaultSaveTemporaryTokenRules,
} from "./vault-temporary-add.js";
import {
    VaultTokenizeRequest,
    VaultTokenizeResponse,
    vaultTokenizeRules,
} from "./vault-tokenize.js";
import {
    VaultIndependentRefundRequest,
    VaultIndependentRefundResponse,
    vaultIndependentRefundRules,
} from "./vault-independent-refund.js";
import {
    VaultPurchaseRequest,
    VaultPurchaseResponse,
    vaultPurchaseRules,
} from "./vault-purchase.js";
import { Transaction } from "../enums.js";

export type TransactionRequest =
    | PurchaseRequest
    | PreauthRequest
    | RefundRequest
    | CompletionRequest
    | CorrectionRequest
    | VerificationRequest
    | VaultVerificationRequest
    | BatchCloseRequest
    | OpenTotalsRequest
    | RecurringUpdateRequest
    | VaultAddRequest
    | VaultUpdateRequest
    | VaultRemoveRequest
    | VaultGetExpiringRequest
    | VaultIsCorporateRequest
    | VaultLookupFullRequest
    | VaultLookupMaskedRequest
    | VaultPreauthRequest
    | VaultTemporaryTokenRequest
    | VaultSaveTemporaryTokenRequest
    | VaultTokenizeRequest
    | VaultIndependentRefundRequest
    | VaultPurchaseRequest
    | IndependentRefundRequest;

export type TransactionResponse =
    | PurchaseResponse
    | PreauthResponse
    | RefundResponse
    | CompletionResponse
    | CorrectionResponse
    | VerificationResponse
    | VaultVerificationResponse
    | BatchCloseResponse
    | OpenTotalsResponse
    | RecurringUpdateResponse
    | VaultAddResponse
    | VaultUpdateResponse
    | VaultRemoveResponse
    | VaultGetExpiringResponse
    | VaultIsCorporateResponse
    | VaultLookupFullResponse
    | VaultLookupMaskedResponse
    | VaultPreauthResponse
    | VaultTemporaryTokenResponse
    | VaultSaveTemporaryTokenResponse
    | VaultTokenizeResponse
    | VaultIndependentRefundResponse
    | VaultPurchaseResponse
    | IndependentRefundResponse;

export type Rules =
    | typeof preauthRules
    | typeof purchaseRules
    | typeof refundRules
    | typeof completionRules
    | typeof correctionRules
    | typeof verificationRules
    | typeof vaultVerificationRules
    | typeof batchCloseRules
    | typeof openTotalsRules
    | typeof recurringUpdateRules
    | typeof vaultAddRules
    | typeof vaultUpdateRules
    | typeof vaultRemoveRules
    | typeof vaultGetExpiringRules
    | typeof vaultIsCorporateRules
    | typeof vaultLookupFullRules
    | typeof vaultLookupMaskedRules
    | typeof vaultPreauthRules
    | typeof vaultTemporaryTokenRules
    | typeof vaultSaveTemporaryTokenRules
    | typeof vaultTokenizeRules
    | typeof vaultIndependentRefundRules
    | typeof vaultPurchaseRules
    | typeof independentRefundRules;

export const allowedRules = {
    // standard operations
    [Transaction.Purchase]: purchaseRules,
    [Transaction.PreAuth]: preauthRules,
    [Transaction.Refund]: refundRules,
    [Transaction.PreAuthCompletion]: completionRules,
    [Transaction.IndependentRefund]: independentRefundRules,
    [Transaction.Correction]: correctionRules,
    [Transaction.Verification]: verificationRules,
    [Transaction.BatchClose]: batchCloseRules,
    [Transaction.OpenTotals]: openTotalsRules,
    [Transaction.RecurringUpdate]: recurringUpdateRules,
    [Transaction.VaultAdd]: vaultAddRules,
    [Transaction.VaultUpdate]: vaultUpdateRules,
    [Transaction.VaultRemove]: vaultRemoveRules,
    [Transaction.VaultGetExpiring]: vaultGetExpiringRules,
    [Transaction.VaultIsCorporate]: vaultIsCorporateRules,
    [Transaction.VaultLookupFull]: vaultLookupFullRules,
    [Transaction.VaultLookupMasked]: vaultLookupMaskedRules,
    [Transaction.VaultPreAuth]: vaultPreauthRules,
    [Transaction.VaultTemporaryToken]: vaultTemporaryTokenRules,
    [Transaction.VaultSaveTemporaryToken]: vaultSaveTemporaryTokenRules,
    [Transaction.VaultTokenize]: vaultTokenizeRules,
    [Transaction.VaultIndependentRefund]: vaultIndependentRefundRules,
    [Transaction.VaultPurchase]: vaultPurchaseRules,
    [Transaction.VaultVerification]: vaultVerificationRules,
} as const;

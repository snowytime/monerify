/**
 * The main monerize function that handles the guiding of all things
 * -=- USAGE -=-
 * :: export default monerize({ api: '', store: '', testMode: true })
 * :: then monerize.purchase(...config)
 */

import { process_factory } from "./process.js";
import {
    BatchClose,
    Config,
    Correction,
    IndependentRefund,
    OpenTotals,
    PreAuth,
    PreAuthCompletion,
    Purchase,
    Refund,
    TransactionActions,
    VaultAdd,
    VaultGetExpiring,
    VaultIndependentRefund,
    VaultIsCorporate,
    VaultLookup,
    VaultPreAuth,
    VaultPurchase,
    VaultRemove,
    VaultSaveTemp,
    VaultTemp,
    VaultTokenize,
    VaultUpdate,
    VaultVerification,
    Verification,
} from "./types.js";

/**
 * Monerize is a function that returns the individual functions that handle the processing.
 * All the actual logic is handled in the process via the process_factory function
 */
export const monerize = (config: Config) => {
    // first begin by passing the config to the process factory
    // this returns the process function loaded with the config items
    const process = process_factory(config);
    // prepare the process constructor
    // purchase object
    const purchase = async (args: Omit<Purchase, "type">) => {
        const response = await process({ type: TransactionActions.Purchase, ...args });
        return response;
    };
    // refund
    const refund = async (args: Omit<Refund, "type">) => {
        await process({ type: TransactionActions.Refund, ...args });
    };
    // pre-auth
    const preauth = async (args: Omit<PreAuth, "type">) => {
        await process({ type: TransactionActions.PreAuth, ...args });
    };
    // completion
    const completion = async (args: Omit<PreAuthCompletion, "type">) => {
        await process({ type: TransactionActions.PreAuthCompletion, ...args });
    };
    // verification
    const verification = async (args: Omit<Verification, "type">) => {
        await process({ type: TransactionActions.Verification, ...args });
    };
    // independent refund
    const independentRefund = async (args: Omit<IndependentRefund, "type">) => {
        await process({ type: TransactionActions.IndependentRefund, ...args });
    };
    // Correction
    const correction = async (args: Omit<Correction, "type">) => {
        await process({ type: TransactionActions.Correction, ...args });
    };
    // get open totals
    const openTotals = async (args: Omit<OpenTotals, "type">) => {
        await process({ type: TransactionActions.OpenTotals, ...args });
    };
    // batch close
    const batchClose = async (args: Omit<BatchClose, "type">) => {
        await process({ type: TransactionActions.BatchClose, ...args });
    };
    // Tokenize
    const vaultTokenize = async (args: Omit<VaultTokenize, "type">) => {
        await process({ type: TransactionActions.VaultTokenize, ...args });
    };
    // add to vault
    const vaultAdd = async (args: Omit<VaultAdd, "type">) => {
        await process({ type: TransactionActions.VaultAdd, ...args });
    };
    // update vault
    const vaultUpdate = async (args: Omit<VaultUpdate, "type">) => {
        await process({ type: TransactionActions.VaultUpdate, ...args });
    };
    // remove from vault
    const vaultRemove = async (args: Omit<VaultRemove, "type">) => {
        await process({ type: TransactionActions.VaultRemove, ...args });
    };
    // vault lookup
    const vaultLookup = async (args: Omit<VaultLookup, "type">) => {
        await process({ type: TransactionActions.VaultLookup, ...args });
    };
    // remove from vault
    const vaultTemporary = async (args: Omit<VaultTemp, "type">) => {
        await process({ type: TransactionActions.VaultTemp, ...args });
    };
    // remove from vault
    const vaultSaveTemporary = async (args: Omit<VaultSaveTemp, "type">) => {
        await process({ type: TransactionActions.VaultSaveTemp, ...args });
    };
    // is vault card corporate
    const vaultIsCorporate = async (args: Omit<VaultIsCorporate, "type">) => {
        await process({ type: TransactionActions.VaultIsCorporate, ...args });
    };
    // get expiring cards
    const vaultGetExpiring = async (args: Omit<VaultGetExpiring, "type">) => {
        await process({ type: TransactionActions.VaultGetExpiring, ...args });
    };
    // independent refund to vault card
    const vaultIndependentRefund = async (
        args: Omit<VaultIndependentRefund, "type">
    ) => {
        await process({
            type: TransactionActions.VaultIndependentRefund,
            ...args,
        });
    };
    // vault purchase
    const vaultPurchase = async (args: Omit<VaultPurchase, "type">) => {
        await process({ type: TransactionActions.VaultPurchase, ...args });
    };
    // vault preauth
    const vaultPreauth = async (args: Omit<VaultPreAuth, "type">) => {
        await process({ type: TransactionActions.VaultPreAuth, ...args });
    };
    // vault verification
    const vaultVerification = async (args: Omit<VaultVerification, "type">) => {
        await process({ type: TransactionActions.VaultVerification, ...args });
    };
    // return all the methods
    return {
        purchase,
        refund,
        preauth,
        completion,
        verification,
        independentRefund,
        correction,
        openTotals,
        batchClose,
        vaultTokenize,
        vaultAdd,
        vaultUpdate,
        vaultRemove,
        vaultLookup,
        vaultTemporary,
        vaultSaveTemporary,
        vaultIsCorporate,
        vaultGetExpiring,
        vaultIndependentRefund,
        vaultPurchase,
        vaultPreauth,
        vaultVerification,
    };
};

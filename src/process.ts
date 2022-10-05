import { Config, TransactionActions, TransactionTypes } from "./types";

/**
 * This is where the magic happens
 * The process factory
 */

export const process_factory =
    (config: Config) => async (args: TransactionTypes) => {
        console.log({ config, args });
    };

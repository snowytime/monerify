import { toSnakeCase } from "@snowytime/fns";
import { builder } from "@snowytime/xanax";
import { Config, Endpoint, PaymentError, TransactionRequest } from "../index.js";
import { parseArguments } from "../parser/index.js";

type Arguments = TransactionRequest & Config;
export const createRequest = (args: Arguments) => {
    const { type, ...rest } = parseArguments(args);
    // we allow for the storeId, apiToken, and mode to be passed in as a config
    if (!args.storeId || !args.apiToken || !args.mode) {
        throw new PaymentError({
            message: "Missing storeId, apiToken, or mode.",
        });
    }
    const { storeId, apiToken, mode } = args;
    // we need to grab our env variables
    // construct the ol xml
    const body = builder({
        tree: {
            request: {
                storeId,
                apiToken,
                // we want to add the statusCheck property if it exists and is true
                // for some types the status check does not exists so we need a type guard
                ...("statusCheck" in rest ? { statusCheck: rest.statusCheck } : {}),
                [type]: {
                    ...rest,
                },
            },
        },
        mutator: toSnakeCase,
    });
    // construct the ol url
    const url = mode === "production" ? Endpoint.Production_CA : Endpoint.QA_CA;
    return {
        original: {
            type,
            ...rest,
        },
        mode,
        body,
        url,
    };
};

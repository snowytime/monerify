import { toSnakeCase } from "@snowytime/fns";
import { builder } from "@snowytime/xanax";
import { Endpoint, env, TransactionRequest } from "../index.js";
import { parseArguments } from "../parser/index.js";

export const createRequest = (args: TransactionRequest) => {
    const { type, ...rest } = parseArguments(args);
    // we need to grab our env variables
    const mode = env.MONERIS_MODE;
    // construct the ol xml
    const body = builder({
        tree: {
            request: {
                storeId: env.MONERIS_STORE_ID,
                apiToken: env.MONERIS_API_TOKEN,
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

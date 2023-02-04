/*
A decision was made that this library will not be directly making
any calls to the Moneris API. Instead, the library will be used to
generate the XML that will be sent to the Moneris API, the url
that will be used to send the XML, and other configurations that
will be used to send the XML to the Moneris API. This is done so
that the library can be used with any request library that the
user wants to use. This is also done so that the library can be
used in the browser and in node.js.

To help with avoiding sending malformed requests, and therefore
avoiding errors, the library will be using a custom parser function
that will be used to parse the properties and automatically remove
or throw an error if a required property is missing.
*/

import { builder, parser } from "@snowytime/xanax";
import { toCamelCase, toSnakeCase } from "@snowytime/fns";
import { Endpoint } from "../types/index.js";
import { env } from "../helpers/index.js";
import { parseArguments } from "../parser/index.js";
import { TransactionRequest } from "../types/transactions/global.js";

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

export const interpretResponse = <T>(response: string) => {
    const parsedResult = parser({ xml: response, mutator: toCamelCase });
    type Receipt = { [key: string]: string };
    type Response = { receipt: Receipt };
    return (parsedResult.response as Response).receipt as T;
};

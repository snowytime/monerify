import axios from "axios";
import { parser, builder, toSnakeCase, toCamelCase } from "@snowytime/xmlify";
import { allowed } from "./allowed.js";
import { Config, TransactionActions, TransactionTypes } from "./types";

/**
 * This is where the magic happens
 * The process factory
 */

export const process_factory: any =
    (config: Config) => async (args: TransactionTypes) => {
        // handle the xml construction and handlers
        const { store, api, testMode = true } = config;
        if (!objectProperties(args, allowed[args.type])) {
            throw new Error(`The arguments passed for ${args.type} are wrong`);
        }
        // base
        const qa = "esqa.moneris.com";
        const prod = "www3.moneris.com";
        // @ts-ignore
        const { type, statusCheck, ...rest } = args;
        const body = builder({
            tree: {
                // @ts-ignore
                request: {
                    storeId: store,
                    apiToken: api,
                    statusCheck: statusCheck,
                    // @ts-ignore
                    [args.type]: {
                        cof: {
                            issuerId: "123",
                            paymentIndicator: "U",
                            paymentInformation: "2",
                        },
                        ...rest,
                    },
                },
            },
            mutator: toSnakeCase,
        });
        console.log(body)
        const url = `https://${
            testMode ? qa : prod
        }/gateway2/servlet/MpgRequest`;
        const { data } = await axios.post(url, body);
        return parser({ xml: data, mutator: toCamelCase });
    };

const objectProperties = (object: TransactionTypes, props: string[]) => {
    return props.every((prop) => object.hasOwnProperty(prop));
};

import { PaymentError } from "../helpers/error.js";
import { Transaction } from "../types/index.js";
import { TransactionRequest } from "../types/transactions/global.js";
import { allowedMap } from "./map.js";

/*
argument parser function
- takes in a object of properties and based on the type property
- the parser will not validate the properties on object properties,
this is because doing so is too complex and not worth the effort
*/
export const parseArguments = ({ type, ...rest }: TransactionRequest) => {
    if (!type || !Object.values(Transaction).includes(type)) {
        throw new PaymentError({
            message: `Invalid transaction type: ${type}`,
        });
    }
    // throw error if allowedMap[type] is not defined
    const fieldCategories = allowedMap[type];
    if (!fieldCategories) {
        throw new PaymentError({
            message: `Invalid transaction type: ${type}`,
        });
    }
    // check required fields
    const missing = fieldCategories.required.filter((field) => !rest[field]);
    if (missing.length > 0) {
        throw new PaymentError({
            message: `Missing required fields for ${type}: ${missing.join(", ")}`,
        });
    }
    const allowedFields = [...fieldCategories.required, ...fieldCategories.optional];
    type AllowedProperties = keyof (typeof allowedMap)[Transaction];
    const filteredObj = Object.fromEntries(
        Object.entries({ type, ...rest }).filter(([key]) => {
            return allowedFields.includes(key as AllowedProperties);
        }),
    );
    return {
        type,
        ...filteredObj,
    };
};

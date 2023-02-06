import { allowedRules, PaymentError, Transaction, TransactionRequest } from "../index.js";

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
    const fieldCategories = allowedRules[type];
    if (!fieldCategories) {
        throw new PaymentError({
            message: `Invalid transaction type: ${type}`,
        });
    }
    // check required fields
    const isMissing = (field: keyof Omit<TransactionRequest, "type">) => !rest[field];
    const missing = (
        fieldCategories.required as unknown as (keyof Omit<TransactionRequest, "type">)[]
    ).filter(isMissing);
    if (missing.length > 0) {
        throw new PaymentError({
            message: `Missing required fields for ${type}: ${missing.join(", ")}`,
        });
    }
    const allowedFields = [...fieldCategories.required, ...fieldCategories.optional];
    const filteredObj = Object.fromEntries(
        Object.entries(rest).filter(([key]) => {
            return allowedFields.includes(key as any);
        }),
    );
    // we can now pass this to the createResponse function
    return {
        type,
        ...filteredObj,
    };
};

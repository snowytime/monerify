import { toCamelCase } from "@snowytime/fns";
import { parser } from "@snowytime/xanax";

export const interpretResponse = <T>(response: string) => {
    const parsedResult = parser({ xml: response, mutator: toCamelCase });
    type Receipt = { [key: string]: string };
    type Response = { receipt: Receipt };
    return (parsedResult.response as Response).receipt as T;
};

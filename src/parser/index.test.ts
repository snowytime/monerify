import test from "ava";

import { Crypt, Transaction } from "../index.js";
import { parseArguments } from "./index.js";

test("should throw an error if the type is not defined", (t) => {
    t.throws(() => parseArguments({} as any));
});
test("should throw an error if the type is not a member of the Transaction enum", (t) => {
    t.throws(() => parseArguments({ type: "foo" } as any));
});
test("should throw an error if any required fields are missing", (t) => {
    t.throws(() => parseArguments({ type: Transaction.Purchase } as any));
});

test("should return the type and rest where all non required / optional fields are removed", (t) => {
    const parsed = parseArguments({
        type: Transaction.Purchase,
        orderId: "123",
        amount: "1.00",
        pan: "1234567890123456",
        expdate: "1234",
        cryptType: Crypt.SslEnabled,
        test: "bar",
    } as any);
    t.deepEqual(parsed, {
        type: Transaction.Purchase,
        orderId: "123",
        amount: "1.00",
        pan: "1234567890123456",
        expdate: "1234",
        cryptType: Crypt.SslEnabled,
    });
});
test("should remove all additional fields that are not required or optional", (t) => {
    const parsed = parseArguments({
        type: Transaction.Purchase,
        orderId: "123",
        amount: "1.00",
        pan: "1234567890123456",
        expdate: "1234",
        cryptType: Crypt.SslEnabled,
        foo: "bar",
    } as any);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    t.falsy(parsed.foo);
});

import { Crypt, Transaction } from "../index.js";
import { parseArguments } from "./index.js";

describe("Testing the argument parser", () => {
    describe("Error cases", () => {
        it("should throw an error if the type is not defined", () => {
            expect(() => parseArguments({} as any)).to.throw();
        });
        it("should throw an error if the type is not a member of the Transaction enum", () => {
            expect(() => parseArguments({ type: "foo" } as any)).to.throw();
        });
        it("should throw an error if any required fields are missing", () => {
            expect(() => parseArguments({ type: Transaction.Purchase } as any)).to.throw();
        });
    });
    describe("Success cases", () => {
        it("should return the type and rest where all non required / optional fields are removed", () => {
            const parsed = parseArguments({
                type: Transaction.Purchase,
                orderId: "123",
                amount: "1.00",
                pan: "1234567890123456",
                expdate: "1234",
                cryptType: Crypt.SslEnabled,
                test: "bar",
            } as any);
            expect(parsed).to.deep.equal({
                type: Transaction.Purchase,
                orderId: "123",
                amount: "1.00",
                pan: "1234567890123456",
                expdate: "1234",
                cryptType: Crypt.SslEnabled,
            });
        });
        it("should remove all additional fields that are not required or optional", () => {
            const parsed = parseArguments({
                type: Transaction.Purchase,
                orderId: "123",
                amount: "1.00",
                pan: "1234567890123456",
                expdate: "1234",
                cryptType: Crypt.SslEnabled,
                foo: "bar",
            } as any);
            expect(parsed).to.not.have.property("foo");
        });
    });
});

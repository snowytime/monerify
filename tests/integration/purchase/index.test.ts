import axios from "axios";
import { nanoid } from "nanoid";
import { createRequest } from "../../../src/create/index.js";
import {
    Crypt,
    Transaction,
    CVDIndicator,
    interpretResponse,
    PurchaseResponse,
    PaymentIndicator,
    PaymentInformation,
    env,
} from "../../../src/index.js";

describe("Purchase integration", async () => {
    it("should send a successful purchase to the moneris api", async () => {
        const orderId = nanoid();
        const { body, url } = createRequest({
            storeId: env.MONERIS_STORE_ID,
            apiToken: env.MONERIS_API_TOKEN,
            mode: env.MONERIS_MODE as "development",
            type: Transaction.Purchase,
            orderId,
            amount: "1.00",
            pan: "4761739012345603",
            expdate: "0127",
            cryptType: Crypt.SslEnabled,
            walletIndicator: "1",
            custId: "custom id",
            cvdInfo: {
                cvdIndicator: CVDIndicator.Present,
                cvdValue: "123",
            },
            avsInfo: {
                avsStreetNumber: "727",
                avsStreetName: "Massey Way NW, Edmonton, Alberta, Canada",
                avsZipCode: "T6R3S6",
            },
            cofInfo: {
                paymentIndicator: PaymentIndicator.Recurring,
                issuerId: "1234567890",
                paymentInformation: PaymentInformation.FirstInSeries,
            },
            custInfo: {
                email: "snaer@me.com",
                instructions: "Please call me",
                billingInformation: {
                    firstName: "Snaer",
                    lastName: "Nae",
                    companyName: "Snaer Nae",
                    address: "727 Massey Way NW",
                    city: "Edmonton",
                    province: "Alberta",
                    postalCode: "T6R3S6",
                    country: "Canada",
                    phone: "780-123-4567",
                    fax: "780-123-4567",
                    tax1: "1.00",
                    tax2: "1.00",
                    tax3: "1.00",
                    shippingCost: "1.00",
                },
                shippingInformation: {
                    firstName: "Snaer",
                    lastName: "Nae",
                    companyName: "Snaer Nae",
                    address: "727 Massey Way NW",
                    city: "Edmonton",
                    province: "Alberta",
                    postalCode: "T6R3S6",
                    country: "Canada",
                    phone: "780-123-4567",
                    fax: "780-123-4567",
                    tax1: "1.00",
                    tax2: "1.00",
                    tax3: "1.00",
                    shippingCost: "1.00",
                },
                items: [
                    {
                        name: "item 1",
                        quantity: "1",
                        productCode: "123",
                        extendedAmount: "1.00",
                    },
                ],
            },
            recurringCycle: {
                recurUnit: "month",
                startNow: true,
                numRecurs: 12,
                period: 1,
                recurAmount: "220.00",
                startDate: "2021/01/01",
            },
            statusCheck: false,
        });
        const response = await axios.post(url, body);
        // must pass the xml string to then interpreter
        const interpretedResponse = interpretResponse<PurchaseResponse>(response.data);
        expect(interpretedResponse).to.be.an("object").that.has.all.keys(
            "receiptId",
            "referenceNum",
            "responseCode",
            "iSO",
            "authCode",
            "transTime",
            "transDate",
            "transType",
            "complete",
            "message",
            "transAmount",
            "cardType",
            "transID",
            "timedOut",
            "ticket",
            "corporateCard",
            "isVisaDebit",
            "cvdResultCode",
            "bankTotals",
            "avsResultCode",
            "iTDResponse",
            "issuerId",
            // "messageId",
            // "statusCode",
            // "statusMessage",
        );
    });
});

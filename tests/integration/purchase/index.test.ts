import axios from "axios";
import { nanoid } from "nanoid";
import {
    createRequest,
    Crypt,
    CVDIndicator,
    interpretResponse,
    Transaction,
} from "../../../src/index.js";
import { PreauthResponse } from "../../../src/types/transactions/preauth.js";

describe("Purchase integration", async () => {
    it("should send a successful purchase to the moneris api", async () => {
        const orderId = nanoid();
        const { body, url } = createRequest({
            type: Transaction.Purchase,
            orderId,
            amount: "1.00",
            pan: "4242424242424242",
            expdate: "2012",
            cryptType: Crypt.SslEnabled,
            walletIndicator: "1",
            cvdInfo: {
                cvdIndicator: CVDIndicator.Present,
                cvdValue: "123",
            },
        });
        const response = await axios.post(url, body);
        // must pass the xml string to then interpreter
        const interpretedResponse = interpretResponse<PreauthResponse>(response.data);
        expect(interpretedResponse)
            .to.be.an("object")
            .that.has.all.keys(
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
            );
    });
});

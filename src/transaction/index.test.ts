import axios from "axios";
import { nanoid } from "nanoid";
import { createRequest, Crypt, interpretResponse, Transaction } from "../index.js";

describe("Testing the transaction functions", () => {
    it("should be able to call the moneris api", async () => {
        const { url, body } = createRequest({
            type: Transaction.Purchase,
            pan: "378282246310005",
            expdate: "2012",
            cryptType: Crypt.SslEnabled,
            amount: "100.00",
            orderId: nanoid(),
            // statusCheck: true,
        });
        // build the axios post request with the url and body from the createRequest function
        const response = await axios.post(url, body);
        const interpretedResponse = interpretResponse(response.data);
        console.log(interpretedResponse);
        expect(response.status).equals(200);
    });
});

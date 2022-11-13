import monerize from "./base.js";

async function handler() {
    try {
        const response = await monerize.purchase({
            pan: "4242424242424242",
            expdate: "1124",
            orderId: "sudiw8si",
            crypt_type: "7",
            amount: "10.00",
            statusCheck: false,
        });
        console.log(response);
    } catch (e) {
        console.log(e);
    }
}
handler()
import monerize from "./base.js";

monerize.purchase({
    pan: "4242424242424242",
    expdate: "1124",
    orderId: "order-7",
    crypt_type: "7",
    amount: "10.00",
    statusCheck: false,
}).then(val => console.log(val))
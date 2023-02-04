interface PaymentErrorConstructor {
    message: string;
    status?: number;
}
export class PaymentError extends Error {
    message: string;

    status!: number;

    type!: string;

    constructor(data: PaymentErrorConstructor) {
        super(data.message);
        this.message = data.message;
    }
}

export declare class CreateTransaction {
    senderAccountId: string;
    recipientAccountId: string;
    amount: string;
    paymentId?: string;
    transactionCode?: string;
    senderNote?: string;
    recipientNote?: string;
    baseRate?: number;
    anonymous?: boolean;
    compliant?: boolean;
}

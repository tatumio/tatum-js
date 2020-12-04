declare class VetFee {
    gasLimit: string;
}
export declare class TransferVet {
    fromPrivateKey: string;
    to: string;
    amount: string;
    data?: string;
    fee?: VetFee;
}
export {};

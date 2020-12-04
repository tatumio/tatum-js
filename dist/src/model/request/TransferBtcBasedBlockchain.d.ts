declare class FromAddress {
    address: string;
    privateKey: string;
}
export declare class FromUTXO {
    txHash: string;
    index: number;
    privateKey: string;
}
export declare class To {
    address: string;
    value: number;
}
export declare class TransferBtcBasedBlockchain {
    fromAddress?: FromAddress[];
    fromUTXO?: FromUTXO[];
    to: To[];
}
export {};

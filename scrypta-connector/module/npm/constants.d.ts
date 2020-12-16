export declare const LYRA_TEST_NETWORK: {
    messagePrefix: string;
    bech32: string;
    bip32: {
        public: number;
        private: number;
    };
    pubKeyHash: number;
    scriptHash: number;
    wif: number;
};
export declare const LYRA_NETWORK: {
    messagePrefix: string;
    bech32: string;
    bip32: {
        public: number;
        private: number;
    };
    pubKeyHash: number;
    scriptHash: number;
    wif: number;
};
export declare const LYRA_DERIVATION_PATH = "m/44'/497'/0'/0";
export interface ScryptaTx {
    hash: string;
    inputs: Array<{
        prevout: {
            hash: string;
            index: number;
        };
        coin?: {
            address: string;
            value: number;
        };
    }>;
    outputs: Array<{
        value: number;
        address: string;
    }>;
    time: number;
    blockhash: string;
}
export interface ScryptaParsedTx {
    hash: string;
    from: string[];
    to: string[];
    type: string;
    time: number;
    blockhash: string;
}
export interface ScryptaBlock {
    hash: string;
    height: number;
    confirmations: number;
    time: number;
    txs: ScryptaTx[];
}
export interface ScryptaUnspent {
    txid: string;
    vout: number;
    amount: number;
    scriptPubKey: string;
    block: number;
    redeemed: string;
}

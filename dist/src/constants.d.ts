export declare const TATUM_API_URL = "https://api-eu1.tatum.io";
export declare const TEST_VET_URL = "https://sync-testnet.vechain.org/";
export declare const VET_URL = "https://sync-mainnet.vechain.org/";
export declare const ETH_DERIVATION_PATH = "m/44'/60'/0'/0";
export declare const VET_DERIVATION_PATH = "m/44'/818'/0'/0";
export declare const BTC_DERIVATION_PATH = "m/44'/0'/0'/0";
export declare const LTC_DERIVATION_PATH = "m/44'/2'/0'/0";
export declare const BCH_DERIVATION_PATH = "m/44'/145'/0'/0";
export declare const LYRA_DERIVATION_PATH = "m/44'/497'/0'/0";
export declare const TESTNET_DERIVATION_PATH = "m/44'/1'/0'/0";
export declare const LTC_TEST_NETWORK: {
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
export declare const LTC_NETWORK: {
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
export declare const RIPPLE_EPOCH = 946684800;
export declare const CONTRACT_ADDRESSES: {
    [x: string]: string;
};
export declare const CONTRACT_DECIMALS: {
    [x: string]: number;
};
export declare const TRANSFER_METHOD_ABI: {
    constant: boolean;
    inputs: {
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        name: string;
        type: string;
    }[];
    payable: boolean;
    stateMutability: string;
    type: string;
};

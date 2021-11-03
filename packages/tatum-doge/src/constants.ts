export const DOGE_DERIVATION_PATH = 'm/44\'/3\'/0\'/0'
export const TESTNET_DERIVATION_PATH = 'm/44\'/1\'/0\'/0'
export const DOGE_TEST_NETWORK = {
    messagePrefix: '\x18Dogecoin Signed Message:\n',
    bech32: '',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 0x71,
    scriptHash: 0xc4,
    wif: 0xf1,
}
export const DOGE_NETWORK = {
    messagePrefix: '\x18Dogecoin Signed Message:\n',
    bech32: '',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e,
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LYRA_DERIVATION_PATH = exports.LYRA_NETWORK = exports.LYRA_TEST_NETWORK = void 0;
exports.LYRA_TEST_NETWORK = {
    messagePrefix: '\x18DarkNet Signed Message:\n',
    bech32: '',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 0x7f,
    scriptHash: 0x13,
    wif: 0xae,
};
exports.LYRA_NETWORK = {
    messagePrefix: '\x18DarkNet Signed Message:\n',
    bech32: '',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x0d,
    wif: 0xae,
};
exports.LYRA_DERIVATION_PATH = "m/44'/497'/0'/0";

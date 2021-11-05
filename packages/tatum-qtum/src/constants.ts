export const QTUM_DERIVATION_PATH = 'm/44\'/2301\'/0\'/0'
export const QTUM_NETWORK_MAINNET ={
    messagePrefix: '\x15Qtum Signed Message:\n',
    bech32: 'qc',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
    },
    pubKeyHash: 0x3a,
    scriptHash: 0x32,
    wif: 0x80
}
export const QTUM_NETWORK_TESTNET ={
    messagePrefix: '\x15Qtum Signed Message:\n',
    bech32: 'tq',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394
    },
    pubKeyHash: 0x78,
    scriptHash: 0x6e,
    wif: 0xef
}

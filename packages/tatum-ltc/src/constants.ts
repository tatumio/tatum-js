export const LTC_DERIVATION_PATH = "m/44'/2'/0'/0"
export const LTC_TEST_NETWORK = {
  messagePrefix: '\x18Litecoin Signed Message:\n',
  bech32: '',
  bip32: {
    public: 0x0436f6e1,
    private: 0x0436ef7d,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0x3a,
  wif: 0xef,
}

export const LTC_NETWORK = {
  messagePrefix: '\x18Litecoin Signed Message:\n',
  bech32: '',
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30,
  scriptHash: 0x32,
  wif: 0xb0,
}

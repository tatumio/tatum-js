export const LYRA_TEST_NETWORK = {
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

export const LYRA_NETWORK = {
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

export const LYRA_DERIVATION_PATH = "m/44'/497'/0'/0";

export interface ScryptaTx {
  hash: string;
  inputs: Array<{
    prevout: { hash: string; index: number };
    coin?: { address: string; value: number };
  }>;
  outputs: Array<{ value: number; address: string }>;
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

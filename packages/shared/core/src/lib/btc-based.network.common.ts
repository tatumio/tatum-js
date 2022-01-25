import { BtcBasedBlockchain } from './models/Blockchain'

export const getNetworkConfig = (blockchain: BtcBasedBlockchain, options?: { testnet: boolean }): Network => {
  return options?.testnet ? NETWORK_CONFIG[blockchain].testnet : NETWORK_CONFIG[blockchain].mainnet
}

export const NETWORK_CONFIG: Record<BtcBasedBlockchain, Networks> = {
  BTC: {
    mainnet: {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bech32: 'bc',
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80,
    } as Network,
    testnet: {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: {
        public: 0x043587cf,
        private: 0x04358394,
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef,
    },
  },
  LTC: {
    mainnet: {
      messagePrefix: '\x18Litecoin Signed Message:\n',
      bech32: '',
      bip32: {
        public: 0x019da462,
        private: 0x019d9cfe,
      },
      pubKeyHash: 0x30,
      scriptHash: 0x32,
      wif: 0xb0,
    },
    testnet: {
      messagePrefix: '\x18Litecoin Signed Message:\n',
      bech32: '',
      bip32: {
        public: 0x0436f6e1,
        private: 0x0436ef7d,
      },
      pubKeyHash: 0x6f,
      scriptHash: 0x3a,
      wif: 0xef,
    },
  },
  DOGE: {
    mainnet: {
      messagePrefix: '\x18Dogecoin Signed Message:\n',
      bech32: '',
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
      },
      pubKeyHash: 0x1e,
      scriptHash: 0x16,
      wif: 0x9e,
    } as Network,
    testnet: {
      messagePrefix: '\x18Dogecoin Signed Message:\n',
      bech32: '',
      bip32: {
        public: 0x043587cf,
        private: 0x04358394,
      },
      pubKeyHash: 0x71,
      scriptHash: 0xc4,
      wif: 0xf1,
    },
  },
}

export type Networks = {
  mainnet: Network
  testnet: Network
}

interface Bip32 {
  public: number
  private: number
}

export interface Network {
  messagePrefix: string
  bech32: string
  bip32: Bip32
  pubKeyHash: number
  scriptHash: number
  wif: number
}

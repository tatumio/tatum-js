import {Currency} from './model';

export const TATUM_API_URL = 'https://api-eu1.tatum.io';

export const TEST_VET_URL = 'https://sync-testnet.vechain.org/';
export const VET_URL = 'https://sync-mainnet.vechain.org/';

export const ETH_DERIVATION_PATH = 'm/44\'/60\'/0\'/0';
export const VET_DERIVATION_PATH = 'm/44\'/818\'/0\'/0';
export const BTC_DERIVATION_PATH = 'm/44\'/0\'/0\'/0';
export const LTC_DERIVATION_PATH = 'm/44\'/2\'/0\'/0';
export const BCH_DERIVATION_PATH = 'm/44\'/145\'/0\'/0';
export const TESTNET_DERIVATION_PATH = 'm/44\'/1\'/0\'/0';

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
};
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
};

export const RIPPLE_EPOCH = 946684800;

export const CONTRACT_ADDRESSES = {
    [Currency.USDT.toString()]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    [Currency.LEO.toString()]: '0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3',
    [Currency.UNI.toString()]: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    [Currency.LINK.toString()]: '0x514910771af9ca656af840dff83e8264ecf986ca',
    [Currency.FREE.toString()]: '0x2f141ce366a2462f02cea3d12cf93e4dca49e4fd',
    [Currency.MKR.toString()]: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    [Currency.USDC.toString()]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    [Currency.BAT.toString()]: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    [Currency.TUSD.toString()]: '0x0000000000085d4780B73119b644AE5ecd22b376',
    [Currency.PAX.toString()]: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    [Currency.PAXG.toString()]: '0x45804880de22913dafe09f4980848ece6ecbaf78',
    [Currency.PLTC.toString()]: '0x429d83bb0dcb8cdd5311e34680adc8b12070a07f',
    [Currency.MMY.toString()]: '0x385ddf50c3de724f6b8ecb41745c29f9dd3c6d75',
    [Currency.XCON.toString()]: '0x0f237d5ea7876e0e2906034d98fdb20d43666ad4',
};

export const CONTRACT_DECIMALS = {
    [Currency.USDT.toString()]: 6,
    [Currency.LEO.toString()]: 18,
    [Currency.LINK.toString()]: 18,
    [Currency.UNI.toString()]: 18,
    [Currency.FREE.toString()]: 18,
    [Currency.MKR.toString()]: 18,
    [Currency.USDC.toString()]: 6,
    [Currency.BAT.toString()]: 18,
    [Currency.TUSD.toString()]: 18,
    [Currency.PAX.toString()]: 18,
    [Currency.PAXG.toString()]: 18,
    [Currency.PLTC.toString()]: 18,
    [Currency.MMY.toString()]: 18,
    [Currency.XCON.toString()]: 18,
};

export const TRANSFER_METHOD_ABI = {
    constant: false,
    inputs: [
        {
            name: 'to',
            type: 'address',
        },
        {
            name: 'value',
            type: 'uint256',
        },
    ],
    name: 'transfer',
    outputs: [
        {
            name: '',
            type: 'bool',
        },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
};
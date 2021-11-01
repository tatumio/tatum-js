import {Currency} from './model';

export const TATUM_API_URL = 'https://api-eu1.tatum.io'

export const HARDENED_THRESHOLD = 0x80000000

export const TRON_DERIVATION_PATH = 'm/44\'/195\'/0\'/0'
export const ADA_DERIVATION_PATH = 'm/1852\'/1815\'/0\''
export const TESTNET_DERIVATION_PATH = 'm/44\'/1\'/0\'/0'
//
export const ADA_DERIVATION_SCHEME = 2

export const CONTRACT_ADDRESSES = {
    [Currency.USDT_TRON.toString()]: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    [Currency.INRT_TRON.toString()]: 'TX66VmiV1txm45vVLvcHYEqPXXLoREyAXm',
}

import {Currency} from '@tatumio/tatum-core';

export const TATUM_API_URL = 'https://api-eu1.tatum.io'

export const TRON_DERIVATION_PATH = 'm/44\'/195\'/0\'/0'
export const TESTNET_DERIVATION_PATH = 'm/44\'/1\'/0\'/0'

export const CONTRACT_ADDRESSES = {
    [Currency.USDT_TRON.toString()]: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    [Currency.INRT_TRON.toString()]: 'TX66VmiV1txm45vVLvcHYEqPXXLoREyAXm',
}

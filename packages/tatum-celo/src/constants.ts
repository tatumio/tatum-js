import { Currency } from "@tatumio/tatum-core";

export const CELO_DERIVATION_PATH = 'm/44\'/52752\'/0\'/0'

export const CUSD_ADDRESS_MAINNET = '0x765de816845861e75a25fca122bb6898b8b1282a'
export const CUSD_ADDRESS_TESTNET = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
export const CEUR_ADDRESS_MAINNET = '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73'
export const CEUR_ADDRESS_TESTNET = '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f'

export const CELO_BASED_CURRENCIES = [
    Currency.CELO.toString(), Currency.CEUR.toString(), Currency.CUSD.toString(),
]

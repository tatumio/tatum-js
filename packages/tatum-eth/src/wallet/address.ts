import { Currency } from '@tatumio/tatum-core';
// @ts-ignore
import {
    ETH_DERIVATION_PATH,
    TESTNET_DERIVATION_PATH
} from '@tatumio/tatum-core/dist/constants';
import { mnemonicToSeed } from 'bip39';
import ethWallet, { hdkey as ethHdKey } from 'ethereumjs-wallet';

/**
 * Generate Ethereum or any other ERC20 address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateEthAddress = (testnet: boolean, xpub: string, i: number) => {
    const w = ethHdKey.fromExtendedKey(xpub)
    const wallet = w.deriveChild(i).getWallet()
    return '0x' + wallet.getAddress().toString('hex').toLowerCase()
}

/**
 * Generate Ethereum or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateEthPrivateKey = async (testnet: boolean, mnemonic: string, i: number): Promise<string> => {
    const path = testnet ? TESTNET_DERIVATION_PATH : ETH_DERIVATION_PATH
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic))
    const derivePath = hdwallet.derivePath(path).deriveChild(i)
    return derivePath.getWallet().getPrivateKeyString()
}

/**
 * Convert Ethereum Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
const convertEthPrivateKey = (testnet: boolean, privkey: string) => {
    const wallet = ethWallet.fromPrivateKey(Buffer.from(privkey.replace('0x', ''), 'hex'))
    return wallet.getAddressString() as string
}

/**
 * Generate address
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
/**
 * TODO: Valid Currencies
 *  case Currency.USDT:
    case Currency.WBTC:
    case Currency.LEO:
    case Currency.LINK:
    case Currency.UNI:
    case Currency.FREE:
    case Currency.MKR:
    case Currency.USDC:
    case Currency.BAT:
    case Currency.TUSD:
    case Currency.PAX:
    case Currency.PAXG:
    case Currency.MATIC_ETH:
    case Currency.PLTC:
    case Currency.XCON:
    case Currency.REVV:
    case Currency.SAND:
    case Currency.ETH:
    case Currency.BSC:
    case Currency.MATIC:
    case Currency.USDT_MATIC:
    case Currency.USDC_MATIC:
    case Currency.LATOKEN:
    case Currency.BETH:
    case Currency.BUSD:
    case Currency.USDC_BSC:
    case Currency.B2U_BSC:
    case Currency.CAKE:
    case Currency.HAG:
    case Currency.BUSD_BSC:
    case Currency.GMC_BSC:
    case Currency.GMC:
    case Currency.BBTC:
    case Currency.BADA:
    case Currency.RMD:
    case Currency.WBNB:
    case Currency.BDOT:
    case Currency.BXRP:
    case Currency.BLTC:
    case Currency.BBCH:
    case Currency.MMY:
 */
export const generateAddressFromXPub = (currency: Currency, testnet: boolean, xpub: string, i: number) => {
    return generateEthAddress(testnet, xpub, i)
}

/**
 * Generate private key from mnemonic seed
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
/**
 * TODO: Valid Currencies
 *  case Currency.USDT:
    case Currency.WBTC:
    case Currency.LEO:
    case Currency.LINK:
    case Currency.UNI:
    case Currency.FREE:
    case Currency.MKR:
    case Currency.LATOKEN:
    case Currency.USDC:
    case Currency.RMD:
    case Currency.BAT:
    case Currency.TUSD:
    case Currency.PAX:
    case Currency.PAXG:
    case Currency.PLTC:
    case Currency.XCON:
    case Currency.REVV:
    case Currency.SAND:
    case Currency.ETH:
    case Currency.MATIC_ETH:
    case Currency.BSC:
    case Currency.BETH:
    case Currency.BBTC:
    case Currency.BADA:
    case Currency.WBNB:
    case Currency.BUSD:
    case Currency.USDC_BSC:
    case Currency.B2U_BSC:
    case Currency.CAKE:
    case Currency.HAG:
    case Currency.BUSD_BSC:
    case Currency.GMC:
    case Currency.GMC_BSC:
    case Currency.BDOT:
    case Currency.BXRP:
    case Currency.BLTC:
    case Currency.BBCH:
    case Currency.MMY:
 */
export const generatePrivateKeyFromMnemonic = (currency: Currency, testnet: boolean, mnemonic: string, i: number) => {
    return generateEthPrivateKey(testnet, mnemonic, i)
}

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
/**
 * TODO: Valid Currencies
 *  case Currency.ETH:
    case Currency.USDT:
    case Currency.GMC:
    case Currency.GMC_BSC:
    case Currency.RMD:
    case Currency.WBTC:
    case Currency.LEO:
    case Currency.LINK:
    case Currency.UNI:
    case Currency.FREE:
    case Currency.MKR:
    case Currency.USDC:
    case Currency.BAT:
    case Currency.TUSD:
    case Currency.PAX:
    case Currency.PAXG:
    case Currency.PLTC:
    case Currency.XCON:
    case Currency.REVV:
    case Currency.SAND:
    case Currency.MATIC_ETH:
    case Currency.BSC:
    case Currency.MMY:
    case Currency.MATIC:
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
    return convertEthPrivateKey(testnet, privateKey)
}

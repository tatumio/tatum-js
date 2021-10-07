import { Currency } from '@tatumio/tatum-core';
import {
    ETH_DERIVATION_PATH,
    TESTNET_DERIVATION_PATH
} from '@tatumio/tatum-core/dist/constants';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { hdkey as ethHdKey } from 'ethereumjs-wallet';

export interface Wallet {

    /**
     * mnemonic seed
     */
    mnemonic: string;

    /**
     * extended public key to derive addresses from
     */
    xpub: string;
}


/**
 * Generate Ethereum or any other ERC20 wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
export const generateEthWallet = async (testnet: boolean, mnem: string): Promise<Wallet> => {
    const path = testnet ? TESTNET_DERIVATION_PATH : ETH_DERIVATION_PATH
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnem))
    const derivePath = hdwallet.derivePath(path)
    return {
        xpub: derivePath.publicExtendedKey().toString(),
        mnemonic: mnem
    }
}

/**
 * Generate wallet
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
/** TODO: Valid currencies:
 * case Currency.USDT:
    case Currency.WBTC:
    case Currency.LEO:
    case Currency.REVV:
    case Currency.LATOKEN:
    case Currency.SAND:
    case Currency.LINK:
    case Currency.UNI:
    case Currency.FREE:
    case Currency.MKR:
    case Currency.USDC:
    case Currency.BAT:
    case Currency.TUSD:
    case Currency.BUSD:
    case Currency.USDC_BSC:
    case Currency.B2U_BSC:
    case Currency.GMC:
    case Currency.GMC_BSC:
    case Currency.PAX:
    case Currency.PAXG:
    case Currency.PLTC:
    case Currency.XCON:
    case Currency.ETH:
    case Currency.BSC:
    case Currency.BETH:
    case Currency.CAKE:
    case Currency.MATIC_ETH:
    case Currency.HAG:
    case Currency.BUSD_BSC:
    case Currency.BBTC:
    case Currency.BADA:
    case Currency.WBNB:
    case Currency.BDOT:
    case Currency.BXRP:
    case Currency.BLTC:
    case Currency.BBCH:
    case Currency.MMY:
 */
export const generateWallet = (currency: Currency, testnet: boolean, mnemonic?: string) => {
    const mnem = mnemonic ? mnemonic : generateMnemonic(256)
    return generateEthWallet(testnet, mnem)
}

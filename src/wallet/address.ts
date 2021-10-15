import {mnemonicToSeed} from 'bip39';
import {networks} from 'bitcoinjs-lib';
import ethWallet, {hdkey as ethHdKey} from 'ethereumjs-wallet';
// @ts-ignore
import {
    ETH_DERIVATION_PATH,
    TESTNET_DERIVATION_PATH,
} from '../constants';
import {Currency} from '../model';

const bcash = require('@tatumio/bitcoincashjs2-lib');
const coininfo = require('coininfo');

interface Hash {
    hash: Buffer;
}

interface Bytes extends Hash {
    version: number
}

interface Decoded extends Hash {
    prefix: string
    type: string
    format: string
}

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

export const toLegacyAddress = (address: string) => {
    const {prefix, type, hash}: Decoded = _decode(address)
    let bitcoincash = coininfo.bitcoincash.main
    switch (prefix) {
        case 'bitcoincash':
            bitcoincash = coininfo.bitcoincash.main
            break
        case 'bchtest':
            bitcoincash = coininfo.bitcoincash.test
            break
    }

    let version: number = bitcoincash.versions.public
    switch (type) {
        case 'P2PKH':
            version = bitcoincash.versions.public
            break
        case 'P2SH':
            version = bitcoincash.versions.scripthash
            break
    }

    const hashBuf: Buffer = Buffer.from(hash)

    return bcash.address.toBase58Check(hashBuf, version)
}

const _decode = (address: string): Decoded => {
    const {version, hash}: Bytes = bcash.address.fromBase58Check(address)

    let decoded: Decoded = {
        prefix: '',
        type: '',
        hash,
        format: ''
    }
    switch (version) {
        case networks.bitcoin.pubKeyHash:
            decoded = {
                prefix: 'bitcoincash',
                type: 'P2PKH',
                hash,
                format: 'legacy'
            }
            break
        case networks.bitcoin.scriptHash:
            decoded = {
                prefix: 'bitcoincash',
                type: 'P2SH',
                hash,
                format: 'legacy'
            }
            break
        case networks.testnet.pubKeyHash:
            decoded = {
                prefix: 'bchtest',
                type: 'P2PKH',
                hash,
                format: 'legacy'
            }
            break
        case networks.testnet.scriptHash:
            decoded = {
                prefix: 'bchtest',
                type: 'P2SH',
                hash,
                format: 'legacy'
            }
            break
    }
    return decoded
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
export const generateAddressFromXPub = (currency: Currency, testnet: boolean, xpub: string, i: number) => {
    switch (currency) {
        case Currency.BTC:
            return generateBtcAddress(testnet, xpub, i)
        case Currency.TRON:
        case Currency.USDT_TRON:
        case Currency.INRT_TRON:
            return generateTronAddress(xpub, i)
        case Currency.FLOW:
        case Currency.FUSD:
            return generateFlowPublicKey(xpub, i)
        case Currency.LTC:
            return generateLtcAddress(testnet, xpub, i)
        case Currency.DOGE:
            return generateDogeAddress(testnet, xpub, i)
        case Currency.CELO:
        case Currency.CEUR:
        case Currency.CUSD:
            return generateCeloAddress(testnet, xpub, i)
        case Currency.BCH:
            return generateBchAddress(testnet, xpub, i)
        case Currency.QTUM:
            return generateQtumAddress(testnet, xpub, i)
        case Currency.USDT:
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
        case Currency.GAMEE:
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
            return generateEthAddress(testnet, xpub, i)
        case Currency.ONE:
            return generateOneAddress(testnet, xpub, i)
        case Currency.XDC:
            return generateXdcAddress(testnet, xpub, i)
        case Currency.EGLD:
            return generateEgldAddress(testnet, xpub, i)
        case Currency.VET:
            return generateVetAddress(testnet, xpub, i)
        case Currency.LYRA:
            return generateLyraAddress(testnet, xpub, i)
        case Currency.ADA:
            return cardano.generateAddress(testnet, xpub, i)
        default:
            throw new Error('Unsupported blockchain.')
    }
}

/**
 * Generate private key from mnemonic seed
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export const generatePrivateKeyFromMnemonic = (currency: Currency, testnet: boolean, mnemonic: string, i: number) => {
    switch (currency) {
        case Currency.BTC:
            return generateBtcPrivateKey(testnet, mnemonic, i)
        case Currency.LTC:
            return generateLtcPrivateKey(testnet, mnemonic, i)
        case Currency.DOGE:
            return generateDogePrivateKey(testnet, mnemonic, i)
        case Currency.BCH:
            return generateBchPrivateKey(testnet, mnemonic, i)
        case Currency.TRON:
        case Currency.USDT_TRON:
        case Currency.INRT_TRON:
            return generateTronPrivateKey(mnemonic, i)
        case Currency.QTUM:
            return generateQtumPrivateKey(testnet, mnemonic, i)
        case Currency.MATIC:
        case Currency.USDT_MATIC:
        case Currency.USDC_MATIC:
            return generatePolygonPrivateKey(testnet, mnemonic, i)
        case Currency.FLOW:
        case Currency.FUSD:
            return generateFlowPrivateKey(mnemonic, i)
        case Currency.CELO:
        case Currency.CEUR:
        case Currency.CUSD:
            return generateCeloPrivateKey(testnet, mnemonic, i)
        case Currency.USDT:
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
        case Currency.GAMEE:
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
            return generateEthPrivateKey(testnet, mnemonic, i)
        case Currency.ONE:
            return generateOnePrivateKey(testnet, mnemonic, i)
        case Currency.XDC:
            return generateXdcPrivateKey(testnet, mnemonic, i)
        case Currency.EGLD:
            return generateEgldPrivateKey(testnet, mnemonic, i)
        case Currency.VET:
            return generateVetPrivateKey(testnet, mnemonic, i)
        case Currency.LYRA:
            return generateLyraPrivateKey(testnet, mnemonic, i)
        case Currency.ADA:
            return cardano.generatePrivateKey(mnemonic, i)
        default:
            throw new Error('Unsupported blockchain.')
    }
}

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (currency: Currency, testnet: boolean, privateKey: string) => {
    return convertEthPrivateKey(testnet, privateKey)
}

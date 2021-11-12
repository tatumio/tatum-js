import { Currency } from '@tatumio/tatum-core'
import {
  generateAddressFromXPub as generateBtcAddress,
  generatePrivateKeyFromMnemonic as generateBtcPrivateKey,
  generateAddressFromPrivatekey as convertBtcPrivateKey,
} from '@tatumio/tatum-btc'
import { generateAddressFromPrivatekey as getAddressFromPrivateKey } from '@tatumio/tatum-bnb'
import {
  generateAddressFromXPub as generateTronAddress,
  generatePrivateKeyFromMnemonic as generateTronPrivateKey,
} from '@tatumio/tatum-tron'
import {
  generateAddressFromXPub as generateFlowPublicKey,
  generatePrivateKeyFromMnemonic as generateFlowPrivateKey,
} from '@tatumio/tatum-flow'
import { generateAddressFromXPub as generateLtcAddress, generatePrivateKeyFromMnemonic as generateLtcPrivateKey } from '@tatumio/tatum-ltc'
import {
  generateAddressFromXPub as generateDogeAddress,
  generatePrivateKeyFromMnemonic as generateDogePrivateKey,
} from '@tatumio/tatum-doge'
import {
  generateAddressFromXPub as generateCeloAddress,
  generatePrivateKeyFromMnemonic as generateCeloPrivateKey,
} from '@tatumio/tatum-celo'
import { generateAddressFromXPub as generateBchAddress, generatePrivateKeyFromMnemonic as generateBchPrivateKey } from '@tatumio/tatum-bch'
import {
  generateAddressFromXPub as generateQtumAddress,
  generatePrivateKeyFromMnemonic as generateQtumPrivateKey,
  generateAddressFromPrivatekey as convertQTUMPrivateKey,
} from '@tatumio/tatum-qtum'
import {
  generateAddressFromXPub as generateEthAddress,
  generatePrivateKeyFromMnemonic as generateEthPrivateKey,
  generateAddressFromPrivatekey as convertEthPrivateKey,
} from '@tatumio/tatum-eth'
import {
  generateAddressFromXPub as generateOneAddress,
  generatePrivateKeyFromMnemonic as generateOnePrivateKey,
  generateAddressFromPrivatekey as convertOnePrivateKey,
} from '@tatumio/tatum-one'
import {
  generateAddressFromXPub as generateXdcAddress,
  generatePrivateKeyFromMnemonic as generateXdcPrivateKey,
  generateAddressFromPrivatekey as convertXdcPrivateKey,
} from '@tatumio/tatum-xdc'
import {
  generateAddressFromXPub as generateEgldAddress,
  generatePrivateKeyFromMnemonic as generateEgldPrivateKey,
  generateAddressFromPrivatekey as convertEgldPrivateKey,
} from '@tatumio/tatum-egld'
import { generateAddressFromXPub as generateVetAddress, generatePrivateKeyFromMnemonic as generateVetPrivateKey } from '@tatumio/tatum-vet'
import {
  generateAddressFromXPub as generateLyraAddress,
  generatePrivateKeyFromMnemonic as generateLyraPrivateKey,
  generateAddressFromPrivatekey as convertLyraPrivateKey,
} from '@tatumio/tatum-scrypta'
import { generatePrivateKeyFromMnemonic as generatePolygonPrivateKey } from '@tatumio/tatum-polygon'
import { generateAddress as generateCardanoAddress, generatePrivateKey as generateCardanoPrivateKey } from '@tatumio/tatum-ada'

const TronWeb = require('tronweb')

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
      return generateBtcAddress(currency, testnet, xpub, i)
    case Currency.TRON:
    case Currency.USDT_TRON:
    case Currency.INRT_TRON:
      return generateTronAddress(currency, testnet, xpub, i)
    case Currency.FLOW:
    case Currency.FUSD:
      return generateFlowPublicKey(currency, testnet, xpub, i)
    case Currency.LTC:
      return generateLtcAddress(currency, testnet, xpub, i)
    case Currency.DOGE:
      return generateDogeAddress(currency, testnet, xpub, i)
    case Currency.CELO:
    case Currency.CEUR:
    case Currency.CUSD:
      return generateCeloAddress(currency, testnet, xpub, i)
    case Currency.BCH:
      return generateBchAddress(testnet, xpub, i)
    case Currency.QTUM:
      return generateQtumAddress(currency, testnet, xpub, i)
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
      return generateEthAddress(xpub, i)
    case Currency.ONE:
      return generateOneAddress(currency, testnet, xpub, i)
    case Currency.XDC:
      return generateXdcAddress(currency, testnet, xpub, i)
    case Currency.EGLD:
      return generateEgldAddress(currency, testnet, xpub, i)
    case Currency.VET:
      return generateVetAddress(currency, testnet, xpub, i)
    case Currency.LYRA:
      return generateLyraAddress(currency, testnet, xpub, i)
    case Currency.ADA:
      return generateCardanoAddress(testnet, xpub, i)
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
      return generateBtcPrivateKey(currency, testnet, mnemonic, i)
    case Currency.LTC:
      return generateLtcPrivateKey(currency, testnet, mnemonic, i)
    case Currency.DOGE:
      return generateDogePrivateKey(currency, testnet, mnemonic, i)
    case Currency.BCH:
      return generateBchPrivateKey(testnet, mnemonic, i)
    case Currency.TRON:
    case Currency.USDT_TRON:
    case Currency.INRT_TRON:
      return generateTronPrivateKey(currency, testnet, mnemonic, i)
    case Currency.QTUM:
      return generateQtumPrivateKey(currency, testnet, mnemonic, i)
    case Currency.MATIC:
    case Currency.USDT_MATIC:
    case Currency.USDC_MATIC:
      return generatePolygonPrivateKey(currency, testnet, mnemonic, i)
    case Currency.FLOW:
    case Currency.FUSD:
      return generateFlowPrivateKey(currency, testnet, mnemonic, i)
    case Currency.CELO:
    case Currency.CEUR:
    case Currency.CUSD:
      return generateCeloPrivateKey(currency, testnet, mnemonic, i)
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
      return generateOnePrivateKey(currency, testnet, mnemonic, i)
    case Currency.XDC:
      return generateXdcPrivateKey(currency, testnet, mnemonic, i)
    case Currency.EGLD:
      return generateEgldPrivateKey(currency, testnet, mnemonic, i)
    case Currency.VET:
      return generateVetPrivateKey(currency, testnet, mnemonic, i)
    case Currency.LYRA:
      return generateLyraPrivateKey(currency, testnet, mnemonic, i)
    case Currency.ADA:
      return generateCardanoPrivateKey(mnemonic, i)
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
  switch (currency) {
    case Currency.BTC:
      return convertBtcPrivateKey(currency, testnet, privateKey)
    case Currency.QTUM:
      return convertQTUMPrivateKey(currency, testnet, privateKey)
    case Currency.LYRA:
      return convertLyraPrivateKey(currency, testnet, privateKey)
    case Currency.BNB:
      return getAddressFromPrivateKey(testnet, privateKey)
    case Currency.TRON:
    case Currency.USDT_TRON:
    case Currency.INRT_TRON:
      return TronWeb.address.fromPrivateKey(privateKey)
    case Currency.ETH:
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
      return convertEthPrivateKey(privateKey)
    case Currency.ONE:
      return convertOnePrivateKey(currency, testnet, privateKey)
    case Currency.XDC:
      return convertXdcPrivateKey(currency, testnet, privateKey)
    case Currency.EGLD:
      return convertEgldPrivateKey(currency, testnet, privateKey)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

export { generateAlgodAddressFromPrivatetKey } from '@tatumio/tatum-algo'

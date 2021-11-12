import { Currency } from '@tatumio/tatum-core'
import { generateMnemonic } from 'bip39'
import { generateWallet as generateBtcWallet } from '@tatumio/tatum-btc'
import { generateWallet as generateDogeWallet } from '@tatumio/tatum-doge'
import { generateWallet as generateLtcWallet } from '@tatumio/tatum-ltc'
import { generateWallet as generateBchWallet } from '@tatumio/tatum-bch'
import { generateWallet as generateTronWallet } from '@tatumio/tatum-tron'
import { generateWallet as generateFlowWallet } from '@tatumio/tatum-flow'
import { generateWallet as generateCeloWallet } from '@tatumio/tatum-celo'
import { generateWallet as generateOneWallet } from '@tatumio/tatum-one'
import { generateWallet as generateQtumWallet } from '@tatumio/tatum-qtum'
import { generateWallet as generateEgldWallet } from '@tatumio/tatum-egld'
import { generateWallet as generateEthWallet } from '@tatumio/tatum-eth'
import { generateWallet as generatePolygonWallet } from '@tatumio/tatum-polygon'
import { generateWallet as generateXdcWallet } from '@tatumio/tatum-xdc'
import { generateWallet as generateXrpWallet } from '@tatumio/tatum-xrp'
import { generateWallet as generateXlmWallet } from '@tatumio/tatum-xlm'
import { generateWallet as generateVetWallet } from '@tatumio/tatum-vet'
// import { generateWallet as generateNeoWallet } from '@tatumio/tatum-neo'
// import { generateWallet as generateLyraWallet } from '@tatumio/tatum-lyra'
import { generateWallet as generateBnbWallet } from '@tatumio/tatum-bnb'
import { generateWallet as generateAdaWallet } from '@tatumio/tatum-ada'
import { generateWallet as generateAlgoWallet } from '@tatumio/tatum-algo'

/**
 * Generate wallet
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
export const generateWallet = (currency: Currency, testnet: boolean, mnemonic?: string) => {
  const mnem = mnemonic ? mnemonic : generateMnemonic(256)
  switch (currency) {
    case Currency.BTC:
      return generateBtcWallet(testnet, mnem)
    case Currency.DOGE:
      return generateDogeWallet(testnet, mnem)
    case Currency.LTC:
      return generateLtcWallet(testnet, mnem)
    case Currency.BCH:
      return generateBchWallet(testnet, mnem)
    case Currency.TRON:
    case Currency.USDT_TRON:
    case Currency.INRT_TRON:
      return generateTronWallet(mnem)
    case Currency.FLOW:
    case Currency.FUSD:
      return generateFlowWallet(mnem)
    case Currency.CELO:
    case Currency.CEUR:
    case Currency.CUSD:
      return generateCeloWallet(testnet, mnem)
    case Currency.ONE:
      return generateOneWallet(testnet, mnem)
    case Currency.QTUM:
      return generateQtumWallet(testnet, mnem)
    case Currency.EGLD:
      return generateEgldWallet(mnem)
    case Currency.USDT:
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
    case Currency.GAMEE:
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
      return generateEthWallet(testnet, mnem)
    case Currency.MATIC:
    case Currency.USDC_MATIC:
    case Currency.USDT_MATIC:
      return generatePolygonWallet(testnet, mnem)
    case Currency.XDC:
      return generateXdcWallet(testnet, mnem)
    case Currency.XRP:
      return generateXrpWallet()
    case Currency.XLM:
      return generateXlmWallet()
    case Currency.VET:
      return generateVetWallet(testnet, mnem)
    // case Currency.NEO:
    // no submodule for NEO
    //   return generateNeoWallet()
    case Currency.BNB:
      return generateBnbWallet(testnet)
    // case Currency.LYRA:
    //   return generateLyraWallet(testnet, mnem)
    case Currency.ADA:
      return generateAdaWallet(mnem)
    case Currency.ALGO:
      return generateAlgoWallet(mnem)
    default:
      throw new Error('Unsupported blockchain.')
  }
}


import BigNumber from "bignumber.js";
import {EvmBasedWeb3} from "./evm-based.web3";
import {Currency} from "@tatumio/api-client";

export type GasPumpChain = 'CELO' | 'TRON' | 'ONE' | 'XDC' | 'ETH' | 'MATIC' | 'KLAY' | 'BSC'

const range = (from: number, to: number) => to - from + 1

export const indexesFromRange = (from :number, to:number) =>
  Array.from(Array(range(from, to)).keys()).map((val) => `0x${new BigNumber(val + from).toString(16)}`)

export const evmBasedGasPump = () => {
  return {
    prepareGasPumpWalletBatchAbstract: async (
      body: any,
      web3: EvmBasedWeb3,
      testnet?: boolean
    ) => {
      const indexes = indexesFromRange(body.from, body.to)
      const params = [body.owner.trim(), indexes]
      const methodName = 'createBatch'
      const methodSig = undefined
      const bodyWithContractAddress = {
        ...body,
        contractAddress: evmBasedGasPump().getGasPumpFactoryContractAddress(body.chain, testnet),
      }
      return { params, methodName, methodSig, bodyWithContractAddress }
    },

    getGasPumpFactoryContractAddress: (
      chain: GasPumpChain,
      testnet?: boolean,
    ) => {
      switch (chain) {
        case Currency.CELO:
          return testnet
            ? '0x481D6f967B120E094D3551DA2C4951242Be582af'
            : '0xC7f23843d5A51221df4B6D0778910b39b40134b4'
        case Currency.TRON:
          return testnet ? 'TKqZsQCbVeyRuVVR2BNfiqZt9B8vpmoAKe'
            : 'TKqZsQCbVeyRuVVR2BNfiqZt9B8vpmoAKe'
        case Currency.ONE:
          return testnet
            ? '0xb1462fE8E9Cf82c0296022Cca7bEfA3Fd4c12B34'
            : '0x86e27174edd52469f928f6206f3d8e4316525f00'
        case Currency.XDC:
          return testnet
            ? 'xdc6709Bdda623aF7EB152cB2fE2562aB7e031e564f'
            : 'xdc3485fdba44736859267789ac9c248cc4c1443956'
        case Currency.ETH:
          return testnet
            ? '0x249BE1CbcAF4a14029EB419769EFc86642F0cfF1'
            : '0x249BE1CbcAF4a14029EB419769EFc86642F0cfF1'
        case Currency.MATIC:
          return testnet
            ? '0x6792a82ffab4890cfbcee6c2c775ae9c898afe71'
            : '0xfc05d7fed6af03df8095cc93b674acac3f72756c'
        case Currency.KLAY:
          return testnet
            ? '0xd68c48173ccb0313442b23aed68b71961c618ade'
            : '0xb1462fE8E9Cf82c0296022Cca7bEfA3Fd4c12B34'
        case Currency.BSC:
          return testnet
            ? '0xeac818b4CC468Cf6556f772C4BB86e132E6ac0F3'
            : '0x9067f90c0975679158331fe43ad7a0a105424e0d'
        default:
          throw new Error('Unsupported chain.')
      }
    }
  }
}

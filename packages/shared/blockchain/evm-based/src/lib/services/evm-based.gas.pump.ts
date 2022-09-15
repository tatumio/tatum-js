import BigNumber from 'bignumber.js'
import { EvmBasedWeb3 } from './evm-based.web3'
import { Currency } from '@tatumio/api-client'

export type GasPumpChain = 'CELO' | 'TRON' | 'ONE' | 'XDC' | 'ETH' | 'MATIC' | 'KLAY' | 'BSC'

const range = (from: number, to: number) => to - from + 1

export const indexesFromRange = (from: number, to: number) =>
  Array.from(Array(range(from, to)).keys()).map((val) => `0x${new BigNumber(val + from).toString(16)}`)

export const evmBasedGasPump = () => {
  return {
    prepareGasPumpWalletBatchAbstract: async (body: any, web3: EvmBasedWeb3, testnet?: boolean) => {
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

    getGasPumpFactoryContractAddress: (chain: GasPumpChain, testnet?: boolean) => {
      switch (chain) {
        case Currency.CELO:
          return testnet
            ? '0x909ec0d70a4dA19848F6678e8a4478864dB94E0F'
            : '0x909ec0d70a4dA19848F6678e8a4478864dB94E0F'
        case Currency.TRON:
          return testnet ? 'TKqZsQCbVeyRuVVR2BNfiqZt9B8vpmoAKe' : 'TKqZsQCbVeyRuVVR2BNfiqZt9B8vpmoAKe'
        case Currency.ONE:
          return testnet
            ? '0xb1462fE8E9Cf82c0296022Cca7bEfA3Fd4c12B34'
            : '0x86e27174edd52469f928f6206f3d8e4316525f00'
        case Currency.ETH:
          return testnet
            ? '0x249BE1CbcAF4a14029EB419769EFc86642F0cfF1'
            : '0x249BE1CbcAF4a14029EB419769EFc86642F0cfF1'
        case Currency.MATIC:
          return testnet
            ? '0xeD04F0A456717969b8936D2bB8942C0fDf87ad03'
            : '0xeD04F0A456717969b8936D2bB8942C0fDf87ad03'
        case Currency.KLAY:
          return testnet
            ? '0x6a66c7D301239A51e0e01416205EdFD402C23a62'
            : '0x6a66c7D301239A51e0e01416205EdFD402C23a62'
        case Currency.BSC:
          return testnet
            ? '0x06052cA0DdCEa6A835A0A4b3FBe1b0E33648318E'
            : '0x06052cA0DdCEa6A835A0A4b3FBe1b0E33648318E'
        default:
          throw new Error('Unsupported chain.')
      }
    },
  }
}

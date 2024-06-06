import BigNumber from 'bignumber.js'
import { EvmBasedWeb3 } from './evm-based.web3'
import { Currency } from '@tatumio/api-client'

export type GasPumpChain = 'CELO' | 'TRON' | 'ONE' | 'XDC' | 'ETH' | 'MATIC' | 'KLAY' | 'BSC'

const range = (from: number, to: number) => to - from + 1

export const CELO_TESTNET_CUSTODIAL_FACTORY_V2 = '0x5E3D93eF7C1eE50eA4536791E1441e3281f55154'
export const CELO_MAINNET_CUSTODIAL_FACTORY_V2 = '0xd0b8460559b945aa578b81f0ab3ac998e7360332'

export const ETH_TESTNET_CUSTODIAL_FACTORY_V2 = '0x4B32F0c23477D8512b39009d1625eAF2a884156D'
export const ETH_MAINNET_CUSTODIAL_FACTORY_V2 = '0xa2a1bf5a83f9daec2dc364e1c561e937163cb613'

export const KLAY_TESTNET_CUSTODIAL_FACTORY_V2 = '0x75a4462bf0938cc7558ada32dc554ca5c7ed1adf'
export const KLAY_MAINNET_CUSTODIAL_FACTORY_V2 = '0x789c00ed7ddd72a806dbac40df926df32fde3c2f'

export const MATIC_TESTNET_CUSTODIAL_FACTORY_V2 = '0xf7b8514BD32E0d0f53703f8C829E8b61c78780dA'
export const MATIC_MAINNET_CUSTODIAL_FACTORY_V2 = '0xa6e2445a16859d3717aed095396afaab9ff2fbd3'

export const BSC_TESTNET_CUSTODIAL_FACTORY_V2 = '0x3807f9384bc6ff561245a60cb71e2cf65b8d146a'
export const BSC_MAINNET_CUSTODIAL_FACTORY_V2 = '0x40c762cb7d2f5ad719ed6c9651f5f2370f5a1c88'

export const TRON_TESTNET_CUSTODIAL_FACTORY_V2 = 'TYGfTkhjii3gmxqBczcHn1FoTrRWFUXvsp'
export const TRON_MAINNET_CUSTODIAL_FACTORY_V2 = 'TUHmKLeq26QFyMwxQSYd451c4SZQQuKcHb'

export const ONE_TESTNET_CUSTODIAL_FACTORY_V2 = '0xCd2AdA00c48A27FAa5Cc67F9A1ed55B89dDf7F77'
export const ONE_MAINNET_CUSTODIAL_FACTORY_V2 = '0xb1462fE8E9Cf82c0296022Cca7bEfA3Fd4c12B34'

export const XDC_TESTNET_CUSTODIAL_FACTORY_V2 = '0x1cfc7878cf6ae32a50f84481690f6fb04574de21'
export const XDC_MAINNET_CUSTODIAL_FACTORY_V2 = '0x1cfc7878cf6ae32a50f84481690f6fb04574de21'

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
          return testnet ? CELO_TESTNET_CUSTODIAL_FACTORY_V2 : CELO_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.TRON:
          return testnet ? TRON_TESTNET_CUSTODIAL_FACTORY_V2 : TRON_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.ONE:
          return testnet ? ONE_TESTNET_CUSTODIAL_FACTORY_V2 : ONE_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.ETH:
          return testnet ? ETH_TESTNET_CUSTODIAL_FACTORY_V2 : ETH_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.MATIC:
          return testnet ? MATIC_TESTNET_CUSTODIAL_FACTORY_V2 : MATIC_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.KLAY:
          return testnet ? KLAY_TESTNET_CUSTODIAL_FACTORY_V2 : KLAY_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.BSC:
          return testnet ? BSC_TESTNET_CUSTODIAL_FACTORY_V2 : BSC_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.XDC:
          return testnet ? XDC_TESTNET_CUSTODIAL_FACTORY_V2 : XDC_MAINNET_CUSTODIAL_FACTORY_V2
        default:
          throw new Error('Unsupported chain.')
      }
    },
  }
}

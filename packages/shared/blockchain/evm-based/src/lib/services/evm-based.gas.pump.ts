import BigNumber from 'bignumber.js'
import { EvmBasedWeb3 } from './evm-based.web3'
import { Currency } from '@tatumio/api-client'

export type GasPumpChain = 'CELO' | 'TRON' | 'ONE' | 'XDC' | 'ETH' | 'MATIC' | 'KLAY' | 'BSC'

const range = (from: number, to: number) => to - from + 1

export const CELO_TESTNET_CUSTODIAL_FACTORY_V2 = '0x5E3D93eF7C1eE50eA4536791E1441e3281f55154'
export const CELO_MAINNET_CUSTODIAL_FACTORY_V2 = '0x5E3D93eF7C1eE50eA4536791E1441e3281f55154'

export const ETH_TESTNET_CUSTODIAL_FACTORY_V2 = '0x5975906E29214339CC6D292cD6101C68f8de01e4'
export const ETH_MAINNET_CUSTODIAL_FACTORY_V2 = '0x5975906E29214339CC6D292cD6101C68f8de01e4'

export const KLAY_TESTNET_CUSTODIAL_FACTORY_V2 = '0x86f7FdB16a02b91392468e2b3eCd554Cef01a23c'
export const KLAY_MAINNET_CUSTODIAL_FACTORY_V2 = '0x86f7FdB16a02b91392468e2b3eCd554Cef01a23c'

export const MATIC_TESTNET_CUSTODIAL_FACTORY_V2 = '0x031caA069FaE7F5D6955CedDa7ceCc9a6AabebdE'
export const MATIC_MAINNET_CUSTODIAL_FACTORY_V2 = '0x031caA069FaE7F5D6955CedDa7ceCc9a6AabebdE'


export const BSC_TESTNET_CUSTODIAL_FACTORY_V2 = '0x0479DD9F4868b9DA64f9Abd525A0e21824FbEE65'
export const BSC_MAINNET_CUSTODIAL_FACTORY_V2 = '0x0479DD9F4868b9DA64f9Abd525A0e21824FbEE65'

export const TRON_TESTNET_CUSTODIAL_FACTORY_V2 = 'TTNaPeEYoM1TZWPD1bZm14Nu1GpdmD5g9h'
export const TRON_MAINNET_CUSTODIAL_FACTORY_V2 = 'TTNaPeEYoM1TZWPD1bZm14Nu1GpdmD5g9h'

export const ONE_TESTNET_CUSTODIAL_FACTORY_V2 = '0xb1462fE8E9Cf82c0296022Cca7bEfA3Fd4c12B34'
export const ONE_MAINNET_CUSTODIAL_FACTORY_V2 = '0xb1462fE8E9Cf82c0296022Cca7bEfA3Fd4c12B34'


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
            ? CELO_TESTNET_CUSTODIAL_FACTORY_V2
            : CELO_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.TRON:
          return testnet
            ? TRON_TESTNET_CUSTODIAL_FACTORY_V2 :
            TRON_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.ONE:
          return testnet
            ? ONE_TESTNET_CUSTODIAL_FACTORY_V2
            : ONE_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.ETH:
          return testnet
            ? ETH_TESTNET_CUSTODIAL_FACTORY_V2
            : ETH_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.MATIC:
          return testnet
            ? MATIC_TESTNET_CUSTODIAL_FACTORY_V2
            : MATIC_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.KLAY:
          return testnet
            ? KLAY_TESTNET_CUSTODIAL_FACTORY_V2
            : KLAY_MAINNET_CUSTODIAL_FACTORY_V2
        case Currency.BSC:
          return testnet
            ? BSC_TESTNET_CUSTODIAL_FACTORY_V2
            : BSC_MAINNET_CUSTODIAL_FACTORY_V2
        default:
          throw new Error('Unsupported chain.')
      }
    },
  }
}

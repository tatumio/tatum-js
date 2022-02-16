import { CallSmartContractMethod, Currency } from '@tatumio/api-client'
import {
  ChainBatchTransferCustodialWallet,
  ChainCallSmartContractMethod,
  ChainGenerateCustodialAddress,
  ChainGenerateCustodialWalletBatch,
  ChainTransferCustodialWallet,
  ChainTransferCustodialWalletCelo,
} from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'

import {
  Custodial_1155_TokenWallet,
  Custodial_1155_TokenWalletWithBatch,
  Custodial_20_1155_TokenWallet,
  Custodial_20_1155_TokenWalletWithBatch,
  Custodial_20_721_TokenWallet,
  Custodial_20_721_TokenWalletBatch,
  Custodial_20_TokenWallet,
  Custodial_20_TokenWalletWithBatch,
  Custodial_721_1155_TokenWallet,
  Custodial_721_1155_TokenWalletWithBatch,
  Custodial_721_TokenWallet,
  Custodial_721_TokenWalletWithBatch,
  CustodialFullTokenWallet,
  CustodialFullTokenWalletWithBatch,
} from '../contracts'
import { ContractAbi } from '../contracts/common.contracts'
import { EvmBasedWeb3 } from './evm-based.web3'

const FUNGIBLE = 1
const NON_FUNGIBLE = 2
const SEMI_FUNGIBLE = 4
const BATCH = 8

enum ContractType {
  NATIVE_ASSET = 3,
  FUNGIBLE_TOKEN = 0,
  NON_FUNGIBLE_TOKEN = 1,
  SEMI_FUNGIBLE = 2,
}

const MAPPING = {
  [FUNGIBLE]: Custodial_20_TokenWallet,
  [FUNGIBLE | BATCH]: Custodial_20_TokenWalletWithBatch,

  [NON_FUNGIBLE]: Custodial_721_TokenWallet,
  [NON_FUNGIBLE | BATCH]: Custodial_721_TokenWalletWithBatch,

  [SEMI_FUNGIBLE]: Custodial_1155_TokenWallet,
  [SEMI_FUNGIBLE | BATCH]: Custodial_1155_TokenWalletWithBatch,

  [FUNGIBLE | NON_FUNGIBLE]: Custodial_20_721_TokenWallet,
  [FUNGIBLE | NON_FUNGIBLE | BATCH]: Custodial_20_721_TokenWalletBatch,

  [FUNGIBLE | SEMI_FUNGIBLE]: Custodial_20_1155_TokenWallet,
  [FUNGIBLE | SEMI_FUNGIBLE | BATCH]: Custodial_20_1155_TokenWalletWithBatch,

  [NON_FUNGIBLE | SEMI_FUNGIBLE]: Custodial_721_1155_TokenWallet,
  [NON_FUNGIBLE | SEMI_FUNGIBLE | BATCH]: Custodial_721_1155_TokenWalletWithBatch,

  [FUNGIBLE | NON_FUNGIBLE | SEMI_FUNGIBLE]: CustodialFullTokenWallet,
  [FUNGIBLE | NON_FUNGIBLE | SEMI_FUNGIBLE | BATCH]: CustodialFullTokenWalletWithBatch,
}

export const evmBasedCustodial = () => {
  return {
    obtainCustodialAddressType: (body: ChainGenerateCustodialAddress): ContractAbi => {
      // @ts-ignore @TODO OPENAPI
      if (body.chain === 'TRON' && body.enableSemiFungibleTokens) {
        throw new Error('MultiToken not supported for TRON.')
      }

      const mask =
        ((body.enableFungibleTokens as any) && FUNGIBLE) |
        ((body.enableNonFungibleTokens as any) && NON_FUNGIBLE) |
        ((body.enableSemiFungibleTokens as any) && SEMI_FUNGIBLE) |
        ((body.enableBatchTransactions as any) && BATCH)

      if (!mask) throw new Error('Unsupported combination of inputs.')

      const mapping = MAPPING[mask]
      if (!mapping) throw new Error('Unsupported combination of inputs.')

      return mapping
    },

    prepareTransferFromCustodialWalletAbstract: async <SCBody extends CallSmartContractMethod>(
      body: ChainTransferCustodialWallet | ChainTransferCustodialWalletCelo,
      web3: EvmBasedWeb3,
      getContractDecimals: (
        contractAddress: string,
        web3: EvmBasedWeb3,
        provider?: string,
        testnet?: boolean,
      ) => Promise<any>,
      prepareSmartContractWriteMethodInvocation: (
        r: SCBody,
        web3: EvmBasedWeb3,
        provider?: string,
      ) => Promise<string>,
      decimals: number,
      testnet?: boolean,
      provider?: string,
    ) => {
      let amount = new BigNumber(body.amount || 0)
      let tokenId = new BigNumber(body.tokenId || 0)

      const r: ChainCallSmartContractMethod = {
        fee: body.fee,
        nonce: body.nonce,
        fromPrivateKey: body.fromPrivateKey,
        signatureId: body.signatureId,
        index: body.index,
        contractAddress: body.custodialAddress,
        methodName: 'transfer',
        params: [
          body.tokenAddress || '0x000000000000000000000000000000000000dEaD',
          body.contractType,
          body.recipient,
          `0x${amount.toString(16)}`,
          `0x${new BigNumber(tokenId).toString(16)}`,
        ],
        methodABI: CustodialFullTokenWallet.abi.find((a) => a.name === 'transfer'),
      }

      // @TODO OPENAPI NATIVE_ASSET
      if (body.contractType === ContractType.NATIVE_ASSET) {
        amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
        // @TODO OPENAPI FUNGIBLE_TOKEN
      } else if (body.contractType === ContractType.FUNGIBLE_TOKEN) {
        tokenId = new BigNumber(0)
        amount = amount.multipliedBy(
          new BigNumber(10).pow(await getContractDecimals(body.tokenAddress!, web3, provider, testnet)),
        )
      }

      return await prepareSmartContractWriteMethodInvocation(
        (body.chain === 'CELO' ? { ...r, feeCurrency: body.feeCurrency || Currency.CELO } : r) as SCBody,
        web3,
        provider,
      )
    },

    prepareBatchTransferFromCustodialWalletAbstract: async <SCBody extends CallSmartContractMethod>(
      body: ChainBatchTransferCustodialWallet,
      web3: EvmBasedWeb3,
      getContractDecimals: (
        contractAddress: string,
        web3: EvmBasedWeb3,
        provider?: string,
        testnet?: boolean,
      ) => Promise<any>,
      prepareSmartContractWriteMethodInvocation: (
        r: SCBody,
        web3: EvmBasedWeb3,
        provider?: string,
      ) => Promise<string>,
      decimals: number,
      testnet?: boolean,
      provider?: string,
    ) => {
      const amounts = []
      const tokenIds = []

      for (let i = 0; i < body.contractType.length; i++) {
        let amount = new BigNumber(body.amount ? body.amount[i] : 0)
        let tokenId = new BigNumber(body.tokenId ? body.tokenId[i] : 0)
        if (body.contractType[i] === ContractType.NATIVE_ASSET) {
          amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
        } else if (body.contractType[i] === ContractType.NON_FUNGIBLE_TOKEN) {
          amount = new BigNumber(0)
        } else if (body.contractType[i] === ContractType.FUNGIBLE_TOKEN && body.tokenAddress) {
          tokenId = new BigNumber(0)
          amount = amount.multipliedBy(
            new BigNumber(10).pow(await getContractDecimals(body.tokenAddress[i], web3, provider, testnet)),
          )
        }
        amounts.push(`0x${amount.toString(16)}`)
        tokenIds.push(`0x${tokenId.toString(16)}`)
      }

      const r: ChainCallSmartContractMethod = {
        fee: body.fee,
        nonce: body.nonce,
        fromPrivateKey: body.fromPrivateKey,
        signatureId: body.signatureId,
        index: body.index,
        contractAddress: body.custodialAddress,
        methodName: 'transferBatch',
        params: [
          (body.tokenAddress || []).map((t) =>
            t === '0' ? '0x000000000000000000000000000000000000dEaD' : t,
          ),
          body.contractType,
          body.recipient,
          amounts,
          tokenIds,
        ],
        methodABI: CustodialFullTokenWalletWithBatch.abi.find((a) => a.name === 'transferBatch'),
      }

      return await prepareSmartContractWriteMethodInvocation(
        (body.chain === 'CELO' ? { ...r, feeCurrency: body.feeCurrency || Currency.CELO } : r) as SCBody,
        web3,
        provider,
      )
    },

    prepareCustodialWalletBatchAbstract: async (
      body: ChainGenerateCustodialWalletBatch,
      web3: EvmBasedWeb3,
      testnet?: boolean,
    ) => {
      const params = [body.owner.trim(), `0x${new BigNumber(body.batchCount).toString(16)}`]

      const methodName = 'cloneNewWallet'
      const methodSig = undefined
      const bodyWithContractAddress = {
        ...body,
        contractAddress: evmBasedCustodial().getCustodialFactoryContractAddress(body.chain, testnet),
      }
      return { params, methodName, methodSig, bodyWithContractAddress }
    },

    getCustodialFactoryContractAddress: (
      chain: 'CELO' | 'TRON' | 'ONE' | 'XDC' | 'ETH' | 'MATIC' | 'KLAY' | 'BSC',
      testnet?: boolean,
    ) => {
      switch (chain) {
        case Currency.CELO:
          return testnet
            ? '0x481D6f967B120E094D3551DA2C4951242Be582af'
            : '0xC7f23843d5A51221df4B6D0778910b39b40134b4'
        case Currency.TRON:
          return testnet ? 'TRM8P5gpzAr85p2a5BMvqb9UfEdFEwEgA7' : 'TG59uLNQvCR45F6yKHPXipvCu7wg5D88Wr'
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
            ? process.env['TESTNET_TYPE'] === 'ethereum-rinkeby'
              ? '0x4eC40a4A0dA042d46cC4529f918080957003b531'
              : '0x3485fdba44736859267789ac9c248cc4c1443956'
            : '0xd8050943c1E2764F750EC868ae1B375C4768d89A'
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
    },
  }
}

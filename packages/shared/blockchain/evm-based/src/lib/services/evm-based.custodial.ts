import { CallSmartContractMethod, Currency } from '@tatumio/api-client'
import {
  ChainBatchTransferCustodialWallet,
  ChainCallSmartContractMethod,
  ChainGenerateCustodialAddress,
  ChainGenerateCustodialWalletBatch,
  ChainGenerateCustodialWalletCelo,
  ChainTransferCustodialWallet,
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
const NATIVE_ASSET = 3
const FUNGIBLE_TOKEN = 0
const NON_FUNGIBLE_TOKEN = 1

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
    obtainCustodialAddressType: (
      body: ChainGenerateCustodialAddress | ChainGenerateCustodialWalletCelo,
    ): ContractAbi => {
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
      body: ChainTransferCustodialWallet,
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
      if (body.contractType === NATIVE_ASSET) {
        amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
        // @TODO OPENAPI FUNGIBLE_TOKEN
      } else if (body.contractType === FUNGIBLE_TOKEN) {
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
      testnet: boolean,
      provider?: string,
    ) => {
      const amounts = []
      const tokenIds = []

      for (let i = 0; i < body.contractType.length; i++) {
        let amount = new BigNumber(body.amount ? body.amount[i] : 0)
        let tokenId = new BigNumber(body.tokenId ? body.tokenId[i] : 0)
        if (body.contractType[i] === NATIVE_ASSET) {
          amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
        } else if (body.contractType[i] === NON_FUNGIBLE_TOKEN) {
          amount = new BigNumber(0)
        } else if (body.contractType[i] === FUNGIBLE_TOKEN && body.tokenAddress) {
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
        (body.chain === Currency.CELO
          ? { ...r, feeCurrency: body.feeCurrency || Currency.CELO }
          : r) as SCBody,
        web3,
        provider,
      )
    },

    prepareCustodialWalletBatchAbstract: async (
      body: ChainGenerateCustodialWalletBatch,
      web3: EvmBasedWeb3,
      getCustodialFactoryContractAddress: (testnet: boolean) => string,
      testnet: boolean,
      convertAddressToHex?: (address: string) => string,
    ) => {
      const params = [body.owner.trim(), `0x${new BigNumber(body.batchCount).toString(16)}`]

      const methodName = 'cloneNewWallet'
      const methodSig = undefined
      const bodyWithContractAddress = {
        ...body,
        contractAddress: getCustodialFactoryContractAddress(testnet),
      }
      return { params, methodName, methodSig, bodyWithContractAddress }
    },
  }
}

import { GenerateCustodialWallet } from '@tatumio/api-client'
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

const FUNGIBLE = 1
const NON_FUNGIBLE = 2
const SEMI_FUNGIBLE = 4
const BATCH = 8

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
    obtainCustodialAddressType: (body: GenerateCustodialWallet): ContractAbi => {
      // @ts-ignore @TODO OPENAPI
      if (body.chain === GenerateCustodialWallet.chain.TRON && body.enableSemiFungibleTokens) {
        throw new Error('MultiToken not supported for TRON.')
      }

      const mask =
        (body.enableFungibleTokens && FUNGIBLE) |
        (body.enableNonFungibleTokens && NON_FUNGIBLE) |
        (body.enableSemiFungibleTokens && SEMI_FUNGIBLE) |
        (body.enableBatchTransactions && BATCH)

      if (!mask) throw new Error('Unsupported combination of inputs.')

      const mapping = MAPPING[mask]
      if (!mapping) throw new Error('Unsupported combination of inputs.')

      return mapping
    },

    /*    prepareTransferFromCustodialWalletAbstract: async <SCBody extends CallSmartContractMethod>(
      testnet: boolean,
      body: TransferCustodialWallet,
      getContractDecimals: (contractAddress: string, provider?: string, testnet?: boolean) => Promise<any>,
      prepareSmartContractWriteMethodInvocation: (
        r: SCBody,
        options?: {
          provider?: string
          testnet?: boolean
        },
      ) => Promise<string>,
      SmartContractMethodInvocationCtor: any,
      decimals: number,
      validateClass: any,
      provider?: string,
    ) => {
      const r: CallSmartContractMethod = new SmartContractMethodInvocationCtor()
      r.fee = body.fee
      r.nonce = body.nonce
      r.fromPrivateKey = body.fromPrivateKey
      r.signatureId = body.signatureId
      r.index = body.index
      r.contractAddress = body.custodialAddress
      r.methodName = 'transfer'
      let amount = new BigNumber(body.amount || 0)
      let tokenId = new BigNumber(body.tokenId || 0)
      // @TODO OPENAPI NATIVE_ASSET
      if (body.contractType === TransferCustodialWallet.contractType._3) {
        amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
        // @TODO OPENAPI FUNGIBLE_TOKEN
      } else if (body.contractType === TransferCustodialWallet.contractType._0) {
        tokenId = new BigNumber(0)
        amount = amount.multipliedBy(
          new BigNumber(10).pow(await getContractDecimals(body.tokenAddress, provider, testnet)),
        )
      }
      r.params = [
        body.tokenAddress || '0x000000000000000000000000000000000000dEaD',
        body.contractType,
        body.recipient,
        `0x${amount.toString(16)}`,
        `0x${new BigNumber(tokenId).toString(16)}`,
      ]
      r.methodABI = CustodialFullTokenWallet.abi.find((a) => a.name === 'transfer')
      return await prepareSmartContractWriteMethodInvocation(
        // @ts-ignore @TODO
        (body.chain === TransferCustodialWallet.chain.CELO
          ? { ...r, feeCurrency: body.feeCurrency || Currency.CELO }
          : r) as SCBody,
        {
          provider,
          testnet,
        },
      )
    },*/
  }
}

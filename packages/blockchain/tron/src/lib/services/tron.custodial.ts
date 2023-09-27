import {
  Currency,
  GasPumpService,
  TransferCustodialWalletBatchTron,
  TransferCustodialWalletBatchTronKMS,
  TransferCustodialWalletTron,
  TransferCustodialWalletTronKMS,
  TronService,
} from '@tatumio/api-client'
import { ITronWeb } from './tron.web'
import { tronTx } from './tron.tx'
import { CustodialFullTokenWallet } from '@tatumio/shared-blockchain-evm-based'
import BigNumber from 'bignumber.js'
import { FromPrivateKeyOrSignatureIdTron } from '@tatumio/shared-blockchain-abstract'
import { CallSmartContract, TronGenerateCustodialWallet } from './tron.tx'
import { WithoutChain } from '@tatumio/shared-abstract-sdk'
import { Blockchain } from '@tatumio/shared-core'
// @ts-ignore
import TronWeb from 'tronweb'

const NATIVE_ASSET_CONTRACT_TYPE = 3
const NON_FUNGIBLE_TOKEN_CONTRACT_TYPE = 1
const FUNGIBLE_TOKEN_CONTRACT_TYPE = 0

type TronTransferCustodial = WithoutChain<FromPrivateKeyOrSignatureIdTron<TransferCustodialWalletTron>>
type TronTransferBatchCustodial = WithoutChain<
  FromPrivateKeyOrSignatureIdTron<TransferCustodialWalletBatchTron>
>

const convertAddressToHex = (address: string) => TronWeb.address.toHex(address)

const prepareTransferFromCustodialWallet = async (
  body: TronTransferCustodial,
  getContractDecimals: (contractAddress: string, provider?: string, testnet?: boolean) => Promise<number>,
  tronWeb: ITronWeb,
  provider?: string,
  decimals = 18,
  testnet = false,
) => {
  const methodName = 'transfer(address,uint256,address,uint256,uint256)'

  let tokenId = new BigNumber(body.tokenId ?? 0)
  let amount = new BigNumber(body.amount ?? 0)
  if (body.contractType === NATIVE_ASSET_CONTRACT_TYPE) {
    amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
  } else if (body.contractType === FUNGIBLE_TOKEN_CONTRACT_TYPE) {
    tokenId = new BigNumber(0)

    if (!body.tokenAddress) {
      throw new Error('No tokenAddress specified which is needed for FUNGIBLE_TOKEN_CONTRACT_TYPE')
    }

    amount = amount.multipliedBy(
      new BigNumber(10).pow(await getContractDecimals(body.tokenAddress, provider, testnet)),
    )
  }

  const fee = {
    gasLimit: body.feeLimit.toString(),
    gasPrice: '0',
  }

  const { tokenAddress, contractType, recipient } = body

  const params: CallSmartContract = {
    ...body,
    methodName,
    contractAddress: body.custodialAddress,
    methodABI: CustodialFullTokenWallet.abi.find((abi) => abi.name === methodName),
    params: [
      {
        type: 'address',
        value: convertAddressToHex(tokenAddress || '0x000000000000000000000000000000000000dEaD'),
      },
      { type: 'uint256', value: contractType },
      { type: 'address', value: convertAddressToHex(recipient) },
      { type: 'uint256', value: `0x${amount.toString(16)}` },
      { type: 'uint256', value: `0x${new BigNumber(tokenId).toString(16)}` },
    ],
    fee,
  }

  return tronTx({ tronWeb }).smartContract.prepare.smartContractInvocation(params, provider)
}

const prepareBatchTransferFromCustodialWallet = async (
  body: TronTransferBatchCustodial,
  getContractDecimals: (contractAddress: string, provider?: string, testnet?: boolean) => Promise<number>,
  tronWeb: ITronWeb,
  provider?: string,
  decimals = 6,
  testnet = false,
) => {
  const methodName = 'transferBatch'

  const amounts: string[] = []
  const tokenIds: string[] = []
  for (let i = 0; i < body.contractType.length; i++) {
    let amount = new BigNumber(body.amount ? body.amount[i] : 0)
    let tokenId = new BigNumber(body.tokenId ? body.tokenId[i] : 0)

    if (body.contractType[i] === NATIVE_ASSET_CONTRACT_TYPE) {
      amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
    } else if (body.contractType[i] === NON_FUNGIBLE_TOKEN_CONTRACT_TYPE) {
      amount = new BigNumber(0)
    } else if (body.contractType[i] === FUNGIBLE_TOKEN_CONTRACT_TYPE && body.tokenAddress) {
      tokenId = new BigNumber(0)
      amount = amount.multipliedBy(
        new BigNumber(10).pow(await getContractDecimals(body.tokenAddress[i], provider, testnet)),
      )
    }

    amounts.push(`0x${amount.toString(16)}`)
    tokenIds.push(`0x${tokenId.toString(16)}`)
  }

  const params: CallSmartContract = {
    ...body,
    amount: undefined,
    methodName,
    contractAddress: body.custodialAddress,
    methodABI: CustodialFullTokenWallet.abi.find((abi) => abi.name === methodName),
    params: [
      (body.tokenAddress || []).map((t) => (t === '0' ? '0x000000000000000000000000000000000000dEaD' : t)),
      body.contractType,
      body.recipient,
      amounts,
      tokenIds,
    ],
  }

  return tronTx({ tronWeb }).smartContract.prepare.smartContractInvocation(params, provider)
}

export const tronCustodial = (args: { tronWeb: ITronWeb }) => {
  return {
    prepare: {
      /**
       * This method is @Deprecated. Use @link{prepareCustodialWalletBatch} instead
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWallet: async (body: TronGenerateCustodialWallet, provider?: string) =>
        tronTx(args).custodial.prepare.generateCustodialWalletSignedTransaction(body, provider),
      /**
       * Prepare signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: (
        body: TronTransferCustodial,
        getContractDecimals: (
          contractAddress: string,
          provider?: string,
          testnet?: boolean,
        ) => Promise<number>,
        provider?: string,
        decimals = 18,
        testnet = false,
      ) =>
        prepareTransferFromCustodialWallet(
          body,
          getContractDecimals,
          args.tronWeb,
          provider,
          decimals,
          testnet,
        ),
      /**
       * Prepare signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: (
        body: TronTransferBatchCustodial,
        getContractDecimals: (
          contractAddress: string,
          provider?: string,
          testnet?: boolean,
        ) => Promise<number>,
        provider?: string,
        decimals = 6,
        testnet = false,
      ) =>
        prepareBatchTransferFromCustodialWallet(
          body,
          getContractDecimals,
          args.tronWeb,
          provider,
          decimals,
          testnet,
        ),
    },
    send: {
      /**
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWallet: async (body: TronGenerateCustodialWallet, provider?: string) =>
        tronTx(args).custodial.send.generateCustodialWalletSignedTransaction(body, provider),
      /**
       * Send signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: async (
        body: TronTransferCustodial,
        getContractDecimals: (
          contractAddress: string,
          provider?: string,
          testnet?: boolean,
        ) => Promise<number>,
        provider?: string,
        decimals = 18,
        testnet = false,
      ) => {
        if (body.signatureId) {
          return GasPumpService.transferCustodialWallet({
            ...body,
            chain: Blockchain.TRON,
          } as TransferCustodialWalletTronKMS)
        } else {
          return TronService.tronBroadcast({
            txData: await prepareTransferFromCustodialWallet(
              body,
              getContractDecimals,
              args.tronWeb,
              provider,
              decimals,
              testnet,
            ),
          })
        }
      },

      /**
       * Send signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        body: TronTransferBatchCustodial,
        getContractDecimals: (
          contractAddress: string,
          provider?: string,
          testnet?: boolean,
        ) => Promise<number>,
        provider?: string,
        decimals = 6,
        testnet = false,
      ) => {
        if (body.signatureId) {
          return GasPumpService.transferCustodialWalletBatch({
            ...body,
            chain: Blockchain.TRON,
          } as TransferCustodialWalletBatchTronKMS)
        } else {
          return TronService.tronBroadcast({
            txData: await prepareBatchTransferFromCustodialWallet(
              body,
              getContractDecimals,
              args.tronWeb,
              provider,
              decimals,
              testnet,
            ),
          })
        }
      },
    },
  }
}

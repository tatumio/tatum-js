import {
  BroadcastFunction,
  ChainApproveCustodialTransfer,
  ChainBatchTransferCustodialWallet,
  ChainGenerateCustodialWalletBatch,
  ChainTransferCustodialWallet,
} from '@tatumio/shared-blockchain-abstract'
import { CUSTODIAL_PROXY_ABI, EvmBasedBlockchain } from '@tatumio/shared-core'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedCustodial } from '../../services/evm-based.custodial'
import { smartContractWriteMethodInvocation } from '../smartContract'
import BigNumber from 'bignumber.js'
import { CustodialFullTokenWallet } from '../../contracts'
import { evmBasedSmartContract } from '../../services/evm-based.smartContract'
import { evmBasedUtils } from '../../evm-based.utils'
import { ApiServices, GenerateCustodialWalletBatchPayer, TransactionHashKMS } from '@tatumio/api-client'

const transferFromCustodialWallet = async (
  body: ChainTransferCustodialWallet,
  web3: EvmBasedWeb3,
  testnet?: boolean,
  provider?: string,
) => {
  return evmBasedCustodial().prepareTransferFromCustodialWalletAbstract(
    body,
    web3,
    evmBasedUtils.decimals,
    smartContractWriteMethodInvocation,
    18,
    testnet,
    provider,
  )
}

const batchTransferFromCustodialWallet = async (
  body: ChainBatchTransferCustodialWallet,
  web3: EvmBasedWeb3,
  testnet?: boolean,
  provider?: string,
) => {
  return evmBasedCustodial().prepareBatchTransferFromCustodialWalletAbstract(
    body,
    web3,
    evmBasedUtils.decimals,
    smartContractWriteMethodInvocation,
    18,
    testnet,
    provider,
  )
}

const approveFromCustodialWallet = async (
  body: ChainApproveCustodialTransfer,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  // ContractType FUNGIBLE_TOKEN = 0
  const decimals =
    body.contractType === 0 ? await evmBasedUtils.decimals(body.tokenAddress!, web3, provider) : 0
  const params = [
    body.tokenAddress!.trim(),
    body.contractType,
    body.spender,
    `0x${new BigNumber(body.amount || 0).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
    `0x${new BigNumber(body.tokenId || 0).toString(16)}`,
  ]
  delete body.amount

  return await evmBasedSmartContract(web3).helperPrepareSCCall(
    {
      ...body,
      contractAddress: body.custodialAddress,
    } as ChainApproveCustodialTransfer & { contractAddress: string },
    'approve',
    params,
    provider,
    CustodialFullTokenWallet.abi,
  )
}

const generateCustodialBatch = async (body: GenerateCustodialWalletBatchPayer) => {
  const request = await ApiServices.blockchain.utils.generateCustodialWalletBatch(body)
  if (!(request as TransactionHashKMS)?.failed) return (request as TransactionHashKMS)?.txId
  else throw new Error('Unable to generate custodial wallet address.')
}

const custodialWalletBatch = async (
  body: ChainGenerateCustodialWalletBatch,
  web3: EvmBasedWeb3,
  testnet?: boolean,
  provider?: string,
) => {
  const { params, methodName, bodyWithContractAddress } =
    await evmBasedCustodial().prepareCustodialWalletBatchAbstract(body, web3, testnet)
  return await evmBasedSmartContract(web3).helperPrepareSCCall(
    bodyWithContractAddress,
    methodName,
    params,
    provider,
    [CUSTODIAL_PROXY_ABI],
  )
}

export const custodial = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      /**
       * Prepare signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: async (
        body: ChainTransferCustodialWallet,
        testnet?: boolean,
        provider?: string,
      ) => transferFromCustodialWallet(body, args.web3, testnet, provider),
      /**
       * Prepare signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        body: ChainBatchTransferCustodialWallet,
        testnet?: boolean,
        provider?: string,
      ) => batchTransferFromCustodialWallet(body, args.web3, testnet, provider),
      /**
       * Prepare signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider?: string) =>
        approveFromCustodialWallet(body, args.web3, provider),
      /**
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWalletBatch: async (
        body: ChainGenerateCustodialWalletBatch,
        testnet?: boolean,
        provider?: string,
      ) => custodialWalletBatch(body, args.web3, testnet, provider),
    },
    send: {
      /**
       * Send signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: async (
        body: ChainTransferCustodialWallet,
        testnet?: boolean,
        provider?: string,
      ) =>
        args.broadcastFunction({
          txData: await transferFromCustodialWallet(body, args.web3, testnet, provider),
          signatureId: body.signatureId,
        }),

      /**
       * Send signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        body: ChainBatchTransferCustodialWallet,
        testnet?: boolean,
        provider?: string,
      ) =>
        args.broadcastFunction({
          txData: await batchTransferFromCustodialWallet(body, args.web3, testnet, provider),
          signatureId: 'signatureId' in body ? body.signatureId : undefined,
        }),
      /**
       * Send signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider?: string) =>
        args.broadcastFunction({
          txData: await approveFromCustodialWallet(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWalletBatch: async (
        body: ChainGenerateCustodialWalletBatch,
        testnet?: boolean,
        provider?: string,
      ) =>
        'feesCovered' in body
          ? generateCustodialBatch(body)
          : args.broadcastFunction({
              txData: await custodialWalletBatch(body, args.web3, testnet, provider),
              signatureId: 'signatureId' in body ? body.signatureId : undefined,
            }),
    },
  }
}

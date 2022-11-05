import {
  BroadcastFunction,
  ChainApproveCustodialTransfer,
  ChainBatchTransferCustodialWallet,
  ChainGenerateCustodialWalletBatch,
  ChainTransferCustodialWallet,
} from '@tatumio/shared-blockchain-abstract'
import { CUSTODIAL_PROXY_ABI } from '@tatumio/shared-core'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedCustodial } from '../../services/evm-based.custodial'
import { smartContractWriteMethodInvocation } from '../smartContract'
import BigNumber from 'bignumber.js'
import { CustodialFullTokenWallet } from '../../contracts'
import { evmBasedSmartContract } from '../../services/evm-based.smartContract'
import { AddressTransformer, AddressTransformerDefault, evmBasedUtils } from '../../evm-based.utils'
import {
  ApiServices,
  ApproveTransferCustodialWalletKMS,
  GasPumpService,
  GenerateCustodialWalletBatchPayer,
  TransactionHash,
  TransferCustodialWalletBatchKMS,
  TransferCustodialWalletKMS,
} from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

const transferFromCustodialWallet = async ({
  body,
  web3,
  testnet,
  provider,
  addressTransformer,
}: {
  body: ChainTransferCustodialWallet
  web3: EvmBasedWeb3
  testnet?: boolean
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const normalizedBody = {
    ...body,
    custodialAddress: addressTransformer(body.custodialAddress?.trim()),
    recipient: addressTransformer(body.recipient?.trim()),
    tokenAddress: addressTransformer(body.tokenAddress?.trim()),
  }
  return evmBasedCustodial().prepareTransferFromCustodialWalletAbstract(
    normalizedBody,
    web3,
    evmBasedUtils.decimals,
    smartContractWriteMethodInvocation,
    18,
    testnet,
    provider,
  )
}

const batchTransferFromCustodialWallet = async ({
  body,
  web3,
  testnet,
  provider,
  addressTransformer,
}: {
  body: ChainBatchTransferCustodialWallet
  web3: EvmBasedWeb3
  testnet?: boolean
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const normalizedBody = {
    ...body,
    custodialAddress: addressTransformer(body.custodialAddress?.trim()),
    recipient: body.recipient.map((r) => addressTransformer(r?.trim())),
    tokenAddress: body.tokenAddress?.map((t) => addressTransformer(t?.trim())),
  }
  return evmBasedCustodial().prepareBatchTransferFromCustodialWalletAbstract(
    normalizedBody,
    web3,
    evmBasedUtils.decimals,
    smartContractWriteMethodInvocation,
    18,
    testnet,
    provider,
  )
}

const approveFromCustodialWallet = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainApproveCustodialTransfer
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const custodialAddress = addressTransformer(body.custodialAddress?.trim())
  const tokenAddress = addressTransformer(body.tokenAddress?.trim())

  // ContractType FUNGIBLE_TOKEN = 0
  const decimals = body.contractType === 0 ? await evmBasedUtils.decimals(tokenAddress, web3, provider) : 0
  const params = [
    tokenAddress,
    body.contractType,
    body.spender,
    `0x${new BigNumber(body.amount || 0).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
    `0x${new BigNumber(body.tokenId || 0).toString(16)}`,
  ]
  delete body.amount

  return await evmBasedSmartContract(web3).helperPrepareSCCall(
    {
      ...body,
      contractAddress: custodialAddress,
    } as ChainApproveCustodialTransfer & { contractAddress: string },
    'approve',
    params,
    provider,
    CustodialFullTokenWallet.abi,
  )
}

const generateCustodialBatch = async (body: GenerateCustodialWalletBatchPayer) => {
  const request = await ApiServices.blockchain.gasPump.generateCustodialWalletBatch(body)
  if (request) return (request as TransactionHash).txId
  else throw new Error('Unable to generate custodial wallet address.')
}

const custodialWalletBatch = async ({
  body,
  web3,
  testnet,
  provider,
  addressTransformer = AddressTransformerDefault,
}: {
  body: ChainGenerateCustodialWalletBatch
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer?: AddressTransformer
  testnet?: boolean
}) => {
  const { params, methodName, bodyWithContractAddress } =
    await evmBasedCustodial().prepareCustodialWalletBatchAbstract({ body, testnet, addressTransformer })

  return await evmBasedSmartContract(web3).helperPrepareSCCall(
    bodyWithContractAddress,
    methodName,
    params,
    provider,
    [CUSTODIAL_PROXY_ABI],
  )
}

export const custodial = ({
  web3,
  broadcastFunction,
  addressTransformer = AddressTransformerDefault,
}: {
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
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
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => transferFromCustodialWallet({ body, web3, testnet, provider, addressTransformer }),
          SdkErrorCode.EVM_CUSTODIAL_CANNOT_PREPARE_TRANSFER_TX,
        ),
      /**
       * Prepare signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        body: ChainBatchTransferCustodialWallet,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => batchTransferFromCustodialWallet({ body, web3, testnet, provider, addressTransformer }),
          SdkErrorCode.EVM_CUSTODIAL_CANNOT_PREPARE_TRANSFER_BATCH_TX,
        ),
      /**
       * Prepare signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider?: string) =>
        evmBasedUtils.tryCatch(
          () => approveFromCustodialWallet({ body, web3, provider, addressTransformer }),
          SdkErrorCode.EVM_CUSTODIAL_CANNOT_PREPARE_APPROVE_TX,
        ),
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
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => custodialWalletBatch({ body, web3, testnet, provider, addressTransformer }),
          SdkErrorCode.EVM_CUSTODIAL_CANNOT_PREPARE_DEPLOY_TX,
        ),
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
        provider?: string,
        testnet?: boolean,
      ) => {
        if (body.signatureId) {
          return GasPumpService.transferCustodialWallet(body as TransferCustodialWalletKMS)
        } else {
          return broadcastFunction({
            txData: await transferFromCustodialWallet({ body, web3, testnet, provider, addressTransformer }),
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
        body: ChainBatchTransferCustodialWallet,
        provider?: string,
        testnet?: boolean,
      ) => {
        if (body.signatureId) {
          return GasPumpService.transferCustodialWalletBatch(body as TransferCustodialWalletBatchKMS)
        } else {
          return broadcastFunction({
            txData: await batchTransferFromCustodialWallet({
              body,
              web3,
              testnet,
              provider,
              addressTransformer,
            }),
          })
        }
      },
      /**
       * Send signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider?: string) => {
        if (body.signatureId) {
          return GasPumpService.approveTransferCustodialWallet(body as ApproveTransferCustodialWalletKMS)
        } else {
          return broadcastFunction({
            txData: await approveFromCustodialWallet({ body, web3, provider, addressTransformer }),
          })
        }
      },
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
        provider?: string,
        testnet?: boolean,
      ) => {
        if ('feesCovered' in body) {
          return generateCustodialBatch(body)
        } else if ('signatureId' in body) {
          return GasPumpService.generateCustodialWalletBatch(body)
        } else {
          return broadcastFunction({
            txData: await custodialWalletBatch({ body, web3, testnet, provider, addressTransformer }),
          })
        }
      },
    },
  }
}

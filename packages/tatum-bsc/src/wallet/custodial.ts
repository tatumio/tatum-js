import {
  prepareTransferFromCustodialWalletAbstract,
  prepareBatchTransferFromCustodialWalletAbstract,
  prepareCustodialWalletBatchAbstract,
  getCustodialAddresses as getCustodialAddressesDefi,
} from '@tatumio/tatum-defi'
import {
  TransferFromCustodialAddress,
  SmartContractMethodInvocation,
  TransferFromCustodialAddressBatch,
  ApproveCustodialTransfer,
  validateBody,
  ContractType,
  CustodialFullTokenWallet,
  CUSTODIAL_PROXY_ABI,
  ChainGenerateCustodialAddress,
  ChainTransferFromCustodialAddress,
  Currency,
  ChainTransferFromCustodialAddressBatch,
  ChainApproveCustodialTransfer,
  ChainGenerateCustodialAddressBatch,
} from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'
import { getErc20Decimals } from '../fungible'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import {
  getBep20ContractDecimals,
  prepareGenerateCustodialWalletSignedTransaction,
  prepareSmartContractWriteMethodInvocation,
  sendGenerateCustodialWalletSignedTransaction,
} from '../transaction'

export const getCustodialAddresses = async (txId: string) => {
  return getCustodialAddressesDefi(Currency.BSC, txId)
}

/**
 * This method is @Deprecated. Use @link{generateCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (body: ChainGenerateCustodialAddress, provider?: string) => {
  console.log('This method is deprecated. For better gas consumption, use generateCustodialWalletBatch.')
  return await sendGenerateCustodialWalletSignedTransaction(body, provider)
}

/**
 * This method is @Deprecated. Use @link{prepareCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (body: ChainGenerateCustodialAddress, provider?: string) => {
  console.log('This method is deprecated. For better gas consumption, use prepareCustodialWalletBatch.')
  return await prepareGenerateCustodialWalletSignedTransaction(body, provider)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (body: ChainGenerateCustodialAddress, provider?: string) => {
  const txData = await prepareGenerateCustodialWalletSignedTransaction(body, provider)
  return helperBroadcastTx(txData, body.signatureId)
}

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (testnet: boolean, body: ChainTransferFromCustodialAddress, provider?: string) => {
  return prepareTransferFromCustodialWalletAbstract(
    testnet,
    { ...body, chain: Currency.BSC },
    getBep20ContractDecimals,
    prepareSmartContractWriteMethodInvocation,
    SmartContractMethodInvocation,
    18,
    TransferFromCustodialAddress,
    provider
  )
}

/**
 * Send signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendTransferFromCustodialWallet = async (testnet: boolean, body: ChainTransferFromCustodialAddress, provider?: string) =>
  helperBroadcastTx(await prepareTransferFromCustodialWallet(testnet, body, provider), body.signatureId)

/**
 * Prepare signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareBatchTransferFromCustodialWallet = async (
  testnet: boolean,
  body: ChainTransferFromCustodialAddressBatch,
  provider?: string
) => {
  return prepareBatchTransferFromCustodialWalletAbstract(
    testnet,
    { ...body, chain: Currency.BSC },
    getBep20ContractDecimals,
    prepareSmartContractWriteMethodInvocation,
    SmartContractMethodInvocation,
    18,
    TransferFromCustodialAddressBatch,
    provider
  )
}

/**
 * Send signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendBatchTransferFromCustodialWallet = async (
  testnet: boolean,
  body: ChainTransferFromCustodialAddressBatch,
  provider?: string
) => helperBroadcastTx(await prepareBatchTransferFromCustodialWallet(testnet, body, provider), body.signatureId)

/**
 * Prepare signed approve transaction from the custodial SC wallet.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareApproveFromCustodialWallet = async (body: ChainApproveCustodialTransfer, provider?: string) => {
  ;(body as ApproveCustodialTransfer).chain = Currency.BSC
  await validateBody(body, ApproveCustodialTransfer)

  const decimals = body.contractType === ContractType.FUNGIBLE_TOKEN ? await getErc20Decimals(body.tokenAddress, provider) : 0
  const params = [
    body.tokenAddress.trim(),
    body.contractType,
    body.spender,
    `0x${new BigNumber(body.amount || 0).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
    `0x${new BigNumber(body.tokenId || 0).toString(16)}`,
  ]
  delete body.amount
  return await helperPrepareSCCall(
    {
      ...body,
      contractAddress: body.custodialAddress,
    } as ApproveCustodialTransfer & { contractAddress: string },
    'approve',
    params,
    provider,
    CustodialFullTokenWallet.abi
  )
}

/**
 * Send signed approve transaction from the custodial SC wallet.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendApproveFromCustodialWallet = async (body: ChainApproveCustodialTransfer, provider?: string) =>
  helperBroadcastTx(await prepareApproveFromCustodialWallet(body, provider), body.signatureId)
/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWalletBatch = async (testnet: boolean, body: ChainGenerateCustodialAddressBatch, provider?: string) => {
  const txData = await prepareCustodialWalletBatch(testnet, body, provider)
  return helperBroadcastTx(txData, body.signatureId)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWalletBatch = async (testnet: boolean, body: ChainGenerateCustodialAddressBatch, provider?: string) => {
  const { params, methodName, bodyWithContractAddress } = await prepareCustodialWalletBatchAbstract(
    testnet,
    { ...body, chain: Currency.BSC },
    getCustodialFactoryContractAddress
  )
  return await helperPrepareSCCall(bodyWithContractAddress, methodName, params, provider, [CUSTODIAL_PROXY_ABI])
}

const getCustodialFactoryContractAddress = (testnet: boolean) => {
  return testnet ? '0x6709Bdda623aF7EB152cB2fE2562aB7e031e564f' : '0x1cfc7878Cf6Ae32A50F84481690F6fB04574de21'
}

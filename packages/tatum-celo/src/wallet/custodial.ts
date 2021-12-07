import {
  prepareBatchTransferFromCustodialWalletAbstract,
  prepareCustodialWalletBatchAbstract,
  prepareTransferFromCustodialWalletAbstract,
  getCustodialAddresses as getCustodialAddressesDefi,
} from '@tatumio/tatum-defi'
import {
  ApproveCustodialTransfer,
  TransferFromCustodialAddress,
  TransferFromCustodialAddressBatch,
  ContractType,
  CustodialFullTokenWallet,
  validateBody,
  CUSTODIAL_PROXY_ABI,
  CeloSmartContractMethodInvocation,
  ChainGenerateCustodialAddress,
  ChainTransferFromCustodialAddress,
  Currency,
  ChainTransferFromCustodialAddressBatch,
  ChainApproveCustodialTransfer,
  ChainGenerateCustodialAddressBatch,
} from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'
import {
  sendCeloGenerateCustodialWalletSignedTransaction,
  prepareCeloGenerateCustodialWalletSignedTransaction,
  getCeloErc20ContractDecimals,
  prepareCeloSmartContractWriteMethodInvocation,
} from '../'
import { getErc20Decimals } from '../fungible'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

export const getCustodialAddresses = async (txId: string) => {
  return getCustodialAddressesDefi(Currency.CELO, txId)
}

/**
 * This method is @Deprecated. Use @link{generateCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (testnet: boolean, body: ChainGenerateCustodialAddress, provider?: string) => {
  console.log('This method is deprecated. For better gas consumption, use generateCustodialWalletBatch.')
  return await sendCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider)
}

/**
 * This method is @Deprecated. Use @link{prepareCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (testnet: boolean, body: ChainGenerateCustodialAddress, provider?: string) => {
  console.log('This method is deprecated. For better gas consumption, use prepareCustodialWalletBatch.')
  return await prepareCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider)
}

const getCustodialFactoryContractAddress = (testnet: boolean) => {
  return testnet ? '0x6C4B2ed1EaBcE4925f0F3d5Cf36e432C28d8A6dd' : '0x3b0B6734AC81252dD1d2B26FA3A4605e7eB96997'
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (testnet: boolean, body: ChainGenerateCustodialAddress, provider?: string) => {
  const txData = await prepareCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider)
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
    { ...body, chain: Currency.CELO },
    getCeloErc20ContractDecimals,
    prepareCeloSmartContractWriteMethodInvocation,
    CeloSmartContractMethodInvocation,
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
    { ...body, chain: Currency.CELO },
    getCeloErc20ContractDecimals,
    prepareCeloSmartContractWriteMethodInvocation,
    CeloSmartContractMethodInvocation,
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
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareApproveFromCustodialWallet = async (testnet: boolean, body: ChainApproveCustodialTransfer, provider?: string) => {
  ;(body as ApproveCustodialTransfer).chain = Currency.CELO
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
  const b = {
    ...body,
    contractAddress: body.custodialAddress,
  }
  return await helperPrepareSCCall(testnet, b, 'approve', params, provider, CustodialFullTokenWallet.abi)
}
/**
 * Send signed approve transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendApproveFromCustodialWallet = async (testnet: boolean, body: ChainApproveCustodialTransfer, provider?: string) =>
  helperBroadcastTx(await prepareApproveFromCustodialWallet(testnet, body, provider), body.signatureId)

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
    { ...body, chain: Currency.CELO },
    getCustodialFactoryContractAddress
  )
  return await helperPrepareSCCall(testnet, bodyWithContractAddress, methodName, params, provider, [CUSTODIAL_PROXY_ABI])
}

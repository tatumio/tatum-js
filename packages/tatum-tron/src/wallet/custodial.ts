import {
  prepareTransferFromCustodialWalletAbstract,
  prepareBatchTransferFromCustodialWalletAbstract,
  prepareCustodialWalletBatchAbstract,
} from '@tatumio/tatum-defi'
import {
  ChainGenerateTronCustodialAddress,
  ChainTransferFromTronCustodialAddress,
  ChainTransferFromTronCustodialAddressBatch,
  TransferFromTronCustodialAddressBatch,
} from '../model'
import {
  ChainGenerateCustodialAddressBatch,
  Currency,
  CUSTODIAL_PROXY_ABI,
  SmartContractMethodInvocation,
  TransferFromCustodialAddress,
} from '@tatumio/tatum-core'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import {
  convertAddressToHex,
  getTronTrc20ContractDecimals,
  prepareTronCustodialTransferBatch,
  prepareTronGenerateCustodialWalletSignedTransaction,
  prepareTronSmartContractInvocation,
  sendTronGenerateCustodialWalletSignedTransaction,
} from '../transaction'

/**
 * This method is @Deprecated. Use @link{generateCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (body: ChainGenerateTronCustodialAddress, provider?: string) => {
  console.log('This method is deprecated. For better gas consumption, use prepareCustodialWalletBatch.')
  return await sendTronGenerateCustodialWalletSignedTransaction(body, provider)
}
/**
 * This method is @Deprecated. Use @link{prepareCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (body: ChainGenerateTronCustodialAddress, provider?: string) => {
  console.log('This method is deprecated. For better gas consumption, use prepareCustodialWalletBatch.')
  return await prepareTronGenerateCustodialWalletSignedTransaction(body, provider)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (body: ChainGenerateTronCustodialAddress, provider?: string) => {
  const txData = await prepareTronGenerateCustodialWalletSignedTransaction(body, provider)
  return helperBroadcastTx(txData, body.signatureId)
}

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (
  testnet: boolean,
  body: ChainTransferFromTronCustodialAddress,
  provider?: string
) => {
  const { feeLimit, from } = body
  return prepareTransferFromCustodialWalletAbstract(
    testnet,
    { ...body, chain: Currency.TRON },
    getTronTrc20ContractDecimals,
    (r) => prepareTronSmartContractInvocation(r, feeLimit as number, from),
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
export const sendTransferFromCustodialWallet = async (testnet: boolean, body: ChainTransferFromTronCustodialAddress, provider?: string) =>
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
  body: ChainTransferFromTronCustodialAddressBatch,
  provider?: string
) => {
  const { feeLimit, from } = body
  return prepareBatchTransferFromCustodialWalletAbstract(
    testnet,
    { ...body, chain: Currency.TRON },
    getTronTrc20ContractDecimals,
    (r) => prepareTronCustodialTransferBatch(r, feeLimit as number, from),
    SmartContractMethodInvocation,
    18,
    TransferFromTronCustodialAddressBatch,
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
  body: ChainTransferFromTronCustodialAddressBatch,
  provider?: string
) => helperBroadcastTx(await prepareBatchTransferFromCustodialWallet(testnet, body, provider), body.signatureId)
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
  const { params, methodName, methodSig, bodyWithContractAddress } = await prepareCustodialWalletBatchAbstract(
    testnet,
    { ...body, chain: Currency.TRON },
    getCustodialFactoryContractAddress,
    convertAddressToHex
  )
  return await helperPrepareSCCall(bodyWithContractAddress, methodName, params, methodSig, provider, [CUSTODIAL_PROXY_ABI])
}

const getCustodialFactoryContractAddress = (testnet: boolean) => {
  return testnet ? 'TH8SiZrN3GFs932ATPZdkyJ2e1NQaSsJ9c' : 'TLLfWsi4VBDZyLCsrFgrmnazvJmoeyGA9H'
}

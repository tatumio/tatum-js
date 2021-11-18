import { prepareTransferFromCustodialWalletAbstract, prepareBatchTransferFromCustodialWalletAbstract } from '@tatumio/tatum-defi'
import { GenerateTronCustodialAddress, TransferFromTronCustodialAddress, TransferFromTronCustodialAddressBatch } from '../model'
import { SmartContractMethodInvocation, TransferFromCustodialAddress } from '@tatumio/tatum-core'
import { helperBroadcastTx } from '../helpers'
import {
  getTronTrc20ContractDecimals,
  prepareTronCustodialTransferBatch,
  prepareTronGenerateCustodialWalletSignedTransaction,
  prepareTronSmartContractInvocation,
  sendTronGenerateCustodialWalletSignedTransaction,
} from '../transaction'

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (body: GenerateTronCustodialAddress, provider?: string) => {
  return await sendTronGenerateCustodialWalletSignedTransaction(body as GenerateTronCustodialAddress, provider)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (body: GenerateTronCustodialAddress, provider?: string) => {
  return await prepareTronGenerateCustodialWalletSignedTransaction(body as GenerateTronCustodialAddress, provider)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (body: GenerateTronCustodialAddress, provider?: string) => {
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
export const prepareTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromTronCustodialAddress, provider?: string) => {
  const { feeLimit, from } = body
  return prepareTransferFromCustodialWalletAbstract(
    testnet,
    body,
    getTronTrc20ContractDecimals,
    (r, provider) => prepareTronSmartContractInvocation(r, feeLimit as number, from, provider),
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
export const sendTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromTronCustodialAddress, provider?: string) =>
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
  body: TransferFromTronCustodialAddressBatch,
  provider?: string
) => {
  const { feeLimit, from } = body
  return prepareBatchTransferFromCustodialWalletAbstract(
    testnet,
    body,
    getTronTrc20ContractDecimals,
    (r, provider) => prepareTronCustodialTransferBatch(r, feeLimit as number, from, provider),
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
  body: TransferFromTronCustodialAddressBatch,
  provider?: string
) => helperBroadcastTx(await prepareBatchTransferFromCustodialWallet(testnet, body, provider), body.signatureId)

import {
  ApproveCustodialTransfer,
  ContractType,
  CustodialFullTokenWallet,
  GenerateCustodialAddress,
  prepareBatchTransferFromCustodialWalletAbstract,
  prepareTransferFromCustodialWalletAbstract,
  SmartContractMethodInvocation,
  TransferFromCustodialAddress,
  TransferFromCustodialAddressBatch,
  validateBody,
} from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'
import { getErc20Decimals } from '../fungible'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import {
  getEthErc20ContractDecimals,
  prepareEthGenerateCustodialWalletSignedTransaction,
  prepareSmartContractWriteMethodInvocation,
  sendEthGenerateCustodialWalletSignedTransaction,
} from '../transaction'

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (body: GenerateCustodialAddress, provider?: string) => {
  return await sendEthGenerateCustodialWalletSignedTransaction(body, provider)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (body: GenerateCustodialAddress, provider?: string) => {
  return await prepareEthGenerateCustodialWalletSignedTransaction(body, provider)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (body: GenerateCustodialAddress, provider?: string) => {
  const txData = await prepareEthGenerateCustodialWalletSignedTransaction(body, provider)
  return helperBroadcastTx(txData, body.signatureId)
}

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromCustodialAddress, provider?: string) => {
  return prepareTransferFromCustodialWalletAbstract(
    testnet,
    body,
    (_testnet, contractAddress, provider?) => getEthErc20ContractDecimals(contractAddress, provider),
    (_testnet, _body, r, provider) => prepareSmartContractWriteMethodInvocation(r, provider),
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
export const sendTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromCustodialAddress, provider?: string) =>
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
  body: TransferFromCustodialAddressBatch,
  provider?: string
) => {
  return prepareBatchTransferFromCustodialWalletAbstract(
    testnet,
    body,
    (_testnet, contractAddress, provider?) => getEthErc20ContractDecimals(contractAddress, provider),
    (_testnet, _body, r, provider) => prepareSmartContractWriteMethodInvocation(r, provider),
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
export const sendBatchTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromCustodialAddressBatch, provider?: string) =>
  helperBroadcastTx(await prepareBatchTransferFromCustodialWallet(testnet, body, provider), body.signatureId)

/**
 * Prepare signed approve transaction from the custodial SC wallet.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareApproveFromCustodialWallet = async (body: ApproveCustodialTransfer, provider?: string) => {
  await validateBody(body, ApproveCustodialTransfer)

  const decimals =
    body.contractType === ContractType.FUNGIBLE_TOKEN ? await getErc20Decimals(body.tokenAddress, provider) : 0
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
    },
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
export const sendApproveFromCustodialWallet = async (body: ApproveCustodialTransfer, provider?: string) =>
  helperBroadcastTx(await prepareApproveFromCustodialWallet(body, provider), body.signatureId)

import {
    ApproveCustodialTransfer,
    Currency,
    GenerateCustodialAddress,
    TransferFromCustodialAddress,
    TransferFromCustodialAddressBatch
} from "@tatumio/tatum-core";
import {getImplementationFor} from "src/utils";

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (currency: Currency, testnet: boolean, body: GenerateCustodialAddress, provider?: string) => {
    const blockchainGenerateCustodialWallet = await getImplementationFor(currency, 'generateCustodialWallet')
    return await blockchainGenerateCustodialWallet(testnet, body, provider)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (currency: Currency, testnet: boolean, body: GenerateCustodialAddress, provider?: string) => {
    const blockchainPrepareCustodialWallet = await getImplementationFor(currency, 'prepareCustodialWallet')
    return await blockchainPrepareCustodialWallet(testnet, body, provider)
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (currency: Currency, testnet: boolean, body: GenerateCustodialAddress, provider?: string) => {
    const blockchainSendCustodialWallet = await getImplementationFor(currency, 'sendCustodialWallet')
    return await blockchainSendCustodialWallet(testnet, body, provider)
}

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (currency: Currency, testnet: boolean, body: TransferFromCustodialAddress, provider?: string) => {
    const blockchainPrepareTransferFromCustodialWallet = await getImplementationFor(currency, 'prepareTransferFromCustodialWallet')
    return await blockchainPrepareTransferFromCustodialWallet(testnet, body, provider)
}

/**
 * Send signed transaction from the custodial SC wallet.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendTransferFromCustodialWallet = async (
    currency: Currency,
    testnet: boolean,
    body: TransferFromCustodialAddress,
    provider?: string
) => {
    const blockchainSendTransferFromCustodialWallet = await getImplementationFor(currency, 'sendTransferFromCustodialWallet')
    return await blockchainSendTransferFromCustodialWallet(testnet, body, provider)
}

/**
 * Prepare signed batch transaction from the custodial SC wallet.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareBatchTransferFromCustodialWallet = async (
    currency: Currency,
    testnet: boolean,
    body: TransferFromCustodialAddressBatch,
    provider?: string
) => {
    const blockchainPrepareBatchTransferFromCustodialWallet = await getImplementationFor(currency, 'prepareBatchTransferFromCustodialWallet')
    return await blockchainPrepareBatchTransferFromCustodialWallet(testnet, body, provider)
}

/**
 * Send signed batch transaction from the custodial SC wallet.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendBatchTransferFromCustodialWallet = async (currency: Currency, testnet: boolean, body: TransferFromCustodialAddressBatch, provider?: string) => {
    const blockchainSendBatchTransferFromCustodialWallet = await getImplementationFor(currency, 'sendBatchTransferFromCustodialWallet')
    return await blockchainSendBatchTransferFromCustodialWallet(testnet, body, provider)
}

/**
 * Prepare signed approve transaction from the custodial SC wallet.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareApproveFromCustodialWallet = async (currency: Currency, testnet: boolean, body: ApproveCustodialTransfer, provider?: string) => {
    const blockchainPrepareApproveFromCustodialWallet = await getImplementationFor(currency, 'prepareApproveFromCustodialWallet')
    return await blockchainPrepareApproveFromCustodialWallet(testnet, body, provider)
}

/**
 * Send signed approve transaction from the custodial SC wallet.
 * @param currency chain to work with
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendApproveFromCustodialWallet = async (currency: Currency, testnet: boolean, body: ApproveCustodialTransfer, provider?: string) => {
    const blockchainSendApproveFromCustodialWallet = await getImplementationFor(currency, 'sendApproveFromCustodialWallet')
    return await blockchainSendApproveFromCustodialWallet(testnet, body, provider)
}
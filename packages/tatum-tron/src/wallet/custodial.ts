import {
    prepareTransferFromCustodialWalletAbstract,
    prepareBatchTransferFromCustodialWalletAbstract
} from '@tatumio/tatum-defi';

import {
    GenerateTronCustodialAddress,
    TransferFromTronCustodialAddress,
    TransferFromTronCustodialAddressBatch
} from 'src/model';
import {
    SmartContractMethodInvocation,
    TransferFromCustodialAddress,
} from '@tatumio/tatum-core';
import {helperBroadcastTx} from '../helpers';
import {
    getTronTrc20ContractDecimals,
    prepareTronCustodialTransferBatch,
    prepareTronGenerateCustodialWalletSignedTransaction, prepareTronSmartContractInvocation,
    sendTronGenerateCustodialWalletSignedTransaction
} from '../transaction';

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (testnet: boolean, body: GenerateTronCustodialAddress, provider?: string) => {
    return await sendTronGenerateCustodialWalletSignedTransaction(testnet, body as GenerateTronCustodialAddress, provider);
};

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (testnet: boolean, body: GenerateTronCustodialAddress, provider?: string) => {
    return await prepareTronGenerateCustodialWalletSignedTransaction(testnet, body as GenerateTronCustodialAddress, provider);
};

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (testnet: boolean, body: GenerateTronCustodialAddress, provider?: string) => {
    const txData = await prepareTronGenerateCustodialWalletSignedTransaction(testnet, body, provider);
    return helperBroadcastTx(body.chain, txData, body.signatureId);
};

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromTronCustodialAddress, provider?: string) => {
    const {feeLimit, from} = body;
    return prepareTransferFromCustodialWalletAbstract(
        testnet,
        body,
        getTronTrc20ContractDecimals,
        (testnet, body, r, provider) =>
            prepareTronSmartContractInvocation(testnet, r, feeLimit as number, from, provider),
        SmartContractMethodInvocation,
        18,
        TransferFromCustodialAddress,
        provider
    )
};

/**
 * Send signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromTronCustodialAddress, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareTransferFromCustodialWallet(testnet, body, provider), body.signatureId);

/**
 * Prepare signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareBatchTransferFromCustodialWallet = async (testnet: boolean,
                                                              body: TransferFromTronCustodialAddressBatch, provider?: string) => {
    const {feeLimit, from} = body;
    return prepareBatchTransferFromCustodialWalletAbstract(
        testnet,
        body,
        getTronTrc20ContractDecimals,
        (testnet, body, r, provider) =>
            prepareTronCustodialTransferBatch(testnet, r, feeLimit as number, from, provider),
        SmartContractMethodInvocation,
        18,
        TransferFromTronCustodialAddressBatch,
        provider
    );
};

/**
 * Send signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendBatchTransferFromCustodialWallet = async (testnet: boolean,
                                                           body: TransferFromTronCustodialAddressBatch, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareBatchTransferFromCustodialWallet(testnet, body, provider), body.signatureId);

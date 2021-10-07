import { prepareBatchTransferFromCustodialWalletAbstract, prepareTransferFromCustodialWalletAbstract } from '@tatumio/tatum-core';
import BigNumber from 'bignumber.js';
import { validateBody } from '../connector/tatum';
import {
    CustodialFullTokenWallet
} from '../contracts/custodial';
import { getErc20Decimals } from '../fungible';
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers';
import {
    ApproveCustodialTransfer,
    ContractType, GenerateCustodialAddress, SmartContractMethodInvocation,
    TransferFromCustodialAddress,
    TransferFromCustodialAddressBatch
} from '../model';
import {
    getEthErc20ContractDecimals,
    prepareEthGenerateCustodialWalletSignedTransaction,
    prepareSmartContractWriteMethodInvocation,
    sendEthGenerateCustodialWalletSignedTransaction
} from '../transaction';

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress & { chain: Currency.ETH }, provider?: string) => {
    return await sendEthGenerateCustodialWalletSignedTransaction(body, provider);
};

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress & { chain: Currency.ETH }, provider?: string) => {
    return await prepareEthGenerateCustodialWalletSignedTransaction(body, provider);
};

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress & { chain: Currency.ETH }, provider?: string) => {
    const txData = await prepareEthGenerateCustodialWalletSignedTransaction(body, provider);
    return helperBroadcastTx(body.chain, txData, body.signatureId);
};

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (
  testnet: boolean,
  body: TransferFromCustodialAddress,
  provider?: string
) => {
  return prepareTransferFromCustodialWalletAbstract(
    testnet,
    body,
    getEthErc20ContractDecimals,
    (testnet, body, r, provider) =>
      prepareSmartContractWriteMethodInvocation(r, provider),
    SmartContractMethodInvocation,
    18,
    TransferFromCustodialAddress,
    provider
  );
};

/**
 * Send signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromCustodialAddress, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareTransferFromCustodialWallet(testnet, body, provider), body.signatureId);

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
    getEthErc20ContractDecimals,
    (testnet, body, r, provider) =>
      prepareSmartContractWriteMethodInvocation(r, provider),
    SmartContractMethodInvocation,
    18,
    TransferFromCustodialAddressBatch,
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
                                                           body: TransferFromCustodialAddressBatch, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareBatchTransferFromCustodialWallet(testnet, body, provider), body.signatureId);


/**
 * Prepare signed approve transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareApproveFromCustodialWallet = async (testnet: boolean, body: ApproveCustodialTransfer, provider?: string) => {
    await validateBody(body, ApproveCustodialTransfer);

    const decimals = body.contractType === ContractType.FUNGIBLE_TOKEN ? await getErc20Decimals(testnet, body.chain, body.tokenAddress, provider) : 0;
    const params = [body.tokenAddress.trim(), body.contractType, body.spender,
        `0x${new BigNumber(body.amount || 0).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`, `0x${new BigNumber(body.tokenId || 0).toString(16)}`];
    delete body.amount;
    return await helperPrepareSCCall(testnet, {
        ...body,
        contractAddress: body.custodialAddress
    }, ApproveCustodialTransfer, 'approve', params, undefined, provider, CustodialFullTokenWallet.abi);
};
/**
 * Send signed approve transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendApproveFromCustodialWallet = async (testnet: boolean, body: ApproveCustodialTransfer, provider?: string) =>
    helperBroadcastTx(body.chain, await prepareApproveFromCustodialWallet(testnet, body, provider), body.signatureId);

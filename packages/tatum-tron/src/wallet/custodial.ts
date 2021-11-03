import BigNumber from 'bignumber.js';
import {
    GenerateTronCustodialAddress,
    TransferFromTronCustodialAddress,
    TransferFromTronCustodialAddressBatch
} from 'src/model';

import {
    validateBody,
    Custodial_1155_TokenWallet,
    Custodial_1155_TokenWalletWithBatch,
    Custodial_20_1155_TokenWallet,
    Custodial_20_1155_TokenWalletWithBatch,
    Custodial_20_721_TokenWallet,
    Custodial_20_721_TokenWalletWithBatch,
    Custodial_20_TokenWallet,
    Custodial_20_TokenWalletWithBatch,
    Custodial_721_1155_TokenWallet,
    Custodial_721_1155_TokenWalletWithBatch,
    Custodial_721_TokenWallet,
    Custodial_721_TokenWalletWithBatch,
    CustodialFullTokenWallet,
    CustodialFullTokenWalletWithBatch,
    Currency,
    GenerateCustodialAddress,
    SmartContractMethodInvocation,
    TransferFromCustodialAddress,
    ContractType,
} from '@tatumio/tatum-core';
import {helperBroadcastTx} from '../helpers';
import {
    convertAddressToHex,
    getTronTrc20ContractDecimals,
    prepareTronCustodialTransferBatch,
    prepareTronGenerateCustodialWalletSignedTransaction,
    prepareTronSmartContractInvocation,
    sendTronGenerateCustodialWalletSignedTransaction
} from '../transaction';

export const obtainCustodialAddressType = (body: GenerateCustodialAddress) => {
    if (body.chain === Currency.TRON && body.enableSemiFungibleTokens) {
        throw new Error('MultiToken not supported for TRON.');
    }
    let abi;
    let code;
    if (body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = CustodialFullTokenWalletWithBatch.bytecode;
        abi = CustodialFullTokenWalletWithBatch.abi;
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = CustodialFullTokenWallet.bytecode;
        abi = CustodialFullTokenWallet.abi;
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_721_TokenWalletWithBatch.bytecode;
        abi = Custodial_20_721_TokenWalletWithBatch.abi;
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_721_TokenWallet.bytecode;
        abi = Custodial_20_721_TokenWallet.abi;
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_1155_TokenWalletWithBatch.bytecode;
        abi = Custodial_20_1155_TokenWalletWithBatch.abi;
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_1155_TokenWallet.bytecode;
        abi = Custodial_20_1155_TokenWallet.abi;
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_721_1155_TokenWalletWithBatch.bytecode;
        abi = Custodial_721_1155_TokenWalletWithBatch.abi;
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_721_1155_TokenWallet.bytecode;
        abi = Custodial_721_1155_TokenWallet.abi;
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_TokenWalletWithBatch.bytecode;
        abi = Custodial_20_TokenWalletWithBatch.abi;
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_TokenWallet.bytecode;
        abi = Custodial_20_TokenWallet.abi;
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_721_TokenWalletWithBatch.bytecode;
        abi = Custodial_721_TokenWalletWithBatch.abi;
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_721_TokenWallet.bytecode;
        abi = Custodial_721_TokenWallet.abi;
    } else if (!body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_1155_TokenWalletWithBatch.bytecode;
        abi = Custodial_1155_TokenWalletWithBatch.abi;
    } else if (!body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_1155_TokenWallet.bytecode;
        abi = Custodial_1155_TokenWallet.abi;
    } else {
        throw new Error('Unsupported combination of inputs.');
    }
    return {abi, code};
};

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress | GenerateTronCustodialAddress, provider?: string) => {
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
export const prepareCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress | GenerateTronCustodialAddress, provider?: string) => {
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
export const sendCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress | GenerateTronCustodialAddress, provider?: string) => {
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
    await validateBody(body, TransferFromTronCustodialAddress);
    const decimals = 6;
    const r = new SmartContractMethodInvocation();
    r.fee = body.fee;
    r.nonce = body.nonce;
    r.fromPrivateKey = body.fromPrivateKey;
    r.signatureId = body.signatureId;
    r.index = body.index;
    r.contractAddress = body.custodialAddress;
    r.methodName = 'transfer';
    let amount = new BigNumber(body.amount || 0);
    let tokenId = new BigNumber(body.tokenId || 0);
    if (body.contractType === ContractType.NATIVE_ASSET) {
        amount = amount.multipliedBy(new BigNumber(10).pow(decimals));
    } else if (body.contractType === ContractType.FUNGIBLE_TOKEN) {
        tokenId = new BigNumber(0);
        amount = amount.multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(testnet, body.tokenAddress, provider)));
    }
    r.params = [body.tokenAddress || '0x000000000000000000000000000000000000dEaD', body.contractType, body.recipient, `0x${amount.toString(16)}`, `0x${new BigNumber(tokenId).toString(16)}`];
    r.methodABI = CustodialFullTokenWallet.abi.find(a => a.name === 'transfer');
    const {feeLimit, from} = body as TransferFromTronCustodialAddress;
    r.methodName = 'transfer(address,uint256,address,uint256,uint256)';
    r.params = [
        {type: 'address', value: convertAddressToHex(r.params[0])},
        {type: 'uint256', value: r.params[1]},
        {type: 'address', value: convertAddressToHex(r.params[2])},
        {type: 'uint256', value: r.params[3]},
        {type: 'uint256', value: r.params[4]},
    ];
    return await prepareTronSmartContractInvocation(testnet, r, feeLimit as number, from, provider);
};

/**
 * Send signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromCustodialAddress | TransferFromTronCustodialAddress, provider?: string) =>
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
    await validateBody(body, TransferFromTronCustodialAddressBatch);
    const decimals = 6;
    const r = new SmartContractMethodInvocation();
    r.fee = body.fee;
    r.nonce = body.nonce;
    r.fromPrivateKey = body.fromPrivateKey;
    r.signatureId = body.signatureId;
    r.index = body.index;
    r.contractAddress = body.custodialAddress;
    r.methodName = 'transferBatch';
    const amounts = [];
    const tokenIds = [];
    for (let i = 0; i < body.contractType.length; i++) {
        let amount = new BigNumber(body.amount[i]);
        let tokenId = new BigNumber(body.tokenId[i]);
        if (body.contractType[i] === ContractType.NATIVE_ASSET) {
            amount = amount.multipliedBy(new BigNumber(10).pow(decimals));
        } else if (body.contractType[i] === ContractType.NON_FUNGIBLE_TOKEN) {
            amount = new BigNumber(0);
        } else if (body.contractType[i] === ContractType.FUNGIBLE_TOKEN) {
            tokenId = new BigNumber(0);
            amount = amount.multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(testnet, body.tokenAddress[i], provider)));
        }
        amounts.push(`0x${amount.toString(16)}`);
        tokenIds.push(`0x${tokenId.toString(16)}`);
    }
    r.params = [body.tokenAddress.map(t => t === '0' ? '0x000000000000000000000000000000000000dEaD' : t), body.contractType, body.recipient, amounts, tokenIds];
    r.methodABI = CustodialFullTokenWalletWithBatch.abi.find(a => a.name === 'transferBatch');
    const body1 = body as TransferFromTronCustodialAddressBatch;
    return await prepareTronCustodialTransferBatch(testnet, r, body1.feeLimit as number, body1.from, provider);
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

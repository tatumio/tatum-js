import BigNumber from 'bignumber.js';
import {bscBroadcast, celoBroadcast, ethBroadcast, polygonBroadcast, tronBroadcast} from '../blockchain';
import {get, validateBody} from '../connector/tatum';
import {CUSTODIAL_PROXY_ABI} from '../constants';
import {
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
} from '../contracts/custodial';
import {getErc20Decimals} from '../fungible';
import {helperBroadcastTx, helperPrepareSCCall} from '../helpers';
import {
    ApproveCustodialTransfer,
    CeloSmartContractMethodInvocation,
    ContractType,
    Currency,
    GenerateCustodialAddress,
    GenerateCustodialAddressBatch,
    GenerateTronCustodialAddress,
    SmartContractMethodInvocation,
    TransferFromCustodialAddress,
    TransferFromCustodialAddressBatch,
    TransferFromTronCustodialAddress,
    TransferFromTronCustodialAddressBatch
} from '../model';
import {
    convertAddressToHex,
    getBscBep20ContractDecimals,
    getCeloErc20ContractDecimals,
    getEthErc20ContractDecimals,
    getOne20ContractDecimals,
    getPolygonErc20ContractDecimals,
    getTronTrc20ContractDecimals,
    prepareBscGenerateCustodialWalletSignedTransaction,
    prepareBscSmartContractWriteMethodInvocation,
    prepareCeloGenerateCustodialWalletSignedTransaction,
    prepareCeloSmartContractWriteMethodInvocation,
    prepareEthGenerateCustodialWalletSignedTransaction,
    prepareOneGenerateCustodialWalletSignedTransaction,
    prepareOneSmartContractWriteMethodInvocation,
    preparePolygonGenerateCustodialWalletSignedTransaction,
    preparePolygonSmartContractWriteMethodInvocation,
    prepareSmartContractWriteMethodInvocation,
    prepareTronCustodialTransferBatch,
    prepareTronGenerateCustodialWalletSignedTransaction,
    prepareTronSmartContractInvocation,
    sendBscGenerateCustodialWalletSignedTransaction,
    sendCeloGenerateCustodialWalletSignedTransaction,
    sendEthGenerateCustodialWalletSignedTransaction,
    sendOneGenerateCustodialWalletSignedTransaction,
    sendPolygonGenerateCustodialWalletSignedTransaction,
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

const getCustodialFactoryContractAddress = (chain: Currency, testnet: boolean) => {
    switch (chain) {
        case Currency.CELO:
            return testnet ? '0x6C4B2ed1EaBcE4925f0F3d5Cf36e432C28d8A6dd' : '0x3b0B6734AC81252dD1d2B26FA3A4605e7eB96997';
        case Currency.TRON:
            return testnet ? 'TH8SiZrN3GFs932ATPZdkyJ2e1NQaSsJ9c' : 'TLLfWsi4VBDZyLCsrFgrmnazvJmoeyGA9H';
        case Currency.ETH:
            return testnet ? (process.env.TESTNET_TYPE === 'ethereum-rinkeby' ? '0xbe7433f3373c8486B3FE1693D2A61870F73eFCf7' : '0xBe318B50BcE15C40f6AaFC2042882C987339Bf94') : '0x9fd03ec6c02d2b4a92644a4dbfc23f22efe8ea11';
        case Currency.MATIC:
            return testnet ? '0x7E53D8ccE7d55bDEFfb057cC3b7e95448b26E697' : '0x6B422BC77e7848b628fd89Ffc6D702e3f39a580A';
        case Currency.BSC:
            return testnet ? '0x6709Bdda623aF7EB152cB2fE2562aB7e031e564f' : '0x1cfc7878Cf6Ae32A50F84481690F6fB04574de21';
        default:
            throw new Error('Unsupported chain.');
    }
};

export const getCustodialAddresses = (chain: Currency, txId: string): Promise<string[]> => get(`v3/blockchain/sc/custodial/${chain}/${txId}`);

/**
 * This method is @Deprecated. Use @link{generateCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress | GenerateTronCustodialAddress, provider?: string) => {
    console.log('This method is deprecated. For better gas consumption, use generateCustodialWalletBatch.');
    switch (body.chain) {
        case Currency.CELO:
            return await sendCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return await sendOneGenerateCustodialWalletSignedTransaction(testnet, body, provider);
        case Currency.ETH:
            return await sendEthGenerateCustodialWalletSignedTransaction(body, provider);
        case Currency.BSC:
            return await sendBscGenerateCustodialWalletSignedTransaction(body, provider);
        case Currency.MATIC:
            return await sendPolygonGenerateCustodialWalletSignedTransaction(testnet, body, provider);
        case Currency.TRON:
            return await sendTronGenerateCustodialWalletSignedTransaction(testnet, body as GenerateTronCustodialAddress, provider);
        default:
            throw new Error('Unsupported chain');
    }
};

/**
 * This method is @Deprecated. Use @link{prepareCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress | GenerateTronCustodialAddress, provider?: string) => {
    console.log('This method is deprecated. For better gas consumption, use prepareCustodialWalletBatch.');
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return await prepareOneGenerateCustodialWalletSignedTransaction(testnet, body, provider);
        case Currency.ETH:
            return await prepareEthGenerateCustodialWalletSignedTransaction(body, provider);
        case Currency.BSC:
            return await prepareBscGenerateCustodialWalletSignedTransaction(body, provider);
        case Currency.MATIC:
            return await preparePolygonGenerateCustodialWalletSignedTransaction(testnet, body, provider);
        case Currency.TRON:
            return await prepareTronGenerateCustodialWalletSignedTransaction(testnet, body as GenerateTronCustodialAddress, provider);
        default:
            throw new Error('Unsupported chain');
    }
};
/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWalletBatch = async (testnet: boolean, body: GenerateCustodialAddressBatch, provider?: string) => {
    const txData = await prepareCustodialWalletBatch(testnet, body, provider);
    switch (body.chain) {
        case Currency.CELO:
            return await celoBroadcast(txData, body.signatureId);
        case Currency.TRON:
            return await tronBroadcast(txData, body.signatureId);
        case Currency.ETH:
            return await ethBroadcast(txData, body.signatureId);
        case Currency.MATIC:
            return await polygonBroadcast(txData, body.signatureId);
        case Currency.BSC:
            return await bscBroadcast(txData, body.signatureId);
        default:
            throw new Error('Unsupported chain');
    }
};

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWalletBatch = async (testnet: boolean, body: GenerateCustodialAddressBatch, provider?: string) => {
    await validateBody(body, GenerateCustodialAddressBatch);
    const params =
        body.chain === Currency.TRON
            ? [{type: 'address', value: convertAddressToHex(body.owner.trim())},
                {type: 'uint256', value: `0x${new BigNumber(body.batchCount).toString(16)}`}]
            : [body.owner.trim(), `0x${new BigNumber(body.batchCount).toString(16)}`];

    const methodName = body.chain === Currency.TRON ? 'cloneNewWallet(address,uint256)' : 'cloneNewWallet';
    return await helperPrepareSCCall(testnet, {
        ...body,
        contractAddress: getCustodialFactoryContractAddress(body.chain, testnet)
    }, GenerateCustodialAddressBatch, methodName, params, body.chain === Currency.TRON ? methodName : undefined, provider, [CUSTODIAL_PROXY_ABI]);
};

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress | GenerateTronCustodialAddress, provider?: string) => {
    let txData;
    switch (body.chain) {
        case Currency.CELO:
            txData = await prepareCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider);
            break;
        case Currency.ONE:
            txData = await prepareOneGenerateCustodialWalletSignedTransaction(testnet, body, provider);
            break;
        case Currency.ETH:
            txData = await prepareEthGenerateCustodialWalletSignedTransaction(body, provider);
            break;
        case Currency.BSC:
            txData = await prepareBscGenerateCustodialWalletSignedTransaction(body, provider);
            break;
        case Currency.MATIC:
            txData = await preparePolygonGenerateCustodialWalletSignedTransaction(testnet, body, provider);
            break;
        case Currency.TRON:
            txData = await prepareTronGenerateCustodialWalletSignedTransaction(testnet, body, provider);
            break;
        default:
            throw new Error('Unsupported chain');
    }
    return helperBroadcastTx(body.chain, txData, body.signatureId);
};

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromCustodialAddress | TransferFromTronCustodialAddress, provider?: string) => {
    let r: SmartContractMethodInvocation | CeloSmartContractMethodInvocation;
    let decimals;
    if (body.chain === Currency.TRON) {
        decimals = 6;
        await validateBody(body, TransferFromTronCustodialAddress);
    } else {
        decimals = 18;
        await validateBody(body, TransferFromCustodialAddress);
    }
    if (body.chain === Currency.CELO) {
        r = new CeloSmartContractMethodInvocation();
    } else {
        r = new SmartContractMethodInvocation();
    }
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
        switch (body.chain) {
            case Currency.CELO:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getCeloErc20ContractDecimals(testnet, body.tokenAddress, provider)));
                break;
            case Currency.ONE:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getOne20ContractDecimals(testnet, body.tokenAddress, provider)));
                break;
            case Currency.ETH:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getEthErc20ContractDecimals(testnet, body.tokenAddress, provider)));
                break;
            case Currency.BSC:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getBscBep20ContractDecimals(testnet, body.tokenAddress, provider)));
                break;
            case Currency.MATIC:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getPolygonErc20ContractDecimals(testnet, body.tokenAddress, provider)));
                break;
            case Currency.TRON:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(testnet, body.tokenAddress, provider)));
                break;
            default:
                throw new Error('Unsupported combination of inputs.');
        }
    }
    r.params = [body.tokenAddress || '0x000000000000000000000000000000000000dEaD', body.contractType, body.recipient, `0x${amount.toString(16)}`, `0x${new BigNumber(tokenId).toString(16)}`];
    r.methodABI = CustodialFullTokenWallet.abi.find(a => a.name === 'transfer');
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloSmartContractWriteMethodInvocation(testnet, {...r, feeCurrency: body.feeCurrency || Currency.CELO}, provider);
        case Currency.ONE:
            return await prepareOneSmartContractWriteMethodInvocation(testnet, r, provider);
        case Currency.ETH:
            return await prepareSmartContractWriteMethodInvocation(r, provider);
        case Currency.BSC:
            return await prepareBscSmartContractWriteMethodInvocation(r, provider);
        case Currency.MATIC:
            return await preparePolygonSmartContractWriteMethodInvocation(testnet, r, provider);
        case Currency.TRON: {
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
        }
        default:
            throw new Error('Unsupported combination of inputs.');
    }
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
                                                              body: TransferFromCustodialAddressBatch | TransferFromTronCustodialAddressBatch, provider?: string) => {
    let r: SmartContractMethodInvocation | CeloSmartContractMethodInvocation;
    let decimals;
    if (body.chain === Currency.TRON) {
        await validateBody(body, TransferFromTronCustodialAddressBatch);
        decimals = 6;
    } else {
        await validateBody(body, TransferFromCustodialAddressBatch);
        decimals = 18;
    }
    if (body.chain === Currency.CELO) {
        r = new CeloSmartContractMethodInvocation();
    } else {
        r = new SmartContractMethodInvocation();
    }
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
        let amount = new BigNumber(body.amount ? body.amount[i] : 0);
        let tokenId = new BigNumber(body.tokenId ? body.tokenId[i] : 0);
        if (body.contractType[i] === ContractType.NATIVE_ASSET) {
            amount = amount.multipliedBy(new BigNumber(10).pow(decimals));
        } else if (body.contractType[i] === ContractType.NON_FUNGIBLE_TOKEN) {
            amount = new BigNumber(0);
        } else if (body.contractType[i] === ContractType.FUNGIBLE_TOKEN && body.tokenAddress) {
            tokenId = new BigNumber(0);
            switch (body.chain) {
                case Currency.CELO:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getCeloErc20ContractDecimals(testnet, body.tokenAddress[i], provider)));
                    break;
                case Currency.ONE:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getOne20ContractDecimals(testnet, body.tokenAddress[i], provider)));
                    break;
                case Currency.ETH:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getEthErc20ContractDecimals(testnet, body.tokenAddress[i], provider)));
                    break;
                case Currency.BSC:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getBscBep20ContractDecimals(testnet, body.tokenAddress[i], provider)));
                    break;
                case Currency.MATIC:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getPolygonErc20ContractDecimals(testnet, body.tokenAddress[i], provider)));
                    break;
                case Currency.TRON:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(testnet, body.tokenAddress[i], provider)));
                    break;
                default:
                    throw new Error('Unsupported combination of inputs.');
            }
        }
        amounts.push(`0x${amount.toString(16)}`);
        tokenIds.push(`0x${tokenId.toString(16)}`);
    }
    r.params = [(body.tokenAddress || []).map(t => t === '0' ? '0x000000000000000000000000000000000000dEaD' : t), body.contractType, body.recipient, amounts, tokenIds];
    r.methodABI = CustodialFullTokenWalletWithBatch.abi.find(a => a.name === 'transferBatch');
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloSmartContractWriteMethodInvocation(testnet, {...r, feeCurrency: body.feeCurrency || Currency.CELO}, provider);
        case Currency.ONE:
            return await prepareOneSmartContractWriteMethodInvocation(testnet, r, provider);
        case Currency.ETH:
            return await prepareSmartContractWriteMethodInvocation(r, provider);
        case Currency.BSC:
            return await prepareBscSmartContractWriteMethodInvocation(r, provider);
        case Currency.MATIC:
            return await preparePolygonSmartContractWriteMethodInvocation(testnet, r, provider);
        case Currency.TRON: {
            const body1 = body as TransferFromTronCustodialAddressBatch;
            return await prepareTronCustodialTransferBatch(testnet, r, body1.feeLimit as number, body1.from, provider);
        }
        default:
            throw new Error('Unsupported combination of inputs.');
    }
};

/**
 * Send signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendBatchTransferFromCustodialWallet = async (testnet: boolean,
                                                           body: TransferFromCustodialAddressBatch | TransferFromTronCustodialAddressBatch, provider?: string) =>
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

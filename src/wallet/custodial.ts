import BigNumber from 'bignumber.js';
import {validateBody} from '../connector/tatum';
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
import {
    CeloSmartContractMethodInvocation,
    ContractType,
    Currency,
    GenerateCustodialAddress,
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
        throw new Error('MultiToken not supported for TRON.')
    }
    let abi
    let code
    if (body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = CustodialFullTokenWalletWithBatch.bytecode
        abi = CustodialFullTokenWalletWithBatch.abi
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = CustodialFullTokenWallet.bytecode
        abi = CustodialFullTokenWallet.abi
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_721_TokenWalletWithBatch.bytecode
        abi = Custodial_20_721_TokenWalletWithBatch.abi
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_721_TokenWallet.bytecode
        abi = Custodial_20_721_TokenWallet.abi
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_1155_TokenWalletWithBatch.bytecode
        abi = Custodial_20_1155_TokenWalletWithBatch.abi
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_1155_TokenWallet.bytecode
        abi = Custodial_20_1155_TokenWallet.abi
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_721_1155_TokenWalletWithBatch.bytecode
        abi = Custodial_721_1155_TokenWalletWithBatch.abi
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_721_1155_TokenWallet.bytecode
        abi = Custodial_721_1155_TokenWallet.abi
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_TokenWalletWithBatch.bytecode
        abi = Custodial_20_TokenWalletWithBatch.abi
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_TokenWallet.bytecode
        abi = Custodial_20_TokenWallet.abi
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_721_TokenWalletWithBatch.bytecode
        abi = Custodial_721_TokenWalletWithBatch.abi
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_721_TokenWallet.bytecode
        abi = Custodial_721_TokenWallet.abi
    } else if (!body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_1155_TokenWalletWithBatch.bytecode
        abi = Custodial_1155_TokenWalletWithBatch.abi
    } else if (!body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_1155_TokenWallet.bytecode
        abi = Custodial_1155_TokenWallet.abi
    } else {
        throw new Error('Unsupported combination of inputs.')
    }
    return {abi, code}
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress | GenerateTronCustodialAddress, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return await sendCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider)
        case Currency.ONE:
            return await sendOneGenerateCustodialWalletSignedTransaction(testnet, body, provider)
        case Currency.ETH:
            return await sendEthGenerateCustodialWalletSignedTransaction(body, provider)
        case Currency.BSC:
            return await sendBscGenerateCustodialWalletSignedTransaction(body, provider)
        case Currency.MATIC:
            return await sendPolygonGenerateCustodialWalletSignedTransaction(testnet, body, provider)
        case Currency.TRON:
            return await sendTronGenerateCustodialWalletSignedTransaction(testnet, body as GenerateTronCustodialAddress, provider)
        default:
            throw new Error('Unsupported chain')
    }
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (testnet: boolean, body: GenerateCustodialAddress | GenerateTronCustodialAddress, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider)
        case Currency.ONE:
            return await prepareOneGenerateCustodialWalletSignedTransaction(testnet, body, provider)
        case Currency.ETH:
            return await prepareEthGenerateCustodialWalletSignedTransaction(body, provider)
        case Currency.BSC:
            return await prepareBscGenerateCustodialWalletSignedTransaction(body, provider)
        case Currency.MATIC:
            return await preparePolygonGenerateCustodialWalletSignedTransaction(testnet, body, provider)
        case Currency.TRON:
            return await prepareTronGenerateCustodialWalletSignedTransaction(testnet, body as GenerateTronCustodialAddress, provider)
        default:
            throw new Error('Unsupported chain')
    }
}

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (testnet: boolean, body: TransferFromCustodialAddress | TransferFromTronCustodialAddress, provider?: string) => {
    let r: SmartContractMethodInvocation | CeloSmartContractMethodInvocation
    let decimals
    if (body.chain === Currency.TRON) {
        decimals = 6
        await validateBody(body, TransferFromTronCustodialAddress)
    } else {
        decimals = 18
        await validateBody(body, TransferFromCustodialAddress)
    }
    if (body.chain === Currency.CELO) {
        r = new CeloSmartContractMethodInvocation()
    } else {
        r = new SmartContractMethodInvocation()
    }
    r.fee = body.fee
    r.nonce = body.nonce
    r.fromPrivateKey = body.fromPrivateKey
    r.signatureId = body.signatureId
    r.index = body.index
    r.contractAddress = body.custodialAddress
    r.methodName = 'transfer'
    let amount = new BigNumber(body.amount || 0)
    let tokenId = new BigNumber(body.tokenId || 0)
    if (body.contractType === ContractType.NATIVE_ASSET) {
        amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
    } else if (body.contractType === ContractType.FUNGIBLE_TOKEN) {
        tokenId = new BigNumber(0)
        switch (body.chain) {
            case Currency.CELO:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getCeloErc20ContractDecimals(testnet, body.tokenAddress, provider)))
                break
            case Currency.ONE:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getOne20ContractDecimals(testnet, body.tokenAddress, provider)))
                break
            case Currency.ETH:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getEthErc20ContractDecimals(testnet, body.tokenAddress, provider)))
                break
            case Currency.BSC:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getBscBep20ContractDecimals(testnet, body.tokenAddress, provider)))
                break
            case Currency.MATIC:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getPolygonErc20ContractDecimals(testnet, body.tokenAddress, provider)))
                break
            case Currency.TRON:
                amount = amount.multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(testnet, body.tokenAddress, provider)))
                break
            default:
                throw new Error('Unsupported combination of inputs.')
        }
    }
    r.params = [body.tokenAddress || '0x000000000000000000000000000000000000dEaD', body.contractType, body.recipient, `0x${amount.toString(16)}`, `0x${new BigNumber(tokenId).toString(16)}`]
    r.methodABI = CustodialFullTokenWallet.abi.find(a => a.name === 'transfer')
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloSmartContractWriteMethodInvocation(testnet, {...r, feeCurrency: body.feeCurrency || Currency.CELO}, provider)
        case Currency.ONE:
            return await prepareOneSmartContractWriteMethodInvocation(testnet, r, provider)
        case Currency.ETH:
            return await prepareSmartContractWriteMethodInvocation(r, provider)
        case Currency.BSC:
            return await prepareBscSmartContractWriteMethodInvocation(r, provider)
        case Currency.MATIC:
            return await preparePolygonSmartContractWriteMethodInvocation(testnet, r, provider)
        case Currency.TRON: {
            const {feeLimit, from} = body as TransferFromTronCustodialAddress
            r.methodName = 'transfer(address,uint256,address,uint256,uint256)'
            r.params = [
                {type: 'address', value: convertAddressToHex(r.params[0])},
                {type: 'uint256', value: r.params[1]},
                {type: 'address', value: convertAddressToHex(r.params[2])},
                {type: 'uint256', value: r.params[3]},
                {type: 'uint256', value: r.params[4]},
            ]
            return await prepareTronSmartContractInvocation(testnet, r, feeLimit, from, provider)
        }
        default:
            throw new Error('Unsupported combination of inputs.')
    }
}

/**
 * Prepare signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareBatchTransferFromCustodialWallet = async (testnet: boolean,
                                                              body: TransferFromCustodialAddressBatch | TransferFromTronCustodialAddressBatch, provider?: string) => {
    let r: SmartContractMethodInvocation | CeloSmartContractMethodInvocation
    let decimals
    if (body.chain === Currency.TRON) {
        await validateBody(body, TransferFromTronCustodialAddressBatch)
        decimals = 6
    } else {
        await validateBody(body, TransferFromCustodialAddressBatch)
        decimals = 18
    }
    if (body.chain === Currency.CELO) {
        r = new CeloSmartContractMethodInvocation()
    } else {
        r = new SmartContractMethodInvocation()
    }
    r.fee = body.fee
    r.nonce = body.nonce
    r.fromPrivateKey = body.fromPrivateKey
    r.signatureId = body.signatureId
    r.index = body.index
    r.contractAddress = body.custodialAddress
    r.methodName = 'transferBatch'
    const amounts = []
    const tokenIds = []
    for (let i = 0; i < body.contractType.length; i++) {
        let amount = new BigNumber(body.amount[i])
        let tokenId = new BigNumber(body.tokenId[i])
        if (body.contractType[i] === ContractType.NATIVE_ASSET) {
            amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
        } else if (body.contractType[i] === ContractType.NON_FUNGIBLE_TOKEN) {
            amount = new BigNumber(0)
        } else if (body.contractType[i] === ContractType.FUNGIBLE_TOKEN) {
            tokenId = new BigNumber(0)
            switch (body.chain) {
                case Currency.CELO:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getCeloErc20ContractDecimals(testnet, body.tokenAddress[i], provider)))
                    break
                case Currency.ONE:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getOne20ContractDecimals(testnet, body.tokenAddress[i], provider)))
                    break
                case Currency.ETH:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getEthErc20ContractDecimals(testnet, body.tokenAddress[i], provider)))
                    break
                case Currency.BSC:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getBscBep20ContractDecimals(testnet, body.tokenAddress[i], provider)))
                    break
                case Currency.MATIC:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getPolygonErc20ContractDecimals(testnet, body.tokenAddress[i], provider)))
                    break
                case Currency.TRON:
                    amount = amount.multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(testnet, body.tokenAddress[i], provider)))
                    break
                default:
                    throw new Error('Unsupported combination of inputs.')
            }
        }
        amounts.push(`0x${amount.toString(16)}`);
        tokenIds.push(`0x${tokenId.toString(16)}`);
    }
    r.params = [body.tokenAddress.map(t => t === '0' ? '0x000000000000000000000000000000000000dEaD' : t), body.contractType, body.recipient, amounts, tokenIds]
    r.methodABI = CustodialFullTokenWalletWithBatch.abi.find(a => a.name === 'transferBatch')
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloSmartContractWriteMethodInvocation(testnet, {...r, feeCurrency: body.feeCurrency || Currency.CELO}, provider)
        case Currency.ONE:
            return await prepareOneSmartContractWriteMethodInvocation(testnet, r, provider)
        case Currency.ETH:
            return await prepareSmartContractWriteMethodInvocation(r, provider)
        case Currency.BSC:
            return await prepareBscSmartContractWriteMethodInvocation(r, provider)
        case Currency.MATIC:
            return await preparePolygonSmartContractWriteMethodInvocation(testnet, r, provider)
        case Currency.TRON: {
            const body1 = body as TransferFromTronCustodialAddressBatch
            return await prepareTronCustodialTransferBatch(testnet, r, body1.feeLimit, body1.from, provider)
        }
        default:
            throw new Error('Unsupported combination of inputs.')
    }
}

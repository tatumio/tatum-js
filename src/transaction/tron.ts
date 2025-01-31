import { AxiosRequestConfig } from 'axios';
import BigNumber from 'bignumber.js';
import { tronBroadcast } from '../blockchain';
import { axios, validateBody } from '../connector/tatum';
import { TATUM_API_URL, TRON_ABI } from '../constants'
import { listing } from '../contracts/marketplace';
import abi from '../contracts/trc20/token_abi';
import bytecode from '../contracts/trc20/token_bytecode';
import trc721_abi from '../contracts/trc721/trc721_abi';
import trc721_bytecode from '../contracts/trc721/trc721_bytecode';
import {
    CreateTronTrc10,
    CreateTronTrc20,
    Currency,
    DeployTronMarketplaceListing,
    FreezeTron,
    GenerateTronCustodialAddress,
    SmartContractMethodInvocation,
    TransactionKMS,
    TransferTron,
    TransferTronTrc10,
    TransferTronTrc20,
    TronBurnTrc721,
    TronDeployTrc721,
    TronMintMultipleTrc721,
    TronMintTrc721,
    TronTransferTrc721,
    TronUpdateCashbackTrc721
} from '../model';
import { obtainCustodialAddressType } from '../wallet';


// tslint:disable-next-line:no-var-requires
const TronWeb = require('tronweb');

const prepareTronWeb = (testnet: boolean, provider?: string) => {
    const HttpProvider = TronWeb.providers.HttpProvider;
    const url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tron/node/${process.env.TATUM_API_KEY}`;
    const fullNode = new HttpProvider(url);
    const solidityNode = new HttpProvider(url);
    const eventServer = new HttpProvider(url);
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer)
    tronWeb.setHeader({'TRON-PRO-API-KEY': process.env.TRON_PRO_API_KEY})
    return tronWeb
}

/**
 * Send Tron transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronTransaction = async (testnet: boolean, body: TransferTron) => {
    return tronBroadcast(await prepareTronSignedTransaction(testnet, body), body.signatureId)
}

/**
 * Send Tron Freeze balance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const freezeTronTransaction = async (testnet: boolean, body: FreezeTron) => {
    return tronBroadcast(await prepareTronFreezeTransaction(testnet, body), body.signatureId)
}

/**
 * Send Tron TRC10 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronTrc10Transaction = async (testnet: boolean, body: TransferTronTrc10) => {
    return tronBroadcast(await prepareTronTrc10SignedTransaction(testnet, body), body.signatureId)
}

/**
 * Send Tron TRC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronTrc20Transaction = async (testnet: boolean, body: TransferTronTrc20) => {
    return tronBroadcast(await prepareTronTrc20SignedTransaction(testnet, body), body.signatureId)
}

/**
 * Create Tron TRC10 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const createTronTrc10Transaction = async (testnet: boolean, body: CreateTronTrc10) => {
    return tronBroadcast(await prepareTronCreateTrc10SignedTransaction(testnet, body), body.signatureId)
}

/**
 * Create Tron TRC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const createTronTrc20Transaction = async (testnet: boolean, body: CreateTronTrc20) => {
    return tronBroadcast(await prepareTronCreateTrc20SignedTransaction(testnet, body), body.signatureId)
}

/**
 * Sign Tron pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signTronKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean) => {
    if (tx.chain !== Currency.TRON) {
        throw Error('Unsupported chain.')
    }
    const tronWeb = prepareTronWeb(testnet)
    const transactionConfig = JSON.parse(tx.serializedTransaction)
    return JSON.stringify(await tronWeb.trx.sign(transactionConfig, fromPrivateKey))
}

export const convertAddressFromHex = (address: string) => TronWeb.address.fromHex(address)

export const convertAddressToHex = (address: string) => TronWeb.address.toHex(address)

/**
 * Send Tron deploy trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronDeployTrc721SignedTransaction = async (testnet: boolean, body: TronDeployTrc721) =>
    await tronBroadcast(await prepareTronDeployTrc721SignedTransaction(testnet, body), body.signatureId)

/**
 * Send Tron generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronGenerateCustodialWalletSignedTransaction = async (testnet: boolean, body: GenerateTronCustodialAddress, provider?: string) =>
    await tronBroadcast(await prepareTronGenerateCustodialWalletSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum provider will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendTronDeployMarketplaceListingSignedTransaction = async (testnet: boolean, body: DeployTronMarketplaceListing, provider?: string) =>
    await tronBroadcast(await prepareTronDeployMarketplaceListingSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Tron mint cashback trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronMintCashbackTrc721SignedTransaction = async (testnet: boolean, body: TronMintTrc721) =>
    await tronBroadcast(await prepareTronMintCashbackTrc721SignedTransaction(testnet, body), body.signatureId)

/**
 * Send Tron mint trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronMintTrc721SignedTransaction = async (testnet: boolean, body: TronMintTrc721) =>
    await tronBroadcast(await prepareTronMintTrc721SignedTransaction(testnet, body), body.signatureId)

/**
 * Send Tron transfer trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronTransferTrc721SignedTransaction = async (testnet: boolean, body: TronTransferTrc721) =>
    await tronBroadcast(await prepareTronTransferTrc721SignedTransaction(testnet, body), body.signatureId)

/**
 * Send Tron burn trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronBurnTrc721SignedTransaction = async (testnet: boolean, body: TronBurnTrc721) =>
    await tronBroadcast(await prepareTronBurnTrc721SignedTransaction(testnet, body), body.signatureId)

/**
 * Send Tron mint multiple trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronMintMultipleTrc721SignedTransaction = async (testnet: boolean, body: TronMintMultipleTrc721) =>
    await tronBroadcast(await prepareTronMintMultipleTrc721SignedTransaction(testnet, body), body.signatureId)

/**
 * Send Tron update cashback for author trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronUpdateCashbackForAuthorTrc721SignedTransaction = async (testnet: boolean, body: TronUpdateCashbackTrc721) =>
    await tronBroadcast(await prepareTronUpdateCashbackForAuthorTrc721SignedTransaction(testnet, body), body.signatureId)

/**
 * Sign Tron transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronSignedTransaction = async (testnet: boolean, body: TransferTron, provider?: string) => {
    await validateBody(body, TransferTron)
    const {
        fromPrivateKey,
        to,
        amount,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.sendTrx(
        to,
        tronWeb.toSun(amount),
        tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey)))
    return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Sign Tron Freeze balance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider optional provider to enter. if not present, Tatum provider will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronFreezeTransaction = async (testnet: boolean, body: FreezeTron, provider?: string) => {
    await validateBody(body, FreezeTron)
    const {
        fromPrivateKey,
        receiver,
        amount,
        resource,
        duration,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.freezeBalance(
        tronWeb.toSun(parseFloat(amount)),
        duration,
        resource,
        tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey)),
        receiver,
    )
    return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Sign Tron TRC10 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param precision
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronTrc10SignedTransaction = async (testnet: boolean, body: TransferTronTrc10, precision?: number, provider?: string) => {
    await validateBody(body, TransferTronTrc10)
    const {
        fromPrivateKey,
        to,
        tokenId,
        amount,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.sendToken(
        to,
        new BigNumber(amount).multipliedBy(new BigNumber(10).pow(precision || await getTrc10Precision(testnet, tokenId))),
        tokenId,
        tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey)))
    return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Get TRC20 balance for the given tron address.
 * @param testnet mainnet or testnet version
 * @param address the address whose balance is returned
 * @param contractAddress the TRC20 contract address
 * @param provider
 */
export const tronGetAccountTrc20Address = async (
	testnet: boolean,
    address: string,
	contractAddress: string,
	provider?: string,
) => {
	if (!contractAddress) {
		throw new Error('Contract address not set.');
	}
	const tronWeb = prepareTronWeb(testnet, provider);
	tronWeb.setAddress(contractAddress);
	const contractInstance = await tronWeb.contract().at(contractAddress);
	return await contractInstance.balanceOf(address).call();
};

export const getTronTrc20ContractDecimals = async (testnet: boolean, contractAddress: string, provider?: string) => {
    if (!contractAddress) {
        throw new Error('Contract address not set.')
    }
    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(contractAddress)
    const contractInstance = await tronWeb.contract(TRON_ABI, contractAddress);
    const decimalsBigNum = await contractInstance.decimals().call()
    return new BigNumber(decimalsBigNum).toNumber()
}

/**
 * Sign Tron custodial transfer transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param feeLimit
 * @param from
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronSmartContractInvocation = async (testnet: boolean, body: SmartContractMethodInvocation, feeLimit: number, from?: string, provider?: string) => {
    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(body.contractAddress)
    const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(body.fromPrivateKey))
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(body.contractAddress),
        body.methodName,
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: sender,
            callValue: tronWeb.toSun(body.amount || 0),
        },
        body.params,
        sender
    )
    if (body.signatureId) {
        return JSON.stringify(transaction)
    }
    return JSON.stringify(await tronWeb.trx.sign(transaction, body.fromPrivateKey))
}

/**
 * Sign Tron custodial transfer batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param feeLimit
 * @param from
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronCustodialTransferBatch = async (testnet: boolean, body: SmartContractMethodInvocation, feeLimit: number, from?: string, provider?: string) => {
    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(body.contractAddress)
    const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(body.fromPrivateKey))
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(body.contractAddress),
        'transferBatch(address[],uint256[],address[],uint256[],uint256[])',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: sender
        },
        [
            {type: 'address[]', value: body.params[0].map(tronWeb.address.toHex)},
            {type: 'uint256[]', value: body.params[1]},
            {type: 'address[]', value: body.params[2].map(tronWeb.address.toHex)},
            {type: 'uint256[]', value: body.params[3]},
            {type: 'uint256[]', value: body.params[4]},
        ],
        sender
    )
    if (body.signatureId) {
        return JSON.stringify(transaction)
    }
    return JSON.stringify(await tronWeb.trx.sign(transaction, body.fromPrivateKey))
}

/**
 * Sign Tron TRC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronTrc20SignedTransaction = async (testnet: boolean, body: TransferTronTrc20, provider?: string) => {
    await validateBody(body, TransferTronTrc20)
    const {
        fromPrivateKey,
        to,
        tokenAddress,
        amount,
        feeLimit,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(tokenAddress)
    const contractInstance = await tronWeb.contract().at(tokenAddress)
    const decimals = await contractInstance.decimals().call()

    const from =
      'signatureId' in body
        ? body.from
        : tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(body.fromPrivateKey))

    const balance = new BigNumber( ((await contractInstance.balanceOf(from).call()) as BigNumber)?.toString() || 0)
    const valueToSend = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals))
    if (valueToSend.isGreaterThan(balance)) {
        const balanceInTrx = balance.dividedBy(new BigNumber(10).pow(decimals))
        throw new Error(`Not enough TRC20 tokens on address to perform this transaction. Balance: ${balanceInTrx}`)
    }

    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(tokenAddress),
        'transfer(address,uint256)',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
        },
        [{type: 'address', value: tronWeb.address.toHex(to)}, {
            type: 'uint256',
            value: `0x${new BigNumber(amount).multipliedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString(16)}`
        }],
        tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
    )
    return JSON.stringify(await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign create Tron TRC10 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronCreateTrc10SignedTransaction = async (testnet: boolean, body: CreateTronTrc10, provider?: string) => {
    await validateBody(body, CreateTronTrc10)
    const {
        fromPrivateKey,
        name,
        abbreviation,
        description,
        url,
        totalSupply,
        decimals,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.createToken({
        name,
        abbreviation,
        description,
        url,
        totalSupply: new BigNumber(totalSupply).multipliedBy(new BigNumber(10).pow(decimals)),
        trxRatio: 1,
        tokenRatio: 1,
        saleStart: Date.now() + 60000,
        saleEnd: Date.now() + 100000,
        freeBandwidth: 0,
        freeBandwidthLimit: 0,
        frozenAmount: 0,
        frozenDuration: 0,
        precision: decimals,
    }, tronWeb.address.fromPrivateKey(fromPrivateKey))
    return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Sign create Tron TRC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronCreateTrc20SignedTransaction = async (testnet: boolean, body: CreateTronTrc20, provider?: string) => {
    await validateBody(body, CreateTronTrc20)
    const {
        fromPrivateKey,
        name,
        decimals,
        recipient,
        symbol,
        totalSupply,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.createSmartContract({
        feeLimit: 1000000000,
        callValue: 0,
        userFeePercentage: 100,
        originEnergyLimit: 1,
        abi: JSON.stringify(abi),
        bytecode,
        parameters: [
            name,
            symbol,
            decimals,
            tronWeb.address.toHex(recipient),
            totalSupply,
        ],
        name,
    }, tronWeb.address.fromPrivateKey(fromPrivateKey))
    return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Prepare Tron transaction for KMS. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronSignedKMSTransaction = async (testnet: boolean, body: TransferTron, provider?: string) => {
    await validateBody(body, TransferTron)
    const {
        from,
        to,
        amount,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.sendTrx(
        to,
        tronWeb.toSun(amount),
        from)
    return JSON.stringify(tx)
}

/**
 * Prepare Tron Freeze balance transaction for KMS. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronFreezeKMSTransaction = async (testnet: boolean, body: FreezeTron, provider?: string) => {
    await validateBody(body, FreezeTron)
    const {
        from,
        receiver,
        amount,
        resource,
        duration,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.freezeBalance(
        tronWeb.toSun(parseFloat(amount)),
        duration,
        resource,
        from,
        receiver,
    )
    return JSON.stringify(tx)
}

/**
 * Prepare Tron TRC10 transaction for KMS. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param precision
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronTrc10SignedKMSTransaction = async (testnet: boolean, body: TransferTronTrc10, precision?: number, provider?: string) => {
    await validateBody(body, TransferTronTrc10)
    const {
        from,
        to,
        tokenId,
        amount,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.sendToken(
        to,
        new BigNumber(amount).multipliedBy(new BigNumber(10).pow(precision || await getTrc10Precision(testnet, tokenId))),
        tokenId,
        from)
    return JSON.stringify(tx)
}

/**
 * Prepare Tron TRC20 transaction for KMS. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronTrc20SignedKMSTransaction = async (testnet: boolean, body: TransferTronTrc20, provider?: string) => {
    await validateBody(body, TransferTronTrc20)
    const {
        from,
        to,
        tokenAddress,
        amount,
        feeLimit,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(tokenAddress)
    const contractInstance = await tronWeb.contract().at(tokenAddress)
    const decimals = await contractInstance.decimals().call()
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(tokenAddress),
        'transfer(address,uint256)',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from
        },
        [{type: 'address', value: tronWeb.address.toHex(to)}, {
            type: 'uint256',
            value: `0x${new BigNumber(amount).multipliedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString(16)}`
        }],
        from
    )
    return JSON.stringify(transaction)
}

/**
 * Prepare create Tron TRC10 transaction for KMS. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronCreateTrc10SignedKMSTransaction = async (testnet: boolean, body: CreateTronTrc10, provider?: string) => {
    await validateBody(body, CreateTronTrc10)
    const {
        from,
        name,
        abbreviation,
        description,
        url,
        totalSupply,
        decimals,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.createToken({
        name,
        abbreviation,
        description,
        url,
        totalSupply: new BigNumber(totalSupply).multipliedBy(new BigNumber(10).pow(decimals)),
        trxRatio: 1,
        tokenRatio: 1,
        saleStart: Date.now() + 60000,
        saleEnd: Date.now() + 100000,
        freeBandwidth: 0,
        freeBandwidthLimit: 0,
        frozenAmount: 0,
        frozenDuration: 0,
        precision: decimals,
    }, from)
    return JSON.stringify(tx)
}

/**
 * Prepare create Tron TRC20 transaction for KMS. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronCreateTrc20SignedKMSTransaction = async (testnet: boolean, body: CreateTronTrc20, provider?: string) => {
    await validateBody(body, CreateTronTrc20)
    const {
        from,
        name,
        decimals,
        recipient,
        symbol,
        totalSupply,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.createSmartContract({
        feeLimit: 1000000000,
        callValue: 0,
        userFeePercentage: 100,
        originEnergyLimit: 1,
        abi: JSON.stringify(abi),
        bytecode,
        parameters: [
            name,
            symbol,
            decimals,
            tronWeb.address.toHex(recipient),
            totalSupply,
        ],
        name,
    }, from)
    return JSON.stringify(tx)
}

/**
 * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronDeployTrc721SignedTransaction = async (testnet: boolean, body: TronDeployTrc721, provider?: string) => {
    await validateBody(body, TronDeployTrc721)
    const {
        fromPrivateKey,
        name,
        symbol,
        feeLimit,
        signatureId,
        from,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.createSmartContract({
        feeLimit: tronWeb.toSun(feeLimit),
        callValue: 0,
        userFeePercentage: 100,
        originEnergyLimit: 1,
        abi: JSON.stringify(trc721_abi),
        bytecode: trc721_bytecode,
        parameters: [
            name,
            symbol,
        ],
        name,
    }, from || tronWeb.address.fromPrivateKey(fromPrivateKey))
    if (signatureId) {
        return JSON.stringify(tx)
    }
    return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Sign Tron generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronGenerateCustodialWalletSignedTransaction = async (testnet: boolean, body: GenerateTronCustodialAddress, provider?: string) => {
    await validateBody(body, GenerateTronCustodialAddress)
    const tronWeb = prepareTronWeb(testnet, provider)
    const {abi, code} = obtainCustodialAddressType(body)
    const tx = await tronWeb.transactionBuilder.createSmartContract({
        feeLimit: tronWeb.toSun(body.feeLimit || 100),
        callValue: 0,
        userFeePercentage: 100,
        originEnergyLimit: 1,
        abi: JSON.stringify(abi),
        bytecode: code,
        parameters: [],
        name: 'CustodialWallet',
    }, body.from || tronWeb.address.fromPrivateKey(body.fromPrivateKey))
    if (body.signatureId) {
        return JSON.stringify(tx)
    }
    return JSON.stringify(await tronWeb.trx.sign(tx, body.fromPrivateKey))
}

/**
 * Sign TRON deploy new smart contract for NFT marketplace transaction. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum provider will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTronDeployMarketplaceListingSignedTransaction = async (testnet: boolean, body: DeployTronMarketplaceListing, provider?: string) => {
    await validateBody(body, DeployTronMarketplaceListing)
    const tronWeb = prepareTronWeb(testnet, provider)
    const tx = await tronWeb.transactionBuilder.createSmartContract({
        feeLimit: tronWeb.toSun(body.feeLimit || 300),
        callValue: 0,
        userFeePercentage: 100,
        originEnergyLimit: 1,
        abi: JSON.stringify(listing.abi),
        bytecode: listing.data,
        parameters: [
            body.marketplaceFee,
            body.feeRecipient,
        ],
        name: 'CustodialWallet',
    }, body.from || tronWeb.address.fromPrivateKey(body.fromPrivateKey))
    if (body.signatureId) {
        return JSON.stringify(tx)
    }
    return JSON.stringify(await tronWeb.trx.sign(tx, body.fromPrivateKey))
}

/**
 * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronMintCashbackTrc721SignedTransaction = async (testnet: boolean, body: TronMintTrc721, provider?: string) => {
    await validateBody(body, TronMintTrc721)
    const {
        fromPrivateKey,
        url,
        to,
        tokenId,
        contractAddress,
        feeLimit,
        from,
        signatureId,
        authorAddresses,
        cashbackValues
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(contractAddress)
    const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
    const cb: string[] = []
    for (const c of cashbackValues!) {
        cb.push(`0x${new BigNumber(c).multipliedBy(1e6).toString(16)}`)
    }
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(contractAddress),
        'mintWithCashback(address,uint256,string,address[],uint256[])',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: sender
        },
        [{type: 'address', value: tronWeb.address.toHex(to)},
            {
                type: 'uint256',
                value: `0x${new BigNumber(tokenId).toString(16)}`
            },
            {
                type: 'string',
                value: url,
            },
            {
                type: 'address[]',
                value: authorAddresses?.map(a => tronWeb.address.toHex(a)),
            },
            {
                type: 'uint256[]',
                value: cb,
            }],
        sender,
    )
    return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron mint trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronMintTrc721SignedTransaction = async (testnet: boolean, body: TronMintTrc721, provider?: string) => {
    await validateBody(body, TronMintTrc721)
    const {
        fromPrivateKey,
        url,
        to,
        tokenId,
        contractAddress,
        from,
        feeLimit,
        signatureId,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(contractAddress)
    const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(contractAddress),
        'mintWithTokenURI(address,uint256,string)',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: sender
        },
        [{type: 'address', value: tronWeb.address.toHex(to)},
            {
                type: 'uint256',
                value: `0x${new BigNumber(tokenId).toString(16)}`
            },
            {
                type: 'string',
                value: url,
            }],
        sender,
    )
    return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron transfer trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronTransferTrc721SignedTransaction = async (testnet: boolean, body: TronTransferTrc721, provider?: string) => {
    await validateBody(body, TronTransferTrc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        feeLimit,
        from,
        signatureId,
        value
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(contractAddress)
    const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(contractAddress),
        'safeTransfer(address,uint256)',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: sender,
            callValue: value ? `0x${new BigNumber(value).multipliedBy(1e6).toString(16)}` : 0,
        },
        [{type: 'address', value: tronWeb.address.toHex(to)},
            {
                type: 'uint256',
                value: `0x${new BigNumber(tokenId).toString(16)}`
            }],
        sender,
    )
    return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron burn trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronBurnTrc721SignedTransaction = async (testnet: boolean, body: TronBurnTrc721, provider?: string) => {
    await validateBody(body, TronBurnTrc721)
    const {
        fromPrivateKey,
        tokenId,
        contractAddress,
        feeLimit,
        from,
        signatureId,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(contractAddress)
    const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(contractAddress),
        'burn(uint256)',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: sender,
        },
        [{
            type: 'uint256',
            value: `0x${new BigNumber(tokenId).toString(16)}`
        }],
        sender,
    )
    return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron mint multiple trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronMintMultipleTrc721SignedTransaction = async (testnet: boolean, body: TronMintMultipleTrc721, provider?: string) => {
    await validateBody(body, TronMintMultipleTrc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        url,
        feeLimit,
        from,
        signatureId,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(contractAddress)
    const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(contractAddress),
        'mintMultiple(address[],uint256[],string[])',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: sender
        },
        [{
            type: 'address[]',
            value: to.map(a => tronWeb.address.toHex(a)),
        },
            {
                type: 'uint256[]',
                value: tokenId.map(t => `0x${new BigNumber(t).toString(16)}`)
            },
            {
                type: 'string[]',
                value: url,
            }],
        sender,
    )
    return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron update cashback for author trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronUpdateCashbackForAuthorTrc721SignedTransaction = async (testnet: boolean, body: TronUpdateCashbackTrc721, provider?: string) => {
    await validateBody(body, TronUpdateCashbackTrc721)
    const {
        fromPrivateKey,
        cashbackValue,
        tokenId,
        contractAddress,
        feeLimit,
        from,
        signatureId,
    } = body

    const tronWeb = prepareTronWeb(testnet, provider)
    tronWeb.setAddress(contractAddress)
    const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
    const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(contractAddress),
        'updateCashbackForAuthor(uint256,uint256)',
        {
            feeLimit: tronWeb.toSun(feeLimit),
            from: sender
        },
        [{
            type: 'uint256',
            value: `0x${new BigNumber(tokenId).toString(16)}`
        },
            {
                type: 'uint256',
                value: `0x${new BigNumber(cashbackValue).multipliedBy(1e6).toString(16)}`
            }],
        sender,
    )
    return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signTrxKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean) => {
    if (tx.chain !== Currency.TRON) {
        throw Error('Unsupported chain.')
    }
    const transactionConfig = JSON.parse(tx.serializedTransaction)
    const tronWeb = prepareTronWeb(testnet)
    return JSON.stringify(await tronWeb.trx.sign(transactionConfig, fromPrivateKey))
}

export const transferHexToBase58Address = (address: string) => TronWeb.address.fromHex(address)

const getTrc10Precision = async (testnet: boolean, tokenId: string): Promise<number> => {
    const config = {
        method: 'GET',
        url: `/v1/assets/${tokenId}`,
        baseURL: `${testnet ? 'https://api.shasta.trongrid.io' : 'https://api.trongrid.io'}`,
        headers: {
            'content-type': 'application/json',
            'TRON-PRO-API-KEY': process.env.TRON_PRO_API_KEY,
        },
    }
    const { data } = (await axios.request(config as AxiosRequestConfig)).data
    if (!data?.length) {
        throw new Error('No such asset.')
    }
    return data[0].precision
    throw new Error('Get TRC10 precision error.')
}

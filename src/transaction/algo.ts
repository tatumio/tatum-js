const algosdk = require('algosdk');
const base32 = require('base32.js');
import { TextEncoder } from 'util';
import { algorandBroadcast } from '../blockchain';
import {
    AlgoTransaction,
    DeployErc721,
    TransferErc721,
    BurnErc721,
    DeployErc20,
    TransferErc20,
    BurnErc20,
    Currency,
    TransactionKMS,
    MintMultiToken,
    TransferMultiToken,
    BurnMultiToken
} from '../model';
import { generateAlgodAddressFromPrivatetKey } from '../wallet'
const Url = require('url-parse');
/**
 * Algod V2 Client
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint
 * @returns algorand Client
 */
export const getAlgoClient = (testnet: boolean, provider?: string) => {
    if (provider) {
        return new algosdk.Algodv2(`${(testnet ? process.env.TATUM_ALGORAND_TESTNET_TOKEN : process.env.TATUM_ALGORAND_MAINNET_TOKEN) || 'DUMMYTOKEN'}`, provider, Url(provider).port);
    } else {
        return new algosdk.Algodv2({ 'X-API-Key': testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_KEY}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_KEY}` },
            testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_ALGOD_URL}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_ALGOD_URL}`);
    }
}

/**
 * Algo Indexer Client
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint
 * @returns algorand Indexer Client
 */
export const getAlgoIndexerClient = (testnet: boolean, provider?: string) => {
    if (provider) {
        return new algosdk.Indexer(`${(testnet ? process.env.TATUM_ALGORAND_TESTNET_TOKEN : process.env.TATUM_ALGORAND_MAINNET_TOKEN) || 'DUMMYTOKEN'}`, provider, Url(provider).port);
    } else {
        return new algosdk.Indexer({ 'X-API-Key': testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_KEY}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_KEY}` },
            testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_INDEXER_URL}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_INDEXER_URL}`);
    }
}

/**
 * Algorand transaction signing
 * @param testnet if the algorand node is testnet or not
 * @param tx content of the transaction to broadcast
 * @param provider url of the algorand server endpoint for purestake.io restapi
 * @returns transaction id of the transaction in the blockchain
 */
export const prepareAlgoSignedTransaction = async (testnet: boolean, tx: AlgoTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = {
        from: tx.from,
        to: tx.to,
        fee: Number(tx.fee) * 1000000,
        amount: BigInt(Number(tx.amount) * 1000000),
        firstRound: params.firstRound,
        lastRound: params.lastRound,
        genesisID: params.genesisID,
        genesisHash: params.genesisHash,
        note: note
    }
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = algosdk.signTransaction(txn, secretKey);
    return signedTxn.blob;
}

/**
 * Send Algorand transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendAlgoSignedTransaction = async (testnet: boolean, tx: AlgoTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoSignedTransaction(testnet, tx, provider)))
}

export const signAlgoKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.ALGO) {
        throw Error('Unsupported chain.')
    }
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = JSON.parse(tx.serializedTransaction);
    const secretKey = new Uint8Array(decoder.write(fromPrivateKey).buf);
    const signedTxn = algosdk.signTransaction(txn, secretKey);
    return signedTxn.blob
}

export const prepareAlgoCreateNFTSignedTransaction = async (testnet: boolean, tx: DeployErc721, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    if (tx.fromPrivateKey) {
        const from = generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey);
        const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
            from,
            undefined,
            1, 0, false,
            undefined,
            undefined,
            undefined,
            undefined,
            tx.symbol,
            tx.name,
            tx.url,
            undefined,
            params,
        )
        if (tx.signatureId) {
            return JSON.stringify(txn);
        }
        const signedTxn = txn.signTxn(secretKey).do();
        return signedTxn;
    } else {
        throw Error('undefined fromPrivateKey')
    }
}

export const sendAlgoCreateNFTSignedTransaction = async (testnet: boolean, tx: DeployErc721, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateNFTSignedTransaction(testnet, tx, provider)))
}

export const prepareAlgoTransferNFTSignedTransaction = async (testnet: boolean, tx: TransferErc721, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    if (tx.fromPrivateKey) {
        const from = generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey);
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            from,
            tx.to,
            undefined,
            undefined,
            1,
            undefined,
            Number(tx.contractAddress),
            params,
            undefined
        )
        if (tx.signatureId) {
            return JSON.stringify(txn);
        }
        const signedTxn = txn.signTxn(secretKey).do();
        return signedTxn;
    } else {
        throw Error('undefined fromPrivateKey')
    }
}

export const sendAlgoTransferNFTSignedTransaction = async (testnet: boolean, tx: TransferErc721, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferNFTSignedTransaction(testnet, tx, provider)))
}

export const prepareAlgoBurnNFTSignedTransaction = async (testnet: boolean, tx: BurnErc721, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    if (tx.fromPrivateKey) {
        const from = generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey);
        const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
            from,
            undefined,
            Number(tx.contractAddress),
            params,
            undefined
        )
        if (tx.signatureId) {
            return JSON.stringify(txn);
        }
        const signedTxn = txn.signTxn(secretKey).do();
        return signedTxn;
    } else {
        throw Error('undefined fromPrivateKey')
    }
}

export const sendAlgoBurnNFTSignedTransaction = async (testnet: boolean, tx: BurnErc721, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoBurnNFTSignedTransaction(testnet, tx, provider)))
}




export const prepareAlgoCreateFractionalNFTSignedTransaction = async (testnet: boolean, tx: MintMultiToken, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    if (tx.fromPrivateKey) {
        const from = generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey);
        const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
            from,
            undefined,
            10 ** Math.floor(Math.log10(Number(tx.amount))), 
            Math.floor(Math.log10(Number(tx.amount))),
            false,
            undefined,
            undefined,
            undefined,
            undefined,
            tx.tokenId,
            tx.contractAddress,
            tx.url,
            undefined,
            params,
        )
        if (tx.signatureId) {
            return JSON.stringify(txn);
        }
        const signedTxn = txn.signTxn(secretKey).do();
        return signedTxn;
    } else {
        throw Error('undefined fromPrivateKey')
    }
}

export const sendAlgoCreateFractionalNFTSignedTransaction = async (testnet: boolean, tx: MintMultiToken, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateFractionalNFTSignedTransaction(testnet, tx, provider)))
}

export const prepareAlgoTransferFractionalNFTSignedTransaction = async (testnet: boolean, tx: TransferMultiToken, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    if (tx.fromPrivateKey) {
        const from = generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey);
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            from,
            tx.to,
            undefined,
            undefined,
            tx.amount,
            undefined,
            Number(tx.contractAddress),
            params,
            undefined
        )
        if (tx.signatureId) {
            return JSON.stringify(txn);
        }
        const signedTxn = txn.signTxn(secretKey).do();
        return signedTxn;
    } else {
        throw Error('undefined fromPrivateKey')
    }
}

export const sendAlgoTransferFractionalNFTSignedTransaction = async (testnet: boolean, tx: TransferMultiToken, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferFractionalNFTSignedTransaction(testnet, tx, provider)))
}

export const prepareAlgoBurnFractionalNFTSignedTransaction = async (testnet: boolean, tx: BurnMultiToken, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    if (tx.fromPrivateKey) {
        const from = generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey);
        const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
            from,
            undefined,
            Number(tx.contractAddress),
            params,
            undefined
        )
        if (tx.signatureId) {
            return JSON.stringify(txn);
        }
        const signedTxn = txn.signTxn(secretKey).do();
        return signedTxn;
    } else {
        throw Error('undefined fromPrivateKey')
    }
}

export const sendAlgoBurnFractionalNFTSignedTransaction = async (testnet: boolean, tx: BurnMultiToken, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoBurnFractionalNFTSignedTransaction(testnet, tx, provider)))
}






export const prepareAlgoCreateFTSignedTransaction = async (testnet: boolean, tx: DeployErc20, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        tx.address,
        undefined,
        Number(tx.supply),
        Number(tx.digits),
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        tx.symbol,
        tx.name,
        tx.url,
        undefined,
        params,
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const sendAlgoCreateFTSignedTransaction = async (testnet: boolean, tx: DeployErc20, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateFTSignedTransaction(testnet, tx, provider)))
}

export const prepareAlgoTransferFTSignedTransaction = async (testnet: boolean, tx: TransferErc20, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    if (tx.fromPrivateKey) {
        const from = generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey);
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            from,
            tx.to,
            undefined,
            undefined,
            tx.amount,
            undefined,
            Number(tx.contractAddress),
            params,
            undefined
        )
        if (tx.signatureId) {
            return JSON.stringify(txn);
        }
        const signedTxn = txn.signTxn(secretKey).do();
        return signedTxn;
    } else {
        throw Error('undefined fromPrivateKey')
    }
}

export const sendAlgoTransferFTSignedTransaction = async (testnet: boolean, tx: TransferErc20, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferFTSignedTransaction(testnet, tx, provider)))
}

export const prepareAlgoBurnFTSignedTransaction = async (testnet: boolean, tx: BurnErc20, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    if (tx.fromPrivateKey) {
        const from = generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey);
        const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
            from,
            undefined,
            Number(tx.contractAddress),
            params,
            undefined
        )
        if (tx.signatureId) {
            return JSON.stringify(txn);
        }
        const signedTxn = txn.signTxn(secretKey).do();
        return signedTxn;
    } else {
        throw Error('undefined fromPrivateKey')
    }
}

export const sendAlgoBurnFTSignedTransaction = async (testnet: boolean, tx: BurnErc20, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoBurnFTSignedTransaction(testnet, tx, provider)))
}


const algosdk = require('algosdk');
const base32 = require('base32.js');
import {TextEncoder} from 'util';
import {algorandBroadcast} from '../blockchain';
import {
    AlgoTransaction, 
    AlgoCreateNFTTransaction, 
    AlgoConfigNFTTransaction, 
    AlgoTransferNFTTransaction, 
    AlgoDestroyNFTTransaction,
    AlgoCreateFractionalNFTTransaction, 
    AlgoConfigFractionalNFTTransaction, 
    AlgoTransferFractionalNFTTransaction, 
    AlgoDestroyFractionalNFTTransaction,
    AlgoCreateFTTransaction, 
    AlgoConfigFTTransaction, 
    AlgoTransferFTTransaction, 
    AlgoDestroyFTTransaction,
    Currency, 
    TransactionKMS
} from '../model';
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
        return new algosdk.Algodv2({'X-API-Key': testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_KEY}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_KEY}`},
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
        return new algosdk.Indexer({'X-API-Key': testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_KEY}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_KEY}`},
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
export const prepareAlgoSignedTransaction = async ( testnet: boolean, tx: AlgoTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({type: 'rfc4648'})
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
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const txn = JSON.parse(tx.serializedTransaction);
    const secretKey = new Uint8Array(decoder.write(fromPrivateKey).buf);
    const signedTxn = algosdk.signTransaction(txn, secretKey);
    return signedTxn.blob
}


export const prepareAlgoCreateNFTSignedTransaction = async ( testnet: boolean, tx: AlgoCreateNFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        tx.from,
        note,
        1,
        0,
        tx.defaultFrozen,
        tx.manager,
        tx.reserve,
        tx.freeze,
        tx.clawback,
        tx.uintName,
        tx.assetName,
        tx.assetURL,
        tx.assetMetadataHash,
        params,
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoConfigNFTSignedTransaction = async ( testnet: boolean, tx: AlgoConfigNFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetConfigTxnWithSuggestedParams(
        tx.from,
        note,
        tx.assetIndex,
        tx.manager,
        tx.reserve,
        tx.freeze,
        tx.clawback,
        params,
        tx.strictEmptyAddressChecking,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoTransferNFTSignedTransaction = async (testnet: boolean, tx: AlgoTransferNFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        tx.from,
        tx.to,
        tx.closeRemainderTo,
        tx.revocationTarget,
        1,
        tx.note,
        tx.assetIndex,
        params,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoDestroyNFTSignedTransaction = async (testnet: boolean, tx: AlgoDestroyNFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
        tx.from,
        tx.note,
        tx.assetIndex,
        params,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}


export const sendAlgoCreateNFTSignedTransaction = async (testnet: boolean, tx: AlgoCreateNFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoConfigNFTSignedTransaction = async (testnet: boolean, tx: AlgoConfigNFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoConfigNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoTransferNFTSignedTransaction = async (testnet: boolean, tx: AlgoTransferNFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoDestroyNFTSignedTransaction = async (testnet: boolean, tx: AlgoDestroyNFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoDestroyNFTSignedTransaction(testnet, tx, provider)))
}


export const prepareAlgoCreateFractionalNFTSignedTransaction = async ( testnet: boolean, tx: AlgoCreateFractionalNFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        tx.from,
        note,
        Number(tx.total),
        Number(tx.decimals),
        tx.defaultFrozen,
        tx.manager,
        tx.reserve,
        tx.freeze,
        tx.clawback,
        tx.uintName,
        tx.assetName,
        tx.assetURL,
        tx.assetMetadataHash,
        params,
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoConfigFractionalNFTSignedTransaction = async ( testnet: boolean, tx: AlgoConfigFractionalNFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetConfigTxnWithSuggestedParams(
        tx.from,
        note,
        tx.assetIndex,
        tx.manager,
        tx.reserve,
        tx.freeze,
        tx.clawback,
        params,
        tx.strictEmptyAddressChecking,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoTransferFractionalNFTSignedTransaction = async (testnet: boolean, tx: AlgoTransferFractionalNFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        tx.from,
        tx.to,
        tx.closeRemainderTo,
        tx.revocationTarget,
        tx.amount,
        tx.note,
        tx.assetIndex,
        params,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoDestroyFractionalNFTSignedTransaction = async (testnet: boolean, tx: AlgoDestroyFractionalNFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
        tx.from,
        tx.note,
        tx.assetIndex,
        params,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}


export const sendAlgoCreateFractionalNFTSignedTransaction = async (testnet: boolean, tx: AlgoCreateFractionalNFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoConfigFractionalNFTSignedTransaction = async (testnet: boolean, tx: AlgoConfigFractionalNFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoConfigNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoTransferFractionalNFTSignedTransaction = async (testnet: boolean, tx: AlgoTransferFractionalNFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoDestroyFractionalNFTSignedTransaction = async (testnet: boolean, tx: AlgoDestroyFractionalNFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoDestroyNFTSignedTransaction(testnet, tx, provider)))
}


export const prepareAlgoCreateFTSignedTransaction = async ( testnet: boolean, tx: AlgoCreateFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        tx.from,
        note,
        Number(tx.total),
        Number(tx.decimals),
        tx.defaultFrozen,
        tx.manager,
        tx.reserve,
        tx.freeze,
        tx.clawback,
        tx.uintName,
        tx.assetName,
        tx.assetURL,
        tx.assetMetadataHash,
        params,
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoConfigFTSignedTransaction = async ( testnet: boolean, tx: AlgoConfigFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetConfigTxnWithSuggestedParams(
        tx.from,
        note,
        tx.assetIndex,
        tx.manager,
        tx.reserve,
        tx.freeze,
        tx.clawback,
        params,
        tx.strictEmptyAddressChecking,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoTransferFTSignedTransaction = async (testnet: boolean, tx: AlgoTransferFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        tx.from,
        tx.to,
        tx.closeRemainderTo,
        tx.revocationTarget,
        tx.amount,
        tx.note,
        tx.assetIndex,
        params,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}

export const prepareAlgoDestroyFTSignedTransaction = async (testnet: boolean, tx: AlgoDestroyFTTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: 'rfc4648'})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
        tx.from,
        tx.note,
        tx.assetIndex,
        params,
        tx.rekeyTo
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const signedTxn = txn.signTxn(secretKey).do();
    return signedTxn;
}


export const sendAlgoCreateFTSignedTransaction = async (testnet: boolean, tx: AlgoCreateFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoConfigFTSignedTransaction = async (testnet: boolean, tx: AlgoConfigFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoConfigNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoTransferFTSignedTransaction = async (testnet: boolean, tx: AlgoTransferFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferNFTSignedTransaction(testnet, tx, provider)))
}

export const sendAlgoDestroyFTSignedTransaction = async (testnet: boolean, tx: AlgoDestroyFTTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoDestroyNFTSignedTransaction(testnet, tx, provider)))
}

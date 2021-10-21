const algosdk = require('algosdk');
const base32 = require('base32.js');
import {TextEncoder} from 'util';
import {algorandBroadcast} from '../blockchain';
import {TransactionKMS, Currency} from '@tatum/tatum-core';
import {AlgoTransaction} from '../model';

/**
 * Algod V2 Client
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint
 * @returns algorand Client
 */
export const getAlgoClient = (testnet: boolean, provider?: string) => {
    if (provider) {
        return new algosdk.Algodv2((testnet ? `${process.env.TATUM_ALGORAND_TESTNET_TOKEN}` : `${process.env.TATUM_ALGORAND_MAINNET_TOKEN}`) || "DUMMYTOKEN" , provider); 
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
        return algosdk.Indexer((testnet ? `${process.env.TATUM_ALGORAND_TESTNET_TOKEN}` : `${process.env.TATUM_ALGORAND_MAINNET_TOKEN}`) || "DUMMYTOKEN" , provider);
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
    const decoder = new base32.Decoder({type: "rfc4648"})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = {
        "from": tx.from,
        "to": tx.to,
        "fee": BigInt(Number(tx.fee) * 1000000),
        "amount": BigInt(Number(tx.amount) * 1000000),
        "firstRound": params.firstRound,
        "lastRound": params.lastRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesisHash,
        "note": note
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
    const decoder = new base32.Decoder({type: "rfc4648"})
    const txn = JSON.parse(tx.serializedTransaction);
    const secretKey = new Uint8Array(decoder.write(fromPrivateKey).buf);
    const signedTxn = algosdk.signTransaction(txn, secretKey);
    return signedTxn.blob
}

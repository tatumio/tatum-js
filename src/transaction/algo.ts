const algosdk = require('algosdk');
const base32 = require('base32.js');
import { algorandBroadcast } from 'src/blockchain';
import { TextEncoder } from 'util';
import { TATUM_API_URL } from '../constants';
import { AlgoTransaction, Currency, TransactionKMS } from '../model';

/**
 * PureStake Algod V2 Client
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint for purestake.io restapi
 * @returns algorand Client
 */
export const getAlgoClient = (testnet: boolean, provider?: string) => {
    const baseServer = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/algorand/node`;
    const token = {'X-API-Key': `${process.env.ALGO_API_KEY}`}
    const algodClient = new algosdk.Algodv2(token, baseServer, '');
    return algodClient;
}

/**
 * PureStake Algo Indexer Client
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint for purestake.io restapi
 * @returns algorand Indexer Client
 */
export const getAlgoIndexerClient = (testnet: boolean, provider?: string) => {
    const baseServer = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/algorand/indexer`;
    const token = {'X-API-Key': `${process.env.ALGO_API_KEY}`}
    const algoIndexerClient = new algosdk.Indexer(token, baseServer, '');
    return algoIndexerClient;
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
        "fee": Number(tx.fee),
        "amount": BigInt(tx.amount),
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
    const client = getAlgoClient(testnet, provider);    
    const txn = JSON.parse(tx.serializedTransaction)
    const signedTxn = algosdk.signTransaction(txn, fromPrivateKey);
    return signedTxn.blob
}
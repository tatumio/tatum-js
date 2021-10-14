const algosdk = require('algosdk');
const base32 = require('base32.js');
import {TextEncoder} from 'util';
import {algorandBroadcast} from '../blockchain';
import {AlgoTransaction, Currency, TransactionKMS} from '../model';

/**
 * Algod V2 Client
 * @param provider url of the algorand server endpoint with token and port seperate by comman (for example: '<baseurl>,<port>,<token>')
 * @returns algorand Client
 */
export const getAlgoClient = (provider?: string) => {
    if (provider) {
        const params = provider.split(',');
        return new algosdk.Algodv2(params[2], params[0], params[1]);
    } else {
        return new algosdk.Algodv2({'X-API-Key': `${process.env.ALGO_API_KEY}`}, `${process.env.ALGOD_API_URL}`, '');
    }
    
}

/**
 * Algo Indexer Client
 * @param provider url of the algorand server endpoint with token and port seperate by comman (for example: '<baseurl>,<port>,<token>')
 * @returns algorand Indexer Client
 */
export const getAlgoIndexerClient = (provider?: string) => {
    if (provider) {
        const params = provider.split(',');
        return algosdk.Indexer(params[2], params[0], params[1]);
    } else {
        return new algosdk.Indexer({'X-API-Key': `${process.env.ALGO_API_KEY}`}, `${process.env.ALGO_INDEXER_API_URL}`, '');
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
    const algodClient = getAlgoClient(provider);
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

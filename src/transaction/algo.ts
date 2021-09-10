const algosdk = require('algosdk');
const base32 = require('base32.js');
import { TextEncoder } from 'util';
import { TATUM_API_URL } from '../constants';
import { AlgoTransaction } from '../model';

/**
 * 
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint for purestake.io restapi
 * @returns algorand Client
 */
export const getClient = (testnet: boolean, provider?: string) => {
    const baseServer = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/algorand/node`;
    const token = {'X-API-Key': `${process.env.ALGO_API_KEY}`}
    const algodClient = new algosdk.Algodv2(token, baseServer, '');
    return algodClient;
}

/**
 * 
 * @param algodClient algorand Client
 * @param txId transaction id
 * @returns confirmed result
 */
const waitForConfirmation = async (algodClient: any, txId: string) => {
    let lastround = (await algodClient.status().do())['last-round'];
    let limit = 0;
    while (limit < 50) {
        let pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo['confirmed-round']) {
            return true;
        } else if (pendingInfo["pool-error"]) {
            return false;
        }
        lastround++;
        limit++;
        await algodClient.statusAfterBlock(lastround).do();
    }
    return false;
}

/**
 * Algorand transaction signing and confirm result
 * @param testnet if the algorand node is testnet or not
 * @param tx content of the transaction to broadcast
 * @param provider url of the algorand server endpoint for purestake.io restapi
 * @returns transaction id of the transaction in the blockchain
 */
export const signAlgoTransaction = async ( testnet: boolean, tx: AlgoTransaction, provider?: string) => {
    const algodClient = getClient(testnet, provider);
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
    const signedTxn = algosdk.signTransaction(txn, secretKey);
    const sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    const confirm = await waitForConfirmation(algodClient, sendTx.txId);
    if (confirm) return sendTx.txId; else throw Error("Failed Algo Transaction Signing");
}

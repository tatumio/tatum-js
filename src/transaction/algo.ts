const algosdk = require('algosdk');
const base32 = require('base32.js');
import { TATUM_API_URL } from '../constants';
import { AlgoTransaction } from '../model';

export const getClient = (testnet: boolean, provider?: string) => {
    const baseServer = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/algorand/node`;
    const port = '';
    const token = {'X-API-Key': `${process.env.ALGO_API_KEY}`}
    const algodClient = new algosdk.Algodv2(token, baseServer, port);
    return algodClient;
}

const waitForConfirmation = async (algodClient: any, txId: string) => {
    let lastround = (await algodClient.status().do())['last-round'];
    let limit = 0;
    while (limit < 30) {
        let pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo['confirmed-round']) {
            return true;
        }
        lastround++;
        limit++;
        await algodClient.statusAfterBlock(lastround).do();
    }
    return false;
}

export const signAlgoTransaction = async ( testnet: boolean, tx: AlgoTransaction, provider?: string) => {
    const algodClient = getClient(testnet, provider);
    let params = await algodClient.getTransactionParams().do();
    params.fee = Number(tx.fee);
    params.flatFee = true;
    const decoder = new base32.Decoder({type: "rfc4648"})
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const txn = {
        "from": tx.from,
        "to": tx.to,
        "fee": Number(tx.fee),
        "amount": BigInt(tx.amount),
        "firstRound": params.firstRound,
        "lastRound": params.lastRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesisHash,
        "note": new Uint8Array(0)
    }
    const signedTxn = algosdk.signTransaction(txn, secretKey);
    const sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    const confirm = await waitForConfirmation(algodClient, sendTx.txId);
    if (confirm) return sendTx.txId; else throw Error("Failed Algo Transaction Signing");
}

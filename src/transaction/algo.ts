const algosdk = require('algosdk');
const base32 = require('base32.js');
import BigNumber from 'bignumber.js'
import { TextEncoder } from 'util';

export const getClient = (testnet: boolean) => {
    if (testnet) {
        const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
        const port = '';
        const token = {'X-API-Key': 'klnvbVsn983Q3awiuWUGn2OKHkyi3U974JYtGvdt'}
        const algodClient = new algosdk.Algodv2(token, baseServer, port);
        return algodClient;
    } else {
        return null;
    }
}

const waitForConfirmation = async (algodClient: any, txId: string) => {
    let lastround = (await algodClient.status().do())['last-round'];
    let limit = 0;
    while (true) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
            break;
        }
        lastround++;
        limit++;
        if (limit > 30) return 0;
        await algodClient.statusAfterBlock(lastround).do();
    }
    return 1;
}

export const signAlgoTransaction = async ( testnet: boolean, from: string, to: string, fee: number, amount: BigInt, privKey: string) => {
    let algodClient = getClient(testnet);
    let params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    const decoder = new base32.Decoder({type: "rfc4648"})
    const secretKey = new Uint8Array(decoder.write(privKey).buf);
    let txn = {
        "from": from,
        "to": to,
        "fee": params.fee,
        "amount": amount,
        "firstRound": params.firstRound,
        "lastRound": params.lastRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesisHash,
        "note": new Uint8Array(0)
    }
    let signedTxn = algosdk.signTransaction(txn, secretKey);
    let sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    let confirm = await waitForConfirmation(algodClient, sendTx.txId);
    if (confirm === 1) return sendTx.txId; else return "faild";
}

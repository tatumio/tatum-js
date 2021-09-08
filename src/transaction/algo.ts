const algosdk = require('algosdk');
const base32 = require('base32.js');

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
    while (limit < 30) {
        let pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
            return 1;
            break;
        }
        lastround++;
        limit++;
        await algodClient.statusAfterBlock(lastround).do();
    }
    return 0;
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

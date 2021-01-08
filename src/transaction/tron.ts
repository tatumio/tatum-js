import BigNumber from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import {tronBroadcast} from '../blockchain';
import {Currency, TransactionKMS, TransferTron} from '../model';
// tslint:disable-next-line:no-var-requires
const TronWeb = require('tronweb');

const prepareTronWeb = (testnet: boolean) => {
    const HttpProvider = TronWeb.providers.HttpProvider;
    const url = testnet ? 'https://api.shasta.trongrid.io' : 'https://api.trongrid.io';
    const fullNode = new HttpProvider(url);
    const solidityNode = new HttpProvider(url);
    const eventServer = new HttpProvider(url);
    return new TronWeb(fullNode, solidityNode, eventServer);
};

/**
 * Send Tron transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTronTransaction = async (testnet: boolean, body: TransferTron) => {
    return tronBroadcast(await prepareTronSignedTransaction(testnet, body));
};

/**
 * Sign Tron pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signTronKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean) => {
    if (tx.chain !== Currency.TRON) {
        throw Error('Unsupported chain.');
    }
    const tronWeb = prepareTronWeb(testnet);
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    return await tronWeb.trx.sign(transactionConfig, fromPrivateKey);
};

/**
 * Sign Tron transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTronSignedTransaction = async (testnet: boolean, body: TransferTron) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        amount,
    } = body;

    const tronWeb = prepareTronWeb(testnet);
    const tx = await tronWeb.transactionBuilder.sendTrx(
        to,
        new BigNumber(amount).multipliedBy(1000000).toFixed(0)
        , tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey)));
    return await tronWeb.trx.sign(tx, fromPrivateKey);
};

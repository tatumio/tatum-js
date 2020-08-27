import {
    ECSignature,
    Transaction,
    TransactionBuilder as KMSTransactionBuilder
// @ts-ignore
} from '@bitcoin-dot-com/bitcoincashjs2-lib';
import BigNumber from 'bignumber.js';
import {ECPair, TransactionBuilder} from 'bitbox-sdk';
import {validateOrReject} from 'class-validator';
// @ts-ignore
import coininfo from 'coininfo';
import {bcashBroadcast, bcashGetTransaction} from '../blockchain';
import {Currency, TransferBchBlockchain} from '../model/request';
import {BchTx, TransactionKMS} from '../model/response';
import {TxnDetailsResult} from 'bitcoin-com-rest';

/**
 * Send Bitcoin Cash transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBitcoinCashTransaction = async (testnet: boolean, body: TransferBchBlockchain) => {
    return bcashBroadcast(await prepareBitcoinCashSignedTransaction(testnet, body));
};

/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signBitcoinCashKMSTransaction = async (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => {
    if (tx.chain !== Currency.BCH) {
        throw Error('Unsupported chain.');
    }
    const [data, amountsToDecode] = tx.serializedTransaction.split(':');
    const transaction = Transaction.fromHex(data);
    const amountsToSign = JSON.parse(amountsToDecode);
    const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS();
    const builder = KMSTransactionBuilder.fromTransaction(transaction, network);
    for (const [i, privateKey] of privateKeys.entries()) {
        const ecPair = new ECPair().fromWIF(privateKey);
        builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, ECSignature.SCHNORR);
    }
    return builder.build().toHex();
};

/**
 * Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBitcoinCashSignedTransaction = async (testnet: boolean, body: TransferBchBlockchain) => {
    await validateOrReject(body);
    const {fromUTXO, to} = body;
    const networkType = testnet ? 'testnet' : 'mainnet';
    const transactionBuilder = new TransactionBuilder(networkType);
    const privateKeysToSign: string[] = [];
    const amountToSign: number[] = [];
    const txs = await getTransactions(fromUTXO.map(u => u.txHash));
    for (const [i, item] of fromUTXO.entries()) {
        transactionBuilder.addInput(item.txHash, item.index);
        privateKeysToSign.push(item.privateKey);
        amountToSign.push(Number(new BigNumber(txs[i].vout[item.index].value).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)));
    }
    for (const item of to) {
        transactionBuilder.addOutput(item.address, Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)));
    }

    for (let i = 0; i < privateKeysToSign.length; i++) {
        const ecPair = new ECPair().fromWIF(privateKeysToSign[i]);
        transactionBuilder.sign(i, ecPair, undefined, transactionBuilder.hashTypes.SIGHASH_ALL, amountToSign[i], transactionBuilder.signatureAlgorithms.SCHNORR);
    }
    return transactionBuilder.build().toHex();
};

const getTransactions = async (txHash: string[]): Promise<BchTx[]> => {
    const result = [];
    for (const tx of txHash) {
        result.push(bcashGetTransaction(tx));
    }
    return await Promise.all(result);
};
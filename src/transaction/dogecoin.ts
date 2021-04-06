import BigNumber from 'bignumber.js';
import {ECPair, Network, Transaction, TransactionBuilder} from 'bitcoinjs-lib';
import {dogeBroadcast} from '../blockchain';
import {validateBody} from '../connector/tatum';
import {DOGE_NETWORK, DOGE_TEST_NETWORK} from '../constants';
import {Currency, TransactionKMS, TransferDogeBlockchain} from '../model';

const prepareSignedTransaction = async (network: Network, body: TransferDogeBlockchain) => {
    await validateBody(body, TransferDogeBlockchain);
    const {fromUTXO, to} = body;
    const tx = new TransactionBuilder(network);
    const privateKeysToSign: string[] = [];
    for (const item of fromUTXO) {
        tx.addInput(item.txHash, item.index);
        privateKeysToSign.push(item.signatureId || item.privateKey);
    }
    for (const item of to) {
        tx.addOutput(item.address, Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
    }

    if (fromUTXO[0].signatureId) {
        return JSON.stringify({txData: tx.buildIncomplete().toHex(), privateKeysToSign});
    }
    for (let i = 0; i < privateKeysToSign.length; i++) {
        const ecPair = ECPair.fromWIF(privateKeysToSign[i], network);
        tx.sign(i, ecPair);
    }
    return tx.build().toHex();
};

/**
 * Sign Dogecoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signDogecoinKMSTransaction = async (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => {
    if (tx.chain !== Currency.DOGE) {
        throw Error('Unsupported chain.');
    }
    const network = testnet ? DOGE_TEST_NETWORK : DOGE_NETWORK;
    const builder = TransactionBuilder.fromTransaction(Transaction.fromHex(tx.serializedTransaction), network);
    for (const [i, privateKey] of privateKeys.entries()) {
        const ecPair = ECPair.fromWIF(privateKey, network);
        builder.sign(i, ecPair);
    }
    return builder.build().toHex();
};

/**
 * Sign Dogecoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDogecoinSignedTransaction = async (testnet: boolean, body: TransferDogeBlockchain) => {
    return prepareSignedTransaction(testnet ? DOGE_TEST_NETWORK : DOGE_NETWORK, body);
};

/**
 * Send Dogecoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDogecoinTransaction = async (testnet: boolean, body: TransferDogeBlockchain) => {
    return dogeBroadcast(await prepareDogecoinSignedTransaction(testnet, body));
};

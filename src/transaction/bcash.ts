import BigNumber from 'bignumber.js';
import {ECPair, TransactionBuilder} from 'bitbox-sdk';
import {validateOrReject} from 'class-validator';
import {bcashBroadcast} from '../blockchain';
import {TransferBchBlockchain} from '../model/request/TransferBchBlockchain';

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
    for (const [i, item] of fromUTXO.entries()) {
        transactionBuilder.addInput(item.txHash, item.index);
        privateKeysToSign.push(item.privateKey);
        amountToSign.push(Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
    }
    for (const item of to) {
        transactionBuilder.addOutput(item.address, Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
    }

    for (let i = 0; i < privateKeysToSign.length; i++) {
        const ecPair = new ECPair().fromWIF(privateKeysToSign[i]);
        transactionBuilder.sign(i, ecPair, undefined, transactionBuilder.hashTypes.SIGHASH_ALL, amountToSign[i], transactionBuilder.signatureAlgorithms.SCHNORR);
    }
    return transactionBuilder.build().toHex();
};
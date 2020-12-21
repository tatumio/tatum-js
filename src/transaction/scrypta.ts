import BigNumber from 'bignumber.js';
import {ECPair, Network, networks, Transaction, TransactionBuilder} from 'bitcoinjs-lib';
import {validateOrReject} from 'class-validator';
import {
    scryptaBroadcast,
    scryptaGetUnspentForAccount
} from '../blockchain';
import {LYRA_NETWORK, LYRA_TEST_NETWORK} from '../constants';
import {Currency, TransactionKMS, TransferBtcBasedBlockchain} from '../model';

const prepareSignedTransaction = async (network: Network, body: TransferBtcBasedBlockchain) => {
    await validateOrReject(body);
    const {fromUTXO, fromAddress, to} = body;
    const tx = new TransactionBuilder(network);
    const privateKeysToSign: string[] = [];
    tx.setVersion(1)
    if (fromAddress) {
        for (const item of fromAddress) {
            const txs = await scryptaGetUnspentForAccount(item.address);
            for (const t of txs) {
                try {
                    tx.addInput(t.txid, t.vout);
                    privateKeysToSign.push(item.privateKey);
                } catch (e) {
                }
            }
        }
    } else if (fromUTXO) {
        for (const item of fromUTXO) {
            tx.addInput(item.txHash, item.index);
            privateKeysToSign.push(item.privateKey);
        }
    }
    for (const item of to) {
        tx.addOutput(item.address, Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
    }
    for (let i = 0; i < privateKeysToSign.length; i++) {
        const ecPair = ECPair.fromWIF(privateKeysToSign[i], network);
        tx.sign(i, ecPair);
    }
    return tx.build().toHex();
};

/**
 * Sign Scrypta pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signScryptaKMSTransaction = async (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => {
    if (tx.chain !== Currency.LTC) {
        throw Error('Unsupported chain.');
    }
    const network = testnet ? LYRA_TEST_NETWORK : LYRA_NETWORK;
    const builder = TransactionBuilder.fromTransaction(Transaction.fromHex(tx.serializedTransaction), network);
    for (const [i, privateKey] of privateKeys.entries()) {
        const ecPair = ECPair.fromWIF(privateKey, network);
        builder.sign(i, ecPair);
    }
    return builder.build().toHex();
};

/**
 * Sign Scrypta transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareScryptaSignedTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return prepareSignedTransaction(testnet ? LYRA_TEST_NETWORK : LYRA_NETWORK, body);
};


/**
 * Send Scrypta transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendScryptaTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return scryptaBroadcast(await prepareScryptaSignedTransaction(testnet, body));
};
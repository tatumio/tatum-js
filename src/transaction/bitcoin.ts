import BigNumber from 'bignumber.js';
import {ECPair, Network, networks, TransactionBuilder} from 'bitcoinjs-lib';
import {validateOrReject} from 'class-validator';
import {
    btcBroadcast,
    btcGetTxForAccount,
    btcGetUTXO,
    ltcBroadcast,
    ltcGetTxForAccount,
    ltcGetUTXO
} from '../blockchain';
import {LTC_NETWORK, LTC_TEST_NETWORK} from '../constants';
import {Currency, TransferBtcBasedBlockchain} from '../model';


const prepareSignedTransaction = async (network: Network, body: TransferBtcBasedBlockchain, curency: Currency) => {
    await validateOrReject(body);
    const {fromUTXO, fromAddress, to} = body;
    const tx = new TransactionBuilder(network);
    const privateKeysToSign: string[] = [];
    if (fromAddress) {
        for (const item of fromAddress) {
            const txs = curency === Currency.BTC ? await btcGetTxForAccount(item.address) : await ltcGetTxForAccount(item.address);
            for (const t of txs) {
                for (const [i, o] of t.outputs.entries()) {
                    if (o.address !== item.address) {
                        continue;
                    }
                    try {
                        if (curency === Currency.BTC) {
                            await btcGetUTXO(t.hash, i);
                        } else {
                            await ltcGetUTXO(t.hash, i);
                        }
                        tx.addInput(t.hash, i);
                        privateKeysToSign.push(item.privateKey);
                    } catch (e) {
                    }
                }
            }
        }
    } else {
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
 * Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBitcoinSignedTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return prepareSignedTransaction(testnet ? networks.testnet : networks.bitcoin, body, Currency.BTC);
};

/**
 * Sign Litcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareLitecoinSignedTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return prepareSignedTransaction(testnet ? LTC_TEST_NETWORK : LTC_NETWORK, body, Currency.LTC);
};

/**
 * Send Bitcoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBitcoinTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return btcBroadcast(await prepareBitcoinSignedTransaction(testnet, body));
};

/**
 * Send Litecoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendLitecoinTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return ltcBroadcast(await prepareLitecoinSignedTransaction(testnet, body));
};
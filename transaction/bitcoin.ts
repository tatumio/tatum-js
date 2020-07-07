import BigNumber from 'bignumber.js';
import {ECPair, Network, networks, TransactionBuilder} from 'bitcoinjs-lib';
import {LTC_NETWORK, TEST_LTC_NETWORK} from '../constants';
import {TransferBtcBasedBlockchain} from '../model/TransferBtcBasedBlockchain';

const prepareSignedTransaction = async (network: Network, body: TransferBtcBasedBlockchain) => {
    const {fromUTXO, to} = body;
    const tx = new TransactionBuilder(network);
    const privateKeysToSign: string[] = [];
    for (const item of fromUTXO) {
        tx.addInput(item.txHash, item.index);
        privateKeysToSign.push(item.privateKey);
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

export const prepareBitcoinSignedTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return prepareSignedTransaction(testnet ? networks.testnet : networks.bitcoin, body);
};

export const prepareLitecoinSignedTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return prepareSignedTransaction(testnet ? TEST_LTC_NETWORK : LTC_NETWORK, body);
};
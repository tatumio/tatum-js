import BigNumber from 'bignumber.js';
// @ts-ignore
import {PrivateKey, Script, Transaction} from 'bitcore-lib';
import {btcBroadcast, btcGetTransaction, btcGetTxForAccount, btcGetUTXO,} from '../blockchain';
import {validateBody} from '../connector/tatum';
import {BtcTxOutputs, Currency, TransactionKMS, TransferBtcBasedBlockchain} from '../model';

const prepareSignedTransaction = async (body: TransferBtcBasedBlockchain, currency: Currency) => {
    await validateBody(body, TransferBtcBasedBlockchain);
    const {fromUTXO, fromAddress, to} = body;
    const tx = new Transaction();
    const privateKeysToSign: string[] = [];
    if (fromAddress) {
        for (const item of fromAddress) {
            const txs = await btcGetTxForAccount(item.address);
            for (const t of txs) {
                for (const [i, o] of (t.outputs as BtcTxOutputs[]).entries()) {
                    if (o.address !== item.address) {
                        continue;
                    }
                    try {
                        await btcGetUTXO(t.hash, i);
                        tx.from({
                            txId: t.hash,
                            outputIndex: i,
                            script: Script.fromAddress(item.address).toString(),
                            satoshis: o.value,
                        });
                        privateKeysToSign.push(item.signatureId || item.privateKey);
                    } catch (e) {
                    }
                }
            }
        }
    } else if (fromUTXO) {
        for (const item of fromUTXO) {
            const t = await btcGetTransaction(item.txHash);
            const address = t.outputs ? t.outputs[item.index].address : t.vout?.[item.index].scriptPubKey.addresses[0];
            const value = t.outputs ? t.outputs[item.index].value :
                Number(new BigNumber(t.vout?.[item.index].value || 0).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR));
            tx.from({
                txId: item.txHash,
                outputIndex: item.index,
                script: Script.fromAddress(address).toString(),
                satoshis: value,
            });
            privateKeysToSign.push(item.signatureId || item.privateKey);
        }
    }
    for (const item of to) {
        tx.to(item.address, Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
    }

    if ((fromAddress && fromAddress[0].signatureId) || (fromUTXO && fromUTXO[0].signatureId)) {
        return JSON.stringify({txData: JSON.stringify(tx), privateKeysToSign});
    }

    for (const item of privateKeysToSign) {
        tx.sign(PrivateKey.fromWIF(item));
    }
    return tx.serialize(true);
};

/**
 * Sign Bitcoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signBitcoinKMSTransaction = async (tx: TransactionKMS, privateKeys: string[]) => {
    if (tx.chain !== Currency.BTC) {
        throw Error('Unsupported chain.');
    }
    const builder = new Transaction(JSON.parse(tx.serializedTransaction));
    for (const privateKey of privateKeys) {
        builder.sign(PrivateKey.fromWIF(privateKey));
    }
    return builder.serialize(true);
};

/**
 * Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBitcoinSignedTransaction = async (testnet: boolean, body: TransferBtcBasedBlockchain) => {
    return prepareSignedTransaction(body, Currency.BTC);
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

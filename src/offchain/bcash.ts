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
import {Currency, KeyPair, TransactionKMS, TransferBtcBasedOffchain, WithdrawalResponseData} from '../model';
import {generateAddressFromXPub, generateBchWallet, generatePrivateKeyFromMnemonic} from '../wallet';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

/**
 * Send Bitcoin Cash transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBitcoinCashOffchainTransaction = async (testnet: boolean, body: TransferBtcBasedOffchain) => {
    await validateOrReject(body);
    const {
        mnemonic, keyPair, attr: changeAddress, ...withdrawal
    } = body;
    if (!withdrawal.fee) {
        withdrawal.fee = '0.00005';
    }
    const {id, data} = await offchainStoreWithdrawal(withdrawal);
    const {
        amount, address,
    } = withdrawal;
    let txData;
    try {
        txData = await prepareBitcoinCashSignedOffchainTransaction(testnet, data, amount, address, mnemonic, keyPair, changeAddress);
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.BCH}), id};
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
};

/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signBitcoinCashOffchainKMSTransaction = async (tx: TransactionKMS, mnemonic: string, testnet: boolean) => {
    if (tx.chain !== Currency.BCH || !tx.withdrawalResponses) {
        throw Error('Unsupported chain.');
    }
    const [data, amountsToDecode] = tx.serializedTransaction.split(':');
    const transaction = Transaction.fromHex(data);
    const amountsToSign = JSON.parse(amountsToDecode) as number[];
    const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS();
    const builder = KMSTransactionBuilder.fromTransaction(transaction, network);
    for (const [i, response] of tx.withdrawalResponses.entries()) {
        if (response.vIn === '-1') {
            continue;
        }
        const ecPair = new ECPair().fromWIF(await generatePrivateKeyFromMnemonic(Currency.BCH, testnet, mnemonic, response.address?.derivationKey || 0));
        builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, ECSignature.SCHNORR);
    }
    return builder.build().toHex();
};

/**
 * Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param data data from Tatum system to prepare transaction from
 * @param amount amount to send
 * @param address recipient address
 * @param mnemonic mnemonic to sign transaction from. mnemonic or keyPair must be present
 * @param keyPair keyPair to sign transaction from. keyPair or mnemonic must be present
 * @param changeAddress address to send the rest of the unused coins
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBitcoinCashSignedOffchainTransaction =
    async (testnet: boolean, data: WithdrawalResponseData[], amount: string, address: string, mnemonic?: string, keyPair?: KeyPair[], changeAddress?: string) => {
        const networkType = testnet ? 'testnet' : 'mainnet';
        const tx = new TransactionBuilder(networkType);

        data.forEach((input) => {
            if (input.vIn !== '-1') {
                tx.addInput(input.vIn, input.vInIndex);
            }
        });

        const lastVin = data.find(d => d.vIn === '-1') as WithdrawalResponseData;
        tx.addOutput(address, Number(new BigNumber(amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)));
        if (mnemonic) {
            const {xpub} = generateBchWallet(testnet, mnemonic);
            tx.addOutput(generateAddressFromXPub(Currency.BCH, testnet, xpub, 0), Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)));
        } else if (keyPair && changeAddress) {
            tx.addOutput(changeAddress, Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)));
        } else {
            throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.');
        }
        for (const [i, input] of data.entries()) {
            // when there is no address field present, input is pool transfer to 0
            if (input.vIn === '-1') {
                continue;
            }
            const value = Number(new BigNumber(data[i].amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR));
            if (mnemonic) {
                const derivationKey = input.address && input.address.derivationKey ? input.address.derivationKey : 0;
                const privateKey = await generatePrivateKeyFromMnemonic(Currency.BCH, testnet, mnemonic, derivationKey);
                const ecPair = new ECPair().fromWIF(privateKey);
                tx.sign(i, ecPair, undefined, tx.hashTypes.SIGHASH_ALL, value, tx.signatureAlgorithms.SCHNORR);
            } else if (keyPair) {
                // @ts-ignore
                const privateKey = keyPair.find(k => k.address === input.address.address);
                if (privateKey) {
                    const ecPair = new ECPair().fromWIF(privateKey.privateKey);
                    tx.sign(i, ecPair, undefined, tx.hashTypes.SIGHASH_ALL, value, tx.signatureAlgorithms.SCHNORR);
                }
            }
        }

        return tx.build().toHex();
    };
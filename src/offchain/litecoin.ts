import BigNumber from 'bignumber.js';
import {ECPair, networks, Transaction, TransactionBuilder} from 'bitcoinjs-lib';
import {validateOrReject} from 'class-validator';
import {LTC_NETWORK, LTC_TEST_NETWORK} from '../constants';
import {Currency, KeyPair, TransactionKMS, TransferBtcBasedOffchain, WithdrawalResponseData} from '../model';
import {generateAddressFromXPub, generateLtcWallet, generatePrivateKeyFromMnemonic} from '../wallet';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

/**
 * Send Litecoin transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendLitecoinOffchainTransaction = async (testnet: boolean, body: TransferBtcBasedOffchain) => {
    await validateOrReject(body);
    const {
        mnemonic, keyPair, attr: changeAddress, ...withdrawal
    } = body;
    if (!withdrawal.fee) {
        withdrawal.fee = '0.0005';
    }
    const {id, data} = await offchainStoreWithdrawal(withdrawal);
    const {
        amount, address,
    } = withdrawal;
    let txData;
    try {
        txData = await prepareLitecoinSignedOffchainTransaction(testnet, data, amount, address, mnemonic, keyPair, changeAddress);
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.LTC}), id};
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
};

/**
 * Sign Litecoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signLitecoinOffchainKMSTransaction = async (tx: TransactionKMS, mnemonic: string, testnet: boolean) => {
    if (tx.chain !== Currency.LTC || !tx.withdrawalResponses) {
        throw Error('Unsupported chain.');
    }
    const network = testnet ? networks.testnet : networks.bitcoin;
    const builder = TransactionBuilder.fromTransaction(Transaction.fromHex(tx.serializedTransaction), network);
    for (const [i, response] of tx.withdrawalResponses.entries()) {
        if (response.vIn === '-1') {
            continue;
        }
        const ecPair = ECPair.fromWIF(await generatePrivateKeyFromMnemonic(Currency.LTC, testnet, mnemonic, response.address?.derivationKey || 0), network);
        builder.sign(i, ecPair);
    }
    return builder.build().toHex();
};

/**
 * Sign Litecoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param data data from Tatum system to prepare transaction from
 * @param amount amount to send
 * @param address recipient address
 * @param mnemonic mnemonic to sign transaction from. mnemonic or keyPair must be present
 * @param keyPair keyPair to sign transaction from. keyPair or mnemonic must be present
 * @param changeAddress address to send the rest of the unused coins
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareLitecoinSignedOffchainTransaction =
    async (testnet: boolean, data: WithdrawalResponseData[], amount: string, address: string, mnemonic?: string, keyPair?: KeyPair[], changeAddress?: string) => {
        const network = testnet ? LTC_TEST_NETWORK : LTC_NETWORK;
        const tx = new TransactionBuilder(network);

        data.forEach((input) => {
            if (input.vIn !== '-1') {
                tx.addInput(input.vIn, input.vInIndex);
            }
        });

        const lastVin = data.find(d => d.vIn === '-1') as WithdrawalResponseData;
        tx.addOutput(address, Number(new BigNumber(amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
        if (mnemonic) {
            const {xpub} = await generateLtcWallet(testnet, mnemonic);
            tx.addOutput(generateAddressFromXPub(Currency.LTC, testnet, xpub, 0), Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
        } else if (keyPair && changeAddress) {
            tx.addOutput(changeAddress, Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
        } else {
            throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.');
        }
        for (const [i, input] of data.entries()) {
            // when there is no address field present, input is pool transfer to 0
            if (input.vIn === '-1') {
                continue;
            }
            if (mnemonic) {
                const derivationKey = input.address?.derivationKey || 0;
                const ecPair = ECPair.fromWIF(await generatePrivateKeyFromMnemonic(Currency.LTC, testnet, mnemonic, derivationKey), network);
                tx.sign(i, ecPair);
            } else if (keyPair) {
                const privateKey = keyPair.find(k => k.address === input.address.address) as KeyPair;
                const ecPair = ECPair.fromWIF(privateKey.privateKey, network);
                tx.sign(i, ecPair);
            } else {
                throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.');
            }
        }

        return tx.build().toHex();
    };
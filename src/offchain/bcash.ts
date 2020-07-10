import BigNumber from 'bignumber.js';
import {ECPair, TransactionBuilder} from 'bitbox-sdk';
import {validateOrReject} from 'class-validator';
import {Currency, KeyPair, TransferBtcBasedOffchain, WithdrawalResponseData} from '../model';
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
        return await offchainBroadcast({txData, withdrawalId: id, currency: Currency.BCH});
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
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
    async (testnet: boolean, data: WithdrawalResponseData[], amount: string, address: string, mnemonic: string, keyPair: KeyPair[], changeAddress?: string) => {
        const networkType = testnet ? 'testnet' : 'mainnet';
        const tx = new TransactionBuilder(networkType);

        data.forEach((input) => {
            if (input.vIn !== '-1') {
                tx.addInput(input.vIn, input.vInIndex);
            }
        });

        const lastVin = data.find(d => d.vIn === '-1') as WithdrawalResponseData;
        tx.addOutput(address, Number(new BigNumber(amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
        if (mnemonic) {
            const {xpub} = generateBchWallet(testnet, mnemonic);
            tx.addOutput(generateAddressFromXPub(Currency.BCH, testnet, xpub, 0), Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
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
            const value = Number(data[i].amount) * 100000000;
            if (mnemonic) {
                const derivationKey = input.address && input.address.derivationKey ? input.address.derivationKey : 0;
                const privateKey = await generatePrivateKeyFromMnemonic(Currency.BCH, testnet, mnemonic, derivationKey);
                const ecPair = new ECPair().fromWIF(privateKey);
                tx.sign(i, ecPair, undefined, tx.hashTypes.SIGHASH_ALL, value, tx.signatureAlgorithms.SCHNORR);
            } else if (keyPair) {
                // @ts-ignore
                const privateKey = keyPair.find(k => k.address === input.address.address);
                if (privateKey) {
                    const ecPair = new ECPair().fromWIF(privateKey.private);
                    tx.sign(i, ecPair, undefined, tx.hashTypes.SIGHASH_ALL, value, tx.signatureAlgorithms.SCHNORR);
                }
            }
        }

        return tx.build().toHex();
    };
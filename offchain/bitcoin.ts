import BigNumber from 'bignumber.js';
import {ECPair, networks, TransactionBuilder} from 'bitcoinjs-lib';
import {validateOrReject} from 'class-validator';
import {Currency, KeyPair, TransferBtcBasedOffchain, WithdrawalResponseData} from '../model';
import {generateAddressFromXPub, generateBtcWallet, generatePrivateKeyFromMnemonic} from '../wallet';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

export const sendBitcoinOffchainTransaction = async (testnet: boolean, body: TransferBtcBasedOffchain) => {
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
        txData = await prepareBitcoinSignedOffchainTransaction(testnet, id, data, amount, address, mnemonic, keyPair, changeAddress);
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return await offchainBroadcast({txData, withdrawalId: id, currency: Currency.BTC});
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
};

export const prepareBitcoinSignedOffchainTransaction =
    async (testnet: boolean, id: string, data: WithdrawalResponseData[], amount: string, address: string, mnemonic: string, keyPair: KeyPair[], changeAddress?: string) => {
        const network = testnet ? networks.testnet : networks.bitcoin;
        const tx = new TransactionBuilder(network);

        data.forEach((input) => {
            if (input.vIn !== '-1') {
                tx.addInput(input.vIn, input.vInIndex);
            }
        });

        const lastVin = data.find(d => d.vIn === '-1') as WithdrawalResponseData;
        tx.addOutput(address, Number(new BigNumber(amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
        if (mnemonic) {
            const {xpub} = await generateBtcWallet(testnet, mnemonic);
            tx.addOutput(generateAddressFromXPub(Currency.BTC, testnet, xpub, 0), Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)));
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
                const derivationKey = input.address ? input.address.derivationKey : 0;
                const ecPair = ECPair.fromWIF(await generatePrivateKeyFromMnemonic(Currency.BTC, testnet, mnemonic, derivationKey), network);
                tx.sign(i, ecPair);
            } else {
                const privateKey = keyPair.find(k => k.address === input.address.address) as KeyPair;
                const ecPair = ECPair.fromWIF(privateKey.private, network);
                tx.sign(i, ecPair);
            }
        }

        return tx.build().toHex();
    };
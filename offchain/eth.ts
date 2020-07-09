import BigNumber from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {CONTRACT_ADDRESSES, CONTRACT_DECIMALS} from '../constants';
import tokenAbi from '../contracts/erc20/token_abi';
import {getAccountById, getVirtualCurrencyByName} from '../ledger';
import {Currency, TransferEthErc20Offchain, TransferEthOffchain} from '../model';
import {ethGetGasPriceInWei} from '../transaction';
import {generatePrivateKeyFromMnemonic} from '../wallet';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

export const sendEthOffchainTransaction = async (testnet: boolean, body: TransferEthOffchain) => {
    await validateOrReject(body);
    const {
        mnemonic, index, privateKey, nonce, ...withdrawal
    } = body;
    const {amount, address} = withdrawal;

    let fromPriv;
    if (mnemonic && index !== undefined) {
        fromPriv = mnemonic && index ? await generatePrivateKeyFromMnemonic(Currency.ETH, testnet, mnemonic, index) : privateKey;
    } else if (privateKey) {
        fromPriv = privateKey;
    } else {
        throw new Error('No mnemonic or private key is present.');
    }

    const web3 = new Web3();
    web3.eth.accounts.wallet.add(fromPriv);
    web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
    // @ts-ignore
    withdrawal.senderBlockchainAddress = web3.eth.accounts.wallet[0].address;
    const gasPrice = await ethGetGasPriceInWei(web3);

    const account = await getAccountById(withdrawal.senderAccountId);
    const {txData, gasLimit} = await prepareEthSignedOffchainTransaction(amount, fromPriv, address, account.currency, web3, gasPrice, nonce);
    const fee = new BigNumber(web3.utils.fromWei(new BigNumber(gasLimit).multipliedBy(gasPrice).toString(), 'ether')).toString();
    // @ts-ignore
    withdrawal.fee = fee;
    const {id} = await offchainStoreWithdrawal(withdrawal);
    try {
        return await offchainBroadcast({txData, withdrawalId: id, currency: Currency.ETH});
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
};

export const sendEthErc20OffchainTransaction = async (testnet: boolean, body: TransferEthErc20Offchain) => {
    await validateOrReject(body);
    const {
        mnemonic, index, privateKey, nonce, ...withdrawal
    } = body;
    const {amount, address} = withdrawal;

    let fromPriv;
    if (mnemonic && index !== undefined) {
        fromPriv = mnemonic && index ? await generatePrivateKeyFromMnemonic(Currency.ETH, testnet, mnemonic, index) : privateKey;
    } else if (privateKey) {
        fromPriv = privateKey;
    } else {
        throw new Error('No mnemonic or private key is present.');
    }

    const web3 = new Web3();
    web3.eth.accounts.wallet.add(fromPriv);
    web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
    // @ts-ignore
    withdrawal.senderBlockchainAddress = web3.eth.accounts.wallet[0].address;
    const gasPrice = await ethGetGasPriceInWei(web3);

    const account = await getAccountById(withdrawal.senderAccountId);
    const vc = await getVirtualCurrencyByName(account.currency);
    const {txData, gasLimit} = await prepareEthErc20SignedOffchainTransaction(amount, fromPriv, address, web3, vc.erc20Address as string, gasPrice, nonce);
    const fee = new BigNumber(web3.utils.fromWei(new BigNumber(gasLimit).multipliedBy(gasPrice).toString(), 'ether')).toString();
    // @ts-ignore
    withdrawal.fee = fee;
    const {id} = await offchainStoreWithdrawal(withdrawal);
    try {
        return await offchainBroadcast({txData, withdrawalId: id, currency: Currency.ETH});
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
};

export const prepareEthSignedOffchainTransaction =
    async (amount: string, privateKey: string, address: string, currency: string, web3: Web3, gasPrice: string, nonce?: number) => {
        let tx: TransactionConfig;
        if (currency === 'ETH') {
            tx = {
                from: 0,
                to: address.trim(),
                value: web3.utils.toWei(amount, 'ether'),
                gasPrice,
                nonce,
            };
        } else {
            if (!Object.keys(CONTRACT_ADDRESSES).includes(currency)) {
                throw new Error('Unsupported ETH ERC20 blockchain.');
            }
            // @ts-ignore
            const contract = new web3.eth.Contract(tokenAbi, CONTRACT_ADDRESSES[currency]);

            tx = {
                from: 0,
                to: CONTRACT_ADDRESSES[currency],
                data: contract.methods.transfer(address.trim(), new BigNumber(amount).multipliedBy(10).pow(CONTRACT_DECIMALS[currency]).toString(16)).encodeABI(),
                gasPrice,
                nonce,
            };
        }
        tx.gas = await web3.eth.estimateGas(tx);
        return {
            txData: (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string,
            gasLimit: tx.gas
        };
    };

export const prepareEthErc20SignedOffchainTransaction =
    async (amount: string, privateKey: string, address: string, web3: Web3, tokenAddress: string, gasPrice: string, nonce?: number) => {
        // @ts-ignore
        const contract = new web3.eth.Contract(tokenAbi, tokenAddress);
        let tx: TransactionConfig;
        tx = {
            from: 0,
            to: tokenAddress.trim(),
            data: contract.methods.transfer(address.trim(), new BigNumber(amount).multipliedBy(10).pow(18)).encodeABI(),
            gasPrice,
            nonce,
        };
        tx.gas = await web3.eth.estimateGas(tx);
        return {
            txData: (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string,
            gasLimit: tx.gas
        };
    };

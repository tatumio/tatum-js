import {validateOrReject} from 'class-validator';
import {thorify} from 'thorify';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {vetBroadcast} from '../blockchain';
import {TEST_VET_URL, VET_URL} from '../constants';
import {Currency, TransactionKMS, TransferVet} from '../model';

/**
 * Send VeChain transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendVetTransaction = async (testnet: boolean, body: TransferVet, provider?: string) => {
    return vetBroadcast(await prepareVetSignedTransaction(testnet, body, provider));
};

/**
 * Sign VeChain pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signVetKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.VET) {
        throw Error('Unsupported chain.');
    }
    const client = thorify(new Web3(), provider || (testnet ? TEST_VET_URL : VET_URL));
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig);
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction;
};

/**
 * Sign VeChain transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareVetSignedTransaction = async (testnet: boolean, body: TransferVet, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        amount,
        data,
        fee,
    } = body;

    const client = thorify(new Web3(), provider || (testnet ? TEST_VET_URL : VET_URL));
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    const tx: TransactionConfig = {
        from: 0,
        to: to.trim(),
        data: data ? client.utils.toHex(data) : undefined,
        value: client.utils.toWei(`${amount}`, 'ether'),
    };

    if (fee) {
        tx.gas = fee.gasLimit;
    } else {
        tx.gas = await client.eth.estimateGas(tx);
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction;
};
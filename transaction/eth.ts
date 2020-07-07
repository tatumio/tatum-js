import axios from 'axios';
import {BigNumber} from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {getEthTransactionsCount} from '../blockchain';
import {CONTRACT_ADDRESSES, CONTRACT_DECIMALS, TRANSFER_METHOD_ABI} from '../constants';
import {CreateRecord} from '../model/CreateRecord';
import {Currency} from '../model/Currency';
import {TransferCustomErc20} from '../model/TransferCustomErc20';
import {TransferEthErc20} from '../model/TransferEthErc20';

const getGasPriceInWei = async (client: Web3) => {
    const {data} = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    return client.utils.toWei(new BigNumber(data.fast).dividedBy(10).toString(), 'gwei');
};

export const prepareStoreDataTransaction = async (body: CreateRecord) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        ethFee,
        data,
        nonce,
    } = body;
    const client = new Web3();
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const address = to || client.eth.defaultAccount;
    const addressNonce = nonce ? nonce : await getEthTransactionsCount(address);
    const customFee = ethFee ? ethFee : {
        gasLimit: `${data.length * 68 + 21000}`,
        gasPrice: client.utils.fromWei(await getGasPriceInWei(client), 'gwei'),
    };

    const tx: TransactionConfig = {
        from: 0,
        to: address.trim(),
        value: '0',
        gasPrice: customFee.gasPrice,
        gas: customFee.gasLimit,
        data: data ? (client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)) : undefined,
        nonce: addressNonce,
    };

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

export const prepareEthOrErc20SignedTransaction = async (body: TransferEthErc20) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        amount,
        currency,
        fee,
        data,
        nonce,
    } = body;

    const client = new Web3();
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let tx: TransactionConfig;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await getGasPriceInWei(client);
    if (currency === Currency.ETH) {
        tx = {
            from: 0,
            to: to.trim(),
            value: client.utils.toWei(`${amount}`, 'ether'),
            gasPrice,
            data: data ? (client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)) : undefined,
            nonce,
        };
    } else {
        // @ts-ignore
        const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], CONTRACT_ADDRESSES[currency]);
        const digits = new BigNumber(10).pow(CONTRACT_DECIMALS[currency]);
        tx = {
            from: 0,
            to: CONTRACT_ADDRESSES[currency],
            data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
            gasPrice,
            nonce,
        };
    }

    if (fee) {
        tx.gas = fee.gasLimit;
    } else {
        tx.gas = await client.eth.estimateGas(tx) + 5000;
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

export const prepareCustomErc20SignedTransaction = async (body: TransferCustomErc20) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        amount,
        contractAddress,
        digits,
        fee,
        nonce,
    } = body;

    const client = new Web3();
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let tx: TransactionConfig;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await getGasPriceInWei(client);
    // @ts-ignore
    const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], contractAddress);
    const decimals = new BigNumber(10).pow(digits);
    tx = {
        from: 0,
        to: contractAddress,
        data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).multipliedBy(decimals).toString(16)}`).encodeABI(),
        gasPrice,
        nonce,
    };

    if (fee) {
        tx.gas = fee.gasLimit;
    } else {
        tx.gas = await client.eth.estimateGas(tx) + 5000;
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction;
};

// TODO: add ERC721 support
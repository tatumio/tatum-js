import axios from 'axios';
import {BigNumber} from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {ethBroadcast, ethGetTransactionsCount} from '../blockchain';
import {CONTRACT_ADDRESSES, CONTRACT_DECIMALS, ETH_URL, TEST_ETH_URL, TRANSFER_METHOD_ABI} from '../constants';
import tokenABI from '../contracts/erc20/token_abi';
import tokenByteCode from '../contracts/erc20/token_bytecode';
import {CreateRecord, Currency, DeployEthErc20, TransferCustomErc20, TransferEthErc20} from '../model';

export const ethGetGasPriceInWei = async (client: Web3) => {
    const {data} = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    return client.utils.toWei(new BigNumber(data.fast).dividedBy(10).toString(), 'gwei');
};

export const prepareStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        ethFee,
        data,
        nonce,
    } = body;
    const client = new Web3(provider || (testnet ? TEST_ETH_URL : ETH_URL));
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const address = to || client.eth.defaultAccount;
    const addressNonce = nonce ? nonce : await ethGetTransactionsCount(address);
    const customFee = ethFee ? ethFee : {
        gasLimit: `${data.length * 68 + 21000}`,
        gasPrice: client.utils.fromWei(await ethGetGasPriceInWei(client), 'gwei'),
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

export const prepareEthOrErc20SignedTransaction = async (testnet: boolean, body: TransferEthErc20, provider?: string) => {
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

    const client = new Web3(provider || (testnet ? TEST_ETH_URL : ETH_URL));
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let tx: TransactionConfig;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei(client);
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

export const prepareCustomErc20SignedTransaction = async (testnet: boolean, body: TransferCustomErc20, provider?: string) => {
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

    const client = new Web3(provider || (testnet ? TEST_ETH_URL : ETH_URL));
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let tx: TransactionConfig;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei(client);
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
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

export const prepareDeployErc20SignedTransaction = async (testnet: boolean, body: DeployEthErc20, provider?: string) => {
    await validateOrReject(body);
    const {
        name,
        address,
        symbol,
        supply,
        digits,
        fromPrivateKey,
        nonce,
        fee,
    } = body;

    const client = new Web3(provider || (testnet ? TEST_ETH_URL : ETH_URL));
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei(client);
    // @ts-ignore
    const contract = new client.eth.Contract(tokenABI);
    const deploy = contract.deploy({
        data: tokenByteCode,
        arguments: [
            name,
            symbol,
            address,
            digits,
            `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
            `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
        ],
    });
    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        gasPrice,
        nonce,
    };

    if (fee) {
        tx.gas = fee.gasLimit;
    } else {
        tx.gas = await client.eth.estimateGas(tx) + 5000;
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

export const sendStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) => {
    return ethBroadcast(await prepareStoreDataTransaction(testnet, body, provider));
};
export const sendEthOrErc20Transaction = async (testnet: boolean, body: TransferEthErc20, provider?: string) => {
    return ethBroadcast(await prepareEthOrErc20SignedTransaction(testnet, body, provider));
};
export const sendCustomErc20Transaction = async (testnet: boolean, body: TransferCustomErc20, provider?: string) => {
    return ethBroadcast(await prepareCustomErc20SignedTransaction(testnet, body, provider));
};
export const sendDeployErc20Transaction = async (testnet: boolean, body: DeployEthErc20, provider?: string) => {
    return ethBroadcast(await prepareDeployErc20SignedTransaction(testnet, body, provider));
};
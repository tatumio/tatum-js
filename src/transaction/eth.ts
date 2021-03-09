import axios from 'axios';
import {BigNumber} from 'bignumber.js';
import { URL } from 'url'
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {ethBroadcast, ethGetTransactionsCount} from '../blockchain';
import { validateBody } from '../connector/tatum'
import {CONTRACT_ADDRESSES, CONTRACT_DECIMALS, TATUM_API_URL, TRANSFER_METHOD_ABI} from '../constants';
import tokenABI from '../contracts/erc20/token_abi';
import tokenByteCode from '../contracts/erc20/token_bytecode';
import {CreateRecord, Currency, DeployEthErc20, TransactionKMS, TransferCustomErc20, TransferEthErc20} from '../model';
import { SmartContractMethodInvocation } from '../model/request/SmartContractMethodInvocation'

/**
 * Estimate Gas price for the transaction.
 */
export const ethGetGasPriceInWei = async () => {
  const gasStationUrl = new URL('https://ethgasstation.info/json/ethgasAPI.json')
  if (process.env.TATUM_GAS_STATION_API_KEY) {
    gasStationUrl.searchParams.set('apiKey', process.env.TATUM_GAS_STATION_API_KEY)
  }
  const { data } = await Promise.race([
    axios.get(gasStationUrl.toString()),
    axios.get('https://www.etherchain.org/api/gasPriceOracle'),
  ]);
  return Web3.utils.toWei(new BigNumber(data.fast).dividedBy(10).toString(), 'gwei');
};

/**
 * Returns Ethereum server to connect to.
 *
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 */
export const getClient = (provider?: string) => new Web3(provider || `${TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);

/**
 * Sign Ethereum pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signEthKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.ETH) {
        throw Error('Unsupported chain.');
    }
    const client = getClient(provider)
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig);
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord);
    const {
        fromPrivateKey,
        to,
        ethFee,
        data,
        nonce,
    } = body;
    const client = getClient(provider)
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey as string);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const address = to || client.eth.defaultAccount;
    const addressNonce = nonce ? nonce : await ethGetTransactionsCount(address);
    const customFee = ethFee ? ethFee : {
        gasLimit: `${data.length * 68 + 21000}`,
        gasPrice: client.utils.fromWei(await ethGetGasPriceInWei(), 'gwei'),
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

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};

/**
 * Sign Ethereum or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthOrErc20SignedTransaction = async (testnet: boolean, body: TransferEthErc20, provider?: string) => {
    await validateBody(body, TransferEthErc20);
    const {
        fromPrivateKey,
        to,
        amount,
        currency,
        fee,
        data,
        nonce,
    } = body;

    const client = getClient(provider)
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let tx: TransactionConfig;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
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

/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCustomErc20SignedTransaction = async (testnet: boolean, body: TransferCustomErc20, provider?: string) => {
    await validateBody(body, TransferCustomErc20);
    const {
        fromPrivateKey,
        to,
        amount,
        contractAddress,
        digits,
        fee,
        nonce,
    } = body;

    const client = getClient(provider)
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let tx: TransactionConfig;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
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

/**
 * Sign Ethereum deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc20SignedTransaction = async (testnet: boolean, body: DeployEthErc20, provider?: string) => {
    await validateBody(body, DeployEthErc20);
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

    const client = getClient(provider)
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
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

/**
 * Sign Ethereum invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (testnet: boolean, body: SmartContractMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractMethodInvocation)
  const {
    fromPrivateKey,
    fee,
    params,
    methodName,
    methodABI,
    contractAddress,
    nonce,
    signatureId,
  } = body;
  const client = getClient(provider)

  client.eth.accounts.wallet.clear();
  client.eth.accounts.wallet.add(fromPrivateKey);
  client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

  const contract = new client.eth.Contract([methodABI]);
  const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods[methodName as string](...params).encodeABI(),
    gasPrice,
    nonce,
  };

  if (fee) {
    tx.gas = fee.gasLimit;
  } else {
    tx.gas = signatureId ? 1000000 : await client.eth.estimateGas(tx) + 5000;
  }
  return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
}

/**
 * Send Ethereum invoke smart contract transaction to the blockchain.
 * Invoked method only reads from blockchain the data and returns them back.
 *
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 */
export const sendSmartContractReadMethodInvocationTransaction = async (body: SmartContractMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractMethodInvocation)
  const {
    params,
    methodName,
    methodABI,
    contractAddress,
  } = body;
  const client = getClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress);
  return { data: await contract.methods[methodName as string](...params).call() };
}

/**
 * Send Ethereum store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) =>
  ethBroadcast(await prepareStoreDataTransaction(testnet, body, provider));

/**
 * Send Ethereum or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthOrErc20Transaction = async (testnet: boolean, body: TransferEthErc20, provider?: string) =>
  ethBroadcast(await prepareEthOrErc20SignedTransaction(testnet, body, provider));

/**
 * Send Ethereum custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCustomErc20Transaction = async (testnet: boolean, body: TransferCustomErc20, provider?: string) =>
  ethBroadcast(await prepareCustomErc20SignedTransaction(testnet, body, provider));

/**
 * Send Ethereum deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc20Transaction = async (testnet: boolean, body: DeployEthErc20, provider?: string) =>
  ethBroadcast(await prepareDeployErc20SignedTransaction(testnet, body, provider));

/**
 * Send Ethereum invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (testnet: boolean, body: SmartContractMethodInvocation, provider?: string) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendSmartContractReadMethodInvocationTransaction(body, provider)
  }
  return ethBroadcast(await prepareSmartContractWriteMethodInvocation(testnet, body, provider))
}

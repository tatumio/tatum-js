import axios from 'axios';
import {BigNumber} from 'bignumber.js';
import {URL} from 'url';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {ethBroadcast, ethGetTransactionsCount} from '../blockchain';
import {validateBody} from '../connector/tatum';
import {CONTRACT_ADDRESSES, CONTRACT_DECIMALS, TATUM_API_URL, TRANSFER_METHOD_ABI} from '../constants';
import erc20TokenABI from '../contracts/erc20/token_abi';
import erc20TokenBytecode from '../contracts/erc20/token_bytecode';
import erc721TokenABI from '../contracts/erc721/erc721_abi';
import erc721TokenBytecode from '../contracts/erc721/erc721_bytecode';
import {
    CreateRecord,
    Currency,
    DeployEthErc20,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    SmartContractMethodInvocation,
    TransactionKMS,
    TransferCustomErc20,
    TransferEthErc20,
} from '../model';

/**
 * Estimate Gas price for the transaction.
 */
export const ethGetGasPriceInWei = async () => {
    const gasStationUrl = new URL('https://ethgasstation.info/json/ethgasAPI.json');
    if (process.env.TATUM_GAS_STATION_API_KEY) {
        gasStationUrl.searchParams.set('apiKey', process.env.TATUM_GAS_STATION_API_KEY);
    }
    const data = await Promise.race([
        axios.get(gasStationUrl.toString())
            .then(response => `${response.data.fastest / 10}`),
        axios.get('https://www.etherchain.org/api/gasPriceOracle').then(response => `${response.data.fastest}`),
    ]);
    return Web3.utils.toWei(data, 'gwei');
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
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signEthKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, provider?: string) => {
    if (tx.chain !== Currency.ETH) {
        throw Error('Unsupported chain.');
    }
    const client = getClient(provider);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig);
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStoreDataTransaction = async (body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord);
    const {
        fromPrivateKey,
        to,
        ethFee,
        data,
        nonce,
        signatureId
    } = body;
    const client = getClient(provider);
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

    if (signatureId) {
        return JSON.stringify(tx);
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};

/**
 * Sign Ethereum or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthOrErc20SignedTransaction = async (body: TransferEthErc20, provider?: string) => {
    await validateBody(body, TransferEthErc20);
    const {
        fromPrivateKey,
        to,
        amount,
        currency,
        fee,
        data,
        nonce,
        signatureId
    } = body;

    const client = getClient(provider);
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

    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    if (signatureId) {
        return JSON.stringify(tx);
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCustomErc20SignedTransaction = async (body: TransferCustomErc20, provider?: string) => {
    await validateBody(body, TransferCustomErc20);
    const {
        fromPrivateKey,
        to,
        amount,
        contractAddress,
        digits,
        fee,
        nonce,
        signatureId
    } = body;

    const client = getClient(provider);
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

    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    if (signatureId) {
        return JSON.stringify(tx);
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc20SignedTransaction = async (body: DeployEthErc20, provider?: string) => {
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
        signatureId,
    } = body;

    const client = getClient(provider);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI);
    const deploy = contract.deploy({
        data: erc20TokenBytecode,
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
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    if (signatureId) {
        return JSON.stringify(tx);
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (body: SmartContractMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractMethodInvocation);
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
    const client = getClient(provider);

    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    const contract = new client.eth.Contract([methodABI]);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();

    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods[methodName as string](...params).encodeABI(),
        gasPrice,
        nonce,
    };
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    if (signatureId) {
        return JSON.stringify(tx);
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintErc721SignedTransaction = async (body: EthMintErc721, provider?: string) => {
    await validateBody(body, EthMintErc721);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        nonce,
        fee,
        url,
        signatureId
    } = body;

    const client = getClient(provider);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
        gasPrice,
        nonce,
    };

    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    if (signatureId) {
        return JSON.stringify(tx);
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultipleErc721SignedTransaction = async (body: EthMintMultipleErc721, provider?: string) => {
    await validateBody(body, EthMintMultipleErc721);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        url,
        nonce,
        signatureId,
        fee
    } = body;

    const client = await getClient(provider);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress);

    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintMultiple(to.map(t => t.trim()), tokenId, url).encodeABI(),
        gasPrice,
        nonce,
    };
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    if (signatureId) {
        return JSON.stringify(tx);
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnErc721SignedTransaction = async (body: EthBurnErc721, provider?: string) => {
    await validateBody(body, EthBurnErc721);
    const {
        fromPrivateKey,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId
    } = body;

    const client = getClient(provider);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.burn(tokenId).encodeABI(),
        gasPrice,
        nonce,
    };

    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    if (signatureId) {
        return JSON.stringify(tx);
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthTransferErc721SignedTransaction = async (body: EthTransferErc721, provider?: string) => {
    await validateBody(body, EthTransferErc721);
    const {
        fromPrivateKey,
        to,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
    } = body;

    const client = await getClient(provider);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();

    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.safeTransfer(to.trim(), tokenId).encodeABI(),
        gasPrice,
        nonce,
    };

    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    if (signatureId) {
        return JSON.stringify(tx);
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Ethereum deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthDeployErc721SignedTransaction = async (body: EthDeployErc721, provider?: string) => {
    await validateBody(body, EthDeployErc721);
    const {
        fromPrivateKey,
        fee,
        name,
        symbol,
        nonce,
        signatureId,
    } = body;

    const client = await getClient(provider);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;


    // @ts-ignore
    const contract = new client.eth.Contract(erc721TokenABI, null, {
        data: erc721TokenBytecode,
    });

    // @ts-ignore
    const deploy = contract.deploy({
        arguments: [name, symbol]
    });

    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        gasPrice: fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei(),
        nonce,
        gas: fee ? fee.gasLimit : 4500000
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction as string;
};

/**
 * Send Ethereum invoke smart contract transaction to the blockchain.
 * Invoked method only reads from blockchain the data and returns them back.
 *
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 */
export const sendSmartContractReadMethodInvocationTransaction = async (body: SmartContractMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractMethodInvocation);
    const {
        params,
        methodName,
        methodABI,
        contractAddress,
    } = body;
    const client = getClient(provider);
    const contract = new client.eth.Contract([methodABI], contractAddress);
    return {data: await contract.methods[methodName as string](...params).call()};
};

/**
 * Send Ethereum store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendStoreDataTransaction = async (body: CreateRecord, provider?: string) =>
    ethBroadcast(await prepareStoreDataTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthOrErc20Transaction = async (body: TransferEthErc20, provider?: string) =>
    ethBroadcast(await prepareEthOrErc20SignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCustomErc20Transaction = async (body: TransferCustomErc20, provider?: string) =>
    ethBroadcast(await prepareCustomErc20SignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc20Transaction = async (body: DeployEthErc20, provider?: string) =>
    ethBroadcast(await prepareDeployErc20SignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (body: SmartContractMethodInvocation, provider?: string) => {
    if (body.methodABI.stateMutability === 'view') {
        return sendSmartContractReadMethodInvocationTransaction(body, provider);
    }
    return ethBroadcast(await prepareSmartContractWriteMethodInvocation(body, provider), body.signatureId);
};

/**
 * Send Ethereum ERC721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721Transaction = async (body: EthMintErc721, provider?: string) =>
    ethBroadcast(await prepareEthMintErc721SignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum ERC721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleErc721Transaction = async (body: EthMintMultipleErc721, provider?: string) =>
    ethBroadcast(await prepareEthMintMultipleErc721SignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum ERC721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnErc721Transaction = async (body: EthBurnErc721, provider?: string) =>
    ethBroadcast(await prepareEthBurnErc721SignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendErc721Transaction = async (body: EthTransferErc721, provider?: string) =>
    ethBroadcast(await prepareEthTransferErc721SignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum ERC721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc721Transaction = async (body: EthDeployErc721, provider?: string) =>
    ethBroadcast(await prepareEthDeployErc721SignedTransaction(body, provider), body.signatureId);

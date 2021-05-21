import axios from 'axios';
import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { toWei } from 'web3-utils';
import { ethBroadcast, ethGetTransactionsCount } from '../blockchain';
import { validateBody } from '../connector/tatum';
import { CONTRACT_ADDRESSES, CONTRACT_DECIMALS, TATUM_API_URL, TRANSFER_METHOD_ABI } from '../constants';
import erc20TokenABI from '../contracts/erc20/token_abi';
import erc20TokenBytecode from '../contracts/erc20/token_bytecode';
import erc721TokenABI from '../contracts/erc721/erc721_abi';
import erc721TokenBytecode from '../contracts/erc721/erc721_bytecode';
import erc1155TokenABI from '../contracts/erc1155/erc1155_abi';
import erc1155TokenBytecode from '../contracts/erc1155/erc1155_bytecode';
import {
    CreateRecord,
    Currency,
    DeployErc20,
    MintErc20,
    BurnErc20,
    EthBurnMultiToken,
    EthBurnMultiTokenBatch,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    SmartContractMethodInvocation,
    TransactionKMS,
    TransferCustomErc20,
    TransferEthErc20,
    UpdateCashbackErc721,
    MintMultiToken,
    MintMultiTokenBatch,
    TransferMultiToken,
    TransferMultiTokenBatch,
    EthDeployMultiToken,
} from '../model';

/**
 * Estimate Gas price for the transaction.
 */
export const ethGetGasPriceInWei = async () => {
    let gasStationUrl = 'https://ethgasstation.info/json/ethgasAPI.json';
    if (process.env.TATUM_GAS_STATION_API_KEY) {
        gasStationUrl = `${gasStationUrl}?apiKey=${process.env.TATUM_GAS_STATION_API_KEY}`;
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
 * @param privateKey
 */
export const getClient = (provider?: string, privateKey?: string) => {
    const web3 = new Web3(provider || `${TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    if (privateKey) {
        web3.eth.accounts.wallet.add(privateKey);
        web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
    }
    return web3;
};

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
    const client = getClient(provider, fromPrivateKey);
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig);
    if (!transactionConfig.nonce) {
        transactionConfig.nonce = await ethGetTransactionsCount(client.eth.defaultAccount as string);
    }
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string)).rawTransaction as string;
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
    const client = getClient(provider, fromPrivateKey);
    const address = (to || client.eth.defaultAccount) as string;
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
 * Sign Ethereum mint ERC 20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintErc20SignedTransaction = async (body: MintErc20, provider?: string) => {
    await validateBody(body, MintErc20);
    const {
        fromPrivateKey,
        amount,
        to,
        contractAddress,
        nonce,
        signatureId,
    } = body;

    const client = getClient(provider, fromPrivateKey);

    const gasPrice = await ethGetGasPriceInWei();
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim());
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call());
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mint(to.trim(), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
        gasPrice,
        nonce,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }

    tx.gas = await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};

/**
 * Sign Ethereum burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) => {
    await validateBody(body, BurnErc20);
    const {
        fromPrivateKey,
        amount,
        contractAddress,
        nonce,
        signatureId,
    } = body;

    const client = getClient(provider, fromPrivateKey);

    const gasPrice = await ethGetGasPriceInWei();
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim());
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call());
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.burn(`0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
        gasPrice,
        nonce,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }

    tx.gas = await client.eth.estimateGas(tx);
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

    const client = getClient(provider, fromPrivateKey);

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

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
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

    const client = getClient(provider, fromPrivateKey);

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

    if (signatureId) {
        return JSON.stringify(tx);
    }

    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};

/**
 * Sign Ethereum deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) => {
    await validateBody(body, DeployErc20);
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
        totalCap,
    } = body;

    const client = getClient(provider, fromPrivateKey);

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
            `0x${new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
            `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
        ],
    });
    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        gasPrice,
        nonce,
    };
    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
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
    const client = getClient(provider, fromPrivateKey);

    const contract = new client.eth.Contract([methodABI]);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();

    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods[methodName as string](...params).encodeABI(),
        gasPrice,
        nonce,
    };
    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
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

    const client = getClient(provider, fromPrivateKey);

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

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintCashbackErc721SignedTransaction = async (body: EthMintErc721, provider?: string) => {
    await validateBody(body, EthMintErc721);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        authorAddresses,
        cashbackValues,
        url,
        nonce,
        signatureId,
        fee
    } = body;

    const client = await getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress);

    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const cb: string[] = [];
    const cashbacks: string[] = cashbackValues!;
    // tslint:disable-next-line: prefer-for-of
    for (const c of cashbacks) {
        cb.push(`0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
    }
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
        gasPrice,
        nonce,
    };
    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultipleCashbackErc721SignedTransaction = async (body: EthMintMultipleErc721, provider?: string) => {
    await validateBody(body, EthMintMultipleErc721);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        url,
        nonce,
        signatureId,
        authorAddresses,
        cashbackValues,
        fee
    } = body;

    const client = await getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress);
    const cashbacks: string[][] = cashbackValues!;
    const cb: string[][] = [];

    for (const c of cashbacks) {
        const cb2: string[] = [];
        for (const c2 of c) {
            cb2.push(`0x${new BigNumber(client.utils.toWei(c2, 'ether')).toString(16)}`)
        }
        cb.push(cb2)
    }
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintMultipleCashback(to.map(t => t.trim()), tokenId, url, authorAddresses, cb).encodeABI(),
        gasPrice,
        nonce,
    };
    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
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

    const client = await getClient(provider, fromPrivateKey);

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
    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
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

    const client = getClient(provider, fromPrivateKey);

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

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};

/**
 * Sign Ethereum update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthUpdateCashbackForAuthorErc721SignedTransaction = async (body: UpdateCashbackErc721, provider?: string) => {
    await validateBody(body, EthBurnErc721);
    const {
        fromPrivateKey,
        author,
        cashbackValue,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
    } = body;

    const client = getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
        gasPrice,
        nonce,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
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
        value
    } = body;

    const client = await getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.safeTransfer(to.trim(), tokenId).encodeABI(),
        gasPrice,
        nonce,
        value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultiTokenBatchSignedTransaction = async (body: MintMultiTokenBatch, provider?: string) => {
    await validateBody(body, MintMultiTokenBatch);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        nonce,
        data,
        fee,
        amounts,
        signatureId,
    } = body;

    const client = getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const amts = amounts.map(amts => amts.map(amt => `0x${new BigNumber(client.utils.toWei(amt, 'ether')).toString(16)}`));
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintBatch(to, tokenId, amts, data).encodeABI(),
        gasPrice,
        nonce,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultiTokenSignedTransaction = async (body: MintMultiToken, provider?: string) => {
    await validateBody(body, MintMultiToken);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        nonce,
        data,
        fee,
        amount,
        signatureId,
    } = body;

    const client = getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(client.utils.toWei(amount, 'ether')).toString(16)}`, data).encodeABI(),
        gasPrice,
        nonce,
    };
    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum mint with cashback ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintCashbackMultiTokenSignedTransaction = async (body: MintMultiToken, provider?: string) => {
    await validateBody(body, MintMultiToken);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        authorAddresses,
        cashbackValues,
        nonce,
        amount,
        data,
        signatureId,
        fee
    } = body;

    const client = await getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);

    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const cb: string[] = [];
    const cashbacks: string[] = cashbackValues!;
    // tslint:disable-next-line: prefer-for-of
    for (const c of cashbacks) {
        cb.push(`0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
    }
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintWithCashback(to, tokenId, `0x${new BigNumber(client.utils.toWei(amount, 'ether')).toString(16)}`, data, authorAddresses, cb).encodeABI(),
        gasPrice,
        nonce,
    };
    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum mint multiple ERC 1155 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultipleCashbackMultiTokenSignedTransaction = async (body: MintMultiTokenBatch, provider?: string) => {
    await validateBody(body, MintMultiTokenBatch);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        nonce,
        signatureId,
        amounts,
        authorAddresses,
        cashbackValues,
        data,
        fee
    } = body;

    const client = await getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);
    const cashbacks: string[][][] = cashbackValues!;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const cb = cashbacks.map(cashback => cashback.map(cbs => cbs.map(c => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)))
    const amt = amounts.map(amts => amts.map(amt => `0x${new BigNumber(client.utils.toWei(amt, 'ether')).toString(16)}`));
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintBatchWithCashback(to.map(t => t.trim()), tokenId, amt, data, authorAddresses, cb).encodeABI(),
        gasPrice,
        nonce,
    };
    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};

/**
 * Sign Ethereum burn ERC 1155 batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnBatchMultiTokenSignedTransaction = async (body: EthBurnMultiTokenBatch, provider?: string) => {
    await validateBody(body, EthBurnMultiTokenBatch);
    const {
        fromPrivateKey,
        account,
        tokenId,
        amounts,
        fee,
        contractAddress,
        nonce,
        signatureId
    } = body;

    const client = getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
        gasPrice,
        nonce,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum burn ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnMultiTokenSignedTransaction = async (body: EthBurnMultiToken, provider?: string) => {
    await validateBody(body, EthBurnMultiToken);
    const {
        fromPrivateKey,
        account,
        tokenId,
        amount,
        fee,
        contractAddress,
        nonce,
        signatureId
    } = body;

    const client = getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.burn(account, tokenId, amount).encodeABI(),
        gasPrice,
        nonce,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum update cashback ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthUpdateCashbackForAuthorMultiTokenSignedTransaction = async (body: UpdateCashbackErc721, provider?: string) => {
    await validateBody(body, EthBurnErc721);
    const {
        fromPrivateKey,
        author,
        cashbackValue,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
    } = body;

    const client = getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
        gasPrice,
        nonce,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum transfer ERC 1155 Batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBatchTransferMultiTokenSignedTransaction = async (body: TransferMultiTokenBatch, provider?: string) => {
    await validateBody(body, TransferMultiTokenBatch);
    const {
        fromPrivateKey,
        to,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
        amounts,
        data,
        value
    } = body;

    const client = await getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const amts = amounts.map(amt => `0x${new BigNumber(client.utils.toWei(amt, 'ether')).toString(16)}`)

    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.safeBatchTransfer(to.trim(), tokenId.map(token => token.trim()), amts).encodeABI(),
        gasPrice,
        nonce,
        value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum transfer ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthTransferMultiTokenSignedTransaction = async (body: TransferMultiToken, provider?: string) => {
    await validateBody(body, EthTransferErc721);
    const {
        fromPrivateKey,
        to,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
        amount,
        data,
        value
    } = body;

    const client = await getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress);
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei();
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount).multipliedBy(1e18).toString(16)}`, data).encodeABI(),
        gasPrice,
        nonce,
        value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx);

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};
/**
 * Sign Ethereum deploy ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthDeployMultiTokenSignedTransaction = async (body: EthDeployMultiToken, provider?: string) => {
    await validateBody(body, EthDeployMultiToken);
    const {
        fromPrivateKey,
        fee,
        uri,
        nonce,
        signatureId,
    } = body;

    const client = await getClient(provider, fromPrivateKey);

    // @ts-ignore
    const contract = new client.eth.Contract(erc1155TokenABI, null, {
        data: erc1155TokenBytecode,
    });

    // @ts-ignore
    const deploy = contract.deploy({
        arguments: [uri]
    });

    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        gasPrice: fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei(),
        nonce,
        gas: fee ? fee.gasLimit : 7000000
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
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

    const client = await getClient(provider, fromPrivateKey);

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
        gas: fee ? fee.gasLimit : 7000000
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
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
    return { data: await contract.methods[methodName as string](...params).call() };
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
export const sendDeployErc20Transaction = async (body: DeployErc20, provider?: string) =>
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
 * Send Ethereum ERC721 mint with cashback transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintCashbackErc721Transaction = async (body: EthMintErc721, provider?: string) =>
    ethBroadcast(await prepareEthMintCashbackErc721SignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum ERC721 mint multiple cashback transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMintMultipleCashbackErc721SignedTransaction = async (body: EthMintMultipleErc721, provider?: string) =>
    ethBroadcast(await prepareEthMintMultipleCashbackErc721SignedTransaction(body, provider), body.signatureId);

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

export const sendUpdateCashbackForAuthorErc721Transaction = async (body: UpdateCashbackErc721, provider?: string) =>
    ethBroadcast(await prepareEthUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId);
export const sendUpdateCashbackForAuthorMultiTokenTransaction = async (body: UpdateCashbackErc721, provider?: string) =>
    ethBroadcast(await prepareEthUpdateCashbackForAuthorMultiTokenSignedTransaction(body, provider), body.signatureId);

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

/**
 * Send Ethereum ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMultiTokenTransaction = async (body: TransferMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthTransferMultiTokenSignedTransaction(body, provider), body.signatureId);
export const sendMultiTokenBatchTransaction = async (body: TransferMultiTokenBatch, provider?: string) =>
    ethBroadcast(await prepareEthBatchTransferMultiTokenSignedTransaction(body, provider), body.signatureId);
/**
* Send Ethereum ERC721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
* This operation is irreversible.
* @param body content of the transaction to broadcast
* @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
* @returns transaction id of the transaction in the blockchain
*/
export const sendDeployMultiTokenTransaction = async (body: EthDeployMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthDeployMultiTokenSignedTransaction(body, provider), body.signatureId);

/**
 * Send Ethereum MultiToken mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiTokenTransaction = async (body: MintMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthMintMultiTokenSignedTransaction(body, provider), body.signatureId);

export const sendMintMultiTokenBatchTransaction = async (body: MintMultiTokenBatch, provider?: string) =>
    ethBroadcast(await prepareEthMintMultiTokenBatchSignedTransaction(body, provider), body.signatureId);
// Cashback mints
export const sendMintMultiTokenCashbackTransaction = async (body: MintMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthMintCashbackMultiTokenSignedTransaction(body, provider), body.signatureId);
export const sendMintMultiTokenBatchCashbackTransaction = async (body: MintMultiTokenBatch, provider?: string) =>
    ethBroadcast(await prepareEthMintMultipleCashbackMultiTokenSignedTransaction(body, provider), body.signatureId);

// Burn 1155
export const sendBurnMultiTokenTransaction = async (body: EthBurnMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthBurnMultiTokenSignedTransaction(body, provider), body.signatureId);

export const sendBurnBatchMultiTokenTransaction = async (body: EthBurnMultiTokenBatch, provider?: string) =>
    ethBroadcast(await prepareEthBurnBatchMultiTokenSignedTransaction(body, provider), body.signatureId);
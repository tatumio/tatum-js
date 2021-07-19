import axios from 'axios';
import {BigNumber} from 'bignumber.js';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {toWei} from 'web3-utils';
import {polygonBroadcast} from '../blockchain';
import {validateBody} from '../connector/tatum';
import {CONTRACT_ADDRESSES, CONTRACT_DECIMALS, TATUM_API_URL, TRANSFER_METHOD_ABI} from '../constants';
import erc1155TokenABI from '../contracts/erc1155/erc1155_abi';
import erc1155TokenBytecode from '../contracts/erc1155/erc1155_bytecode';
import erc20TokenABI from '../contracts/erc20/token_abi';
import erc20TokenBytecode from '../contracts/erc20/token_bytecode';
import erc721TokenABI from '../contracts/erc721/erc721_abi';
import erc721TokenBytecode from '../contracts/erc721/erc721_bytecode';
import {
    BurnErc20,
    BurnMultiToken,
    BurnMultiTokenBatch,
    CreateRecord,
    Currency,
    DeployErc20,
    EthBurnErc721,
    EthBurnMultiToken,
    EthBurnMultiTokenBatch,
    EthDeployErc721,
    EthDeployMultiToken,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    MintErc20,
    MintMultiToken,
    MintMultiTokenBatch,
    SmartContractMethodInvocation,
    SmartContractReadMethodInvocation,
    TransactionKMS,
    TransferCustomErc20,
    TransferEthErc20,
    TransferMultiToken,
    TransferMultiTokenBatch,
    UpdateCashbackErc721,
} from '../model';

/**
 * Estimate Gas price for the transaction.
 */
export const polygonGetGasPriceInWei = async () => {
    const {data} = await axios.get('https://gasstation-mainnet.matic.network');
    return Web3.utils.toWei(`${data.fastest / 10}`, 'gwei');
};

const prepareGeneralTx = async (client: Web3, testnet: boolean, fromPrivateKey?: string, signatureId?: string, to?: string, amount?: string, nonce?: number,
                                data?: string, gasLimit?: string, gasPrice?: string) => {
    const tx: TransactionConfig = {
        from: 0,
        to,
        value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
        data,
        gas: gasLimit,
        nonce,
        gasPrice: gasPrice ? `0x${new BigNumber(toWei(gasPrice, 'gwei')).toString(16)}` : await polygonGetGasPriceInWei(),
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = gasLimit || await client.eth.estimateGas({to, data: data || ''});
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};

/**
 * Send Polygon transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonTransaction = async (testnet: boolean, body: TransferEthErc20, provider?: string) => {
    return polygonBroadcast(await preparePolygonSignedTransaction(testnet, body, provider));
};

export const preparePolygonClient = (testnet: boolean, provider?: string, fromPrivateKey?: string) => {
    const client = new Web3(provider || `${TATUM_API_URL}/v3/polygon/web3/${process.env.TATUM_API_KEY}`);
    if (fromPrivateKey) {
        client.eth.accounts.wallet.clear();
        client.eth.accounts.wallet.add(fromPrivateKey);
        client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    }
    return client;
};

/**
 * Sign Polygon pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signPolygonKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.MATIC) {
        throw Error('Unsupported chain.');
    }
    const client = preparePolygonClient(testnet, provider, fromPrivateKey);
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    if (!transactionConfig.gas) {
        transactionConfig.gas = await client.eth.estimateGas({to: transactionConfig.to, data: transactionConfig.data});
    }
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Polygon transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonSignedTransaction = async (testnet: boolean, body: TransferEthErc20, provider?: string) => {
    await validateBody(body, TransferEthErc20);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    let data;
    let to = body.to;
    if (body.currency === Currency.MATIC) {
        data = body.data ? (client.utils.isHex(body.data) ? client.utils.stringToHex(body.data) : client.utils.toHex(body.data)) : undefined;
    } else {
        to = CONTRACT_ADDRESSES[body.currency];
        // @ts-ignore
        const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], to);
        const digits = new BigNumber(10).pow(CONTRACT_DECIMALS[body.currency]);
        data = contract.methods.transfer(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI();
    }
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.to, body.amount, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};

export const preparePolygonStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.to, undefined, body.nonce, body.data,
        body.ethFee?.gasLimit, body.ethFee?.gasPrice);
};
export const preparePolygonMintErc20SignedTransaction = async (testnet: boolean, body: MintErc20, provider?: string) => {
    await validateBody(body, MintErc20);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim());
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call());
    const data = contract.methods
        .mint(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonBurnErc20SignedTransaction = async (testnet: boolean, body: BurnErc20, provider?: string) => {
    await validateBody(body, BurnErc20);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim());
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call());
    const data = contract.methods
        .burn(`0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonTransferErc20SignedTransaction = async (testnet: boolean, body: TransferCustomErc20, provider?: string) => {
    await validateBody(body, TransferCustomErc20);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    const decimals = new BigNumber(10).pow(body.digits);
    // @ts-ignore
    const data = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim()).methods
        .transfer(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(decimals).toString(16)}`).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonDeployErc20SignedTransaction = async (testnet: boolean, body: DeployErc20, provider?: string) => {
    await validateBody(body, DeployErc20);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI);
    const data = contract.deploy({
        data: erc20TokenBytecode,
        arguments: [
            body.name,
            body.symbol,
            body.address.trim(),
            body.digits,
            `0x${new BigNumber(body.totalCap || body.supply).multipliedBy(new BigNumber(10).pow(body.digits)).toString(16)}`,
            `0x${new BigNumber(body.supply).multipliedBy(new BigNumber(10).pow(body.digits)).toString(16)}`,
        ],
    }).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonMintErc721SignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) => {
    await validateBody(body, EthMintErc721);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
        .mintWithTokenURI(body.to.trim(), body.tokenId, body.url).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonMintCashbackErc721SignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) => {
    await validateBody(body, EthMintErc721);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    const cashbacks: string[] = body.cashbackValues!;
    const cb = cashbacks.map(c => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
        .mintWithCashback(body.to.trim(), body.tokenId, body.url, body.authorAddresses, cb).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonMintMultipleCashbackErc721SignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) => {
    await validateBody(body, EthMintMultipleErc721);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    const cashbacks: string[][] = body.cashbackValues!;
    const cb = cashbacks.map(cashback => cashback.map(c => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`));
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
        .mintMultipleCashback(body.to.map(t => t.trim()), body.tokenId, body.url,
            body.authorAddresses, cb).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonMintMultipleErc721SignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) => {
    await validateBody(body, EthMintMultipleErc721);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, body.contractAddress.trim())
        .methods.mintMultiple(body.to.map(t => t.trim()), body.tokenId, body.url).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonBurnErc721SignedTransaction = async (testnet: boolean, body: EthBurnErc721, provider?: string) => {
    await validateBody(body, EthBurnErc721);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods.burn(body.tokenId).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonTransferErc721SignedTransaction = async (testnet: boolean, body: EthTransferErc721, provider?: string) => {
    await validateBody(body, EthTransferErc721);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, body.contractAddress.trim())
        .methods.safeTransfer(body.to.trim(), body.tokenId).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), body.value, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonUpdateCashbackForAuthorErc721SignedTransaction = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) => {
    await validateBody(body, UpdateCashbackErc721);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
        .updateCashbackForAuthor(body.tokenId, `0x${new BigNumber(toWei(body.cashbackValue, 'ether')).toString(16)}`).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonDeployErc721SignedTransaction = async (testnet: boolean, body: EthDeployErc721, provider?: string) => {
    await validateBody(body, EthDeployErc721);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new client.eth.Contract(erc721TokenABI).deploy({
        arguments: [body.name, body.symbol],
        data: erc721TokenBytecode,
    }).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonBurnMultiTokenSignedTransaction = async (testnet: boolean, body: EthBurnMultiToken, provider?: string) => {
    await validateBody(body, EthBurnMultiToken);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
        .burn(body.account.trim(), body.tokenId, body.amount).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: EthBurnMultiTokenBatch, provider?: string) => {
    await validateBody(body, EthBurnMultiTokenBatch);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
        .burnBatch(body.account.trim(), body.tokenId, body.amounts).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
    await validateBody(body, TransferMultiToken);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
        .safeTransfer(body.to.trim(), body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0').encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonBatchTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
    await validateBody(body, TransferMultiTokenBatch);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    const amts = body.amounts.map(amt => `0x${new BigNumber(amt).toString(16)}`);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
        .safeBatchTransfer(body.to.trim(), body.tokenId.map(token => token.trim()), amts, body.data ? body.data : '0x0').encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonMintMultiTokenSignedTransaction = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
    await validateBody(body, MintMultiToken);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
        .mint(body.to.trim(), body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0').encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
    await validateBody(body, MintMultiTokenBatch);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    const batchAmounts = body.amounts.map(amts => amts.map(amt => `0x${new BigNumber(amt).toString(16)}`));
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
        .mintBatch(body.to, body.tokenId, batchAmounts, body.data ? body.data : '0x0').encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const preparePolygonDeployMultiTokenSignedTransaction = async (testnet: boolean, body: EthDeployMultiToken, provider?: string) => {
    await validateBody(body, EthDeployMultiToken);
    const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new client.eth.Contract(erc1155TokenABI).deploy({
        arguments: [body.uri],
        data: erc1155TokenBytecode,
    }).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};

export const preparePolygonSmartContractWriteMethodInvocation = async (testnet: boolean, body: SmartContractMethodInvocation, provider?: string) => {
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
    const client = await preparePolygonClient(testnet, provider, fromPrivateKey);

    const data = new client.eth.Contract([methodABI]).methods[methodName as string](...params).encodeABI();
    return prepareGeneralTx(client, testnet, fromPrivateKey, signatureId, contractAddress.trim(), undefined, nonce, data,
        fee?.gasLimit, fee?.gasPrice);
};

export const sendPolygonSmartContractReadMethodInvocationTransaction = async (testnet: boolean, body: SmartContractReadMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractReadMethodInvocation);
    const {
        params,
        methodName,
        methodABI,
        contractAddress,
    } = body;
    const client = preparePolygonClient(testnet, provider);
    const contract = new client.eth.Contract([methodABI], contractAddress);
    return {data: await contract.methods[methodName as string](...params).call()};
};

export const sendPolygonStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) =>
    polygonBroadcast(await preparePolygonStoreDataTransaction(testnet, body, provider));
export const sendPolygonMintErc20SignedTransaction = async (testnet: boolean, body: MintErc20, provider?: string) =>
    polygonBroadcast(await preparePolygonMintErc20SignedTransaction(testnet, body, provider));
export const sendPolygonBurnErc20SignedTransaction = async (testnet: boolean, body: BurnErc20, provider?: string) =>
    polygonBroadcast(await preparePolygonBurnErc20SignedTransaction(testnet, body, provider));
export const sendPolygonTransferErc20SignedTransaction = async (testnet: boolean, body: TransferCustomErc20, provider?: string) =>
    polygonBroadcast(await preparePolygonTransferErc20SignedTransaction(testnet, body, provider));
export const sendPolygonDeployErc20SignedTransaction = async (testnet: boolean, body: DeployErc20, provider?: string) =>
    polygonBroadcast(await preparePolygonDeployErc20SignedTransaction(testnet, body, provider));
export const sendPolygonMintErc721SignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) =>
    polygonBroadcast(await preparePolygonMintErc721SignedTransaction(testnet, body, provider));
export const sendPolygonMintCashbackErc721SignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) =>
    polygonBroadcast(await preparePolygonMintCashbackErc721SignedTransaction(testnet, body, provider));
export const sendPolygonMintMultipleCashbackErc721SignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) =>
    polygonBroadcast(await preparePolygonMintMultipleCashbackErc721SignedTransaction(testnet, body, provider));
export const sendPolygonMintMultipleErc721SignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) =>
    polygonBroadcast(await preparePolygonMintMultipleErc721SignedTransaction(testnet, body, provider));
export const sendPolygonBurnErc721SignedTransaction = async (testnet: boolean, body: EthBurnErc721, provider?: string) =>
    polygonBroadcast(await preparePolygonBurnErc721SignedTransaction(testnet, body, provider));
export const sendPolygonTransferErc721SignedTransaction = async (testnet: boolean, body: EthTransferErc721, provider?: string) =>
    polygonBroadcast(await preparePolygonTransferErc721SignedTransaction(testnet, body, provider));
export const sendPolygonUpdateCashbackForAuthorErc721SignedTransaction = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) =>
    polygonBroadcast(await preparePolygonUpdateCashbackForAuthorErc721SignedTransaction(testnet, body, provider));
export const sendPolygonDeployErc721SignedTransaction = async (testnet: boolean, body: EthDeployErc721, provider?: string) =>
    polygonBroadcast(await preparePolygonDeployErc721SignedTransaction(testnet, body, provider));
export const sendPolygonBurnMultiTokenSignedTransaction = async (testnet: boolean, body: BurnMultiToken, provider?: string) =>
    polygonBroadcast(await preparePolygonBurnMultiTokenSignedTransaction(testnet, body, provider));
export const sendPolygonBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) =>
    polygonBroadcast(await preparePolygonBurnMultiTokenBatchSignedTransaction(testnet, body, provider));
export const sendPolygonTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiToken, provider?: string) =>
    polygonBroadcast(await preparePolygonTransferMultiTokenSignedTransaction(testnet, body, provider));
export const sendPolygonBatchTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) =>
    polygonBroadcast(await preparePolygonBatchTransferMultiTokenSignedTransaction(testnet, body, provider));
export const sendPolygonMintMultiTokenSignedTransaction = async (testnet: boolean, body: MintMultiToken, provider?: string) =>
    polygonBroadcast(await preparePolygonMintMultiTokenSignedTransaction(testnet, body, provider));
export const sendPolygonMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) =>
    polygonBroadcast(await preparePolygonMintMultiTokenBatchSignedTransaction(testnet, body, provider));
export const sendPolygonDeployMultiTokenSignedTransaction = async (testnet: boolean, body: EthDeployMultiToken, provider?: string) =>
    polygonBroadcast(await preparePolygonDeployMultiTokenSignedTransaction(testnet, body, provider));
export const sendPolygonSmartContractMethodInvocationTransaction = async (testnet: boolean,
                                                                          body: SmartContractMethodInvocation | SmartContractReadMethodInvocation, provider?: string) => {
    if (body.methodABI.stateMutability === 'view') {
        return sendPolygonSmartContractReadMethodInvocationTransaction(testnet, body as SmartContractReadMethodInvocation, provider);
    }
    return polygonBroadcast(await preparePolygonSmartContractWriteMethodInvocation(testnet, body, provider), (body as SmartContractMethodInvocation).signatureId);
};

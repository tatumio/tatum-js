import {HarmonyAddress} from '@harmony-js/crypto';
import {BigNumber} from 'bignumber.js';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {toWei} from 'web3-utils';
import {oneBroadcast} from '../blockchain';
import {validateBody} from '../connector/tatum';
import {TATUM_API_URL} from '../constants';
import erc1155TokenABI from '../contracts/erc1155/erc1155_abi';
import erc1155TokenBytecode from '../contracts/erc1155/erc1155_bytecode';
import erc20TokenABI from '../contracts/erc20/token_abi';
import erc20TokenBytecode from '../contracts/erc20/token_bytecode';
import erc721TokenABI from '../contracts/erc721/erc721_abi';
import erc721TokenBytecode from '../contracts/erc721/erc721_bytecode';
import {
    CreateRecord,
    Currency,
    OneBurn20,
    OneBurn721,
    OneBurnMultiToken,
    OneBurnMultiTokenBatch,
    OneDeploy20,
    OneDeploy721,
    OneDeployMultiToken,
    OneMint20,
    OneMint721,
    OneMintMultiple721,
    OneMintMultiToken,
    OneMintMultiTokenBatch,
    OneTransfer,
    OneTransfer20,
    OneTransfer721,
    OneTransferMultiToken,
    OneTransferMultiTokenBatch,
    OneUpdateCashback721,
    SmartContractMethodInvocation,
    SmartContractReadMethodInvocation,
    TransactionKMS,
} from '../model';

const prepareGeneralTx = async (client: Web3, testnet: boolean, fromPrivateKey?: string, signatureId?: string, to?: string, amount?: string, nonce?: number,
                                data?: string, gasLimit?: string, gasPrice?: string) => {
    const recipient = to?.includes('one') ? new HarmonyAddress(to).basicHex : to;
    const tx: TransactionConfig = {
        from: 0,
        to: recipient,
        value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
        data,
        gas: gasLimit,
        nonce,
        gasPrice: gasPrice ? `0x${new BigNumber(toWei(gasPrice, 'gwei')).toString(16)}` : await client.eth.getGasPrice(),
    };

    if (signatureId) {
        return JSON.stringify(tx);
    }
    tx.gas = gasLimit || await client.eth.estimateGas({to: recipient, data: data || ''});
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
};

/**
 * Send Harmony transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendOneTransaction = async (testnet: boolean, body: OneTransfer, provider?: string) => {
    return oneBroadcast(await prepareOneSignedTransaction(testnet, body, provider));
};

export const prepareOneClient = (testnet: boolean, provider?: string, fromPrivateKey?: string) => {
    const client = new Web3(provider || `${TATUM_API_URL}/v3/one/web3/${process.env.TATUM_API_KEY}`);
    if (fromPrivateKey) {
        client.eth.accounts.wallet.clear();
        client.eth.accounts.wallet.add(fromPrivateKey);
        client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    }
    return client;
};

/**
 * Sign Harmony pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signOneKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.ONE) {
        throw Error('Unsupported chain.');
    }
    const client = prepareOneClient(testnet, provider, fromPrivateKey);
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    if (!transactionConfig.gas) {
        transactionConfig.gas = await client.eth.estimateGas({to: transactionConfig.to, data: transactionConfig.data});
    }
    if (!transactionConfig.gasPrice || transactionConfig.gasPrice === '0') {
        transactionConfig.gasPrice = await client.eth.getGasPrice();
    }
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string;
};

/**
 * Sign Harmony transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareOneSignedTransaction = async (testnet: boolean, body: OneTransfer, provider?: string) => {
    await validateBody(body, OneTransfer);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.to, body.amount, body.nonce, undefined,
        body.fee?.gasLimit, body.fee?.gasPrice);
};

export const prepareOneStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.to, undefined, body.nonce, body.data,
        body.ethFee?.gasLimit, body.ethFee?.gasPrice);
};
export const prepareOneMint20SignedTransaction = async (testnet: boolean, body: OneMint20, provider?: string) => {
    await validateBody(body, OneMint20);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, new HarmonyAddress(body.contractAddress).basicHex.trim());
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call());
    const data = contract.methods
        .mint(new HarmonyAddress(body.to).basicHex, `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneBurn20SignedTransaction = async (testnet: boolean, body: OneBurn20, provider?: string) => {
    await validateBody(body, OneBurn20);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, new HarmonyAddress(body.contractAddress).basicHex.trim());
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call());
    const data = contract.methods
        .burn(`0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneTransfer20SignedTransaction = async (testnet: boolean, body: OneTransfer20, provider?: string) => {
    await validateBody(body, OneTransfer20);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    const decimals = new BigNumber(10).pow(body.digits);
    // @ts-ignore
    const data = new client.eth.Contract(erc20TokenABI, new HarmonyAddress(body.contractAddress).basicHex.trim()).methods
        .transfer(new HarmonyAddress(body.to).basicHex, `0x${new BigNumber(body.amount).multipliedBy(decimals).toString(16)}`).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneDeploy20SignedTransaction = async (testnet: boolean, body: OneDeploy20, provider?: string) => {
    await validateBody(body, OneDeploy20);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI);
    const data = contract.deploy({
        data: erc20TokenBytecode,
        arguments: [
            body.name,
            body.symbol,
            new HarmonyAddress(body.address).basicHex,
            body.digits,
            `0x${new BigNumber(body.totalCap || body.supply).multipliedBy(new BigNumber(10).pow(body.digits)).toString(16)}`,
            `0x${new BigNumber(body.supply).multipliedBy(new BigNumber(10).pow(body.digits)).toString(16)}`,
        ],
    }).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneMint721SignedTransaction = async (testnet: boolean, body: OneMint721, provider?: string) => {
    await validateBody(body, OneMint721);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .mintWithTokenURI(new HarmonyAddress(body.to).basicHex, body.tokenId, body.url).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneMintCashback721SignedTransaction = async (testnet: boolean, body: OneMint721, provider?: string) => {
    await validateBody(body, OneMint721);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    const cashbacks: string[] = body.cashbackValues!;
    const cb = cashbacks.map(c => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .mintWithCashback(new HarmonyAddress(body.to).basicHex, body.tokenId, body.url, body.authorAddresses?.map(a => new HarmonyAddress(a).basicHex), cb).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneMintMultipleCashback721SignedTransaction = async (testnet: boolean, body: OneMintMultiple721, provider?: string) => {
    await validateBody(body, OneMintMultiple721);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    const cashbacks: string[][] = body.cashbackValues!;
    const cb = cashbacks.map(cashback => cashback.map(c => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`));
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .mintMultipleCashback(body.to.map(t => new HarmonyAddress(t).basicHex), body.tokenId, body.url,
            body.authorAddresses?.map(a => a.map(a1 => new HarmonyAddress(a1).basicHex)), cb).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneMintMultiple721SignedTransaction = async (testnet: boolean, body: OneMintMultiple721, provider?: string) => {
    await validateBody(body, OneMintMultiple721);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex)
        .methods.mintMultiple(body.to.map(t => t.trim()), body.tokenId, body.url).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneBurn721SignedTransaction = async (testnet: boolean, body: OneBurn721, provider?: string) => {
    await validateBody(body, OneBurn721);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods.burn(body.tokenId).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneTransfer721SignedTransaction = async (testnet: boolean, body: OneTransfer721, provider?: string) => {
    await validateBody(body, OneTransfer721);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex)
        .methods.safeTransfer(new HarmonyAddress(body.to).basicHex, body.tokenId).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, body.value, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneUpdateCashbackForAuthor721SignedTransaction = async (testnet: boolean, body: OneUpdateCashback721, provider?: string) => {
    await validateBody(body, OneUpdateCashback721);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .updateCashbackForAuthor(body.tokenId, `0x${new BigNumber(toWei(body.cashbackValue, 'ether')).toString(16)}`).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneDeploy721SignedTransaction = async (testnet: boolean, body: OneDeploy721, provider?: string) => {
    await validateBody(body, OneDeploy721);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new client.eth.Contract(erc721TokenABI).deploy({
        arguments: [body.name, body.symbol],
        data: erc721TokenBytecode,
    }).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneBurnMultiTokenSignedTransaction = async (testnet: boolean, body: OneBurnMultiToken, provider?: string) => {
    await validateBody(body, OneBurnMultiToken);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .burn(new HarmonyAddress(body.account).basicHex, body.tokenId, body.amount).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: OneBurnMultiTokenBatch, provider?: string) => {
    await validateBody(body, OneBurnMultiTokenBatch);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .burnBatch(new HarmonyAddress(body.account).basicHex, body.tokenId, body.amounts).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneTransferMultiTokenSignedTransaction = async (testnet: boolean, body: OneTransferMultiToken, provider?: string) => {
    await validateBody(body, OneTransferMultiToken);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .safeTransfer(new HarmonyAddress(body.to).basicHex, body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0').encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneBatchTransferMultiTokenSignedTransaction = async (testnet: boolean, body: OneTransferMultiTokenBatch, provider?: string) => {
    await validateBody(body, OneTransferMultiTokenBatch);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    const amts = body.amounts.map(amt => `0x${new BigNumber(amt).toString(16)}`);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .safeBatchTransfer(new HarmonyAddress(body.to).basicHex, body.tokenId.map(token => token.trim()), amts, body.data ? body.data : '0x0').encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneMintMultiTokenSignedTransaction = async (testnet: boolean, body: OneMintMultiToken, provider?: string) => {
    await validateBody(body, OneMintMultiToken);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .mint(new HarmonyAddress(body.to).basicHex, body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0').encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: OneMintMultiTokenBatch, provider?: string) => {
    await validateBody(body, OneMintMultiTokenBatch);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    const batchAmounts = body.amounts.map(amts => amts.map(amt => `0x${new BigNumber(amt).toString(16)}`));
    // @ts-ignore
    const data = new (client).eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
        .mintBatch(body.to.map(a => new HarmonyAddress(a).basicHex), body.tokenId, batchAmounts, body.data ? body.data : '0x0').encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, new HarmonyAddress(body.contractAddress).basicHex, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};
export const prepareOneDeployMultiTokenSignedTransaction = async (testnet: boolean, body: OneDeployMultiToken, provider?: string) => {
    await validateBody(body, OneDeployMultiToken);
    const client = await prepareOneClient(testnet, provider, body.fromPrivateKey);
    // @ts-ignore
    const data = new client.eth.Contract(erc1155TokenABI).deploy({
        arguments: [body.uri],
        data: erc1155TokenBytecode,
    }).encodeABI();
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice);
};

export const prepareOneSmartContractWriteMethodInvocation = async (testnet: boolean, body: SmartContractMethodInvocation, provider?: string) => {
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
    const client = await prepareOneClient(testnet, provider, fromPrivateKey);

    const data = new client.eth.Contract([methodABI]).methods[methodName as string](...params).encodeABI();
    return prepareGeneralTx(client, testnet, fromPrivateKey, signatureId, new HarmonyAddress(contractAddress).basicHex, undefined, nonce, data,
        fee?.gasLimit, fee?.gasPrice);
};

export const sendOneSmartContractReadMethodInvocationTransaction = async (testnet: boolean, body: SmartContractReadMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractReadMethodInvocation);
    const {
        params,
        methodName,
        methodABI,
        contractAddress,
    } = body;
    const client = prepareOneClient(testnet, provider);
    const contract = new client.eth.Contract([methodABI], contractAddress);
    return {data: await contract.methods[methodName as string](...params).call()};
};

export const sendOneStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) =>
    oneBroadcast(await prepareOneStoreDataTransaction(testnet, body, provider));
export const sendOneMint20SignedTransaction = async (testnet: boolean, body: OneMint20, provider?: string) =>
    oneBroadcast(await prepareOneMint20SignedTransaction(testnet, body, provider));
export const sendOneBurn20SignedTransaction = async (testnet: boolean, body: OneBurn20, provider?: string) =>
    oneBroadcast(await prepareOneBurn20SignedTransaction(testnet, body, provider));
export const sendOneTransfer20SignedTransaction = async (testnet: boolean, body: OneTransfer20, provider?: string) =>
    oneBroadcast(await prepareOneTransfer20SignedTransaction(testnet, body, provider));
export const sendOneDeploy20SignedTransaction = async (testnet: boolean, body: OneDeploy20, provider?: string) =>
    oneBroadcast(await prepareOneDeploy20SignedTransaction(testnet, body, provider));
export const sendOneMint721SignedTransaction = async (testnet: boolean, body: OneMint721, provider?: string) =>
    oneBroadcast(await prepareOneMint721SignedTransaction(testnet, body, provider));
export const sendOneMintCashback721SignedTransaction = async (testnet: boolean, body: OneMint721, provider?: string) =>
    oneBroadcast(await prepareOneMintCashback721SignedTransaction(testnet, body, provider));
export const sendOneMintMultipleCashback721SignedTransaction = async (testnet: boolean, body: OneMintMultiple721, provider?: string) =>
    oneBroadcast(await prepareOneMintMultipleCashback721SignedTransaction(testnet, body, provider));
export const sendOneMintMultiple721SignedTransaction = async (testnet: boolean, body: OneMintMultiple721, provider?: string) =>
    oneBroadcast(await prepareOneMintMultiple721SignedTransaction(testnet, body, provider));
export const sendOneBurn721SignedTransaction = async (testnet: boolean, body: OneBurn721, provider?: string) =>
    oneBroadcast(await prepareOneBurn721SignedTransaction(testnet, body, provider));
export const sendOneTransfer721SignedTransaction = async (testnet: boolean, body: OneTransfer721, provider?: string) =>
    oneBroadcast(await prepareOneTransfer721SignedTransaction(testnet, body, provider));
export const sendOneUpdateCashbackForAuthor721SignedTransaction = async (testnet: boolean, body: OneUpdateCashback721, provider?: string) =>
    oneBroadcast(await prepareOneUpdateCashbackForAuthor721SignedTransaction(testnet, body, provider));
export const sendOneDeploy721SignedTransaction = async (testnet: boolean, body: OneDeploy721, provider?: string) =>
    oneBroadcast(await prepareOneDeploy721SignedTransaction(testnet, body, provider));
export const sendOneBurnMultiTokenSignedTransaction = async (testnet: boolean, body: OneBurnMultiToken, provider?: string) =>
    oneBroadcast(await prepareOneBurnMultiTokenSignedTransaction(testnet, body, provider));
export const sendOneBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: OneBurnMultiTokenBatch, provider?: string) =>
    oneBroadcast(await prepareOneBurnMultiTokenBatchSignedTransaction(testnet, body, provider));
export const sendOneTransferMultiTokenSignedTransaction = async (testnet: boolean, body: OneTransferMultiToken, provider?: string) =>
    oneBroadcast(await prepareOneTransferMultiTokenSignedTransaction(testnet, body, provider));
export const sendOneBatchTransferMultiTokenSignedTransaction = async (testnet: boolean, body: OneTransferMultiTokenBatch, provider?: string) =>
    oneBroadcast(await prepareOneBatchTransferMultiTokenSignedTransaction(testnet, body, provider));
export const sendOneMintMultiTokenSignedTransaction = async (testnet: boolean, body: OneMintMultiToken, provider?: string) =>
    oneBroadcast(await prepareOneMintMultiTokenSignedTransaction(testnet, body, provider));
export const sendOneMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: OneMintMultiTokenBatch, provider?: string) =>
    oneBroadcast(await prepareOneMintMultiTokenBatchSignedTransaction(testnet, body, provider));
export const sendOneDeployMultiTokenSignedTransaction = async (testnet: boolean, body: OneDeployMultiToken, provider?: string) =>
    oneBroadcast(await prepareOneDeployMultiTokenSignedTransaction(testnet, body, provider));
export const sendOneSmartContractMethodInvocationTransaction = async (testnet: boolean,
                                                                      body: SmartContractMethodInvocation | SmartContractReadMethodInvocation, provider?: string) => {
    if (body.methodABI.stateMutability === 'view') {
        return sendOneSmartContractReadMethodInvocationTransaction(testnet, body as SmartContractReadMethodInvocation, provider);
    }
    return oneBroadcast(await prepareOneSmartContractWriteMethodInvocation(testnet, body, provider), (body as SmartContractMethodInvocation).signatureId);
};

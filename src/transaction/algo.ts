const algosdk = require('algosdk');
const base32 = require('base32.js');
import BigNumber from 'bignumber.js';
import { TextEncoder } from 'util';
import { algorandBroadcast } from '../blockchain';
import {
    AlgoTransaction,
    DeployErc721,
    TransferErc721,
    BurnErc721,
    DeployErc20,
    TransferErc20,
    BurnErc20,
    Currency,
    TransactionKMS,
    MintMultiToken,
    TransferMultiToken,
    BurnMultiToken
} from '../model';
import { generateAlgodAddressFromPrivatetKey } from '../wallet'
const Url = require('url-parse');
/**
 * Algod V2 Client
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint
 * @returns algorand Client
 */
export const getAlgoClient = (testnet: boolean, provider?: string) => {
    if (provider) {
        return new algosdk.Algodv2(`${(testnet ? process.env.TATUM_ALGORAND_TESTNET_TOKEN : process.env.TATUM_ALGORAND_MAINNET_TOKEN) || 'DUMMYTOKEN'}`, provider, Url(provider).port);
    } else {
        return new algosdk.Algodv2({ 'X-API-Key': testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_KEY}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_KEY}` },
            testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_ALGOD_URL}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_ALGOD_URL}`, '');
    }
}

/**
 * Algo Indexer Client
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint
 * @returns algorand Indexer Client
 */
export const getAlgoIndexerClient = (testnet: boolean, provider?: string) => {
    if (provider) {
        return new algosdk.Indexer(`${(testnet ? process.env.TATUM_ALGORAND_TESTNET_TOKEN : process.env.TATUM_ALGORAND_MAINNET_TOKEN) || 'DUMMYTOKEN'}`, provider, Url(provider).port);
    } else {
        return new algosdk.Indexer({ 'X-API-Key': testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_KEY}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_KEY}` },
            testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_INDEXER_URL}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_INDEXER_URL}`, '');
    }
}

/**
 * Algorand transaction signing
 * @param testnet if the algorand node is testnet or not
 * @param tx content of the transaction to broadcast
 * @param provider url of the algorand server endpoint for purestake.io restapi
 * @returns transaction data to be broadcast to blockchain
 */
export const prepareAlgoSignedTransaction = async (testnet: boolean, tx: AlgoTransaction, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' });
    const enc = new TextEncoder();
    const note = enc.encode(tx.note ? tx.note : '');
    const txn = algosdk.makePaymentTxnWithSuggestedParams(
        tx.from,
        tx.to,
        Number(tx.amount) * 1000000,
        undefined,
        note,
        {
            ...params,
            fee: Number(tx.fee) * 1000000,
            flatFee: true
        }
    );
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendAlgoSignedTransaction = async (testnet: boolean, tx: AlgoTransaction, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign Algorand pending transaction from Tatum KMS
 * @param tx pendding transaction from Tatum KMS
 * @param fromPrivateKey private key to sign transaction with
 * @param testnet mainnet or testnet version
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signAlgoKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.ALGO) {
        throw Error('Unsupported chain.')
    }
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    let txn = JSON.parse(tx.serializedTransaction);
    txn.from = algosdk.encodeAddress(new Uint8Array(Object.values(txn.from.publicKey)));
    txn.to = algosdk.encodeAddress(new Uint8Array(Object.values(txn.to.publicKey)));
    txn.note = new Uint8Array(Object.values(txn.note));
    txn.lease = undefined;
    if (txn.tag) {
        if (txn.tag.data) {
            txn.tag = Buffer.from(txn.tag.data);
        }
    }
    txn.genesisHash = Buffer.from(txn.genesisHash.data);
    if (txn.assetManager) {
        txn.assetManager = algosdk.encodeAddress(new Uint8Array(Object.values(txn.assetManager.publicKey)));
    }
    if (txn.assetReserve) {
        txn.assetReserve = undefined;
    }
    if (txn.assetFreeze) {
        txn.assetFreeze = undefined;
    }
    if (txn.assetClawback) {
        txn.assetClawback = undefined;
    }
    if (txn.assetRevocationTarget) {
        txn.assetRevocationTarget = undefined;
    }
    if (txn.reKeyTo) {
        txn.reKeyTo = undefined;
    }
    if (txn.assetMetadataHash) {
        txn.assetMetadataHash = new Uint8Array(Object.values(txn.assetMetadataHash));
    }
    const _txn = new (algosdk.Transaction)(txn);
    const secretKey = new Uint8Array(decoder.write(fromPrivateKey).buf);
    const signedTxn = _txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Sign Algorand create NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain
 */
export const prepareAlgoCreateNFTSignedTransaction = async (testnet: boolean, tx: DeployErc721, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        1, 0, false,
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        undefined,
        undefined,
        tx.symbol,
        tx.name,
        tx.url,
        undefined,
        params,
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand create NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendAlgoCreateNFTSignedTransaction = async (testnet: boolean, tx: DeployErc721, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateNFTSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign Algorand transfer NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoTransferNFTSignedTransaction = async (testnet: boolean, tx: TransferErc721, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        tx.to,
        undefined,
        undefined,
        Number(tx.value),
        undefined,
        Number(tx.contractAddress),
        params,
        undefined
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand Transfer NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoTransferNFTSignedTransaction = async (testnet: boolean, tx: TransferErc721, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferNFTSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign Algorand burn NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoBurnNFTSignedTransaction = async (testnet: boolean, tx: BurnErc721, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        Number(tx.contractAddress),
        params,
        undefined
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand burn NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoBurnNFTSignedTransaction = async (testnet: boolean, tx: BurnErc721, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoBurnNFTSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign Algorand create Fractional NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoCreateFractionalNFTSignedTransaction = async (testnet: boolean, tx: MintMultiToken, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const v = Math.floor(Math.log10(Number(tx.amount)));
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        10 ** v,
        v,
        false,
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        undefined,
        undefined,
        tx.tokenId,
        tx.contractAddress,
        tx.url,
        undefined,
        params,
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand create Fractinoal NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoCreateFractionalNFTSignedTransaction = async (testnet: boolean, tx: MintMultiToken, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateFractionalNFTSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign Algorand transfer Fractional NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoTransferFractionalNFTSignedTransaction = async (testnet: boolean, tx: TransferMultiToken, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        tx.to,
        undefined,
        undefined,
        Number(tx.amount),
        undefined,
        Number(tx.contractAddress),
        params,
        undefined
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand transfer Fractinoal NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoTransferFractionalNFTSignedTransaction = async (testnet: boolean, tx: TransferMultiToken, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferFractionalNFTSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign Algorand burn Fracational NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connecto to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoBurnFractionalNFTSignedTransaction = async (testnet: boolean, tx: BurnMultiToken, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        Number(tx.contractAddress),
        params,
        undefined
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand burn Fractional NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoBurnFractionalNFTSignedTransaction = async (testnet: boolean, tx: BurnMultiToken, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoBurnFractionalNFTSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign Algorand create FT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connnect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoCreateFTSignedTransaction = async (testnet: boolean, tx: DeployErc20, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        new BigNumber(tx.supply).shiftedBy(Number(tx.digits)).toNumber(),
        Number(tx.digits),
        false,
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        undefined,
        undefined,
        tx.symbol,
        tx.name,
        tx.url,
        undefined,
        params,
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand create FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoCreateFTSignedTransaction = async (testnet: boolean, tx: DeployErc20, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoCreateFTSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign Algorand transfer FT transaction with private kwy locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoTransferFTSignedTransaction = async (testnet: boolean, tx: TransferErc20, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        tx.to,
        undefined,
        undefined,
        new BigNumber(tx.amount).shiftedBy(tx.digits || 1).toNumber(),
        undefined,
        Number(tx.contractAddress),
        params,
        undefined
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Send Algorand transfer FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoTransferFTSignedTransaction = async (testnet: boolean, tx: TransferErc20, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoTransferFTSignedTransaction(testnet, tx, provider)))
}

/**
 * Sign ALgorand burn FT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoBurnFTSignedTransaction = async (testnet: boolean, tx: BurnErc20, provider?: string) => {
    const algodClient = getAlgoClient(testnet, provider);
    const params = await algodClient.getTransactionParams().do();
    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
        tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
        undefined,
        Number(tx.contractAddress),
        params,
        undefined
    )
    if (tx.signatureId) {
        return JSON.stringify(txn);
    }
    const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf);
    const signedTxn = txn.signTxn(secretKey);
    return signedTxn;
}

/**
 * Sned Algorand burn FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoBurnFTSignedTransaction = async (testnet: boolean, tx: BurnErc20, provider?: string) => {
    return (await algorandBroadcast(await prepareAlgoBurnFTSignedTransaction(testnet, tx, provider)))
}
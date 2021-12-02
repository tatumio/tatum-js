const algosdk = require('algosdk')
const base32 = require('base32.js')
import { TextEncoder } from 'util'
import { algorandBroadcast } from '../blockchain'
import {
  BurnErc20,
  BurnErc721,
  BurnMultiToken,
  ChainBurnErc721,
  ChainBurnMultiToken,
  ChainDeployErc721,
  ChainMintMultiToken,
  ChainTransactionKMS,
  ChainTransferErc20,
  ChainTransferErc721,
  ChainTransferMultiToken,
  Currency,
  DeployErc20,
  DeployErc721,
  MintMultiToken,
  TransactionKMS,
  TransferErc20,
  TransferErc721,
  TransferMultiToken,
} from '@tatumio/tatum-core'

import { AlgoTransaction } from '../model'

import { generateAlgodAddressFromPrivatetKey } from '../wallet'
const Url = require('url-parse')
/**
 * Algod V2 Client
 * @param testnet if the algorand node is testnet or not
 * @param provider url of the algorand server endpoint
 * @returns algorand Client
 */
export const getAlgoClient = (testnet: boolean, provider?: string) => {
  if (provider) {
    return new algosdk.Algodv2(
      `${(testnet ? process.env.TATUM_ALGORAND_TESTNET_TOKEN : process.env.TATUM_ALGORAND_MAINNET_TOKEN) || 'DUMMYTOKEN'}`,
      provider,
      Url(provider).port
    )
  } else {
    return new algosdk.Algodv2(
      {
        'X-API-Key': testnet
          ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_KEY}`
          : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_KEY}`,
      },
      testnet ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_ALGOD_URL}` : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_ALGOD_URL}`,
      ''
    )
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
    return new algosdk.Indexer(
      `${(testnet ? process.env.TATUM_ALGORAND_TESTNET_TOKEN : process.env.TATUM_ALGORAND_MAINNET_TOKEN) || 'DUMMYTOKEN'}`,
      provider,
      Url(provider).port
    )
  } else {
    return new algosdk.Indexer(
      {
        'X-API-Key': testnet
          ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_KEY}`
          : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_KEY}`,
      },
      testnet
        ? `${process.env.TATUM_ALGORAND_TESTNET_THIRD_API_INDEXER_URL}`
        : `${process.env.TATUM_ALGORAND_MAINNET_THIRD_API_INDEXER_URL}`,
      ''
    )
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
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const enc = new TextEncoder()
  const note = enc.encode(tx.note ? tx.note : '')
  const txn = algosdk.makePaymentTxnWithSuggestedParams(tx.from, tx.to, Number(tx.amount) * 1000000, undefined, note, {
    ...params,
    fee: Number(tx.fee) * 1000000,
    flatFee: true,
  })
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
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
  return await algorandBroadcast(await prepareAlgoSignedTransaction(testnet, tx, provider))
}

/**
 * Sign Algorand pending transaction from Tatum KMS
 * @param tx pendding transaction from Tatum KMS
 * @param fromPrivateKey private key to sign transaction with
 * @param testnet mainnet or testnet version
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signAlgoKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string) => {
  ;(tx as TransactionKMS).chain = Currency.ALGO
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = JSON.parse(tx.serializedTransaction)
  const secretKey = new Uint8Array(decoder.write(fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Sign Algorand create NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain
 */
export const prepareAlgoCreateNFTSignedTransaction = async (testnet: boolean, tx: ChainDeployErc721, provider?: string) => {
  ;(tx as DeployErc721).chain = Currency.ALGO
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    undefined,
    1,
    0,
    false,
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    undefined,
    undefined,
    undefined,
    tx.symbol,
    tx.name,
    tx.url,
    undefined,
    params
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Send Algorand create NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendAlgoCreateNFTSignedTransaction = async (testnet: boolean, tx: ChainDeployErc721, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoCreateNFTSignedTransaction(testnet, tx, provider))
}

/**
 * Sign Algorand transfer NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoTransferNFTSignedTransaction = async (testnet: boolean, tx: ChainTransferErc721, provider?: string) => {
  ;(tx as TransferErc721).chain = Currency.ALGO
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    tx.to,
    undefined,
    undefined,
    tx.value,
    undefined,
    Number(tx.contractAddress),
    params,
    undefined
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Send Algorand Transfer NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoTransferNFTSignedTransaction = async (testnet: boolean, tx: ChainTransferErc721, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoTransferNFTSignedTransaction(testnet, tx, provider))
}

/**
 * Sign Algorand burn NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoBurnNFTSignedTransaction = async (testnet: boolean, tx: ChainBurnErc721, provider?: string) => {
  ;(tx as BurnErc721).chain = Currency.ALGO
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    undefined,
    Number(tx.contractAddress),
    params,
    undefined
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Send Algorand burn NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoBurnNFTSignedTransaction = async (testnet: boolean, tx: ChainBurnErc721, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoBurnNFTSignedTransaction(testnet, tx, provider))
}

/**
 * Sign Algorand create Fractional NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoCreateFractionalNFTSignedTransaction = async (testnet: boolean, tx: ChainMintMultiToken, provider?: string) => {
  ;(tx as MintMultiToken).chain = Currency.ALGO
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    undefined,
    10 ** Math.floor(Math.log10(Number(tx.amount))),
    Math.floor(Math.log10(Number(tx.amount))),
    false,
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    undefined,
    undefined,
    undefined,
    tx.tokenId,
    tx.contractAddress,
    tx.url,
    undefined,
    params
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Send Algorand create Fractinoal NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoCreateFractionalNFTSignedTransaction = async (testnet: boolean, tx: ChainMintMultiToken, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoCreateFractionalNFTSignedTransaction(testnet, tx, provider))
}

/**
 * Sign Algorand transfer Fractional NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoTransferFractionalNFTSignedTransaction = async (
  testnet: boolean,
  tx: ChainTransferMultiToken,
  provider?: string
) => {
  ;(tx as TransferMultiToken).chain = Currency.ALGO
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    tx.to,
    undefined,
    undefined,
    tx.amount,
    undefined,
    Number(tx.contractAddress),
    params,
    undefined
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Send Algorand transfer Fractinoal NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoTransferFractionalNFTSignedTransaction = async (testnet: boolean, tx: ChainTransferMultiToken, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoTransferFractionalNFTSignedTransaction(testnet, tx, provider))
}

/**
 * Sign Algorand burn Fracational NFT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connecto to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoBurnFractionalNFTSignedTransaction = async (testnet: boolean, tx: ChainBurnMultiToken, provider?: string) => {
  ;(tx as BurnMultiToken).chain = Currency.ALGO
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    undefined,
    Number(tx.contractAddress),
    params,
    undefined
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Send Algorand burn Fractional NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoBurnFractionalNFTSignedTransaction = async (testnet: boolean, tx: ChainBurnMultiToken, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoBurnFractionalNFTSignedTransaction(testnet, tx, provider))
}

/**
 * Sign Algorand create FT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connnect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoCreateFTSignedTransaction = async (testnet: boolean, tx: DeployErc20, provider?: string) => {
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    undefined,
    Number(tx.supply),
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
    params
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Send Algorand create FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoCreateFTSignedTransaction = async (testnet: boolean, tx: DeployErc20, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoCreateFTSignedTransaction(testnet, tx, provider))
}

/**
 * Sign Algorand transfer FT transaction with private kwy locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoTransferFTSignedTransaction = async (testnet: boolean, tx: ChainTransferErc20, provider?: string) => {
  ;(tx as TransferErc20).currency = Currency.ALGO
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    tx.to,
    undefined,
    undefined,
    tx.amount,
    undefined,
    Number(tx.contractAddress),
    params,
    undefined
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Send Algorand transfer FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoTransferFTSignedTransaction = async (testnet: boolean, tx: ChainTransferErc20, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoTransferFTSignedTransaction(testnet, tx, provider))
}

/**
 * Sign ALgorand burn FT transaction with private key locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAlgoBurnFTSignedTransaction = async (testnet: boolean, tx: BurnErc20, provider?: string) => {
  const algodClient = getAlgoClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()
  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
    tx.fromPrivateKey ? generateAlgodAddressFromPrivatetKey(tx.fromPrivateKey) : tx.from,
    undefined,
    Number(tx.contractAddress),
    params,
    undefined
  )
  if (tx.signatureId) {
    return JSON.stringify(txn)
  }
  const secretKey = new Uint8Array(decoder.write(tx.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)
  return signedTxn
}

/**
 * Sned Algorand burn FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param testnet mainnet or testnet version
 * @param tx content of the transaction to broadcast
 * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain.
 */
export const sendAlgoBurnFTSignedTransaction = async (testnet: boolean, tx: BurnErc20, provider?: string) => {
  return await algorandBroadcast(await prepareAlgoBurnFTSignedTransaction(testnet, tx, provider))
}

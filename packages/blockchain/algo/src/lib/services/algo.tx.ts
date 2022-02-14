import {
  BlockchainAlgorandAlgoService,
  BurnNft,
  BurnNftKMS as ApiBurnNftKMS,
  DeployNft as ApiDeployNft,
  DeployNftKMS as ApiDeployNftKMS,
  TransferAlgo as ApiTransferAlgo,
  TransferAlgoKMS as ApiTransferAlgoKMS,
  TransferErc721,
  TransferNft,
  TransferNftKMS as ApiTransferNftKMS,
} from '@tatumio/api-client'
import { AlgoWeb } from './algo.web'
import * as algosdk from 'algosdk'
import base32 from 'base32.js'
import { algoWallet } from './algo.wallet'
import { isWithSignatureId } from '@tatumio/shared-abstract-sdk'

function isTransferAlgoKMS(input: TransferAlgo | TransferAlgoKMS): input is TransferAlgoKMS {
  return (input as TransferAlgoKMS).signatureId !== undefined
}

// TODO: Probably missing in OpenAPI spec
type TransferAlgo = ApiTransferAlgo & Pick<TransferErc721, 'fee'>
type TransferAlgoKMS = ApiTransferAlgoKMS & Pick<TransferErc721, 'fee'>

const prepareSignedTransaction = async (
  body: TransferAlgo | TransferAlgoKMS,
  testnet = false,
  algoWeb: AlgoWeb,
  provider?: string,
) => {
  const algodClient = algoWeb.getClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()

  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const enc = new TextEncoder()
  const note = enc.encode(body.senderNote ?? '')
  const bodyn = algosdk.makePaymentTxnWithSuggestedParams(
    body.account,
    body.address,
    Number(body.amount) * 1000000,
    undefined,
    note,
    {
      ...params,
      fee: Number(body.fee) * 1000000,
      flatFee: true,
    },
  )

  if (isTransferAlgoKMS(body)) {
    return JSON.stringify(bodyn)
  }

  const secretKey = new Uint8Array(decoder.write(body.privateKey).buf)
  const signedTxn = bodyn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

// TODO: from, url missing in OpenAPI spec
export type DeployNftKMS = ApiDeployNftKMS & { from: string; url: string }
export type DeployNft = ApiDeployNft & { url: string }

const prepareCreateNFTSignedTransaction = async (
  body: DeployNft | DeployNftKMS,
  testnet = false,
  algoWeb: AlgoWeb,
  provider?: string,
) => {
  const algodClient = algoWeb.getClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()

  const decoder = new base32.Decoder({ type: 'rfc4648' })

  const from = isWithSignatureId(body)
    ? body.from
    : algoWallet().generateAddressFromPrivatetKey(body.fromPrivateKey)

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    from,
    undefined,
    1,
    0,
    false,
    from,
    undefined,
    undefined,
    undefined,
    body.symbol,
    body.name,
    body.url,
    undefined,
    params,
  )

  if (isWithSignatureId(body)) {
    return JSON.stringify(txn)
  }

  const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

// TODO: OpenAPI bug -> missing from property
type TransferNftKMS = ApiTransferNftKMS & { from: string }

const prepareTransferNFTSignedTransaction = async (
  body: TransferNft | TransferNftKMS,
  testnet = false,
  algoWeb: AlgoWeb,
  provider?: string,
) => {
  const algodClient = algoWeb.getClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()

  const decoder = new base32.Decoder({ type: 'rfc4648' })

  const from = isWithSignatureId(body)
    ? body.from
    : algoWallet().generateAddressFromPrivatetKey(body.fromPrivateKey)

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    from,
    body.to,
    undefined,
    undefined,
    body.value ? Number.parseInt(body.value) : undefined,
    undefined,
    Number(body.contractAddress),
    params,
    undefined,
  )

  if (isWithSignatureId(body)) {
    return JSON.stringify(txn)
  }

  const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

// TODO: OpenAPI bug -> missing from property
type BurnNftKMS = ApiBurnNftKMS & { from: string }

const prepareBurnNFTSignedTransaction = async (
  body: BurnNft | BurnNftKMS,
  testnet = false,
  algoWeb: AlgoWeb,
  provider?: string,
) => {
  const algodClient = algoWeb.getClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()

  const decoder = new base32.Decoder({ type: 'rfc4648' })

  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
    isWithSignatureId(body) ? body.from : algoWallet().generateAddressFromPrivatetKey(body.fromPrivateKey),
    undefined,
    Number(body.contractAddress),
    params,
    undefined,
  )

  if (isWithSignatureId(body)) {
    return JSON.stringify(txn)
  }

  const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

export const algoTx = (args: { algoWeb: AlgoWeb }) => {
  return {
    prepare: {
      /**
       * Algorand transaction signing
       * @param testnet if the algorand node is testnet or not
       * @param tx content of the transaction to broadcast
       * @param provider url of the algorand server endpoint for purestake.io restapi
       * @returns transaction data to be broadcast to blockchain
       */
      signedTransaction: async (body: TransferAlgo | TransferAlgoKMS, testnet = false, provider?: string) =>
        prepareSignedTransaction(body, testnet, args.algoWeb, provider),
      /**
       * Sign Algorand create NFT transaction with private key locally. Nothing is broadcast to the blockchain.
       * @param testnet mainnet or testnet version
       * @param tx content of the transaction to broadcast
       * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain
       */
      createNFTSignedTransaction: async (
        body:  DeployNft | DeployNftKMS,
        testnet = false,
        provider?: string,
      ) => prepareCreateNFTSignedTransaction(body, testnet, args.algoWeb, provider),
      /**
       * Sign Algorand transfer NFT transaction with private key locally. Nothing is broadcast to the blockchain.
       * @param testnet mainnet or testnet version
       * @param tx content of the transaction to broadcast
       * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferNFTSignedTransaction: async (
        body: TransferNft | TransferNftKMS,
        testnet = false,
        provider?: string,
      ) => prepareTransferNFTSignedTransaction(body, testnet, args.algoWeb, provider),
      /**
       * Sign Algorand burn NFT transaction with private key locally. Nothing is broadcast to the blockchain.
       * @param testnet mainnet or testnet version
       * @param tx content of the transaction to broadcast
       * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnNFTSignedTransaction: async (body: BurnNft | BurnNftKMS, testnet = false, provider?: string) =>
        prepareBurnNFTSignedTransaction(body, testnet, args.algoWeb, provider),
    },
    send: {
      /**
       * Send Algorand transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param tx content of the transaction to broadcast
       * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      signedTransaction: async (body: TransferAlgo | TransferAlgoKMS, testnet = false, provider?: string) =>
        BlockchainAlgorandAlgoService.algoandBroadcast({
          txData: await prepareSignedTransaction(body, testnet, args.algoWeb, provider),
          ...(isTransferAlgoKMS(body) && { signatureId: body.signatureId }),
        }),
      /**
       * Send Algorand create NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param testnet mainnet or testnet version
       * @param tx content of the transaction to broadcast
       * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      createNFTSignedTransaction: async (
        body:  DeployNft | DeployNftKMS,
        testnet = false,
        provider?: string,
      ) =>
        BlockchainAlgorandAlgoService.algoandBroadcast({
          txData: await prepareCreateNFTSignedTransaction(body, testnet, args.algoWeb, provider),
          ...(isWithSignatureId(body) && { signatureId: body.signatureId }),
        }),
      /**
       * Send Algorand Transfer NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param testnet mainnet or testnet version
       * @param tx content of the transaction to broadcast
       * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain.
       */
      transferNFTSignedTransaction: async (
        body: TransferNft | TransferNftKMS,
        testnet = false,
        provider?: string,
      ) =>
        BlockchainAlgorandAlgoService.algoandBroadcast({
          txData: await prepareTransferNFTSignedTransaction(body, testnet, args.algoWeb, provider),
          ...(isWithSignatureId(body) && { signatureId: body.signatureId }),
        }),
      /**
       * Send Algorand burn NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param testnet mainnet or testnet version
       * @param tx content of the transaction to broadcast
       * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain.
       */
      burnNFTSignedTransaction: async (body: BurnNft | BurnNftKMS, testnet = false, provider?: string) =>
        BlockchainAlgorandAlgoService.algoandBroadcast({
          txData: await prepareBurnNFTSignedTransaction(body, testnet, args.algoWeb, provider),
          ...(isWithSignatureId(body) && { signatureId: body.signatureId }),
        }),
    },
  }
}

import {
  AccountService,
  AlgorandService,
  ApiServices,
  BurnMultiToken,
  BurnMultiTokenKMS,
  BurnNft as ApiBurnNft,
  BurnNftKMS as ApiBurnNftKMS,
  ChainTransferAlgoErc20 as ApiChainTransferAlgoErc20,
  ChainTransferAlgoErc20KMS as ApiChainTransferAlgoErc20KMS,
  Currency,
  DeployErc20 as ApiDeployErc20,
  DeployErc20KMS as ApiDeployErc20KMS,
  MintMultiToken,
  MintMultiTokenKMS,
  MintNftAlgorand as ApiMintNftAlgorand,
  MintNftAlgorandKMS as ApiMintNftAlgorandKMS,
  OffchainTransactionResult,
  OffchainTransactionSignatureResult,
  TransactionHash,
  TransferAlgo as ApiTransferAlgo,
  TransferAlgoKMS as ApiTransferAlgoKMS,
  TransferMultiToken,
  TransferMultiTokenKMS,
  TransferNft as ApiTransferNft,
  TransferNftKMS as ApiTransferNftKMS,
} from '@tatumio/api-client'
import { AlgoWeb } from './algo.web'
import * as algosdk from 'algosdk'
// No types for base32.js
// @ts-ignore
import base32 from 'base32.js'
import { algoWallet } from './algo.wallet'
import { isWithSignatureId, SdkError, SdkErrorCode, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { AlgoApiCallsType } from '../../index'
import { BigNumber } from 'bignumber.js'

// TODO: Probably missing in OpenAPI spec
export type TransferAlgo = Omit<ApiTransferAlgo, 'senderAccountId'>
export type TransferAlgoKMS = Omit<ApiTransferAlgoKMS, 'senderAccountId'> & { from: string; fee: string }

export type MintNftAlgorandKMS = WithoutChain<ApiMintNftAlgorandKMS> & { from: string; url: string }
export type MintNftAlgorand = WithoutChain<ApiMintNftAlgorand> & { url: string }

// TODO: OpenAPI bug -> missing from property
export type TransferNftKMS = WithoutChain<ApiTransferNftKMS> & { from: string }
export type TransferNft = WithoutChain<ApiTransferNft>

// TODO: OpenAPI bug -> missing from property
export type BurnNftKMS = WithoutChain<ApiBurnNftKMS> & { from: string }
export type BurnNft = WithoutChain<ApiBurnNft>

export type DeployErc20KMS = ApiDeployErc20KMS & { from: string; url: string }
export type DeployErc20 = ApiDeployErc20 & { url: string }

export type ChainTransferAlgoErc20 = WithoutChain<ApiChainTransferAlgoErc20>
export type ChainTransferAlgoErc20KMS = WithoutChain<ApiChainTransferAlgoErc20KMS>

type SendOffchainResponse =
  | OffchainTransactionResult
  | OffchainTransactionSignatureResult
  | { id?: string }
  | void

export const prepareSignedTransaction = async (
  body: TransferAlgo | TransferAlgoKMS | ApiTransferAlgo | ApiTransferAlgoKMS,
  testnet = false,
  algoWeb: AlgoWeb,
  provider?: string,
): Promise<string> => {
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
      fee: Number(body.fee || '0.001') * 1000000,
      flatFee: true,
    },
  )

  if (isTransferAlgoKMS(body)) {
    return JSON.stringify(bodyn)
  }

  const secretKey = new Uint8Array(decoder.write((body as TransferAlgo).privateKey).buf)
  const signedTxn = bodyn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

function isTransferAlgoKMS(
  input:
    | TransferAlgo
    | TransferAlgoKMS
    | ApiTransferAlgo
    | ApiTransferAlgoKMS
    | ChainTransferAlgoErc20
    | ChainTransferAlgoErc20KMS,
): input is TransferAlgoKMS {
  return (input as TransferAlgoKMS).signatureId !== undefined
}

export const algoTxService = (args: { algoWeb: AlgoWeb }, apiCalls: AlgoApiCallsType) => {
  const prepareSignedTransaction = async (
    body: TransferAlgo | TransferAlgoKMS | ApiTransferAlgo | ApiTransferAlgoKMS,
    testnet = false,
    algoWeb: AlgoWeb,
    provider?: string,
  ): Promise<string> => {
    const { balance } = await apiCalls.getBlockchainAccountBalance(body.account)
    const requiredBalance = new BigNumber(body.amount).plus(body.fee || 0.001)
    const accountBalance = new BigNumber(balance || 0)
    if (accountBalance.isLessThan(requiredBalance)) {
      throw new SdkError({
        code: SdkErrorCode.INSUFFICIENT_FUNDS,
        originalError: {
          name: SdkErrorCode.INSUFFICIENT_FUNDS,
          message: `Insufficient funds to create transaction from sender account ${
            body.account
          } -> available balance is ${accountBalance.toString()}, required balance is ${requiredBalance.toString()}.`,
        },
      })
    }

    return await prepareSignedTransaction(body, testnet, algoWeb, provider)
  }

  const prepareCreateNFTSignedTransaction = async (
    body: MintNftAlgorand | MintNftAlgorandKMS,
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
      body.attr?.reserve,
      body.attr?.freeze,
      body.attr?.clawback,
      body.attr?.assetUnit,
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

    if (!body.value) {
      throw new Error('No value specified')
    }

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      from,
      body.to,
      undefined,
      undefined,
      Number.parseInt(body.value),
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

  const prepareCreateFTSignedTransaction = async (
    body: DeployErc20 | DeployErc20KMS,
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
      Number(body.supply),
      Number(body.digits),
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

  const prepareTransferFTSignedTransaction = async (
    body: ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS,
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
      Number.parseInt(body.amount),
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

  const prepareBurnFTSignedTransaction = async (
    body: ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS,
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

    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
      from,
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

  const prepareCreateFractionalNFTSignedTransaction = async (
    body: MintMultiToken | MintMultiTokenKMS,
    testnet = false,
    algoWeb: AlgoWeb,
    provider?: string,
  ) => {
    const algodClient = algoWeb.getClient(testnet, provider)
    const params = await algodClient.getTransactionParams().do()

    const decoder = new base32.Decoder({ type: 'rfc4648' })

    const from = isWithSignatureId(body)
      ? body.from
      : algoWallet().generateAddressFromPrivatetKey((body as MintMultiToken).fromPrivateKey)

    const v = Math.floor(Math.log10(new BigNumber(body.amount).toNumber()))
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
      from,
      undefined,
      new BigNumber(10).pow(v).toNumber(),
      v,
      false,
      from,
      undefined,
      undefined,
      undefined,
      body.tokenId,
      body.contractAddress,
      undefined,
      undefined,
      params,
    )
    if ('signatureId' in body) {
      return JSON.stringify(txn)
    }
    const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
    return Buffer.from(txn.signTxn(secretKey)).toString('hex')
  }

  const prepareTransferFractionalNFTSignedTransaction = async (
    body: TransferMultiToken | TransferMultiTokenKMS,
    testnet = false,
    algoWeb: AlgoWeb,
    provider?: string,
  ) => {
    const algodClient = algoWeb.getClient(testnet, provider)
    const params = await algodClient.getTransactionParams().do()

    const decoder = new base32.Decoder({ type: 'rfc4648' })

    const from = isWithSignatureId(body)
      ? body.from
      : algoWallet().generateAddressFromPrivatetKey((body as TransferMultiToken).fromPrivateKey)

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      from,
      body.to,
      undefined,
      undefined,
      new BigNumber(body.amount).toNumber(),
      undefined,
      new BigNumber(body.contractAddress).toNumber(),
      params,
      undefined,
    )
    if ('signatureId' in body) {
      return JSON.stringify(txn)
    }
    const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
    return Buffer.from(txn.signTxn(secretKey)).toString('hex')
  }

  const prepareBurnFractionalNFTSignedTransaction = async (
    body: BurnMultiToken | BurnMultiTokenKMS,
    testnet = false,
    algoWeb: AlgoWeb,
    provider?: string,
  ) => {
    const algodClient = algoWeb.getClient(testnet, provider)
    const params = await algodClient.getTransactionParams().do()

    const decoder = new base32.Decoder({ type: 'rfc4648' })

    const from = isWithSignatureId(body)
      ? body.from
      : algoWallet().generateAddressFromPrivatetKey((body as BurnMultiToken).fromPrivateKey)

    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
      from,
      undefined,
      new BigNumber(body.contractAddress).toNumber(),
      params,
      undefined,
    )
    if ('signatureId' in body) {
      return JSON.stringify(txn)
    }
    const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
    return Buffer.from(txn.signTxn(secretKey)).toString('hex')
  }

  return {
    erc20: {
      prepare: {
        /**
         * Sign Algorand create FT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connnect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        createFTSignedTransaction: async (
          body: DeployErc20 | DeployErc20KMS,
          testnet = false,
          provider?: string,
        ) => prepareCreateFTSignedTransaction(body, testnet, args.algoWeb, provider),
        /**
         * Sign Algorand transfer FT transaction with private kwy locally. Nothing is broadcast to the blockchain.
         * @param testnet mainnet or testnet version
         * @param body content of the transaction to broadcast
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        transferFTSignedTransaction: async (
          body: ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS,
          testnet = false,
          provider?: string,
        ) => prepareTransferFTSignedTransaction(body, testnet, args.algoWeb, provider),
        /**
         * Sign ALgorand burn FT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        burnFTSignedTransaction: async (
          body: ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS,
          testnet = false,
          provider?: string,
        ) => prepareBurnFTSignedTransaction(body, testnet, args.algoWeb, provider),
      },
      send: {
        /**
         * Send Algorand create FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain.
         */
        createFTSignedTransaction: async (
          body: DeployErc20 | DeployErc20KMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareCreateFTSignedTransaction(body, testnet, args.algoWeb, provider)
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
        /**
         * Send Algorand transfer FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain.
         */
        transferFTSignedTransaction: async (
          body: ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareTransferFTSignedTransaction(body, testnet, args.algoWeb, provider)
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
        /**
         * Sned Algorand burn FT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain.
         */
        burnFTSignedTransaction: async (
          body: ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareBurnFTSignedTransaction(body, testnet, args.algoWeb, provider)
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
      },
    },

    erc721: {
      prepare: {
        /**
         * Sign Algorand create NFT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain
         */
        createNFTSignedTransaction: async (
          body: MintNftAlgorand | MintNftAlgorandKMS,
          testnet = false,
          provider?: string,
        ) => prepareCreateNFTSignedTransaction(body, testnet, args.algoWeb, provider),
        /**
         * Sign Algorand transfer NFT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
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
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        burnNFTSignedTransaction: async (body: BurnNft | BurnNftKMS, testnet = false, provider?: string) =>
          prepareBurnNFTSignedTransaction(body, testnet, args.algoWeb, provider),
      },
      send: {
        /**
         * Send Algorand create NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        createNFTSignedTransaction: async (
          body: MintNftAlgorand | MintNftAlgorandKMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareCreateNFTSignedTransaction(body, testnet, args.algoWeb, provider)
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
        /**
         * Send Algorand Transfer NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain.
         */
        transferNFTSignedTransaction: async (
          body: TransferNft | TransferNftKMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareTransferNFTSignedTransaction(body, testnet, args.algoWeb, provider)
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
        /**
         * Send Algorand burn NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain.
         */
        burnNFTSignedTransaction: async (body: BurnNft | BurnNftKMS, testnet = false, provider?: string) => {
          const txData = await prepareBurnNFTSignedTransaction(body, testnet, args.algoWeb, provider)
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
      },
    },

    multiToken: {
      prepare: {
        /**
         * Sign Algorand create Fractional NFT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        createFractionalNFTSignedTransaction: async (
          body: MintMultiToken | MintMultiTokenKMS,
          testnet = false,
          provider?: string,
        ) => prepareCreateFractionalNFTSignedTransaction(body, testnet, args.algoWeb, provider),
        /**
         * Sign Algorand transfer Fractional NFT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        transferFractionalNFTSignedTransaction: async (
          body: TransferMultiToken | TransferMultiTokenKMS,
          testnet = false,
          provider?: string,
        ) => prepareTransferFractionalNFTSignedTransaction(body, testnet, args.algoWeb, provider),
        /**
         * Sign Algorand burn Fractional NFT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        burnFractionalNFTSignedTransaction: async (
          body: BurnMultiToken | BurnMultiTokenKMS,
          testnet = false,
          provider?: string,
        ) => prepareBurnFractionalNFTSignedTransaction(body, testnet, args.algoWeb, provider),
      },
      send: {
        /**
         * Send signed Algorand create Fractional NFT transaction with private key locally.
         * This method broadcasts signed transaction to the blockchain. This operation is irreversible.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        createFractionalNFTSignedTransaction: async (
          body: MintMultiToken | MintMultiTokenKMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareCreateFractionalNFTSignedTransaction(
            body,
            testnet,
            args.algoWeb,
            provider,
          )
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
        /**
         * Send Algorand transfer Fractional NFT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain.
         */
        transferFractionalNFTSignedTransaction: async (
          body: TransferMultiToken | TransferMultiTokenKMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareTransferFractionalNFTSignedTransaction(
            body,
            testnet,
            args.algoWeb,
            provider,
          )
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
        /**
         * Send Algorand burn Fractional NFT transaction to the blockchain.
         * This method broadcasts signed transaction to the blockchain. This operation is irreversible.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        burnFractionalNFTSignedTransaction: async (
          body: BurnMultiToken | BurnMultiTokenKMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareBurnFractionalNFTSignedTransaction(
            body,
            testnet,
            args.algoWeb,
            provider,
          )
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
      },
    },

    native: {
      prepare: {
        /**
         * Algorand transaction signing
         * @param body content of the transaction to broadcast
         * @param testnet if the algorand node is testnet or not
         * @param provider url of the algorand server endpoint for purestake.io restapi
         * @returns transaction data to be broadcast to blockchain
         */
        signedTransaction: async (body: TransferAlgo | TransferAlgoKMS, testnet = false, provider?: string) =>
          prepareSignedTransaction(body, testnet, args.algoWeb, provider),
      },
      send: {
        /**
         * Send Algorand transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        signedTransaction: async (
          body: TransferAlgo | TransferAlgoKMS,
          testnet = false,
          provider?: string,
        ) => {
          const txData = await prepareSignedTransaction(body, testnet, args.algoWeb, provider)
          if ('signatureId' in body) {
            return ApiServices.blockchain.algo.algorandBlockchainTransfer(JSON.parse(txData))
          }
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
      },
    },

    virtualAccount: {
      send: {
        /**
         * Send ALGO transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param body content of the transaction to broadcast
         * @param testnet if the algorand node is testnet or not
         * @param provider url of the algorand server endpoint for purestake.io restapi
         * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
         */
        signedTransaction: async (
          body: ApiTransferAlgo | ApiTransferAlgoKMS | ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS,
          testnet = false,
          provider?: string,
        ): Promise<SendOffchainResponse> => {
          let txData

          const { fee, ...withdrawal } = body as ApiTransferAlgoKMS

          const { senderAccountId } = withdrawal
          const account = await AccountService.getAccountByAccountId(senderAccountId)

          if (account.currency === Currency.ALGO) {
            txData = await prepareSignedTransaction(
              body as ApiTransferAlgo | ApiTransferAlgoKMS,
              testnet,
              args.algoWeb,
              provider,
            )
          } else {
            txData = await prepareTransferFTSignedTransaction(
              {
                from: (
                  await AlgorandService.algorandGenerateAddress(
                    (body as ChainTransferAlgoErc20).fromPrivateKey,
                  )
                )?.address,
                fromPrivateKey: (body as ChainTransferAlgoErc20).fromPrivateKey,
                signatureId: (body as ChainTransferAlgoErc20KMS).signatureId,
                to: (body as ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS).to,
                amount: body.amount,
                contractAddress: (body as ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS).contractAddress,
              },
              testnet,
              args.algoWeb,
              provider,
            )
          }

          const { id } = await ApiServices.offChain.withdrawal.storeWithdrawal({
            ...withdrawal,
            fee: new BigNumber(fee || '0.001').toString(),
          })

          if ('signatureId' in body) {
            try {
              return {
                ...(await ApiServices.offChain.withdrawal.broadcastBlockchainTransaction({
                  txData,
                  withdrawalId: id,
                  currency: Currency.ALGO,
                })),
                id,
              }
            } catch (_) {
              try {
                return await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id!)
              } catch (_) {
                return { id }
              }
            }
          }
          const { txId } = (await ApiServices.blockchain.algo.algorandBlockchainTransfer(
            JSON.parse(txData),
          )) as TransactionHash
          return { id, txId }
        },
      },
    },
  }
}

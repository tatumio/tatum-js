import {
  AccountService,
  AlgorandService,
  ApiServices,
  BurnNftAlgo as ApiBurnNftAlgo,
  BurnNftAlgoKMS as ApiBurnNftAlgoKMS,
  ChainTransferAlgoErc20 as ApiChainTransferAlgoErc20,
  ChainTransferAlgoErc20KMS as ApiChainTransferAlgoErc20KMS,
  Currency,
  ChainDeployAlgoErc20 as ApiDeployErc20,
  ChainDeployAlgoErc20KMS as ApiDeployErc20KMS,
  MintNftAlgorand as ApiMintNftAlgorand,
  MintNftAlgorandKMS as ApiMintNftAlgorandKMS,
  MintNftExpressAlgorand as ApiMintNftExpressAlgorand,
  OffchainTransactionResult,
  OffchainTransactionSignatureResult,
  ReceiveAlgorandAsset,
  ReceiveAlgorandAssetKMS,
  TransferAlgo as ApiTransferAlgo,
  TransferAlgoKMS as ApiTransferAlgoKMS,
  TransferNftAlgo as ApiTransferNftAlgo,
  TransferNftAlgoKMS as ApiTransferNftAlgoKMS,
  TransferAlgorandBlockchain as ApiTransferAlgorandBlockchain,
  TransferAlgorandBlockchainKMS as ApiTransferAlgorandBlockchainKMS,
  TransferNftAlgoExpress as ApiTransferNftAlgoExpress,
  ChainBurnAlgoErc20KMS as ApiChainBurnAlgoErc20KMS,
  ChainBurnAlgoErc20 as ApiChainBurnAlgoErc20,
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

export type TransferAlgo = ApiTransferAlgo
export type TransferAlgoKMS = ApiTransferAlgoKMS

export type TransferAlgoBlockchain = ApiTransferAlgorandBlockchain
export type TransferAlgoBlockchainKMS = ApiTransferAlgorandBlockchainKMS

export type MintNftAlgoKMS = WithoutChain<ApiMintNftAlgorandKMS>
export type MintNftAlgo = WithoutChain<ApiMintNftAlgorand>
export type MintNftExpressAlgo = WithoutChain<ApiMintNftExpressAlgorand>

export type TransferNftAlgoKMS = WithoutChain<ApiTransferNftAlgoKMS>
export type TransferNftAlgo = WithoutChain<ApiTransferNftAlgo>
export type TransferNftAlgoExpress = WithoutChain<ApiTransferNftAlgoExpress>

export type BurnNftAlgoKMS = WithoutChain<ApiBurnNftAlgoKMS>
export type BurnNftAlgo = WithoutChain<ApiBurnNftAlgo>

export type DeployAlgoErc20KMS = WithoutChain<ApiDeployErc20KMS>
export type DeployAlgoErc20 = WithoutChain<ApiDeployErc20>

export type ChainTransferAlgoErc20 = WithoutChain<ApiChainTransferAlgoErc20>
export type ChainTransferAlgoErc20KMS = WithoutChain<ApiChainTransferAlgoErc20KMS>

export type ChainBurnAlgoErc20 = WithoutChain<ApiChainBurnAlgoErc20>
export type ChainBurnAlgoErc20KMS = WithoutChain<ApiChainBurnAlgoErc20KMS>

type SendOffchainResponse =
  | OffchainTransactionResult
  | OffchainTransactionSignatureResult
  | { id?: string }
  | void

export const algoTxService = (args: { algoWeb: AlgoWeb }, apiCalls: AlgoApiCallsType) => {
  const prepareSignedTransaction = async (
    body: TransferAlgo | TransferAlgoKMS | TransferAlgoBlockchain | TransferAlgoBlockchainKMS,
    testnet = false,
    algoWeb: AlgoWeb,
    provider?: string,
  ): Promise<string> => {
    const account = (body as TransferAlgoBlockchain).from || (body as TransferAlgo).account
    const to = (body as TransferAlgoBlockchain).to || (body as TransferAlgo).address
    const privateKey = (body as TransferAlgoBlockchain).fromPrivateKey || (body as TransferAlgo).privateKey

    const from = isWithSignatureId(body as TransferAlgoKMS | TransferAlgoBlockchainKMS)
      ? account
      : algoWallet().generateAddressFromPrivatetKey(privateKey)

    if ((body as TransferAlgoBlockchain).to) {
      const { balance } = await apiCalls.getBlockchainAccountBalance(from)
      const requiredBalance = new BigNumber(body.amount).plus(body.fee || 0.001)
      const accountBalance = new BigNumber(balance || 0)
      if (accountBalance.isLessThan(requiredBalance)) {
        throw new SdkError({
          code: SdkErrorCode.INSUFFICIENT_FUNDS,
          originalError: {
            name: SdkErrorCode.INSUFFICIENT_FUNDS,
            message: `Insufficient funds to create transaction from address ${from} -> available balance is ${accountBalance.toString()}, required balance is ${requiredBalance.toString()}.`,
          },
        })
      }
    }

    const algodClient = algoWeb.getClient(testnet, provider)
    const params = await algodClient.getTransactionParams().do()

    const decoder = new base32.Decoder({ type: 'rfc4648' })
    const enc = new TextEncoder()
    const note = enc.encode((body as TransferAlgo).senderNote ?? '')
    const bodyn = algosdk.makePaymentTxnWithSuggestedParams(
      from,
      to,
      Number(body.amount) * 1000000,
      undefined,
      note,
      {
        ...params,
        fee: Number(body.fee || '0.001') * 1000000,
        flatFee: true,
      },
    )

    if (isWithSignatureId(body as TransferAlgoKMS | TransferAlgoBlockchainKMS)) {
      return JSON.stringify(bodyn)
    }

    const secretKey = new Uint8Array(decoder.write(privateKey).buf)
    const signedTxn = bodyn.signTxn(secretKey)

    return Buffer.from(signedTxn).toString('hex')
  }

  const prepareCreateNFTSignedTransaction = async (
    body: MintNftAlgo | MintNftAlgoKMS,
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
      {
        ...params,
        fee: Number(body.fee || '0.001') * 1000000,
        flatFee: true,
      },
    )

    if (isWithSignatureId(body)) {
      return JSON.stringify(txn)
    }

    const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
    const signedTxn = txn.signTxn(secretKey)

    return Buffer.from(signedTxn).toString('hex')
  }

  const prepareTransferNFTSignedTransaction = async (
    body: TransferNftAlgo | TransferNftAlgoKMS | TransferNftAlgoExpress,
    testnet = false,
    algoWeb: AlgoWeb,
    provider?: string,
  ) => {
    const algodClient = algoWeb.getClient(testnet, provider)
    const params = await algodClient.getTransactionParams().do()

    const decoder = new base32.Decoder({ type: 'rfc4648' })

    const from = isWithSignatureId(body as TransferNftAlgoKMS)
      ? (body as TransferNftAlgoKMS).from
      : algoWallet().generateAddressFromPrivatetKey((body as TransferNftAlgo).fromPrivateKey)

    if (!body.value) {
      throw new Error('No value specified')
    }

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      from,
      body.to,
      undefined,
      undefined,
      Number.parseInt((body as TransferNftAlgo).value || '1'),
      undefined,
      Number(body.contractAddress),
      {
        ...params,
        fee: Number(body.fee || '0.001') * 1000000,
        flatFee: true,
      },
      undefined,
    )

    if (isWithSignatureId(body as TransferNftAlgoKMS)) {
      return JSON.stringify(txn)
    }

    const secretKey = new Uint8Array(decoder.write((body as TransferNftAlgo).fromPrivateKey).buf)
    const signedTxn = txn.signTxn(secretKey)

    return Buffer.from(signedTxn).toString('hex')
  }

  const prepareBurnNFTSignedTransaction = async (
    body: BurnNftAlgo | BurnNftAlgoKMS,
    testnet = false,
    algoWeb: AlgoWeb,
    provider?: string,
  ) => {
    const algodClient = algoWeb.getClient(testnet, provider)
    const params = await algodClient.getTransactionParams().do()

    const decoder = new base32.Decoder({ type: 'rfc4648' })

    const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
      isWithSignatureId(body as BurnNftAlgoKMS)
        ? (body as BurnNftAlgoKMS).from
        : algoWallet().generateAddressFromPrivatetKey((body as BurnNftAlgo).fromPrivateKey),
      undefined,
      Number(body.contractAddress),
      {
        ...params,
        fee: Number(body.fee || '0.001') * 1000000,
        flatFee: true,
      },
      undefined,
    )

    if (isWithSignatureId(body as BurnNftAlgoKMS)) {
      return JSON.stringify(txn)
    }

    const secretKey = new Uint8Array(decoder.write((body as BurnNftAlgo).fromPrivateKey).buf)
    const signedTxn = txn.signTxn(secretKey)

    return Buffer.from(signedTxn).toString('hex')
  }

  const prepareReceiveAssetSignedTransaction = async (
    body: ReceiveAlgorandAsset | ReceiveAlgorandAssetKMS,
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
      from,
      undefined,
      undefined,
      0,
      undefined,
      body.assetId,
      {
        ...params,
        fee: Number(body.fee || '0.001') * 1000000,
        flatFee: true,
      },
    )
    if (isWithSignatureId(body)) {
      return JSON.stringify(txn)
    }
    const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
    return Buffer.from(txn.signTxn(secretKey)).toString('hex')
  }

  const prepareCreateFTSignedTransaction = async (
    body: DeployAlgoErc20 | DeployAlgoErc20KMS,
    testnet = false,
    algoWeb: AlgoWeb,
    provider?: string,
  ) => {
    const algodClient = algoWeb.getClient(testnet, provider)
    const params = await algodClient.getTransactionParams().do()

    const decoder = new base32.Decoder({ type: 'rfc4648' })

    const from = isWithSignatureId(body as DeployAlgoErc20KMS)
      ? (body as DeployAlgoErc20KMS).from
      : algoWallet().generateAddressFromPrivatetKey((body as DeployAlgoErc20).fromPrivateKey)

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
      (body as DeployAlgoErc20).url,
      undefined,
      {
        ...params,
        fee: Number(body.fee || '0.001') * 1000000,
        flatFee: true,
      },
    )

    if (isWithSignatureId(body)) {
      return JSON.stringify(txn)
    }

    const secretKey = new Uint8Array(decoder.write((body as DeployAlgoErc20).fromPrivateKey).buf)
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
      Number(body.amount),
      undefined,
      Number(body.contractAddress),
      {
        ...params,
        fee: Number(body.fee || '0.001') * 1000000,
        flatFee: true,
      },
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
    body: ChainBurnAlgoErc20 | ChainBurnAlgoErc20KMS,
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
      {
        ...params,
        fee: Number(body.fee || '0.001') * 1000000,
        flatFee: true,
      },
      undefined,
    )

    if (isWithSignatureId(body)) {
      return JSON.stringify(txn)
    }

    const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
    const signedTxn = txn.signTxn(secretKey)

    return Buffer.from(signedTxn).toString('hex')
  }

  return {
    asset: {
      prepare: {
        /**
         * Sign Algorand receive asset transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain
         */
        receive: async (
          body: ReceiveAlgorandAsset | ReceiveAlgorandAssetKMS,
          testnet = false,
          provider?: string,
        ) => prepareReceiveAssetSignedTransaction(body, testnet, args.algoWeb, provider),
      },
      send: {
        /**
         * Send Algorand receive asset transaction with private key locally.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain
         */
        receive: async (
          body: ReceiveAlgorandAsset | ReceiveAlgorandAssetKMS,
          testnet = false,
          provider?: string,
        ) => {
          if (isWithSignatureId(body)) {
            return ApiServices.blockchain.algo.algorandBlockchainReceiveAsset(body)
          }
          return AlgorandService.algorandBroadcast({
            txData: await prepareReceiveAssetSignedTransaction(body, testnet, args.algoWeb, provider),
          })
        },
      },
    },
    fungible: {
      prepare: {
        /**
         * Sign Algorand create FT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connnect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        createFTSignedTransaction: async (
          body: DeployAlgoErc20 | DeployAlgoErc20KMS,
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
          body: ChainBurnAlgoErc20 | ChainBurnAlgoErc20KMS,
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
          body: DeployAlgoErc20 | DeployAlgoErc20KMS,
          testnet = false,
          provider?: string,
        ) => {
          if (isWithSignatureId(body)) {
            return ApiServices.fungibleToken.erc20Deploy({
              chain: Currency.ALGO,
              ...body,
            } as ApiDeployErc20KMS)
          }
          const txData = await prepareCreateFTSignedTransaction(body, testnet, args.algoWeb, provider)
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
          if (isWithSignatureId(body)) {
            return ApiServices.fungibleToken.erc20Transfer({
              chain: Currency.ALGO,
              ...body,
            } as ApiChainTransferAlgoErc20KMS)
          }
          const txData = await prepareTransferFTSignedTransaction(body, testnet, args.algoWeb, provider)
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
          body: ChainBurnAlgoErc20 | ChainBurnAlgoErc20KMS,
          testnet = false,
          provider?: string,
        ) => {
          if (isWithSignatureId(body)) {
            return ApiServices.fungibleToken.erc20Burn({
              chain: Currency.ALGO,
              ...body,
            } as ApiChainBurnAlgoErc20KMS)
          }
          const txData = await prepareBurnFTSignedTransaction(body, testnet, args.algoWeb, provider)
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
      },
    },
    nft: {
      prepare: {
        /**
         * Sign Algorand create NFT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain
         */
        createNFTSignedTransaction: async (
          body: MintNftAlgo | MintNftAlgoKMS | MintNftExpressAlgo,
          testnet = false,
          provider?: string,
        ) => prepareCreateNFTSignedTransaction(body as MintNftAlgo, testnet, args.algoWeb, provider),
        /**
         * Sign Algorand transfer NFT transaction with private key locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param testnet mainnet or testnet version
         * @param provider url of the Algorand Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        transferNFTSignedTransaction: async (
          body: TransferNftAlgo | TransferNftAlgoKMS,
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
        burnNFTSignedTransaction: async (
          body: BurnNftAlgo | BurnNftAlgoKMS,
          testnet = false,
          provider?: string,
        ) => prepareBurnNFTSignedTransaction(body, testnet, args.algoWeb, provider),
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
          body: MintNftAlgo | MintNftAlgoKMS | MintNftExpressAlgo,
          testnet = false,
          provider?: string,
        ) => {
          if (isWithSignatureId(body as MintNftAlgoKMS) || !(body as MintNftAlgo).fromPrivateKey) {
            return ApiServices.nft.nftMintErc721({
              chain: Currency.ALGO,
              ...body,
            } as ApiMintNftAlgorandKMS | ApiMintNftExpressAlgorand)
          }
          const txData = await prepareCreateNFTSignedTransaction(
            body as MintNftAlgo,
            testnet,
            args.algoWeb,
            provider,
          )
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
          body: TransferNftAlgo | TransferNftAlgoKMS,
          testnet = false,
          provider?: string,
        ) => {
          if (isWithSignatureId(body)) {
            return ApiServices.nft.nftTransferErc721({
              chain: Currency.ALGO,
              ...body,
            } as ApiTransferNftAlgoKMS)
          }
          const txData = await prepareTransferNFTSignedTransaction(body, testnet, args.algoWeb, provider)
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
        burnNFTSignedTransaction: async (
          body: BurnNftAlgo | BurnNftAlgoKMS,
          testnet = false,
          provider?: string,
        ) => {
          if (isWithSignatureId(body as BurnNftAlgoKMS)) {
            return ApiServices.nft.nftBurnErc721({
              chain: Currency.ALGO,
              ...body,
            } as ApiBurnNftAlgoKMS)
          }
          const txData = await prepareBurnNFTSignedTransaction(body, testnet, args.algoWeb, provider)
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
          body: TransferAlgo | TransferAlgoKMS | TransferAlgoBlockchain | TransferAlgoBlockchainKMS,
          testnet = false,
          provider?: string,
        ) => {
          if (isWithSignatureId(body as TransferAlgoKMS | TransferAlgoBlockchainKMS)) {
            if ((body as TransferAlgoKMS).senderAccountId) {
              return ApiServices.offChain.blockchain.algoTransfer(body as TransferAlgoKMS)
            } else {
              return ApiServices.blockchain.algo.algorandBlockchainTransfer(body as TransferAlgoBlockchainKMS)
            }
          }
          const txData = await prepareSignedTransaction(body, testnet, args.algoWeb, provider)
          return AlgorandService.algorandBroadcast({
            txData,
          })
        },
      },
    },

    virtualAccount: {
      /**
       * Send ALGO transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param testnet if the algorand node is testnet or not
       * @param provider url of the algorand server endpoint for purestake.io restapi
       * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
       */
      send: async (
        body: ApiTransferAlgo | ApiTransferAlgoKMS,
        testnet = false,
        provider?: string,
      ): Promise<SendOffchainResponse> => {
        if (isWithSignatureId(body as ApiTransferAlgoKMS)) {
          return ApiServices.offChain.blockchain.algoTransfer(body as ApiTransferAlgoKMS)
        }

        const { fee, privateKey, ...withdrawal } = body as ApiTransferAlgo

        const { senderAccountId } = withdrawal
        const account = await AccountService.getAccountByAccountId(senderAccountId)
        let txData
        if (account.currency === Currency.ALGO) {
          txData = await prepareSignedTransaction(body as ApiTransferAlgo, testnet, args.algoWeb, provider)
        } else {
          const vc = await ApiServices.ledger.virtualCurrency.getCurrency(account.currency)
          txData = await prepareTransferFTSignedTransaction(
            {
              from: algoWallet().generateAddressFromPrivatetKey(privateKey),
              fromPrivateKey: privateKey,
              to: body.address,
              amount: new BigNumber(body.amount).multipliedBy(10 ** (vc.precision || 0)).toString(),
              contractAddress: vc.erc20Address as string,
              fee: body.fee,
            } as ChainTransferAlgoErc20,
            testnet,
            args.algoWeb,
            provider,
          )
        }

        const { id } = await ApiServices.offChain.withdrawal.storeWithdrawal({
          ...withdrawal,
          fee: new BigNumber(fee || '0.001').toString(),
        })

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
            return { id, completed: false }
          }
        }
      },
    },
  }
}

import {
  AccountService,
  AlgorandService,
  ApiServices,
  BurnNftAlgoKMS as ApiBurnNftAlgoKMS,
  ChainBurnAlgoErc20KMS as ApiChainBurnAlgoErc20KMS,
  ChainDeployAlgoErc20KMS as ApiDeployErc20KMS,
  ChainTransferAlgoErc20KMS as ApiChainTransferAlgoErc20KMS,
  Currency,
  MintNftAlgorandKMS as ApiMintNftAlgorandKMS,
  MintNftExpressAlgorand as ApiMintNftExpressAlgorand,
  OffchainTransactionResult,
  OffchainTransactionSignatureResult,
  ReceiveAlgorandAsset,
  ReceiveAlgorandAssetKMS,
  TransferAlgo as ApiTransferAlgo,
  TransferAlgoKMS as ApiTransferAlgoKMS,
  TransferNftAlgoKMS as ApiTransferNftAlgoKMS,
} from '@tatumio/api-client'
import { AlgoWeb } from './algo.web'
import * as algosdk from 'algosdk'
// No types for base32.js
// @ts-ignore
import base32 from 'base32.js'
import { algoWallet } from './algo.wallet'
import { isWithSignatureId } from '@tatumio/shared-abstract-sdk'
import { AlgoApiCallsType } from './algo.types'
import { BigNumber } from 'bignumber.js'
import { prepareSignedTransaction } from './tx/algo.tx.native'
import {
  BurnNftAlgo,
  BurnNftAlgoKMS,
  ChainBurnAlgoErc20,
  ChainBurnAlgoErc20KMS,
  ChainTransferAlgoErc20,
  ChainTransferAlgoErc20KMS,
  DeployAlgoErc20,
  DeployAlgoErc20KMS,
  MintNftAlgo,
  MintNftAlgoKMS,
  MintNftExpressAlgo,
  TransferAlgo,
  TransferAlgoBlockchain,
  TransferAlgoBlockchainKMS,
  TransferAlgoKMS,
  TransferNftAlgo,
  TransferNftAlgoKMS,
} from './algo.types'
import {
  prepareBurnFTSignedTransaction,
  prepareCreateFTSignedTransaction,
  prepareTransferFTSignedTransaction,
} from './tx/algo.tx.fungible'
import {
  prepareBurnNFTSignedTransaction,
  prepareCreateNFTSignedTransaction,
  prepareTransferNFTSignedTransaction,
} from './tx/algo.tx.nft'

type SendVirtualAccountTxResponse =
  | OffchainTransactionResult
  | OffchainTransactionSignatureResult
  | { id?: string }
  | void

export const algoTxService = (args: { algoWeb: AlgoWeb }, apiCalls: AlgoApiCallsType) => {
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
        ) => prepareCreateFTSignedTransaction({ body, testnet, algoWeb: args.algoWeb, provider }),
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
        ) => prepareTransferFTSignedTransaction({ body, testnet, algoWeb: args.algoWeb, provider }),
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
        ) => prepareBurnFTSignedTransaction({ body, testnet, algoWeb: args.algoWeb, provider }),
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
          const txData = await prepareCreateFTSignedTransaction({
            body,
            testnet,
            algoWeb: args.algoWeb,
            provider,
          })
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
          const txData = await prepareTransferFTSignedTransaction({
            body,
            testnet,
            algoWeb: args.algoWeb,
            provider,
          })
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
          const txData = await prepareBurnFTSignedTransaction({
            body,
            testnet,
            algoWeb: args.algoWeb,
            provider,
          })
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
        ) =>
          prepareCreateNFTSignedTransaction({
            body: body as MintNftAlgo,
            testnet,
            algoWeb: args.algoWeb,
            provider,
          }),
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
        ) => prepareTransferNFTSignedTransaction({ body, testnet, algoWeb: args.algoWeb, provider }),
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
        ) => prepareBurnNFTSignedTransaction({ body, testnet, algoWeb: args.algoWeb, provider }),
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
          const txData = await prepareCreateNFTSignedTransaction({
            body: body as MintNftAlgo,
            testnet,
            algoWeb: args.algoWeb,
            provider,
          })
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
          const txData = await prepareTransferNFTSignedTransaction({
            body,
            testnet,
            algoWeb: args.algoWeb,
            provider,
          })
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
          const txData = await prepareBurnNFTSignedTransaction({
            body,
            testnet,
            algoWeb: args.algoWeb,
            provider,
          })
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
          prepareSignedTransaction({ body, testnet, algoWeb: args.algoWeb, apiCalls, provider }),
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
              return ApiServices.virtualAccount.blockchain.algoTransfer(body as TransferAlgoKMS)
            } else {
              return ApiServices.blockchain.algo.algorandBlockchainTransfer(body as TransferAlgoBlockchainKMS)
            }
          }
          const txData = await prepareSignedTransaction({
            body,
            testnet,
            algoWeb: args.algoWeb,
            apiCalls,
            provider,
          })
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
      ): Promise<SendVirtualAccountTxResponse> => {
        if (isWithSignatureId(body as ApiTransferAlgoKMS)) {
          return ApiServices.virtualAccount.blockchain.algoTransfer(body as ApiTransferAlgoKMS)
        }

        const { fee, privateKey, ...withdrawal } = body as ApiTransferAlgo

        const { senderAccountId } = withdrawal
        const account = await AccountService.getAccountByAccountId(senderAccountId)
        let txData
        if (account.currency === Currency.ALGO) {
          txData = await prepareSignedTransaction({
            body: body as ApiTransferAlgo,
            testnet,
            algoWeb: args.algoWeb,
            apiCalls,
            provider,
          })
        } else {
          const vc = await ApiServices.ledger.virtualCurrency.getCurrency(account.currency)
          txData = await prepareTransferFTSignedTransaction({
            body: {
              from: algoWallet().generateAddressFromPrivatetKey(privateKey),
              fromPrivateKey: privateKey,
              to: body.address,
              amount: new BigNumber(body.amount).multipliedBy(10 ** (vc.precision || 0)).toString(),
              contractAddress: vc.erc20Address as string,
              fee: body.fee,
            } as ChainTransferAlgoErc20,
            testnet,
            algoWeb: args.algoWeb,
            provider,
          })
        }

        const { id } = await ApiServices.virtualAccount.withdrawal.storeWithdrawal({
          ...withdrawal,
          fee: new BigNumber(fee || '0.001').toString(),
        })

        try {
          return {
            ...(await ApiServices.virtualAccount.withdrawal.broadcastBlockchainTransaction({
              txData,
              withdrawalId: id,
              currency: Currency.ALGO,
            })),
            id,
          }
        } catch (_) {
          try {
            return await ApiServices.virtualAccount.withdrawal.cancelInProgressWithdrawal(id!)
          } catch (_) {
            return { id, completed: false }
          }
        }
      },
    },
  }
}

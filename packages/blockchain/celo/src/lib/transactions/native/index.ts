import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import {
  CELO_CONSTANTS,
  CeloTransactionConfig,
  celoUtils,
  ChainStoreDataCelo,
  ChainTransferCeloBlockchain,
  ChainTransferCeloOrCUsd,
} from '../../utils/celo.utils'
import { EvmBasedSdkError, evmBasedUtils } from '@tatumio/shared-blockchain-evm-based'
import { isHex, stringToHex, toHex } from 'web3-utils'
import { ApiServices, CreateRecordCelo, Currency, TransferCeloBlockchainKMS } from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

const transferSignedTransaction = async (
  body: ChainTransferCeloBlockchain,
  provider?: string,
  testnet?: boolean,
) => {
  // TODO
  // await validateBody(body, ChainTransferCeloBlockchain)

  const { fromPrivateKey, signatureId, to, fee, feeCurrency, amount, nonce, data } = body
  const celoProvider = celoUtils.getProvider(provider)

  if (to && amount) {
    const network = await celoProvider.ready
    // const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)

    const txBody = {
      chainId: network.chainId,
      // feeCurrency: feeCurrencyContractAddress,
      data,
      to: to.trim(),
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
      value: evmBasedUtils.amountToWeiHex(amount),
    }

    if (signatureId) {
      return JSON.stringify({
        ...txBody,
        nonce,
      })
    }

    const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)

    // await celoUtils.checkCeloBalance(wallet, amount)

    const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
      wallet,
    )

    const tx: CeloTransactionConfig = {
      ...txBody,
      from: from,
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
      nonce: nonce || txCount,
    }

    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new EvmBasedSdkError({ code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS })
}

const prepareStoreDataTransaction = async (
  body: ChainStoreDataCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, feeCurrency, nonce, data, fee, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready

  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      to: to?.trim(),
      data: data ? (isHex(data) ? stringToHex(data) : toHex(data)) : undefined,
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
      value: undefined,
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    to: to?.trim() || from,
    data: data ? (isHex(data) ? stringToHex(data) : toHex(data)) : undefined,
    gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
    gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
    value: undefined,
    from,
  }

  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const prepareCeloOrCUsdSignedTransaction = async (
  body: ChainTransferCeloOrCUsd,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, to, feeCurrency, nonce, data, amount, currency, fee, signatureId } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready

  const cUsdAddress = testnet ? CELO_CONSTANTS.CUSD_ADDRESS_TESTNET : CELO_CONSTANTS.CUSD_ADDRESS_MAINNET
  const cEurAddress = testnet ? CELO_CONSTANTS.CEUR_ADDRESS_TESTNET : CELO_CONSTANTS.CEUR_ADDRESS_MAINNET
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
  const value = `0x${new BigNumber(amount).multipliedBy(1e18).toString(16)}`

  let recipient: string
  switch (currency) {
    case Currency.CEUR:
      recipient = cEurAddress
      break
    case Currency.CUSD:
      recipient = cUsdAddress
      break
    default:
      recipient = to.trim()
  }

  const { contract } = await celoUtils.initErc20Contract(body, provider, testnet, cUsdAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      to: recipient,
      data: currency === Currency.CELO ? data : contract.methods.transfer(to.trim(), value).encodeABI(),
      gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
      gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
      value: currency === Currency.CELO ? value : undefined,
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)

  if (currency !== Currency.CELO) {
    await celoUtils.checkErc20Balance(contract, wallet, amount)
  } else {
    await celoUtils.checkCeloBalance(wallet, amount)
  }

  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const transaction: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    to: recipient,
    data: currency === Currency.CELO ? data : contract.methods.transfer(to.trim(), value).encodeABI(),
    gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
    gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice, gasPrice),
    value: currency === Currency.CELO ? value : undefined,
    from,
  }

  return celoUtils.prepareSignedTransactionAbstraction(wallet, transaction)
}

export const native = (args: { blockchain: EvmBasedBlockchain; broadcastFunction: BroadcastFunction }) => {
  return {
    prepare: {
      /**
       * Sign transfer of native asset transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (
        body: ChainTransferCeloBlockchain,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => transferSignedTransaction(body, provider, testnet),
          SdkErrorCode.EVM_NATIVE_CANNOT_PREPARE_TRANSFER_TX,
        ),
      /**
       * Sign store data transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      storeDataTransaction: async (body: ChainStoreDataCelo, provider?: string, testnet?: boolean) =>
        evmBasedUtils.tryCatch(
          () => prepareStoreDataTransaction(body, provider, testnet),
          SdkErrorCode.EVM_NATIVE_CANNOT_PREPARE_STORE_DATA_TX,
        ),
      /**
       * Sign store data transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      celoOrCUsdSignedTransaction: async (
        body: ChainTransferCeloOrCUsd,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => prepareCeloOrCUsdSignedTransaction(body, provider, testnet),
          SdkErrorCode.CELO_NATIVE_CANNOT_PREPARE_TRANSFER_CELO_OR_CUSD_TX,
        ),
    },
    send: {
      /**
       * Send transfer of native asset transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @param testnet
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (
        body: ChainTransferCeloBlockchain,
        provider?: string,
        testnet?: boolean,
      ) => {
        if (body.signatureId) {
          return ApiServices.blockchain.celo.celoBlockchainTransfer({
            ...body,
            currency: 'CELO',
          } as TransferCeloBlockchainKMS)
        }
        return args.broadcastFunction({
          txData: await transferSignedTransaction(body, provider, testnet),
        })
      },
      /**
       * Send store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      storeDataTransaction: async (body: ChainStoreDataCelo, provider?: string, testnet?: boolean) => {
        if (body.signatureId) {
          return ApiServices.record.storeLog(body as CreateRecordCelo)
        }
        return args.broadcastFunction({
          txData: await prepareStoreDataTransaction(body, provider, testnet),
        })
      },
      /**
       * Sign store data transaction with private keys locally. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @param testnet
       * @returns transaction id of the transaction in the blockchain
       */
      celoOrCUsdSignedTransaction: async (
        body: ChainTransferCeloOrCUsd,
        provider?: string,
        testnet?: boolean,
      ) => {
        if (body.signatureId) {
          return ApiServices.blockchain.celo.celoBlockchainTransfer(body as TransferCeloBlockchainKMS)
        }
        return args.broadcastFunction({
          txData: await prepareCeloOrCUsdSignedTransaction(body, provider, testnet),
        })
      },
    },
  }
}

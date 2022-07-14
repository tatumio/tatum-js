import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { EvmBasedBlockchain, TRANSFER_METHOD_ABI } from '@tatumio/shared-core'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import Web3 from 'web3'
import {
  celoUtils,
  CeloTransactionConfig,
  ChainTransferCeloBlockchain,
  ChainStoreDataCelo,
  CELO_CONSTANTS,
  ChainTransferCeloOrCUsd,
} from '../../utils/celo.utils'
import { Erc20Token } from '@tatumio/shared-blockchain-evm-based'
import { isHex, stringToHex, toHex, toWei } from 'web3-utils'
import { Currency } from '@tatumio/api-client'

const transferSignedTransaction = async (
  body: ChainTransferCeloBlockchain,
  provider?: string,
  testnet?: boolean,
) => {
  // TODO
  // await validateBody(body, ChainTransferCeloBlockchain)

  const { fromPrivateKey, signatureId, to, feeCurrency, amount, nonce } = body
  const celoProvider = celoUtils.getProvider(provider)

  if (to && feeCurrency && amount) {
    const network = await celoProvider.ready
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const contract = new new Web3().eth.Contract(Erc20Token.abi as any, to.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        to: to.trim(),
        data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).toString(16)}`).encodeABI(),
      })
    }

    const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
    const { txCount, from } = await celoUtils.obtainWalletInformation(wallet, feeCurrencyContractAddress)

    const tx: CeloTransactionConfig = {
      chainId: network.chainId,
      from: from,
      to: to.trim(),
      data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).toString(16)}`).encodeABI(),
      value: `0x${new BigNumber(amount).toString(16)}`,
      nonce: nonce || txCount,
      feeCurrency: feeCurrencyContractAddress,
    }

    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new Error('The target (to) address, currency, feeCurrency or the amount cannot be empty')
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
      gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
      gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : undefined,
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
    gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
    gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice,
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

  // TODO: remove ts-ignore
  // @ts-ignore
  const contract = new new Web3().eth.Contract([TRANSFER_METHOD_ABI], cUsdAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      to: recipient,
      data: currency === Currency.CELO ? data : contract.methods.transfer(to.trim(), value).encodeABI(),
      gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
      gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : undefined,
      value: currency === Currency.CELO ? value : undefined,
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
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
    gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
    gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice,
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
      ) => transferSignedTransaction(body, provider, testnet),
      /**
       * Sign store data transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      storeDataTransaction: async (body: ChainStoreDataCelo, provider?: string, testnet?: boolean) =>
        prepareStoreDataTransaction(body, provider, testnet),
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
      ) => prepareCeloOrCUsdSignedTransaction(body, provider, testnet),
    },
    send: {
      /**
       * Send transfer of native asset transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (
        body: ChainTransferCeloBlockchain,
        provider?: string,
        testnet?: boolean,
      ) =>
        args.broadcastFunction({
          txData: await transferSignedTransaction(body, provider, testnet),
          signatureId: body.signatureId,
        }),
      /**
       * Send store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      storeDataTransaction: async (body: ChainStoreDataCelo, provider?: string, testnet?: boolean) =>
        args.broadcastFunction({
          txData: await prepareStoreDataTransaction(body, provider, testnet),
          signatureId: body.signatureId,
        }),
      /**
       * Sign store data transaction with private keys locally. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      celoOrCUsdSignedTransaction: async (
        body: ChainTransferCeloOrCUsd,
        provider?: string,
        testnet?: boolean,
      ) =>
        args.broadcastFunction({
          txData: await prepareCeloOrCUsdSignedTransaction(body, provider, testnet),
          signatureId: body.signatureId,
        }),
    },
  }
}

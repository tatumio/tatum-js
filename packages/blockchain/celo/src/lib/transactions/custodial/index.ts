import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import {
  BroadcastFunction,
  ChainApproveCustodialTransfer,
  ChainBatchTransferCustodialWallet,
  ChainGenerateCustodialWalletBatch,
  ChainTransferCustodialWallet,
} from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { evmBasedCustodial, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { CeloTransactionConfig, celoUtils, ChainGenerateCustodialAddressCelo } from '../../utils/celo.utils'
import Web3 from 'web3'
import { custodial as evmCustodial } from '@tatumio/shared-blockchain-evm-based'

const generateCustodialWallet = async (
  body: ChainGenerateCustodialAddressCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready
  const feeCurrency = body.feeCurrency || 'CELO'
  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)

  const custodialService = evmBasedCustodial()

  const { abi, bytecode } = custodialService.obtainCustodialAddressType(body)
  // @ts-ignore
  const contract = new new Web3().eth.Contract(abi)
  const deploy = contract.deploy({
    data: bytecode,
  })

  if ('signatureId' in body) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce: body.nonce,
      gasLimit: '0',
      data: deploy.encodeABI(),
    })
  }

  const wallet = new CeloWallet(body.fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )
  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    gasLimit: '0',
    gasPrice,
    data: deploy.encodeABI(),
    nonce: body.nonce || txCount,
    from,
  }

  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

export const custodial = (args: {
  blockchain: EvmBasedBlockchain
  broadcastFunction: BroadcastFunction
  web3: EvmBasedWeb3
}) => {
  const evmCustodialService = evmCustodial({
    blockchain: args.blockchain,
    web3: args.web3,
    broadcastFunction: args.broadcastFunction,
  })
  return {
    prepare: {
      /**
       * Sign generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      generateCustodialWalletSignedTransaction: async (
        body: ChainGenerateCustodialAddressCelo,
        provider?: string,
        testnet?: boolean,
      ) => generateCustodialWallet(body, provider, testnet),
      /**
       * Prepare signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: async (
        body: ChainTransferCustodialWallet,
        testnet: boolean,
        provider: string,
      ) => evmCustodialService.prepare.transferFromCustodialWallet(body, testnet, provider),
      /**
       * Prepare signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        body: ChainBatchTransferCustodialWallet,
        testnet: boolean,
        provider?: string,
      ) => evmCustodialService.prepare.batchTransferFromCustodialWallet(body, testnet, provider),
      /**
       * Prepare signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider?: string) =>
        evmCustodialService.prepare.approveFromCustodialWallet(body, provider),
      /**
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWalletBatch: async (
        body: ChainGenerateCustodialWalletBatch,
        testnet: boolean,
        provider?: string,
      ) => evmCustodialService.prepare.custodialWalletBatch(body, testnet, provider),
    },
    send: {
      /**
       * Send generate custodial wallet address transaction with private keys to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      generateCustodialWalletSignedTransaction: async (
        body: ChainGenerateCustodialAddressCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        args.broadcastFunction({
          txData: await generateCustodialWallet(body, provider, testnet),
          signatureId: 'signatureId' in body ? body.signatureId : undefined,
        }),
      /**
       * Send signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: async (
        body: ChainTransferCustodialWallet,
        testnet: boolean,
        provider: string,
      ) => await evmCustodialService.send.transferFromCustodialWallet(body, testnet, provider),
      /**
       * Send signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        body: ChainBatchTransferCustodialWallet,
        testnet: boolean,
        provider: string,
      ) => await evmCustodialService.send.batchTransferFromCustodialWallet(body, testnet, provider),
      /**
       * Send signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider: string) =>
        await evmCustodialService.send.approveFromCustodialWallet(body, provider),
      /**
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWalletBatch: async (
        body: ChainGenerateCustodialWalletBatch,
        testnet: boolean,
        provider: string,
      ) => await evmCustodialService.send.custodialWalletBatch(body, testnet, provider),
    },
  }
}

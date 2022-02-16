import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import {
  BroadcastFunction,
  ChainApproveCustodialTransfer,
  ChainBatchTransferCustodialWallet,
  ChainGenerateCustodialWalletBatch,
  ChainTransferCustodialWallet,
} from '@tatumio/shared-blockchain-abstract'
import { CUSTODIAL_PROXY_ABI, EvmBasedBlockchain } from '@tatumio/shared-core'
import {
  CustodialFullTokenWallet,
  evmBasedCustodial,
  evmBasedSmartContract,
  evmBasedUtils,
  EvmBasedWeb3,
  smartContractWriteMethodInvocation,
} from '@tatumio/shared-blockchain-evm-based'
import { CeloTransactionConfig, celoUtils, ChainGenerateCustodialAddressCelo } from '../../utils/celo.utils'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { GenerateCustodialWalletBatch } from '@tatumio/api-client'

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

const transferFromCustodialWallet = async (
  body: ChainTransferCustodialWallet,
  web3: EvmBasedWeb3,
  testnet?: boolean,
  provider?: string,
) => {
  return evmBasedCustodial().prepareTransferFromCustodialWalletAbstract(
    body,
    web3,
    evmBasedUtils.decimals,
    smartContractWriteMethodInvocation,
    18,
    testnet,
    provider,
  )
}

const batchTransferFromCustodialWallet = async (
  body: ChainBatchTransferCustodialWallet,
  web3: EvmBasedWeb3,
  testnet: boolean,
  provider?: string,
) => {
  return evmBasedCustodial().prepareBatchTransferFromCustodialWalletAbstract(
    body,
    web3,
    evmBasedUtils.decimals,
    smartContractWriteMethodInvocation,
    18,
    testnet,
    provider,
  )
}

const getCustodialFactoryContractAddress = (testnet: boolean) => {
  return testnet ? '0x6709Bdda623aF7EB152cB2fE2562aB7e031e564f' : '0x1cfc7878Cf6Ae32A50F84481690F6fB04574de21'
}

const approveFromCustodialWallet = async (
  body: ChainApproveCustodialTransfer,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  // ContractType FUNGIBLE_TOKEN = 0
  const decimals =
    body.contractType === 0 ? await evmBasedUtils.decimals(body.tokenAddress!, web3, provider) : 0
  const params = [
    body.tokenAddress!.trim(),
    body.contractType,
    body.spender,
    `0x${new BigNumber(body.amount || 0).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
    `0x${new BigNumber(body.tokenId || 0).toString(16)}`,
  ]
  delete body.amount

  return await evmBasedSmartContract(web3).helperPrepareSCCall(
    {
      ...body,
      contractAddress: body.custodialAddress,
    } as ChainApproveCustodialTransfer & { contractAddress: string },
    'approve',
    params,
    provider,
    CustodialFullTokenWallet.abi,
  )
}

const custodialWalletBatch = async (
  body: ChainGenerateCustodialWalletBatch,
  web3: EvmBasedWeb3,
  testnet: boolean,
  provider?: string,
) => {
  const { params, methodName, bodyWithContractAddress } =
    await evmBasedCustodial().prepareCustodialWalletBatchAbstract(
      body,
      web3,
      getCustodialFactoryContractAddress,
      testnet,
    )
  return await evmBasedSmartContract(web3).helperPrepareSCCall(
    bodyWithContractAddress,
    methodName,
    params,
    provider,
    [CUSTODIAL_PROXY_ABI],
  )
}
export const custodial = (args: {
  blockchain: EvmBasedBlockchain
  broadcastFunction: BroadcastFunction
  web3?: EvmBasedWeb3
}) => {
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
      ) => transferFromCustodialWallet(body, args.web3!, testnet, provider),
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
      ) => batchTransferFromCustodialWallet(body, args.web3!, testnet, provider),
      /**
       * Prepare signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider?: string) =>
        approveFromCustodialWallet(body, args.web3!, provider),
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
      ) => custodialWalletBatch(body, args.web3!, testnet, provider),
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
      ) =>
        args.broadcastFunction({
          txData: await transferFromCustodialWallet(body, args.web3!, testnet, provider),
          signatureId: body.signatureId,
        }),

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
      ) =>
        args.broadcastFunction({
          txData: await batchTransferFromCustodialWallet(body, args.web3!, testnet, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider: string) =>
        args.broadcastFunction({
          txData: await approveFromCustodialWallet(body, args.web3!, provider),
          signatureId: body.signatureId,
        }),
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
      ) =>
        args.broadcastFunction({
          txData: await custodialWalletBatch(body, args.web3!, testnet, provider),
          signatureId: 'signatureId' in body ? body.signatureId : undefined,
        }),
    },
  }
}

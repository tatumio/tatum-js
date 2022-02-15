import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { evmBasedCustodial } from '@tatumio/shared-blockchain-evm-based'

import { CeloTransactionConfig, celoUtils, ChainGenerateCustodialAddressCelo } from '../../utils/celo.utils'
import Web3 from 'web3'

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

export const custodial = (args: { blockchain: EvmBasedBlockchain; broadcastFunction: BroadcastFunction }) => {
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
    },
  }
}

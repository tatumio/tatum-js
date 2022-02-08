import { BroadcastFunction, ChainGenerateCustodialAddress } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { TransactionConfig } from 'web3-core'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedCustodial } from '../../services/evm-based.custodial'
import { evmBasedUtils } from '../../evm-based.utils'

const generateCustodialWallet = async (
  body: ChainGenerateCustodialAddress,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const client = web3.getClient(provider)
  const custodialService = evmBasedCustodial()

  const { abi, bytecode } = custodialService.obtainCustodialAddressType(body)
  // @ts-ignore
  const contract = new client.eth.Contract(abi)
  const deploy = contract.deploy({
    data: bytecode,
  })
  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce: body.nonce,
  }
  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee.gasLimit,
    body.fee.gasPrice,
  )
}

export const custodial = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
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
        body: ChainGenerateCustodialAddress,
        provider?: string,
      ) => generateCustodialWallet(body, args.web3, provider),
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
        body: ChainGenerateCustodialAddress,
        provider?: string,
      ) =>
        args.broadcastFunction({
          txData: await generateCustodialWallet(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
    },
  }
}

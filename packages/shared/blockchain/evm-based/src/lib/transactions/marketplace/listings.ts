import { GenerateMarketplace } from '@tatumio/api-client'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { TransactionConfig } from 'web3-core'
import { prepareSignedTransactionAbstraction } from '..'
import { ListingSmartContract } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'

const deploySignedTransaction = async (body: GenerateMarketplace, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  // TODO: remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any)
    .deploy({
      arguments: [body.marketplaceFee, body.feeRecipient],
      data: ListingSmartContract.bytecode,
    })
    .encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    data,
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(client, tx, undefined, body.fromPrivateKey, web3, body.fee.gasLimit, body.fee.gasPrice)
}

export const listing = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      deploySignedTransaction: async (body: GenerateMarketplace, provider?: string) =>
        deploySignedTransaction(body, args.web3, provider),
    },
    send: {
      deploySignedTransaction: async (body: GenerateMarketplace, provider?: string) =>
        args.broadcastFunction({
          txData: await deploySignedTransaction(body, args.web3, provider),
        })
    }
  }
}
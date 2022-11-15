import { Blockchain } from '@tatumio/shared-core'
import { flowTxService } from './flow.tx'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { FlowTxType } from '../flow.constants'
import { PendingTransaction, TransactionHash } from '@tatumio/api-client'
import { flowBlockchain } from './flow.blockchain'
import { flowProvider } from './flow.provider'
import { FlowSDKArguments } from '../flow.sdk'

type TransactionHashPromise = Promise<{ txId: string; address: string } | { txId: string }>

export const flowKmsService = (args: FlowSDKArguments & { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: PendingTransaction, fromPrivateKeys: string[]): TransactionHashPromise {
      const txWithChain = { ...tx, chain: Blockchain.FLOW }

      const { type, body }: { type: FlowTxType; apiManagedProposal: boolean; body: any } = JSON.parse(
        txWithChain.serializedTransaction,
      )
      const provider = flowProvider({ ...args })
      const flowBlockchainCalls = flowBlockchain(args)
      const txService = flowTxService(provider, { ...flowBlockchainCalls })
      switch (type) {
        case FlowTxType.CREATE_ACCOUNT:
          return (await txService.account.send.createSignedTransaction({
            publicKey: body.publicKey,
            account: body.account,
            privateKey: fromPrivateKeys[0],
          })) as TransactionHashPromise
        case FlowTxType.ADD_PK_TO_ACCOUNT:
          return (await txService.account.send.publicKeySignedTransaction({
            publicKey: body.publicKey,
            account: body.account,
            privateKey: fromPrivateKeys[0],
          })) as TransactionHash
        case FlowTxType.TRANSFER:
          return (await txService.native.send.transferSignedTransaction({
            ...body,
            privateKey: fromPrivateKeys[0],
          })) as TransactionHash
        case FlowTxType.TRANSFER_NFT:
          return (await txService.nft.send.transferSignedTransaction({
            ...body,
            privateKey: fromPrivateKeys[0],
          })) as TransactionHash
        case FlowTxType.MINT_NFT:
          return (await txService.nft.send.mintSignedTransaction({
            ...body,
            privateKey: fromPrivateKeys[0],
          })) as TransactionHash
        case FlowTxType.MINT_MULTIPLE_NFT:
          return (await txService.nft.send.mintMultipleSignedTransaction({
            ...body,
            privateKey: fromPrivateKeys[0],
          })) as TransactionHash
        case FlowTxType.BURN_NFT:
          return (await txService.nft.send.burnSignedTransaction({
            ...body,
            privateKey: fromPrivateKeys[0],
          })) as TransactionHash
        default:
          return (await txService.native.send.customSignedTransaction({
            ...body,
            privateKey: fromPrivateKeys[0],
          })) as TransactionHash
      }
    },
  }
}

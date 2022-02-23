import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { flowTxService } from './flow.tx'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { FlowTxType } from '../flow.constants'

export const flowKmsService = (args: { apiKey: string; blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(
      tx: ChainTransactionKMS,
      fromPrivateKeys: string[],
      testnet: boolean,
    ): Promise<{ txId: string; address: string } | { txId: string }> {
      const txWithChain = { ...tx, chain: Blockchain.FLOW }

      const { type, body }: { type: FlowTxType; apiManagedProposal: boolean; body: any } = JSON.parse(
        txWithChain.serializedTransaction,
      )
      const txService = flowTxService(args)
      switch (type) {
        case FlowTxType.CREATE_ACCOUNT:
          return txService.createAccountFromPublicKey(
            testnet,
            body.publicKey,
            body.account,
            fromPrivateKeys[0],
          )
        case FlowTxType.ADD_PK_TO_ACCOUNT:
          return txService.addPublicKeyToAccount(testnet, body.publicKey, body.account, fromPrivateKeys[0])
        case FlowTxType.TRANSFER:
          return txService.sendTransaction(testnet, { ...body, privateKey: fromPrivateKeys[0] })
        case FlowTxType.TRANSFER_NFT:
          return txService.sendNftTransferToken(testnet, {
            ...body,
            privateKey: fromPrivateKeys[0],
          })
        case FlowTxType.MINT_NFT:
          return txService.sendNftMintToken(testnet, { ...body, privateKey: fromPrivateKeys[0] })
        case FlowTxType.MINT_MULTIPLE_NFT:
          return txService.sendNftMintMultipleToken(testnet, {
            ...body,
            privateKey: fromPrivateKeys[0],
          })
        case FlowTxType.BURN_NFT:
          return txService.sendNftBurnToken(testnet, { ...body, privateKey: fromPrivateKeys[0] })
        default:
          return txService.sendCustomTransaction(testnet, {
            ...body,
            privateKey: fromPrivateKeys[0],
          })
      }
    },
  }
}

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

export interface TransactionKMS {
  id: string
  chain: Blockchain
  serializedTransaction: string
  hashes: string[]
  txId?: string
  withdrawalId?: string
  index?: number
  withdrawalResponses?: WithdrawalResponseData[]
}

export interface WithdrawalResponseData {
  /**
   *
   * @type {Address}
   * @memberof WithdrawalResponseData
   */
  address: Address
  /**
   * Amount of unprocessed transaction outputs, that can be used for withdrawal. Bitcoin, Litecoin, Bitcoin Cash only.
   * @type {number}
   * @memberof WithdrawalResponseData
   */
  amount: number
  /**
   * Last used unprocessed transaction output, that can be used.
   * Bitcoin, Litecoin, Bitcoin Cash only. If -1, it indicates prepared vOut with amount to be transferred to pool address.
   * @type {string}
   * @memberof WithdrawalResponseData
   */
  vIn: string
  /**
   * Index of last used unprocessed transaction output in raw transaction, that can be used. Bitcoin, Litecoin, Bitcoin Cash only.
   * @type {number}
   * @memberof WithdrawalResponseData
   */
  vInIndex: number
  /**
   * Script of last unprocessed UTXO. Bitcoin SV only.
   * @type {string}
   * @memberof WithdrawalResponseData
   */
  scriptPubKey: string
}

export interface Address {
  /**
   * Blockchain address.
   * @type {string}
   * @memberof Address
   */
  address: string
  /**
   * Currency of generated address. BTC, LTC, BCH, ETH, XRP, ERC20.
   * @type {string}
   * @memberof Address
   */
  currency: string
  /**
   * Derivation key index for given address.
   * @type {number}
   * @memberof Address
   */
  derivationKey?: number
  /**
   * Extended public key to derive address from. In case of XRP, this is account address,
   * since address is defined as DestinationTag, which is address field. In case of XLM, this is account address, since address is defined as message, which is address field.
   * @type {string}
   * @memberof Address
   */
  xpub?: string
  /**
   * In case of XRP, destinationTag is the distinguisher of the account.
   * @type {number}
   * @memberof Address
   */
  destinatinTag?: number
  /**
   * In case of XLM, message is the distinguisher of the account.
   * @type {string}
   * @memberof Address
   */
  message?: string
}

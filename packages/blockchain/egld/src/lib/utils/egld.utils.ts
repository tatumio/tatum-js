import { Blockchain, Currency, Fee, httpHelper, PrivateKeyOrSignatureId } from '@tatumio/shared-core'
import { TransactionConfig } from 'web3-core'
import { BlockchainElrondNetworkEgldService, TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { BigNumber } from 'bignumber.js'
import {
  Transaction,
  GasPrice,
  GasLimit,
  TransactionPayload,
  ChainID,
  TransactionVersion,
} from '@elrondnetwork/erdjs'
import { Address, Balance, Nonce, UserSecretKey, UserSigner } from '@elrondnetwork/erdjs/out'
import { egldWallet } from '../services/egld.wallet'

export const ESDT_SYSTEM_SMART_CONTRACT_ADDRESS =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u'

export const egldUtils = (xApiKey: string) => {
  const ELROND_V3_ENDPOINT = () => `${process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL}/v3/egld/node`

  /**
   * Get Elrond network config
   */
  const getNetworkConfig = async () => {
    const gasStationUrl = getClient()
    const { data } = await httpHelper.get(`${gasStationUrl}/${xApiKey}/network/config`)
    return data
  }

  /**
   * Returns EGLD server to connect to.
   * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
   * @param fromPrivateKey optional private key of sender account
   */
  const getClient = (provider?: string) => {
    const client = provider || ELROND_V3_ENDPOINT()
    return client
  }

  /**
   * Estimate Gas limit for the transaction.
   */
  const getGasLimit = async (tx: EgldBasicTransaction): Promise<number> => {
    const gasStationUrl = getClient()
    const { data } = await httpHelper.post(
      `${gasStationUrl}/${process.env.TATUM_API_KEY}/transaction/cost`,
      tx,
    )
    const gas = data?.data?.txGasUnits
    if (gas) {
      return gas
    }
    throw Error(data?.data?.returnMessage || 'egld.gasLimit.error')
  }
  /**
   * Estimate Gas price for the transaction.
   */
  const getGasPrice = async (): Promise<number> => {
    const { data } = await getNetworkConfig()
    const price = data?.config?.erd_min_gas_price
    if (price) {
      return price
    }
    throw Error(data?.data?.returnMessage || 'egld.gasPrice.error')
  }
  const signTransaction = async (tx: Transaction, fromPrivateKey: string): Promise<string> => {
    const fromAddrSigner = new UserSigner(UserSecretKey.fromString(fromPrivateKey))
    await fromAddrSigner.sign(tx)
    return JSON.stringify(tx.toSendable())
  }

  /**
   * Sign transaction abstraction. Nothing is broadcast to the blockchain.
   * @param transaction content of the transaction to broadcast
   * @param signatureId signature ID
   * @param fromPrivateKey private key
   * @param fee Fee object
   * @returns transaction data to be broadcast to blockchain.
   */
  const prepareSignedTransactionAbstraction = async (
    transaction: TransactionConfig,
    signatureId: string | undefined,
    fromPrivateKey: string | undefined,
  ): Promise<string> => {
    const sender =
      (transaction.from as string) || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    console.log('work0')
    const { data } = await BlockchainElrondNetworkEgldService.egldNodeGet(xApiKey)
    console.log('data', data)
    const { config } = data
    const gasPrice = (transaction.gasPrice ? transaction.gasPrice : config?.erd_min_gas_price) || 1000000000
    console.log('work1')
    const nonce = await BlockchainElrondNetworkEgldService.egldGetTransactionCount(sender as string)
    console.log('work2')

    const egldTx: EgldSendTransaction = {
      nonce,
      value: new BigNumber(transaction.value as string).isLessThan(0)
        ? '0'
        : new BigNumber(transaction.value as string).multipliedBy(1e18).toString(),
      receiver: transaction.to as string,
      sender,
      gasPrice,
      gasLimit: 0,
      data: transaction.data ? Buffer.from(transaction.data as string).toString('base64') : undefined,
      chainID: config.erd_chain_id,
      version: config.erd_min_transaction_version,
    }

    const gasLimit = transaction.gas || (await getGasLimit(egldTx))
    egldTx.gasLimit = new BigNumber(gasLimit).toNumber()

    if (signatureId) {
      return JSON.stringify({
        from: sender,
        to: transaction.to as string,
        value: transaction.value as string,
        data: transaction.data,
        gasPrice,
        gasLimit,
      })
    }
    const erdjsTransaction = new Transaction({
      nonce: new Nonce(egldTx.nonce),
      value: Balance.fromString(egldTx.value),
      receiver: new Address(egldTx.receiver),
      sender: new Address(egldTx.sender),
      gasPrice: new GasPrice(egldTx.gasPrice),
      gasLimit: new GasLimit(egldTx.gasLimit),
      data: transaction.data ? new TransactionPayload(transaction.data) : undefined,
      chainID: new ChainID(egldTx.chainID),
      version: new TransactionVersion(egldTx.version),
    })

    return await signTransaction(erdjsTransaction, fromPrivateKey as string)
  }
  /**
   * Sign EGLD transaction with private keys locally. Nothing is broadcast to the blockchain.
   * @param body content of the transaction to broadcast
   * @returns transaction data to be broadcast to blockchain.
   */
  const prepareSignedTransaction = async (body: EgldEsdtTransaction) => {
    const { fromPrivateKey, signatureId, from, to, amount, fee, data } = body

    const tx: TransactionConfig = {
      from: from || 0,
      to: to,
      value: amount,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data,
    }

    return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  return {
    prepareSignedTransaction,
    prepareSignedTransactionAbstraction,
    getNetworkConfig,
    getClient,
    getGasLimit,
    getGasPrice,
  }
}

export interface CreateRecord {
  fromPrivateKey: string
  signatureId?: string
  data: string
  chain: Blockchain
  feeCurrency?: Currency
  from: string
  to?: string
  key: string
  nonce?: number
  ethFee?: Fee
  fromShardID?: number
  toShardID?: number
}

export type ChainCreateRecord = Omit<CreateRecord, 'chain'>

export interface EgldBasicTransaction {
  nonce: number
  value: string
  receiver: string
  sender: string
  data?: string
  chainID: string
  version: number
}

export interface EgldEsdtTransaction extends PrivateKeyOrSignatureId {
  to?: string
  from?: string
  amount?: string
  fee?: Fee
  data?: any
}

export interface EgldSendTransaction extends EgldBasicTransaction {
  gasPrice: number
  gasLimit: number
  signature?: string
}

export interface EsdtAddOrBurnNftQuantity extends EsdtToken {
  nonce: number
  quantity: number
}

export interface EsdtControlChanges extends EsdtToken {
  properties?: EsdtProperties
}

export interface EsdtCreateNftOrSft extends EsdtToken {
  nftName: string
  quantity: number
  royalties: number
  hash: string
  attributes: string
  uri: string[]
}

export interface EsdtFreezeOrWipeNft extends EsdtToken {
  nonce: number
  account: string
}

export interface EsdtFreezeOrWipeOrOwnership extends EsdtToken {
  account: string
}

export interface EsdtProperties {
  canFreeze?: boolean
  canWipe?: boolean
  canPause?: boolean
  canMint?: boolean
  canBurn?: boolean
  canChangeOwner?: boolean
  canUpgrade?: boolean
  canAddSpecialRoles?: boolean
}

export interface EsdtIssue extends EsdtToken {
  name: string
  symbol: string
  supply: number
  digits: number
  properties?: EsdtProperties
}

export interface EsdtPropertiesNftOrSft {
  canFreeze?: boolean
  canWipe?: boolean
  canPause?: boolean
  canTransferNFTCreateRole?: boolean
}

export interface EsdtIssueNftOrSft extends EsdtToken {
  name: string
  symbol: string
  properties?: EsdtPropertiesNftOrSft
}

export interface EsdtMint extends EsdtToken {
  supply: number
}

export interface EsdtSpecialRole extends EsdtToken {
  account: string
  role: string[]
}

export enum EgldServiceType {
  issue = 'issue',
  issueNonFungible = 'issueNonFungible',
  issueSemiFungible = 'issueSemiFungible',
  ESDTNFTCreate = 'ESDTNFTCreate',
  stopNFTCreate = 'stopNFTCreate',
  ESDTTransfer = 'ESDTTransfer',
  localMint = 'localMint',
  localBurn = 'localBurn',
  pause = 'pause',
  unPause = 'unPause',
  freeze = 'freeze',
  unFreeze = 'unFreeze',
  wipe = 'wipe',
  setSpecialRole = 'setSpecialRole',
  unSetSpecialRole = 'unSetSpecialRole',
  transferOwnership = 'transferOwnership',
  controlChanges = 'controlChanges',
  transferNFTCreateRole = 'transferNFTCreateRole',
  ESDTNFTAddQuantity = 'ESDTNFTAddQuantity',
  ESDTNFTBurn = 'ESDTNFTBurn',
  freezeSingleNFT = 'freezeSingleNFT',
  wipeSingleNFT = 'wipeSingleNFT',
  unFreezeSingleNFT = 'unFreezeSingleNFT',
  ESDTNFTTransfer = 'ESDTNFTTransfer',
}

export interface EsdtToken {
  service?: string
  tokenId?: string
}

export interface EsdtTransfer extends EsdtToken {
  value: number
  methodName: string
  arguments?: (number | string)[]
}

export interface EsdtTransferNft extends EsdtToken {
  nonce: number
  quantity: number
  to: string
  methodName: string
  arguments?: (number | string)[]
}

export interface EsdtTransferNftCreateRole extends EsdtToken {
  from: string
  to: string
}

export interface EgldNetworkConfigResponse {
  code: string
  data: {
    config: {
      erd_chain_id: string
      erd_denomination: number
      erd_gas_per_data_byte: number
      erd_gas_price_modifier: string
      erd_latest_tag_software_version: string
      erd_max_gas_per_transaction: number
      erd_meta_consensus_group_size: number
      erd_min_gas_limit: number
      erd_min_gas_price: number
      erd_min_transaction_version: number
      erd_num_metachain_nodes: number
      erd_num_nodes_in_shard: number
      erd_num_shards_without_meta: number
      erd_rewards_top_up_gradient_point: string
      erd_round_duration: number
      erd_rounds_per_epoch: number
      erd_shard_consensus_group_size: number
      erd_start_time: number
      erd_top_up_factor: string
    }
  }
  error: ''
}

export interface EgldTransferOffchain extends EgldSendTransaction {
  mnemonic?: string
  index?: number
  fromPrivateKey?: string
  from?: string
  signatureId?: string
}

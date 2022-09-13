import { BigNumber } from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import {
  UserSigner,
  UserSecretKey,
  Transaction,
  Nonce,
  Balance,
  ChainID,
  GasLimit,
  GasPrice,
  TransactionPayload,
  TransactionVersion,
  Address,
} from '@elrondnetwork/erdjs'
import { broadcast, getTransactionsCount } from '../blockchain'
import {
  axios,
  validateBody,
  TATUM_API_URL,
  CreateRecord,
  Currency,
  TransactionKMS,
  ChainTransactionKMS,
  ChainCreateRecord,
} from '@tatumio/tatum-core'
import { ESDT_SYSTEM_SMART_CONTRACT_ADDRESS } from '../constants'
import {
  EgldEsdtTransaction,
  EgldBasicTransaction,
  EgldSendTransaction,
  EsdtAddOrBurnNftQuantity,
  EsdtControlChanges,
  EsdtCreateNftOrSft,
  EsdtFreezeOrWipeNft,
  EsdtFreezeOrWipeOrOwnership,
  EsdtIssue,
  EsdtIssueNftOrSft,
  EsdtMint,
  EsdtSpecialRole,
  EsdtToken,
  EsdtTransfer,
  EsdtTransferNft,
  EsdtTransferNftCreateRole,
} from '../model'
import { generateAddressFromPrivatekey } from '../wallet/address'

const ELROND_V3_ENDPOINT = () => `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/egld/node`

/**
 * Get Elrond network config
 */
export const getConfig = async () => {
  const gasStationUrl = await getClient()
  // try {
  const { data } = await axios.get(`${gasStationUrl}/${process.env.TATUM_API_KEY}/network/config`)
  return data
  // } catch (e) {
  //     console.error(e)
  // }
  // return null
}

/**
 * Estimate Gas price for the transaction.
 */
export const getGasPrice = async (): Promise<number> => {
  const { data } = await getConfig()
  const price = data?.config?.erd_min_gas_price
  if (price) {
    return price
  }
  throw Error(data?.data?.returnMessage || 'egld.gasPrice.error')
}

/**
 * Estimate Gas limit for the transaction.
 */
export const getGasLimit = async (tx: EgldBasicTransaction): Promise<number> => {
  const gasStationUrl = await getClient()
  const { data } = await axios.post(`${gasStationUrl}/${process.env.TATUM_API_KEY}/transaction/cost`, tx)
  const gas = data?.data?.txGasUnits
  if (gas) {
    return gas
  }
  throw Error(data?.data?.returnMessage || 'egld.gasLimit.error')
}

/**
 * Sign transaction
 */
export const signTransaction = async (tx: Transaction, fromPrivateKey: string): Promise<string> => {
  const fromAddrSigner = new UserSigner(UserSecretKey.fromString(fromPrivateKey))
  fromAddrSigner.sign(tx)
  return JSON.stringify(tx.toSendable())
}

/**
 * Returns EGLD server to connect to.
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @param fromPrivateKey optional private key of sender account
 */
export const getClient = (provider?: string) => {
  const client = provider || ELROND_V3_ENDPOINT()
  return client
}

/**
 * Sign EGLD pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string) => {
  ;(tx as TransactionKMS).chain = Currency.EGLD
  const transaction = JSON.parse(tx.serializedTransaction)
  return await prepareSignedTransactionAbstraction(transaction, undefined, fromPrivateKey)
}

/**
 * Sign EGLD Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStoreDataTransaction = async (body: ChainCreateRecord) => {
  ;(body as CreateRecord).chain = Currency.EGLD
  await validateBody(body, CreateRecord)
  const { fromPrivateKey, signatureId, from, data } = body
  const address = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))
  if (!address) {
    throw new Error('Recipient must be provided.')
  }

  const tx: TransactionConfig = {
    from: from || 0,
    to: address,
    value: '0',
    data,
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Encode number for ESDT transaction
 * @param n number or BigNumber
 * @returns n as hex encoded string with an even number of characters
 */
const encodeNumber = (n: number | BigNumber): string => {
  const bn = new BigNumber(n)
  if (bn.isNaN()) {
    return ''
  }
  const result = bn.toString(16).toLowerCase()

  return `${(result.length % 2 ? '0' : '') + result}`
}

/**
 * Prepare properties for ESDT Issue transaction
 * @param props content of the data transaction
 * @returns props as encoded string
 */
const prepareProperties = (props: any): string => {
  if (!props) {
    return ''
  }
  const keys = Object.keys(props)
  // const asHexTrue = '0x01'
  // const asHexFalse = '0x'
  const asHexTrue = Buffer.from('true').toString('hex')
  const asHexFalse = Buffer.from('false').toString('hex')
  let result = ''
  for (const k of keys) {
    result += `@${Buffer.from(k).toString('hex')}@${props[k] ? asHexTrue : asHexFalse}`
  }
  return result
}

/**
 * Prepare data for ESDT transactions
 * @param data content of the data
 * @returns data as string
 */
const prepareEsdtIssuanceData = async (data: EsdtIssue): Promise<string> => {
  await validateBody(data, EsdtIssue)

  const tokenName = Buffer.from(data.name).toString('hex')
  const tokenTicker = Buffer.from(data.symbol).toString('hex')
  const initialSupply = encodeNumber(data.supply)
  const decimals = encodeNumber(data.digits)
  const properties = prepareProperties(
    data.properties || {
      canAddSpecialRoles: true,
      canChangeOwner: true,
      canUpgrade: true,
      canMint: true,
      canBurn: true,
    }
  )

  return `${data.service}@${tokenName}@${tokenTicker}@${initialSupply}@${decimals}` + properties
}

const prepareEsdtTransferData = async (data: EsdtTransfer): Promise<string> => {
  await validateBody(data, EsdtTransfer)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const value = encodeNumber(data.value)
  let args = ''
  if (data.methodName) {
    args += '@' + Buffer.from(data.methodName).toString('hex')
    for (const k of data.arguments || []) {
      if (new BigNumber(k).isNaN()) {
        args += `@${Buffer.from(k as string).toString('hex')}`
      } else {
        args += `@${encodeNumber(new BigNumber(k))}`
      }
    }
  }

  return `${data.service}@${tokenId}@${value}` + args
}

const prepareEsdtMintOrBurnData = async (data: EsdtMint): Promise<string> => {
  await validateBody(data, EsdtMint)

  console.log('prepareEgldEsdtMintOrBurnData', data)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const supply = encodeNumber(data.supply)

  return `${data.service}@${tokenId}@${supply}`
}

const prepareEsdtPauseData = async (data: EsdtToken): Promise<string> => {
  await validateBody(data, EsdtToken)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')

  return `${data.service}@${tokenId}`
}

const prepareEsdtFreezeOrWipeOrOwnershipData = async (data: EsdtFreezeOrWipeOrOwnership): Promise<string> => {
  await validateBody(data, EsdtFreezeOrWipeOrOwnership)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const account = Buffer.from(data.account).toString('hex')

  return `${data.service}@${tokenId}@${account}`
}

const prepareEsdtSpecialRoleData = async (data: EsdtSpecialRole): Promise<string> => {
  await validateBody(data, EsdtSpecialRole)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const account = Buffer.from(data.account).toString('hex')
  let roles = ''
  for (const k of data.role) {
    roles += `@${Buffer.from(k).toString('hex')}`
  }

  return `${data.service}@${tokenId}@${account}` + roles
}

const prepareEsdtControlChangesData = async (data: EsdtControlChanges): Promise<string> => {
  await validateBody(data, EsdtControlChanges)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const properties = prepareProperties(data.properties)

  return `${data.service}@${tokenId}` + properties
}

const prepareIssuanceNftOrSftData = async (data: EsdtIssueNftOrSft): Promise<string> => {
  await validateBody(data, EsdtIssueNftOrSft)

  const tokenName = Buffer.from(data.name).toString('hex')
  const tokenTicker = Buffer.from(data.symbol).toString('hex')
  const properties = prepareProperties(data.properties)

  return `${data.service}@${tokenName}@${tokenTicker}` + properties
}

const prepareCreateNftOrSftData = async (data: EsdtCreateNftOrSft): Promise<string> => {
  await validateBody(data, EsdtCreateNftOrSft)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const nftName = Buffer.from(data.nftName).toString('hex')
  const quantity = encodeNumber(data.quantity)
  const royalties = encodeNumber(new BigNumber(data.royalties).multipliedBy(100))
  const attributes = Buffer.from(data.attributes).toString('hex')

  let uris = ''
  for (const k of data.uri) {
    uris += `@${Buffer.from(k).toString('hex')}`
  }

  return `${data.service}@${tokenId}@${quantity}@${nftName}@${royalties}` + `@${data.hash}@${attributes}` + uris
}

const prepareTransferNftCreateRoleData = async (data: EsdtTransferNftCreateRole): Promise<string> => {
  await validateBody(data, EsdtTransferNftCreateRole)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const from = Buffer.from(data.from).toString('hex')
  const to = Buffer.from(data.to).toString('hex')

  return `${data.service}@${tokenId}@${from}@${to}`
}

const prepareStopNftCreateData = async (data: EsdtToken): Promise<string> => {
  await validateBody(data, EsdtToken)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')

  return `${data.service}@${tokenId}`
}

const prepareAddOrBurnNftQuantityData = async (data: EsdtAddOrBurnNftQuantity): Promise<string> => {
  await validateBody(data, EsdtAddOrBurnNftQuantity)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const nonce = encodeNumber(data.nonce)
  const quantity = encodeNumber(data.quantity)

  return `${data.service}@${tokenId}@${nonce}@${quantity}`
}

const prepareFreezeOrWipeNftData = async (data: EsdtFreezeOrWipeNft): Promise<string> => {
  await validateBody(data, EsdtFreezeOrWipeNft)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const nonce = encodeNumber(data.nonce)
  const account = Buffer.from(data.account).toString('hex')

  return `${data.service}@${tokenId}@${nonce}@${account}`
}

const prepareTransferNftData = async (data: EsdtTransferNft): Promise<string> => {
  await validateBody(data, EsdtTransferNft)

  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const nonce = encodeNumber(data.nonce)
  const quantity = encodeNumber(data.quantity)
  const to = Buffer.from(data.to).toString('hex')

  let args = ''
  if (data.methodName) {
    args += '@' + Buffer.from(data.methodName).toString('hex')
    for (const k of data.arguments || []) {
      if (new BigNumber(k).isNaN()) {
        args += `@${Buffer.from(k as string).toString('hex')}`
      } else {
        args += `@${encodeNumber(new BigNumber(k))}`
      }
    }
  }

  return `${data.service}@${tokenId}@${nonce}@${quantity}@${to}` + args
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
  fromPrivateKey: string | undefined
): Promise<string> => {
  const sender = (transaction.from as string) || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const { data } = await getConfig()
  const { config } = data
  const gasPrice = (transaction.gasPrice ? transaction.gasPrice : config?.erd_min_gas_price) || 1000000000
  const nonce = await getTransactionsCount(sender as string)

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
 * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployEsdtSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0.05
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtIssuanceData({ ...(data as EsdtIssue), service: (data as EsdtIssue).service || 'issue' }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferEsdtSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, to, fee, ...data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtTransferData({ ...(data as EsdtTransfer), service: (data as EsdtTransfer).service || 'ESDTTransfer' }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT mint transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintEsdtSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, fee, amount, ...data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value: 0,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtMintOrBurnData({
      ...(data as EsdtMint),
      supply: amount ? new BigNumber(amount).toNumber() : 0,
      service: (data as EsdtMint).service || 'localMint',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT burn transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnEsdtSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, fee, ...data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtMintOrBurnData({ ...(data as EsdtMint), service: (data as EsdtMint).service || 'localBurn' }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT pause transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePauseEsdtSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, fee, ...data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtPauseData({ ...(data as EsdtToken), service: (data as EsdtToken).service || 'pause' }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT special role transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data tos be broadcast to blockchain.
 */
export const prepareSpecialRoleEsdtOrNftSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, fee, ...data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtSpecialRoleData({
      ...(data as EsdtSpecialRole),
      service: (data as EsdtSpecialRole).service || 'setSpecialRole',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

export const sendSpecialRoleEsdtOrNftTransaction = async (body: EgldEsdtTransaction) =>
  broadcast(await prepareSpecialRoleEsdtOrNftSignedTransaction(body), body.signatureId)

/**
 * Sign ESDT freze | wipe | transfer ownership transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareFreezeOrWipeOrOwvershipEsdtSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, fee, ...data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtFreezeOrWipeOrOwnershipData({
      ...(data as EsdtFreezeOrWipeOrOwnership),
      service: (data as EsdtFreezeOrWipeOrOwnership).service || 'transferOwnership',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT control changes (upgrading props) transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareControlChangesEsdtSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, fee, ...data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtControlChangesData({
      ...(data as EsdtControlChanges),
      service: (data as EsdtControlChanges).service || 'controlChanges',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT issue transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployNftOrSftSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0.05
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  // @ts-ignore
  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareIssuanceNftOrSftData({
      ...(data as EsdtIssueNftOrSft),
      service: (data as EsdtIssueNftOrSft).service || 'issueNonFungible',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT create NFT/SFT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCreateNftOrSftSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: sender,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareCreateNftOrSftData({
      ...(data as EsdtCreateNftOrSft),
      service: (data as EsdtCreateNftOrSft).service || 'ESDTNFTCreate',
    }),
  }

  // gas limit = 60000000 + (1500 * data.length) + (50000 * NFT size)
  // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('60000000').plus((tx.data as string).length).multipliedBy(1500).toString()

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT transfer NFT create role transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferNftCreateRoleSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareTransferNftCreateRoleData({
      ...(data as EsdtTransferNftCreateRole),
      service: (data as EsdtTransferNftCreateRole).service || 'transferNFTCreateRole',
    }),
  }

  // gas limit = 60000000 + (1500 * data.length)
  // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('60000000').plus((tx.data as string).length).multipliedBy(1500).toString()

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT stop NFT create transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStopNftCreateSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareStopNftCreateData({ ...(data as EsdtToken), service: (data as EsdtToken).service || 'stopNFTCreate' }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT Burn or Add quantity (SFT only) transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareAddOrBurnNftQuantitySignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: sender,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareAddOrBurnNftQuantityData({
      ...(data as EsdtAddOrBurnNftQuantity),
      service: (data as EsdtAddOrBurnNftQuantity).service || 'ESDTNFTBurn',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT freeze NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareFreezeNftSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareFreezeOrWipeNftData({
      ...(data as EsdtFreezeOrWipeNft),
      service: (data as EsdtFreezeOrWipeNft).service || 'freezeSingleNFT',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT freeze NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareWipeNftSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareFreezeOrWipeNftData({
      ...(data as EsdtFreezeOrWipeNft),
      service: (data as EsdtFreezeOrWipeNft).service || 'wipeSingleNFT',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT transfer NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferNftSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: sender,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareTransferNftData({
      ...(data as EsdtTransferNft),
      service: (data as EsdtTransferNft).service || 'ESDTNFTTransfer',
    }),
  }

  // TRANSFER: GasLimit: 1000000 + length of Data field in bytes * 1500
  // TRANSFER TO SMART CONTRACT: GasLimit: 1000000 + extra for smart contract call
  // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('1000000').plus((tx.data as string).length).multipliedBy(1500).toString()

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

/**
 * Sign EGLD transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedTransaction = async (body: EgldEsdtTransaction) => {
  await validateBody(body, EgldEsdtTransaction)
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

/**
 * Send EGLD store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendStoreDataTransaction = async (body: ChainCreateRecord) =>
  broadcast(await prepareStoreDataTransaction(body), body.signatureId)

/**
 * Send EGLD or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransaction = async (body: EgldEsdtTransaction) => broadcast(await prepareSignedTransaction(body), body.signatureId)

/**
 * Send EGLD deploy ESDT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployEsdtTransaction = async (body: EgldEsdtTransaction) =>
  broadcast(await prepareDeployEsdtSignedTransaction(body), body.signatureId)

/**
 * Send EGLD invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (body: EgldEsdtTransaction) => {
  return broadcast(await prepareTransferEsdtSignedTransaction(body), body.signatureId)
}

/**
 * Send EGLD ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferNftTransaction = async (body: EgldEsdtTransaction) =>
  broadcast(await prepareTransferNftSignedTransaction(body), body.signatureId)

/**
 * Send EGLD NFT deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployNftTransaction = async (body: EgldEsdtTransaction) =>
  broadcast(await prepareDeployNftOrSftSignedTransaction(body), body.signatureId)

// TODO: add ERC-1155 support
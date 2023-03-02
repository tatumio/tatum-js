import { ApiServices, EgldTx, TATUM_API_CONSTANTS, TransferEgldBlockchain } from '@tatumio/api-client'
import * as bech32 from 'bech32'
import BigNumber from 'bignumber.js'
import { getPublicKey } from 'ed25519-hd-key'
import { TransactionConfig } from 'web3-core'
import {
  Address,
  Balance,
  GasLimit,
  GasPrice,
  Nonce,
  Transaction,
  TransactionPayload,
  UserSecretKey,
  UserSigner,
} from '@elrondnetwork/erdjs'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import { EsdtData } from './services/egld.tx'
import { httpHelper } from '@tatumio/shared-core'

const ELROND_V3_ENDPOINT = () => `${process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL}/v3/egld/node`

export type TransferEgld = FromPrivateKeyOrSignatureId<TransferEgldBlockchain> & {
  service?: string
}

export const generateAddressFromPrivatekey = (privKey: string) => {
  const publicKey = getPublicKey(Buffer.from(privKey, 'hex'), false).toString('hex')
  const words = bech32.toWords(Buffer.from(publicKey.slice(-64), 'hex'))
  const address = bech32.encode('erd', words)

  return address
}

export const signTransaction = async (tx: Transaction, fromPrivateKey: string): Promise<string> => {
  const fromAddrSigner = new UserSigner(UserSecretKey.fromString(fromPrivateKey))
  await fromAddrSigner.sign(tx)
  return JSON.stringify(tx.toSendable())
}

export const egldUtils = {
  encodeNumber: (n: number | BigNumber): string => {
    const bn = new BigNumber(n)
    if (bn.isNaN()) {
      return ''
    }
    const result = bn.toString(16).toLowerCase()

    return `${(result.length % 2 ? '0' : '') + result}`
  },

  prepareProperties: (props: any): string => {
    if (!props) {
      return ''
    }
    const keys = Object.keys(props)
    const asHexTrue = Buffer.from('true').toString('hex')
    const asHexFalse = Buffer.from('false').toString('hex')
    let result = ''
    for (const k of keys) {
      result += `@${Buffer.from(k).toString('hex')}@${props[k] ? asHexTrue : asHexFalse}`
    }
    return result
  },

  getClient: (provider?: string) => {
    const client = provider || ELROND_V3_ENDPOINT()
    return client
  },

  getConfig: async () => {
    const gasStationUrl = await egldUtils.getClient()
    try {
      const response = await httpHelper.get(`${gasStationUrl}/d341d8f5-5f6a-43ca-a57c-c67839d1a1cb/network/config`)
      return response?.data
    } catch (e) {
      console.error(e)
    }
    return null
  },
  getGasPrice: async (): Promise<number> => {
    const { data } = await egldUtils.getConfig()
    const price = data?.config?.erd_min_gas_price
    if (price) {
      return price
    }
    throw Error(data?.data?.returnMessage || 'egld.gasPrice.error')
  },
  getGasLimit: async (tx: EgldTx): Promise<number> => {
    const gasStationUrl = await egldUtils.getClient()
    const { data } = await httpHelper.post(
      `${gasStationUrl}/d341d8f5-5f6a-43ca-a57c-c67839d1a1cb/transaction/cost`,
      tx,
    )
    const gas = data?.data?.txGasUnits
    if (gas) {
      return gas
    }
    throw Error(data?.data?.returnMessage || 'egld.gasLimit.error')
  },

  isEsdtData: (input: object): input is EsdtData => {
    return input && 'name' in input && 'symbol' in input && 'supply' in input && 'digits' in input
  },

  parseTransferEgldBlockchainData: (body: Pick<TransferEgld, 'data'>): EsdtData => {
    let parsed: object
    try {
      parsed = body?.data && JSON.parse(body.data)
    } catch {
      throw new Error('Unable to parse Egld data input')
    }

    if (!egldUtils.isEsdtData(parsed)) {
      throw new Error('Unable to parse Egld data input')
    }

    return parsed
  },
}

export const prepareSignedTransactionAbstraction = async (
  transaction: TransactionConfig,
  signatureId?: string | undefined,
  fromPrivateKey?: string | undefined,
): Promise<string> => {
  const sender =
    (transaction.from as string) || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const { data } = await egldUtils.getConfig()
  const config = data?.config
  const gasPrice = (transaction.gasPrice ? transaction.gasPrice : config?.erd_min_gas_price) || 1000000000
  const nonce = await ApiServices.blockchain.elgo.egldGetTransactionCount(sender)

  const egldTx: EgldTx = {
    nonce,
    value: new BigNumber(transaction.value as string).isLessThan(0)
      ? '0'
      : new BigNumber(transaction.value as string).multipliedBy(1e18).toString(),
    receiver: transaction.to as string,
    sender,
    gasPrice,
    gasLimit: 0,
    data: transaction.data ? Buffer.from(transaction.data as string).toString('base64') : undefined,
  }

  const gasLimit = transaction.gas || (await egldUtils.getGasLimit(egldTx))
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
    nonce: egldTx.nonce ? new Nonce(egldTx.nonce) : undefined,
    value: egldTx.value ? Balance.fromString(egldTx.value) : undefined,
    receiver: new Address(egldTx.receiver),
    sender: new Address(egldTx.sender),
    gasPrice: egldTx.gasPrice ? new GasPrice(egldTx.gasPrice) : undefined,
    gasLimit: new GasLimit(egldTx.gasLimit),
    data: transaction.data ? new TransactionPayload(transaction.data) : undefined,
  })

  return await signTransaction(erdjsTransaction, fromPrivateKey as string)
}

import { isWithSignatureId } from '@tatumio/shared-abstract-sdk'
import * as algosdk from 'algosdk'
import { BigNumber } from 'bignumber.js'
import type {
  ChainBurnAlgoErc20,
  ChainBurnAlgoErc20KMS,
  ChainTransferAlgoErc20,
  ChainTransferAlgoErc20KMS,
  DeployAlgoErc20,
  DeployAlgoErc20KMS,
} from '../algo.types'
// No types for base32.js
// @ts-ignore
import base32 from 'base32.js'
import { AlgoWeb } from '../algo.web'
import { algoWallet } from '../algo.wallet'

export const prepareCreateFTSignedTransaction = async ({
  body,
  testnet = false,
  algoWeb,
  provider,
}: {
  body: DeployAlgoErc20 | DeployAlgoErc20KMS
  testnet?: boolean
  algoWeb: AlgoWeb
  provider?: string
}) => {
  const algodClient = algoWeb.getClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()

  const decoder = new base32.Decoder({ type: 'rfc4648' })

  const from = isWithSignatureId(body as DeployAlgoErc20KMS)
    ? (body as DeployAlgoErc20KMS).from
    : algoWallet().generateAddressFromPrivatetKey((body as DeployAlgoErc20).fromPrivateKey)

  const decimals = body.digits || 0
  /**
   * By default, total = 2 decimals = 1 -> will create supply = 0.2
   * To simplify it for customers we add zeros to the end of the number
   */
  const total = new BigNumber(body.supply).shiftedBy(decimals).toNumber()

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from,
    total,
    decimals,
    assetName: body.symbol,
    unitName: body.name,
    assetURL: (body as DeployAlgoErc20).url,
    defaultFrozen: false,
    freeze: undefined,
    manager: undefined,
    clawback: undefined,
    reserve: undefined,
    suggestedParams: {
      ...params,
      fee: Number(body.fee || '0.001') * 1000000,
      flatFee: true,
    },
  })

  if (isWithSignatureId(body)) {
    return JSON.stringify(txn)
  }

  const secretKey = new Uint8Array(decoder.write((body as DeployAlgoErc20).fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

export const prepareTransferFTSignedTransaction = async ({
  body,
  testnet = false,
  algoWeb,
  provider,
}: {
  body: ChainTransferAlgoErc20 | ChainTransferAlgoErc20KMS
  testnet?: boolean
  algoWeb: AlgoWeb
  provider?: string
}) => {
  const algodClient = algoWeb.getClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()

  const decoder = new base32.Decoder({ type: 'rfc4648' })

  const from = isWithSignatureId(body)
    ? body.from
    : algoWallet().generateAddressFromPrivatetKey(body.fromPrivateKey)

  const decimals = body.digits || 0
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    from,
    body.to,
    undefined,
    undefined,
    new BigNumber(body.amount).shiftedBy(decimals).toNumber(),
    undefined,
    Number(body.contractAddress),
    {
      ...params,
      fee: Number(body.fee || '0.001') * 1000000,
      flatFee: true,
    },
    undefined,
  )

  if (isWithSignatureId(body)) {
    return JSON.stringify(txn)
  }

  const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

export const prepareBurnFTSignedTransaction = async ({
  body,
  testnet = false,
  algoWeb,
  provider,
}: {
  body: ChainBurnAlgoErc20 | ChainBurnAlgoErc20KMS
  testnet?: boolean
  algoWeb: AlgoWeb
  provider?: string
}) => {
  const algodClient = algoWeb.getClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()

  const decoder = new base32.Decoder({ type: 'rfc4648' })

  const from = isWithSignatureId(body)
    ? body.from
    : algoWallet().generateAddressFromPrivatetKey(body.fromPrivateKey)

  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
    from,
    undefined,
    Number(body.contractAddress),
    {
      ...params,
      fee: Number(body.fee || '0.001') * 1000000,
      flatFee: true,
    },
    undefined,
  )

  if (isWithSignatureId(body)) {
    return JSON.stringify(txn)
  }

  const secretKey = new Uint8Array(decoder.write(body.fromPrivateKey).buf)
  const signedTxn = txn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

// No types for base32.js
// @ts-ignore
import base32 from 'base32.js'
import { isWithSignatureId, SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BigNumber } from 'bignumber.js'
import * as algosdk from 'algosdk'
import type {
  AlgoApiCallsType,
  TransferAlgo,
  TransferAlgoBlockchain,
  TransferAlgoBlockchainKMS,
  TransferAlgoKMS,
} from '../algo.types'
import { AlgoWeb } from '../algo.web'
import { algoWallet } from '../algo.wallet'

export const prepareSignedTransaction = async ({
  body,
  testnet = false,
  algoWeb,
  apiCalls,
  provider,
}: {
  body: TransferAlgo | TransferAlgoKMS | TransferAlgoBlockchain | TransferAlgoBlockchainKMS
  testnet?: boolean
  algoWeb: AlgoWeb
  apiCalls: AlgoApiCallsType
  provider?: string
}): Promise<string> => {
  const account = (body as TransferAlgoBlockchain).from || (body as TransferAlgo).account
  const to = (body as TransferAlgoBlockchain).to || (body as TransferAlgo).address
  const privateKey = (body as TransferAlgoBlockchain).fromPrivateKey || (body as TransferAlgo).privateKey

  const from = isWithSignatureId(body as TransferAlgoKMS | TransferAlgoBlockchainKMS)
    ? account
    : algoWallet().generateAddressFromPrivatetKey(privateKey)

  if ((body as TransferAlgoBlockchain).to) {
    const { balance } = await apiCalls.getBlockchainAccountBalance(from)
    const requiredBalance = new BigNumber(body.amount).plus(body.fee || 0.001)
    const accountBalance = new BigNumber(balance || 0)
    if (accountBalance.isLessThan(requiredBalance)) {
      throw new SdkError({
        code: SdkErrorCode.INSUFFICIENT_FUNDS,
        originalError: {
          name: SdkErrorCode.INSUFFICIENT_FUNDS,
          message: `Insufficient funds to create transaction from address ${from} -> available balance is ${accountBalance.toString()}, required balance is ${requiredBalance.toString()}.`,
        },
      })
    }
  }

  const algodClient = algoWeb.getClient(testnet, provider)
  const params = await algodClient.getTransactionParams().do()

  const decoder = new base32.Decoder({ type: 'rfc4648' })
  const enc = new TextEncoder()
  const note = enc.encode((body as TransferAlgo).senderNote ?? '')
  const bodyn = algosdk.makePaymentTxnWithSuggestedParams(
    from,
    to,
    new BigNumber(body.amount).multipliedBy(1000000).toNumber(),
    undefined,
    note,
    {
      ...params,
      fee: new BigNumber(body.fee || '0.001').multipliedBy(1000000).toNumber(),
      flatFee: true,
    },
  )

  if (isWithSignatureId(body as TransferAlgoKMS | TransferAlgoBlockchainKMS)) {
    return JSON.stringify(bodyn)
  }

  const secretKey = new Uint8Array(decoder.write(privateKey).buf)
  const signedTxn = bodyn.signTxn(secretKey)

  return Buffer.from(signedTxn).toString('hex')
}

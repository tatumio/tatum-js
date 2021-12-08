import { getAccountById, getVirtualCurrencyByName } from '../ledger'
import {
  offchainBroadcast,
  offchainCancelWithdrawal,
  offchainStoreWithdrawal,
  CONTRACT_ADDRESSES,
  validateBody,
  Currency,
  TrcType,
  TransferTrxOffchain,
} from '@tatumio/tatum-core'
import { prepareSignedTransaction, prepareTrc10SignedTransaction, prepareTrc20SignedTransaction } from '../transaction'
import { generatePrivateKeyFromMnemonic } from '../wallet'
import { offchainTransferKMS } from './kms'

/**
 * Send Tron transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendOffchainTransaction = async (testnet: boolean, body: TransferTrxOffchain) => {
  if (body.signatureId) {
    return offchainTransferKMS(body)
  }
  await validateBody(body, TransferTrxOffchain)
  const { mnemonic, index, fromPrivateKey, ...withdrawal } = body
  const { amount, address } = withdrawal

  let fromPriv: string
  if (mnemonic && index !== undefined) {
    fromPriv = mnemonic && index ? await generatePrivateKeyFromMnemonic(mnemonic, index) : (fromPrivateKey as string)
  } else if (fromPrivateKey) {
    fromPriv = fromPrivateKey
  } else {
    throw new Error('No mnemonic or private key is present.')
  }

  withdrawal.fee = withdrawal.fee || '2.5'
  const account = await getAccountById(withdrawal.senderAccountId)
  let txData
  if (account.currency === Currency.TRON) {
    txData = await prepareSignedTransaction({ amount, fromPrivateKey: fromPriv, to: address })
  } else if (account.currency === Currency.USDT_TRON || account.currency === Currency.INRT_TRON) {
    txData = await prepareTrc20SignedTransaction({
      amount,
      fromPrivateKey: fromPriv,
      to: address,
      tokenAddress: CONTRACT_ADDRESSES[account.currency],
      feeLimit: parseFloat(withdrawal.fee),
    })
  } else {
    const vc = await getVirtualCurrencyByName(account.currency)
    if (vc.trcType === TrcType.TRC10) {
      txData = await prepareTrc10SignedTransaction(
        testnet,
        {
          amount,
          fromPrivateKey: fromPriv,
          to: address,
          tokenId: vc.erc20Address as string,
        },
        vc.precision
      )
    } else if (vc.trcType === TrcType.TRC20) {
      txData = await prepareTrc20SignedTransaction({
        amount,
        feeLimit: parseFloat(withdrawal.fee),
        fromPrivateKey: fromPriv,
        to: address,
        tokenAddress: vc.erc20Address as string,
      })
    } else {
      throw new Error('Unsupported account.')
    }
  }
  const { id } = await offchainStoreWithdrawal(withdrawal)
  try {
    return { ...(await offchainBroadcast({ txData, withdrawalId: id, currency: Currency.TRON })), id }
  } catch (e) {
    console.error(e)
    try {
      await offchainCancelWithdrawal(id)
    } catch (e1) {
      console.log(e)
      return { id }
    }
  }
}

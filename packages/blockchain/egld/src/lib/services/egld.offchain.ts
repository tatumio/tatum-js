import { ApiServices, Currency } from '@tatumio/api-client'
import { abstractBlockchainOffchain } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { prepareSignedTransaction } from './egld.tx'

export const egldOffchainService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainOffchain(args),
    sendOffchainTransaction,
  }
}

/**
 * Send EGLD transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @param testnet mainnet or testnet version
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendOffchainTransaction = async (body: any, provider?: string, testnet?: boolean) => {
  if (body.signatureId) {
    return ApiServices.offChain.blockchain.egldTransfer(body)
  }
  const { mnemonic, index, fromPrivateKey, gasLimit, gasPrice, ...withdrawal } = body
  const { value, receiver } = withdrawal

  const fromPriv =
    mnemonic && index !== undefined
      ? ((await ApiServices.blockchain.elgo.egldGenerateAddressPrivateKey({
          mnemonic,
          index,
        })) as string)
      : (fromPrivateKey as string)

  const fee = {
    gasLimit: `${gasLimit || '50000'}`,
    gasPrice: `${gasPrice || '1000000000'}`,
  }
  const txData = await prepareSignedTransaction(
    {
      amount: value,
      fromPrivateKey: fromPriv,
      fee,
      to: receiver,
    },
    provider,
  )
  // @ts-ignore
  withdrawal.fee = new BigNumber(fee.gasLimit).multipliedBy(fee.gasPrice).toString()
  const { id } = await ApiServices.offChain.withdrawal.storeWithdrawal(withdrawal)
  try {
    return {
      ...(await ApiServices.offChain.withdrawal.broadcastBlockchainTransaction({
        txData,
        withdrawalId: id,
        currency: Currency.EGLD,
      })),
      id,
    }
  } catch (e) {
    console.error(e)
    try {
      await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id)
    } catch (e1) {
      console.log(e)
      return { id }
    }
  }
}

import { ApiServices, Currency, TransferEth, TransferEthKMS, TransferEthMnemonic } from '@tatumio/api-client'
import { abstractBlockchainOffchain } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { from } from 'form-data'
import { prepareSignedTransaction } from './egld.tx'

export const egldOffchainService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainOffchain(args),
    send,
  }
}

type EgldOffchain = TransferEth | TransferEthMnemonic | TransferEthKMS

/**
 * Send EGLD transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const send = async (body: EgldOffchain) => {
  if ('signatureId' in body) {
    return await ApiServices.offChain.blockchain.egldTransfer(body as TransferEthKMS)
  }

  const { gasLimit, gasPrice, ...withdrawal } = body
  let fromPriv: string

  if ('mnemonic' in body) {
    fromPriv = (await ApiServices.blockchain.elgo.egldGenerateAddressPrivateKey({
      mnemonic: body.mnemonic,
      index: body.index,
    })) as string
  } else fromPriv = body.privateKey

  const fee = {
    gasLimit: `${gasLimit || '50000'}`,
    gasPrice: `${gasPrice || '1000000000'}`,
  }

  const txData = await prepareSignedTransaction({
    amount: body.amount,
    fromPrivateKey: fromPriv,
    fee,
    to: body.address,
  })

  const { id } = await ApiServices.offChain.withdrawal.storeWithdrawal({
    ...withdrawal,
    fee: new BigNumber(fee.gasLimit).multipliedBy(fee.gasPrice).toString(),
  })

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
      return await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id!)
    } catch (e1) {
      console.log(e)
      return { id }
    }
  }
}

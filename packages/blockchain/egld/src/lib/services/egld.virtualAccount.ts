import {
  ApiServices,
  Currency,
  OffchainTransactionResult,
  OffchainTransactionSignatureResult,
  TransferEth,
  TransferEthKMS,
  TransferEthMnemonic,
} from '@tatumio/api-client'
import { abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { prepareSignedTransaction } from './egld.tx'

export const egldVirtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    /**
     * Send EGLD transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send,
  }
}

type EgldVirtualAccountTx = TransferEth | TransferEthMnemonic | TransferEthKMS
type SendVirtualAccountTxResponse =
  | OffchainTransactionResult
  | OffchainTransactionSignatureResult
  | { id?: string }
  | void

export const send = async (body: EgldVirtualAccountTx): Promise<SendVirtualAccountTxResponse> => {
  if ('signatureId' in body) {
    return await ApiServices.virtualAccount.blockchain.egldTransfer(body as TransferEthKMS)
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
    from: '',
  })

  const { id } = await ApiServices.virtualAccount.withdrawal.storeWithdrawal({
    ...withdrawal,
    fee: new BigNumber(fee.gasLimit).multipliedBy(fee.gasPrice).toString(),
  })

  try {
    return {
      ...(await ApiServices.virtualAccount.withdrawal.broadcastBlockchainTransaction({
        txData,
        withdrawalId: id,
        currency: Currency.EGLD,
      })),
      id,
    }
  } catch (e) {
    try {
      return await ApiServices.virtualAccount.withdrawal.cancelInProgressWithdrawal(id!)
    } catch (e1) {
      return { id }
    }
  }
}

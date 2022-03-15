import { ApiServices, Currency, TransferTerra, Withdrawal } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { abstractBlockchainOffchain } from '@tatumio/shared-blockchain-abstract'
import { SDKArguments, SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { terraTxService } from './terra.tx'

type LUNA_ASSETS = 'LUNA' | 'LUNA_UST' | 'LUNA_KRT'

export const terraOffchainService = (args: SDKArguments & { blockchain: Blockchain }) => {
  /**
   * Send Terra transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param testnet testnet or mainnet
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
   */
  const send = async (testnet: boolean, body: TransferTerra) => {
    const { fromPrivateKey, ...withdrawal } = body

    if (!withdrawal.fee || Number(withdrawal.fee) <= 0)
      throw new SdkError({ code: SdkErrorCode.FEE_TOO_SMALL })

    const account = await ApiServices.ledger.account.getAccountByAccountId(withdrawal.senderAccountId)
    const { id } = await ApiServices.offChain.withdrawal.storeWithdrawal(withdrawal as Withdrawal)
    const { amount, fee, address } = withdrawal
    let txData: string

    try {
      txData = await prepare(
        testnet,
        amount,
        address,
        fromPrivateKey,
        fee,
        account.currency as LUNA_ASSETS,
        withdrawal.attr,
      )
    } catch (e) {
      id && (await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id))
      throw e
    }

    try {
      return {
        ...(await ApiServices.offChain.withdrawal.broadcastBlockchainTransaction({
          txData,
          withdrawalId: id,
          currency: Currency.XRP,
        })),
        id,
      }
    } catch (e) {
      id && (await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id))
      throw e
    }
  }

  /**
   * Sign Terra transaction with private keys locally. Nothing is broadcast to the blockchain.
   * @param testnet testnet or mainnet
   * @param amount amount to send
   * @param to recipient address
   * @param fromPrivateKey private to sign transaction with
   * @param fee fee to pay
   * @param currency currency to send
   * @param memo optional memo to be used in tx
   * @returns transaction data to be broadcast to blockchain.
   */
  const prepare = async (
    testnet: boolean,
    amount: string,
    to: string,
    fromPrivateKey: string,
    fee: string,
    currency: LUNA_ASSETS,
    memo?: string,
  ) => {
    const txService = terraTxService(args)
    return txService.prepare(testnet, {
      fromPrivateKey,
      amount,
      to,
      memo,
      currency,
      fee,
    })
  }

  return {
    ...abstractBlockchainOffchain(args),
    send,
    prepare,
  }
}

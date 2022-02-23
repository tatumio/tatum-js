import { OffChainBlockchainService, OffChainWithdrawalService } from '@tatumio/api-client'
import { Blockchain, Currency } from '@tatumio/shared-core'
import { egldWallet } from '../services/egld.wallet'
import { egldUtils } from '../utils/egld.utils'
import { abstractBlockchainOffchain } from '@tatumio/shared-blockchain-abstract'

export const egldOffchainService = (args: { apiKey: string; blockchain: Blockchain }) => {
  const utils = egldUtils(args.apiKey)
  return {
    ...abstractBlockchainOffchain(args),
    /**
     * Send EGLD transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param testnet mainnet or testnet version
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    // TODO type
    sendOffchainTransaction: async (body, options?: { testnet: boolean }) => {
      if (body.signatureId) {
        return OffChainBlockchainService.egldTransfer(body)
      }
      const { mnemonic, index, fromPrivateKey, gasLimit, gasPrice, ...withdrawal } = body
      const { value, receiver } = withdrawal

      const fromPriv =
        mnemonic && index !== undefined
          ? await egldWallet().generatePrivateKeyFromMnemonic(mnemonic, index, options)
          : (fromPrivateKey as string)

      const fee = {
        gasLimit: `${gasLimit || '50000'}`,
        gasPrice: `${gasPrice || '1000000000'}`,
      }
      const txData = await utils.prepareSignedTransaction({
        amount: value,
        fromPrivateKey: fromPriv,
        fee,
        to: receiver,
      })
      // @ts-ignore
      withdrawal.fee = new BigNumber(fee.gasLimit).multipliedBy(fee.gasPrice).toString()
      const { id } = await OffChainWithdrawalService.storeWithdrawal(withdrawal)
      try {
        return {
          ...(await OffChainWithdrawalService.broadcastBlockchainTransaction({
            txData,
            withdrawalId: id,
            currency: Currency.EGLD,
          })),
          id,
        }
      } catch (e) {
        console.error(e)
        try {
          await OffChainWithdrawalService.cancelInProgressWithdrawal(id)
        } catch (e1) {
          console.log(e)
          return { id }
        }
      }
    },
  }
}

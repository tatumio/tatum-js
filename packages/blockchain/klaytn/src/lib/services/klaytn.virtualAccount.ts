import {
  AccountService,
  ApiServices,
  Currency,
  TransferEth,
  TransferEthKMS,
  VirtualCurrencyService,
  WithdrawalService,
} from '@tatumio/api-client'
import {
  abstractBlockchainVirtualAccount,
  PrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { evmBasedUtils, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { klaytnTxService } from './klaytn.tx'

type TransferVirtualAccountKlay = PrivateKeyOrSignatureId<TransferEth>
type VirtualAccountResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendKlaytnVirtualAccountTransaction = async (
  body: TransferVirtualAccountKlay,
  web3: EvmBasedWeb3,
): Promise<VirtualAccountResponse> => {
  const txService = klaytnTxService({ blockchain: Blockchain.KLAY, web3 })
  const { mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal } = body
  const { amount, address } = withdrawal
  let fromPrivKey: string
  let txData: string

  if (mnemonic && index !== undefined) {
    fromPrivKey = (await evmBasedUtils.generatePrivateKeyFromMnemonic(
      Blockchain.KLAY,
      mnemonic,
      index,
    )) as string
  } else {
    fromPrivKey = privateKey as string
  }

  const account = await AccountService.getAccountByAccountId(body.senderAccountId)
  const fee = {
    gasLimit: gasLimit || '21000',
    gasPrice: gasPrice || '25',
  }

  if (account.currency === Currency.KLAY) {
    txData = await txService.native.prepare.transferSignedTransaction({
      amount,
      fromPrivateKey: fromPrivKey,
      fee,
      nonce: body.nonce,
      to: address,
    })
  } else {
    fee.gasLimit = '100000'
    const vc = await VirtualCurrencyService.getCurrency(account.currency)
    txData = await txService.erc20.prepare.transferSignedTransaction({
      amount,
      fee,
      fromPrivateKey: fromPrivKey,
      to: address,
      digits: vc.precision as number,
      nonce: body.nonce,
      contractAddress: vc.erc20Address as string,
    })
  }

  const withdrawalFee = web3
    .getClient()
    .utils.fromWei(
      new BigNumber(fee.gasLimit).multipliedBy(evmBasedUtils.transformToWei(fee.gasPrice, 'gwei')).toString(),
      'ether',
    )
  const withdrawalBody = {
    ...withdrawal,
    fee: withdrawalFee,
  }

  const { id } = await WithdrawalService.storeWithdrawal(withdrawalBody)
  try {
    return {
      ...(await WithdrawalService.broadcastBlockchainTransaction({
        txData,
        withdrawalId: id,
        currency: Currency.KLAY,
      })),
      id,
    }
  } catch (e) {
    console.error(e)
    try {
      return await WithdrawalService.cancelInProgressWithdrawal(id!)
    } catch (e1) {
      return { id }
    }
  }
}

export const virtualAccountService = (args: { blockchain: Blockchain; web3: EvmBasedWeb3 }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    /**
     * Send Klaytn transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountKlay) => {
      if (body.signatureId) {
        return ApiServices.virtualAccount.blockchain.klayTransfer(body as TransferEthKMS)
      } else {
        return await sendKlaytnVirtualAccountTransaction(body, args.web3)
      }
    },
  }
}

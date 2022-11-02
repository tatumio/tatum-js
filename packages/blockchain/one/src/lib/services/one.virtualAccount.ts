import {
  AccountService,
  ApiServices,
  Currency,
  TransferEth,
  TransferEthKMS,
  VirtualCurrencyService,
  Withdrawal,
  WithdrawalService,
} from '@tatumio/api-client'
import {
  abstractBlockchainVirtualAccount,
  PrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { evmBasedUtils, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { oneTxService } from './one.tx'

type TransferVirtualAccountOne = PrivateKeyOrSignatureId<TransferEth>
type VirtualAccountResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendOneVirtualAccountTransaction = async (
  body: TransferVirtualAccountOne,
  web3: EvmBasedWeb3,
): Promise<VirtualAccountResponse> => {
  const txService = oneTxService({ blockchain: Blockchain.HARMONY, web3 })
  const { privateKey, gasLimit, gasPrice, nonce, mnemonic, index, ...w } = body
  const withdrawal: Withdrawal = w as Withdrawal
  const { amount, address } = withdrawal
  let fromPrivKey: string
  let txData: any

  if (mnemonic && index !== undefined) {
    fromPrivKey = (await evmBasedUtils.generatePrivateKeyFromMnemonic(
      Blockchain.HARMONY,
      mnemonic,
      index,
    )) as string
  } else {
    fromPrivKey = privateKey as string
  }

  const account = await AccountService.getAccountByAccountId(withdrawal.senderAccountId)

  // values from estimate fee for ERC_20 transfer call
  const fee = {
    gasLimit: gasLimit || '150000',
    gasPrice: gasPrice || '50',
  }

  if (account.currency === Currency.ONE) {
    txData = await txService.native.prepare.transferSignedTransaction({
      fromPrivateKey: fromPrivKey,
      to: address,
      nonce,
      amount,
      fee,
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
      new BigNumber(gasLimit as string)
        .multipliedBy(evmBasedUtils.transformToWei(gasPrice as string, 'gwei'))
        .toString(),
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
        currency: Currency.ONE,
      })),
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
     * Send ONE transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountOne) => {
      if (body.signatureId) {
        return ApiServices.offChain.blockchain.oneTransfer(body as TransferEthKMS)
      } else {
        return await sendOneVirtualAccountTransaction(body, args.web3)
      }
    },
  }
}

import {
  AccountService,
  ApiServices,
  Currency,
  TransferTron,
  TransferTronKMS,
  VirtualCurrencyService,
  WithdrawalService,
} from '@tatumio/api-client'
import {
  abstractBlockchainVirtualAccount,
  FromPrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { Blockchain, CONTRACT_ADDRESSES } from '@tatumio/shared-core'
import { tronWallet } from './tron.wallet'
import { ITronWeb } from './tron.web'
import { tronTx } from './tron.tx'

export enum TrcType {
  TRC10 = 'TRC10',
  TRC20 = 'TRC20',
}

const TRON_BASED_CURRENCIES = [Currency.USDT_TRON.toString(), Currency.INRT_TRON.toString()]

type TransferVirtualAccountTron = FromPrivateKeyOrSignatureId<TransferTron>
type VirtualAccountResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendTronVirtualAccountTransaction = async (
  body: TransferVirtualAccountTron,
  tronWeb: ITronWeb,
): Promise<VirtualAccountResponse> => {
  const { mnemonic, index, fromPrivateKey, ...withdrawal } = body
  const { amount, address, senderAccountId } = withdrawal
  const wallet = tronWallet({ tronWeb })
  const txService = tronTx({ tronWeb })
  let fromPrivKey: string
  let txData: any

  if (mnemonic && index !== undefined) {
    fromPrivKey = (await wallet.generatePrivateKeyFromMnemonic(mnemonic, index)) as string
  } else {
    fromPrivKey = body.fromPrivateKey as string
  }

  const withdrawalFee = withdrawal?.fee || '2.5'
  const withdrawalBody = {
    ...withdrawal,
    fee: withdrawalFee,
  }

  const account = await AccountService.getAccountByAccountId(senderAccountId)
  if (account.currency === Currency.TRON) {
    txData = await txService.native.prepare.signedTransaction({
      amount,
      fromPrivateKey: fromPrivKey,
      to: address,
    })
  } else if (TRON_BASED_CURRENCIES.includes(account.currency)) {
    txData = await txService.trc20.prepare.signedTransaction({
      amount,
      fromPrivateKey: fromPrivKey,
      to: address,
      tokenAddress: CONTRACT_ADDRESSES[account.currency],
      feeLimit: parseFloat(withdrawalFee),
    })
  } else {
    const vc = await VirtualCurrencyService.getCurrency(account.currency)
    if (vc.trcType === TrcType.TRC10) {
      txData = await txService.trc10.prepare.signedTransaction(
        {
          amount,
          fromPrivateKey: fromPrivKey,
          to: address,
          tokenId: vc.erc20Address as string,
        },
        vc.precision,
      )
    } else if (vc.trcType === TrcType.TRC20) {
      txData = await txService.trc20.prepare.signedTransaction({
        amount,
        feeLimit: parseFloat(withdrawalFee),
        fromPrivateKey: fromPrivKey,
        to: address,
        tokenAddress: vc.erc20Address as string,
      })
    } else {
      throw new Error('Unsupported account.')
    }
  }
  const { id } = await WithdrawalService.storeWithdrawal(withdrawalBody)
  try {
    return {
      ...(await WithdrawalService.broadcastBlockchainTransaction({
        txData,
        withdrawalId: id,
        currency: Currency.TRON,
      })),
      id,
    }
  } catch (e) {
    console.error(e)
    try {
      return await WithdrawalService.cancelInProgressWithdrawal(id!)
    } catch (e1) {
      console.log(e)
      return { id }
    }
  }
}

export const virtualAccountService = (args: { blockchain: Blockchain; tronWeb: ITronWeb }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    /**
     * Send Tron transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountTron) => {
      if (body.signatureId) {
        return ApiServices.virtualAccount.blockchain.tronTransferOffchain(body as TransferTronKMS)
      } else {
        return await sendTronVirtualAccountTransaction(body, args.tronWeb)
      }
    },
  }
}

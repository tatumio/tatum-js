import {
  AccountService,
  ApiServices,
  BEP20_CURRENCIES,
  Currency,
  TransactionHash,
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
import { Blockchain, CONTRACT_ADDRESSES, CONTRACT_DECIMALS } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { oneTxService } from './one.tx'

type TransferVirtualAccountOne = PrivateKeyOrSignatureId<TransferEth>
type VirtualAccountResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendOneVirtualAccountTransaction = async (
  body: TransferVirtualAccountOne,
  web3: EvmBasedWeb3,
): Promise<VirtualAccountResponse> => {
  const txService = oneTxService({ blockchain: Blockchain.HARMONY, web3 })
  const { privateKey, gasLimit, gasPrice, nonce, ...w } = body
  const withdrawal: Withdrawal = w as Withdrawal
  const { amount, address } = withdrawal

  withdrawal.fee = web3
    .getClient()
    .utils.fromWei(
      new BigNumber(gasLimit).multipliedBy(evmBasedUtils.transformToWei(gasPrice, 'gwei')).toString(),
      'ether',
    )
  const fee = {
    gasLimit: gasLimit || '21000',
    gasPrice: gasPrice || '20',
  }
  const account = await AccountService.getAccountByAccountId(withdrawal.senderAccountId)
  const withdrawalResponse = await WithdrawalService.storeWithdrawal(withdrawal)

  let transactionData: TransactionHash
  if (account.currency === Currency.ONE) {
    transactionData = (await txService.native.send.transferSignedTransaction({
      fromPrivateKey: privateKey,
      to: address,
      nonce,
      amount,
      fee,
    })) as TransactionHash
  } else {
    fee.gasLimit = '100000'
    let contractAddress: string
    let decimals = 6
    if (BEP20_CURRENCIES.includes(account.currency as Currency)) {
      contractAddress = CONTRACT_ADDRESSES[account.currency]
      decimals = CONTRACT_DECIMALS[account.currency]
    } else {
      const vc = await VirtualCurrencyService.getCurrency(account.currency)
      contractAddress = vc.erc20Address as string
      decimals = (vc.precision as number) || 18
    }

    transactionData = (await txService.erc20.send.transferSignedTransaction({
      amount,
      fee,
      fromPrivateKey: privateKey,
      to: address,
      digits: decimals,
      nonce: body.nonce,
      contractAddress,
    })) as TransactionHash
  }

  const txId = Object.values(transactionData)[0]
  try {
    await WithdrawalService.completeWithdrawal(withdrawalResponse.id as string, txId)
    return { id: withdrawalResponse.id as string, txId }
  } catch (e) {
    console.error(e)
    return { id: withdrawalResponse.id as string, txId, completed: false }
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

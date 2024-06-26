import {
  AccountService,
  ApiServices,
  Currency,
  ERC20_CURRENCIES,
  TransferErc20,
  TransferFantom,
  TransferFantomKMS,
  VirtualCurrencyService,
  WithdrawalService,
} from '@tatumio/api-client'
import {
  abstractBlockchainVirtualAccount,
  PrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { evmBasedUtils, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, CONTRACT_ADDRESSES, CONTRACT_DECIMALS } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { fantomTx } from '../services/fantom.tx'

type TransferVirtualAccountFantom = PrivateKeyOrSignatureId<TransferFantom>
type VirtualAccountResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendFantomVirtualAccountTransaction = async (
  body: TransferVirtualAccountFantom,
  web3: EvmBasedWeb3,
): Promise<VirtualAccountResponse> => {
  const txService = fantomTx({ blockchain: Blockchain.FTM, web3 })
  const { mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal } = body
  const { amount, address } = withdrawal
  let fromPrivKey: string
  let txData: string

  if (body.mnemonic && body.index !== undefined) {
    fromPrivKey = (await evmBasedUtils.generatePrivateKeyFromMnemonic(
      Blockchain.FTM,
      body.mnemonic,
      body.index,
    )) as string
  } else {
    fromPrivKey = body.privateKey as string
  }

  const account = await AccountService.getAccountByAccountId(body.senderAccountId)
  const fee = {
    gasLimit: gasLimit || '21000',
    gasPrice: gasPrice || '20',
  }

  if (account.currency === 'FTM') {
    txData = await txService.native.prepare.transferSignedTransaction({
      amount,
      fromPrivateKey: fromPrivKey,
      fee,
      nonce: body.nonce,
      to: address,
    })
  } else {
    fee.gasLimit = '100000'
    let contractAddress: string
    let decimals: number
    if (ERC20_CURRENCIES.includes(account.currency as Currency)) {
      contractAddress = CONTRACT_ADDRESSES[account.currency]
      decimals = CONTRACT_DECIMALS[account.currency]
    } else {
      const vc = await VirtualCurrencyService.getCurrency(account.currency)
      contractAddress = vc.erc20Address as string
      decimals = (vc.precision as number) || 18
    }
    txData = await txService.erc20.prepare.transferSignedTransaction({
      amount,
      fee,
      fromPrivateKey: fromPrivKey,
      to: address,
      digits: decimals,
      nonce: body.nonce,
      contractAddress,
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
        currency: Currency.FTM,
      })),
      id,
    }
  } catch (e) {
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
     * Send FTM transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountFantom) => {
      if (body.signatureId) {
        const account = await AccountService.getAccountByAccountId(body.senderAccountId)
        if (account.currency === 'FTM') {
          return ApiServices.virtualAccount.blockchain.fantomTransfer(body as TransferFantomKMS)
        } else {
          return ApiServices.virtualAccount.blockchain.fantomTransferErc20(body as TransferErc20)
        }
      } else {
        return await sendFantomVirtualAccountTransaction(body, args.web3)
      }
    },
  }
}

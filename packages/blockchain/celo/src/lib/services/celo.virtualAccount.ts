import {
  AccountService,
  ApiServices,
  Currency,
  TransferCelo,
  TransferCeloKMS,
  VirtualCurrencyService,
  WithdrawalService,
} from '@tatumio/api-client'
import {
  abstractBlockchainVirtualAccount,
  FromPrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { evmBasedUtils, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { CeloFeeCurrency } from '../utils/celo.utils'
import { celoTxService } from './celo.tx'

const CELO_BASED_CURRENCIES = [Currency.CELO.toString(), Currency.CUSD.toString(), Currency.CEUR.toString()]

type TransferVirtualAccountCelo = FromPrivateKeyOrSignatureId<TransferCelo>
type VirtualAccountResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendCeloVirtualAccountTransaction = async (
  body: TransferVirtualAccountCelo,
  web3: EvmBasedWeb3,
  testnet?: boolean,
): Promise<VirtualAccountResponse> => {
  const txService = celoTxService({ blockchain: Blockchain.CELO, web3 })
  const { mnemonic, index, fromPrivateKey, gasLimit, gasPrice, nonce, feeCurrency, ...withdrawal } = body
  const { amount, address } = withdrawal
  let fromPrivKey: string
  let txData: any

  if (mnemonic && index !== undefined) {
    fromPrivKey = (await evmBasedUtils.generatePrivateKeyFromMnemonic(
      Blockchain.CELO,
      mnemonic,
      index,
    )) as string
  } else {
    fromPrivKey = fromPrivateKey as string
  }

  const account = await AccountService.getAccountByAccountId(body.senderAccountId)

  // values from estimateGas endpoint
  const fee = {
    gasLimit: gasLimit || '150000',
    gasPrice: gasPrice || '1',
  }

  if (CELO_BASED_CURRENCIES.includes(account.currency)) {
    txData = await txService.native.prepare.celoOrCUsdSignedTransaction(
      {
        amount,
        fromPrivateKey: fromPrivKey,
        currency: account.currency as CeloFeeCurrency,
        feeCurrency,
        nonce,
        to: address,
        fee: { gasLimit: fee.gasLimit, gasPrice: fee.gasPrice },
      },
      undefined,
      testnet,
    )
  } else {
    const vc = await VirtualCurrencyService.getCurrency(account.currency)
    txData = await txService.erc20.prepare.transferSignedTransaction({
      amount,
      fromPrivateKey: fromPrivKey,
      to: address,
      nonce,
      contractAddress: vc.erc20Address as string,
      feeCurrency,
      chain: 'CELO',
      fee: { gasLimit: fee.gasLimit, gasPrice: fee.gasPrice },
      digits: vc?.precision as number,
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
        currency: Currency.CELO,
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
     * Send Bsc transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountCelo, testnet?: boolean) => {
      if (body.signatureId) {
        return ApiServices.offChain.blockchain.celoOrErc20Transfer(body as TransferCeloKMS)
      } else {
        return await sendCeloVirtualAccountTransaction(body, args.web3, testnet)
      }
    },
  }
}

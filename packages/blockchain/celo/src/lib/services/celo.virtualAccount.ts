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
  PrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { evmBasedUtils, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { celoUtils } from '../utils/celo.utils'
import { celoTxService } from './celo.tx'

type TransferVirtualAccountCelo = PrivateKeyOrSignatureId<TransferCelo>
type VirtualAccountResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendCeloVirtualAccountTransaction = async (
  body: TransferVirtualAccountCelo,
  web3: EvmBasedWeb3,
  testnet?: boolean,
): Promise<VirtualAccountResponse> => {
  const txService = celoTxService({ blockchain: Blockchain.CELO, web3 })
  const { mnemonic, index, privateKey, gasLimit, gasPrice, nonce, feeCurrency, ...withdrawal } = body
  const { amount, address } = withdrawal
  let fromPrivKey: string

  if (mnemonic && index !== undefined) {
    fromPrivKey = await evmBasedUtils.generatePrivateKeyFromMnemonic(Blockchain.CELO, mnemonic, index)
  } else {
    fromPrivKey = privateKey as string
  }

  const account = await AccountService.getAccountByAccountId(body.senderAccountId)

  // values from estimateGas endpoint
  const fee = {
    gasLimit: gasLimit || '150000',
    gasPrice: gasPrice || '1',
  }


    const vc = await VirtualCurrencyService.getCurrency(account.currency)
    const txData = await txService.erc20.prepare.transferSignedTransaction({
      amount,
      fromPrivateKey: fromPrivKey,
      to: address,
      nonce,
      contractAddress: vc.erc20Address as string,
      feeCurrency,
      fee: { gasLimit: fee.gasLimit, gasPrice: fee.gasPrice },
    })


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
     * Send CELO transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @param testnet network
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountCelo, testnet?: boolean) => {
      if (body.signatureId) {
        return ApiServices.virtualAccount.blockchain.celoOrErc20Transfer(body as TransferCeloKMS)
      } else {
        return sendCeloVirtualAccountTransaction(body, args.web3, testnet)
      }
    },
  }
}

import {
  AccountService,
  BlockchainOperationsService,
  Currency,
  TransactionHash,
  TransferSol,
  VirtualCurrencyService,
  Withdrawal,
  WithdrawalService,
} from '@tatumio/api-client'
import { SolanaWeb3 } from './solana.web3'
import { solanaTxService } from './solana.tx'
import {
  abstractBlockchainVirtualAccount,
  PrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

export type Transfer = PrivateKeyOrSignatureId<TransferSol>

const send = async (
  body: Transfer,
  web3: SolanaWeb3,
  testnet = false,
): Promise<{ id: string; txId: string }> => {
  const txService = solanaTxService({ web3 })
  const { privateKey, ...w } = body
  const withdrawal: Withdrawal = w as Withdrawal
  const { amount, address } = withdrawal

  withdrawal.fee = body.fee || '0.000005'
  const account = await AccountService.getAccountByAccountId(withdrawal.senderAccountId)
  let transactionData: TransactionHash
  if (account.currency === Currency.SOL) {
    transactionData = (await txService.send({
      from: body.from,
      to: address,
      amount,
      fromPrivateKey: privateKey,
    })) as TransactionHash
  } else {
    let contractAddress: string
    let decimals = 6
    if (account.currency === Currency.USDC_SOL) {
      contractAddress = testnet
        ? '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
        : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    } else {
      const vc = await VirtualCurrencyService.getCurrency(account.currency)
      contractAddress = vc.erc20Address as string
      decimals = vc.precision as number
    }

    transactionData = (await txService.transferSplToken({
      from: body.from,
      fromPrivateKey: privateKey,
      to: address,
      amount,
      chain: Currency.SOL,
      contractAddress: contractAddress,
      digits: decimals,
    })) as TransactionHash
  }
  const withdrawalResponse = await WithdrawalService.storeWithdrawal(withdrawal)
  const txId = Object.values(transactionData)[0]
  await WithdrawalService.completeWithdrawal(withdrawalResponse.id as string, txId)
  return { id: withdrawalResponse.id as string, txId }
}

export const solanaVirtualAccountTxService = (args: { web3: SolanaWeb3 }) => {
  return {
    /**
     * Transfer SOL from virtual account to blockchain address.
     * @param body body of the request
     */
    ...abstractBlockchainVirtualAccount({ blockchain: Blockchain.SOL }),
    transferFromVirtualAccountToBlockchainAddress: async (body: Transfer) => {
      if (body.signatureId) {
        return BlockchainOperationsService.solTransfer(body as any)
      }
      return send(body, args.web3)
    },
  }
}

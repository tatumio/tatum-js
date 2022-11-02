import {
  AccountService,
  ApiServices,
  Currency,
  TransferEthKMS,
  TransferEth,
  VirtualCurrencyService,
  WithdrawalService,
  ERC20_CURRENCIES,
} from '@tatumio/api-client'
import {
  abstractBlockchainVirtualAccount,
  PrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { evmBasedUtils, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, CONTRACT_ADDRESSES, CONTRACT_DECIMALS } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { polygonTxService } from './polygon.tx'

type TransferVirtualAccountPolygon = PrivateKeyOrSignatureId<TransferEth>
type VirtualAccountResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendPolygonVirtualAccountTransaction = async (
  body: TransferVirtualAccountPolygon,
  web3: EvmBasedWeb3,
): Promise<VirtualAccountResponse> => {
  const txService = polygonTxService({ blockchain: Blockchain.POLYGON, web3 })
  const { mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal } = body
  const { amount, address } = withdrawal
  let fromPrivateKey: string
  let txData: string

  if (mnemonic && index !== undefined) {
    fromPrivateKey = await evmBasedUtils.generatePrivateKeyFromMnemonic(Blockchain.POLYGON, mnemonic, index)
  } else {
    fromPrivateKey = privateKey as string
  }

  const account = await AccountService.getAccountByAccountId(body.senderAccountId)
  const fee = {
    gasLimit: gasLimit || '21000',
    gasPrice: gasPrice || '20',
  }

  if (account.currency === Currency.MATIC) {
    txData = await txService.native.prepare.transferSignedTransaction({
      amount,
      fromPrivateKey,
      fee,
      nonce,
      to: address,
    })
  } else {
    fee.gasLimit = '100000'
    let contractAddress: string
    let digits: number
    if (ERC20_CURRENCIES.includes(account.currency as Currency)) {
      contractAddress = CONTRACT_ADDRESSES[account.currency]
      digits = CONTRACT_DECIMALS[account.currency]
    } else {
      const vc = await VirtualCurrencyService.getCurrency(account.currency)
      contractAddress = vc.erc20Address as string
      digits = (vc.precision as number) || 18
    }
    txData = await txService.erc20.prepare.transferSignedTransaction({
      amount,
      fee,
      fromPrivateKey,
      to: address,
      digits,
      nonce,
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
        currency: Currency.MATIC,
      })),
      id,
    }
  } catch (_) {
    try {
      return await WithdrawalService.cancelInProgressWithdrawal(id!)
    } catch (_) {
      return { id }
    }
  }
}

export const virtualAccountService = (args: { blockchain: Blockchain; web3: EvmBasedWeb3 }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    /**
     * Send Polygon transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountPolygon) => {
      if (body.signatureId) {
        return ApiServices.offChain.blockchain.polygonTransfer(body as TransferEthKMS)
      } else {
        return await sendPolygonVirtualAccountTransaction(body, args.web3)
      }
    },
  }
}

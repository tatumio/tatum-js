import {
  AccountService,
  ApiServices,
  Currency,
  TransferBsc,
  TransferBscKMS,
  VirtualCurrencyService,
  WithdrawalService,
} from '@tatumio/api-client'
import {
  abstractBlockchainOffchain,
  FromPrivateKeyOrSignatureIdOrMnemonic,
} from '@tatumio/shared-blockchain-abstract'
import { evmBasedUtils, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { bscTxService } from './bsc.tx'

type TransferBscOffchain = FromPrivateKeyOrSignatureIdOrMnemonic<TransferBsc>
type OffchainResponse = { id?: string; txId?: string; completed?: boolean } | void

const sendBscOffchainTransaction = async (
  body: TransferBscOffchain,
  web3: EvmBasedWeb3,
): Promise<OffchainResponse> => {
  const txService = bscTxService({ blockchain: Blockchain.BSC, web3 })
  const { mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal } = body as any
  const { amount, address } = withdrawal
  let fromPrivKey: string
  let txData: any

  if (body.mnemonic && body.index !== undefined) {
    fromPrivKey = (await ApiServices.blockchain.bsc.bscGenerateAddressPrivateKey({
      mnemonic: body.mnemonic,
      index: body.index,
    })) as string
  } else {
    fromPrivKey = body.fromPrivateKey as string
  }

  const account = await AccountService.getAccountByAccountId(body.senderAccountId)
  const fee = {
    gasLimit: gasLimit || '21000',
    gasPrice: gasPrice || '20',
  }

  if (account.currency === 'BSC') {
    txData = txService.native.send.transferSignedTransaction({
      amount,
      fromPrivateKey: fromPrivKey,
      fee,
      nonce: body.nonce,
      to: address,
    })
  } else {
    fee.gasLimit = '100000'
    const vc = await VirtualCurrencyService.getCurrency(account.currency)
    txData = await txService.erc20.send.transferSignedTransaction({
      amount,
      fee,
      fromPrivateKey: fromPrivKey,
      to: address,
      digits: 18,
      nonce: body.nonce,
      contractAddress: vc.erc20Address as string,
    })
  }
  // @ts-ignore
  withdrawal.fee = web3
    .getClient()
    .utils.fromWei(
      new BigNumber(fee.gasLimit).multipliedBy(evmBasedUtils.transformToWei(fee.gasPrice, 'gwei')).toString(),
      'ether',
    )
  const { id } = await WithdrawalService.storeWithdrawal(withdrawal)

  try {
    return {
      ...(await WithdrawalService.broadcastBlockchainTransaction({
        txData,
        withdrawalId: id,
        currency: Currency.BSC,
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

export const bscOffchainService = (args: { blockchain: Blockchain; web3: EvmBasedWeb3 }) => {
  return {
    ...abstractBlockchainOffchain(args),
    /**
     * Send Bsc transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferBscOffchain) => {
      if (body.signatureId) {
        return ApiServices.offChain.blockchain.bscOrBepTransfer(body as TransferBscKMS)
      } else {
        return await sendBscOffchainTransaction(body, args.web3)
      }
    },
  }
}

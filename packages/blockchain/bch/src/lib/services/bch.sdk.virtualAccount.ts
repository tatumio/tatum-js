import {
  ApiServices,
  Currency,
  ResponseData,
  TransferBchKeyPair,
  TransferBchKMS,
  TransferBchMnemonic,
  Withdrawal,
} from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { BchSdkError } from '../bch.sdk.errors'
import { btcBasedWalletUtils } from '@tatumio/shared-blockchain-btc-based'
// @ts-ignore
import * as BitcoinCashJS from '@tatumio/bitcoincashjs2-lib'
import { TransactionBuilder } from 'bitcoinjs-lib'
// @ts-ignore
import * as coininfo from 'coininfo'
import bchaddr from 'bchaddrjs'

interface KeyPair {
  address: string
  privateKey: string
}

const addOutputAddressValue = (transactionBuilder: TransactionBuilder, address: string, value: number) => {
  transactionBuilder.addOutput(bchaddr.toLegacyAddress(address), value)
}

const prepareTransaction = async (
  data: ResponseData[],
  out: string,
  amount: string,
  credentials: {
    mnemonic?: string
    xpub?: string
    keyPair?: KeyPair[]
    attr?: string
  },
  isTestnet: boolean,
  multipleAmounts?: string[],
): Promise<string> => {
  const { mnemonic, keyPair, xpub, attr: changeAddress } = credentials
  const network = isTestnet
    ? coininfo.bitcoincash.test.toBitcoinJS()
    : coininfo.bitcoincash.main.toBitcoinJS()
  const transactionBuilder = new BitcoinCashJS.TransactionBuilder(network)

  for (const input of data) {
    if (input.vIn !== '-1') {
      transactionBuilder.addInput(input.vIn, input.vInIndex)
    }
  }

  const lastVin = data.find((d) => d.vIn === '-1')
  if (multipleAmounts?.length) {
    for (const [i, multipleAmount] of multipleAmounts.entries()) {
      addOutputAddressValue(
        transactionBuilder,
        out.split(',')[i],
        Number(new BigNumber(multipleAmount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
      )
    }
  } else {
    addOutputAddressValue(
      transactionBuilder,
      out,
      Number(new BigNumber(amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)),
    )
  }

  if (!lastVin) {
    throw new BchSdkError(SdkErrorCode.BTC_BASED_TX_PREPARATION_UTXO)
  }
  const value = Number(
    new BigNumber(lastVin.amount || -1).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR),
  )

  try {
    if (xpub) {
      addOutputAddressValue(
        transactionBuilder,
        btcBasedWalletUtils(Blockchain.BCH).generateAddressFromXPub(xpub, 0, { testnet: isTestnet }),
        value,
      )
    } else if (changeAddress) {
      addOutputAddressValue(transactionBuilder, changeAddress, value)
    } else {
      throw new BchSdkError(SdkErrorCode.BTC_BASED_MNEMONIC_OR_KEYPAIR_EXPECTED)
    }
  } catch (e) {
    throw new BchSdkError(SdkErrorCode.BTC_BASED_TX_FAILED)
  }

  if (value < 0) {
    console.log(`Wrong amount for BCH virtual account amount.`)
    throw new BchSdkError(SdkErrorCode.BTC_BASED_DESTINATION_LESS_THAN_ZERO)
  }

  try {
    for (const [i, input] of data.entries()) {
      // when there is no address field present, input is pool transfer to 0
      if (input.vIn === '-1') {
        continue
      }
      if (!input.amount) {
        console.log(`Missing amount preparing BCH virtual account transaction.`)
        throw new BchSdkError(SdkErrorCode.BTC_BASED_TX_FAILED)
      }
      const value = Number(
        new BigNumber(input.amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR),
      )
      if (mnemonic) {
        const privateKey = await btcBasedWalletUtils(Blockchain.BCH).generatePrivateKeyFromMnemonic(
          mnemonic,
          input.address && input.address.derivationKey ? input.address.derivationKey : 0,
          { testnet: isTestnet },
        )
        const ecPair = BitcoinCashJS.ECPair.fromWIF(privateKey, network)
        transactionBuilder.sign(
          i,
          ecPair,
          undefined,
          0x01,
          value,
          undefined,
          BitcoinCashJS.ECSignature.SCHNORR,
        )
      } else if (keyPair) {
        // @ts-ignore
        const privateKey = keyPair.find((k) => k.address === input.address.address)
        if (privateKey) {
          const ecPair = BitcoinCashJS.ECPair.fromWIF(privateKey.privateKey, network)

          transactionBuilder.sign(
            i,
            ecPair,
            undefined,
            0x01,
            value,
            undefined,
            BitcoinCashJS.ECSignature.SCHNORR,
          )
        }
      }
    }

    return transactionBuilder.build().toHex()
  } catch (e) {
    throw new BchSdkError(SdkErrorCode.BTC_BASED_BLOCKCHAIN_ERROR)
  }
}

const sendBchVirtualAccountTransaction = async (
  body: TransferBchMnemonic | TransferBchKeyPair,
  isTestnet: boolean,
) => {
  const withdrawal: Withdrawal = body as Withdrawal
  if (!withdrawal.fee) {
    withdrawal.fee = '0.00005'
  }

  const { id, data } = await ApiServices.virtualAccount.withdrawal.storeWithdrawal(withdrawal)

  if (!data) {
    throw new BchSdkError(SdkErrorCode.BTC_BASED_TX_FAILED)
  }

  const { amount, address } = withdrawal

  const prepareTx = async () =>
    await prepareTransaction(
      data,
      address,
      amount,
      {
        mnemonic: 'mnemonic' in body ? body.mnemonic : undefined,
        xpub: 'xpub' in body ? body.xpub : undefined,
        keyPair: 'keyPair' in body ? Object.assign(body.keyPair, [] as KeyPair[]) : undefined,
        attr: 'keyPair' in body ? body.attr : undefined,
      },
      isTestnet,
      body.multipleAmounts,
    )
  try {
    const txPrepared = await prepareTx()
    return {
      ...(await ApiServices.virtualAccount.withdrawal.broadcastBlockchainTransaction({
        txData: txPrepared,
        withdrawalId: id,
        currency: Currency.BCH,
      })),
    }
  } catch (e) {
    console.error(e)
    try {
      if (typeof id !== 'string') {
        console.log('Missing withdrawal ID')
        throw e
      }
      await ApiServices.virtualAccount.withdrawal.cancelInProgressWithdrawal(id)
    } catch (e1) {
      console.log(e)
      return { id }
    }
    throw e
  }
}

export const virtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    send: async (isTestnet: boolean, body: TransferBchMnemonic | TransferBchKeyPair | TransferBchKMS) => {
      if ('signatureId' in body) {
        return ApiServices.virtualAccount.blockchain.bchTransfer(body)
      } else {
        return await sendBchVirtualAccountTransaction(body, isTestnet)
      }
    },
  }
}

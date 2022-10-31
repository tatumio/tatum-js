import { BnbApiCallsType } from '../../index'
import { ApiServices, Currency, TransferBnb } from '@tatumio/api-client'
import { BncClient } from '@binance-chain/javascript-sdk'
import { BigNumber } from 'bignumber.js'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { decodeAddress, getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { AminoPrefix } from '@binance-chain/javascript-sdk/lib/types'
import { BnbSdkError } from '../bnb.sdk.errors'

export const bnbTxService = (apiCalls: BnbApiCallsType) => {
  const getMsgData = (
    amount: string,
    key: string,
    address: string,
    currency: string,
    testnet: boolean,
    from?: string,
  ) => {
    const fromAddress = from || getAddressFromPrivateKey(key, testnet ? 'tbnb' : 'bnb')
    const accCode = decodeAddress(fromAddress)
    const toAccCode = decodeAddress(address)
    const coin = {
      denom: currency,
      amount: Math.round(new BigNumber(amount).multipliedBy(new BigNumber(10).pow(8)).toNumber()),
    }

    return {
      fromAddress,
      msg: {
        inputs: [
          {
            address: accCode,
            coins: [coin],
          },
        ],
        outputs: [
          {
            address: toAccCode,
            coins: [coin],
          },
        ],
        aminoPrefix: AminoPrefix.MsgSend,
      },
      signMsg: {
        inputs: [
          {
            address: fromAddress,
            coins: [coin],
          },
        ],
        outputs: [
          {
            address,
            coins: [coin],
          },
        ],
      },
    }
  }

  const sendTransaction = async (
    body: TransferBnb,
    options: { testnet: boolean; token?: string; issuerAccount?: string },
  ) => {
    return ApiServices.blockchain.bnb.bnbBroadcast({
      txData: await prepareTransaction(
        body.amount,
        body.address,
        Currency.BNB,
        body.fromPrivateKey,
        options.testnet,
      ),
    })
  }

  const prepareTransaction = async (
    amount: string,
    address: string,
    currency: string,
    key: string,
    testnet: boolean,
    memo?: string,
    signatureId?: string,
    withdrawalId?: string,
    from?: string,
  ): Promise<string> => {
    const { fromAddress, msg, signMsg } = getMsgData(amount, key, address, currency, testnet, from)
    return signBnbTx(testnet, key, fromAddress, msg, signMsg, amount, memo)
  }

  const signBnbTx = async (
    testnet: boolean,
    key: string,
    fromAddress: string,
    msg: any,
    signMsg: any,
    amount: string,
    memo?: string,
    provider?: string,
  ) => {
    try {
      const bnbClient = new BncClient(
        provider
          ? provider
          : testnet
          ? 'https://testnet-dex-atlantic.binance.org'
          : 'https://dex-european.binance.org',
      )
      bnbClient.chooseNetwork(testnet ? 'testnet' : 'mainnet')
      await bnbClient.setPrivateKey(key, true)
      await bnbClient.initChain()
      const account = await apiCalls.getAccountInfo(fromAddress)
      const balance = account.balances?.find((b) => b.symbol && b.symbol.toUpperCase() === 'BNB')
      const accountBalance = new BigNumber(balance?.free || 0)
      const fee = 0.000075
      const requiredBalance = new BigNumber(amount).plus(fee)

      if (accountBalance.isLessThan(requiredBalance)) {
        throw new BnbSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds to create transaction from sender account ${account} -> available balance is ${accountBalance.toString()}, required balance is ${requiredBalance.toString()}.`,
        )
      }
      bnbClient.setAccountNumber(account.account_number || 0)
      const signedTx = await bnbClient._prepareTransaction(msg, signMsg, fromAddress, account.sequence, memo)
      return signedTx.serialize()
    } catch (e) {
      if ((e as any).code === SdkErrorCode.INSUFFICIENT_FUNDS) {
        throw e
      }
      throw new BnbSdkError(SdkErrorCode.TX_PREPARATION_FAILED)
    }
  }

  return {
    prepareTransaction,
    sendTransaction,
    getMsgData,
    signBnbTx,
  }
}

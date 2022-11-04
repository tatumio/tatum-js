import { BnbApiCallsType } from '../../index'
import { ApiServices, Currency, OpenAPI, TransferBnbBlockchain } from '@tatumio/api-client'
import { BncClient } from '@binance-chain/javascript-sdk'
import { BigNumber } from 'bignumber.js'
import { SDKArguments, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { decodeAddress, getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { AminoPrefix } from '@binance-chain/javascript-sdk/lib/types'
import { BnbSdkError } from '../bnb.sdk.errors'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'

type TransferBnb = FromPrivateKeyOrSignatureId<TransferBnbBlockchain>

export const bnbTxService = (args: SDKArguments, apiCalls: BnbApiCallsType) => {
  /**
   * Parses data which will be used in the transaction
   * @param amount amount to send
   * @param key private key to sign with
   * @param address blockchain address where the token should be sent
   * @param currency transaction currency
   * @param testnet mainnet or testnet version
   * @param from address from which to send
   * @returns transaction data (fromAddress, msg, signMsg) to be prepared for signing
   */
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

  /**
   * Send BNB transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * @param body content of the transaction to broadcast
   * @param options mainnet or testnet version
   * @returns transaction id of the transaction in the blockchain
   */
  const sendTransaction = async (body: TransferBnb, options: { testnet: boolean }) => {
    if (body.signatureId) {
      return ApiServices.blockchain.bnb.bnbBlockchainTransfer(body as any)
    } else {
      return ApiServices.blockchain.bnb.bnbBroadcast({
        txData: await prepareTransaction(
          body.amount,
          body.to,
          Currency.BNB,
          body.fromPrivateKey as string,
          options.testnet,
        ),
      })
    }
  }

  /**
   * Sign BNB transaction with private keys locally. Nothing is broadcast to the blockchain.
   * @param amount amount to send
   * @param address blockchain address where the token should be sent
   * @param currency transaction currency
   * @param key private key to sign with
   * @param testnet mainnet or testnet version
   * @param memo transaction memo
   * @param signatureId signature id to sign with
   * @param withdrawalId id of the withdrawal transaction
   * @param from address from which to send
   * @returns transaction data to be broadcast to blockchain
   */
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

  /**
   *
   * @param testnet mainnet or testnet version
   * @param key private key to sign with
   * @param fromAddress address from which to send
   * @param msg data from the getMsgData function
   * @param signMsg data from the getMsgData function
   * @param amount amount to send
   * @param memo transaction memo
   * @param provider
   * @returns transaction id of the transaction in the blockchain
   */
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
      const bnbClient = new BncClient(OpenAPI.BASE + '/v3/blockchain/node/BNB/' + args.apiKey)

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

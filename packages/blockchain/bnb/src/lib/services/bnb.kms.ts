import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { BnbBeaconChainService, Currency, PendingTransaction } from '@tatumio/api-client'
import { getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BnbSdkError } from '../bnb.sdk.errors'
import { BnbWeb3 } from './bnb.web3'

export const bnbKmsService = (args: { web3: BnbWeb3 }) => {
  /**
   * @param tx pending transaction data
   * @param fromPrivateKey private key to be signed with
   * @param testnet mainnet or testnet version
   * @param provider
   * @returns signed transaction to be sent to the blockchain
   */
  const signBnbKMSTransaction = async (
    tx: PendingTransaction,
    fromPrivateKey: string,
    testnet: boolean,
    provider?: string,
  ) => {
    if (tx.chain !== Currency.BNB) {
      throw new BnbSdkError(SdkErrorCode.KMS_CHAIN_MISMATCH)
    }

    const bnbClient = await args.web3.getClient(testnet, fromPrivateKey, provider)
    const fromAddress = getAddressFromPrivateKey(fromPrivateKey, testnet ? 'tbnb' : 'bnb')
    const account = await BnbBeaconChainService.bnbGetAccount(fromAddress)
    bnbClient.setAccountNumber(account.account_number || 0)
    const { msg, signMsg, memo } = JSON.parse(tx.serializedTransaction)
    msg.inputs = msg.inputs.map((i: any) => {
      i.address = Buffer.from(i.address.data)
      return i
    })
    msg.outputs = msg.outputs.map((i: any) => {
      i.address = Buffer.from(i.address.data)
      return i
    })
    const signedTx = await bnbClient._prepareTransaction(msg, signMsg, fromAddress, account.sequence, memo)
    return signedTx.serialize()
  }

  return {
    ...abstractBlockchainKms,
    sign: signBnbKMSTransaction,
  }
}

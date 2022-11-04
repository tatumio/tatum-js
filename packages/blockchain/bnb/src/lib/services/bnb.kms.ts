import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { BnbBeaconChainService, Currency, PendingTransaction } from '@tatumio/api-client'
import { BncClient } from '@binance-chain/javascript-sdk'
import { getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BnbSdkError } from '../bnb.sdk.errors'

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
  const bnbClient = new BncClient(
    provider
      ? provider
      : testnet
      ? 'https://testnet-dex-atlantic.binance.org'
      : 'https://dex-european.binance.org',
  )
  bnbClient.chooseNetwork(testnet ? 'testnet' : 'mainnet')
  await bnbClient.setPrivateKey(fromPrivateKey, true)
  await bnbClient.initChain()
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

export const bnbKmsService = () => {
  return {
    ...abstractBlockchainKms,
    sign: signBnbKMSTransaction,
  }
}

import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

const REPLACE = 'REPLACE'

const isAddressSet = (address: string) => {
  return address === REPLACE
}

export async function xlmBalanceExample() {
  const fundedAddress = 'REPLACE'

  if (isAddressSet(fundedAddress)) {
    // Generate XLM address and secret
    // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
    const { address, secret } = xlmSDK.wallet.wallet()
    console.log(`=================`)
    console.log(`Generated address: ${address}`)
    console.log(`>> Please fund it from https://laboratory.stellar.org/#account-creator?network=testnet`)
    console.log(`>> Set funded address to const 'fundedAddress' and rerun example`)
    console.log(`=================`)
    return
  }

  console.log(`Address to check balance: ${fundedAddress}`)

  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetAccountInfo
  const accountDetails = await xlmSDK.blockchain.getAccountInfo(fundedAddress)

  // We need to divide the balance by 1_000_000, because the balance is in stroops.
  console.log(
    `Account ${fundedAddress} has ${
      Number(accountDetails.balances ? accountDetails.balances[0].balance : 0) / 1000000
    } XLM.`,
  )
}

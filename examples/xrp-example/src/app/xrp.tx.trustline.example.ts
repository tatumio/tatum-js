import { TatumXrpSDK } from '@tatumio/xrp'
import { TransactionHash } from '@tatumio/api-client'

export const xrpTxTrustlineExample = async () => {
  const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate XRP address and secret
  // https://apidoc.tatum.io/tag/XRP#operation/XrpWallet
  const { address, secret } = xrpSDK.wallet.wallet()
  console.log(`My public address: ${address}`)
  console.log(`My private key: ${secret}`)

  const { address: recipientAddress } = xrpSDK.wallet.wallet()
  console.log(`Recipient address: ${recipientAddress}`)

  // FUND YOUR AND RECIPIENT ACCOUNT WITH XRP FROM https://yusufsahinhamza.github.io/xrp-testnet-faucet/ for 50 XRP
  // Set generated accounts and secrets to consts below

  const fundedAddress = 'rhFAJJmJZZ9pkMBCXVrsqri2C2azJm9G5A'
  const fundedSecret = 'ss82SYF2U74jAdPjSP78s77WirdPg'
  const fundedRecipientAddress = 'rHAJYcw7jf2EdxjHV65uxJTG4uujALu1q'

  console.log(`Used public address: ${fundedAddress}`)
  console.log(`Used private key: ${fundedSecret}`)
  console.log(`Used recipientAddress: ${fundedRecipientAddress}`)

  // Get account information
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetAccountInfo
  const accountDetails = await xrpSDK.blockchain.getAccountInfo(fundedAddress)

  // We need to divide the balance by 1_000_000, because the balance is in drops.
  console.log(`My account has ${Number(accountDetails.account_data?.Balance as string) / 1_000_000} XRP.`)

  // Send trustline transaction
  // https://apidoc.tatum.io/tag/XRP#operation/XrpTrustLineBlockchain
  const { txId } = (await xrpSDK.transaction.sendTrustlineTransaction({
    fromAccount: fundedAddress,
    fromSecret: fundedSecret,
    limit: '1',
    issuerAccount: fundedRecipientAddress,
    token: prepareTokenHex(),
  })) as TransactionHash
  console.log(`Transaction with ID ${txId} was sent.`)
}

function prepareTokenHex() {
  const hex = '0123456789ABCDEF'
  let output = ''
  for (let i = 0; i < 40; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length))
  }
  return output
}

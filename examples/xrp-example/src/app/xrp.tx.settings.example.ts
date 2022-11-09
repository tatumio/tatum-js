import { TatumXrpSDK } from '@tatumio/xrp'
import { TransactionHash } from '@tatumio/api-client'

export const xrpTxAccountSettingsExample = async () => {
  const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate XRP address and secret
  // https://apidoc.tatum.io/tag/XRP#operation/XrpWallet
  const { address, secret } = xrpSDK.wallet.wallet()
  console.log(`My public address: ${address}`)
  console.log(`My private key: ${secret}`)

  // FUND YOUR ACCOUNT WITH XRP FROM https://yusufsahinhamza.github.io/xrp-testnet-faucet/ for 50 XRP
  // Set generated accounts and secrets to consts below

  const fundedAddress = '<PUT ADDRESS HERE>'
  const fundedSecret = '<PUT SECRET HERE>'

  // Get account information
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetAccountInfo
  const accountDetails = await xrpSDK.blockchain.getAccountInfo(fundedAddress)
  // We need to divide the balance by 1_000_000, because the balance is in drops.
  console.log(`My account has ${Number(accountDetails.account_data?.Balance as string) / 1_000_000} XRP.`)

  // Send transaction for account settings
  // https://apidoc.tatum.io/tag/XRP#operation/XrpAccountSettings
  const { txId } = (await xrpSDK.transaction.sendAccountSettingsTransaction({
    fromAccount: fundedAddress,
    fromSecret: fundedSecret,
    rippling: true,
  })) as TransactionHash
  console.log(`Transaction with ID ${txId} was sent.`)
}

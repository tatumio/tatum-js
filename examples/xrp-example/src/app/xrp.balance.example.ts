import { TatumXrpSDK } from '@tatumio/xrp'

export const xrpBalanceExample = async () => {
  const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate XRP address and secret
  // https://apidoc.tatum.io/tag/XRP#operation/XrpWallet
  const { address, secret } = xrpSDK.wallet.wallet()

  console.log(`Generated address: ${address}`)
  console.log(`>> Please fund it from https://yusufsahinhamza.github.io/xrp-testnet-faucet/`)
  console.log(`>> Set funded address to const 'fundedAddress' and rerun example`)

  // FUND YOUR ACCOUNT WITH XRP FROM https://yusufsahinhamza.github.io/xrp-testnet-faucet/
  // Set your account as const below

  const fundedAddress = '<PUT ADDRESS HERE>'

  // Get account information
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetAccountInfo
  const accountDetails = await xrpSDK.blockchain.getAccountInfo(fundedAddress)
  // We need to divide the balance by 1_000_000, because the balance is in drops.
  console.log(
    `My account ${fundedAddress} has ${Number(accountDetails.account_data?.Balance) / 1000000} XRP.`,
  )
}

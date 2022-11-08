import { TatumXrpSDK } from '@tatumio/xrp'

export const accountBalanceExample = async () => {
  const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { address, secret } = xrpSDK.wallet.wallet()
  console.log(`My public address is ${address}, with private key ${secret}.`)

  // FUND YOUR ACCOUNT WITH XRP FROM https://yusufsahinhamza.github.io/xrp-testnet-faucet/

  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetAccountInfo
  const accountDetails = await xrpSDK.blockchain.getAccountInfo(address)
  // We need to divide the balance by 1_000_000, because the balance is in drops.
  console.log(`My account has ${Number(accountDetails.account_data?.Balance) / 1000000} XRP.`)
}

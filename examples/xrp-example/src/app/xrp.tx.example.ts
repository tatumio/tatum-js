import { TatumXrpSDK } from '@tatumio/xrp'

// TODO: create asset transfer example + trustline example
export const txExample = async () => {
  const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { address, secret } = xrpSDK.wallet.wallet()
  console.log(`My public address is ${address}, with private key ${secret}.`)

  const { address: to } = xrpSDK.wallet.wallet()
  // FUND YOUR ACCOUNT WITH XRP FROM https://xrpl.org/tx-sender.html

  const accountDetails = await xrpSDK.blockchain.getAccountInfo(address)
  // We need to divide the balance by 1_000_000, because the balance is in drops.
  console.log(`My account has ${Number(accountDetails.account_data?.Balance as string) / 1_000_000} XRP.`)

  // https://apidoc.tatum.io/tag/Stellar#operation/XrpTransferBlockchain
  const { txId } = await xrpSDK.transaction.sendTransaction({
    fromAccount: address,
    fromSecret: secret,
    amount: '1',
    to: to,
  })
  console.log(`Transaction with ID ${txId} was sent.`)
}

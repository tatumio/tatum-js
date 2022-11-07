import { TatumKcsSDK } from '@tatumio/kcs'
import { Currency } from '@tatumio/api-client'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function kcsSubscriptionsExample() {
  // Generate KCS wallet
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateWallet
  const { xpub } = await kcsSDK.wallet.generateWallet()

  // Generate public address from xpub
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateAddress
  const address = kcsSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}`)

  // Generate new virtual account for ALGO with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await kcsSDK.ledger.account.create({
    currency: Currency.KCS,
  })
  console.log(`Virtual account`, virtualAccount)

  // Assign a blockchain address to a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const depositAddress = await kcsSDK.virtualAccount.depositAddress.assign(virtualAccount.id, address)
  console.log(`Deposit address is ${depositAddress.address}`)

  // Create a new subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const { id } = await kcsSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: virtualAccount.id,
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })

  console.log(`Subscription id: ${id}`)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await kcsSDK.subscriptions.getSubscriptions(10)
  console.log('Subscriptions: ', subscriptions)

  //https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await kcsSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await kcsSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await kcsSDK.subscriptions.deleteSubscription(id as string)
}

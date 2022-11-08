import { TatumCeloSDK } from '@tatumio/celo'
import { Currency } from '@tatumio/api-client'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoSubscriptionsExample() {
  // Generate CELO wallet
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateWallet
  const { xpub } = await celoSDK.wallet.generateWallet(undefined, { testnet: true })

  // Generate public address from xpub
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddress
  const address = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}`)

  // Generate new virtual account for ALGO with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await celoSDK.ledger.account.create({
    currency: Currency.CELO,
  })
  console.log(`Virtual account`, virtualAccount)

  // Assign a blockchain address to a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const depositAddress = await celoSDK.virtualAccount.depositAddress.assign(virtualAccount.id, address)
  console.log(`Deposit address is ${depositAddress.address}`)

  // Create a new subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const { id } = await celoSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: virtualAccount.id,
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })

  console.log(`Subscription id: ${id}`)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await celoSDK.subscriptions.getSubscriptions(10)
  console.log('Subscriptions: ', subscriptions)

  //https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await celoSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await celoSDK.subscriptions.disableWebHookHmac()

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await celoSDK.subscriptions.deleteSubscription(id as string)
}

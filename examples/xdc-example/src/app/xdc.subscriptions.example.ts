import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcSubscriptionsExample() {
  // Generate a XinFin account.
  // You will use the xpub of this account to generate a virtual account.
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateWallet
  const { mnemonic, xpub } = await xdcSDK.wallet.generateWallet(undefined, { testnet: true })

  // Generate a virtual account for XDC based on the xpub of the XinFin account that you created in the previous step.
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await xdcSDK.ledger.account.create({
    currency: 'XDC',
    xpub: xpub,
  })

  // Create a subscription for the virtual account.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const id = await xdcSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: virtualAccount.id,
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })

  // List all active subscriptions.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await xdcSDK.subscriptions.getSubscriptions(10)
  console.log(`Subscriptions ${JSON.stringify(subscriptions)}`)

  // Enable HMAC for the fired notifications.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  await xdcSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // Disable HMAC.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await xdcSDK.subscriptions.disableWebHookHmac()

  // Cancel an existing subscription.
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await xdcSDK.subscriptions.deleteSubscription(id.id as string)
}

import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcSubscriptionsExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateWallet
  const { mnemonic, xpub } = await xdcSDK.wallet.generateWallet(undefined, { testnet: true })

  // Generate new virtual account for XDC with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await xdcSDK.ledger.account.create({
    currency: 'XDC',
    xpub: xpub,
  })

  // Create a new subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription
  const id = await xdcSDK.subscriptions.createSubscription({
    type: 'ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION',
    attr: {
      id: virtualAccount.id,
      url: 'https://dashboard.tatum.io/webhook-handler',
    },
  })

  // List all active subscriptions
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/getSubscriptions
  const subscriptions = await xdcSDK.subscriptions.getSubscriptions(10)
  console.log(`Subscriptions ${JSON.stringify(subscriptions)}`)

  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/enableWebHookHmac
  // Enable HMAC hash ID on the fired webhooks from Tatum API. In order to make sure that a
  // webhook is sent by us, we have the possibility to sign it with the HMAC Sha512 Hex algorithm.
  await xdcSDK.subscriptions.enableWebHookHmac({
    hmacSecret: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  // Disable Webhook HMAC
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/disableWebHookHmac
  await xdcSDK.subscriptions.disableWebHookHmac()

  // Cancel an existing subscription
  // https://apidoc.tatum.io/tag/Notification-subscriptions#operation/deleteSubscription
  await xdcSDK.subscriptions.deleteSubscription(id.id as string)
}

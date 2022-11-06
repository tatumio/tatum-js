import { TatumBnbSDK } from '@tatumio/bnb'
import { Currency } from '@tatumio/api-client'

const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bnbVirtualAccountExample() {
  const { address, privateKey } = await bnbSDK.wallet.generateWallet(true)
  const { address: to } = await bnbSDK.wallet.generateWallet(true)

  console.log(`My public address is ${address}, with private key ${privateKey}.`)

  // Generate new virtual account for BNB with specific blockchain address
  // Each BNB virtual account must have MEMO field generated - take a look here for more details - https://docs.tatum.io/guides/ledger-and-off-chain/how-to-set-up-virtual-accounts-with-xrp-bnb-and-xlm
  // No MEMO is created with this operation, only virtual account
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await bnbSDK.ledger.account.create({
    currency: Currency.BNB,
    xpub: address,
  })
  console.log(JSON.stringify(virtualAccount))

  // we need to generate MEMO - which is a deposit address - for this virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await bnbSDK.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(JSON.stringify(depositAddress))
  // Result of the operation is combination of deposit address and MEMO
  console.log(`Deposit address is ${depositAddress.address} with MEMO ${depositAddress.derivationKey}`)

  // // FUND YOUR ACCOUNT WITH BNB ACCORDING TO: https://docs.bnbchain.org/docs/wallet/binance/

  // I want to send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/BnbTransfer
  const result = await bnbSDK.virtualAccount.sendTransactionFromVirtualAccountToBlockchain(true, {
    senderAccountId: virtualAccount.id,
    amount: '0.001',
    address: to,
    attr: 'OPTIONAL_RECIPIENT_MEMO',
    fromPrivateKey: privateKey,
  })

  console.log(JSON.stringify(result))
}

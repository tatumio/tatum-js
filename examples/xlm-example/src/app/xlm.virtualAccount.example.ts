import { TatumXlmSDK } from '@tatumio/xlm'
import { Currency } from '@tatumio/api-client'

export async function xlmVirtualAccountExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const { address, secret } = xlmSDK.wallet.wallet()
  const { address: toAddress } = xlmSDK.wallet.wallet()
  console.log(`My public address is ${address}, with private key ${secret}.`)

  // Generate new virtual account for XLM with specific blockchain address
  // Each XLM virtual account must have MEMO field generated - take a look here for more details - https://docs.tatum.io/guides/ledger-and-off-chain/how-to-set-up-virtual-accounts-with-xrp-bnb-and-xlm
  // No MEMO is created with this operation, only virtual account
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await xlmSDK.ledger.account.create({
    currency: Currency.XLM,
    xpub: address,
  })
  console.log(JSON.stringify(virtualAccount))

  // we need to generate MEMO - which is a deposit address - for this virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await xlmSDK.virtualAcount.depositAddress.create(virtualAccount.id)

  console.log(JSON.stringify(depositAddress))
  // Result of the operation is combination of deposit address and MEMO
  console.log(`Deposit address is ${depositAddress.address} with MEMO ${depositAddress.derivationKey}`)

  // FUND YOUR ACCOUNT WITH XLM FROM https://laboratory.stellar.org/#account-creator?network=testnet

  // I wanna send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/XlmTransfer
  const result = await xlmSDK.virtualAcount.sendTransactionFromVirtualAccountToBlockchain(true, {
    fee: '0.00001',
    senderAccountId: virtualAccount.id,
    amount: '1',
    address: toAddress,
    attr: 'OPTIONAL_RECIPIENT_MEMO',
    secret: secret,
  })

  console.log(JSON.stringify(result))
}

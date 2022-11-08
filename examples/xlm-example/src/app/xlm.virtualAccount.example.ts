import { TatumXlmSDK } from '@tatumio/xlm'
import { Currency } from '@tatumio/api-client'
import { isAddressSet, REPLACE } from './xlm.balance.example'

export async function xlmVirtualAccountExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const virtualAccountAddress = REPLACE
  const virtualAccountSecret = REPLACE

  const virtualAccountId = REPLACE

  const fundedDepositAddress = REPLACE
  const fundedDepositAddressMemo = REPLACE

  if (isAddressSet(virtualAccountAddress)) {
    // Generate XLM address and secret
    // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
    const { address, secret } = xlmSDK.wallet.wallet()
    console.log(`=================`)
    console.log(`Generated address: ${address}`)
    console.log(`Generated secret: ${secret}`)
    console.log(`>> Set address to const 'virtualAccountAddress'`)
    console.log(`>> Set secret to const 'virtualAccountSecret' and rerun example`)
    console.log(`=================`)
    return
  }

  // Generate new virtual account for XLM with specific blockchain address
  // Each XLM virtual account must have MEMO field generated - take a look here for more details - https://docs.tatum.io/guides/ledger-and-off-chain/how-to-set-up-virtual-accounts-with-xrp-bnb-and-xlm
  // No MEMO is created with this operation, only virtual account
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await xlmSDK.ledger.account.create({
    currency: Currency.XLM,
    xpub: virtualAccountAddress,
  })
  console.log('Virtual account:', JSON.stringify(virtualAccount))

  if (isAddressSet(virtualAccountId)) {
    console.log(`=================`)
    console.log(`Virtual account id: ${virtualAccountId}`)
    console.log(`>> Set virtual account id to const 'virtualAccountId'`)
    console.log(`=================`)
    return
  }

  const createdVirtualAccount = await xlmSDK.ledger.account.get(virtualAccountId)

  // We need to generate MEMO - which is a deposit address - for this virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await xlmSDK.virtualAccount.depositAddress.create(createdVirtualAccount.id)

  console.log('Deposit address information:', JSON.stringify(depositAddress))

  // Result of the operation is combination of deposit address and MEMO
  console.log(`Deposit address is ${depositAddress.address} with MEMO ${depositAddress.derivationKey}`)

  if (isAddressSet(fundedDepositAddress)) {
    console.log(`=================`)
    console.log(`Generated deposit address: ${depositAddress.address}`)
    console.log(`MEMO for deposit address: ${depositAddress.derivationKey}`)
    console.log(`>> Set deposit address to const 'fundedDepositAddress'`)
    console.log(`>> Set secret of address to const 'fundedDepositAddressMemo' and rerun example`)
    console.log(`=================`)
    return
  }

  // Generate recipient XLM address and secret
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
  const { address: recipientAddress, secret } = xlmSDK.wallet.wallet()

  // I want to send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/XlmTransfer
  const result = await xlmSDK.virtualAccount.sendTransactionFromVirtualAccountToBlockchain(true, {
    fee: '0.00001',
    senderAccountId: virtualAccount.id,
    amount: '1',
    address: recipientAddress,
    attr: 'OPTIONAL_RECIPIENT_MEMO',
    secret: secret,
  })

  console.log('Tx was sent:', JSON.stringify(result))
}

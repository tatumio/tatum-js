import { TatumXrpSDK } from '@tatumio/xrp'
import { Currency, XrpWallet } from '@tatumio/api-client'

export const virtualAccountExample = async () => {
  const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const { address, secret } = xrpSDK.wallet.wallet() as XrpWallet
  const { address: destinationAddress } = xrpSDK.wallet.wallet() as XrpWallet
  console.log(`My public address is ${address}, with private key ${secret}.`)

  // Generate new virtual account for XRP with specific blockchain address
  // Each XRP virtual account must have MEMO field generated - take a look here for more details - https://docs.tatum.io/guides/ledger-and-off-chain/how-to-set-up-virtual-accounts-with-xrp-bnb-and-xrp
  // No MEMO is created with this operation, only virtual account
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await xrpSDK.ledger.account.create({
    currency: Currency.XRP,
    xpub: address,
  })
  console.log(JSON.stringify(virtualAccount))

  // we need to generate MEMO - which is a deposit address - for this virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await xrpSDK.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(JSON.stringify(depositAddress))
  // Result of the operation is combination of deposit address and MEMO
  console.log(`Deposit address is ${depositAddress.address} with MEMO ${depositAddress.derivationKey}`)

  // FUND YOUR ACCOUNT WITH XRP FROM https://yusufsahinhamza.github.io/xrp-testnet-faucet/

  // I want to send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/XrpTransfer
  const result = await xrpSDK.virtualAccount.sendTransactionFromVirtualAccountToBlockchain({
    senderAccountId: virtualAccount.id,
    amount: '1',
    fee: '0.0001',
    address: destinationAddress,
    attr: 'OPTIONAL_RECIPIENT_DESTINATION_TAG',
    account: address,
    secret: secret,
  })

  console.log(JSON.stringify(result))
}

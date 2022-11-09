import { TatumXrpSDK } from '@tatumio/xrp'
import { Currency, XrpWallet } from '@tatumio/api-client'
import { sleep } from '@tatumio/shared-abstract-sdk'

export const xrpVirtualAccountExample = async () => {
  // Since it is allowed to have only one xpub for memo-based for api key, it is needed to use your own api key here
  const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate XRP address and secret
  // https://apidoc.tatum.io/tag/XRP#operation/XrpWallet
  const { address, secret } = xrpSDK.wallet.wallet() as XrpWallet

  console.log(`My public address: ${address}`)
  console.log(`My private key: ${secret}`)

  // Generate new virtual account for XRP with specific blockchain address
  // Each XRP virtual account must have MEMO field generated - take a look here for more details - https://docs.tatum.io/guides/ledger-and-off-chain/how-to-set-up-virtual-accounts-with-xrp-bnb-and-xrp
  // No MEMO is created with this operation, only virtual account
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await xrpSDK.ledger.account.create({
    currency: Currency.XRP,
    xpub: address,
  })
  console.log('Virtual account:', JSON.stringify(virtualAccount))
  console.log('Virtual account id:', virtualAccount.id)

  // Get account by id
  // https://apidoc.tatum.io/tag/Account#operation/getAccountByAccountId
  const virtualAccountId = virtualAccount.id
  const generatedVirtualAccount = await xrpSDK.ledger.account.get(virtualAccountId)

  // We need to generate MEMO - which is a deposit address - for this virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await xrpSDK.virtualAccount.depositAddress.create(generatedVirtualAccount.id)

  console.log('Deposit address', JSON.stringify(depositAddress))

  // Result of the operation is combination of deposit address and MEMO
  console.log(`Deposit address: ${depositAddress.address} with MEMO ${depositAddress.derivationKey}`)

  const { address: recipientAddress } = xrpSDK.wallet.wallet() as XrpWallet
  console.log(`Recipient address: ${recipientAddress}`)

  // FUND YOUR DEPOSIT ADDRESS USING ADDRESS AND MEMO WITH XRP FROM https://yusufsahinhamza.github.io/xrp-testnet-faucet/
  // FUND YOUR RECIPIENT ADDRESS USING ADDRESS WITH XRP FROM https://yusufsahinhamza.github.io/xrp-testnet-faucet/
  console.log(
    `Fund address ${depositAddress.address} and MEMO ${depositAddress.derivationKey} from https://yusufsahinhamza.github.io/xrp-testnet-faucet/ `,
  )
  console.log(`Fund address ${recipientAddress} from https://yusufsahinhamza.github.io/xrp-testnet-faucet/ `)

  console.log(`Waiting for funding ...`)
  await sleep(180000)

  // I want to send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/XrpTransfer
  const result = await xrpSDK.virtualAccount.sendTransactionFromVirtualAccountToBlockchain({
    senderAccountId: generatedVirtualAccount.id,
    amount: '1',
    fee: '0.0001',
    address: recipientAddress,
    attr: '1', //optional destination tag
    account: address,
    secret: secret,
  })

  console.log(JSON.stringify(result))
}

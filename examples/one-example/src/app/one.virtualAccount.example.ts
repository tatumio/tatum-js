import { Currency } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
export async function oneVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateWallet
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet(undefined, { testnet: true })
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddressPrivateKey
  const privateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })

  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddress
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for ONE with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await oneSDK.ledger.account.create({
    currency: Currency.ONE,
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await oneSDK.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // FUND YOUR ACCOUNT WITH ONE FROM https://faucet.pops.one/

  // I wanna send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/OneTransfer
  const result = await oneSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    privateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}

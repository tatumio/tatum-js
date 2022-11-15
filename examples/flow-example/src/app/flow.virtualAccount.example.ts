import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab', testnet: true })

export async function flowVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateWallet
  const { mnemonic, xpub } = await flowSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGeneratePubKeyPrivateKey
  const fromPrivateKey = await flowSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateAddress
  const { address: to } = (await flowSDK.blockchain.generateAddress(xpub, 1)) as {
    address: string
  }
  console.log(`To address: ${to}`)

  // Generate new virtual account for FLOW with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await flowSDK.ledger.account.create({
    currency: 'FLOW',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await flowSDK.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // FUND YOUR ADDRESS
  console.log(`Fund me ${depositAddress.address} to send transaction from virtual account to blockchain!`)

  // I wanna send FLOW from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/FlowTransfer
  const result = await flowSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    account: depositAddress.address,
    privateKey: fromPrivateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}

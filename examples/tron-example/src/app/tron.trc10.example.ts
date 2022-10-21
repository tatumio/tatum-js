import { TatumTronSDK } from '@tatumio/tron'
import { TransactionHash } from '@tatumio/api-client'

const tronSdk = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronTrc10Example() {
  const { mnemonic, xpub } = await tronSdk.wallet.generateWallet()
  const fromPrivateKey = await tronSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = tronSdk.wallet.generateAddressFromXPub(xpub, 0)
  const to = tronSdk.wallet.generateAddressFromXPub(xpub, 1)

  // create trc10 token
  // https://apidoc.tatum.io/tag/Tron#operation/TronCreateTrc10
  const trc10Created = (await tronSdk.trc10.send.createSignedTransaction({
    fromPrivateKey,
    recipient: address,
    name: 'My token',
    abbreviation: 'SYM',
    description: 'My short description',
    url: 'https://mytoken.com',
    totalSupply: 100000,
    decimals: 10,
  })) as TransactionHash

  console.log(`Created trc10 token with transaction ID ${trc10Created.txId}`)

  // transfer trc10 token
  // https://apidoc.tatum.io/tag/Tron#operation/TronTransferTrc10

  // tokenId can be retreived from the explorer using the transaction hash from creation of token
  // explorer: https://shasta.tronscan.org
  const tokenId = '1000538'

  const trc10Transffered = (await tronSdk.trc10.send.signedTransaction({
    fromPrivateKey,
    to,
    tokenId,
    amount: '1',
  })) as TransactionHash

  console.log(`Trc10 transaction with transaction ID ${trc10Transffered.txId} was sent.`)
}

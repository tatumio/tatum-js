import { TatumTronSDK } from '@tatumio/tron'
import { TransactionHash } from '@tatumio/api-client'
import { sleep } from '@tatumio/shared-abstract-sdk'

const tronSdk = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronTrc10Example() {
  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://twitter.com/TronTest2
  const address = '<PUT YOUR ADDRESS HERE>'
  const fromPrivateKey = '<PUT YOUR PRIVATE KEY HERE>'

  const { xpub } = await tronSdk.wallet.generateWallet()
  const to = tronSdk.wallet.generateAddressFromXPub(xpub, 0)

  // create trc10 token
  // https://apidoc.tatum.io/tag/Tron#operation/TronCreateTrc10
  // NOTE: An address can only issue one asset
  const trc10Created = (await tronSdk.trc10.send.createSignedTransaction({
    fromPrivateKey,
    recipient: address,
    name: 'myToken',
    abbreviation: 'SYM',
    description: 'My short description',
    url: 'https://mytoken.com',
    totalSupply: 100000,
    decimals: 2,
  })) as TransactionHash

  console.log(`Created trc10 token with transaction ID ${trc10Created.txId}`)
  console.log(`Waiting 120 seconds for the transaction [${trc10Created.txId}] to appear in a block`)
  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  await sleep(120_000)

  // https://apidoc.tatum.io/tag/Tron#operation/TronTrc10Detail
  const trc10Details = await tronSdk.blockchain.getTrc10Detail(address)
  const tokenId = (trc10Details.id as number).toString()
  console.log(`Deployed TRC10 smart contract token id: ${tokenId}`)

  // transfer trc10 token
  // https://apidoc.tatum.io/tag/Tron#operation/TronTransferTrc10
  const trc10Transffered = (await tronSdk.trc10.send.signedTransaction({
    fromPrivateKey,
    to,
    tokenId,
    amount: '1',
  })) as TransactionHash

  console.log(`Trc10 transaction with transaction ID ${trc10Transffered.txId} was sent.`)
}

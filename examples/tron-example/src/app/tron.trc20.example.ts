import { TatumTronSDK } from '@tatumio/tron'
import { TransactionHash } from '@tatumio/api-client'

const tronSdk = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronTrc20Example() {
  const { mnemonic, xpub } = await tronSdk.wallet.generateWallet()
  const fromPrivateKey = await tronSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = tronSdk.wallet.generateAddressFromXPub(xpub, 0)
  const to = tronSdk.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://twitter.com/TronTest2

  // create trc20 token
  // https://apidoc.tatum.io/tag/Tron#operation/TronCreateTrc20
  const trc20Created = (await tronSdk.trc20.send.createSignedTransaction({
    symbol: 'TRC_SYMBOL',
    name: 'myTrc20',
    recipient: address,
    fromPrivateKey,
    decimals: 10,
    totalSupply: 10000000,
  })) as TransactionHash

  console.log(`Created trc20 token with transaction ID ${trc20Created.txId}`)

  // Please note that tokens might not appear immediately on the blockchain so in order to execute
  // all examples at once you should set some timeout between the calls or execute examples separately

  // transfer trc20 token
  // https://apidoc.tatum.io/tag/Tron#operation/TronTransferTrc20
  const trc20Transffered = (await tronSdk.trc20.send.signedTransaction({
    to,
    amount: '10',
    fromPrivateKey,
    tokenAddress: address,
    feeLimit: 600,
  })) as TransactionHash

  console.log(`Trc20 transaction with transaction ID ${trc20Transffered.txId} was sent.`)

  // Get TRC-20 transactions for a TRON account.
  // https://apidoc.tatum.io/tag/Tron#operation/TronAccountTx20
  const trc20Transactions = await tronSdk.blockchain.getTrc20Transactions(address)

  console.log(`Trc20 transactions for ${address}: ${trc20Transactions}`)
}

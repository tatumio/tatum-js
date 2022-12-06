import { TatumTronSDK } from '@tatumio/tron'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleep } from '@tatumio/shared-abstract-sdk'

const tronSdk = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronTrc20Example() {
  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://twitter.com/TronTest2
  const address = '<PUT YOUR ADDRESS HERE>'
  const fromPrivateKey = '<PUT YOUR PRIVATE KEY HERE>'

  const { xpub } = await tronSdk.wallet.generateWallet()
  const to = tronSdk.wallet.generateAddressFromXPub(xpub, 0)

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
  console.log(`Waiting 120 seconds for the transaction [${trc20Created.txId}] to appear in a block`)
  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  await sleep(120_000)

  // find deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transactionData = await tronSdk.blockchain.smartContractGetAddress(Currency.TRON, trc20Created.txId)
  const tokenAddress = transactionData.contractAddress as string
  console.log(`Deployed TRC20 smart contract address: ${tokenAddress}`)

  // Please note that tokens might not appear immediately on the blockchain so in order to execute
  // all examples at once you should set some timeout between the calls or execute examples separately

  // https://apidoc.tatum.io/tag/Tron#operation/TronGetAccount
  const { trc20 } = await tronSdk.blockchain.getAccount(address)
  const balanceItem = ((trc20 as any[]) || []).find((e) => {
    const [token] = Object.keys(e)
    return token === tokenAddress
  })
  const balance = balanceItem ? Object.values(balanceItem)[0] : -1
  console.log(`Balance TRC20 token(s): ${tokenAddress} for address ${address} is ${balance}`)

  // transfer trc20 token
  // https://apidoc.tatum.io/tag/Tron#operation/TronTransferTrc20
  const trc20Transffered = (await tronSdk.trc20.send.signedTransaction({
    to,
    amount: '10',
    fromPrivateKey,
    tokenAddress,
    feeLimit: 600,
  })) as TransactionHash

  console.log(`Trc20 transaction with transaction ID ${trc20Transffered.txId} was sent.`)
  console.log(`Waiting 120 seconds for the transaction [${trc20Transffered.txId}] to appear in a block`)
  await sleep(120_000)

  // Get TRC-20 transactions for a TRON account.
  // https://apidoc.tatum.io/tag/Tron#operation/TronAccountTx20
  const trc20Transactions = await tronSdk.blockchain.getTrc20Transactions(address)

  console.log(`Trc20 transactions for ${address}`)
  console.log(JSON.stringify(trc20Transactions))
}

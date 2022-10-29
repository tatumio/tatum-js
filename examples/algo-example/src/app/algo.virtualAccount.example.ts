import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency } from '@tatumio/api-client'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function algoVirtualAccountExample() {
  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const privateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // Generate new virtual account for ALGO with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await algoSDK.ledger.account.create({
    currency: Currency.ALGO,
  })
  console.log(JSON.stringify(virtualAccount))

  // Assign a blockchain address to a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const depositAddress = await algoSDK.virtualAccount.depositAddress.assign(virtualAccount.id, address)
  console.log(`Deposit address is ${depositAddress.address}`)

  // FUND YOUR DEPOSIT ADDRESS WITH ALGOs FROM https://bank.testnet.algorand.network/

  const balance = await algoSDK.ledger.account.getBalance(virtualAccount.id)
  console.log(`Virtual account balance is: ${JSON.stringify(balance)}`)

  // Get list of all incoming transactions from virtual account
  // https://apidoc.tatum.io/tag/Transaction#operation/getTransactionsByAccountId
  const transactions = await algoSDK.ledger.transaction.getAllByAccount({ id: virtualAccount.id })
  console.log(`Transactions are ${JSON.stringify(transactions)}`)

  // I will send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/AlgoTransfer
  const result = await algoSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    privateKey,
    account: address,
    address: to,
    fee: '0.001',
  })
  console.log(JSON.stringify(result))
}

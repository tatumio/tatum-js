import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency } from '@tatumio/api-client'

export async function algoVirtualAccountExample() {
  const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate two Algorand accounts: one to associate with a virtual account (A1) and the other one to receive ALGO from the virtual account (A2).
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const privateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // Generate a virtual account for ALGO.
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await algoSDK.ledger.account.create({
    currency: Currency.ALGO,
  })
  console.log(JSON.stringify(virtualAccount))

  // Assign the blockchain address of the account that you created earlier (A1) to the virtual account.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const depositAddress = await algoSDK.virtualAccount.depositAddress.assign(virtualAccount.id, address)
  console.log(`Deposit address is ${depositAddress.address}`)

  // Fund the assigned address with ALGO using https://bank.testnet.algorand.network/.
  // Get the balance of the virtual account.
  // https://apidoc.tatum.io/tag/Account#operation/getAccountBalance
  const balance = await algoSDK.ledger.account.getBalance(virtualAccount.id)
  console.log(`Virtual account balance is: ${JSON.stringify(balance)}`)

  // Get the list of all incoming transactions from the virtual account.
  // https://apidoc.tatum.io/tag/Transaction#operation/getTransactionsByAccountId
  const transactions = await algoSDK.ledger.transaction.getAllByAccount({ id: virtualAccount.id }, 10)
  console.log(`Transactions are ${JSON.stringify(transactions)}`)

  // Send some amount of ALGO from the virtual account to the account that you created earlier (A2).
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/AlgoTransfer
  const result = await algoSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    privateKey,
    address: to,
    fee: '0.001',
  })
  console.log(JSON.stringify(result))
}

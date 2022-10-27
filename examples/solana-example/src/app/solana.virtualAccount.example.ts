import { TatumSolanaSDK } from '@tatumio/solana'
import { Currency } from '@tatumio/api-client'

const solanaSdk = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://docs.tatum.io/guides/ledger-and-off-chain/how-to-use-ledger-accounts
 * https://apidoc.tatum.io/tag/Account#operation/createAccount
 */
export async function solanaVirtualAccountExample() {
  // Create new blockchain address
  const { address, privateKey } = solanaSdk.wallet.wallet()
  console.log(`My address is ${address} with private key is ${privateKey}`)

  // Create new blockchain address for recipient
  const { address: recipientAddress } = solanaSdk.wallet.wallet()
  console.log(`Recipient address is ${recipientAddress}`)

  // We need to create virtual account
  const account = await solanaSdk.ledger.account.create({ currency: Currency.SOL })
  console.log(`Virtual account created: ${JSON.stringify(account)}`)

  // We need to assign deposit address to virtual account to enable automatic synchronization of all incoming transactions
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const assignedAddress = await solanaSdk.offchain.depositAddress.assign(account.id, address)
  console.log(`Assigned address: ${JSON.stringify(assignedAddress)}`)

  // Let's fund our virtual account from faucet and list all incoming transactions
  // https://apidoc.tatum.io/tag/Transaction#operation/getTransactionsByAccountId
  // https://solfaucet.com/
  const transactions = await solanaSdk.ledger.transaction.getAllByAccount({ id: account.id }, 50)
  console.log(`My transactions are ${JSON.stringify(transactions)}`)

  // Lets send some SOL from virtual account to another blockchain address
  console.log(
    await solanaSdk.virtualAccount.transferFromVirtualAccountToBlockchainAddress({
      senderAccountId: account.id,
      address: recipientAddress,
      amount: '0.001',
      from: address,
      privateKey,
    }),
  )
}

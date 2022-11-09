import { TatumXlmSDK } from '@tatumio/xlm'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { isValueSet, REPLACE } from './xlm.utils'
import { sleep } from '@tatumio/shared-abstract-sdk'

export async function xlmVirtualAccountExample() {
  // Since it is allowed to have only one xpub for memo-based for api key, it is needed to use your own api key here
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const fundingAddress = REPLACE
  const fundingSecret = REPLACE

  const virtualAccountAddress = REPLACE
  const virtualAccountSecret = REPLACE

  const virtualAccountId = REPLACE

  // To show usecase with virtual account let's prepare funding account. We will send transactions from it to our virtual account
  if (isValueSet(fundingAddress)) {
    // Generate XLM address and secret
    // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
    const { address, secret } = xlmSDK.wallet.wallet()
    console.log(`=================`)
    console.log(`Generated 'funding' address: ${address}`)
    console.log(`Generated 'funding' secret: ${secret}`)
    console.log(`>> Please fund address from https://laboratory.stellar.org/#account-creator?network=testnet`)
    console.log(`>> Set 'funding' address to const 'fundingAddress'`)
    console.log(`>> Set 'funding' secret to const 'fundingSecret' and rerun example`)
    console.log(`=================`)
    return
  }

  // Now it is needed to generate address for virtual account, it will be created on its basis
  if (isValueSet(virtualAccountAddress)) {
    // Generate XLM address and secret
    // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
    const { address, secret } = xlmSDK.wallet.wallet()
    console.log(`=================`)
    console.log(`Generated virtual account address: ${address}`)
    console.log(`Generated virtual account secret: ${secret}`)
    console.log(`>> Set address to const 'virtualAccountAddress'`)
    console.log(`>> Set secret to const 'virtualAccountSecret' and rerun example`)
    console.log(`=================`)
    return
  }

  // Generate new virtual account for XLM with specific blockchain address
  // Each XLM virtual account must have MEMO field generated - take a look here for more details - https://docs.tatum.io/guides/ledger-and-off-chain/how-to-set-up-virtual-accounts-with-xrp-bnb-and-xlm
  // No MEMO is created with this operation, only virtual account

  if (isValueSet(virtualAccountId)) {
    // https://apidoc.tatum.io/tag/Account#operation/createAccount
    const virtualAccount = await xlmSDK.ledger.account.create({
      currency: Currency.XLM,
      xpub: virtualAccountAddress,
    })
    console.log('Virtual account:', JSON.stringify(virtualAccount))

    console.log(`=================`)
    console.log(`Virtual account id: ${virtualAccount.id}`)
    console.log(`>> Set virtual account id to const 'virtualAccountId' and rerun example`)
    console.log(`=================`)
    return
  }

  // Fetch created account
  // https://apidoc.tatum.io/tag/Account#operation/getAccountByAccountId
  const createdVirtualAccount = await xlmSDK.ledger.account.get(virtualAccountId)

  // Generate recipient XLM address and secret - funds will be transferred to
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
  const { address: recipientAddress, secret } = xlmSDK.wallet.wallet()

  // Send transaction from 'funding' address to virtual account address to activate it
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmTransferBlockchain
  const { txId: activateTxId1 } = (await xlmSDK.transaction.sendTransaction(
    {
      fromAccount: fundingAddress,
      fromSecret: fundingSecret,
      amount: '10',
      to: virtualAccountAddress,
      initialize: true,
    },
    { testnet: true },
  )) as TransactionHash
  console.log(`Waiting for activation tx ${activateTxId1}...`)
  await sleep(10000)

  // Send transaction from 'funding' address to recipient address to activate it
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmTransferBlockchain
  const { txId: activateTxId2 } = (await xlmSDK.transaction.sendTransaction(
    {
      fromAccount: fundingAddress,
      fromSecret: fundingSecret,
      amount: '10',
      to: recipientAddress,
      initialize: true,
    },
    { testnet: true },
  )) as TransactionHash
  console.log(`Waiting for activation tx ${activateTxId2}...`)
  await sleep(10000)

  // We need to generate MEMO - which is a deposit address - for this virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await xlmSDK.virtualAccount.depositAddress.create(createdVirtualAccount.id)
  console.log('Deposit address with MEMO:', JSON.stringify(depositAddress))

  // Result of the operation is combination of deposit address and MEMO
  console.log(`Deposit address is ${depositAddress.address} with MEMO ${depositAddress.derivationKey}`)

  // Send transaction from 'funding' address to deposit address of virtual account - deposit virtual account
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmTransferBlockchain
  const { txId: depositTxId } = (await xlmSDK.transaction.sendTransaction(
    {
      fromAccount: fundingAddress,
      fromSecret: fundingSecret,
      amount: '5',
      to: depositAddress.address,
      message: depositAddress.derivationKey?.toString(),
    },
    { testnet: true },
  )) as TransactionHash

  console.log(`Waiting for funding tx ${depositTxId}...`)
  await sleep(60000)

  // I want to send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/XlmTransfer
  const result = await xlmSDK.virtualAccount.sendTransactionFromVirtualAccountToBlockchain(true, {
    fee: '0.00001',
    senderAccountId: createdVirtualAccount.id,
    amount: '1',
    address: recipientAddress,
    attr: 'OPTIONAL_RECIPIENT_MEMO',
    secret: virtualAccountSecret,
  })

  console.log('Transfer from virtual account was sent:', JSON.stringify(result))
}

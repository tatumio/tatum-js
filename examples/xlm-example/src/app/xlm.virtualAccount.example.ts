import { TatumXlmSDK } from '@tatumio/xlm'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { isValueSet, REPLACE } from './xlm.utils'
import { sleep } from '@tatumio/shared-abstract-sdk'

export async function xlmVirtualAccountExample() {
  // Because one API key can have only one extended public key (xpub) on a memo-based blockchain, you have to use your own API key here.
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const fundingAddress = REPLACE
  const fundingSecret = REPLACE

  const virtualAccountAddress = REPLACE
  const virtualAccountSecret = REPLACE

  const virtualAccountId = REPLACE

  // To demonstrate a use case for virtual accounts, let's first prepare a funding Stellar account. You will be transferring funds from this funding account to your virtual account.
  if (isValueSet(fundingAddress)) {
    // Generate a Stellar account.
    // The account address and secret will be generated.
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

  // Generate another Stellar account.
  // You will use the xpub of this account to generate a virtual account.
  if (isValueSet(virtualAccountAddress)) {
    // Generate a Stellar account.
    // The account address and secret will be generated.
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

  // Generate a virtual account for XLM based on the xpub of the Stellar account that you created in the previous step.
  // https://apidoc.tatum.io/tag/Account#operation/createAccount 
  if (isValueSet(virtualAccountId)) {
  
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

  // Fetch the created virtual account.
  // https://apidoc.tatum.io/tag/Account#operation/getAccountByAccountId
  const createdVirtualAccount = await xlmSDK.ledger.account.get(virtualAccountId)

  // Generate another Stellar account.
  // This is the recipient account where you are going to transfer funds from your virtual account to.
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet
  const { address: recipientAddress, secret } = xlmSDK.wallet.wallet()

  try {
    // (OPTIONAL) If needed, send some amount of XLM from the funding account to the virtual account to activate it.
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
    await sleep(20000)
  } catch (e) {
    console.log(`Virtual account address ${virtualAccountAddress} was already activated`)
  }

 // Send some amount of XLM from the funding account to the recipient account to activate it.
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
  await sleep(20000)

  // Generate a deposit address with a "memo" for the virtual account.
  // An XLM virtual account must have a "memo" field generated. For more details, check out this article https://docs.tatum.io/guides/ledger-and-off-chain/how-to-set-up-virtual-accounts-with-xrp-bnb-and-xlm.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await xlmSDK.virtualAccount.depositAddress.create(createdVirtualAccount.id)
  console.log('Deposit address with MEMO:', JSON.stringify(depositAddress))

  // This operation returns a combination of the deposit address and the "memo".
  console.log(`Deposit address is ${depositAddress.address} with MEMO ${depositAddress.derivationKey}`)

  // Send some amount of XLM from the funding account to the deposit address of the virtual account.
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
  await sleep(120000)

  // Send some amount of XLM from the virtual account to the recipient account.
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

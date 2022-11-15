import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const xrpBlockchainExample = async () => {
  // Get current latest ledger number
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetLastClosedLedger
  const currentLedger = await xrpSDK.blockchain.info()
  console.log(`Current ledger is ${currentLedger.ledger_index}.`)

  // Get fee for XRP from blockchain
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetFee
  const fee = await xrpSDK.blockchain.getFee()
  console.log(`Current fee is ${JSON.stringify(fee)} XRP.`)

  // Get account transactions
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetAccountTx
  const txByAccount = await xrpSDK.blockchain.getAccountTx('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')
  console.log(`Account has ${txByAccount.transactions?.length || 0} transactions.`)

  // Get ledger information
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetLedger
  const ledger = await xrpSDK.blockchain.getLedger(32683000)
  console.log(`Ledger with index 32683000 has these details ${JSON.stringify(ledger)}`)

  // Get transaction information
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetTransaction
  const tx = await xrpSDK.blockchain.getTransaction(
    'ACACFAD37D24F06506FFEB5AF16B0DF16DEF52974AC5AB5EA4378385A04DB8DF',
  )
  console.log(
    `Transaction with ID ACACFAD37D24F06506FFEB5AF16B0DF16DEF52974AC5AB5EA4378385A04DB8DF has these details ${JSON.stringify(
      tx,
    )}`,
  )

  // Get account information
  // https://apidoc.tatum.io/tag/XRP#operation/XrpGetAccountInfo
  const account = await xrpSDK.blockchain.getAccountInfo('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')
  console.log(
    `Account with address rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF has these details ${JSON.stringify(account)}`,
  )
}

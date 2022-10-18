import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export const blockchainOperationsExample = async () => {
  // Get current latest ledger number
  const currentLedger = await xrpSDK.blockchain.info()
  console.log(`Current ledger is ${currentLedger.ledger_index}.`)

  const fee = await xrpSDK.blockchain.getFee()
  console.log(`Current fee is ${fee} XRP.`)

  const txByAccount = await xrpSDK.blockchain.getAccountTx('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')
  console.log(`Account has ${txByAccount.transactions?.length || 0} transactions.`)

  const ledger = await xrpSDK.blockchain.getLedger(5)
  console.log(`Ledger with index 5 has these details ${ledger}`)

  const tx = await xrpSDK.blockchain.getTx('1A32A054B04AC9D6814710DDCA416E72C4CD2D78D6C3DFC06CC9369CC4F6B250')
  console.log(
    `Transaction with ID 1A32A054B04AC9D6814710DDCA416E72C4CD2D78D6C3DFC06CC9369CC4F6B250 has these details ${tx}`,
  )

  const account = await xrpSDK.blockchain.getAccountInfo('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')
  console.log(`Account with address rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF has these details ${account}`)
}

import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpBlockchainExample() {
  const broadcastTxId = await xrpSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
  })

  const info = await xrpSDK.blockchain.info()

  const fee = await xrpSDK.blockchain.getFee()

  const transactions = await xrpSDK.blockchain.getAccountTx('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')

  const ledger = await xrpSDK.blockchain.getLedger(5)

  const tx = await xrpSDK.blockchain.getTx('1A32A054B04AC9D6814710DDCA416E72C4CD2D78D6C3DFC06CC9369CC4F6B250')

  const account = await xrpSDK.blockchain.getAccountInfo('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')

  const balance = await xrpSDK.blockchain.getAccountBalance('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')

  const txResult = await xrpSDK.blockchain.sendTransaction({
    fromSecret: 'shunwft7BwrFHdcXmAA87CazLsRMY',
    fee: '0.00001',
    amount: '1',
    fromAccount: 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N',
    to: 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N',
  })
}

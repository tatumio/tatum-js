import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpApiExample() {
  const wallet = await xrpSDK.api.xrpWallet()

  const broadcastTxId = await xrpSDK.api.xrpBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
  })

  const info = await xrpSDK.api.xrpGetLastClosedLedger()

  const fee = await xrpSDK.api.xrpGetFee()

  const transactions = await xrpSDK.api.xrpGetAccountTx('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')

  const ledger = await xrpSDK.api.xrpGetLedger(5)

  const tx = await xrpSDK.api.xrpGetTransaction(
    '1A32A054B04AC9D6814710DDCA416E72C4CD2D78D6C3DFC06CC9369CC4F6B250',
  )

  const account = await xrpSDK.api.xrpGetAccountInfo('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')

  const balance = await xrpSDK.api.xrpGetAccountBalance('rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF')

  const transferTxId = await xrpSDK.api.xrpTransferBlockchain({
    fromAccount: 'rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV',
    to: 'rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF',
    amount: '1000',
    fromSecret: 'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
  })

  const trustLineTxId = await xrpSDK.api.xrpTrustLineBlockchain({
    fromAccount: 'rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV',
    issuerAccount: 'rsP3mgGb2tcYUrxiLFiHJiQXhsziegtwBc',
    limit: '1000',
    token: 'DA39A3EE5E6B4B0D3255BFEF95601890AFD80709',
    fromSecret: 'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
  })

  const modifyAccountTxId = await xrpSDK.api.xrpAccountSettings({
    fromAccount: 'rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV',
    fromSecret: 'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
  })
}

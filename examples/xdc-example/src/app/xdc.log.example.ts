import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcLogRecordExample() {
  const { txId } = await xdcSDK.record.storeLog({
    data: 'record',
    fromPrivateKey: 'PRIVATE KEY',
  })

  // @TODO OPENAPI BUG - only ETH
  const { data } = await xdcSDK.record.getLog(txId)
}

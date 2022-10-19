import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcDriverExample() {
  const web3response = await xdcSDK.httpDriver({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })
}

export async function xdcWeb3Example() {
  const gasPriceInWei = await xdcSDK.getGasPriceInWei()
  const web3 = xdcSDK.web3Client()
}

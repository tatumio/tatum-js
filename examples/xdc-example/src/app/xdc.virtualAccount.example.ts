import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSdk = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcVirtualAccountExample() {
  const account = await xdcSdk.virtualAccount.depositAddress.checkExists(
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  const address = await xdcSdk.virtualAccount.depositAddress.create(
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
    1,
  )
  const adresses = await xdcSdk.virtualAccount.depositAddress.createMultiple({
    addresses: [
      {
        accountId: '5e6be8e9e6aa436299950c41',
        derivationKey: 0,
      },
      {
        accountId: '5e6be8e9e6aa436299951n35',
        derivationKey: 1,
      },
    ],
  })
  const assignedAddress = await xdcSdk.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  const addressByAccount = await xdcSdk.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  const withdrawals = await xdcSdk.virtualAccount.withdrawal.getAll('Done')
  await xdcSdk.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  await xdcSdk.virtualAccount.storeTokenAddress('0xa7673161CbfE0116A4De9E341f8465940c2211d4', 'MY_TOKEN')
}

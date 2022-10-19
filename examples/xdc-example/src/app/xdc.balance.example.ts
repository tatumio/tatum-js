import { TatumXdcSDK } from '@tatumio/xdc'

export async function xdcBalanceExample() {
  const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { mnemonic } = await xdcSDK.wallet.generateWallet()

  const address = xdcSDK.wallet.generateAddressFromXPub(mnemonic, 0)

  const web3 = xdcSDK.web3Client()
  const balance = await web3.eth.getBalance(address)

  console.log(`My account has ${web3.utils.fromWei(balance)} xdc.`)
}

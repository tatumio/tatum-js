import { TatumXdcSDK } from '@tatumio/xdc'

export async function xdcBalanceExample() {
  const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await xdcSDK.wallet.generateWallet(undefined, { testnet: true })

  const address = xdcSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`My public address is ${address}.`)

  // Fund the XinFin account with XDC using https://faucet.apothem.network/.
  // Get information about the account.
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetBalance
  const { balance } = await xdcSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${balance} xdc.`)
}

import { TatumXdcSDK } from '@tatumio/xdc'
import Web3 from 'web3'

export async function xdcBalanceExample() {
  const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await xdcSDK.wallet.generateWallet()

  const address = xdcSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH XDC FROM https://faucet.apothem.network/

  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetBalance
  const { balance } = await xdcSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`My account has ${balance} xdc.`)
}

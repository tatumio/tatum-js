import { TatumXdcSDK } from '@tatumio/xdc'
import Web3 from 'web3'

export async function xdcBalanceExample() {
  const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { mnemonic } = await xdcSDK.wallet.generateWallet()

  const address = xdcSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH BNB FROM https://testnet.binance.org/faucet-smart

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetBalance

  const balance = await xdcSDK.blockchain.getBlockchainAccountBalance(address)
  if (balance) {
    console.log(`My account has ${Web3.utils.fromWei(balance as string)} xdc.`)
  }
}

xdcBalanceExample()
  .then(() => {
    console.log('Exit!')
  })
  .catch((err) => console.error(err))

import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethWalletExample() {
  const { mnemonic, xpub } = await ethSDK.wallet.generateWallet()

  const address = ethSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await ethSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = ethSDK.wallet.generateAddressFromXPub(xpub, 0)
}

export async function ethApiExample() {
  const block = await ethSDK.api.ethGetBlock(
    '0x1cfbae5efa5993977808a5c6d852d1114009354b3029d9bee283ea58e3bbebf7',
  )
}

import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldWalletExample() {
  const walletWithoutMnemonic = await egldSDK.wallet.generateWallet()

  const walletWithMnemonic = await egldSDK.wallet.generateWallet(
    'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
  )

  const privateKey = await egldSDK.wallet.generatePrivateKeyFromMnemonic(
    true,
    'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
    5,
  )

  const address = await egldSDK.wallet.generateAddress(
    true,
    'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
    5,
  )
}

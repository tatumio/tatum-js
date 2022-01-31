import { TatumSDK } from '@tatumio/tatum'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function walletExample() {
  const newWallet = tatumSDK.wallet.generateBlockchainWallet(Currency.BTC, TEST_DATA.MNEMONIC, {
    testnet: true,
  })

  const addressFromXPub = tatumSDK.wallet.generateAddressFromXPub(
    Currency.BTC,
    TEST_DATA.BTC.MAINNET.XPUB,
    0,
    {
      testnet: true,
    },
  )

  const privateKeyFromMnemonic = tatumSDK.wallet.generatePrivateKeyFromMnemonic(
    Currency.BTC,
    TEST_DATA.MNEMONIC,
    0,
    { testnet: true },
  )

  const addressFromPrivateKey = tatumSDK.wallet.generateAddressFromPrivateKey(
    Currency.BTC,
    TEST_DATA.BTC.TESTNET.PRIVATE_KEY_0,
    { testnet: true },
  )
}

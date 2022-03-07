import { TatumFlowSDK } from '@tatumio/flow'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function flowWalletExample() {
  const wallet = await flowSDK.wallet.generateWallet()
  const addressFromPrivKEy = flowSDK.wallet.generateAddressFromPrivateKey(
    'cTmS2jBWXgFaXZ2xG9jhn67TiyTshnMp3UedamzEhGm6BZV1vLgQ',
  )
  const addressFromXPub = flowSDK.wallet.generateAddressFromXPub(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )
  const privKey = await flowSDK.wallet.generatePrivateKeyFromMnemonic(
    'urge pulp usage sister evidence arrest palm math please chief egg abuse',
    0,
  )
}

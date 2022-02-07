import { TatumTronSDK } from '@tatumio/tron'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronApiExample() {
  const broadcastHash = await tronSDK.api.tronBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    // TODO: OpenAPI bug
    // signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const privateKey = await tronSDK.api.tronGenerateAddressPrivateKey({
    index: 0,
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  })

  const address = await tronSDK.api.tronGenerateAddress(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )
  const wallet = await tronSDK.api.generateTronwallet(
    'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  )

  const block = await tronSDK.api.tronGetBlock(
    '0x5d40698ee1b1ec589035f2a39c6162287e9056868cc79d66cfb248ba9f66c3fc',
  )
  const currentBlock = await tronSDK.api.tronGetCurrentBlock()

  const transaction = await tronSDK.api.tronGetTransaction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
}

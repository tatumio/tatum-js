import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronBlockchainExample() {
  const broadcastHash = await tronSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    // TODO: OpenAPI bug
    // signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const transaction = await tronSDK.blockchain.getTransaction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const block = await tronSDK.blockchain.getBlock(
    '0x527d2f059244f7cbe1ec84aa75e7d1637463a793d82cf7015b3c2a7a5a3ec053',
  )
  const currentBlock = await tronSDK.blockchain.getCurrentBlock()

  const account = await tronSDK.blockchain.getAccount('TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh')
}

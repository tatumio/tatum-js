import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronBlockchainExample() {
  // Get Tron account by address
  // https://apidoc.tatum.io/tag/Tron#operation/TronGetAccount
  const account = await tronSDK.blockchain.getAccount('TGDqQAP5bduoPKVgdbk7fGyW4DwEt3RRn8')

  // Get all transactions for a TRON account
  // https://apidoc.tatum.io/tag/Tron#operation/TronAccountTx
  const transactions = await tronSDK.blockchain.getTransactions('TGDqQAP5bduoPKVgdbk7fGyW4DwEt3RRn8')

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Tron#operation/TronGetTransaction
  const transaction = await tronSDK.blockchain.getTransaction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )

  // Get TRC-20 transactions for a TRON account.
  // https://apidoc.tatum.io/tag/Tron#operation/TronAccountTx20
  const trc20Transactions = await tronSDK.blockchain.getTrc20Transactions(
    'TGDqQAP5bduoPKVgdbk7fGyW4DwEt3RRn8',
  )

  // Get block by hash
  // https://apidoc.tatum.io/tag/Tron#operation/TronGetBlock
  const block = await tronSDK.blockchain.getBlock(
    '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c',
  )

  // Get current block
  // https://apidoc.tatum.io/tag/Tron#operation/TronGetCurrentBlock
  const currentBlock = await tronSDK.blockchain.getCurrentBlock()
}

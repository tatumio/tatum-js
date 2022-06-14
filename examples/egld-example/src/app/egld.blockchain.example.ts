import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldBlockchainExample() {
  const broadcastHash = await egldSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const address = await egldSDK.blockchain.generateAddress(
    'kit erase harsh crawl taste rebel bus ocean traffic vast undo street car around network deputy wage usage aware void float snake baby sister',
    1,
  )

  const privateKey = await egldSDK.blockchain.generatePrivateKeyOfAddress({
    mnemonic:
      'kit erase harsh crawl taste rebel bus ocean traffic vast undo street car around network deputy wage usage aware void float snake baby sister',
    index: 1,
  })

  const wallet = await egldSDK.blockchain.generateWallet()

  const balance = await egldSDK.blockchain.getBalance(
    'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
  )

  const block = await egldSDK.blockchain.getBlock(
    '67e4c2ad0c7bf85e569cfea423fa2905895f5f973d07177ff344a00972c2c5f1',
  )

  const transactionCount = await egldSDK.blockchain.getCountOfTransactionSentFromAddress(
    'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
  )

  const currentBlock = await egldSDK.blockchain.getCurrentBlock()

  const transaction = await egldSDK.blockchain.getTransaction(
    'e5129bc9146990c1492450c4c6376bc64423ab931ff076d5ef442248d61bc585',
  )

  const transactionFromAddress = await egldSDK.blockchain.getTransactionsSentFromAddress(
    'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
  )
}

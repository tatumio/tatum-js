import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function klaytnBlockchainExample() {
  // Get gasLimit and gasPrice for a transaction
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/KlaytnEstimateGas
  const gasInfo = await klaytnSDK.blockchain.estimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
  })
  console.log('Gas estimate: ', gasInfo)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGetTransaction
  const transaction = await klaytnSDK.blockchain.get(
    '0xa71e938eaae42da7d485afdeb616bcc810fa952a5c64928561457851660b01d9',
  )
  console.log('Transaction: ', transaction)

  // Get block by hash
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGetBlock
  const block = await klaytnSDK.blockchain.getBlock(
    '0x9089a6d4d24ddebfec27f9db7527bd6bf2ba0628efa1ea67084d91aeaf43d7b5',
  )
  console.log('Block: ', block)

  // Get current block
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGetCurrentBlock
  const currentBlock = await klaytnSDK.blockchain.getCurrentBlock()
  console.log('Current block: ', currentBlock)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGetTransactionCount
  const transactionsCount = await klaytnSDK.blockchain.getTransactionsCount(
    '0x1a4df737e347b51643f054c37d04798bdda66c75',
  )
  console.log('Transactions count: ', transactionsCount)
}

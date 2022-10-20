import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcBlockchainExample() {
  const address = '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B'
  const blockHash = '0x305c58c8c62399097f1ea702e337f13be6b3a3ed28867d530d8a03191f040b9c'
  const transactionHash = '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7'

  // Get gasLimit and gasPrice for a transaction
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/XdcEstimateGas
  const gasInfo = await xdcSDK.blockchain.estimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
  })
  console.log(`Gas information for transaction is ${JSON.stringify(gasInfo)}`)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetTransaction
  const transaction = await xdcSDK.blockchain.get(transactionHash)
  console.log(`transaction with hash ${transactionHash} is ${JSON.stringify(transaction)}`)

  // Get Balance on account
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetBalance
  const balance = await xdcSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`Balance on address ${address} is ${balance}`)

  // Get block by hash
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetBlock
  const block = await xdcSDK.blockchain.getBlock(blockHash)
  console.log(`Block with hash ${blockHash} is ${block}`)

  // Get current block
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetCurrentBlock
  const currentBlock = await xdcSDK.blockchain.getCurrentBlock()
  console.log(`Current block is ${currentBlock}`)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetTransactionCount
  const transactionsCount = await xdcSDK.blockchain.getTransactionsCount(address)
  console.log(`Transaction count for address ${address} is ${transactionsCount}`)
}

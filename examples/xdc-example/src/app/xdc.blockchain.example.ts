import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcBlockchainExample() {
  const address = 'xdc0569663566e3119ff84130e1455bd5e3f2a3ed8f'
  const blockHash = '0xa2e6c7e7be617f371b9d04452ffdb0684d3078bbc7508288c7bb99d96366958e'
  const transactionHash = '0xf4472de07aac1fe05937202b90ba52e392afd534601175308e2a21bfb7680d72'

  // Get gasLimit and gasPrice for a transaction
  // https://apidoc.tatum.io/tag/Blockchain-fees#operation/XdcEstimateGas
  const gasInfo = await xdcSDK.blockchain.estimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
  })
  console.log('Gas estimate: ', gasInfo)

  // Get transaction details by hash
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetTransaction
  const transaction = await xdcSDK.blockchain.get(transactionHash)
  console.log('Transaction: ', transaction)

  // Get Balance on account
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetBalance
  const { balance } = await xdcSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`Balance`, balance)

  // Get block by hash
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetBlock
  const block = await xdcSDK.blockchain.getBlock(blockHash)
  console.log(`Block`, block)

  // Get current block
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetCurrentBlock
  const currentBlock = await xdcSDK.blockchain.getCurrentBlock()
  console.log(`Current block`, currentBlock)

  // Get transaction count of an address
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGetTransactionCount
  const transactionsCount = await xdcSDK.blockchain.getTransactionsCount(address)
  console.log(`Transaction count for address ${address}`, transactionsCount)
}

import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethBlockchainExample() {
  const hash = await ethSDK.blockchain.broadcast({
    txData: "62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D",
    signatureId: "1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6"
  })
  const gasInfo = await ethSDK.blockchain.estimateGas({
    from: "0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef",
    to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
    contractAddress: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
    amount: "100000",
    data: "My note to recipient."
  })
  const gasInfoBatch = await ethSDK.blockchain.estimateGasBatch({
    estimations: [
      {
        "from": "0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef",
        "to": "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
        "contractAddress": "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
        "amount": "100000",
        "data": "My note to recipient."
      }
    ]
  })
  const transaction = await ethSDK.blockchain.get("0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7")
  const block = await ethSDK.blockchain.getBlock(
    '0x527d2f059244f7cbe1ec84aa75e7d1637463a793d82cf7015b3c2a7a5a3ec053',
  )
  const currentBlock = await ethSDK.blockchain.getCurrentBlock()
  const transactionsByAddress = await ethSDK.blockchain.getAccountTransactions("0xdac17f958d2ee523a2206206994597c13d831ec7", 10)
  const transactionsCount = await ethSDK.blockchain.getTransactionsCount("0xdac17f958d2ee523a2206206994597c13d831ec7")
  const balance = await ethSDK.blockchain.getBlockchainAccountBalance("0xdac17f958d2ee523a2206206994597c13d831ec7")
}

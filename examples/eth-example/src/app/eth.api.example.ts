import { TransferEthBlockchain } from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethApiExample() {
  const contractTransactionHash = await ethSDK.api.ethBlockchainSmartContractInvocation({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    methodName: 'transfer',
    methodABI: {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'stake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    params: ['0x632'],
    amount: '100000',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const web3 = await ethSDK.api.ethWeb3Driver('asdlkfjnqunalkwjfnq2oi303294857k', {
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })

  const transferHash = await ethSDK.api.ethBlockchainTransfer({
    data: 'My note to recipient.',
    nonce: 0,
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    // TODO openapi bug
    currency: 'ETH',
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    amount: '100000',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
  })

  const broadcastHash = await ethSDK.api.ethBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const gasInfo = await ethSDK.api.ethEstimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
    data: 'My note to recipient.',
  })

  const gasInfoBatch = await ethSDK.api.ethEstimateGasBatch({
    estimations: [
      {
        from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
        to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        amount: '100000',
        data: 'My note to recipient.',
      },
    ],
  })

  const privateKey = await ethSDK.api.ethGenerateAddressPrivateKey({
    index: 0,
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  })

  const address = await ethSDK.api.ethGenerateAddress(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )
  const wallet = await ethSDK.api.ethGenerateWallet(
    'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  )
  const balance = await ethSDK.api.ethGetBalance('0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B')
  const block = await ethSDK.api.ethGetBlock(
    '0x5d40698ee1b1ec589035f2a39c6162287e9056868cc79d66cfb248ba9f66c3fc',
  )
  const currentBlock = await ethSDK.api.ethGetCurrentBlock()
  const internalTransaction = await ethSDK.api.ethGetInternalTransactionByAddress(
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const transaction = await ethSDK.api.ethGetTransaction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactionsCount = await ethSDK.api.ethGetTransactionCount(
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
  )
  const transactions = await ethSDK.api.ethGetTransactionByAddress(
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
}

import { TatumKcsSDK } from '@tatumio/kcs'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const kcsSDK = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsApiExample() {
  const contractTransactionHash = await kcsSDK.api.kcsBlockchainSmartContractInvocation({
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
  })

  const web3 = await kcsSDK.api.kcsWeb3Driver('asdlkfjnqunalkwjfnq2oi303294857k', {
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })

  const transferHash = await kcsSDK.api.kcsBlockchainTransfer({
    data: 'My note to recipient.',
    nonce: 0,
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    currency: 'KCS',
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    amount: '100000',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
  })

  const broadcastHash = await kcsSDK.api.kcsBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const gasInfo = await kcsSDK.api.kcsEstimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
    data: 'My note to recipient.',
  })

  const privateKey = await kcsSDK.api.kcsGenerateAddressPrivateKey({
    index: 0,
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  })

  const address = await kcsSDK.api.kcsGenerateAddress(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )
  const wallet = await kcsSDK.api.kcsGenerateWallet(
    'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  )
  const balance = await kcsSDK.api.kcsGetBalance('0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B')
  const block = await kcsSDK.api.kcsGetBlock(
    '0x5d40698ee1b1ec589035f2a39c6162287e9056868cc79d66cfb248ba9f66c3fc',
  )
  const currentBlock = await kcsSDK.api.kcsGetCurrentBlock()
  const transaction = await kcsSDK.api.kcsGetTransaction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactionCount = await kcsSDK.api.kcsGetTransactionCount(
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
  )
}

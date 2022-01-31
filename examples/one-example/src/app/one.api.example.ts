import { TransferOneBlockchain } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneApiExample() {
  const contractTransactionHash = await oneSDK.api.oneBlockchainSmartContractInvocation({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    methodName: 'transfer',
    methodABI: {
      input: [
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

  const web3 = await oneSDK.api.oneWeb3Driver('asdlkfjnqunalkwjfnq2oi303294857k', {
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })

  const transferHash = await oneSDK.api.oneBlockchainTransfer({
    data: 'My note to recipient.',
    nonce: 0,
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    // TODO openapi bug
    currency: 'ONE',
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    amount: '100000',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
  })

  const broadcastHash = await oneSDK.api.oneBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const privateKey = await oneSDK.api.oneGenerateAddressPrivateKey({
    index: 0,
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  })

  const transformedAddress = await oneSDK.api.oneFormatAddress('0xa7673161CbfE0116A4De9E341f8465940c2211d4')
  const address = await oneSDK.api.oneGenerateAddress(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )
  const wallet = await oneSDK.api.oneGenerateWallet(
    'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  )
  const balance = await oneSDK.api.oneGetBalance('0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B')
  const block = await oneSDK.api.oneGetBlock(
    '0x5d40698ee1b1ec589035f2a39c6162287e9056868cc79d66cfb248ba9f66c3fc',
  )
  const currentBlock = await oneSDK.api.oneGetCurrentBlock()
  const transaction = await oneSDK.api.oneGetTransaction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactionCount = await oneSDK.api.oneGetTransactionCount(
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
  )
}

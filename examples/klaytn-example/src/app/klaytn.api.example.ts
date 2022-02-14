import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const klaytnSDK = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function klaytnApiExample() {
  // const contractTransactionHash = await klaytnSDK.api.klaytnBlockchainSmartContractInvocation({
  // TODO: bug in openapi - feeCurrency
  //   contractAddress: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
  //   methodName: "transfer",
  //   methodABI: {
  //     inputs: [],
  //     name: "stake",
  //     outputs: [ ],
  //     stateMutability: "nonpayable",
  //     type: "function"
  //   },
  //   params: ["0x632"],
  //   amount: "100000",
  //   fromPrivateKey: "0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2",
  //   nonce: 0,
  //   fee: {
  //     gasLimit: "40000",
  //     gasPrice: "20"
  //   },
  //   feeCurrency: Currency.KLAY
  // })

  const web3 = await klaytnSDK.api.klaytnWeb3Driver('asdlkfjnqunalkwjfnq2oi303294857k', {
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })

  const transferHash = await klaytnSDK.api.klaytnBlockchainTransfer({
    data: 'My note to recipient.',
    nonce: 0,
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    currency: 'KLAY',
    amount: '100000',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a785',
  })

  const broadcastHash = await klaytnSDK.api.klaytnBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const gasInfo = await klaytnSDK.api.klaytnEstimateGas({
    from: '0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '100000',
    data: 'My note to recipient.',
  })

  const privateKey = await klaytnSDK.api.klaytnGenerateAddressPrivateKey({
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
    index: 0,
  })

  const address = await klaytnSDK.api.klaytnGenerateAddress(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )
  const wallet = await klaytnSDK.api.klaytnGenerateWallet(
    'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  )
  const balance = await klaytnSDK.api.klaytnGetBalance('0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B')
  const block = await klaytnSDK.api.klaytnGetBlock(
    '0x5d40698ee1b1ec589035f2a39c6162287e9056868cc79d66cfb248ba9f66c3fc',
  )
  const currentBlock = await klaytnSDK.api.klaytnGetCurrentBlock()
  const transaction = await klaytnSDK.api.klaytnGetTransaction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7',
  )
  const transactionCount = await klaytnSDK.api.klaytnGetTransactionCount(
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
  )
}

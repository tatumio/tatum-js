import { TransferCeloBlockchain } from '@tatumio/api-client'
import { TatumCeloSDK } from '@tatumio/celo'
import { Currency } from '@tatumio/shared-core'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoApiExample() {
  // TODO: bug in openapi - feeCurrency
  // const contractTransactionHash = await celoSDK.api.celoBlockchainSmartContractInvocation({
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
  //   feeCurrency: Currency.CELO
  // })

  const web3 = await celoSDK.api.celoWeb3Driver('asdlkfjnqunalkwjfnq2oi303294857k', {
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 2,
  })

  const transferHash = await celoSDK.api.celoBlockchainTransfer({
    data: 'My note to recipient.',
    nonce: 0,
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    // TODO openapi bug
    currency: 'CELO',
    // TODO openapi bug
    feeCurrency: 'CELO',
    amount: '100000',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a785',
  })

  const broadcastHash = await celoSDK.api.celoBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
    signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
  })

  const privateKey = await celoSDK.api.celoGenerateAddressPrivateKey({
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
    index: 0,
  })

  const address = await celoSDK.api.celoGenerateAddress(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )
  const wallet = await celoSDK.api.celoGenerateWallet(
    'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  )
  const block = await celoSDK.api.celoGetBlock(
    '0x5d40698ee1b1ec589035f2a39c6162287e9056868cc79d66cfb248ba9f66c3fc',
  )
  const currentBlock = await celoSDK.api.celoGetCurrentBlock()
  const balance = await celoSDK.api.celoGetBalance('0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B')
  const transaction = await celoSDK.api.celoGetTransaction(
    '0xcf2c40f475e78c7c19778e1ae999a0e371c9319b38182ea15dc94536f13f9137',
  )
  const transactionsByAddress = await celoSDK.api.celoGetTransactionByAddress(
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
    10,
  )
  const transactionsCount = await celoSDK.api.celoGetTransactionCount(
    '0x8ce4e40889a13971681391aad29e88efaf91f784',
  )
}

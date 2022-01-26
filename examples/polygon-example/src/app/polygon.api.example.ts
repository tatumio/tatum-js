import { TransferPolygonBlockchain } from '@tatumio/api-client';
import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency } from '@tatumio/shared-core';
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const polygonSDK = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonApiExample() {
  // const txHash = await polygonSDK.api.polygonBlockchainSmartContractInvocation({
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
  //   feeCurrency: Currency.MATIC
  // })

  const transferHash = await polygonSDK.api.polygonBlockchainTransfer({
    data: "My note to recipient.",
    nonce: 0,
    to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
    currency: TransferPolygonBlockchain.currency.MATIC,
    amount: "100000",
    fromPrivateKey: "0x05e150c73f1920ec14caa1e0b6aa09940899678051a785"
  })

  const broadcastHash = await polygonSDK.api.polygonBroadcast({
    txData: "62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D",
    signatureId: "1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6"
  })

  const gasInfo = await polygonSDK.api.polygonEstimateGas({
    from: "0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef",
    to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
    amount: "100000",
    data: "My note to recipient."
  })

  const address = await polygonSDK.api.polygonGenerateAddress('xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid', 0)
  const privateKey = await polygonSDK.api.polygonGenerateAddressPrivateKey({
    mnemonic: "urge pulp usage sister evidence arrest palm math please chief egg abuse",
    index: 0
  })
  const wallet = await polygonSDK.api.polygonGenerateWallet('urge pulp usage sister evidence arrest palm math please chief egg abuse')
  const balance = await polygonSDK.api.polygonGetBalance('0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B')
  const block = await polygonSDK.api.polygonGetBlock('0x5d40698ee1b1ec589035f2a39c6162287e9056868cc79d66cfb248ba9f66c3fc')
  const currentBlock = await polygonSDK.api.polygonGetCurrentBlock()
  const transaction = await polygonSDK.api.polygonGetTransaction('0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7')
  const transactionByAddress = await polygonSDK.api.polygonGetTransactionByAddress('0x8ce4e40889a13971681391aad29e88efaf91f784', 10)
  const transactionCount = await polygonSDK.api.polygonGetTransactionCount('0xdac17f958d2ee523a2206206994597c13d831ec7')
  const web3 = await polygonSDK.api.polygonWeb3Driver('asdlkfjnqunalkwjfnq2oi303294857k', {
    jsonrpc: "2.0",
    method: "web3_clientVersion",
    params: [ ],
    id: 2
  })
}

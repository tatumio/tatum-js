import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const flowApiExample = async () => {
  // Generate wallet
  const wallet = await flowSDK.api.flowGenerateWallet(
    'urge pulp usage sister evidence arrest palm math please chief egg abuse',
  )
  // Generate address from extended public key
  const address = await flowSDK.api.flowGenerateAddress(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )

  // Generate Flow public key from extended public key
  const publicKey = await flowSDK.api.flowGeneratePubKey(
    'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid',
    0,
  )

  // Generate Flow address from public key
  const addressFromPublicKey = await flowSDK.api.flowGeneratePubKeyPrivateKey({
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
    index: 0,
  })

  // Get number of current block
  const currentBlockNumber = await flowSDK.api.flowGetBlockChainInfo()

  // Get block detail
  const block = await flowSDK.api.flowGetBlock('1234314')

  // Get Flow events
  const blocksEvents = await flowSDK.api.flowGetBlockEvents(
    'A.7e60df042a9c0868.FlowToken.TokensWithdrawn',
    654321,
    654326,
  )

  // Get raw transaction
  const tx = await flowSDK.api.flowGetRawTransaction(
    'd60631d8e5c8b6eb0557b5181cf28564d771c628a08abc414e87ad7c05ff2fc2',
  )

  // Get account info
  const accountInfo = await flowSDK.api.flowGetAccount('0x955cd3f17b2fd8ad')

  // Send Flow to blockchain addresses
  const tx2 = await flowSDK.api.flowTransferBlockchain({
    account: '0x955cd3f17b2fd8ad',
    currency: 'FLOW',
    amount: '11',
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
    index: 0,
  })

  // Send arbitrary transaction to blockchain
  const tx3 = await flowSDK.api.flowTransferCustomBlockchain({
    account: '0x955cd3f17b2fd8ad',
    transaction: '',
    args: [
      {
        value: 'string',
        type: 'Identity',
        subType: 'Identity',
      },
    ],
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
    index: 1,
  })

  // Create Flow address from public key
  const tx4 = await flowSDK.api.flowCreateAddressFromPubKey({
    account: '0x955cd3f17b2fd8ad',
    publicKey:
      '968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90',
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
    index: 0,
  })

  // Add public key to Flow address
  const tx5 = await flowSDK.api.flowAddPubKeyToAddress({
    account: '0x955cd3f17b2fd8ad',
    publicKey:
      '968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90',
    mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse',
    index: 0,
  })
}

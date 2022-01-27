import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'
import {
  AddMultiTokenMinter,
  BurnMultiToken,
  BurnMultiTokenBatch,
  DeployMultiToken,
  MintMultiTokenCelo,
  TransferMultiToken,
  TransferMultiTokenBatch,
} from '@tatumio/api-client'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function multiTokenExample() {
  // @TODO add real token
  const balance = await tatumSDK.multiToken.getMultiTokensBalance(
    Currency.ETH,
    'ADDRESS',
    'CONTRACT ADDRESS',
    'TOKEN_ID',
  )

  const balanceBatch = await tatumSDK.multiToken.getMultiTokensBatchBalance(
    Currency.ETH,
    '0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326',
    '1000',
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
  )

  const transaction = await tatumSDK.multiToken.getMultiTokenTransaction(Currency.MATIC, 'TX HASH')

  const txs = await tatumSDK.multiToken.getMultiTokenTransactionsByAddress(
    Currency.CELO,
    'ADDRESS',
    'TOKEN ADDRESS',
    50,
  )

  const metadata = await tatumSDK.multiToken.getMultiTokenMetadata(Currency.CELO, 'ADDRESS', 'TOKEN ADDRESS')

  const multiTokenByAddress = await tatumSDK.multiToken.getMultiTokensByAddress(
    Currency.ETH,
    '0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B',
  )

  const smartContractHash = await tatumSDK.multiToken.deployMultiTokenSmartContract({
    chain: DeployMultiToken.chain.ETH,
    uri: 'example.com',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    publicMint: true,
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const mintHash = await tatumSDK.multiToken.mintMultiToken({
    chain: MintMultiTokenCelo.chain.CELO,
    tokenId: '1000',
    amount: '10000',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    feeCurrency: MintMultiTokenCelo.feeCurrency.CELO,
  })

  const mintHashBatch = await tatumSDK.multiToken.mintMultiTokenBatch({
    chain: MintMultiTokenCelo.chain.CELO,
    tokenId: [['1000', '1001']],
    amounts: [['10000', '19999']],
    to: ['0x687422eEA2cB73B5d3e242bA5456b782919AFc85'],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 0,
    feeCurrency: MintMultiTokenCelo.feeCurrency.CELO,
  })

  const burnHash = await tatumSDK.multiToken.burnMultiToken({
    chain: BurnMultiToken.chain.BSC,
    tokenId: '1000',
    amount: '10000',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const burnHashBatch = await tatumSDK.multiToken.burnMultiTokenBatch({
    chain: BurnMultiTokenBatch.chain.BSC,
    tokenId: ['1000', '10001'],
    amounts: ['10000', '2'],
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const transferHash = await tatumSDK.multiToken.transferMultiToken({
    chain: TransferMultiToken.chain.ONE,
    tokenId: '1000',
    amount: '10000',
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const transferHashBatch = await tatumSDK.multiToken.transferMultiTokenBatch({
    chain: TransferMultiTokenBatch.chain.ONE,
    tokenId: ['1000', '10001'],
    amounts: ['10000', '100000'],
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const addMinterHash = await tatumSDK.multiToken.addMultiTokenMinter({
    chain: AddMultiTokenMinter.chain.KCS,
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    minter: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 0,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })
}

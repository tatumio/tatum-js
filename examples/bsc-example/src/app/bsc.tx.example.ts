import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import {
  TransferCustodialWalletBatch,
  TransferCustodialWalletBatchKMS,
  TransferCustodialWalletKMS,
} from '@tatumio/api-client'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscTxWithSignatureIdExample(): Promise<void> {
  // NATIVE
  const preparedTransferNativeTransaction = await bscSDK.transaction.prepare.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })

  const sentTransferNativeTransaction = await bscSDK.transaction.send.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })

  // ERC20(FUNGIBLE TOKEN)
  const preparedDeployErc20Transaction = await bscSDK.erc20.prepare.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    supply: '10000000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    digits: 18,
    totalCap: '10000000',
    nonce: 3252345722143,
    fee: {
      gasLimit: '171864',
      gasPrice: '20',
    },
  })

  const sentDeployErc20Transaction = await bscSDK.erc20.send.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    supply: '10000000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    digits: 18,
    totalCap: '10000000',
    nonce: 3252345722143,
    fee: {
      gasLimit: '171864',
      gasPrice: '20',
    },
  })

  const preparedTransferErc20Transaction = await bscSDK.erc20.prepare.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    digits: 18,
    nonce: 3252345722143,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })

  const sentTransferErc20Transaction = await bscSDK.erc20.send.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    digits: 18,
    nonce: 3252345722143,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })

  const preparedMintErc20Transaction = await bscSDK.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await bscSDK.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await bscSDK.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await bscSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  // ERC721(NFT)
  const preparedDeployErc721Transaction = await bscSDK.nft.prepare.deploySignedTransaction({
    chain: 'BSC',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentDeployErc721Transaction = await bscSDK.nft.send.deploySignedTransaction({
    chain: 'BSC',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintSignedTransaction = await bscSDK.nft.prepare.mintSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentMintSignedTransaction = await bscSDK.nft.send.mintSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintMultipleSignedTransaction = await bscSDK.nft.prepare.mintMultipleSignedTransaction({
    chain: 'BSC',
    to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
    tokenId: ['345634563', '53545345'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    authorAddresses: [
      ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      ['0x687422eEA2cB73B5d3e242bA5456b782919AFc85'],
    ],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentMintMultipleSignedTransaction = await bscSDK.nft.send.mintMultipleSignedTransaction({
    chain: 'BSC',
    to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
    tokenId: ['345634563', '53545345'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    authorAddresses: [
      ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      ['0x687422eEA2cB73B5d3e242bA5456b782919AFc85'],
    ],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintCashbackSignedTransaction = await bscSDK.nft.prepare.mintCashbackSignedTransaction({
    chain: 'BSC',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    tokenId: '45343653',
    url: 'https://my_token_data.com',
    cashbackValues: ['0.5', '0.5'],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentMintCashbackSignedTransaction = await bscSDK.nft.send.mintCashbackSignedTransaction({
    chain: 'BSC',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    tokenId: '45343653',
    url: 'https://my_token_data.com',
    cashbackValues: ['0.5', '0.5'],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintMultipleCashbackSignedTransaction =
    await bscSDK.nft.prepare.mintMultipleCashbackSignedTransaction({
      chain: 'BSC',
      tokenId: ['53564656', '536456456'],
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      url: ['https://my_token_data.com', 'https://my_token_data2.com'],
      cashbackValues: [['0.5'], ['0.5']],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const sentMintMultipleCashbackSignedTransaction =
    await bscSDK.nft.send.mintMultipleCashbackSignedTransaction({
      chain: 'BSC',
      tokenId: ['53564656', '536456456'],
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      url: ['https://my_token_data.com', 'https://my_token_data2.com'],
      cashbackValues: [['0.5'], ['0.5']],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const preparedMintProvenanceSignedTransaction = await bscSDK.nft.prepare.mintProvenanceSignedTransaction({
    chain: 'BSC',
    tokenId: '5435345',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentMintProvenanceSignedTransaction = await bscSDK.nft.send.mintProvenanceSignedTransaction({
    chain: 'BSC',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    tokenId: '5435345',
    url: 'https://my_token_data.com',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintMultipleProvenanceSignedTransaction =
    await bscSDK.nft.prepare.mintMultipleProvenanceSignedTransaction({
      chain: 'BSC',
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      tokenId: ['53564656', '536456456'],
      url: ['https://my_token_data.com'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fixedValues: [['0.5'], ['0.5']],
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const sentMintMultipleProvenanceSignedTransaction =
    await bscSDK.nft.send.mintMultipleProvenanceSignedTransaction({
      chain: 'BSC',
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      tokenId: ['53564656', '536456456'],
      url: ['https://my_token_data.com'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fixedValues: [['0.5'], ['0.5']],
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const preparedTransferSignedTransaction = await bscSDK.nft.prepare.transferSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentTransferSignedTransaction = await bscSDK.nft.send.transferSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedUpdateCashbackForAuthorSignedTransaction =
    await bscSDK.nft.prepare.updateCashbackForAuthorSignedTransaction({
      chain: 'BSC',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const sentUpdateCashbackForAuthorSignedTransaction =
    await bscSDK.nft.send.updateCashbackForAuthorSignedTransaction({
      chain: 'BSC',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const preparedBurnErc721Transaction = await bscSDK.nft.prepare.burnSignedTransaction({
    chain: 'BSC',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentBurnErc721Transaction = await bscSDK.nft.send.burnSignedTransaction({
    chain: 'BSC',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  // ERC1155(MULTI TOKEN)

  const preparedDeployMultiTokenTransaction = await bscSDK.multiToken.prepare.deployMultiTokenTransaction({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    uri: 'tatum',
  })

  const sentDeployMultiTokenTransaction = await bscSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    uri: 'tatum',
  })

  const preparedMintMultiTokenTransaction = await bscSDK.multiToken.prepare.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    chain: 'BSC',
    tokenId: '123',
    amount: '1000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const sentMintMultiTokenTransaction = await bscSDK.multiToken.send.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    chain: 'BSC',
    tokenId: '123',
    amount: '1000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const preparedMintMultiTokenBatchTransaction =
    await bscSDK.multiToken.prepare.mintMultiTokenBatchTransaction({
      to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
      chain: 'BSC',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentMintMultiTokenBatchTransaction = await bscSDK.multiToken.send.mintMultiTokenBatchTransaction({
    to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
    chain: 'BSC',
    tokenId: [['123'], ['321']],
    amounts: [['1000'], ['100']],
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const preparedTransferMultiTokenTransaction = await bscSDK.multiToken.prepare.transferMultiTokenTransaction(
    {
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'BSC',
      tokenId: '123',
      amount: '10',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    },
  )

  const sentTransferMultiTokenTransaction = await bscSDK.multiToken.send.transferMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    chain: 'BSC',
    tokenId: '123',
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const preparedTransferMultiTokenBatchTransaction =
    await bscSDK.multiToken.prepare.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'BSC',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenBatchTransaction =
    await bscSDK.multiToken.send.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'BSC',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedBurnMultiTokenTransaction = await bscSDK.multiToken.prepare.burnMultiTokenTransaction({
    chain: 'BSC',
    tokenId: '123',
    amount: '1',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
  })

  const sentBurnMultiTokenTransaction = await bscSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'BSC',
    tokenId: '123',
    amount: '1',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
  })

  const preparedBurnMultiTokenBatchTransaction =
    await bscSDK.multiToken.prepare.burnMultiTokenBatchTransaction({
      chain: 'BSC',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    })

  const sentMintBurnTokenBatchTransaction = await bscSDK.multiToken.send.burnMultiTokenBatchTransaction({
    chain: 'BSC',
    tokenId: ['123', '321'],
    amounts: ['1000', '100'],
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
  })

  // CUSTODIAL
  const preparedTransferFromCustodialWallet = await bscSDK.custodial.prepare.transferFromCustodialWallet({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const sentTransferFromCustodialWallet = await bscSDK.custodial.send.transferFromCustodialWallet({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const preparedBatchTransferFromCustodialWallet =
    await bscSDK.custodial.prepare.batchTransferFromCustodialWallet({
      chain: 'BSC',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractType: [0, 1, 2, 3],
      custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
      tokenAddress: [
        '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
        '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698',
        '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
        '0',
      ],
      recipient: [
        '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
        '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
        '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
        '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      ],
      amount: ['1', '0', '1', '3'],
      fee: {
        gasLimit: '100000',
        gasPrice: '100000',
      },
    } as TransferCustodialWalletBatchKMS)

  const sentBatchTransferFromCustodialWallet = await bscSDK.custodial.send.batchTransferFromCustodialWallet({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: [0, 1, 2, 3],
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: [
      '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
      '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698',
      '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
      '0',
    ],
    recipient: [
      '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    ],
    amount: ['1', '0', '1', '3'],
  } as TransferCustodialWalletBatchKMS)

  const preparedApproveFromCustodialWallet = await bscSDK.custodial.prepare.approveFromCustodialWallet({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const sentApproveFromCustodialWallet = await bscSDK.custodial.send.approveFromCustodialWallet({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const preparedCustodialWalletBatch = await bscSDK.custodial.prepare.custodialWalletBatch({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })

  const sentCustodialWalletBatch = await bscSDK.custodial.send.custodialWalletBatch({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })
}

export async function bscTxWithPrivateKeyExample(): Promise<void> {
  // ERC20(FUNGIBLE TOKEN)
  const preparedDeployErc20Transaction = await bscSDK.erc20.prepare.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    supply: '10000000',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    digits: 18,
    totalCap: '10000000',
    nonce: 3252345722143,
    fee: {
      gasLimit: '171864',
      gasPrice: '20',
    },
  })

  const sentDeployErc20Transaction = await bscSDK.erc20.send.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    supply: '10000000',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    digits: 18,
    totalCap: '10000000',
    nonce: 3252345722143,
    fee: {
      gasLimit: '171864',
      gasPrice: '20',
    },
  })

  const preparedTransferErc20Transaction = await bscSDK.erc20.prepare.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    digits: 18,
    nonce: 3252345722143,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })

  const sentTransferErc20Transaction = await bscSDK.erc20.send.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    digits: 18,
    nonce: 3252345722143,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })

  const preparedMintErc20Transaction = await bscSDK.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await bscSDK.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await bscSDK.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await bscSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  // ERC721(NFT)
  const preparedDeployErc721Transaction = await bscSDK.nft.prepare.deploySignedTransaction({
    chain: 'BSC',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentDeployErc721Transaction = await bscSDK.nft.send.deploySignedTransaction({
    chain: 'BSC',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintSignedTransaction = await bscSDK.nft.prepare.mintSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentMintSignedTransaction = await bscSDK.nft.send.mintSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintMultipleSignedTransaction = await bscSDK.nft.prepare.mintMultipleSignedTransaction({
    chain: 'BSC',
    to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
    tokenId: ['345634563', '53545345'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    authorAddresses: [
      ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      ['0x687422eEA2cB73B5d3e242bA5456b782919AFc85'],
    ],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentMintMultipleSignedTransaction = await bscSDK.nft.send.mintMultipleSignedTransaction({
    chain: 'BSC',
    to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
    tokenId: ['345634563', '53545345'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    authorAddresses: [
      ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      ['0x687422eEA2cB73B5d3e242bA5456b782919AFc85'],
    ],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintCashbackSignedTransaction = await bscSDK.nft.prepare.mintCashbackSignedTransaction({
    chain: 'BSC',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    tokenId: '45343653',
    url: 'https://my_token_data.com',
    cashbackValues: ['0.5', '0.5'],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentMintCashbackSignedTransaction = await bscSDK.nft.send.mintCashbackSignedTransaction({
    chain: 'BSC',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    tokenId: '45343653',
    url: 'https://my_token_data.com',
    cashbackValues: ['0.5', '0.5'],
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintMultipleCashbackSignedTransaction =
    await bscSDK.nft.prepare.mintMultipleCashbackSignedTransaction({
      chain: 'BSC',
      tokenId: ['53564656', '536456456'],
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      url: ['https://my_token_data.com', 'https://my_token_data2.com'],
      cashbackValues: [['0.5'], ['0.5']],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const sentMintMultipleCashbackSignedTransaction =
    await bscSDK.nft.send.mintMultipleCashbackSignedTransaction({
      chain: 'BSC',
      tokenId: ['53564656', '536456456'],
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      url: ['https://my_token_data.com', 'https://my_token_data2.com'],
      cashbackValues: [['0.5'], ['0.5']],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const preparedMintProvenanceSignedTransaction = await bscSDK.nft.prepare.mintProvenanceSignedTransaction({
    chain: 'BSC',
    tokenId: '5435345',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentMintProvenanceSignedTransaction = await bscSDK.nft.send.mintProvenanceSignedTransaction({
    chain: 'BSC',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    tokenId: '5435345',
    url: 'https://my_token_data.com',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintMultipleProvenanceSignedTransaction =
    await bscSDK.nft.prepare.mintMultipleProvenanceSignedTransaction({
      chain: 'BSC',
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      tokenId: ['53564656', '536456456'],
      url: ['https://my_token_data.com'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fixedValues: [['0.5'], ['0.5']],
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const sentMintMultipleProvenanceSignedTransaction =
    await bscSDK.nft.send.mintMultipleProvenanceSignedTransaction({
      chain: 'BSC',
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      tokenId: ['53564656', '536456456'],
      url: ['https://my_token_data.com'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fixedValues: [['0.5'], ['0.5']],
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const preparedTransferSignedTransaction = await bscSDK.nft.prepare.transferSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentTransferSignedTransaction = await bscSDK.nft.send.transferSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedUpdateCashbackForAuthorSignedTransaction =
    await bscSDK.nft.prepare.updateCashbackForAuthorSignedTransaction({
      chain: 'BSC',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const sentUpdateCashbackForAuthorSignedTransaction =
    await bscSDK.nft.send.updateCashbackForAuthorSignedTransaction({
      chain: 'BSC',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const preparedBurnErc721Transaction = await bscSDK.nft.prepare.burnSignedTransaction({
    chain: 'BSC',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentBurnErc721Transaction = await bscSDK.nft.send.burnSignedTransaction({
    chain: 'BSC',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  // ERC1155(MULTI TOKEN)
  const preparedDeployMultiTokenTransaction = await bscSDK.multiToken.prepare.deployMultiTokenTransaction({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    uri: 'tatum',
  })

  const sentDeployMultiTokenTransaction = await bscSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    uri: 'tatum',
  })

  const preparedMintMultiTokenTransaction = await bscSDK.multiToken.prepare.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    chain: 'BSC',
    tokenId: '123',
    amount: '1000',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const sentMintMultiTokenTransaction = await bscSDK.multiToken.send.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    chain: 'BSC',
    tokenId: '123',
    amount: '1000',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const preparedMintMultiTokenBatchTransaction =
    await bscSDK.multiToken.prepare.mintMultiTokenBatchTransaction({
      to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
      chain: 'BSC',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentMintMultiTokenBatchTransaction = await bscSDK.multiToken.send.mintMultiTokenBatchTransaction({
    to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
    chain: 'BSC',
    tokenId: [['123'], ['321']],
    amounts: [['1000'], ['100']],
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const preparedTransferMultiTokenTransaction = await bscSDK.multiToken.prepare.transferMultiTokenTransaction(
    {
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'BSC',
      tokenId: '123',
      amount: '10',
      fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    },
  )

  const sentTransferMultiTokenTransaction = await bscSDK.multiToken.send.transferMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    chain: 'BSC',
    tokenId: '123',
    amount: '10',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const preparedTransferMultiTokenBatchTransaction =
    await bscSDK.multiToken.prepare.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'BSC',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenBatchTransaction =
    await bscSDK.multiToken.send.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'BSC',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedBurnMultiTokenTransaction = await bscSDK.multiToken.prepare.burnMultiTokenTransaction({
    chain: 'BSC',
    tokenId: '123',
    amount: '1',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
  })

  const sentBurnMultiTokenTransaction = await bscSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'BSC',
    tokenId: '123',
    amount: '1',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
  })

  const preparedBurnMultiTokenBatchTransaction =
    await bscSDK.multiToken.prepare.burnMultiTokenBatchTransaction({
      chain: 'BSC',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    })

  const sentMintBurnTokenBatchTransaction = await bscSDK.multiToken.send.burnMultiTokenBatchTransaction({
    chain: 'BSC',
    tokenId: ['123', '321'],
    amounts: ['1000', '100'],
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
  })

  // CUSTODIAL
  const preparedTransferFromCustodialWallet = await bscSDK.custodial.prepare.transferFromCustodialWallet({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const sentTransferFromCustodialWallet = await bscSDK.custodial.send.transferFromCustodialWallet({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const preparedBatchTransferFromCustodialWallet =
    await bscSDK.custodial.prepare.batchTransferFromCustodialWallet({
      chain: 'BSC',
      fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      contractType: [0, 1, 2, 3],
      custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
      tokenAddress: [
        '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
        '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698',
        '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
        '0',
      ],
      recipient: [
        '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
        '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
        '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
        '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      ],
      amount: ['1', '0', '1', '3'],
    } as TransferCustodialWalletBatch)

  const sentBatchTransferFromCustodialWallet = await bscSDK.custodial.send.batchTransferFromCustodialWallet({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: [0, 1, 2, 3],
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: [
      '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
      '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698',
      '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
      '0',
    ],
    recipient: [
      '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    ],
    amount: ['1', '0', '1', '3'],
  } as TransferCustodialWalletBatch)

  const preparedApproveFromCustodialWallet = await bscSDK.custodial.prepare.approveFromCustodialWallet({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const sentApproveFromCustodialWallet = await bscSDK.custodial.send.approveFromCustodialWallet({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const preparedCustodialWalletBatch = await bscSDK.custodial.prepare.custodialWalletBatch({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })

  const sentCustodialWalletBatch = await bscSDK.custodial.send.custodialWalletBatch({
    chain: 'BSC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })
}

export async function bscTxFeesCovered(): Promise<void> {
  const generateCustodialWalletBatch = await bscSDK.custodial.send.custodialWalletBatch({
    chain: 'BSC',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    feesCovered: true,
  })
}

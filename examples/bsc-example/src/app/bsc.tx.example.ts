import {
  BurnNft,
  DeployNft,
  MintMultipleNft,
  MintNft,
  TransferNft,
  UpdateCashbackValueForAuthorNft,
} from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscTxWithSignatureIdExample(): Promise<void> {
  const preparedDeployErc20Transaction = await bscSDK.transaction.erc20.prepare.deploySignedTransaction({
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

  const sentDeployErc20Transaction = await bscSDK.transaction.erc20.send.deploySignedTransaction({
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

  const preparedTransferErc20Transaction = await bscSDK.transaction.erc20.prepare.transferSignedTransaction({
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

  const sentTransferErc20Transaction = await bscSDK.transaction.erc20.send.transferSignedTransaction({
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

  const preparedMintErc20Transaction = await bscSDK.transaction.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await bscSDK.transaction.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await bscSDK.transaction.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await bscSDK.transaction.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const preparedDeployErc721Transaction = await bscSDK.transaction.erc721.prepare.deploySignedTransaction({
    chain: DeployNft.chain.BSC,
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentDeployErc721Transaction = await bscSDK.transaction.erc721.send.deploySignedTransaction({
    chain: DeployNft.chain.BSC,
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintSignedTransaction = await bscSDK.transaction.erc721.prepare.mintSignedTransaction({
    chain: MintNft.chain.BSC,
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

  const sentMintSignedTransaction = await bscSDK.transaction.erc721.send.mintSignedTransaction({
    chain: MintNft.chain.BSC,
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

  const preparedMintMultipleSignedTransaction =
    await bscSDK.transaction.erc721.prepare.mintMultipleSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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

  const sentMintMultipleSignedTransaction =
    await bscSDK.transaction.erc721.send.mintMultipleSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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

  const preparedMintCashbackSignedTransaction =
    await bscSDK.transaction.erc721.prepare.mintCashbackSignedTransaction({
      chain: MintNft.chain.BSC,
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

  const sentMintCashbackSignedTransaction =
    await bscSDK.transaction.erc721.send.mintCashbackSignedTransaction({
      chain: MintNft.chain.BSC,
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
    await bscSDK.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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
    await bscSDK.transaction.erc721.send.mintMultipleCashbackSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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

  const preparedMintProvenanceSignedTransaction =
    await bscSDK.transaction.erc721.prepare.mintProvenanceSignedTransaction({
      chain: MintNft.chain.BSC,
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

  const sentMintProvenanceSignedTransaction =
    await bscSDK.transaction.erc721.send.mintProvenanceSignedTransaction({
      chain: MintNft.chain.BSC,
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
    await bscSDK.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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
    await bscSDK.transaction.erc721.send.mintMultipleProvenanceSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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

  const preparedTransferSignedTransaction = await bscSDK.transaction.erc721.prepare.transferSignedTransaction(
    {
      chain: TransferNft.chain.BSC,
      tokenId: '453453',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    },
  )

  const sentTransferSignedTransaction = await bscSDK.transaction.erc721.send.transferSignedTransaction({
    chain: TransferNft.chain.BSC,
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
    await bscSDK.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction({
      chain: UpdateCashbackValueForAuthorNft.chain.BSC,
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
    await bscSDK.transaction.erc721.send.updateCashbackForAuthorSignedTransaction({
      chain: UpdateCashbackValueForAuthorNft.chain.BSC,
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

  const preparedBurnErc721Transaction = await bscSDK.transaction.erc721.prepare.burnSignedTransaction({
    chain: BurnNft.chain.BSC,
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentBurnErc721Transaction = await bscSDK.transaction.erc721.send.burnSignedTransaction({
    chain: BurnNft.chain.BSC,
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })
}

export async function bscTxWithPrivateKeyExample(): Promise<void> {
  const preparedDeployErc20Transaction = await bscSDK.transaction.erc20.prepare.deploySignedTransaction({
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

  const sentDeployErc20Transaction = await bscSDK.transaction.erc20.send.deploySignedTransaction({
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

  const preparedTransferErc20Transaction = await bscSDK.transaction.erc20.prepare.transferSignedTransaction({
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

  const sentTransferErc20Transaction = await bscSDK.transaction.erc20.send.transferSignedTransaction({
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

  const preparedMintErc20Transaction = await bscSDK.transaction.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await bscSDK.transaction.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await bscSDK.transaction.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await bscSDK.transaction.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const preparedDeployErc721Transaction = await bscSDK.transaction.erc721.prepare.deploySignedTransaction({
    chain: DeployNft.chain.BSC,
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentDeployErc721Transaction = await bscSDK.transaction.erc721.send.deploySignedTransaction({
    chain: DeployNft.chain.BSC,
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintSignedTransaction = await bscSDK.transaction.erc721.prepare.mintSignedTransaction({
    chain: MintNft.chain.BSC,
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

  const sentMintSignedTransaction = await bscSDK.transaction.erc721.send.mintSignedTransaction({
    chain: MintNft.chain.BSC,
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

  const preparedMintMultipleSignedTransaction =
    await bscSDK.transaction.erc721.prepare.mintMultipleSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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

  const sentMintMultipleSignedTransaction =
    await bscSDK.transaction.erc721.send.mintMultipleSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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

  const preparedMintCashbackSignedTransaction =
    await bscSDK.transaction.erc721.prepare.mintCashbackSignedTransaction({
      chain: MintNft.chain.BSC,
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

  const sentMintCashbackSignedTransaction =
    await bscSDK.transaction.erc721.send.mintCashbackSignedTransaction({
      chain: MintNft.chain.BSC,
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
    await bscSDK.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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
    await bscSDK.transaction.erc721.send.mintMultipleCashbackSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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

  const preparedMintProvenanceSignedTransaction =
    await bscSDK.transaction.erc721.prepare.mintProvenanceSignedTransaction({
      chain: MintNft.chain.BSC,
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

  const sentMintProvenanceSignedTransaction =
    await bscSDK.transaction.erc721.send.mintProvenanceSignedTransaction({
      chain: MintNft.chain.BSC,
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
    await bscSDK.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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
    await bscSDK.transaction.erc721.send.mintMultipleProvenanceSignedTransaction({
      chain: MintMultipleNft.chain.BSC,
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

  const preparedTransferSignedTransaction = await bscSDK.transaction.erc721.prepare.transferSignedTransaction(
    {
      chain: TransferNft.chain.BSC,
      tokenId: '453453',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      nonce: 46533715.43995557,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    },
  )

  const sentTransferSignedTransaction = await bscSDK.transaction.erc721.send.transferSignedTransaction({
    chain: TransferNft.chain.BSC,
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
    await bscSDK.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction({
      chain: UpdateCashbackValueForAuthorNft.chain.BSC,
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
    await bscSDK.transaction.erc721.send.updateCashbackForAuthorSignedTransaction({
      chain: UpdateCashbackValueForAuthorNft.chain.BSC,
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

  const preparedBurnErc721Transaction = await bscSDK.transaction.erc721.prepare.burnSignedTransaction({
    chain: BurnNft.chain.BSC,
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentBurnErc721Transaction = await bscSDK.transaction.erc721.send.burnSignedTransaction({
    chain: BurnNft.chain.BSC,
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })
}

import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethTxWithSignatureIdExample(): Promise<void> {
  const preparedDeployErc20Transaction = await ethSDK.transaction.erc20.prepare.deploySignedTransaction({
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

  const sentDeployErc20Transaction = await ethSDK.transaction.erc20.send.deploySignedTransaction({
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

  const preparedTransferErc20Transaction = await ethSDK.transaction.erc20.prepare.transferSignedTransaction({
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

  const sentTransferErc20Transaction = await ethSDK.transaction.erc20.send.transferSignedTransaction({
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

  const preparedMintErc20Transaction = await ethSDK.transaction.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await ethSDK.transaction.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await ethSDK.transaction.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await ethSDK.transaction.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const preparedDeployErc721Transaction = await ethSDK.transaction.erc721.prepare.deploySignedTransaction({
    chain: 'ETH',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentDeployErc721Transaction = await ethSDK.transaction.erc721.send.deploySignedTransaction({
    chain: 'ETH',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintSignedTransaction = await ethSDK.transaction.erc721.prepare.mintSignedTransaction({
    chain: 'ETH',
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

  const sentMintSignedTransaction = await ethSDK.transaction.erc721.send.mintSignedTransaction({
    chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintMultipleSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintMultipleSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintCashbackSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintCashbackSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintMultipleCashbackSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintProvenanceSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintProvenanceSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintMultipleProvenanceSignedTransaction({
      chain: 'ETH',
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

  const preparedTransferSignedTransaction = await ethSDK.transaction.erc721.prepare.transferSignedTransaction(
    {
      chain: 'ETH',
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

  const sentTransferSignedTransaction = await ethSDK.transaction.erc721.send.transferSignedTransaction({
    chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.updateCashbackForAuthorSignedTransaction({
      chain: 'ETH',
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

  const preparedBurnErc721Transaction = await ethSDK.transaction.erc721.prepare.burnSignedTransaction({
    chain: 'ETH',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentBurnErc721Transaction = await ethSDK.transaction.erc721.send.burnSignedTransaction({
    chain: 'ETH',
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

export async function ethTxWithPrivateKeyExample(): Promise<void> {
  const preparedDeployErc20Transaction = await ethSDK.transaction.erc20.prepare.deploySignedTransaction({
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

  const sentDeployErc20Transaction = await ethSDK.transaction.erc20.send.deploySignedTransaction({
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

  const preparedTransferErc20Transaction = await ethSDK.transaction.erc20.prepare.transferSignedTransaction({
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

  const sentTransferErc20Transaction = await ethSDK.transaction.erc20.send.transferSignedTransaction({
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

  const preparedMintErc20Transaction = await ethSDK.transaction.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await ethSDK.transaction.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await ethSDK.transaction.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await ethSDK.transaction.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const preparedDeployErc721Transaction = await ethSDK.transaction.erc721.prepare.deploySignedTransaction({
    chain: 'ETH',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentDeployErc721Transaction = await ethSDK.transaction.erc721.send.deploySignedTransaction({
    chain: 'ETH',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintSignedTransaction = await ethSDK.transaction.erc721.prepare.mintSignedTransaction({
    chain: 'ETH',
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

  const sentMintSignedTransaction = await ethSDK.transaction.erc721.send.mintSignedTransaction({
    chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintMultipleSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintMultipleSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintCashbackSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintCashbackSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintMultipleCashbackSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintProvenanceSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintProvenanceSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.mintMultipleProvenanceSignedTransaction({
      chain: 'ETH',
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

  const preparedTransferSignedTransaction = await ethSDK.transaction.erc721.prepare.transferSignedTransaction(
    {
      chain: 'ETH',
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

  const sentTransferSignedTransaction = await ethSDK.transaction.erc721.send.transferSignedTransaction({
    chain: 'ETH',
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
    await ethSDK.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction({
      chain: 'ETH',
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
    await ethSDK.transaction.erc721.send.updateCashbackForAuthorSignedTransaction({
      chain: 'ETH',
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

  const preparedBurnErc721Transaction = await ethSDK.transaction.erc721.prepare.burnSignedTransaction({
    chain: 'ETH',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentBurnErc721Transaction = await ethSDK.transaction.erc721.send.burnSignedTransaction({
    chain: 'ETH',
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

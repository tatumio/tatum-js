import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoTxWithSignatureIdExample(): Promise<void> {
  const preparedDeployErc721Transaction = await celoSDK.transaction.erc721.prepare.deploySignedTransaction({
    chain: 'CELO',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentDeployErc721Transaction = await celoSDK.transaction.erc721.send.deploySignedTransaction({
    chain: 'CELO',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedMintSignedTransaction = await celoSDK.transaction.erc721.prepare.mintSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentMintSignedTransaction = await celoSDK.transaction.erc721.send.mintSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedMintMultipleSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintMultipleSignedTransaction({
      chain: 'CELO',
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
      feeCurrency: 'CUSD',
    })

  const sentMintMultipleSignedTransaction =
    await celoSDK.transaction.erc721.send.mintMultipleSignedTransaction({
      chain: 'CELO',
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
      feeCurrency: 'CUSD',
    })

  const preparedMintCashbackSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintCashbackSignedTransaction({
      chain: 'CELO',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      tokenId: '45343653',
      url: 'https://my_token_data.com',
      cashbackValues: ['0.5', '0.5'],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentMintCashbackSignedTransaction =
    await celoSDK.transaction.erc721.send.mintCashbackSignedTransaction({
      chain: 'CELO',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      tokenId: '45343653',
      url: 'https://my_token_data.com',
      cashbackValues: ['0.5', '0.5'],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedMintMultipleCashbackSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction({
      chain: 'CELO',
      tokenId: ['53564656', '536456456'],
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      url: ['https://my_token_data.com', 'https://my_token_data2.com'],
      cashbackValues: [['0.5'], ['0.5']],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentMintMultipleCashbackSignedTransaction =
    await celoSDK.transaction.erc721.send.mintMultipleCashbackSignedTransaction({
      chain: 'CELO',
      tokenId: ['53564656', '536456456'],
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      url: ['https://my_token_data.com', 'https://my_token_data2.com'],
      cashbackValues: [['0.5'], ['0.5']],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedMintProvenanceSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintProvenanceSignedTransaction({
      chain: 'CELO',
      tokenId: '5435345',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      url: 'https://my_token_data.com',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentMintProvenanceSignedTransaction =
    await celoSDK.transaction.erc721.send.mintProvenanceSignedTransaction({
      chain: 'CELO',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      tokenId: '5435345',
      url: 'https://my_token_data.com',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedMintMultipleProvenanceSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction({
      chain: 'CELO',
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      tokenId: ['53564656', '536456456'],
      url: ['https://my_token_data.com'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fixedValues: [['0.5'], ['0.5']],
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentMintMultipleProvenanceSignedTransaction =
    await celoSDK.transaction.erc721.send.mintMultipleProvenanceSignedTransaction({
      chain: 'CELO',
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      tokenId: ['53564656', '536456456'],
      url: ['https://my_token_data.com'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fixedValues: [['0.5'], ['0.5']],
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedTransferSignedTransaction =
    await celoSDK.transaction.erc721.prepare.transferSignedTransaction({
      chain: 'CELO',
      tokenId: '453453',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentTransferSignedTransaction = await celoSDK.transaction.erc721.send.transferSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedUpdateCashbackForAuthorSignedTransaction =
    await celoSDK.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction({
      chain: 'CELO',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentUpdateCashbackForAuthorSignedTransaction =
    await celoSDK.transaction.erc721.send.updateCashbackForAuthorSignedTransaction({
      chain: 'CELO',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedBurnErc721Transaction = await celoSDK.transaction.erc721.prepare.burnSignedTransaction({
    chain: 'CELO',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentBurnErc721Transaction = await celoSDK.transaction.erc721.send.burnSignedTransaction({
    chain: 'CELO',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  // ERC1155(MULTI TOKEN)
  const preparedDeployMultiTokenTransaction =
    await celoSDK.transaction.multiToken.prepare.deployMultiTokenTransaction({
      chain: 'CELO',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      uri: 'tatum',
      feeCurrency: 'CUSD',
    })

  const sentDeployMultiTokenTransaction =
    await celoSDK.transaction.multiToken.send.deployMultiTokenTransaction({
      chain: 'CELO',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      uri: 'tatum',
      feeCurrency: 'CUSD',
    })

  const preparedMintMultiTokenTransaction =
    await celoSDK.transaction.multiToken.prepare.mintMultiTokenTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: '123',
      amount: '1000',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentMintMultiTokenTransaction = await celoSDK.transaction.multiToken.send.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    chain: 'CELO',
    tokenId: '123',
    amount: '1000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const preparedMintMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.prepare.mintMultiTokenBatchTransaction({
      to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
      chain: 'CELO',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentMintMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.send.mintMultiTokenBatchTransaction({
      to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
      chain: 'CELO',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const preparedTransferMultiTokenTransaction =
    await celoSDK.transaction.multiToken.prepare.transferMultiTokenTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: '123',
      amount: '10',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentTransferMultiTokenTransaction =
    await celoSDK.transaction.multiToken.send.transferMultiTokenTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: '123',
      amount: '10',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const preparedTransferMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.prepare.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentTransferMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.send.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const preparedBurnMultiTokenTransaction =
    await celoSDK.transaction.multiToken.prepare.burnMultiTokenTransaction({
      chain: 'CELO',
      tokenId: '123',
      amount: '1',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      feeCurrency: 'CUSD',
    })

  const sentBurnMultiTokenTransaction = await celoSDK.transaction.multiToken.send.burnMultiTokenTransaction({
    chain: 'CELO',
    tokenId: '123',
    amount: '1',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    feeCurrency: 'CUSD',
  })

  const preparedBurnMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.prepare.burnMultiTokenBatchTransaction({
      chain: 'CELO',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      feeCurrency: 'CUSD',
    })

  const sentMintBurnTokenBatchTransaction =
    await celoSDK.transaction.multiToken.send.burnMultiTokenBatchTransaction({
      chain: 'CELO',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      feeCurrency: 'CUSD',
    })

  const preparedCustodialWalletSignedTransaction =
    await celoSDK.transaction.custodial.prepare.generateCustodialWalletSignedTransaction({
      chain: 'CELO',
      feeCurrency: 'CUSD',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      enableFungibleTokens: true,
      enableNonFungibleTokens: true,
      enableSemiFungibleTokens: false,
      enableBatchTransactions: true,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const sentCustodialWalletSignedTransaction =
    await celoSDK.transaction.custodial.send.generateCustodialWalletSignedTransaction({
      chain: 'CELO',
      feeCurrency: 'CUSD',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      enableFungibleTokens: true,
      enableNonFungibleTokens: true,
      enableSemiFungibleTokens: false,
      enableBatchTransactions: true,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })
}

export async function celoTxWithPrivateKeyExample(): Promise<void> {
  const preparedDeployErc721Transaction = await celoSDK.transaction.erc721.prepare.deploySignedTransaction({
    chain: 'CELO',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentDeployErc721Transaction = await celoSDK.transaction.erc721.send.deploySignedTransaction({
    chain: 'CELO',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedMintSignedTransaction = await celoSDK.transaction.erc721.prepare.mintSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentMintSignedTransaction = await celoSDK.transaction.erc721.send.mintSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedMintMultipleSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintMultipleSignedTransaction({
      chain: 'CELO',
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
      feeCurrency: 'CUSD',
    })

  const sentMintMultipleSignedTransaction =
    await celoSDK.transaction.erc721.send.mintMultipleSignedTransaction({
      chain: 'CELO',
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
      feeCurrency: 'CUSD',
    })

  const preparedMintCashbackSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintCashbackSignedTransaction({
      chain: 'CELO',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      tokenId: '45343653',
      url: 'https://my_token_data.com',
      cashbackValues: ['0.5', '0.5'],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentMintCashbackSignedTransaction =
    await celoSDK.transaction.erc721.send.mintCashbackSignedTransaction({
      chain: 'CELO',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      tokenId: '45343653',
      url: 'https://my_token_data.com',
      cashbackValues: ['0.5', '0.5'],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedMintMultipleCashbackSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction({
      chain: 'CELO',
      tokenId: ['53564656', '536456456'],
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      url: ['https://my_token_data.com', 'https://my_token_data2.com'],
      cashbackValues: [['0.5'], ['0.5']],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentMintMultipleCashbackSignedTransaction =
    await celoSDK.transaction.erc721.send.mintMultipleCashbackSignedTransaction({
      chain: 'CELO',
      tokenId: ['53564656', '536456456'],
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      url: ['https://my_token_data.com', 'https://my_token_data2.com'],
      cashbackValues: [['0.5'], ['0.5']],
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedMintProvenanceSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintProvenanceSignedTransaction({
      chain: 'CELO',
      tokenId: '5435345',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      url: 'https://my_token_data.com',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentMintProvenanceSignedTransaction =
    await celoSDK.transaction.erc721.send.mintProvenanceSignedTransaction({
      chain: 'CELO',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      tokenId: '5435345',
      url: 'https://my_token_data.com',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedMintMultipleProvenanceSignedTransaction =
    await celoSDK.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction({
      chain: 'CELO',
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      tokenId: ['53564656', '536456456'],
      url: ['https://my_token_data.com'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fixedValues: [['0.5'], ['0.5']],
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentMintMultipleProvenanceSignedTransaction =
    await celoSDK.transaction.erc721.send.mintMultipleProvenanceSignedTransaction({
      chain: 'CELO',
      to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
      tokenId: ['53564656', '536456456'],
      url: ['https://my_token_data.com'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fixedValues: [['0.5'], ['0.5']],
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedTransferSignedTransaction =
    await celoSDK.transaction.erc721.prepare.transferSignedTransaction({
      chain: 'CELO',
      tokenId: '453453',
      to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentTransferSignedTransaction = await celoSDK.transaction.erc721.send.transferSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedUpdateCashbackForAuthorSignedTransaction =
    await celoSDK.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction({
      chain: 'CELO',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentUpdateCashbackForAuthorSignedTransaction =
    await celoSDK.transaction.erc721.send.updateCashbackForAuthorSignedTransaction({
      chain: 'CELO',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedBurnErc721Transaction = await celoSDK.transaction.erc721.prepare.burnSignedTransaction({
    chain: 'CELO',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentBurnErc721Transaction = await celoSDK.transaction.erc721.send.burnSignedTransaction({
    chain: 'CELO',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  // ERC1155(MULTI TOKEN)
  const preparedDeployMultiTokenTransaction =
    await celoSDK.transaction.multiToken.prepare.deployMultiTokenTransaction({
      chain: 'CELO',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      uri: 'tatum',
      feeCurrency: 'CUSD',
    })

  const sentDeployMultiTokenTransaction =
    await celoSDK.transaction.multiToken.send.deployMultiTokenTransaction({
      chain: 'CELO',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      uri: 'tatum',
      feeCurrency: 'CUSD',
    })

  const preparedMintMultiTokenTransaction =
    await celoSDK.transaction.multiToken.prepare.mintMultiTokenTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: '123',
      amount: '1000',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentMintMultiTokenTransaction = await celoSDK.transaction.multiToken.send.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    chain: 'CELO',
    tokenId: '123',
    amount: '1000',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const preparedMintMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.prepare.mintMultiTokenBatchTransaction({
      to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
      chain: 'CELO',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentMintMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.send.mintMultiTokenBatchTransaction({
      to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
      chain: 'CELO',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const preparedTransferMultiTokenTransaction =
    await celoSDK.transaction.multiToken.prepare.transferMultiTokenTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: '123',
      amount: '10',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenTransaction =
    await celoSDK.transaction.multiToken.send.transferMultiTokenTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: '123',
      amount: '10',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedTransferMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.prepare.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.send.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      chain: 'CELO',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedBurnMultiTokenTransaction =
    await celoSDK.transaction.multiToken.prepare.burnMultiTokenTransaction({
      chain: 'CELO',
      tokenId: '123',
      amount: '1',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      feeCurrency: 'CUSD',
    })

  const sentBurnMultiTokenTransaction = await celoSDK.transaction.multiToken.send.burnMultiTokenTransaction({
    chain: 'CELO',
    tokenId: '123',
    amount: '1',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    feeCurrency: 'CUSD',
  })

  const preparedBurnMultiTokenBatchTransaction =
    await celoSDK.transaction.multiToken.prepare.burnMultiTokenBatchTransaction({
      chain: 'CELO',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      feeCurrency: 'CUSD',
    })

  const sentMintBurnTokenBatchTransaction =
    await celoSDK.transaction.multiToken.send.burnMultiTokenBatchTransaction({
      chain: 'CELO',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      feeCurrency: 'CUSD',
    })

  const preparedCustodialWalletSignedTransaction =
    await celoSDK.transaction.custodial.prepare.generateCustodialWalletSignedTransaction({
      chain: 'CELO',
      feeCurrency: 'CUSD',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      enableFungibleTokens: true,
      enableNonFungibleTokens: true,
      enableSemiFungibleTokens: false,
      enableBatchTransactions: true,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })

  const sentCustodialWalletSignedTransaction =
    await celoSDK.transaction.custodial.send.generateCustodialWalletSignedTransaction({
      chain: 'CELO',
      feeCurrency: 'CUSD',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      enableFungibleTokens: true,
      enableNonFungibleTokens: true,
      enableSemiFungibleTokens: false,
      enableBatchTransactions: true,
      fee: {
        gasLimit: '326452',
        gasPrice: '20',
      },
    })
}

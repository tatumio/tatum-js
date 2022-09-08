import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoTxWithSignatureIdExample(): Promise<void> {
  const preparedTransferNativeTransaction = await celoSDK.transaction.prepare.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
    amount: '1',
  })

  const sentTransferNativeTransaction = await celoSDK.transaction.send.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
    amount: '1',
  })

  const preparedDeployErc721Transaction = await celoSDK.nft.prepare.deploySignedTransaction({
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentDeployErc721Transaction = await celoSDK.nft.send.deploySignedTransaction({
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedMintSignedTransaction = await celoSDK.nft.prepare.mintSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentMintSignedTransaction = await celoSDK.nft.send.mintSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedMintMultipleSignedTransaction = await celoSDK.nft.prepare.mintMultipleSignedTransaction({
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

  const sentMintMultipleSignedTransaction = await celoSDK.nft.send.mintMultipleSignedTransaction({
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

  const preparedMintCashbackSignedTransaction = await celoSDK.nft.prepare.mintCashbackSignedTransaction({
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

  const sentMintCashbackSignedTransaction = await celoSDK.nft.send.mintCashbackSignedTransaction({
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
    await celoSDK.nft.prepare.mintMultipleCashbackSignedTransaction({
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
    await celoSDK.nft.send.mintMultipleCashbackSignedTransaction({
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

  const preparedMintProvenanceSignedTransaction = await celoSDK.nft.prepare.mintProvenanceSignedTransaction({
    chain: 'CELO',
    tokenId: '5435345',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentMintProvenanceSignedTransaction = await celoSDK.nft.send.mintProvenanceSignedTransaction({
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
    await celoSDK.nft.prepare.mintMultipleProvenanceSignedTransaction({
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
    await celoSDK.nft.send.mintMultipleProvenanceSignedTransaction({
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

  const preparedTransferSignedTransaction = await celoSDK.nft.prepare.transferSignedTransaction({
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentTransferSignedTransaction = await celoSDK.nft.send.transferSignedTransaction({
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedUpdateCashbackForAuthorSignedTransaction =
    await celoSDK.nft.prepare.updateCashbackForAuthorSignedTransaction({
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentUpdateCashbackForAuthorSignedTransaction =
    await celoSDK.nft.send.updateCashbackForAuthorSignedTransaction({
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedBurnErc721Transaction = await celoSDK.nft.prepare.burnSignedTransaction({
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentBurnErc721Transaction = await celoSDK.nft.send.burnSignedTransaction({
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  // ERC1155(MULTI TOKEN)
  const preparedDeployMultiTokenTransaction = await celoSDK.multiToken.prepare.deployMultiTokenTransaction({
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    uri: 'tatum',
    feeCurrency: 'CUSD',
  })

  const sentDeployMultiTokenTransaction = await celoSDK.multiToken.send.deployMultiTokenTransaction({
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    uri: 'tatum',
    feeCurrency: 'CUSD',
  })

  const preparedMintMultiTokenTransaction = await celoSDK.multiToken.prepare.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    tokenId: '123',
    amount: '1000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const sentMintMultiTokenTransaction = await celoSDK.multiToken.send.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    tokenId: '123',
    amount: '1000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const preparedMintMultiTokenBatchTransaction =
    await celoSDK.multiToken.prepare.mintMultiTokenBatchTransaction({
      to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentMintMultiTokenBatchTransaction = await celoSDK.multiToken.send.mintMultiTokenBatchTransaction({
    to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
    tokenId: [['123'], ['321']],
    amounts: [['1000'], ['100']],
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const preparedTransferMultiTokenTransaction =
    await celoSDK.multiToken.prepare.transferMultiTokenTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      tokenId: '123',
      amount: '10',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentTransferMultiTokenTransaction = await celoSDK.multiToken.send.transferMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    tokenId: '123',
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const preparedTransferMultiTokenBatchTransaction =
    await celoSDK.multiToken.prepare.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentTransferMultiTokenBatchTransaction =
    await celoSDK.multiToken.send.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const preparedBurnMultiTokenTransaction = await celoSDK.multiToken.prepare.burnMultiTokenTransaction({
    tokenId: '123',
    amount: '1',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    feeCurrency: 'CUSD',
  })

  const sentBurnMultiTokenTransaction = await celoSDK.multiToken.send.burnMultiTokenTransaction({
    tokenId: '123',
    amount: '1',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    feeCurrency: 'CUSD',
  })

  const preparedBurnMultiTokenBatchTransaction =
    await celoSDK.multiToken.prepare.burnMultiTokenBatchTransaction({
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      feeCurrency: 'CUSD',
    })

  const sentMintBurnTokenBatchTransaction = await celoSDK.multiToken.send.burnMultiTokenBatchTransaction({
    tokenId: ['123', '321'],
    amounts: ['1000', '100'],
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    feeCurrency: 'CUSD',
  })

  const preparedTransferFromCustodialWallet = await celoSDK.custodial.prepare.transferFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const sentTransferFromCustodialWallet = await celoSDK.custodial.send.transferFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const preparedBatchTransferFromCustodialWallet =
    await celoSDK.custodial.prepare.batchTransferFromCustodialWallet({
      chain: 'CELO',
      feeCurrency: 'CELO',
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
    })

  const sentBatchTransferFromCustodialWallet = await celoSDK.custodial.send.batchTransferFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
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
  })

  const preparedApproveFromCustodialWallet = await celoSDK.custodial.prepare.approveFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const sentApproveFromCustodialWallet = await celoSDK.custodial.send.approveFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const preparedCustodialWalletBatch = await celoSDK.custodial.prepare.custodialWalletBatch({
    chain: 'CELO',
    feeCurrency: 'CELO',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })

  const sentCustodialWalletBatch = await celoSDK.custodial.send.custodialWalletBatch({
    chain: 'CELO',
    feeCurrency: 'CELO',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })
}

export async function celoTxWithPrivateKeyExample(): Promise<void> {
  const preparedDeployErc721Transaction = await celoSDK.nft.prepare.deploySignedTransaction({
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentDeployErc721Transaction = await celoSDK.nft.send.deploySignedTransaction({
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedMintSignedTransaction = await celoSDK.nft.prepare.mintSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentMintSignedTransaction = await celoSDK.nft.send.mintSignedTransaction({
    chain: 'CELO',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    url: 'https://my_token_data.com',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedMintMultipleSignedTransaction = await celoSDK.nft.prepare.mintMultipleSignedTransaction({
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

  const sentMintMultipleSignedTransaction = await celoSDK.nft.send.mintMultipleSignedTransaction({
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

  const preparedMintCashbackSignedTransaction = await celoSDK.nft.prepare.mintCashbackSignedTransaction({
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

  const sentMintCashbackSignedTransaction = await celoSDK.nft.send.mintCashbackSignedTransaction({
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
    await celoSDK.nft.prepare.mintMultipleCashbackSignedTransaction({
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
    await celoSDK.nft.send.mintMultipleCashbackSignedTransaction({
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

  const preparedMintProvenanceSignedTransaction = await celoSDK.nft.prepare.mintProvenanceSignedTransaction({
    chain: 'CELO',
    tokenId: '5435345',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    url: 'https://my_token_data.com',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentMintProvenanceSignedTransaction = await celoSDK.nft.send.mintProvenanceSignedTransaction({
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
    await celoSDK.nft.prepare.mintMultipleProvenanceSignedTransaction({
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
    await celoSDK.nft.send.mintMultipleProvenanceSignedTransaction({
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

  const preparedTransferSignedTransaction = await celoSDK.nft.prepare.transferSignedTransaction({
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentTransferSignedTransaction = await celoSDK.nft.send.transferSignedTransaction({
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const preparedUpdateCashbackForAuthorSignedTransaction =
    await celoSDK.nft.prepare.updateCashbackForAuthorSignedTransaction({
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const sentUpdateCashbackForAuthorSignedTransaction =
    await celoSDK.nft.send.updateCashbackForAuthorSignedTransaction({
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      nonce: 46533715.43995557,
      feeCurrency: 'CUSD',
    })

  const preparedBurnErc721Transaction = await celoSDK.nft.prepare.burnSignedTransaction({
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  const sentBurnErc721Transaction = await celoSDK.nft.send.burnSignedTransaction({
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    feeCurrency: 'CUSD',
  })

  // ERC1155(MULTI TOKEN)
  const preparedDeployMultiTokenTransaction = await celoSDK.multiToken.prepare.deployMultiTokenTransaction({
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    uri: 'tatum',
    feeCurrency: 'CUSD',
  })

  const sentDeployMultiTokenTransaction = await celoSDK.multiToken.send.deployMultiTokenTransaction({
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    uri: 'tatum',
    feeCurrency: 'CUSD',
  })

  const preparedMintMultiTokenTransaction = await celoSDK.multiToken.prepare.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    tokenId: '123',
    amount: '1000',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const sentMintMultiTokenTransaction = await celoSDK.multiToken.send.mintMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    tokenId: '123',
    amount: '1000',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const preparedMintMultiTokenBatchTransaction =
    await celoSDK.multiToken.prepare.mintMultiTokenBatchTransaction({
      to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CUSD',
    })

  const sentMintMultiTokenBatchTransaction = await celoSDK.multiToken.send.mintMultiTokenBatchTransaction({
    to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
    tokenId: [['123'], ['321']],
    amounts: [['1000'], ['100']],
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CUSD',
  })

  const preparedTransferMultiTokenTransaction =
    await celoSDK.multiToken.prepare.transferMultiTokenTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      tokenId: '123',
      amount: '10',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      feeCurrency: 'CELO',
    })

  const sentTransferMultiTokenTransaction = await celoSDK.multiToken.send.transferMultiTokenTransaction({
    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    tokenId: '123',
    amount: '10',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    feeCurrency: 'CELO',
  })

  const preparedTransferMultiTokenBatchTransaction =
    await celoSDK.multiToken.prepare.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenBatchTransaction =
    await celoSDK.multiToken.send.transferMultiTokenBatchTransaction({
      to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedBurnMultiTokenTransaction = await celoSDK.multiToken.prepare.burnMultiTokenTransaction({
    tokenId: '123',
    amount: '1',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    feeCurrency: 'CUSD',
  })

  const sentBurnMultiTokenTransaction = await celoSDK.multiToken.send.burnMultiTokenTransaction({
    tokenId: '123',
    amount: '1',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    feeCurrency: 'CUSD',
  })

  const preparedBurnMultiTokenBatchTransaction =
    await celoSDK.multiToken.prepare.burnMultiTokenBatchTransaction({
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
      feeCurrency: 'CUSD',
    })

  const sentMintBurnTokenBatchTransaction = await celoSDK.multiToken.send.burnMultiTokenBatchTransaction({
    tokenId: ['123', '321'],
    amounts: ['1000', '100'],
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    feeCurrency: 'CUSD',
  })

  const preparedTransferFromCustodialWallet = await celoSDK.custodial.prepare.transferFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const sentTransferFromCustodialWallet = await celoSDK.custodial.send.transferFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const preparedBatchTransferFromCustodialWallet =
    await celoSDK.custodial.prepare.batchTransferFromCustodialWallet({
      chain: 'CELO',
      feeCurrency: 'CELO',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
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
    })

  const sentBatchTransferFromCustodialWallet = await celoSDK.custodial.send.batchTransferFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
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
  })

  const preparedApproveFromCustodialWallet = await celoSDK.custodial.prepare.approveFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const sentApproveFromCustodialWallet = await celoSDK.custodial.send.approveFromCustodialWallet({
    chain: 'CELO',
    feeCurrency: 'CELO',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const preparedCustodialWalletBatch = await celoSDK.custodial.prepare.custodialWalletBatch({
    chain: 'CELO',
    feeCurrency: 'CELO',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })

  const sentCustodialWalletBatch = await celoSDK.custodial.send.custodialWalletBatch({
    chain: 'CELO',
    feeCurrency: 'CELO',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })
}

export async function celoTxFeesCovered(): Promise<void> {
  const generateCustodialWalletBatch = await celoSDK.custodial.send.custodialWalletBatch({
    chain: 'CELO',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    feesCovered: true,
  })
}

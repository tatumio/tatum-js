import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneTxWithSignatureIdExample(): Promise<void> {
  // ERC20(FUNGIBLE TOKEN)
  const preparedDeployErc20Transaction = await oneSDK.transaction.erc20.prepare.deploySignedTransaction({
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

  const sentDeployErc20Transaction = await oneSDK.transaction.erc20.send.deploySignedTransaction({
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

  const preparedTransferErc20Transaction = await oneSDK.transaction.erc20.prepare.transferSignedTransaction({
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

  const sentTransferErc20Transaction = await oneSDK.transaction.erc20.send.transferSignedTransaction({
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

  const preparedMintErc20Transaction = await oneSDK.transaction.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await oneSDK.transaction.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await oneSDK.transaction.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await oneSDK.transaction.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  // ERC721(NFT)
  const preparedDeployErc721Transaction = await oneSDK.transaction.erc721.prepare.deploySignedTransaction({
    chain: 'ONE',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentDeployErc721Transaction = await oneSDK.transaction.erc721.send.deploySignedTransaction({
    chain: 'ONE',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintSignedTransaction = await oneSDK.transaction.erc721.prepare.mintSignedTransaction({
    chain: 'ONE',
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

  const sentMintSignedTransaction = await oneSDK.transaction.erc721.send.mintSignedTransaction({
    chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintMultipleSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintMultipleSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintCashbackSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintCashbackSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintMultipleCashbackSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintProvenanceSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintProvenanceSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintMultipleProvenanceSignedTransaction({
      chain: 'ONE',
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

  const preparedTransferSignedTransaction = await oneSDK.transaction.erc721.prepare.transferSignedTransaction(
    {
      chain: 'ONE',
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

  const sentTransferSignedTransaction = await oneSDK.transaction.erc721.send.transferSignedTransaction({
    chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.updateCashbackForAuthorSignedTransaction({
      chain: 'ONE',
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

  const preparedBurnErc721Transaction = await oneSDK.transaction.erc721.prepare.burnSignedTransaction({
    chain: 'ONE',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentBurnErc721Transaction = await oneSDK.transaction.erc721.send.burnSignedTransaction({
    chain: 'ONE',
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
  const preparedDeployMultiTokenTransaction =
    await oneSDK.transaction.multiToken.prepare.deployMultiTokenTransaction({
      chain: 'ONE',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      uri: 'tatum',
    })

  const sentDeployMultiTokenTransaction =
    await oneSDK.transaction.multiToken.send.deployMultiTokenTransaction({
      chain: 'ONE',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      uri: 'tatum',
    })

  const preparedMintMultiTokenTransaction =
    await oneSDK.transaction.multiToken.prepare.mintMultiTokenTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: '123',
      amount: '1000',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentMintMultiTokenTransaction = await oneSDK.transaction.multiToken.send.mintMultiTokenTransaction({
    to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
    chain: 'ONE',
    tokenId: '123',
    amount: '1000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const preparedMintMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.prepare.mintMultiTokenBatchTransaction({
      to: ['one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde', 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'],
      chain: 'ONE',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentMintMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.send.mintMultiTokenBatchTransaction({
      to: ['one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde', 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'],
      chain: 'ONE',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedTransferMultiTokenTransaction =
    await oneSDK.transaction.multiToken.prepare.transferMultiTokenTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: '123',
      amount: '10',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenTransaction =
    await oneSDK.transaction.multiToken.send.transferMultiTokenTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: '123',
      amount: '10',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedTransferMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.prepare.transferMultiTokenBatchTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.send.transferMultiTokenBatchTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedBurnMultiTokenTransaction =
    await oneSDK.transaction.multiToken.prepare.burnMultiTokenTransaction({
      chain: 'ONE',
      tokenId: '123',
      amount: '1',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
    })

  const sentBurnMultiTokenTransaction = await oneSDK.transaction.multiToken.send.burnMultiTokenTransaction({
    chain: 'ONE',
    tokenId: '123',
    amount: '1',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
  })

  const preparedBurnMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.prepare.burnMultiTokenBatchTransaction({
      chain: 'ONE',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
    })

  const sentMintBurnTokenBatchTransaction =
    await oneSDK.transaction.multiToken.send.burnMultiTokenBatchTransaction({
      chain: 'ONE',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
    })

  // CUSTODIAL
  const preparedCustodialWalletSignedTransaction =
    await oneSDK.transaction.custodial.prepare.generateCustodialWalletSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.custodial.send.generateCustodialWalletSignedTransaction({
      chain: 'ONE',
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

export async function oneTxWithPrivateKeyExample(): Promise<void> {
  // ERC20(FUNGIBLE TOKEN)
  const preparedDeployErc20Transaction = await oneSDK.transaction.erc20.prepare.deploySignedTransaction({
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

  const sentDeployErc20Transaction = await oneSDK.transaction.erc20.send.deploySignedTransaction({
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

  const preparedTransferErc20Transaction = await oneSDK.transaction.erc20.prepare.transferSignedTransaction({
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

  const sentTransferErc20Transaction = await oneSDK.transaction.erc20.send.transferSignedTransaction({
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

  const preparedMintErc20Transaction = await oneSDK.transaction.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await oneSDK.transaction.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await oneSDK.transaction.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await oneSDK.transaction.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  // ERC721(NFT)
  const preparedDeployErc721Transaction = await oneSDK.transaction.erc721.prepare.deploySignedTransaction({
    chain: 'ONE',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentDeployErc721Transaction = await oneSDK.transaction.erc721.send.deploySignedTransaction({
    chain: 'ONE',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const preparedMintSignedTransaction = await oneSDK.transaction.erc721.prepare.mintSignedTransaction({
    chain: 'ONE',
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

  const sentMintSignedTransaction = await oneSDK.transaction.erc721.send.mintSignedTransaction({
    chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintMultipleSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintMultipleSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintCashbackSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintCashbackSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintMultipleCashbackSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintProvenanceSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintProvenanceSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.mintMultipleProvenanceSignedTransaction({
      chain: 'ONE',
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

  const preparedTransferSignedTransaction = await oneSDK.transaction.erc721.prepare.transferSignedTransaction(
    {
      chain: 'ONE',
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

  const sentTransferSignedTransaction = await oneSDK.transaction.erc721.send.transferSignedTransaction({
    chain: 'ONE',
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
    await oneSDK.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.erc721.send.updateCashbackForAuthorSignedTransaction({
      chain: 'ONE',
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

  const preparedBurnErc721Transaction = await oneSDK.transaction.erc721.prepare.burnSignedTransaction({
    chain: 'ONE',
    tokenId: '45343653',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 46533715.43995557,
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })

  const sentBurnErc721Transaction = await oneSDK.transaction.erc721.send.burnSignedTransaction({
    chain: 'ONE',
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
  const preparedDeployMultiTokenTransaction =
    await oneSDK.transaction.multiToken.prepare.deployMultiTokenTransaction({
      chain: 'ONE',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      uri: 'tatum',
    })

  const sentDeployMultiTokenTransaction =
    await oneSDK.transaction.multiToken.send.deployMultiTokenTransaction({
      chain: 'ONE',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      uri: 'tatum',
    })

  const preparedMintMultiTokenTransaction =
    await oneSDK.transaction.multiToken.prepare.mintMultiTokenTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: '123',
      amount: '1000',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentMintMultiTokenTransaction = await oneSDK.transaction.multiToken.send.mintMultiTokenTransaction({
    to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
    chain: 'ONE',
    tokenId: '123',
    amount: '1000',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
  })

  const preparedMintMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.prepare.mintMultiTokenBatchTransaction({
      to: ['one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde', 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'],
      chain: 'ONE',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentMintMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.send.mintMultiTokenBatchTransaction({
      to: ['one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde', 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'],
      chain: 'ONE',
      tokenId: [['123'], ['321']],
      amounts: [['1000'], ['100']],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedTransferMultiTokenTransaction =
    await oneSDK.transaction.multiToken.prepare.transferMultiTokenTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: '123',
      amount: '10',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenTransaction =
    await oneSDK.transaction.multiToken.send.transferMultiTokenTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: '123',
      amount: '10',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedTransferMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.prepare.transferMultiTokenBatchTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const sentTransferMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.send.transferMultiTokenBatchTransaction({
      to: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
      chain: 'ONE',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    })

  const preparedBurnMultiTokenTransaction =
    await oneSDK.transaction.multiToken.prepare.burnMultiTokenTransaction({
      chain: 'ONE',
      tokenId: '123',
      amount: '1',
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
    })

  const sentBurnMultiTokenTransaction = await oneSDK.transaction.multiToken.send.burnMultiTokenTransaction({
    chain: 'ONE',
    tokenId: '123',
    amount: '1',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
    account: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
  })

  const preparedBurnMultiTokenBatchTransaction =
    await oneSDK.transaction.multiToken.prepare.burnMultiTokenBatchTransaction({
      chain: 'ONE',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
    })

  const sentMintBurnTokenBatchTransaction =
    await oneSDK.transaction.multiToken.send.burnMultiTokenBatchTransaction({
      chain: 'ONE',
      tokenId: ['123', '321'],
      amounts: ['1000', '100'],
      fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
      contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      account: 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde',
    })

  // CUSTODIAL
  const preparedCustodialWalletSignedTransaction =
    await oneSDK.transaction.custodial.prepare.generateCustodialWalletSignedTransaction({
      chain: 'ONE',
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
    await oneSDK.transaction.custodial.send.generateCustodialWalletSignedTransaction({
      chain: 'ONE',
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

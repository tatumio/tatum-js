import { TatumTronSDK } from '@tatumio/tron'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronTxWithPrivateKeyExample(): Promise<void> {
  const preparedDeployTrc10Transaction = await tronSDK.trc10.prepare.signedTransaction({
    amount: '10',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '1000538',
  })

  const sentDeployTrc10Transaction = await tronSDK.trc10.send.signedTransaction({
    amount: '10',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '1000538',
  })

  const preparedCreateTrc10Transaction = await tronSDK.trc10.prepare.createSignedTransaction({
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    abbreviation: 'TTM',
    recipient: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    totalSupply: 100,
    url: 'https://google.com',
    name: 'mytx',
    description: 'my tx',
    decimals: 18,
  })

  const sentCreateTrc10Transaction = await tronSDK.trc10.send.createSignedTransaction({
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    abbreviation: 'TTM',
    recipient: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    totalSupply: 100,
    url: 'https://google.com',
    name: 'mytx',
    description: 'my tx',
    decimals: 18,
  })

  const accountAddress = await tronSDK.trc20.getAccountTrc20Address(
    'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
  )

  const contractDecimals = await tronSDK.trc20.getTrc20ContractDecimals(
    'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
  )

  const preparedTrc20Transaction = await tronSDK.trc20.prepare.signedTransaction({
    amount: '10',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenAddress: 'TWgHeettKLgq1hCdEUPaZNCM6hPg8JkG2X',
    feeLimit: 100,
  })

  const sentTrc20Transaction = await tronSDK.trc20.send.signedTransaction({
    amount: '10',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenAddress: 'TWgHeettKLgq1hCdEUPaZNCM6hPg8JkG2X',
    feeLimit: 100,
  })

  const preparedTrc20CreateTransaction = await tronSDK.trc20.prepare.createSignedTransaction({
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    recipient: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    totalSupply: 100,
    name: 'mytx',
    decimals: 18,
    symbol: 'TTM',
  })

  const sentTrc20CreateTransaction = await tronSDK.trc20.send.createSignedTransaction({
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    recipient: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    totalSupply: 100,
    name: 'mytx',
    decimals: 18,
    symbol: 'TTM',
  })

  const preparedDeployTrc721Transaction = await tronSDK.trc721.prepare.deploySignedTransaction({
    chain: 'TRON',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const sentDeployTrc721Transaction = await tronSDK.trc721.send.deploySignedTransaction({
    chain: 'TRON',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const preparedMintSignedTransaction = await tronSDK.trc721.prepare.mintSignedTransaction({
    chain: 'TRON',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    url: 'https://my_token_data.com',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const sentMintSignedTransaction = await tronSDK.trc721.send.mintSignedTransaction({
    chain: 'TRON',
    tokenId: '453453',
    to: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    url: 'https://my_token_data.com',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const preparedMintMultipleSignedTransaction = await tronSDK.trc721.prepare.mintMultipleSignedTransaction({
    chain: 'TRON',
    to: ['TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'],
    tokenId: ['345634563', '53545345'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const sentMintMultipleSignedTransaction = await tronSDK.trc721.send.mintMultipleSignedTransaction({
    chain: 'TRON',
    to: ['TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'],
    tokenId: ['345634563', '53545345'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const preparedMintCashbackSignedTransaction = await tronSDK.trc721.prepare.mintCashbackSignedTransaction({
    chain: 'TRON',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '45343653',
    url: 'https://my_token_data.com',
    cashbackValues: ['0.5', '0.5'],
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const sentMintCashbackSignedTransaction = await tronSDK.trc721.send.mintCashbackSignedTransaction({
    chain: 'TRON',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '45343653',
    url: 'https://my_token_data.com',
    cashbackValues: ['0.5', '0.5'],
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const preparedTransferSignedTransaction = await tronSDK.trc721.prepare.transferSignedTransaction({
    chain: 'TRON',
    tokenId: '453453',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const sentTransferSignedTransaction = await tronSDK.trc721.send.transferSignedTransaction({
    chain: 'TRON',
    tokenId: '453453',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
  })

  const preparedUpdateCashbackForAuthorSignedTransaction =
    await tronSDK.trc721.prepare.updateCashbackValueForAuthorSignedTransaction({
      chain: 'TRON',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
      feeLimit: 100,
      account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
      fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    })

  const sentUpdateCashbackForAuthorSignedTransaction =
    await tronSDK.trc721.send.updateCashbackValueForAuthorSignedTransaction({
      chain: 'TRON',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
      feeLimit: 100,
      account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
      fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    })

  const preparedBurnTrc721Transaction = await tronSDK.trc721.prepare.burnSignedTransaction({
    chain: 'TRON',
    tokenId: '45343653',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    feeLimit: 100,
  })

  const sentBurnTrc721Transaction = await tronSDK.trc721.send.burnSignedTransaction({
    chain: 'TRON',
    tokenId: '45343653',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    fromPrivateKey: '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
    feeLimit: 100,
  })
}

export async function tronTxWithSignatureIdExample(): Promise<void> {
  const preparedDeployTrc10Transaction = await tronSDK.trc10.prepare.signedTransaction({
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '1000538',
    index: 1,
  })

  const sentDeployTrc10Transaction = await tronSDK.trc10.send.signedTransaction({
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '1000538',
  })

  const preparedCreateTrc10Transaction = await tronSDK.trc10.prepare.createSignedTransaction({
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    abbreviation: 'TTM',
    recipient: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    totalSupply: 100,
    url: 'https://google.com',
    name: 'mytx',
    description: 'my tx',
    decimals: 18,
  })

  const sentCreateTrc10Transaction = await tronSDK.trc10.send.createSignedTransaction({
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    abbreviation: 'TTM',
    recipient: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    totalSupply: 100,
    url: 'https://google.com',
    name: 'mytx',
    description: 'my tx',
    decimals: 18,
  })

  const preparedTrc20Transaction = await tronSDK.trc20.prepare.signedTransaction({
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenAddress: 'TWgHeettKLgq1hCdEUPaZNCM6hPg8JkG2X',
    feeLimit: 100,
  })

  const sentTrc20Transaction = await tronSDK.trc20.send.signedTransaction({
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenAddress: 'TWgHeettKLgq1hCdEUPaZNCM6hPg8JkG2X',
    feeLimit: 100,
  })

  const preparedTrc20CreateTransaction = await tronSDK.trc20.prepare.createSignedTransaction({
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    recipient: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    totalSupply: 100,
    name: 'mytx',
    decimals: 18,
    symbol: 'TTM',
  })

  const sentTrc20CreateTransaction = await tronSDK.trc20.send.createSignedTransaction({
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    recipient: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    totalSupply: 100,
    name: 'mytx',
    decimals: 18,
    symbol: 'TTM',
  })

  const preparedDeployTrc721Transaction = await tronSDK.trc721.prepare.deploySignedTransaction({
    chain: 'TRON',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const sentDeployTrc721Transaction = await tronSDK.trc721.send.deploySignedTransaction({
    chain: 'TRON',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const preparedMintSignedTransaction = await tronSDK.trc721.prepare.mintSignedTransaction({
    chain: 'TRON',
    tokenId: '453453',
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    url: 'https://my_token_data.com',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const sentMintSignedTransaction = await tronSDK.trc721.send.mintSignedTransaction({
    chain: 'TRON',
    tokenId: '453453',
    to: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    url: 'https://my_token_data.com',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const preparedMintMultipleSignedTransaction = await tronSDK.trc721.prepare.mintMultipleSignedTransaction({
    chain: 'TRON',
    to: ['TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'],
    tokenId: ['345634563', '53545345'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const sentMintMultipleSignedTransaction = await tronSDK.trc721.send.mintMultipleSignedTransaction({
    chain: 'TRON',
    to: ['TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'],
    tokenId: ['345634563', '53545345'],
    url: ['https://my_token_data.com', 'https://my_token_data2.com'],
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const preparedMintCashbackSignedTransaction = await tronSDK.trc721.prepare.mintCashbackSignedTransaction({
    chain: 'TRON',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '45343653',
    url: 'https://my_token_data.com',
    cashbackValues: ['0.5', '0.5'],
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const sentMintCashbackSignedTransaction = await tronSDK.trc721.send.mintCashbackSignedTransaction({
    chain: 'TRON',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    tokenId: '45343653',
    url: 'https://my_token_data.com',
    cashbackValues: ['0.5', '0.5'],
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const preparedTransferSignedTransaction = await tronSDK.trc721.prepare.transferSignedTransaction({
    chain: 'TRON',
    tokenId: '453453',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const sentTransferSignedTransaction = await tronSDK.trc721.send.transferSignedTransaction({
    chain: 'TRON',
    tokenId: '453453',
    to: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    feeLimit: 100,
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
  })

  const preparedUpdateCashbackForAuthorSignedTransaction =
    await tronSDK.trc721.prepare.updateCashbackValueForAuthorSignedTransaction({
      chain: 'TRON',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
      feeLimit: 100,
      account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
      index: 1,
    })

  const sentUpdateCashbackForAuthorSignedTransaction =
    await tronSDK.trc721.send.updateCashbackValueForAuthorSignedTransaction({
      chain: 'TRON',
      tokenId: '453453',
      cashbackValue: '0.8',
      contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
      feeLimit: 100,
      account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
      index: 1,
    })

  const preparedBurnTrc721Transaction = await tronSDK.trc721.prepare.burnSignedTransaction({
    chain: 'TRON',
    tokenId: '45343653',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    feeLimit: 100,
  })

  const sentBurnTrc721Transaction = await tronSDK.trc721.send.burnSignedTransaction({
    chain: 'TRON',
    tokenId: '45343653',
    contractAddress: 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ',
    account: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    from: 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
    index: 1,
    feeLimit: 100,
  })
}

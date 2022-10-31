import { TatumEthSDK } from '@tatumio/eth'
import { SignatureId, TransactionHash } from '@tatumio/api-client'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethTxWithSignatureIdExample(): Promise<void> {
  // NATIVE
  // Transfer Fungible Token
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const sentTransferNativeTransaction = await ethSDK.transaction.send.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })
  console.log(
    `Token transaction sent with signature ID: ${(sentTransferNativeTransaction as SignatureId).signatureId}`,
  )

  // ERC20(FUNGIBLE TOKEN)
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const sentDeployErc20Transaction = await ethSDK.erc20.send.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    supply: '10000000',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    digits: 18,
    totalCap: '10000000',
    fee: {
      gasLimit: '171864',
      gasPrice: '20',
    },
  })
  console.log(
    `Token transaction sent with signature ID: ${(sentDeployErc20Transaction as SignatureId).signatureId}`,
  )

  // Transfer Fungible token
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const sentTransferErc20Transaction = await ethSDK.erc20.send.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    digits: 18,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })
  console.log(
    `Token transaction sent with signature ID: ${(sentTransferErc20Transaction as SignatureId).signatureId}`,
  )

  // Mint Fungible tokens
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Mint
  const sentMintErc20Transaction = await ethSDK.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
  })
  console.log(
    `Token transaction sent with signature ID: ${(sentMintErc20Transaction as SignatureId).signatureId}`,
  )

  //Burn Fungible Tokens
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Burn
  const sentBurnErc20Transaction = (await ethSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
  })) as SignatureId
  console.log(`Token brun transaction sent with signature ID: ${sentBurnErc20Transaction.signatureId}`)
}

export async function ethTxWithPrivateKeyExample(): Promise<void> {
  // ERC20(FUNGIBLE TOKEN)
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const sentDeployErc20Transaction = (await ethSDK.erc20.send.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    supply: '10000000',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    digits: 18,
    totalCap: '10000000',
    fee: {
      gasLimit: '171864',
      gasPrice: '20',
    },
  })) as TransactionHash
  console.log(`Token transaction sent with transaction ID: ${sentDeployErc20Transaction.txId}`)

  // Transfer Fungible token
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const sentTransferErc20Transaction = (await ethSDK.erc20.send.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    digits: 18,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })) as TransactionHash
  console.log(`Token transaction sent with transaction ID: ${sentTransferErc20Transaction.txId}`)

  // Mint Fungible tokens
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Mint
  const sentMintErc20Transaction = (await ethSDK.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
  })) as TransactionHash
  console.log(`Token transaction sent with transaction ID: ${sentMintErc20Transaction.txId}`)

  //Burn Fungible Tokens
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Burn
  const sentBurnErc20Transaction = (await ethSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
  })) as TransactionHash
  console.log(`Token transaction sent with transaction ID: ${sentBurnErc20Transaction.txId}`)

  // ERC20(FUNGIBLE TOKEN)
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const sentDeployErc721Transaction = (await ethSDK.nft.send.deploySignedTransaction({
    chain: 'ETH',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    fee: {
      gasLimit: '326452',
      gasPrice: '20',
    },
  })) as TransactionHash
  console.log(`Token transaction sent with transaction ID: ${sentDeployErc721Transaction.txId}`)
}

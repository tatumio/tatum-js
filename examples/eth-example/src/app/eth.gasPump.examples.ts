import { TatumEthSDK } from '@tatumio/eth'
import { TransactionHash } from '@tatumio/api-client'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethGasPumpWithSignatureIdExample() {
  // CUSTODIAL
  // Transfer an asset from a gas pump address
  // https://apidoc.tatum.io/tag/Gas-pump#operation/TransferCustodialWallet
  const sentTransferFromCustodialWallet = await ethSDK.custodial.send.transferFromCustodialWallet({
    chain: 'ETH',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })
  console.log(
    `Gas pump transaction sent with transaction ID: ${
      (sentTransferFromCustodialWallet as TransactionHash).txId
    }`,
  )

  // Transfer multiple assets from a gas pum address
  // https://apidoc.tatum.io/tag/Gas-pump#operation/TransferCustodialWalletBatch
  const sentBatchTransferFromCustodialWallet = await ethSDK.custodial.send.batchTransferFromCustodialWallet({
    chain: 'ETH',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    tokenId: [],
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
  console.log(
    `Gas pump transaction sent with transaction ID: ${
      (sentBatchTransferFromCustodialWallet as TransactionHash).txId
    }`,
  )

  // Approve the transfer of an asset from a gas pump address
  // https://apidoc.tatum.io/tag/Gas-pump#operation/ApproveTransferCustodialWallet
  const sentApproveFromCustodialWallet = await ethSDK.custodial.send.approveFromCustodialWallet({
    chain: 'ETH',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })
  console.log(
    `Gas pump transaction Approve request with transaction ID: ${
      (sentApproveFromCustodialWallet as TransactionHash).txId
    }`,
  )

  // Transfer multiple assets from a gas pump address
  // https://apidoc.tatum.io/tag/Gas-pump#operation/TransferCustodialWalletBatch
  const sentCustodialWalletBatch = await ethSDK.custodial.send.custodialWalletBatch({
    chain: 'ETH',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })
  console.log(`Gas pump transaction with transaction: ${JSON.stringify(sentCustodialWalletBatch)}`)
}

export async function ethGasPumpWithPrivateKeyExample() {
  // CUSTODIAL
  // Transfer an asset from a gas pump address
  // https://apidoc.tatum.io/tag/Gas-pump#operation/TransferCustodialWallet
  const sentTransferFromCustodialWallet = await ethSDK.custodial.send.transferFromCustodialWallet({
    chain: 'ETH',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })
  console.log(
    `Gas pump transaction sent with transaction ID: ${
      (sentTransferFromCustodialWallet as TransactionHash).txId
    }`,
  )

  // Transfer multiple assets from a gas pum address
  // https://apidoc.tatum.io/tag/Gas-pump#operation/TransferCustodialWalletBatch
  const sentBatchTransferFromCustodialWallet = await ethSDK.custodial.send.batchTransferFromCustodialWallet({
    chain: 'ETH',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractType: [0, 1, 2, 3],
    tokenId: [],
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
  console.log(
    `Gas pump transaction sent with transaction ID: ${
      (sentBatchTransferFromCustodialWallet as TransactionHash).txId
    }`,
  )

  // Approve the transfer of an asset from a gas pump address
  // https://apidoc.tatum.io/tag/Gas-pump#operation/ApproveTransferCustodialWallet
  const sentApproveFromCustodialWallet = await ethSDK.custodial.send.approveFromCustodialWallet({
    chain: 'ETH',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })
  console.log(
    `Gas pump transaction Approve request with transaction ID: ${
      (sentApproveFromCustodialWallet as TransactionHash).txId
    }`,
  )

  // Transfer multiple assets from a gas pump address
  // https://apidoc.tatum.io/tag/Gas-pump#operation/TransferCustodialWalletBatch
  const sentCustodialWalletBatch = await ethSDK.custodial.send.custodialWalletBatch({
    chain: 'ETH',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })
  console.log(`Gas pump transaction with transaction: ${JSON.stringify(sentCustodialWalletBatch)}`)
}

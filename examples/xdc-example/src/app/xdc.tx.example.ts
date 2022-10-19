import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcTxWithSignatureIdExample(): Promise<void> {
  // NATIVE
  const preparedTransferNativeTransaction = await xdcSDK.transaction.prepare.transferSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
    fee: {
      gasLimit: '53632',
      gasPrice: '20',
    },
  })

  const sentTransferNativeTransaction = await xdcSDK.transaction.send.transferSignedTransaction({
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
  const preparedDeployErc20Transaction = await xdcSDK.erc20.prepare.deploySignedTransaction({
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

  const sentDeployErc20Transaction = await xdcSDK.erc20.send.deploySignedTransaction({
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

  const preparedTransferErc20Transaction = await xdcSDK.erc20.prepare.transferSignedTransaction({
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

  const sentTransferErc20Transaction = await xdcSDK.erc20.send.transferSignedTransaction({
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

  const preparedMintErc20Transaction = await xdcSDK.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await xdcSDK.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await xdcSDK.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await xdcSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    nonce: 3252345722143,
  })
}

export async function xdcTxWithPrivateKeyExample(): Promise<void> {
  // ERC20(FUNGIBLE TOKEN)
  const preparedDeployErc20Transaction = await xdcSDK.erc20.prepare.deploySignedTransaction({
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

  const sentDeployErc20Transaction = await xdcSDK.erc20.send.deploySignedTransaction({
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

  const preparedTransferErc20Transaction = await xdcSDK.erc20.prepare.transferSignedTransaction({
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

  const sentTransferErc20Transaction = await xdcSDK.erc20.send.transferSignedTransaction({
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

  const preparedMintErc20Transaction = await xdcSDK.erc20.prepare.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentMintErc20Transaction = await xdcSDK.erc20.send.mintSignedTransaction({
    to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const preparedBurnErc20Transaction = await xdcSDK.erc20.prepare.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  const sentBurnErc20Transaction = await xdcSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
    fromPrivateKey: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    nonce: 3252345722143,
  })

  // CUSTODIAL
  const preparedTransferFromCustodialWallet = await xdcSDK.custodial.prepare.transferFromCustodialWallet({
    chain: 'XDC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const sentTransferFromCustodialWallet = await xdcSDK.custodial.send.transferFromCustodialWallet({
    chain: 'XDC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  const preparedBatchTransferFromCustodialWallet =
    await xdcSDK.custodial.prepare.batchTransferFromCustodialWallet({
      chain: 'XDC',
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
    })

  const sentBatchTransferFromCustodialWallet = await xdcSDK.custodial.send.batchTransferFromCustodialWallet({
    chain: 'XDC',
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
  })

  const preparedApproveFromCustodialWallet = await xdcSDK.custodial.prepare.approveFromCustodialWallet({
    chain: 'XDC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const sentApproveFromCustodialWallet = await xdcSDK.custodial.send.approveFromCustodialWallet({
    chain: 'XDC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    contractType: 0,
    custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
    tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
    spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    amount: '1',
  })

  const preparedCustodialWalletBatch = await xdcSDK.custodial.prepare.custodialWalletBatch({
    chain: 'XDC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })

  const sentCustodialWalletBatch = await xdcSDK.custodial.send.custodialWalletBatch({
    chain: 'XDC',
    fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
  })
}

export async function xdcTxFeesCovered(): Promise<void> {
  const generateCustodialWalletBatch = await xdcSDK.custodial.send.custodialWalletBatch({
    chain: 'XDC',
    batchCount: 100,
    owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
    feesCovered: true,
  })
}

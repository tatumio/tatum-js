export enum FlowTxType {
  CREATE_ACCOUNT,
  ADD_PK_TO_ACCOUNT,
  TRANSFER,
  DEPLOY_NFT,
  MINT_NFT,
  MINT_MULTIPLE_NFT,
  BURN_NFT,
  TRANSFER_NFT,
  CUSTOM_TX,
}

export const FLOW_TESTNET_ADDRESSES = {
  FlowToken: '0x7e60df042a9c0868',
  FungibleToken: '0x9a0766d93b6608b7',
  FUSD: '0xe223d8a629e49c68',
  TatumMultiNFT: '0x87fe4ebd0cddde06',
}

export const FLOW_MAINNET_ADDRESSES = {
  FlowToken: '0x1654653399040a61',
  FungibleToken: '0xf233dcee88fe0abe',
  FUSD: '0x3c5959b568896393',
  TatumMultiNFT: '0x354e6721564ccd2c',
}

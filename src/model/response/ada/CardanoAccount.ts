export interface CardanoAccount {
  assetBalances: [{
    asset: {
      assetId: string,
      assetName: string,
      name: string,
      description: string,
      logo: string,
      metadataHash: string,
      url: string
    },
    quantity: string;
  }]
  utxosCount: number;
}

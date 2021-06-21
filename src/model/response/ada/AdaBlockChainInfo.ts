export interface AdaBlockChainInfo {
  testnet: boolean;
  tip: {
    number: number,
    slotNo: number,
    epoch: { number: number }
  };
}

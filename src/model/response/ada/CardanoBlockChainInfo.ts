export interface CardanoBlockChainInfo {
  testnet: boolean;
  tip: {
    number: number,
    slotNo: number,
    epoch: { number: number }
  };
}

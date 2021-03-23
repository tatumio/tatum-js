export interface CardanoBlock {
  fees: number;
  slotLeader: { description: string, hash: string };
  forgedAt: string;
  merkleRoot: string;
  number: number;
  opCert: string;
  slotInEpoch: number;
  slotNo: number;
  protocolVersion: { major: number, minor: number };
  size: number;
  transactionsCount: string;
  transactions: [{ hash: string }];
  nextBlock: { hash: string, number: number };
  previousBlock: { hash: string, number: number };
  vrfKey: string;
}

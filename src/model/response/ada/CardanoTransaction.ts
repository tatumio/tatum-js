export interface CardanoTransaction {
  block: { hash: string, number: number };
  blockIndex: number;
  deposit: number;
  fee: number;
  inputs: [{ address: string, sourceTxHash: string, sourceTxIndex: number }];
  inputs_aggregate: { aggregate: { count: string }};
  outputs: [{ address: string, index: number, txHash: string, value: string }];
  outputs_aggregate: { aggregate: { count: string }};
  invalidBefore: string;
  invalidHereafter: string;
  size: number;
  totalOutput: string;
  includedAt: string;
  withdrawals: [{ address: string, amount: string, transaction: { hash: string } }];
  withdrawals_aggregate: { aggregate: { count: string }};
}

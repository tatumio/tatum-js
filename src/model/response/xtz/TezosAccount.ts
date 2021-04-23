export interface TezosAccount {
  accountId: string,
  balance: number,
  blockId: string,
  blockLevel: number,
  counter: number,
  createdAt: number,
  delegateSetable: string,
  is_baker: boolean,
  lastActive: number,
  manager: string,
  operations: number,
  revealed: boolean,
  spendable: string,
  transactions: number
}

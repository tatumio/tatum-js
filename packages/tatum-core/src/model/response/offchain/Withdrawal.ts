export class Withdrawal {
  public id: string

  public reference: string

  public amount: string

  public fee: string

  public txId?: string

  public address: string

  public status: string

  public currency: string

  public accountId: string

  public date = Date.now()

  public senderNote?: string

  public paymentId?: string

  public multipleAmounts?: string[]

  public attr?: string
}

import { IsNotEmpty } from 'class-validator'

export class AdaUtxo {
  @IsNotEmpty()
  public txHash: string // transactionHash

  @IsNotEmpty()
  public index: number

  @IsNotEmpty()
  public value: string
}

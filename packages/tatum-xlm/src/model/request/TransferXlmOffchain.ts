import { CreateWithdrawal } from '@tatumio/tatum-core'
import { IsNotEmpty, Length } from 'class-validator'

export class TransferXlmOffchain extends CreateWithdrawal {
  @IsNotEmpty()
  @Length(56, 56)
  public secret: string
}

import { IsNotEmpty, Length, ValidateIf } from 'class-validator'

export class UpdateAccount {
  @Length(1, 50)
  @ValidateIf((o) => !o.accountNumber)
  @IsNotEmpty()
  public accountCode?: string

  @Length(1, 50)
  @ValidateIf((o) => !o.accountCode)
  @IsNotEmpty()
  public accountNumber?: string
}

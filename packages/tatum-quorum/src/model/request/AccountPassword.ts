import { IsNotEmpty, MaxLength } from 'class-validator'

export class AccountPassword {
  @IsNotEmpty()
  @MaxLength(500)
  public password: string
}

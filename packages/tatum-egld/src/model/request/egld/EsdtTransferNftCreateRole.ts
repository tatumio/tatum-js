import { EsdtToken } from './EsdtToken'
import { IsNotEmpty, Length } from 'class-validator'

export class EsdtTransferNftCreateRole extends EsdtToken {
  @IsNotEmpty()
  @Length(62, 62)
  public from: string

  @IsNotEmpty()
  @Length(62, 62)
  public to: string
}

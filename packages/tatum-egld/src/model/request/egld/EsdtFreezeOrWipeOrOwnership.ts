import { EsdtToken } from './EsdtToken'
import { IsString, IsNotEmpty, Length } from 'class-validator'

export class EsdtFreezeOrWipeOrOwnership extends EsdtToken {
  @IsNotEmpty()
  @IsString()
  @Length(62, 62)
  public account: string
}

import { EsdtToken } from './EsdtToken'
import { IsNotEmpty, Min } from 'class-validator'

export class EsdtMint extends EsdtToken {
  @IsNotEmpty()
  @Min(0)
  public supply: number
}

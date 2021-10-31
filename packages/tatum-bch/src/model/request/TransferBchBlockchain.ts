import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsNotEmpty, IsNumberString, ValidateNested } from 'class-validator'
import { FromUTXO, To } from './TransferBtcBasedBlockchain'

export class FromUTXOBcash extends FromUTXO {
  @IsNotEmpty()
  @IsNumberString()
  public value: string
}

export class TransferBchBlockchain {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FromUTXOBcash)
  public fromUTXO: FromUTXOBcash[]

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => To)
  public to: To[]
}

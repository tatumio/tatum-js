import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import { TransferBtcBasedBlockchain } from './'

export class TransferAdaBlockchain extends TransferBtcBasedBlockchain {
  @IsNumberString()
  @IsOptional()
  public fee?: string

  @IsNotEmpty()
  @IsString()
  @Length(30, 110)
  public changeAddress: string
}

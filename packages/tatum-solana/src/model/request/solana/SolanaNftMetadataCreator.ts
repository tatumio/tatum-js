import {IsNotEmpty, IsNumber, Length} from 'class-validator'
import { Transform } from 'class-transformer'

export class SolanaNftMetadataCreator {
  @IsNotEmpty()
  @Length(43, 44)
  public address: string

  @IsNumber()
  // TODO Must be replaced by Boolean in the future
  @Transform((value) => (typeof value === 'boolean' ? (value ? 1 : 0) : value))
  @IsNotEmpty()
  public verified: number

  @IsNumber()
  @IsNotEmpty()
  public share: number

  constructor(_address: string, _verified: number, _share: number) {
    this.address = _address
    this.verified = _verified
    this.share = _share
  }
}

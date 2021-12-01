import { IsNotEmpty, IsNumber, Length } from 'class-validator'

export class SolanaNftMetadataCreator {
  @IsNotEmpty()
  @Length(44, 44)
  public address: string

  @IsNumber()
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

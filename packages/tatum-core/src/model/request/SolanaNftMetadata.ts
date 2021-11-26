import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, MaxLength, ValidateIf, ValidateNested } from 'class-validator'
import { SolanaNftMetadataCreator } from './SolanaNftMetadataCreator'

export class SolanaNftMetadata {
  @IsNotEmpty()
  @MaxLength(255)
  public name: string

  @IsNotEmpty()
  @MaxLength(255)
  public symbol: string

  @IsNotEmpty()
  @MaxLength(500)
  public uri: string

  @IsNotEmpty()
  @IsNumber()
  public sellerFeeBasisPoints: number

  @Type(() => SolanaNftMetadataCreator)
  @ValidateIf((o) => o.creators !== null)
  @ValidateNested({ each: true })
  @IsArray()
  public creators: SolanaNftMetadataCreator[] | null

  constructor(name: string, symbol: string, uri: string, sellerFeeBasisPoints: number, creators: SolanaNftMetadataCreator[] | null = null) {
    this.name = name
    this.symbol = symbol
    this.uri = uri
    this.sellerFeeBasisPoints = sellerFeeBasisPoints
    this.creators = creators
  }
}

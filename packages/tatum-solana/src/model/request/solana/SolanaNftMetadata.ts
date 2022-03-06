import { Type } from 'class-transformer'
import {IsArray, IsNotEmpty, IsNumber, Max, MaxLength, Min, ValidateIf, ValidateNested} from 'class-validator'
import { SolanaNftMetadataCreator } from './SolanaNftMetadataCreator'

export class SolanaNftMetadata {
  @IsNotEmpty()
  @MaxLength(32)
  public name: string

  @IsNotEmpty()
  @MaxLength(10)
  public symbol: string

  @IsNotEmpty()
  @MaxLength(200)
  public uri: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10000)
  public sellerFeeBasisPoints: number

  @Type(() => SolanaNftMetadataCreator)
  @ValidateIf((o) => o.creators)
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

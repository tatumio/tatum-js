import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, Min, ValidateNested } from 'class-validator'
import { Currency } from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class UpdateCashbackErc721 extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @MaxLength(256)
  public tokenId: string;

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.KLAY, Currency.TRON, Currency.ONE, Currency.MATIC])
  public chain: Currency;

  @IsNotEmpty()
  @Length(42, 43)
  public contractAddress: string;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @IsNotEmpty()
  @IsNumberString()
  public cashbackValue: string;

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;

}

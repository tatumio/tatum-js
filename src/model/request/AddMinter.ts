import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateIf, ValidateNested } from 'class-validator';
import { Currency } from './Currency';
import { Fee } from './Fee';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId';

export class AddMinter extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @Length(42, 43)
  public minter: string;

  @IsNotEmpty()
  @Length(42, 43)
  public contractAddress: string;

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.KLAY])
  public chain: Currency;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @IsOptional()
  @Type(() => Fee)
  @ValidateNested()
  public fee?: Fee;

  @ValidateIf(o => o.chain === Currency.CELO)
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD, Currency.CEUR])
  public feeCurrency?: Currency = Currency.CELO;
}

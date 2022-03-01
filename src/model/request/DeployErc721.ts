import { IsBoolean, IsIn, IsNotEmpty, IsOptional, Length, Min, ValidateIf } from 'class-validator';
import { Currency } from './Currency'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class DeployErc721 extends PrivateKeyOrSignatureId {

  @IsNotEmpty()
  @Length(1, 100)
  public name: string;

  @IsNotEmpty()
  @IsIn([Currency.BSC, Currency.ETH, Currency.CELO, Currency.XDC, Currency.KLAY, Currency.TRON, Currency.ONE, Currency.MATIC, Currency.ALGO])
  public chain: Currency;

  @IsNotEmpty()
  @Length(1, 30)
  public symbol: string;

  @Min(0)
  @IsOptional()
  public nonce?: number;

  @IsBoolean()
  @IsOptional()
  public provenance?: boolean;

  @IsBoolean()
  @IsOptional()
  public cashback?: boolean;

  @ValidateIf(o => o.chain === Currency.ALGO)
  @IsNotEmpty()
  public url?: string;

  @ValidateIf(o => o.chain === Currency.ALGO && o.signatureId)
  @IsNotEmpty()
  @Length(42, 58)
  public from?: string;

  @IsBoolean()
  @IsOptional()
  public publicMint?: boolean;
}

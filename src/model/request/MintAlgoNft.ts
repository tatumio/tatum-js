import { IsIn, IsNotEmpty, IsOptional, Length, ValidateIf } from 'class-validator';
import { Currency } from './Currency'
import { PrivateKeyOrSignatureIdBuiltInPrivateKey } from './PrivateKeyOrSignatureIdBuiltInPrivateKey'

export class MintAlgoNft extends PrivateKeyOrSignatureIdBuiltInPrivateKey {

  @IsNotEmpty()
  @Length(1, 32)
  public name: string;

  @IsNotEmpty()
  @IsIn([Currency.ALGO])
  public chain: Currency;

  @IsOptional()
  @Length(8)
  public tokenId: string;

  @IsNotEmpty()
  public url: string;

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(58, 58)
  public from: string;
}

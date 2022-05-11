import { IsIn, IsNotEmpty, IsOptional, Length, ValidateIf, ValidateNested } from 'class-validator';
import { Currency } from './Currency'
import { PrivateKeyOrSignatureIdBuiltInPrivateKey } from './PrivateKeyOrSignatureIdBuiltInPrivateKey'
import { Type } from 'class-transformer'

class MintAttr {

  @IsOptional()
  @Length(1, 8)
  public assetUnit?: string;

  @IsOptional()
  @Length(58, 58)
  public manager?: string;

  @IsOptional()
  @Length(58, 58)
  public reserve?: string;

  @IsOptional()
  @Length(58, 58)
  public freeze?: string;

  @IsOptional()
  @Length(58, 58)
  public clawback?: string;
}

export class MintAlgoNft extends PrivateKeyOrSignatureIdBuiltInPrivateKey {

  @IsNotEmpty()
  @Length(1, 32)
  public name: string;

  @IsNotEmpty()
  @IsIn([Currency.ALGO])
  public chain: Currency;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => MintAttr)
  public attr?: MintAttr

  @IsNotEmpty()
  public url: string;

  @ValidateIf(o => o.signatureId)
  @IsNotEmpty()
  @Length(58, 58)
  public from: string;
}

import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  ValidateIf
} from 'class-validator';
import {Currency} from './Currency';
import { MintErc721 } from './MintErc721'

export class CeloMintErc721 extends MintErc721 {
  @IsNotEmpty()
  @IsIn([Currency.CELO, Currency.CUSD])
  public feeCurrency: Currency;
  @IsOptional()
  @ValidateIf(o => (o.authorAddresses && o.cashbackValues) || !o.cashbackValues)
  public authorAddresses?: string[];
  @IsOptional()
  @ValidateIf(o => (o.authorAddresses && o.cashbackValues) || !o.authorAddresses)
  public cashbackValues?: string[];
}

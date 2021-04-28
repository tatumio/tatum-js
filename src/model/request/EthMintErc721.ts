import { Type } from 'class-transformer'
import {
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Fee } from './Fee'
import { MintErc721 } from './MintErc721'

export class EthMintErc721 extends MintErc721 {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
    @IsOptional()
    @ValidateIf(o => (o.authorAddresses && o.cashbackValues) || !o.cashbackValues)
    public authorAddresses?: string[];
    @IsOptional()
    @ValidateIf(o => (o.authorAddresses && o.cashbackValues) || !o.authorAddresses)
    public cashbackValues?: string[];
}

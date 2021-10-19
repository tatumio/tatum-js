import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { Fee } from './Fee';
import { BaseMintMultipleErc721 } from './BaseMintMultipleErc721';

export class MintMultipleErc721 extends BaseMintMultipleErc721 {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}

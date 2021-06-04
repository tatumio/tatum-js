import {Type} from 'class-transformer';
import {IsOptional, ValidateNested,} from 'class-validator';
import {BurnMultiTokenBatch} from './BurnMultiTokenBatch';
import {Fee} from './Fee';

export class EthBurnMultiTokenBatch extends BurnMultiTokenBatch {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}

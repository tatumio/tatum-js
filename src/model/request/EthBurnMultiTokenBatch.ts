import { Type } from 'class-transformer'
import {
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Fee } from './Fee'
import { BurnMultiTokenBatch } from './BurnMultiTokenBatch';

export class EthBurnMultiTokenBatch extends BurnMultiTokenBatch{
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}

import {IsNotEmpty, Length} from 'class-validator';
import {PathChain} from './PathChain';

export class PathChainTxId extends PathChain {

    @IsNotEmpty()
    @Length(66, 66)
    public txId: string;
}

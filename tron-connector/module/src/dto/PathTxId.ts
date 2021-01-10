import {IsNotEmpty, Length} from 'class-validator';

export class PathTxId {
    @IsNotEmpty()
    @Length(64, 64)
    public txId: string;
}

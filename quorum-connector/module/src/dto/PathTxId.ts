import {IsNotEmpty, Length} from 'class-validator';

export class PathTxId {
    @IsNotEmpty()
    @Length(66, 66)
    public txId: string;
}

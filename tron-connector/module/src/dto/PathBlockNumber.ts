import {IsNotEmpty, IsNumberString} from 'class-validator';

export class PathBlockNumber {
    @IsNotEmpty()
    @IsNumberString()
    public blockNumber: string;
}

import {IsNotEmpty, Length} from 'class-validator';

export class PathHash {

    @IsNotEmpty()
    @Length(66, 66)
    public hash: string;
}

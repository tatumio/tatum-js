import {IsNotEmpty, Length} from 'class-validator';

export class PathAddress {
    @IsNotEmpty()
    @Length(34, 34)
    public address: string;
}

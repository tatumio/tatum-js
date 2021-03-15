import {IsNotEmpty, Length} from 'class-validator';

export class PathAddress {
    @IsNotEmpty()
    @Length(42, 42)
    public address: string;
}

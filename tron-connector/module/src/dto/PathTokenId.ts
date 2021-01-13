import {IsNotEmpty, Length} from 'class-validator';

export class PathTokenId {
    @IsNotEmpty()
    @Length(1, 100)
    public id: string;
}

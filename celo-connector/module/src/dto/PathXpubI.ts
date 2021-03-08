import {IsNotEmpty, IsNumberString, Length, Matches} from 'class-validator';

export class PathXpubI {

    @IsNotEmpty()
    @Length(5, 192)
    public xpub: string;

    @IsNumberString()
    @Matches(/[0-9]+/)
    public i: string;
}

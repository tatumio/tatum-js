import {IsNotEmpty, Length, Min} from 'class-validator';
import {Transform} from 'class-transformer';

export class PathXpubI {

    @Transform((v) => v.match(/^\d+$/) ? parseInt(v) : v)
    @Min(0)
    public i: number;

    @IsNotEmpty()
    @Length(130, 130)
    public xpub: string;
}

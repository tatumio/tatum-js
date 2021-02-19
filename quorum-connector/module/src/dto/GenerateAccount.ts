import {IsNotEmpty, MaxLength} from 'class-validator';

export class GenerateAccount {

    @IsNotEmpty()
    @MaxLength(500)
    public password: string;
}

import {IsNotEmpty, Length, MaxLength} from 'class-validator';

export class UnlockAccount {

    @IsNotEmpty()
    @MaxLength(500)
    public password: string;

    @IsNotEmpty()
    @Length(42, 42)
    public account: string;
}

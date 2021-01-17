import {IsOptional, MaxLength} from 'class-validator';

export class QueryMnemonic {

    @IsOptional()
    @MaxLength(500)
    public mnemonic?: string;
}

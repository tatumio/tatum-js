import {Type} from 'class-transformer';
import {IsNotEmpty, IsOptional, Length, Min, ValidateNested} from 'class-validator';
import {Fee} from './Fee';

export class CreateRecord {

    @IsNotEmpty()
    @Length(1, 130000)
    public data: string;

    @IsOptional()
    @Length(32, 66)
    public fromPrivateKey: string;

    @IsOptional()
    @Length(42, 42)
    public to?: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public ethFee?: Fee;
}

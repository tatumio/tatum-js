import {Type} from 'class-transformer';
import {ArrayNotEmpty, IsNotEmpty, IsOptional, Length, Max, Min, ValidateNested} from 'class-validator';

export class FromUTXO {

    @IsNotEmpty()
    @Length(64, 64)
    public txHash: string;

    @IsNotEmpty()
    @Min(0)
    @Max(4294967295)
    public index: number;

    @IsNotEmpty()
    @Length(52, 52)
    public privateKey: string;

    // Only Bitcoin Cash
    @IsOptional()
    public value?: number;
}

export class To {
    @IsNotEmpty()
    @Length(30, 50)
    public address: string;

    @IsNotEmpty()
    @Min(0)
    public value: number;
}

export class TransferBtcBasedBlockchain {

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => FromUTXO)
    public fromUTXO: FromUTXO[];

    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => To)
    public to: To[];
}

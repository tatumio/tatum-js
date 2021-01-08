import {IsNotEmpty, IsOptional, Length, MaxLength} from 'class-validator';

export class BroadcastTx {

    @IsNotEmpty()
    @MaxLength(1000000)
    public txData: string;

    @IsOptional()
    @Length(24, 24)
    public signatureId?: string;
}

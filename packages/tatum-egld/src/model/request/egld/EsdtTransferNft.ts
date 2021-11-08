import {EsdtToken} from './EsdtToken'
import {IsNotEmpty, IsOptional, IsString, Length, Min} from 'class-validator'

export class EsdtTransferNft extends EsdtToken {
    @IsNotEmpty()
    @Min(0)
    public nonce: number;

    @IsNotEmpty()
    @Min(0)
    public quantity: number;

    @IsNotEmpty()
    @IsString()
    @Length(62, 62)
    public to: string;

    @IsOptional()
    @Length(1, 128)
    public methodName: string;

    @IsOptional()
    public arguments?: (number | string)[];
}

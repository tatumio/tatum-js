import {EsdtToken} from './EsdtToken'
import {IsNotEmpty, IsOptional, Length, Min} from 'class-validator'

export class EsdtTransfer extends EsdtToken {
    @IsNotEmpty()
    @Min(0)
    public value: number;

    @IsOptional()
    @Length(1, 128)
    public methodName: string;

    @IsOptional()
    public arguments?: (number | string)[];
}

import {IsNotEmpty, IsOptional, Min} from 'class-validator';

import {EgldBasicTransaction} from './EgldBasicTransaction'
export class EgldSendTransaction extends EgldBasicTransaction {
    @IsNotEmpty()
    @Min(0)
    public gasPrice: number;

    @IsNotEmpty()
    @Min(0)
    public gasLimit: number;

    @IsOptional()
    public signature?: string;
}

import {IsNotEmpty, Length} from 'class-validator';
import {PathAddress} from './PathAddress';

export class PathAddressAccountId extends PathAddress {

    @IsNotEmpty()
    @Length(24, 24)
    public id: string;
}

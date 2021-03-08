import {IsNotEmpty, Length} from 'class-validator';
import {PathAddress} from './PathAddress';

export class PathAddressContractAddress extends PathAddress {

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;
}

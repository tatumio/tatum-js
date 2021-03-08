import {IsNumberString, Matches} from 'class-validator';
import {PathAddressContractAddress} from './PathAddressContractAddress';

export class PathAddressContractAddressI extends PathAddressContractAddress {

    @IsNumberString()
    @Matches(/[0-9]+/)
    public i: string;
}

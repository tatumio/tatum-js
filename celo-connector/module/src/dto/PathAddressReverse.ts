import {IsBooleanString, IsNotEmpty} from 'class-validator';
import {PathAddress} from './PathAddress';

export class PathAddressReverse extends PathAddress {

    @IsNotEmpty()
    @IsBooleanString()
    public reverse: string;
}

import {IsNotEmpty, Length} from 'class-validator';
import {PathAddress} from './PathAddress';

export class PathAddressCurrency extends PathAddress {

    @IsNotEmpty()
    @Length(2, 50)
    public currency: string;
}

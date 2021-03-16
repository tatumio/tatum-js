import {IsNotEmpty, Length} from 'class-validator';
import {PathChain} from './PathChain';

export class PathAddressContractAddressChain extends PathChain{

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @IsNotEmpty()
    @Length(42, 42)
    public address: string;
}

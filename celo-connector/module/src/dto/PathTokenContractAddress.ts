import {IsNotEmpty, Length} from 'class-validator';

export class PathTokenContractAddress {

    @IsNotEmpty()
    @Length(1, 32)
    public token: string;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;
}

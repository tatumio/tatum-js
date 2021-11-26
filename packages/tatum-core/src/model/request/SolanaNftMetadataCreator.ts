import {IsNotEmpty, IsNumber, Length} from 'class-validator';

export class SolanaNftMetadataCreator {
    @IsNotEmpty()
    @Length(44, 44)
    public address: string;

    @IsNumber()
    @IsNotEmpty()
    public verified: number;

    @IsNumber()
    @IsNotEmpty()
    public share: number;

    constructor(args: {
        address: string;
        verified: number;
        share: number;
    }) {
        this.address = args.address;
        this.verified = args.verified;
        this.share = args.share;
    }
}

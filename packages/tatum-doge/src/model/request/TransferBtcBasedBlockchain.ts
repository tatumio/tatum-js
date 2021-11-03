import { Type } from 'class-transformer'
import {
    ArrayNotEmpty,
    IsNotEmpty, IsUUID,
    Length,
    Max,
    Min,
    Validate,
    ValidateIf,
    ValidateNested,
} from 'class-validator'
import { SignatureIdValidator } from '@tatumio/tatum-core'
import { TransferBtcValidator } from '../validation/TransferBtcValidator'

class PrivateKeyOrSignatureIdBtcBased {
    /**
     * Private key of the address to send assets from. Private key, or signature Id must be present.
     */
    @ValidateIf(o => o.privateKey || !o.signatureId)
    @IsNotEmpty()
    @Length(52, 256)
    public privateKey?: string;

    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    @ValidateIf(o => o.signatureId || !o.privateKey)
    @Validate(SignatureIdValidator)
    @IsNotEmpty()
    @Length(36, 36)
    @IsUUID('4')
    public signatureId?: string;
}

export class FromAddress extends PrivateKeyOrSignatureIdBtcBased {
    /**
     * Address to send assets from.
     */
    @IsNotEmpty()
    @Length(30, 110)
    public address: string;
}

export class FromUTXO extends PrivateKeyOrSignatureIdBtcBased {

    /**
     * Transaction hash of the UTXO to be spent.
     */
    @IsNotEmpty()
    @Length(64, 64)
    public txHash: string;

    /**
     * Index of the UTXO to be spent.
     */
    @IsNotEmpty()
    @Min(0)
    @Max(4294967295)
    public index: number;
}

export class To {
    /**
     * Destination address.
     */
    @IsNotEmpty()
    @Length(30, 110)
    public address: string;

    /**
     * Amount to be sent.
     */
    @IsNotEmpty()
    @Min(0)
    public value: number;
}

/**
 * Transfer BTC based blockchain.
 *
 * This class is used for transferring assets of all BTC based blockchains.
 */
export class TransferBtcBasedBlockchain {

    /**
     * Array of addresses and corresponding private keys.
     * Tatum will automatically scan last 100 transactions for each address and will use all of the unspent values.
     * We advise to use this option if you have 1 address per 1 transaction only.
     */
    @ValidateIf(o => (o.fromUTXO && o.fromAddress) || !o.fromUTXO)
    @Validate(TransferBtcValidator)
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => FromAddress)
    public fromAddress?: FromAddress[];

    /**
     * Array of transaction hashes, index of UTXO in it and corresponding private keys.
     * Use this option if you want to calculate amount to send manually.
     * Either fromUTXO or fromAddress must be present.
     */
    @ValidateIf(o => (o.fromUTXO && o.fromAddress) || !o.fromAddress)
    @Validate(TransferBtcValidator)
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => FromUTXO)
    public fromUTXO?: FromUTXO[];

    /**
     * Array of addresses and values to send bitcoins to. Values must be set in BTC. Difference between from and to is transaction fee.
     */
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => To)
    public to: To[];
}

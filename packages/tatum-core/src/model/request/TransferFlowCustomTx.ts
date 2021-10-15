import {Type} from 'class-transformer';
import {IsIn, IsNotEmpty, IsOptional, Length, ValidateNested} from 'class-validator';
import {FlowMnemonicOrPrivateKeyOrSignatureId} from './FlowMnemonicOrPrivateKeyOrSignatureId';

const types = ['Identity',
    'UInt',
    'Int',
    'UInt8',
    'Int8',
    'UInt16',
    'Int16',
    'UInt32',
    'Int32',
    'UInt64',
    'Int64',
    'UInt128',
    'Int128',
    'UInt256',
    'Int256',
    'Word8',
    'Word16',
    'Word32',
    'Word64',
    'UFix64',
    'Fix64',
    'String',
    'Character',
    'Bool',
    'Address',
    'Void',
    'Optional',
    'Reference',
    'Array',
    'Dictionary',
    'Event',
    'Resource',
    'Struct'];

export class FlowArgs {

    @IsNotEmpty()
    public value: string | string[];

    @IsNotEmpty()
    @IsIn(types)
    public type: string;

    @IsOptional()
    @IsIn(types)
    public subType?: string;
}

export class TransferFlowCustomTx extends FlowMnemonicOrPrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(1, 500000)
    public transaction: string;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => FlowArgs)
    public args: FlowArgs[];
}

import {IsIn, IsNumber, IsOptional, IsString, Length, Min} from 'class-validator';
import {OperationType} from '../response/ledger/OperationType';
import {TransactionType} from '../response/ledger/TransactionType';

export class TransactionFilter {

    @Length(1, 50)
    @IsString()
    @IsOptional()
    public id?: string;

    @Min(0)
    @IsNumber()
    @IsOptional()
    public from?: number;

    @Min(0)
    @IsNumber()
    @IsOptional()
    public to?: number;

    @Length(1, 50)
    @IsString()
    @IsOptional()
    public account?: string;

    @Length(1, 50)
    @IsString()
    @IsOptional()
    public counterAccount?: string;

    @Length(1, 100)
    @IsString()
    @IsOptional()
    public paymentId?: string;

    @Length(1, 100)
    @IsString()
    @IsOptional()
    public transactionCode?: string;

    @Length(1, 500)
    @IsString()
    @IsOptional()
    public senderNote?: string;

    @Length(1, 500)
    @IsString()
    @IsOptional()
    public recipientNote?: string;

    @IsString()
    @Length(4, 22)
    @IsOptional()
    @IsIn(Object.keys(OperationType))
    public opType?: OperationType;

    @IsOptional()
    @Length(6, 23)
    @IsIn(Object.keys(TransactionType))
    @IsString()
    public transactionType?: TransactionType;
}

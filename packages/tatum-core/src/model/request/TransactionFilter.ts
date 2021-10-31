import { Type } from 'class-transformer'
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Min, ValidateNested } from 'class-validator'
import { OperationType, TransactionType } from '../response'

class AmountFilter {
  @IsNotEmpty()
  @IsIn(['lt', 'gt', 'gte', 'lte', 'eq', 'neq'])
  public op: string

  @IsNotEmpty()
  @IsNumberString()
  public value: string
}

export class TransactionFilter {
  @Length(1, 50)
  @IsString()
  @IsOptional()
  public id?: string

  @Min(0)
  @IsNumber()
  @IsOptional()
  public from?: number

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AmountFilter)
  public amount?: AmountFilter[]

  @Min(0)
  @IsNumber()
  @IsOptional()
  public to?: number

  @Length(1, 50)
  @IsString()
  @IsOptional()
  public account?: string

  @Length(1, 50)
  @IsString()
  @IsOptional()
  public counterAccount?: string

  @Length(1, 50)
  @IsString()
  @IsOptional()
  public currency?: string

  @IsOptional()
  @IsArray()
  public currencies?: string[]

  @IsOptional()
  @IsArray()
  @IsIn(Object.values(TransactionType), { each: true })
  public transactionTypes?: TransactionType[]

  @Length(1, 100)
  @IsString()
  @IsOptional()
  public paymentId?: string

  @Length(1, 100)
  @IsString()
  @IsOptional()
  public transactionCode?: string

  @Length(1, 500)
  @IsString()
  @IsOptional()
  public senderNote?: string

  @Length(1, 500)
  @IsString()
  @IsOptional()
  public recipientNote?: string

  @IsString()
  @Length(4, 22)
  @IsOptional()
  @IsIn(Object.keys(OperationType))
  public opType?: OperationType

  @IsOptional()
  @Length(6, 23)
  @IsIn(Object.keys(TransactionType))
  @IsString()
  public transactionType?: TransactionType
}

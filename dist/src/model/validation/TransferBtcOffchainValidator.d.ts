import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class TransferBtcOffchainValidator implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string;
    validate(value: any, validationArguments?: ValidationArguments): boolean;
}

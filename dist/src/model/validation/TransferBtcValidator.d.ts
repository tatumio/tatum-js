import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class TransferBtcValidator implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string;
    validate(value: any, validationArguments?: ValidationArguments): boolean;
}

import {BigNumber} from 'bignumber.js';
import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator';

export function HasDecimalPlaces(decimals: number, validationOptions?: ValidationOptions) {
    return ValidateBy({
        name: 'hasDecimalPlaces',
        constraints: [decimals],
        validator: {
            validate: (value) => new BigNumber(value).decimalPlaces() <= decimals,
            defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must have less than or equal to $constraint1 decimals', validationOptions),
        }
    }, validationOptions);
}

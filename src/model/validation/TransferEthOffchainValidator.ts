import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({name: 'mnemonicIndexPrivateKey', async: false})
export class TransferEthOffchainValidator implements ValidatorConstraintInterface {
    public defaultMessage(validationArguments?: ValidationArguments) {
        return 'Either mnemonic and index, or privateKey a must be present.';
    }

    public validate(value: any, validationArguments?: ValidationArguments) {
        const data = validationArguments?.object as any;
        return !(data.mnemonic && data.index >= 0 && data.privateKey);
    }

}

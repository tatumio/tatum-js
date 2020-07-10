import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {TransferBtcBasedOffchain} from '../index';

@ValidatorConstraint({name: 'mnemonicKeypair', async: false})
export class TransferBtcOffchainValidator implements ValidatorConstraintInterface {
    public defaultMessage(validationArguments?: ValidationArguments) {
        return 'Either mnemonic, or keyPair must be present.';
    }

    public validate(value: any, validationArguments?: ValidationArguments) {
        const data = validationArguments?.object as TransferBtcBasedOffchain;
        return !(data.mnemonic && data.keyPair);
    }

}

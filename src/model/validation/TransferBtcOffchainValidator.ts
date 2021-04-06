import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {TransferBtcBasedOffchain} from '../index';

@ValidatorConstraint({name: 'mnemonicKeypair', async: false})
export class TransferBtcOffchainValidator implements ValidatorConstraintInterface {
    public defaultMessage(validationArguments?: ValidationArguments) {
        return 'Either mnemonic, keyPair or signatureId must be present.';
    }

    public validate(value: any, validationArguments?: ValidationArguments) {
        const {mnemonic, keyPair, signatureId, xpub} = validationArguments?.object as TransferBtcBasedOffchain;
        if (mnemonic && keyPair) {
            return false;
        }
        if (mnemonic && signatureId) {
            return false;
        }
        if (signatureId && keyPair) {
            return false;
        }
        if (xpub && keyPair) {
            return false;
        }
        return true;
    }

}

import { CreateWithdrawal } from './CreateWithdrawal';
export declare class KeyPair {
    address: string;
    privateKey: string;
}
export declare class TransferBtcBasedOffchain extends CreateWithdrawal {
    mnemonic?: string;
    keyPair?: KeyPair[];
}

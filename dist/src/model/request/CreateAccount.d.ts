import { Fiat } from '../response';
import { CustomerUpdate } from './CustomerUpdate';
export declare class CreateAccount {
    currency: string;
    xpub?: string;
    compliant?: boolean;
    accountingCurrency?: Fiat;
    accountCode?: string;
    accountNumber?: string;
    customer?: CustomerUpdate;
}

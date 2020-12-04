import { Fiat } from '../response';
import { Currency } from './Currency';
import { CustomerUpdate } from './CustomerUpdate';
export declare class CreateCurrency {
    name: string;
    supply: string;
    description?: string;
    accountCode?: string;
    basePair: Currency | Fiat;
    baseRate?: number;
    accountingCurrency?: Fiat;
    customer?: CustomerUpdate;
}

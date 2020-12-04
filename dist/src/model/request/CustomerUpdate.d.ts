import { Fiat } from '../response';
import { Country } from './Country';
export declare class CustomerUpdate {
    customerCountry?: Country;
    accountingCurrency?: Fiat;
    providerCountry?: Country;
    externalId: string;
}

import { Country } from '../../request/Country';
import { Fiat } from './Fiat';
export declare class Customer {
    id: string;
    externalId: string;
    customerCountry?: Country;
    accountingCurrency?: Fiat;
    providerCountry?: Country;
    active: boolean;
    enabled: boolean;
}

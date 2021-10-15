import { Country } from '../../request/Country'
import { Fiat } from './Fiat'

/**
 * Customer
 */
export class Customer {

    public id: string;

    public externalId: string;

    /**
     * Country of the Customer
     */
    public customerCountry?: Country;

    public accountingCurrency?: Fiat;

    public providerCountry?: Country;

    public active: boolean;

    public enabled: boolean;
}

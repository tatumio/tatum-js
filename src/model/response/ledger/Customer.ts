import {Country} from '../../request/Country';
import {Fiat} from './Fiat';

export class Customer {

    public id: string;

    public externalId: string;

    public customerCountry?: Country;

    public accountingCurrency?: Fiat;

    public providerCountry?: Country;

    public active: boolean;

    public enabled: boolean;
}

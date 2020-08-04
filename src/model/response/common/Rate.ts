import {Currency} from '../../request';
import {Fiat} from '../ledger/Fiat';

export class Rate {

    public id: Fiat | Currency;

    public value: string;

    public basePair: Fiat;

    public timestamp: number;

    public source: string;
}

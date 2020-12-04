import { Currency } from '../../request';
import { Fiat } from '../ledger/Fiat';
export declare class Rate {
    id: Fiat | Currency;
    value: string;
    basePair: Fiat;
    timestamp: number;
    source: string;
}

import { Fiat } from '../response';
import { Currency } from './Currency';
export declare class UpdateCurrency {
    name: string;
    basePair?: Currency | Fiat;
    baseRate?: number;
}

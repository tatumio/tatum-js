import { Currency } from './Currency';
import { Fee } from './Fee';
export declare class TransferEthErc20 {
    fromPrivateKey: string;
    to: string;
    amount: string;
    data?: string;
    currency: Currency;
    fee?: Fee;
    nonce?: number;
}

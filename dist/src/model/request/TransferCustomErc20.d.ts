import { Fee } from './Fee';
export declare class TransferCustomErc20 {
    fromPrivateKey: string;
    to: string;
    amount: string;
    contractAddress: string;
    fee?: Fee;
    digits: number;
    nonce?: number;
}

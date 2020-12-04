import { Fee } from './Fee';
export declare class CreateRecord {
    data: string;
    fromPrivateKey: string;
    to?: string;
    nonce?: number;
    ethFee?: Fee;
}

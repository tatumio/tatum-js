import { Fee } from './Fee';
export declare class DeployEthErc20 {
    name: string;
    symbol: string;
    address: string;
    supply: string;
    digits: number;
    fromPrivateKey: string;
    nonce?: number;
    fee?: Fee;
}

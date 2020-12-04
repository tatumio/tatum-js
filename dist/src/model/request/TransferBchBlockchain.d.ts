import { FromUTXO, To } from './TransferBtcBasedBlockchain';
export declare class FromUTXOBcash extends FromUTXO {
    value: string;
}
export declare class TransferBchBlockchain {
    fromUTXO: FromUTXOBcash[];
    to: To[];
}

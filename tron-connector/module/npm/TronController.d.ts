import { TronBlockchainService } from './TronBlockchainService';
import { BroadcastTx, TransferTron } from '@tatumio/tatum';
import { PathAddress } from './dto/PathAddress';
import { PathTxId } from './dto/PathTxId';
export declare abstract class TronController {
    protected readonly service: TronBlockchainService;
    protected constructor(service: TronBlockchainService);
    broadcast(body: BroadcastTx): Promise<{
        txId: any;
    }>;
    generateAccount(): Promise<{
        address: any;
        privateKey: any;
    }>;
    getInfo(): Promise<{
        testnet: boolean;
        hash: string;
        blockNumber: number;
    }>;
    getBlock(hashOrHeight: string): Promise<import("@tatumio/tatum").TronBlock>;
    getAccount(path: PathAddress): Promise<import("@tatumio/tatum").TronAccount>;
    getTransaction(path: PathTxId): Promise<import("@tatumio/tatum").TronTransaction>;
    getTransactionsByAccount(path: PathAddress, next?: string): Promise<{
        transactions: import("@tatumio/tatum").TronTransaction[];
        next?: string;
    }>;
    sendTransaction(body: TransferTron): Promise<{
        txId: any;
    }>;
}

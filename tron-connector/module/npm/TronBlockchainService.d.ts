import { PinoLogger } from 'nestjs-pino';
import { TransferTron, TronAccount, TronBlock, TronTransaction } from '@tatumio/tatum';
export declare abstract class TronBlockchainService {
    protected readonly logger: PinoLogger;
    private static mapTransaction;
    protected constructor(logger: PinoLogger);
    protected abstract isTestnet(): Promise<boolean>;
    protected abstract getNodesUrl(): Promise<string[]>;
    broadcast(txData: string, signatureId?: string): Promise<{
        txId: any;
    }>;
    getBlockChainInfo(): Promise<{
        testnet: boolean;
        hash: string;
        blockNumber: number;
    }>;
    getBlock(hashOrHeight: string): Promise<TronBlock>;
    getTransaction(txId: string): Promise<TronTransaction>;
    getAccount(address: string): Promise<TronAccount>;
    getTransactionsByAccount(address: string, next?: string): Promise<{
        transactions: TronTransaction[];
        next?: string;
    }>;
    generateWallet(): Promise<{
        address: any;
        privateKey: any;
    }>;
    sendTransaction(body: TransferTron): Promise<{
        txId: any;
    }>;
}

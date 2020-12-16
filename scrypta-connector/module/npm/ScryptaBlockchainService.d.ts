import ScryptaCore from '@scrypta/core';
import { ScryptaBlock, ScryptaParsedTx, ScryptaUnspent } from './constants';
import { PinoLogger } from 'nestjs-pino';
import * as Tatum from '@tatumio/tatum';
export declare abstract class ScryptaBlockchainService {
    protected readonly logger: PinoLogger;
    protected scrypta: ScryptaCore;
    protected constructor(logger: PinoLogger);
    protected abstract isTestnet(): Promise<boolean>;
    protected abstract getNodesUrl(): Promise<string[]>;
    getNetwork(): Promise<{
        messagePrefix: string;
        bech32: string;
        bip32: {
            public: number;
            private: number;
        };
        pubKeyHash: number;
        scriptHash: number;
        wif: number;
    }>;
    getBlockChainInfo(): Promise<any>;
    getCurrentBlock(): Promise<number>;
    getBlockHash(i: number): Promise<string>;
    getBlock(hash: string): Promise<ScryptaBlock>;
    generateAddress(xpub: string, derivationIndex: number): Promise<string>;
    generateWallet(mnem?: string): Promise<Tatum.Wallet | {
        address: string;
        privateKey: string;
    } | {
        privateKey: string;
        address: string;
    } | {
        address: string;
        secret: string;
    }>;
    generateAddressPrivateKey(derivationIndex: number, mnemonic: string): Promise<{
        key: string;
    }>;
    getTransactionsByAddress(address: string, pagination?: object): Promise<ScryptaParsedTx[]>;
    getUnspentsByAddress(address: string, pagination?: object): Promise<ScryptaUnspent[]>;
    getUTXO(hash: string, index: number): Promise<ScryptaUnspent>;
    getRawTransaction(txHash: string): Promise<any>;
    broadcast(txData: string): Promise<{
        txId: string;
        failed?: boolean;
    }>;
}

import { ScryptaBlock, ScryptaParsedTx, ScryptaUnspent } from './constants';
import { PinoLogger } from 'nestjs-pino';
import * as Tatum from '@tatumio/tatum';
export declare class ScryptaBlockchainService {
    protected scrypta: any;
    protected testnet: boolean;
    protected currency: Tatum.Currency;
    protected readonly logger: PinoLogger;
    constructor(testnet?: boolean, nodes?: Array<string>, debug?: boolean);
    getNetwork(): {
        messagePrefix: string;
        bech32: string;
        bip32: {
            public: number;
            private: number;
        };
        pubKeyHash: number;
        scriptHash: number;
        wif: number;
    };
    getBlockChainInfo(testnet?: boolean): Promise<any>;
    getCurrentBlock(testnet?: boolean): Promise<number>;
    getBlockHash(i: number, testnet?: boolean): Promise<string>;
    getBlock(hash: string, testnet?: boolean): Promise<ScryptaBlock>;
    generateAddress(xpub: string, derivationIndex: number, testnet?: boolean): Promise<string>;
    generateWallet(mnem?: string, testnet?: boolean): Promise<Tatum.Wallet | {
        address: string;
        privateKey: string;
    } | {
        privateKey: string;
        address: string;
    } | {
        address: string;
        secret: string;
    }>;
    generateAddressPrivateKey(derivationIndex: number, mnemonic: string, testnet?: boolean): Promise<{
        key: string;
    }>;
    getTransactionsByAddress(address: string, pagination?: object, testnet?: boolean): Promise<Array<ScryptaParsedTx>>;
    getUnspentsByAddress(address: string, pagination?: object, testnet?: boolean): Promise<Array<ScryptaUnspent>>;
    getUTXO(hash: string, index: number, testnet?: boolean): Promise<ScryptaUnspent>;
    getRawTransaction(txHash: string, testnet?: boolean): Promise<any>;
    broadcast(txData: string, testnet?: boolean): Promise<{
        txId: string;
        failed?: boolean;
    }>;
}

import { ScryptaBlockchainService } from './ScryptaBlockchainService';
import { GeneratePrivateKey } from './dto/GeneratePrivateKey';
import { PathXpubI } from './dto/PathXpubI';
import { PathI } from './dto/PathI';
import { PathHash } from './dto/PathHash';
import { PathAddress } from './dto/PathAddress';
import { PathHashI } from './dto/PathHashI';
export declare abstract class ScryptaController {
    protected readonly scrypta: ScryptaBlockchainService;
    protected constructor(scrypta: ScryptaBlockchainService);
    getInfo(): Promise<any>;
    generateWallet(): Promise<import("@tatumio/tatum").Wallet | {
        address: string;
        privateKey: string;
    } | {
        privateKey: string;
        address: string;
    } | {
        address: string;
        secret: string;
    }>;
    generateWalletPrivKey(body: GeneratePrivateKey): Promise<{
        key: string;
    }>;
    generateAddress(param: PathXpubI): Promise<string>;
    getBlockHash(param: PathI): Promise<string>;
    getBlock(param: PathHash): Promise<import("./constants").ScryptaBlock>;
    getTransactionbyHash(param: PathHash): Promise<any>;
    getTransactionsByAddress(param: PathAddress): Promise<import("./constants").ScryptaParsedTx[]>;
    getUnspentsByAddress(param: PathAddress): Promise<import("./constants").ScryptaUnspent[]>;
    getUTXO(param: PathHashI): Promise<import("./constants").ScryptaUnspent>;
    broadcast(body: any): Promise<{
        txId: string;
        failed?: boolean;
    } | {
        message: string;
        failed: boolean;
    }>;
    sendTransactionByAddressOrUtxo(body: any, headers: any): Promise<{
        txId: string;
        failed?: boolean;
    } | {
        message: string;
        failed: boolean;
    }>;
}

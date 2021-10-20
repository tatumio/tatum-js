import {validateBody} from '../connector/tatum';
import {CreateRecord, Currency, TransferBscBep20, TransferCeloOrCeloErc20Token, TransferErc20, TransferTron} from '../model';
import { sendBscOrBep20Transaction, sendBscStoreDataTransaction, sendCustomBep20Transaction } from './bsc';
import { sendCeloErc20Transaction, sendCeloOrcUsdTransaction, sendCeloStoreDataSignedTransaction } from './celo';
import { sendCustomErc20Transaction, sendEthOrErc20Transaction, sendStoreDataTransaction } from './eth';
import { sendOneStoreDataTransaction, sendOneTransaction, sendOneTransfer20SignedTransaction } from './one';
import {
    sendPolygonStoreDataTransaction,
    sendPolygonTransaction,
    sendPolygonTransferErc20SignedTransaction,
} from './polygon';
import {sendTronTransaction} from './tron';
import {sendXdcStoreDataTransaction} from './xdc';

/**
 * Store any arbitrary data on the blockchain.
 * @param testnet if we are on testnet or not
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (testnet: boolean, body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord);
    switch (body.chain) {
        case Currency.ETH:
            return await sendStoreDataTransaction(body, provider);
        case Currency.CELO:
            return await sendCeloStoreDataSignedTransaction(testnet, body, provider);
        case Currency.BSC:
            return await sendBscStoreDataTransaction(body, provider);
        case Currency.XDC:
            return await sendXdcStoreDataTransaction(body, provider);
        case Currency.ONE:
            return await sendOneStoreDataTransaction(testnet, body, provider);
        case Currency.MATIC:
            return await sendPolygonStoreDataTransaction(testnet, body, provider);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Perform any native asset transaction.
 * @param testnet if we are on testnet or not
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (testnet: boolean, chain: Currency,
                                      body: TransferErc20 | TransferCeloOrCeloErc20Token | TransferBscBep20 | TransferTron, provider?: string) => {
    switch (chain) {
        case Currency.CELO: {
            const b = body as TransferCeloOrCeloErc20Token;
            b.feeCurrency = Currency.CELO;
            return b.contractAddress ? sendCeloErc20Transaction(testnet, b) : sendCeloOrcUsdTransaction(testnet, b, provider);
        }
        case Currency.ETH: {
            const b = body as TransferErc20;
            return b.contractAddress ? sendCustomErc20Transaction(b, provider) : sendEthOrErc20Transaction(b, provider);
        }
        case Currency.MATIC: {
            const b = body as TransferErc20;
            return b.contractAddress ? sendPolygonTransferErc20SignedTransaction(testnet, b, provider) : sendPolygonTransaction(testnet, b, provider);
        }
        case Currency.ONE: {
            const b = body as TransferErc20;
            return b.contractAddress ? sendOneTransfer20SignedTransaction(testnet, b, provider) : sendPolygonTransaction(testnet, b, provider);
        }
        case Currency.TRON:
            // @ts-ignore
            if (body.contractAddress) {
                throw new Error('Cannot work with TRON and contract address');
            }
            return sendTronTransaction(testnet, body as TransferTron);
        case Currency.BSC: {
            const b = body as TransferBscBep20;
            return b.contractAddress ? sendCustomBep20Transaction(b, provider) : sendBscOrBep20Transaction(b, provider);
        }
        default:
            throw new Error('Unsupported blockchain.');
    }
};

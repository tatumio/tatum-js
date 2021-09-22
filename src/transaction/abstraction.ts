import {validateBody} from '../connector/tatum';
import {CreateRecord, Currency, TransferBscBep20, TransferCeloOrCeloErc20Token, TransferErc20, TransferTron} from '../model';
import {sendBscOrBep20Transaction, sendBscStoreDataTransaction} from './bsc';
import {sendCeloOrcUsdTransaction, sendCeloStoreDataSignedTransaction} from './celo';
import {sendEthOrErc20Transaction, sendStoreDataTransaction} from './eth';
import {sendOneStoreDataTransaction, sendOneTransaction} from './one';
import {sendPolygonStoreDataTransaction, sendPolygonTransaction} from './polygon';
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
            b.currency = Currency.CELO;
            b.feeCurrency = Currency.CELO;
            return sendCeloOrcUsdTransaction(testnet, b, provider);
        }
        case Currency.ETH:
            (body as TransferErc20).currency = chain;
            return sendEthOrErc20Transaction(body as TransferErc20, provider);
        case Currency.MATIC:
            (body as TransferErc20).currency = chain;
            return sendPolygonTransaction(testnet, body as TransferErc20, provider);
        case Currency.ONE:
            (body as TransferErc20).currency = chain;
            return sendOneTransaction(testnet, body as TransferErc20, provider);
        case Currency.TRON:
            return sendTronTransaction(testnet, body as TransferTron);
        case Currency.BSC:
            (body as TransferBscBep20).currency = chain;
            return sendBscOrBep20Transaction(body as TransferBscBep20, provider);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

import {Currency, TransferBscBep20, TransferCeloOrCeloErc20Token, TransferEthErc20, TransferTron} from '../model';
import {sendBscOrBep20Transaction} from './bsc';
import {sendCeloOrcUsdTransaction} from './celo';
import {sendEthOrErc20Transaction} from './eth';
import {sendOneTransaction} from './one';
import {sendPolygonTransaction} from './polygon';
import {sendTronTransaction} from './tron';

/**
 * Perform any native asset transaction.
 * @param testnet if we are on testnet or not
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (testnet: boolean, chain: Currency,
                                      body: TransferEthErc20 | TransferCeloOrCeloErc20Token | TransferBscBep20 | TransferTron, provider?: string) => {
    switch (chain) {
        case Currency.CELO:
            const b = body as TransferCeloOrCeloErc20Token;
            b.currency = Currency.CELO;
            b.feeCurrency = Currency.CELO;
            return sendCeloOrcUsdTransaction(testnet, b, provider);
        case Currency.ETH:
            (body as TransferEthErc20).currency = chain;
            return sendEthOrErc20Transaction(body as TransferEthErc20, provider);
        case Currency.MATIC:
            (body as TransferEthErc20).currency = chain;
            return sendPolygonTransaction(testnet, body as TransferEthErc20, provider);
        case Currency.ONE:
            (body as TransferEthErc20).currency = chain;
            return sendOneTransaction(testnet, body as TransferEthErc20, provider);
        case Currency.TRON:
            return sendTronTransaction(testnet, body as TransferTron);
        case Currency.BSC:
            (body as TransferBscBep20).currency = chain;
            return sendBscOrBep20Transaction(body as TransferBscBep20, provider);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

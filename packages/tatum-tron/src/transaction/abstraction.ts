import {sendTronTransaction} from './tron';
import {TransferTron} from 'src/model';

/**
 * Perform any native asset transaction.
 * @param testnet if we are on testnet or not
 * @param body Body of the transaction.
 */
export const sendTransaction = async (testnet: boolean, body: TransferTron) => {
    return sendTronTransaction(testnet, body as TransferTron);
};

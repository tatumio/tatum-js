import {sendTronTransaction} from './tron';
import {TransferTron} from 'src/model';

/**
 * Perform any native asset transaction.
 * @param body Body of the transaction.
 */
export const sendTransaction = async (body: TransferTron) => {
    return sendTronTransaction(body as TransferTron);
};

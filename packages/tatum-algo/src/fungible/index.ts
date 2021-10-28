import {
    AlgoCreateFT, 
    AlgoTransferFT, 
    AlgoBurnFT,
} from '../model';

import { 
    sendAlgoCreateFTSignedTransaction, 
    sendAlgoTransferFTSignedTransaction, 
    sendAlgoBurnFTSignedTransaction, 
} from "../transaction";


/**
 * Create new FT token.
 * @param testnet if we use testnet or not
 * @param body body of the create request
 * @param provider optional provider do broadcast tx
 */
export const createFT = async (testnet: boolean, body: AlgoCreateFT, provider?: string) => {
    return sendAlgoCreateFTSignedTransaction(testnet, body, provider);
};


/**
 * Burn new FT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the burn request
 * @param provider optional provider do broadcast tx
 */
export const burnFT = async (testnet: boolean, body: AlgoBurnFT, provider?: string) => {
    return sendAlgoBurnFTSignedTransaction(testnet, body, provider);
};

/**
 * Transfer new FT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferFT = async (testnet: boolean, body: AlgoTransferFT, provider?: string) => {
    return sendAlgoTransferFTSignedTransaction(testnet, body, provider);
};


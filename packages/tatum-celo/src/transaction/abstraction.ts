import { CreateRecord, validateBody, Currency } from "@tatumio/tatum-core";
import { sendCeloStoreDataSignedTransaction, sendCeloOrcUsdTransaction } from "../transaction";
import { TransferCeloOrCeloErc20Token } from "../model";

/**
 * Store any arbitrary data on the blockchain.
 * @param testnet if we are on testnet or not
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (testnet: boolean, body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord);
    return await sendCeloStoreDataSignedTransaction(testnet, body, provider);
};

/**
 * Perform any native asset transaction.
 * @param testnet if we are on testnet or not
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (testnet: boolean, chain: Currency,
                                      body: TransferCeloOrCeloErc20Token, provider?: string) => {
    const b = body as TransferCeloOrCeloErc20Token;
    b.currency = Currency.CELO;
    b.feeCurrency = Currency.CELO;
    return sendCeloOrcUsdTransaction(testnet, b, provider);
};

import { Sotez } from 'sotez';
import { TransferXtz } from '../model';
import { XTZ_DEFAULT_FEE } from '../constants';

/**
 * Prepare Tezos Server.
 * @param provider url of Tezos provider.
 * @returns Configured Tezos server.
 */
const prepareTezos = (provider?: string) => {
  return new Sotez(
    provider || 'https://mainnet-tezos.giganode.io',
    'main',
    {
      defaultFee: XTZ_DEFAULT_FEE,
      localForge: true,
      validateLocalForge: false,
      debugMode: false,
      useMutez: true,
    }
  );
}

/**
 * Send Tezos transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * @param body content of the transaction to prepare.
 * @param provider url of Tezos provider
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const sendXtzTransaction = async (body: TransferXtz, provider?: string):Promise<string> => {
  const tezos = prepareTezos(provider);
  await tezos.importKey(body.privateKey);

  return (await tezos.transfer({
    to: body.to,
    amount: body.amount,
  })).hash;
};

/**
 * Broadcast a signed Xtz transaction to the blockchain.
 * @param txData raw transaction data in hex, to be broadcasted to blockchain.
 * @param provider url of Tezos provider
 * @returns txId - the broadcasted transaction ID .
 */
export const broadcastXtzTransaction = async (txData: string, provider?: string):Promise<string> => {
  const tezos = prepareTezos(provider);
  return (await tezos.silentInject(txData)).hash;
}

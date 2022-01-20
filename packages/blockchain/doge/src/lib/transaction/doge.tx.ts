import BigNumber from 'bignumber.js';
// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-doge';
import {
  ApiServices,
  DogeTransactionUTXO,
  DogeTransactionUTXOKMS,
  TransactionHashKMS,
} from '@tatumio/api-client';

type DogeTransaction = 
  | DogeTransactionUTXO 
  | DogeTransactionUTXOKMS

const privateKeysFromUTXO = async (
  transaction: Transaction,
  body: DogeTransaction
): Promise<Array<string>> => {
  const privateKeysToSign = [];

  for (const item of body.fromUTXO) {
    transaction.from({
      txId: item.txHash,
      outputIndex: item.index,
      script: Script.fromAddress(item.address).toString(),
      satoshis: Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
    });

    if ('signatureId' in item) privateKeysToSign.push(item.signatureId);
    else if ('privateKey' in item) privateKeysToSign.push(item.privateKey);
  }

  return privateKeysToSign;
};

const prepareSignedTransaction = async (body: DogeTransaction): Promise<string> => {
  const tx = new Transaction()
    .fee(Number(new BigNumber(body.fee).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
    .change(body.changeAddress);

   const privateKeysToSign = await privateKeysFromUTXO(tx, body);

    const fromUTXO = body.fromUTXO;
    if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
      return JSON.stringify({ txData: JSON.stringify(tx), privateKeysToSign });
    }

  body.to.forEach((to) => {
    tx.to(
      to.address,
      Number(new BigNumber(to.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
    );
  });

  privateKeysToSign.forEach((key) => {
    tx.sign(PrivateKey.fromWIF(key));
  });

  return tx.serialize();
};

const sendTransaction = async (body: DogeTransaction): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.doge.dogeBroadcast({
    txData: await prepareSignedTransaction(body),
  });
};

export const dogeTransactions = () => ({
  sendTransaction,
  prepareSignedTransaction,
});
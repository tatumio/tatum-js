import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing';
import { TatumBtcSDK } from '@tatumio/btc';
import { BtcTransactionFromAddress } from '@tatumio/api-client';

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY });

export async function btcApiExample() {
  const mempoolTransactionIds = await btcSDK.api.btcGetMempool();
  const block = await btcSDK.api.btcGetBlock(
    '0000000000000000000067de34da54c96ff76e6ba172f82c4ed8a25afb112a9e',
  );
  const txHash = await btcSDK.api.btcBroadcast({ txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D', signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6' });
  const address = await btcSDK.api.btcGenerateAddress('xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid', 0);
  const privateKey = await btcSDK.api.btcGenerateAddressPrivateKey({ mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse', index: 0 });
  const wallet = await btcSDK.api.btcGenerateWallet('urge pulp usage sister evidence arrest palm math please chief egg abuse');
  const balance = await btcSDK.api.btcGetBalanceOfAddress('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb');
  const blockchainInfo = await btcSDK.api.btcGetBlockChainInfo();
  const hash = await btcSDK.api.btcGetBlockHash(1580117);
  const tx = await btcSDK.api.btcGetRawTransaction('1451692ebbfbea1a2d2ec6fe6782596b6aa2e46c0589d04c406f491b5b46bc6a');
  const txByAddress = await btcSDK.api.btcGetTxByAddress('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb', 50);
  const utxo = await btcSDK.api.btcGetUtxo('53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc', 0);
  const transfer = await btcSDK.api.btcTransferBlockchain({
    fromAddress: [{
      address: "2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS",
      privateKey: "cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbP"
    }], to: [
      {
        address: "2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7",
        value: 0.02969944
      }
    ]
  } as BtcTransactionFromAddress);
}

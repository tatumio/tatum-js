import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumLtcSDK } from '@tatumio/ltc'
import { LtcTransactionAddress } from '@tatumio/api-client';

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcApiExample() {
  const mempoolTransactionIds = await ltcSDK.api.ltcGetMempool()
  const block = await ltcSDK.api.ltcGetBlock(
    '444a4fdf21b3f12370982a4f00c3e311e9d2844d1b2306f00d5514829821e494',
  )
  const txHash = await ltcSDK.api.ltcBroadcast({ txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D', signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6' });
  const address = await ltcSDK.api.ltcGenerateAddress('xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid', 0);
  const privateKey = await ltcSDK.api.ltcGenerateAddressPrivateKey({ mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse', index: 0 });
  const wallet = await ltcSDK.api.ltcGenerateWallet('urge pulp usage sister evidence arrest palm math please chief egg abuse');
  const balance = await ltcSDK.api.ltcGetBalanceOfAddress('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb');
  const blockchainInfo = await ltcSDK.api.ltcGetBlockChainInfo();
  const hash = await ltcSDK.api.ltcGetBlockHash(1580117);
  const tx = await ltcSDK.api.ltcGetRawTransaction('1451692ebbfbea1a2d2ec6fe6782596b6aa2e46c0589d04c406f491b5b46bc6a');
  const txByAddress = await ltcSDK.api.ltcGetTxByAddress('2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb', 50);
  const utxo = await ltcSDK.api.ltcGetUtxo('53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc', 0);
  const transfer = await ltcSDK.api.ltcTransferBlockchain({
    fromAddress: [{
      address: "2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS",
      privateKey: "cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbP"
    }], to: [
      {
        address: "2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7",
        value: 0.02969944
      }
    ]
  } as LtcTransactionAddress);
}

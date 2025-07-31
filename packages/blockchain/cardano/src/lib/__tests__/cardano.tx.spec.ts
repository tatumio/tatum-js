import {
  AdaTransactionFromAddress,
  AdaTransactionFromAddressKMS,
  AdaTransactionFromUTXO,
  AdaTransactionFromUTXOKMS,
} from '@tatumio/api-client'
import { TatumCardanoSDK } from '../cardano.sdk';
import { REPLACE_ME_WITH_TATUM_TESTNET_API_KEY } from '@tatumio/shared-testing-common'

describe.skip('CARDANO transactions', () => {
  jest.setTimeout(60000)

  afterEach(() => {
    jest.resetAllMocks()
  })

  const sdk = TatumCardanoSDK({ apiKey: REPLACE_ME_WITH_TATUM_TESTNET_API_KEY })

  describe('From UTXO', () => {
    it('should send ADA from UTXO - change output present', async () => {
      const data = await sdk.transaction.prepareSignedTransaction({
        fromUTXO: [{
          amount: 10,
          txHash: 'e00f31565ef36d815dbc62b33ec956cb5fe0823aaa48533f2a4368b9d49ce801',
          index: 0,
          address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
          privateKey: '8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34',
        }],
        to: [
          {
            address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
            value: 1,
          },
        ],
        changeAddress: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
        fee: 1,
      } as AdaTransactionFromUTXO, { testnet: true })
      expect(data).toContain('827901d4383461343030383138323538323065303066333135363565663336643831356462633632623333656339353663623566653038323361616134383')
    })

    it('should send ADA from UTXO - change output not present - all spent', async () => {
      const data = await sdk.transaction.prepareSignedTransaction({
        fromUTXO: [{
          amount: 10,
          txHash: 'e00f31565ef36d815dbc62b33ec956cb5fe0823aaa48533f2a4368b9d49ce801',
          index: 0,
          address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
          privateKey: '8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34',
        }],
        to: [
          {
            address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
            value: 9,
          },
        ],
        changeAddress: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
        fee: 1,
      } as AdaTransactionFromUTXO, { testnet: true })
      expect(data).toContain('8279018a383461343030383138323538323065303066333135363565663336643831356462633632623333656339353663623566653038323361616134383')
    })
    it('should prepare send ADA for KMS', async () => {
      const data = await sdk.transaction.prepareSignedTransaction({
        fromUTXO: [{
          amount: 10,
          txHash: 'e00f31565ef36d815dbc62b33ec956cb5fe0823aaa48533f2a4368b9d49ce801',
          index: 0,
          address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
          signatureId: '8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34',
        }],
        to: [
          {
            address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
            value: 1,
          },
        ],
        changeAddress: 'addr_test1vzdts2y4k47zwypzdh36azxx0w4v8tev6m6svtz9fud0emgchuswu',
        fee: 1,
      } as AdaTransactionFromUTXOKMS, { testnet: true })
      expect(JSON.parse(data)).toStrictEqual([{
        'operation_identifier': { 'index': 0, 'network_index': 0 },
        'related_operations': [],
        'type': 'input',
        'status': 'success',
        'account': { 'address': 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5', 'metadata': {} },
        'amount': { 'value': '-10000000', 'currency': { 'symbol': 'ADA', 'decimals': 6 } },
        'coin_change': {
          'coin_identifier': { 'identifier': 'e00f31565ef36d815dbc62b33ec956cb5fe0823aaa48533f2a4368b9d49ce801:0' },
          'coin_action': 'coin_created',
        },
        'metadata': {},
      }, {
        'operation_identifier': { 'index': 1, 'network_index': 0 },
        'related_operations': [],
        'type': 'output',
        'status': 'success',
        'account': { 'address': 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5', 'metadata': {} },
        'amount': { 'value': '1000000', 'currency': { 'symbol': 'ADA', 'decimals': 6 }, 'metadata': {} },
        'metadata': {},
      }, {
        'operation_identifier': { 'index': 2, 'network_index': 1 },
        'related_operations': [],
        'type': 'output',
        'status': 'success',
        'account': { 'address': 'addr_test1vzdts2y4k47zwypzdh36azxx0w4v8tev6m6svtz9fud0emgchuswu', 'metadata': {} },
        'amount': { 'value': '8000000', 'currency': { 'symbol': 'ADA', 'decimals': 6 }, 'metadata': {} },
        'metadata': {},
      }])
    })

    it('should prepare send ADA for KMS - change output not present', async () => {
      const data = await sdk.transaction.prepareSignedTransaction({
        fromUTXO: [{
          amount: 10,
          txHash: 'e00f31565ef36d815dbc62b33ec956cb5fe0823aaa48533f2a4368b9d49ce801',
          index: 0,
          address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
          signatureId: '8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34',
        }],
        to: [
          {
            address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
            value: 9,
          },
        ],
        changeAddress: 'addr_test1vzdts2y4k47zwypzdh36azxx0w4v8tev6m6svtz9fud0emgchuswu',
        fee: 1,
      } as AdaTransactionFromUTXOKMS, { testnet: true })
      expect(JSON.parse(data)).toStrictEqual([{
        'operation_identifier': { 'index': 0, 'network_index': 0 },
        'related_operations': [],
        'type': 'input',
        'status': 'success',
        'account': { 'address': 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5', 'metadata': {} },
        'amount': { 'value': '-10000000', 'currency': { 'symbol': 'ADA', 'decimals': 6 } },
        'coin_change': {
          'coin_identifier': { 'identifier': 'e00f31565ef36d815dbc62b33ec956cb5fe0823aaa48533f2a4368b9d49ce801:0' },
          'coin_action': 'coin_created',
        },
        'metadata': {},
      }, {
        'operation_identifier': { 'index': 1, 'network_index': 0 },
        'related_operations': [],
        'type': 'output',
        'status': 'success',
        'account': { 'address': 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5', 'metadata': {} },
        'amount': { 'value': '9000000', 'currency': { 'symbol': 'ADA', 'decimals': 6 }, 'metadata': {} },
        'metadata': {},
      }])
    })
  })

  describe('From Address', () => {
    it('should send ADA from address', async () => {
      const data = await sdk.transaction.prepareSignedTransaction({
        fromAddress: [{
          address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
          privateKey: '8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34',
        }],
        to: [
          {
            address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
            value: 1,
          },
        ],
        changeAddress: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
        fee: 1,
      } as AdaTransactionFromAddress, { testnet: true })
      expect(data).toContain('827901dc3834613430303831383235383230653030663331353635656633366438313564626336326233336563393536636235666530383233616161343835333366326134333638623964343963653830313030303138323832353831643630393231643164393338653835396131303565333762326331663731626563333831356362363232393431366163393531343')
    })
    it('should prepare send ADA for KMS', async () => {
      const data = await sdk.transaction.prepareSignedTransaction({
        fromAddress: [{
          address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
          signatureId: '8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34',
        }],
        to: [
          {
            address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
            value: 1,
          },
        ],
        changeAddress: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
        fee: 1,
      } as AdaTransactionFromAddressKMS, { testnet: true })
      expect(JSON.parse(data)).toStrictEqual([{
        'operation_identifier': { 'index': 0, 'network_index': '0' },
        'related_operations': [],
        'type': 'input',
        'status': 'success',
        'account': { 'address': 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5', 'metadata': {} },
        'amount': { 'value': '-10000000000', 'currency': { 'symbol': 'ADA', 'decimals': 6 } },
        'coin_change': {
          'coin_identifier': { 'identifier': 'e00f31565ef36d815dbc62b33ec956cb5fe0823aaa48533f2a4368b9d49ce801:0' },
          'coin_action': 'coin_created',
        },
        'metadata': {},
      }, {
        'operation_identifier': { 'index': 1, 'network_index': 0 },
        'related_operations': [],
        'type': 'output',
        'status': 'success',
        'account': { 'address': 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5', 'metadata': {} },
        'amount': { 'value': '1000000', 'currency': { 'symbol': 'ADA', 'decimals': 6 }, 'metadata': {} },
        'metadata': {},
      },
      {
        'account': {
          'address': 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
          'metadata': {},
        },
        'amount': {
          'currency': {
            'decimals': 6,
            'symbol': 'ADA',
          },
          'metadata': {},
          'value': '9998000000',
        },
        'metadata': {},
        'operation_identifier': {
          'index': 2,
          'network_index': 1,
        },
        'related_operations': [],
        'status': 'success',
        'type': 'output',
      }])
    })
    it('should sign send ADA for KMS', async () => {
      const serializedTransaction = await sdk.transaction.prepareSignedTransaction({
        fromAddress: [{
          address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
          signatureId: '8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34',
        }],
        to: [
          {
            address: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
            value: 1,
          },
        ],
        changeAddress: 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5',
        fee: 1,
      } as AdaTransactionFromAddressKMS, { testnet: true })
      const data = await sdk.kms.sign({
        chain: 'ADA',
        id: '123',
        serializedTransaction,
        hashes: [],
      }, ['8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34'], { testnet: true })
      expect(data).toContain('827901dc38346134303038313832353832306530306633313536356566333664383135646263363262333365633935366362356665303832336161613438353333663261343336386239643439636538303130303031383238323538316436303932316431643933386538353961313035653337623263316637316265633338313563623632323934313661633935313437')
    })
  })
})

import {
  Currency,
  CustodialFullTokenWallet,
  CustodialFullTokenWalletWithBatch,
  Custodial_1155_TokenWallet,
  Custodial_1155_TokenWalletWithBatch,
  Custodial_20_1155_TokenWallet,
  Custodial_20_1155_TokenWalletWithBatch,
  Custodial_20_721_TokenWallet,
  Custodial_20_721_TokenWalletWithBatch,
  Custodial_20_TokenWallet,
  Custodial_20_TokenWalletWithBatch,
  Custodial_721_1155_TokenWallet,
  Custodial_721_1155_TokenWalletWithBatch,
  Custodial_721_TokenWallet,
  Custodial_721_TokenWalletWithBatch,
  GenerateCustodialAddress,
  obtainCustodialAddressType,
} from '@tatumio/tatum-core'
import { prepareGenerateCustodialWalletSignedTransaction, sendGenerateCustodialWalletSignedTransaction } from '../transaction'

describe('Custodial wallet tests', () => {
  process.env.TRON_PRO_API_KEY = 'b35409b4-7d11-491e-8760-32d2506a90b5'
  jest.setTimeout(9999)

  describe('Feature enablement logic', () => {
    it('should deploy all batch', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = true
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = true
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(CustodialFullTokenWalletWithBatch.abi)
    })

    it('should deploy all', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = false
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = true
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(CustodialFullTokenWallet.abi)
    })

    it('should deploy 20 batch', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = true
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = false
      body.enableSemiFungibleTokens = false
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_20_TokenWalletWithBatch.abi)
    })

    it('should deploy 20', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = false
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = false
      body.enableSemiFungibleTokens = false
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_20_TokenWallet.abi)
    })

    it('should deploy 721 batch', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = true
      body.enableFungibleTokens = false
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = false
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_721_TokenWalletWithBatch.abi)
    })

    it('should deploy 721', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = false
      body.enableFungibleTokens = false
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = false
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_721_TokenWallet.abi)
    })

    it('should deploy 1155 batch', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = true
      body.enableFungibleTokens = false
      body.enableNonFungibleTokens = false
      body.enableSemiFungibleTokens = true
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_1155_TokenWalletWithBatch.abi)
    })

    it('should deploy 1155', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = false
      body.enableFungibleTokens = false
      body.enableNonFungibleTokens = false
      body.enableSemiFungibleTokens = true
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_1155_TokenWallet.abi)
    })

    it('should deploy 20_721 batch', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = true
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = false
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_20_721_TokenWalletWithBatch.abi)
    })

    it('should deploy 20_721', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = false
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = false
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_20_721_TokenWallet.abi)
    })

    it('should deploy 20_1155 batch', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = true
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = false
      body.enableSemiFungibleTokens = true
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_20_1155_TokenWalletWithBatch.abi)
    })

    it('should deploy 20_1155', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = false
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = false
      body.enableSemiFungibleTokens = true
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_20_1155_TokenWallet.abi)
    })

    it('should deploy 721_1155 batch', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = true
      body.enableFungibleTokens = false
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = true
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_721_1155_TokenWalletWithBatch.abi)
    })

    it('should deploy 721_1155', () => {
      const body = new GenerateCustodialAddress()
      body.enableBatchTransactions = false
      body.enableFungibleTokens = false
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = true
      const { abi } = obtainCustodialAddressType(body)
      expect(abi).toBe(Custodial_721_1155_TokenWallet.abi)
    })
  })

  describe('Deploy address', () => {
    it('should create on ETH no batch', async () => {
      const body = new GenerateCustodialAddress()
      body.fromPrivateKey = '0xd3d46d51fa3780cd952821498951e07307dfcfbbf2937d1c54123d6582032fa6'
      body.chain = Currency.ETH
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = false
      body.enableBatchTransactions = false
      const txData = await sendGenerateCustodialWalletSignedTransaction(body)
      expect(txData.txId).toContain('0x')
      console.log(txData.txId)
    })

    it('should create on ETH no batch KMS', async () => {
      const body = new GenerateCustodialAddress()
      body.signatureId = '96e13f7f-393e-4f64-8fde-17bd90ce2c5b'
      body.chain = Currency.ETH
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = false
      body.enableBatchTransactions = false
      const txData = await prepareGenerateCustodialWalletSignedTransaction(body)
      expect(txData).toContain('0x')
    })
  })
})

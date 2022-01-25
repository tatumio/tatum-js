import { evmBasedCustodial } from '../evm-based.custodial'
import { GenerateCustodialWallet } from '@tatumio/api-client'
import {
  Custodial_1155_TokenWallet,
  Custodial_1155_TokenWalletWithBatch,
  Custodial_20_1155_TokenWallet,
  Custodial_20_1155_TokenWalletWithBatch,
  Custodial_20_721_TokenWallet,
  Custodial_20_721_TokenWalletBatch,
  Custodial_20_TokenWallet,
  Custodial_20_TokenWalletWithBatch,
  Custodial_721_1155_TokenWallet,
  Custodial_721_1155_TokenWalletWithBatch,
  Custodial_721_TokenWallet,
  Custodial_721_TokenWalletWithBatch,
  CustodialFullTokenWallet,
  CustodialFullTokenWalletWithBatch,
} from '../../contracts'
import { ContractAbi } from '../../contracts/common.contracts'
import chain = GenerateCustodialWallet.chain

describe('evmBasedCustodial', () => {
  const custodialService = evmBasedCustodial()

  describe('obtainCustodialAddressType', () => {
    it.each([
      // erc20
      [true, false, false, false, Custodial_20_TokenWallet],
      [true, false, false, true, Custodial_20_TokenWalletWithBatch],

      // erc721
      [false, true, false, false, Custodial_721_TokenWallet],
      [false, true, false, true, Custodial_721_TokenWalletWithBatch],

      // erc1155
      [false, false, true, false, Custodial_1155_TokenWallet],
      [false, false, true, true, Custodial_1155_TokenWalletWithBatch],

      // erc20 + erc721
      [true, true, false, false, Custodial_20_721_TokenWallet],
      [true, true, false, true, Custodial_20_721_TokenWalletBatch],

      // erc20 + erc1155
      [true, false, true, false, Custodial_20_1155_TokenWallet],
      [true, false, true, true, Custodial_20_1155_TokenWalletWithBatch],

      // erc721 + erc1155
      [false, true, true, false, Custodial_721_1155_TokenWallet],
      [false, true, true, true, Custodial_721_1155_TokenWalletWithBatch],

      // full
      [true, true, true, false, CustodialFullTokenWallet],
      [true, true, true, true, CustodialFullTokenWalletWithBatch],
    ])(
      '[%s | %s | %s | %s]',
      async (
        enableFungibleTokens: boolean,
        enableNonFungibleTokens: boolean,
        enableSemiFungibleTokens: boolean,
        enableBatchTransactions: boolean,
        expected: ContractAbi,
      ) => {
        const result = custodialService.obtainCustodialAddressType({
          chain: chain.ETH,
          fromPrivateKey: '',
          enableFungibleTokens,
          enableNonFungibleTokens,
          enableSemiFungibleTokens,
          enableBatchTransactions,
        })
        expect(result).toBe(expected)
      },
    )

    it('All negative', async () => {
      expect(() => {
        custodialService.obtainCustodialAddressType({
          chain: chain.ETH,
          fromPrivateKey: '',
          enableFungibleTokens: false,
          enableNonFungibleTokens: false,
          enableSemiFungibleTokens: false,
          enableBatchTransactions: false,
        })
      }).toThrow('Unsupported combination of inputs.')
    })
  })
})

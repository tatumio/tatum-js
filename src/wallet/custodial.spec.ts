import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { bscBroadcast, tronBroadcast } from '../blockchain';
import {
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
  CustodialFullTokenWallet,
  CustodialFullTokenWalletWithBatch,
} from '../contracts/custodial';
import {
  ApproveCustodialTransfer,
  ContractType,
  Currency,
  GenerateCustodialAddress,
  GenerateCustodialAddressBatch,
  GenerateTronCustodialAddress,
  TransferFromCustodialAddress,
  TransferFromCustodialAddressBatch,
  TransferFromTronCustodialAddress,
  TransferFromTronCustodialAddressBatch,
} from '../model';
import {
  prepareEthGenerateCustodialWalletSignedTransaction,
  sendBscGenerateCustodialWalletSignedTransaction,
  sendCeloGenerateCustodialWalletSignedTransaction,
  sendEthGenerateCustodialWalletSignedTransaction,
  sendTronGenerateCustodialWalletSignedTransaction,
} from '../transaction';
import {
  generateCustodialWalletBatch,
  obtainCustodialAddressType,
  prepareApproveFromCustodialWallet,
  prepareBatchTransferFromCustodialWallet,
  prepareTransferFromCustodialWallet,
} from './custodial';
import { validateBody } from '../connector/tatum'

describe('Custodial wallet tests', () => {
  jest.setTimeout(99999);

  describe('Feature enablement logic - deprecated', () => {
    it('should deploy all batch', () => {
      const body = new GenerateCustodialAddress();
      body.enableBatchTransactions = true;
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
      const body = new GenerateCustodialAddress();
      body.enableBatchTransactions = false;
      body.enableFungibleTokens = false;
      body.enableNonFungibleTokens = true;
      body.enableSemiFungibleTokens = true;
      const { abi } = obtainCustodialAddressType(body);
      expect(abi).toBe(Custodial_721_1155_TokenWallet.abi);
    })
  })

  describe('Deploy batch address', () => {
    it('should create on CELO', async () => {
      const body = new GenerateCustodialAddressBatch();
      body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
      body.chain = Currency.CELO;
      body.feeCurrency = Currency.CUSD;
      body.batchCount = 200;
      body.owner = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      const txData = await generateCustodialWalletBatch(true, body, 'https://alfajores-forno.celo-testnet.org');
      expect(txData.txId).toContain('0x');
      console.log(txData.txId);
    });

    it('should create on CELO - feesCovered set to false', async () => {
      const body = new GenerateCustodialAddressBatch();
      body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
      body.chain = Currency.CELO;
      body.feesCovered = false
      body.feeCurrency = Currency.CUSD;
      body.batchCount = 200;
      body.owner = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      const txData = await generateCustodialWalletBatch(true, body, 'https://alfajores-forno.celo-testnet.org');
      expect(txData.txId).toContain('0x');
      console.log(txData.txId);
    });

    it('should fail on CELO - feesCovered entered with wrong validation', async () => {
      const body = new GenerateCustodialAddressBatch();
      body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
      body.feesCovered = true
      body.chain = Currency.CELO;
      body.feeCurrency = Currency.CUSD;
      body.batchCount = 200;
      body.owner = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      await generateCustodialWalletBatch(true, body, 'https://alfajores-forno.celo-testnet.org');
      fail('Should fail on validation')
    });

    it('should OK on CELO - feesCovered entered without OK or signatureId', async () => {
      const body = new GenerateCustodialAddressBatch();
      body.feesCovered = true
      body.chain = Currency.CELO;
      body.feeCurrency = Currency.CUSD;
      body.batchCount = 200;
      body.owner = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      await validateBody(body, GenerateCustodialAddressBatch)
    });

    it('should create on MATIC', async () => {
      const body = new GenerateCustodialAddressBatch();
      body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
      body.chain = Currency.MATIC;
      body.batchCount = 200;
      body.owner = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      const txData = await generateCustodialWalletBatch(true, body);
      expect(txData.txId).toContain('0x');
      console.log(txData.txId);
    });
  });

  describe('Deploy address', () => {
    it('should create on CELO no batch', async () => {
      const body = new GenerateCustodialAddress();
      body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
      body.chain = Currency.CELO;
      body.feeCurrency = Currency.CUSD;
      body.enableFungibleTokens = true;
      body.enableNonFungibleTokens = true;
      body.enableSemiFungibleTokens = false;
      body.enableBatchTransactions = false
      const txData = await sendCeloGenerateCustodialWalletSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
      expect(txData.txId).toContain('0x')
      console.log(txData.txId)
    })

    it('should create on BSC batch', async () => {
      const body = new GenerateCustodialAddress()
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
      body.chain = Currency.BSC
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = true
      body.enableBatchTransactions = true
      const txData = await sendBscGenerateCustodialWalletSignedTransaction(body, 'https://data-seed-prebsc-2-s1.binance.org:8545')
      expect(txData.txId).toContain('0x')
      console.log(txData.txId)
    })

    it('should create on ETH no batch', async () => {
      const body = new GenerateCustodialAddress()
      body.fromPrivateKey = '0xd3d46d51fa3780cd952821498951e07307dfcfbbf2937d1c54123d6582032fa6'
      body.chain = Currency.ETH
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.enableSemiFungibleTokens = false
      body.enableBatchTransactions = false
      const txData = await sendEthGenerateCustodialWalletSignedTransaction(body)
      expect(txData.txId).toContain('0x')
      console.log(txData.txId)
    })

    it('should create on ETH no batch KMS', async () => {
      const body = new GenerateCustodialAddress()
      body.signatureId = '96e13f7f-393e-4f64-8fde-17bd90ce2c5b';
      body.chain = Currency.ETH;
      body.enableFungibleTokens = true;
      body.enableNonFungibleTokens = true;
      body.enableSemiFungibleTokens = false;
      body.enableBatchTransactions = false;
      const txData = await prepareEthGenerateCustodialWalletSignedTransaction(body);
      expect(txData).toContain('0x');
    })

    it('should create on TRON', async () => {
      const body = new GenerateCustodialAddressBatch();
      body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
      body.chain = Currency.TRON;
      body.feeLimit = 500;
      body.owner = 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh';
      body.batchCount = 10;
      try {
        const txData = await generateCustodialWalletBatch(true, body);
        expect(txData.txId).toBeDefined();
        console.log(txData.txId);
      } catch (e) {
        console.error(e);
      }
    });

    it('should create on TRON no batch', async () => {
      const body = new GenerateTronCustodialAddress();
      body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
      body.chain = Currency.TRON;
      body.enableFungibleTokens = true;
      body.enableNonFungibleTokens = true;
      body.feeLimit = 500;
      body.enableSemiFungibleTokens = false;
      body.enableBatchTransactions = true;
      const txData = await sendTronGenerateCustodialWalletSignedTransaction(true, body)
      expect(txData.txId).toBeDefined()
      console.log(txData.txId)
    })

    it('should fail create on TRON no batch - 1155', async () => {
      const body = new GenerateTronCustodialAddress()
      body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
      body.chain = Currency.TRON
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.feeLimit = 500
      body.enableSemiFungibleTokens = true
      body.enableBatchTransactions = true
      const t = async () => await sendTronGenerateCustodialWalletSignedTransaction(true, body)
      await expect(t()).rejects.toThrow()
    })

    it('should fail create on TRON no batch KMS - missing FROM', async () => {
      const body = new GenerateTronCustodialAddress()
      body.signatureId = '96e13f7f-393e-4f64-8fde-17bd90ce2c5b'
      body.chain = Currency.TRON
      body.enableFungibleTokens = true
      body.enableNonFungibleTokens = true
      body.feeLimit = 500
      body.enableSemiFungibleTokens = false
      body.enableBatchTransactions = true
      const t = async () => await sendTronGenerateCustodialWalletSignedTransaction(true, body)
      await expect(t()).rejects.toThrow()
    })
  })

  describe('Transfer from address CELO', () => {
    it('should transfer CEUR no batch', async () => {
      const body = new TransferFromCustodialAddress()
      body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
      body.chain = Currency.CELO
      body.feeCurrency = Currency.CELO
      body.contractType = ContractType.FUNGIBLE_TOKEN
      body.custodialAddress = '0xA16B57eaFA0Ae9d3E57D6b513E9f353eb40dbBB5'
      body.tokenAddress = '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f' // CEUR ERC20
      body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      body.amount = '1'
      const txData = await prepareTransferFromCustodialWallet(true, body)
      expect(txData).toContain('0x')
      const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
      await provider.ready
      console.log(await provider.sendTransaction(txData))
    })

  })
  describe('Transfer from address BSC', () => {
    it('should transfer BSC on BSC', async () => {
      const body = new TransferFromCustodialAddress()
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
      body.chain = Currency.BSC
      body.contractType = ContractType.NATIVE_ASSET
      body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4'
      body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      body.amount = '0.0000001'
      const txData = await prepareTransferFromCustodialWallet(true, body)
      expect(txData).toContain('0x')
      console.log(await bscBroadcast(txData))
    })

    it('should transfer 20 on BSC', async () => {
      const body = new TransferFromCustodialAddress()
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
      body.chain = Currency.BSC
      body.contractType = ContractType.FUNGIBLE_TOKEN
      body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4'
      body.tokenAddress = '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867'
      body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      body.amount = '1'
      const txData = await prepareTransferFromCustodialWallet(true, body)
      expect(txData).toContain('0x')
      console.log(await bscBroadcast(txData))
    })

    it('should transfer 721 on BSC', async () => {
      const body = new TransferFromCustodialAddress()
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
      body.chain = Currency.BSC
      body.contractType = ContractType.NON_FUNGIBLE_TOKEN
      body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4'
      body.tokenAddress = '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698'
      body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      body.tokenId = '20'
      const txData = await prepareTransferFromCustodialWallet(true, body)
      expect(txData).toContain('0x')
      console.log(await bscBroadcast(txData))
    })

    it('should transfer 1155 on BSC', async () => {
      const body = new TransferFromCustodialAddress()
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
      body.chain = Currency.BSC;
      body.contractType = ContractType.SEMI_FUNGIBLE_TOKEN;
      body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4';
      body.tokenAddress = '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3';
      body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      body.tokenId = '1';
      body.amount = '1';
      const txData = await prepareTransferFromCustodialWallet(true, body);
      expect(txData).toContain('0x');
      console.log(await bscBroadcast(txData));
    })

    it('should approve 20 on BSC', async () => {
      const body = new ApproveCustodialTransfer();
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
      body.chain = Currency.BSC;
      body.contractType = ContractType.FUNGIBLE_TOKEN;
      body.custodialAddress = '0x95abdd7406a6aca49797e833bacc3edaa394853a';
      body.tokenAddress = '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867';
      body.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      body.amount = '1';
      const txData = await prepareApproveFromCustodialWallet(true, body);
      expect(txData).toContain('0x');
      console.log(await bscBroadcast(txData));
    });

    it('should approve 721 on BSC', async () => {
      const body = new ApproveCustodialTransfer();
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
      body.chain = Currency.BSC;
      body.contractType = ContractType.NON_FUNGIBLE_TOKEN;
      body.custodialAddress = '0x95abdd7406a6aca49797e833bacc3edaa394853a';
      body.tokenAddress = '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698';
      body.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      body.tokenId = '10';
      const txData = await prepareApproveFromCustodialWallet(true, body);
      expect(txData).toContain('0x');
      console.log(await bscBroadcast(txData));
    });

    it('should approve 1155 on BSC', async () => {
      const body = new ApproveCustodialTransfer();
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
      body.chain = Currency.BSC;
      body.contractType = ContractType.SEMI_FUNGIBLE_TOKEN;
      body.custodialAddress = '0x95abdd7406a6aca49797e833bacc3edaa394853a';
      body.tokenAddress = '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3';
      body.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
      body.tokenId = '1';
      body.amount = '1';
      const txData = await prepareApproveFromCustodialWallet(true, body);
      expect(txData).toContain('0x');
      console.log(await bscBroadcast(txData));
    });

    it('should transfer all batch on BSC', async () => {
      const body = new TransferFromCustodialAddressBatch();
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
      body.chain = Currency.BSC;
      body.contractType = [ContractType.FUNGIBLE_TOKEN, ContractType.NON_FUNGIBLE_TOKEN, ContractType.SEMI_FUNGIBLE_TOKEN, ContractType.NATIVE_ASSET];
      body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4';
      body.tokenAddress = ['0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698', '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3', '0'];
      body.recipient = ['0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA', '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA', '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA', '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'];
      body.tokenId = ['0', '200', '1', '0']
      body.amount = ['1', '0', '1', '0.00001']
      const txData = await prepareBatchTransferFromCustodialWallet(true, body)
      expect(txData).toContain('0x')
      console.log(await bscBroadcast(txData))
    })

    it('should transfer 2 NFTs batch on CELO', async () => {
      const body = new TransferFromCustodialAddressBatch();
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
      body.chain = Currency.CELO;
      body.contractType = [ContractType.NON_FUNGIBLE_TOKEN, ContractType.NON_FUNGIBLE_TOKEN];
      body.custodialAddress = '0x7d0964ec4cd1817b8ad4830122f99b258fec1102';
      body.tokenAddress = ['0x4f54fAD27F7F46C102Cd49b8E75C5593397cd9c3', '0x4f54fAD27F7F46C102Cd49b8E75C5593397cd9c3'];
      body.recipient = ['0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA', '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'];
      body.tokenId = ['61', '62']
      body.amount = ['0', '0']
      const txData = await prepareBatchTransferFromCustodialWallet(true, body)
      expect(txData).toContain('0x')
      console.log(txData);
      const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
      await provider.ready;
      console.log(await provider.sendTransaction(txData));
    })

  })
  describe('Transfer from address TRON', () => {

    it('should transfer TRON on TRON', async () => {
      const body = new TransferFromTronCustodialAddress()
      body.feeLimit = 100
      body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
      body.chain = Currency.TRON
      body.contractType = ContractType.NATIVE_ASSET
      body.custodialAddress = 'TKogX3qk6E8tRYtqNUSVa9PsZHWwL3a7q8'
      body.recipient = 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'
      body.amount = '1.9'
      const txData = await prepareTransferFromCustodialWallet(true, body)
      expect(txData).toBeDefined()
      console.log(await tronBroadcast(txData))
    })

    it('should transfer 20 on TRON', async () => {
      const body = new TransferFromTronCustodialAddress()
      body.feeLimit = 100
      body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
      body.chain = Currency.TRON
      body.contractType = ContractType.FUNGIBLE_TOKEN
      body.custodialAddress = 'TKogX3qk6E8tRYtqNUSVa9PsZHWwL3a7q8'
      body.tokenAddress = 'TWgHeettKLgq1hCdEUPaZNCM6hPg8JkG2X'
      body.recipient = 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'
      body.amount = '1'
      const txData = await prepareTransferFromCustodialWallet(true, body)
      expect(txData).toBeDefined()
      console.log(await tronBroadcast(txData))
    })

    it('should transfer 721 on TRON', async () => {
      const body = new TransferFromTronCustodialAddress()
      body.feeLimit = 100
      body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
      body.chain = Currency.TRON
      body.contractType = ContractType.NON_FUNGIBLE_TOKEN
      body.custodialAddress = 'TKogX3qk6E8tRYtqNUSVa9PsZHWwL3a7q8'
      body.tokenAddress = 'TERXc8ZZbrKokDR8BVi8XCwEZBp83ewVgg'
      body.recipient = 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'
      body.tokenId = '1111'
      const txData = await prepareTransferFromCustodialWallet(true, body)
      expect(txData).toBeDefined()
      console.log(await tronBroadcast(txData))
    })

    it('should transfer all batch on TRON', async () => {
      const body = new TransferFromTronCustodialAddressBatch()
      body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
      body.chain = Currency.TRON
      body.feeLimit = 100
      body.contractType = [ContractType.FUNGIBLE_TOKEN, ContractType.NON_FUNGIBLE_TOKEN, ContractType.NATIVE_ASSET]
      body.custodialAddress = 'TKogX3qk6E8tRYtqNUSVa9PsZHWwL3a7q8'
      body.tokenAddress = ['TWgHeettKLgq1hCdEUPaZNCM6hPg8JkG2X', 'TERXc8ZZbrKokDR8BVi8XCwEZBp83ewVgg', '0']
      body.recipient = ['TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh', 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh', 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh']
      body.tokenId = ['0', '1112', '0']
      body.amount = ['1', '0', '0.00001']
      const txData = await prepareBatchTransferFromCustodialWallet(true, body)
      expect(txData).toBeDefined()
      console.log(await tronBroadcast(txData))
    })

  })
})

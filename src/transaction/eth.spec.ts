import { ethEstimateGas } from '../blockchain'
import { Currency, DeployEthErc20, TransferCustomErc20, TransferEthErc20 } from '../model';
import {
  ethGetGasPriceInWei,
  prepareCustomErc20SignedTransaction,
  prepareDeployErc20SignedTransaction,
  prepareEthOrErc20SignedTransaction, sendSmartContractMethodInvocationTransaction,
} from './eth';

describe('ETH transactions', () => {
  it('should test valid transaction ETH data', async () => {
    const body = new TransferEthErc20();
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
    body.amount = '0';
    body.currency = Currency.ETH;
    body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    const txData = await prepareEthOrErc20SignedTransaction(true, body);
    expect(txData).toContain('0x');
  });

  it('should test valid transaction ERC20 data', async () => {
    const body = new TransferEthErc20();
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
    body.amount = '0';
    body.currency = Currency.PLTC;
    body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    const txData = await prepareEthOrErc20SignedTransaction(true, body);
    expect(txData).toContain('0x');
  });

  it('should test valid custom transaction ERC20 data', async () => {
    const body = new TransferCustomErc20();
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
    body.amount = '0';
    body.contractAddress = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    body.digits = 10;
    const txData = await prepareCustomErc20SignedTransaction(true, body);
    expect(txData).toContain('0x');
  });

  it('should test valid custom deployment ERC20', async () => {
    const body = new DeployEthErc20();
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
    body.symbol = 'SYMBOL';
    body.name = 'Test_ERC20';
    body.supply = '100';
    body.address = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    body.digits = 10;
    const txData = await prepareDeployErc20SignedTransaction(true, body);
    expect(txData).toContain('0x');
  });

  it('should test invalid custom deployment ERC20, missing supply', async () => {
    const body = new DeployEthErc20();
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
    body.symbol = 'SYMBOL';
    body.name = 'Test_ERC20';
    body.address = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    body.digits = 10;
    try {
      await prepareDeployErc20SignedTransaction(true, body);
      fail('Validation did not pass.');
    } catch (e) {
      console.error(e);
    }
  });

  it('should test invalid custom transaction ERC20 data, missing digits', async () => {
    const body = new TransferCustomErc20();
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
    body.amount = '0';
    body.contractAddress = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    try {
      await prepareCustomErc20SignedTransaction(true, body);
      fail('Validation did not pass.');
    } catch (e) {
      console.error(e);
    }
  });

  it('should not test valid transaction data, missing currency', async () => {
    const body = new TransferEthErc20();
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
    body.amount = '0';
    body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
    try {
      await prepareEthOrErc20SignedTransaction(true, body);
      fail('Validation did not pass.');
    } catch (e) {
      console.error(e);
    }
  });

  it('should test ethGetGasPriceInWei', async () => {
    const gasPrice = await ethGetGasPriceInWei()
    expect(gasPrice).not.toBeNull()
  })

  it('should test ethEstimateGas', async () => {
    const ethGas = await ethEstimateGas({
      from: '0x11bb089914dd9bfba33b8dc83a95d368afeb1553',
      to: '0x9b85c57222826d82dd106e8455d3918846b507d5',
      amount: '10',
    })
    expect(ethGas).not.toBeNull()
  })

  it('should test read smart contract method invocation', async () => {
    const result = await sendSmartContractMethodInvocationTransaction(true, {
      fromPrivateKey: '0x192afdb39073e202f200117b609e8d40c1c8f50c3baebe1bda4773db48df81a0',
      contractAddress: '0x595bad1621784e9b0161d909be0117f17a5d37ca',
      methodName: 'balanceOf',
      methodABI: {
        constant: true,
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      params: ['0x8c76887d2e738371bd750362fb55887343472346'],
    })
    console.log(result)
    expect(result).not.toBeNull()
  })

  it('should test write smart contract method invocation', async () => {
    const result = await sendSmartContractMethodInvocationTransaction(true, {
      fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
      contractAddress: '0xd7d3e5e2174b530fdfb6d680c07c8b34495e2195',
      fee: { gasLimit: '40000', gasPrice: '200' },
      methodName: 'transferFrom',
      methodABI: {
        constant: false,
        inputs: [
          {
            name: 'from',
            type: 'address',
          },
          {
            name: 'to',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      params: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x8c76887d2e738371bd750362fb55887343472346', '1'],
    })
    console.log(result)
    expect(result).not.toBeNull()
  })
});
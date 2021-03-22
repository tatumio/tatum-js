// import {CeloProvider} from '@celo-tools/celo-ethers-wrapper';
import {
    BurnCeloErc20,
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    Currency,
    DeployCeloErc20,
    MintCeloErc20,
    TransferCeloOrCeloErc20Token,
} from '../model';
import {
    prepareCeloBurnErc20SignedTransaction,
    prepareCeloBurnErc721SignedTransaction,
    prepareCeloDeployErc20SignedTransaction,
    prepareCeloDeployErc721SignedTransaction,
    prepareCeloMintErc20SignedTransaction,
    prepareCeloMintErc721SignedTransaction,
    prepareCeloMintMultipleErc721SignedTransaction,
    prepareCeloOrCUsdSignedTransaction,
    prepareCeloTransferErc20SignedTransaction,
    prepareCeloTransferErc721SignedTransaction,
    signCeloKMSTransaction
} from './celo';

describe('CELO transactions', () => {
    jest.setTimeout(9999);
    it('should test valid transaction CELO', async () => {
        const body = new TransferCeloOrCeloErc20Token();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '1';
        body.currency = Currency.CELO;
        body.feeCurrency = Currency.CUSD;
        body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a';
        const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid transaction CELO decimal places', async () => {
        const body = new TransferCeloOrCeloErc20Token();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0.01';
        body.currency = Currency.CELO;
        body.feeCurrency = Currency.CUSD;
        body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a';
        const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid transaction CUSD decimal places', async () => {
        const body = new TransferCeloOrCeloErc20Token();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0.01';
        body.currency = Currency.CUSD;
        body.feeCurrency = Currency.CUSD;
        body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a';
        const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid transaction CUSD', async () => {
        const body = new TransferCeloOrCeloErc20Token();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '1';
        body.currency = Currency.CUSD;
        body.feeCurrency = Currency.CUSD;
        body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a';
        const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    // ERC-721
    it('should test valid deploy 721 transaction', async () => {
        const body = new CeloDeployErc721();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.chain = Currency.CELO;
        body.name = 'Tatum';
        body.symbol = 'TTM';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloDeployErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid mint 721 transaction', async () => {
        const body = new CeloMintErc721();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.chain = Currency.CELO;
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        body.contractAddress = '0xD0E0eF0C388ef42B4cD17De41431232ACF3b5b79';
        body.tokenId = '3';
        body.url = 'https://google.com';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloMintErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid mint multiple 721 transaction', async () => {
        const body = new CeloMintMultipleErc721();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.chain = Currency.CELO;
        body.to = ['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea', '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'];
        body.contractAddress = '0xD0E0eF0C388ef42B4cD17De41431232ACF3b5b79';
        body.tokenId = ['4', '5'];
        body.url = ['https://google.com', 'https://google.com'];
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloMintMultipleErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid burn 721 transaction', async () => {
        const body = new CeloBurnErc721();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.chain = Currency.CELO;
        body.contractAddress = '0xD0E0eF0C388ef42B4cD17De41431232ACF3b5b79';
        body.tokenId = '3';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloBurnErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid deploy 721 transaction KMS', async () => {
        const body = new CeloDeployErc721();
        body.signatureId = '98efa59a-8f44-49d7-a6df-5d7fcc556c51';
        body.name = 'Tatum';
        body.symbol = 'TTM';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloDeployErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');
    });

    it('should test valid transfer 721 transaction', async () => {
        const body = new CeloTransferErc721();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.chain = Currency.CELO;
        body.contractAddress = '0xD0E0eF0C388ef42B4cD17De41431232ACF3b5b79';
        body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a';
        body.tokenId = '5';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloTransferErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    // ERC-20
    it('should test valid deploy 20 transaction', async () => {
        const body = new DeployCeloErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.name = 'Tatum';
        body.symbol = 'TTM';
        body.address = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        body.digits = 10;
        body.supply = '100';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloDeployErc20SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid mint 20 transaction', async () => {
        const body = new MintCeloErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        body.contractAddress = '0xB7205685AABeB4092EBBa67Ed0443Af807AaC282';
        body.amount = '5';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloMintErc20SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid burn 20 transaction', async () => {
        const body = new BurnCeloErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.contractAddress = '0xB7205685AABeB4092EBBa67Ed0443Af807AaC282';
        body.amount = '5';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloBurnErc20SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid transfer 20 transaction', async () => {
        const body = new TransferCeloOrCeloErc20Token();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.contractAddress = '0xB7205685AABeB4092EBBa67Ed0443Af807AaC282';
        body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a';
        body.amount = '5';
        body.feeCurrency = Currency.CUSD;
        const txData = await prepareCeloTransferErc20SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });

    it('should test valid transfer 20 transaction to sign from KMS', async () => {
        const tx = {
            chain: Currency.CELO,
            serializedTransaction: '{"chainId":44787,"feeCurrency":"0x874069fa1eb16d44d622f2e0ca25eea172369bc1","to":"0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a","gasLimit":"0","value":"0x13fbe85edc90000"}',
            hashes: [
                '98efa59a-8f44-49d7-a6df-5d7fcc556c51'
            ],
            id: '604a1ebc70760dadfdeb7f42'
        };
        const txData = await signCeloKMSTransaction(tx, '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb', true, 'https://alfajores-forno.celo-testnet.org');
        expect(txData).toContain('0x');

        // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
        // await provider.ready;
        // console.log(await provider.sendTransaction(txData));
    });
});

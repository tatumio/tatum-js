import {bscGetCurrentBlock, celoGetCurrentBlock, polygonGetCurrentBlock} from '../../blockchain';
import {auction} from '../../contracts/marketplace';
import {ApproveErc20, CeloMintErc721, CreateAuction, Currency, DeployNftAuction, InvokeAuctionOperation, MintErc721, SmartContractReadMethodInvocation} from '../../model';
import {
    sendBscSmartContractMethodInvocationTransaction,
    sendBscSmartContractReadMethodInvocationTransaction,
    sendCeloSmartContractReadMethodInvocationTransaction
} from '../../transaction';
import {mintNFTWithUri} from '../nft';
import {deployAuction,
    existsAuction, sendAuctionApproveErc20Transfer, sendAuctionApproveNftTransfer, sendAuctionBid, sendAuctionCreate, sendAuctionSettle} from './auction';

const sleep = async (time = 7000) => new Promise(r => setTimeout(r, time));

describe('Auction  tests', () => {
    jest.setTimeout(99999);
    describe('Auction  CELO transactions', () => {

        const tokenId = `${Date.now()}`;

        it('should deploy auction', async () => {
            const body = new DeployNftAuction();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.feeRecipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.auctionFee = 150;
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            const test = await deployAuction(true, body, 'https://alfajores-forno.celo-testnet.org');
            console.log(test);
            expect(test).toBeDefined();
        });

        it('should not deploy auction - wrong validation', async () => {
            const body = new DeployNftAuction();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.feeRecipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.auctionFee = 150.1;
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            await deployAuction(true, body, 'https://alfajores-forno.celo-testnet.org');
        });

        it('should not create auction - wrong validation', async () => {
            const body = new CreateAuction();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.amount = '0.2';
            body.nftAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            body.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            body.endedAt = 123456789;
            body.tokenId = tokenId;
            body.id = tokenId;
            body.isErc721 = false;
            body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            await sendAuctionCreate(true, body, 'https://alfajores-forno.celo-testnet.org');
        });

        it('should create auction native asset', async () => {

            const mint = new CeloMintErc721();
            mint.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            mint.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            mint.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            mint.tokenId = tokenId;
            mint.url = 'https://google.com';
            mint.feeCurrency = Currency.CUSD;
            mint.chain = Currency.CELO;
            console.log(await mintNFTWithUri(true, mint, 'https://alfajores-forno.celo-testnet.org'));

            await sleep();
            console.log(await sendAuctionApproveNftTransfer(true, {
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                chain: Currency.CELO, contractAddress: '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD',
                isErc721: true, spender: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038', tokenId
            }, 'https://alfajores-forno.celo-testnet.org'));

            await sleep();
            const endedAt = (await celoGetCurrentBlock()) + 9;
            const body = new CreateAuction();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            body.nftAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            body.endedAt = endedAt;
            body.tokenId = tokenId;
            body.id = tokenId;
            body.isErc721 = true;
            body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            console.log(await sendAuctionCreate(true, body, 'https://alfajores-forno.celo-testnet.org'));

            await sleep();
            const bid = new InvokeAuctionOperation();
            bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            bid.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            bid.id = tokenId;
            bid.bidValue = '0.001015';
            bid.feeCurrency = Currency.CELO;
            bid.chain = Currency.CELO;
            console.log(await sendAuctionBid(true, bid, 'https://alfajores-forno.celo-testnet.org'));

            await sleep(35000);
            const settle = new InvokeAuctionOperation();
            settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            settle.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            settle.id = tokenId;
            settle.feeCurrency = Currency.CUSD;
            settle.chain = Currency.CELO;
            console.log(await sendAuctionSettle(true, settle, 'https://alfajores-forno.celo-testnet.org'));
        });

        it('should create auction erc20 asset', async () => {
            const mint = new CeloMintErc721();
            mint.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            mint.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            mint.contractAddress = '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3';
            mint.tokenId = tokenId;
            mint.url = 'https://google.com';
            mint.feeCurrency = Currency.CUSD;
            mint.chain = Currency.CELO;
            console.log(await mintNFTWithUri(true, mint, 'https://alfajores-forno.celo-testnet.org'));

            await sleep();
            console.log(await sendAuctionApproveNftTransfer(true, {
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                chain: Currency.CELO, contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
                isErc721: true, spender: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038', tokenId
            }, 'https://alfajores-forno.celo-testnet.org'));

            await sleep();
            const endedAt = (await celoGetCurrentBlock()) + 7;
            const body = new CreateAuction();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            body.nftAddress = '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3';
            body.tokenId = tokenId;
            body.id = `${tokenId}1`;
            body.endedAt = endedAt;
            body.isErc721 = true;
            body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.erc20Address = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            console.log(await sendAuctionCreate(true, body, 'https://alfajores-forno.celo-testnet.org'));

            const approve = new ApproveErc20();
            approve.contractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';
            approve.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            approve.chain = Currency.CELO;
            approve.feeCurrency = Currency.CELO;
            approve.amount = '0.001015';
            approve.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            approve.fee = {gasPrice: '5', gasLimit: '300000'};
            console.log(await sendAuctionApproveErc20Transfer(true, approve, 'https://alfajores-forno.celo-testnet.org'));

            await sleep();
            const bid = new InvokeAuctionOperation();
            bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            bid.contractAddress = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            bid.id = `${tokenId}1`;
            bid.bidValue = '0.001015';
            bid.feeCurrency = Currency.CELO;
            bid.chain = Currency.CELO;
            bid.fee = {gasPrice: '5', gasLimit: '300000'};
            console.log(await sendAuctionBid(true, bid, 'https://alfajores-forno.celo-testnet.org'));

            await sleep(20000);
            const settle = new InvokeAuctionOperation();
            settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            settle.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            settle.id = tokenId;
            settle.feeCurrency = Currency.CUSD;
            settle.chain = Currency.CELO;
            console.log(await sendAuctionSettle(true, settle, 'https://alfajores-forno.celo-testnet.org'));
        });

        it('should get auction', async () => {
            const r = new SmartContractReadMethodInvocation();
            r.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            r.methodName = 'get';
            r.methodABI = auction.abi.find((a: any) => a.name === r.methodName);
            r.params = [tokenId];
            console.log(await sendCeloSmartContractReadMethodInvocationTransaction(true, r, 'https://alfajores-forno.celo-testnet.org'));
        });

        it('should get auction fee', async () => {
            const r = new SmartContractReadMethodInvocation();
            r.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            r.methodName = 'getAuctionFee';
            r.methodABI = auction.abi.find((a: any) => a.name === r.methodName);
            r.params = [];
            console.log(await sendCeloSmartContractReadMethodInvocationTransaction(true, r, 'https://alfajores-forno.celo-testnet.org'));
        });
    });

    describe('Auction  BSC transactions', () => {
        const tokenId = `${Date.now()}`;

        it('should deploy auction', async () => {
            const body = new DeployNftAuction();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            body.feeRecipient = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9';
            body.auctionFee = 150;
            body.chain = Currency.BSC;
            const test = await deployAuction(true, body, 'https://data-seed-prebsc-2-s1.binance.org:8545');
            console.log(test);
            expect(test).toBeDefined();
        });

        it('should create auction native asset', async () => {

            const mint = new MintErc721();
            mint.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
            mint.to = '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2';
            mint.contractAddress = '0xada3e67deae341f16b44f67687866d2560d79ec8';
            mint.tokenId = tokenId;
            mint.url = 'https://google.com';
            mint.chain = Currency.BSC;
            console.log(await mintNFTWithUri(true, mint, 'https://data-seed-prebsc-2-s1.binance.org:8545'));

            await sleep();
            console.log(await sendAuctionApproveNftTransfer(true, {
                fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
                chain: Currency.BSC, contractAddress: '0xada3e67deae341f16b44f67687866d2560d79ec8',
                isErc721: true, spender: '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad', tokenId
            }, 'https://data-seed-prebsc-2-s1.binance.org:8545'));

            await sleep();
            const body = new CreateAuction();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            body.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad';
            body.nftAddress = '0xada3e67deae341f16b44f67687866d2560d79ec8';
            body.tokenId = tokenId;
            body.endedAt = (await bscGetCurrentBlock()) + 9;
            body.id = tokenId;
            body.isErc721 = true;
            body.seller = '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2';
            body.chain = Currency.BSC;
            console.log(await sendAuctionCreate(true, body, 'https://data-seed-prebsc-2-s1.binance.org:8545'));

            await sleep(10000);
            const bid = new InvokeAuctionOperation();
            bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            bid.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad';
            bid.id = tokenId;
            bid.bidValue = '0.001015';
            bid.chain = Currency.BSC;
            console.log(await sendAuctionBid(true, bid, 'https://data-seed-prebsc-2-s1.binance.org:8545'));

            await sleep(15000);
            const settle = new InvokeAuctionOperation();
            settle.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            settle.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad';
            settle.id = tokenId;
            settle.chain = Currency.BSC;
            console.log(await sendAuctionSettle(true, settle, 'https://data-seed-prebsc-2-s1.binance.org:8545'));
        });

        it('should get auction', async () => {
            const r = new SmartContractReadMethodInvocation();
            r.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad';
            r.methodName = 'getAuction';
            r.methodABI = auction.abi.find((a: any) => a.name === r.methodName);
            r.params = ['1630313952428'];
            console.log(await sendBscSmartContractMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'));
        });

        it('should get auction fee', async () => {
            const r = new SmartContractReadMethodInvocation();
            r.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad';
            r.methodName = 'getAuctionFee';
            r.methodABI = auction.abi.find((a: any) => a.name === r.methodName);
            r.params = [];
            console.log(await sendBscSmartContractReadMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'));
        });

    });

    describe('Auction  MATIC transactions', () => {

        const tokenId = `${Date.now()}`;

        it('should deploy auction', async () => {
            const body = new DeployNftAuction();
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
            body.feeRecipient = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9';
            body.auctionFee = 150;
            body.chain = Currency.MATIC;
            const test = await deployAuction(true, body, 'https://rpc-amoy.maticvigil.com');
            console.log(test);
            expect(test).toBeDefined();
        });

        it('should create auction native asset', async () => {

            const mint = new MintErc721();
            mint.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            mint.to = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9';
            mint.contractAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a';
            mint.tokenId = tokenId;
            mint.url = 'https://google.com';
            mint.chain = Currency.MATIC;
            console.log(await mintNFTWithUri(true, mint, 'https://rpc-amoy.maticvigil.com'));

            await sleep();
            console.log(await sendAuctionApproveNftTransfer(true, {
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.MATIC, contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
                isErc721: true, spender: '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073', tokenId
            }, 'https://rpc-amoy.maticvigil.com'));

            await sleep();
            const body = new CreateAuction();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            body.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073';
            body.nftAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a';
            body.tokenId = tokenId;
            body.endedAt = (await polygonGetCurrentBlock()) + 12;
            body.id = tokenId;
            body.isErc721 = true;
            body.seller = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9';
            body.chain = Currency.MATIC;
            console.log(await sendAuctionCreate(true, body, 'https://rpc-amoy.maticvigil.com'));

            await sleep(2000);
            const bid = new InvokeAuctionOperation();
            bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            bid.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073';
            bid.id = tokenId;
            bid.bidValue = '0.001015';
            bid.chain = Currency.MATIC;
            console.log(await sendAuctionBid(true, bid, 'https://rpc-amoy.maticvigil.com'));

            await sleep(20000);
            const settle = new InvokeAuctionOperation();
            settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            settle.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073';
            settle.id = tokenId;
            settle.chain = Currency.MATIC;
            console.log(await sendAuctionSettle(true, settle, 'https://rpc-amoy.maticvigil.com'));
        });

        it('should create auction ERC20 asset', async () => {

            const approve = new ApproveErc20();
            approve.contractAddress = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb';
            approve.spender = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073';
            approve.chain = Currency.MATIC;
            approve.amount = '0.001015';
            approve.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            console.log(await sendAuctionApproveErc20Transfer(true, approve, 'https://rpc-amoy.maticvigil.com'));

            const mint = new MintErc721();
            mint.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            mint.to = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9';
            mint.contractAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a';
            mint.tokenId = tokenId;
            mint.url = 'https://google.com';
            mint.chain = Currency.MATIC;
            console.log(await mintNFTWithUri(true, mint, 'https://rpc-amoy.maticvigil.com'));

            await sleep();
            console.log(await sendAuctionApproveNftTransfer(true, {
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.MATIC, contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
                isErc721: true, spender: '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073', tokenId
            }, 'https://rpc-amoy.maticvigil.com'));

            await sleep();
            const body = new CreateAuction();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            body.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073';
            body.nftAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a';
            body.tokenId = tokenId;
            body.endedAt = (await polygonGetCurrentBlock()) + 10;
            body.id = tokenId;
            body.isErc721 = true;
            body.erc20Address = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb';
            body.seller = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9';
            body.chain = Currency.MATIC;
            console.log(await sendAuctionCreate(true, body, 'https://rpc-amoy.maticvigil.com'));

            await sleep(2000);
            const bid = new InvokeAuctionOperation();
            bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            bid.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073';
            bid.id = tokenId;
            bid.bidValue = '0.001015';
            bid.chain = Currency.MATIC;
            bid.fee = {
                gasLimit: '300000',
                gasPrice: '5'
            };
            console.log(await sendAuctionBid(true, bid, 'https://rpc-amoy.maticvigil.com'));

            await sleep(20000);
            const settle = new InvokeAuctionOperation();
            settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            settle.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073';
            settle.id = tokenId;
            settle.chain = Currency.MATIC;
            console.log(await sendAuctionSettle(true, settle, 'https://rpc-amoy.maticvigil.com'));
        });
    });

    describe('Exists', () => {
        it('true', async () => {
            const result = await existsAuction(true, Currency.CELO, '1', '0x9788B3e257ACDA8E772f111D8A70984390181b23', 'https://alfajores-forno.celo-testnet.org');
            expect(result).toEqual(true);
        });

        it('false', async () => {
            const result = await existsAuction(true, Currency.CELO, '19595', '0x9788B3e257ACDA8E772f111D8A70984390181b23', 'https://alfajores-forno.celo-testnet.org');
            expect(result).toEqual(false);
        });
    });

});

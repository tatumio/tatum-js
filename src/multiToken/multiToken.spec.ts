import { CeloBurnMultiToken } from '../model/request/CeloBurnMultiToken';
import { CeloBurnMultiTokenBatch } from '../model/request/CeloBurnMultiTokenBatch';
import { CeloDeployMultiToken } from '../model/request/CeloDeployMultiToken';
import { updateCashbackForAuthorMultiToken } from './index';
import { Currency } from '../model';
import {
    mintMultiToken,
    deployMultiToken,
    mintMultiTokenBatch,
    transferMultiToken,
    transferMultiTokenBatch,
    burnMultiToken,
    burnMultiTokenBatch
} from './index';
describe('NFT tests', () => {
    jest.setTimeout(99999);
    describe('NFT MultiToken transactions', () => {
        it('should test eth 1155 deploy transaction', async () => {
            const deployMultiTokenToken = await deployMultiToken(true, {
                chain: Currency.ETH,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                uri: 'tatum',
            });
            expect(deployMultiTokenToken).not.toBeNull();
            console.log('response::', deployMultiTokenToken);
        });
        it('should test eth 1155 mint transaction', async () => {
            const tokenId = '1';
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.ETH,
                tokenId,
                data: '0x1234',
                amount: '1000',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xd21734ba890fac2dc13551dc4a16e330e5580131'
            });
            console.log(tokenId);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 1155 mint transaction', async () => {
            const tokenId = '2';
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.ETH,
                tokenId,
                data: '0x1234',
                amount: '1000',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xd21734ba890fac2dc13551dc4a16e330e5580131'
            });
            console.log(tokenId);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
                chain: Currency.ETH,
                tokenId: ['1', '2'],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xd21734ba890fac2dc13551dc4a16e330e5580131',
                amounts: ['10', '10'],
                data: '0x1234',
                value: '2',
                fee: {
                    gasLimit: '7000000',
                    gasPrice: '100'
                },
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
        it('should test eth 1155 mint transaction', async () => {
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.ETH,
                tokenId: '121002',
                data: '0x1234',
                amount: '1000',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                authorAddresses: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
                cashbackValues: ['1'],
                contractAddress: '0x683f445d08d05a389368c0c646106a1599f12370'
            });
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 1155 burn transaction', async () => {
            const burnMultiTokenToken = await burnMultiToken(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: '121002',
                amount: '1',
                chain: Currency.ETH,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x683f445d08d05a389368c0c646106a1599f12370'
            });
            expect(burnMultiTokenToken).not.toBeNull();
        });
        it('should test eth 1155 burn batch transaction', async () => {
            const burnMultiTokenToken = await burnMultiTokenBatch(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: ['121002', '121001', '121000'],
                amounts: ['1', '1', '1'],
                chain: Currency.ETH,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x683f445d08d05a389368c0c646106a1599f12370',

            });
            expect(burnMultiTokenToken).not.toBeNull();
        });
        it('should test eth 1155 mint batch transaction', async () => {
            const time = new Date().getTime().toString();
            const tokenId = [['12101', '12102']]
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
                chain: Currency.ETH,
                tokenId,
                data: '0x1234',
                amounts: [['100', '100']],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x683f445d08d05a389368c0c646106a1599f12370'
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 1155 mint batch cashback transaction', async () => {
            const time = new Date().getTime().toString();
            const tokenId = [[time, time + 1], [time, time + 1]]
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x9115849471F177938A98607D0BE51128Db666775'],
                chain: Currency.ETH,
                tokenId,
                data: '0x1234',
                amounts: [['10', '10'], ['10', '10']],
                authorAddresses: [[["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"], ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"]], [["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"], ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"]]],
                cashbackValues: [[["1", "1"], ["1", "1"]], [["1", "1"], ["1", "1"]]],
                fromPrivateKey: '0x15ce11f309a5c467959eadf365584c5b2570e4b10b0776b02465cf212dd54993',
                contractAddress: '0xBbd2c69d4c8Ca2CE120039c80509719Acf86E290'
            });
            console.log(tokenId);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 1155 send transaction', async () => {
            const sendMultiTokenToken = await transferMultiToken(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.ETH,
                tokenId: '121002',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x683f445d08d05a389368c0c646106a1599f12370',
                amount: '2',
                data: '0x1234',
                value: '2'
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
        it('should test eth 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.ETH,
                tokenId: ['121000', '121001'],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x683f445d08d05a389368c0c646106a1599f12370',
                amounts: ['1', '1'],
                data: '0x1234',
                value: '4'
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
    });
    describe('NFT BSC1155 transactions', () => {
        it('should test eth 1155 deploy transaction', async () => {
            const deployMultiTokenToken = await deployMultiToken(true, {
                chain: Currency.BSC,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                uri: 'tatum',
            });
            expect(deployMultiTokenToken).not.toBeNull();
            console.log('response::', deployMultiTokenToken);
        });
        it('should test BSC 1155 mint transaction', async () => {
            const tokenId = new Date().getTime().toString();
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.BSC,
                tokenId: '1',
                data: '0x1234',
                amount: '100',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xd21734ba890fac2dc13551dc4a16e330e5580131',
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });
        it('should test bsc 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
                chain: Currency.BSC,
                tokenId: ['101', '2', '101', '103'],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xd21734ba890fac2dc13551dc4a16e330e5580131',
                amounts: ['10', '10', '10', '10'],
                data: '0x1234',
                value: '6'
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
        it('should test BSC 1155 mint cashback transaction', async () => {
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.BSC,
                tokenId: '103',
                data: '0x1234',
                amount: '100',
                authorAddresses: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
                cashbackValues: ['1', '1'],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x4430c7a883827c003613a9ee852996231af1ed2b'
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });
        it('should test BSC 1155 mint cashback transaction', async () => {
            const mintedToken = await updateCashbackForAuthorMultiToken(true, {
                author: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.BSC,
                tokenId: '103',
                cashbackValue: '2',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x4430c7a883827c003613a9ee852996231af1ed2b'
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });

        it('should test eth 1155 mint batch transaction', async () => {
            const time = new Date().getTime().toString();
            const tokenId = [['1', '2'], ['3', '4']]
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x48d4bA7B2698A4b89635b9a2E391152350DB740f', '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'],
                chain: Currency.BSC,
                tokenId,
                data: '0x1234',
                amounts: [['1', '2'], ['1', '2']],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x8a5c9bd33e506f6bcf6a5bccbec2b8b8fe729f36',
                fee: {
                    gasLimit: '5000000',
                    gasPrice: '100'
                },
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });
        it('should test bsc 1155 mint batch cashback transaction', async () => {
            const time = new Date().getTime().toString();
            const tokenId = [['1', '2'], ['3', '4']]
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
                chain: Currency.BSC,
                tokenId,
                data: '0x1234',
                amounts: [['10', '10'], ['10', '10']],
                authorAddresses: [[["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"], ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"]], [["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"], ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"]]],
                cashbackValues: [[["1", "1"], ["1", "1"]], [["1", "1"], ["1", "1"]]],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x8a5c9bd33e506f6bcf6a5bccbec2b8b8fe729f36'
            });
            console.log(tokenId);
            expect(mintedToken).not.toBeNull();
        });
        it('should test bsc 1155 burn transaction', async () => {
            const burnMultiTokenToken = await burnMultiToken(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: '101',
                amount: '1',
                chain: Currency.BSC,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x8a5c9bd33e506f6bcf6a5bccbec2b8b8fe729f36'
            });
            console.log(burnMultiTokenToken)
            expect(burnMultiTokenToken).not.toBeNull();
        });
        it('should test bsc 1155 burn batch transaction', async () => {
            const burnMultiTokenToken = await burnMultiTokenBatch(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: ['1', '2'],
                amounts: ['1', '1'],
                chain: Currency.BSC,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x8a5c9bd33e506f6bcf6a5bccbec2b8b8fe729f36',
            });
            console.log(burnMultiTokenToken)
            expect(burnMultiTokenToken).not.toBeNull();
        });
        it('should test eth 1155 send transaction', async () => {
            const sendMultiTokenToken = await transferMultiToken(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.BSC,
                tokenId: '1',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x8a5c9bd33e506f6bcf6a5bccbec2b8b8fe729f36',
                amount: '1',
                data: '0x1234',
                value: '2'
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
        it('should test eth 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.BSC,
                tokenId: ['118', '119'],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x6a389e780eda77be548990898169b56865ba4442',
                amounts: ['1', '1'],
                data: '0x1234',
                value: '5',
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
    });
    describe('NFT CELO1155 transactions', () => {
        it('should test valid deploy 1155 transaction', async () => {
            const body = new CeloDeployMultiToken();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.uri = 'Tatum';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            const test = await deployMultiToken(true, body, 'https://alfajores-forno.celo-testnet.org')
            console.log(test)
            expect(test).toBeDefined();
        });
        it('should test celo 1155 mint transaction with cashback', async () => {
            const mintedTokens = await mintMultiToken(true, {
                to: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
                chain: Currency.CELO,
                tokenId: '2',
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0xa26Aeef704fCBF8429cb31B90e83579B10D39e89',
                authorAddresses: ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
                cashbackValues: ['0.25', '0.25'],

                data: '0x1234',
                amount: '10',
                feeCurrency: Currency.CUSD
            });
            console.log(mintedTokens);
            expect(mintedTokens).not.toBeNull();
        });
        it('should test celo 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.CELO,
                tokenId: ['1', '2'],
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0xa26Aeef704fCBF8429cb31B90e83579B10D39e89',
                amounts: ['1', '1'],
                data: '0x1234',
                value: '5',
                feeCurrency: Currency.CUSD
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
        it('should test valid burn 1155 transaction', async () => {
            const body = new CeloBurnMultiToken();
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            body.contractAddress = '0x771987a5Add0eF1CE303AA069DF82Dd7F8fBB33B';
            body.account = '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342';
            body.tokenId = '1';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            body.amount = '1';

            expect(await burnMultiToken(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });
        it('should test valid burn batch 1155 transaction', async () => {
            const body = new CeloBurnMultiTokenBatch();
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            body.contractAddress = '0x771987a5Add0eF1CE303AA069DF82Dd7F8fBB33B';
            body.account = '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342';
            body.tokenId = ['1'];
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            body.amounts = ['1'];

            expect(await burnMultiTokenBatch(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });
        it('should test celo 1155 mint transaction', async () => {
            const mintedTokens = await mintMultiToken(true, {
                to: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
                chain: Currency.CELO,
                tokenId: '12102',
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x771987a5Add0eF1CE303AA069DF82Dd7F8fBB33B',
                fee: { gasLimit: '6000000', gasPrice: '100' },
                data: '0x1234',
                amount: '10',
                feeCurrency: Currency.CUSD
            });
            console.log(mintedTokens);
            expect(mintedTokens).not.toBeNull();
        });
        it('should test CELO MultiToken mint batch transaction', async () => {
            const tokenId = [['12101', '12102']]
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x48d4bA7B2698A4b89635b9a2E391152350DB740f'],
                chain: Currency.CELO,
                tokenId,
                data: '0x1234',
                amounts: [['200', '200']],
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x771987a5Add0eF1CE303AA069DF82Dd7F8fBB33B',
                feeCurrency: Currency.CUSD
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });
        it('should test CELO MultiToken mint batch cashback transaction', async () => {
            const time = new Date().getTime().toString();
            const tokenId = [['1', '1'], ['3', '4']]
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
                chain: Currency.CELO,
                tokenId,
                data: '0x1234',
                amounts: [['100', '100'], ['100', '100']],
                authorAddresses: [[["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"], ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"]], [["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"], ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "0x687422eEA2cB73B5d3e242bA5456b782919AFc85"]]],
                cashbackValues: [[["1", "1"], ["1", "1"]], [["1", "1"], ["1", "1"]]],
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x771987a5Add0eF1CE303AA069DF82Dd7F8fBB33B',
                feeCurrency: Currency.CUSD
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 1155 send transaction', async () => {
            const sendMultiTokenToken = await transferMultiToken(true, {
                to: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
                chain: Currency.CELO,
                tokenId: '12101',
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x771987a5Add0eF1CE303AA069DF82Dd7F8fBB33B',
                amount: '1',
                feeCurrency: Currency.CUSD,
                data: '0x1234',
                value: '2'
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
        it('should test eth 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x28A16e2EF5e36a4eE559B52cE45E27831B15fd71',
                chain: Currency.CELO,
                tokenId: ['12101', '12102'],
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x771987a5Add0eF1CE303AA069DF82Dd7F8fBB33B',
                amounts: ['1', '1'],
                feeCurrency: Currency.CUSD,
                data: '0x1234',
                value: '2',
            });
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull();
        });
    });

});
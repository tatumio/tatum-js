import dedent from 'dedent-js';
import {Currency, FlowBurnNft, FlowMintMultipleNft, FlowMintNft, FlowTransferNft, TransferFlow, TransferFlowCustomTx} from '../model';
import {
    flowAddPublicKeyToAccount,
    flowCreateAccountFromPublicKey,
    flowSendCustomTransaction,
    flowSendTransaction,
    getFlowNftMetadata,
    getFlowNftTokenByAddress,
    getFlowSigner,
    sendFlowNftBurnToken,
    sendFlowNftMintMultipleToken,
    sendFlowNftMintToken
} from './flow';

describe('Flow tests', () => {

    jest.setTimeout(199999);

    it('should create account from public key', async () => {
        const result = await flowCreateAccountFromPublicKey(true, '968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90', '0x955cd3f17b2fd8ad', '37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8');
        console.log(result);
        expect(result.address).toBeDefined();
        expect(result.txId).toBeDefined();
    })

    it('should add public key to account', async () => {
        const result = await flowAddPublicKeyToAccount(true, '968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90', '0x955cd3f17b2fd8ad', '37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8');
        console.log(result);
        expect(result.address).toBe('0x955cd3f17b2fd8ad');
        expect(result.txId).toBeDefined();
    });

    it('should send FLOW transaction', async () => {
        const body = new TransferFlow();
        body.to = '0x21cbd745a4df66f1';
        body.amount = '0.001';
        body.account = '0x4f09d8d43e4967b7';
        body.privateKey = '44179e42e147b391d3deb8a7a160b9490941cd7292936e6cc7277166a99ef058';
        body.currency = Currency.FLOW;
        const result = await flowSendTransaction(true, body,
            () => getFlowSigner('44179e42e147b391d3deb8a7a160b9490941cd7292936e6cc7277166a99ef058', '0x4f09d8d43e4967b7', 0).signer,
            () => getFlowSigner('44179e42e147b391d3deb8a7a160b9490941cd7292936e6cc7277166a99ef058', '0x4f09d8d43e4967b7').signer);
        expect(result.txId).toBeDefined();
        console.log(result);
    });

    it('should send FLOW API signer transaction', async () => {
        const body = new TransferFlow();
        body.to = '0x21cbd745a4df66f1';
        body.amount = '0.001';
        body.account = '0x4f09d8d43e4967b7';
        body.privateKey = '44179e42e147b391d3deb8a7a160b9490941cd7292936e6cc7277166a99ef058';
        body.currency = Currency.FLOW;
        const result = await flowSendTransaction(true, body);
        expect(result.txId).toBeDefined();
        console.log(result);
    });

    it('should mint NFT FLOW API signer transaction', async () => {
        const body = new FlowMintNft();
        body.to = '0x10247089e55180c9';
        body.contractAddress = '2d103773-50e2-4a37-ac3d-61bc6af8faee';
        body.url = 'url';
        body.account = '0x10247089e55180c9';
        body.privateKey = '3881849dd540a0c80383c3727951d35e3e9e8c238ec82a581726c3fc2ca17bc4';
        body.chain = Currency.FLOW;
        const result = await sendFlowNftMintToken(true, body);
        expect(result.txId).toBeDefined();
        console.log(result);
    });

    it('should burn NFT FLOW API signer transaction', async () => {
        const body = new FlowBurnNft();
        body.tokenId = '196';
        body.contractAddress = '2d103773-50e2-4a37-ac3d-61bc6af8faee';
        body.account = '0x10247089e55180c9';
        body.privateKey = '3881849dd540a0c80383c3727951d35e3e9e8c238ec82a581726c3fc2ca17bc4';
        body.chain = Currency.FLOW;
        const result = await sendFlowNftBurnToken(true, body);
        expect(result.txId).toBeDefined();
        console.log(result);
    });

    it('should transfer NFT FLOW API signer transaction', async () => {
        const body = new FlowTransferNft();
        body.tokenId = '199';
        body.contractAddress = '2d103773-50e2-4a37-ac3d-61bc6af8faee';
        body.account = '0x10247089e55180c9';
        body.privateKey = '3881849dd540a0c80383c3727951d35e3e9e8c238ec82a581726c3fc2ca17bc4';
        body.chain = Currency.FLOW;
        const result = await sendFlowNftBurnToken(true, body);
        expect(result.txId).toBeDefined();
        console.log(result);
    });

    it('should mint multiple NFT FLOW API signer transaction', async () => {
        const body = new FlowMintMultipleNft();
        body.to = ['0x10247089e55180c9'];
        body.contractAddress = '2d103773-50e2-4a37-ac3d-61bc6af8faee';
        body.url = ['url'];
        body.account = '0x10247089e55180c9';
        body.privateKey = '3881849dd540a0c80383c3727951d35e3e9e8c238ec82a581726c3fc2ca17bc4';
        body.chain = Currency.FLOW;
        const result = await sendFlowNftMintMultipleToken(true, body);
        expect(result.txId).toBeDefined();
        console.log(result);
    });

    it('should send FLOW custom transaction', async () => {
        const body = new TransferFlowCustomTx();
        body.transaction = dedent`transaction() {
    prepare(signer: AuthAccount) {
      signer.addPublicKey("f845b840181369ec8500ddc70252c0825fba8c2914cf9f778ed67fa103ebf7f665ffb37476ccbe17ecf4115de2710aca493be06c5f592a6686805be78d55640c4ec555b6030380".decodeHex())
    }}`;
        body.args = [];
        body.account = '0x955cd3f17b2fd8ad';
        body.privateKey = '37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8';
        const result = await flowSendCustomTransaction(true, body);
        console.log(result);
        expect(result.txId).toBeDefined();
    });

    it('should get NFT token by address', async () => {
        const result = await getFlowNftTokenByAddress(true, '0x2d0d7b39db4e3a08', '27320939-3087-490e-a65e-a53c8b06fcd9');
        expect(result).toBeDefined();
    });

    it('should get NFT token metadata', async () => {
        const result = await getFlowNftMetadata(true, '0x2d0d7b39db4e3a08', '8', '27320939-3087-490e-a65e-a53c8b06fcd9');
        expect(result).toBeDefined();
    });
});

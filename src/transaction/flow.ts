// @ts-ignore
import * as fcl from '@onflow/fcl';
// @ts-ignore
import * as sdk from '@onflow/sdk';
// @ts-ignore
import * as types from '@onflow/types';
// @ts-ignore
import {ECDSA_secp256k1, encodeKey, SHA3_256,} from '@onflow/util-encode-key';
import dedent from 'dedent-js';
import * as elliptic from 'elliptic';
import {SHA3} from 'sha3';
import {validateBody} from '../connector/tatum';
import {FLOW_MAINNET_ADDRESSES, FLOW_TESTNET_ADDRESSES} from '../constants';
import {Currency, TransactionKMS, TransferFlow} from '../model';
import {generatePrivateKeyFromMnemonic} from '../wallet';


export enum FlowTxType {
    CREATE_ACCOUNT,
    ADD_PK_TO_ACCOUNT,
    TRANSFER,
}

interface Account {
    addr?: string
}

interface AccountSignature {
    addr: string
    keyId: number
    signature: string
}

interface AccountAuthorization {
    tempId: string
    addr: string
    keyId: number
    signingFunction: (data: { message: string }) => AccountSignature
}


type Argument = {
    type: string
    value: string
}

type Transaction = {
    code: string
    args: Argument[]
    proposer: AccountAuthorizer
    authorizations: AccountAuthorizer[]
    payer: AccountAuthorizer
}

type TransactionResult = {
    id: string
    error: string
    events: { data: any }[]
}

type AccountAuthorizer = (
    account?: Account
) => Promise<AccountAuthorization>

const sign = (pk: string, msg: Buffer) => {
    const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(pk);
    const signature = keyPair.sign(new SHA3(256).update(msg).digest());
    const r = signature.r.toArrayLike(
        Buffer,
        'be',
        32
    );
    const s = signature.s.toArrayLike(
        Buffer,
        'be',
        32
    );

    return Buffer.concat([r, s]).toString('hex');
};

const getSigner = (
    pk: string,
    address: string,
): AccountAuthorizer => {
    return sdk.authorization(fcl.sansPrefix(address), (data: any) => ({
        addr: fcl.withPrefix(address),
        keyId: 0,
        signature: sign(pk, Buffer.from(data.message, 'hex')),
    }), 0);
};

const sendTransaction = async (testnet: boolean, {
    code,
    args,
    proposer,
    authorizations,
    payer,
}: Transaction): Promise<TransactionResult> => {
    fcl.config().put('accessNode.api', testnet ? 'https://access-testnet.onflow.org' : 'access.mainnet.nodes.onflow.org:9000');
    const response = await fcl.send([
        fcl.transaction(code),
        fcl.args(args.map(arg => fcl.arg(arg.value, types[arg.type]))),
        fcl.proposer(proposer),
        fcl.authorizations(authorizations),
        fcl.payer(payer),
        fcl.limit(1000),
    ]);

    const {transactionId} = response;
    const {error, events} = await fcl.tx(response).onceSealed();

    return {
        id: transactionId,
        error,
        events,
    };
};

const prepareCreateAccountWithFUSDFromPublicKey = (testnet: boolean) => {
    return dedent`
  import FungibleToken from ${testnet ? FLOW_TESTNET_ADDRESSES.FungibleToken : FLOW_MAINNET_ADDRESSES.FungibleToken}
  import FUSD from ${testnet ? FLOW_TESTNET_ADDRESSES.FUSD : FLOW_MAINNET_ADDRESSES.FUSD}
  transaction(publicKey: String) {
    let account: AuthAccount
    prepare(signer: AuthAccount) {
      self.account = AuthAccount(payer: signer)
    }
    execute {
      self.account.addPublicKey(publicKey.decodeHex())
      // Add FUSD vault
      self.account.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)
      self.account.link<&FUSD.Vault{FungibleToken.Receiver}>(
          /public/fusdReceiver,
          target: /storage/fusdVault
      )
      self.account.link<&FUSD.Vault{FungibleToken.Balance}>(
          /public/fusdBalance,
          target: /storage/fusdVault
      )
    }
  }
  `;
};

const prepareTransferFlow = (testnet: boolean, tokenAddress: string, tokenName: string, tokenStorage: string) => {
    return dedent`
  import FungibleToken from ${testnet ? FLOW_TESTNET_ADDRESSES.FungibleToken : FLOW_MAINNET_ADDRESSES.FungibleToken}
  import ${tokenName} from ${tokenAddress}

transaction(amount: UFix64, recipient: Address) {
  let sentVault: @FungibleToken.Vault
  prepare(signer: AuthAccount) {
    let vaultRef = signer.borrow<&${tokenName}.Vault>(from: /storage/${tokenStorage}Vault)
      ?? panic("failed to borrow reference to sender vault")

    self.sentVault <- vaultRef.withdraw(amount: amount)
  }

  execute {
    let receiverRef =  getAccount(recipient)
      .getCapability(/public/${tokenStorage}Receiver)
      .borrow<&{FungibleToken.Receiver}>()
        ?? panic("failed to borrow reference to recipient vault")

    receiverRef.deposit(from: <-self.sentVault)
  }
}`;
};

const prepareAddPublicKeyToAccount = () => {
    return `transaction(publicKey: String) {
prepare(signer: AuthAccount) {
signer.addPublicKey(publicKey.decodeHex())
}
}`;
};

export const flowSignKMSTransaction = async (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => {
    if (tx.chain !== Currency.FLOW) {
        throw Error('Unsupported chain.');
    }
    const {type, body}: { type: FlowTxType, body: any } = JSON.parse(tx.serializedTransaction);
    switch (type) {
        case FlowTxType.CREATE_ACCOUNT:
            return await flowCreateAccountFromPublicKey(testnet, body.publicKey, body.account, privateKeys[0]);
        case FlowTxType.ADD_PK_TO_ACCOUNT:
            return await flowAddPublicKeyToAccount(testnet, body.publicKey, body.account, privateKeys[0]);
        case FlowTxType.TRANSFER:
            return await flowSendTransaction(testnet, {...body, privateKey: privateKeys[0]});
    }
};

export const flowCreateAccountFromPublicKey = async (testnet: boolean, publicKey: string, signerAddress: string, signerPrivateKey: string):
    Promise<{ txId: string, address: string }> => {
    const code = prepareCreateAccountWithFUSDFromPublicKey(testnet);
    const encodedPublicKey = encodeKey(
        publicKey,
        ECDSA_secp256k1,
        SHA3_256,
        1000
    );
    const args = [{type: 'String', value: encodedPublicKey}];
    const auth = getSigner(signerPrivateKey, signerAddress);
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth});
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id, address: result.events[0].data.address};
};

export const flowAddPublicKeyToAccount = async (testnet: boolean, publicKey: string, signerAddress: string, signerPrivateKey: string):
    Promise<{ txId: string, address: string }> => {
    const code = prepareAddPublicKeyToAccount();
    const encodedPublicKey = encodeKey(
        publicKey,
        ECDSA_secp256k1,
        SHA3_256,
        1000
    );
    const args = [{type: 'String', value: encodedPublicKey}];
    const auth = getSigner(signerPrivateKey, signerAddress);
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth});
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id, address: result.events[0].data.address};
};

export const flowSendTransaction = async (testnet: boolean, body: TransferFlow):
    Promise<{ txId: string }> => {
    await validateBody(body, TransferFlow);
    let tokenAddress;
    let tokenName;
    let tokenStorage;
    if (body.currency === Currency.FLOW) {
        tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FlowToken : FLOW_MAINNET_ADDRESSES.FlowToken;
        tokenName = 'FlowToken';
        tokenStorage = 'flowToken';
    } else {
        tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FUSD : FLOW_MAINNET_ADDRESSES.FUSD;
        tokenName = 'FUSD';
        tokenStorage = 'fusd';
    }
    const code = prepareTransferFlow(testnet, tokenAddress, tokenName, tokenStorage);
    const args = [{value: parseFloat(body.amount).toFixed(8), type: 'UFix64'}, {value: body.to, type: 'Address'}];
    const pk = body.privateKey || await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, body.mnemonic as string, body.index as number);
    const auth = getSigner(pk, body.account);
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth});
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id};
};

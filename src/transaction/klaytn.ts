import { BigNumber } from 'bignumber.js';
import { TransactionConfig } from 'web3-core';
import { isHex, stringToHex, toHex, toWei } from 'web3-utils';
import { klaytnBroadcast } from '../blockchain';
import { validateBody } from '../connector/tatum';
import { CONTRACT_ADDRESSES, CONTRACT_DECIMALS, TATUM_API_URL, TRANSFER_METHOD_ABI } from '../constants';
import erc1155TokenABI from '../contracts/erc1155/erc1155_abi';
import erc1155TokenBytecode from '../contracts/erc1155/erc1155_bytecode';
import erc20_abi from '../contracts/erc20/token_abi';
import erc20TokenABI from '../contracts/erc20/token_abi';
import erc20TokenBytecode from '../contracts/erc20/token_bytecode';
import erc721CashbackTokenABI from '../contracts/erc721Cashback/erc721_abi';
import erc721CashbackTokenBytecode from '../contracts/erc721Cashback/erc721_bytecode';
import erc721Provenance_abi from '../contracts/erc721Provenance/erc721Provenance_abi';
import erc721Provenance_bytecode from '../contracts/erc721Provenance/erc721Provenance_bytecode';
import { auction, listing } from '../contracts/marketplace';
import {
  BurnErc20,
  BurnMultiToken,
  BurnMultiTokenBatch,
  CreateRecord,
  Currency,
  DeployErc20,
  DeployMarketplaceListing,
  DeployNftAuction,
  EthBurnErc721,
  EthBurnMultiToken,
  EthBurnMultiTokenBatch,
  EthDeployErc721,
  EthDeployMultiToken,
  EthMintErc721,
  EthMintMultipleErc721,
  EthTransferErc721,
  GenerateCustodialAddress,
  MintErc20,
  MintMultiToken,
  MintMultiTokenBatch,
  SmartContractMethodInvocation,
  SmartContractReadMethodInvocation,
  TransactionKMS,
  TransferErc20,
  TransferMultiToken,
  TransferMultiTokenBatch,
  UpdateCashbackErc721,
} from '../model';
import { mintNFT } from '../nft';
import { obtainCustodialAddressType } from '../wallet';
import Caver from 'caver-js'
import erc721GeneralTokenABI from '../contracts/erc721General/erc721_abi'
import erc721GeneralTokenBytecode from '../contracts/erc721General/erc721_bytecode'

/**
 * Estimate Gas price for the transaction.
 */
export const klayGetGasPriceInWei = async (client: Caver) => {
  return await client.klay.getGasPrice()
};

const prepareGeneralTx = async (client: Caver, testnet: boolean, fromPrivateKey?: string, signatureId?: string, to?: string, amount?: string, nonce?: number,
                                data?: string, gasLimit?: string, gasPrice?: string) => {
  const tx: TransactionConfig = {
    from: 0,
    to,
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    data,
    gas: gasLimit,
    nonce,
    gasPrice: gasPrice ? `0x${new BigNumber(toWei(gasPrice, 'gwei')).toString(16)}` : await klayGetGasPriceInWei(client),
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }
  tx.from = client.klay.accounts.wallet.getAccount(0).address
  tx.gas = gasLimit || await client.klay.estimateGas({ to, data: data || '', value: tx.value as string })
  // @ts-ignore
  return (await client.klay.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Send Klay transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnTransaction = async (testnet: boolean, body: TransferErc20, provider?: string) => {
  return klaytnBroadcast(await prepareKlaytnSignedTransaction(testnet, body, provider));
};

export const prepareKlaytnClient = (testnet: boolean, provider?: string, fromPrivateKey?: string) => {
  const client = new Caver(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/blockchain/node/KLAY/${process.env.TATUM_API_KEY}`);
  if (fromPrivateKey) {
    client.klay.accounts.wallet.clear()
    client.klay.accounts.wallet.add(fromPrivateKey)
    client.klay.defaultAccount = client.klay.accounts.wallet.getAccount(0).address
  }
  return client
}

/**
 * Sign Klay pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKlayKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
  if (tx.chain !== Currency.KLAY) {
    throw Error('Unsupported chain.')
  }
  const client = prepareKlaytnClient(testnet, provider, fromPrivateKey)
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  if (!transactionConfig.gas) {
    transactionConfig.gas = await client.klay.estimateGas({ to: transactionConfig.to, data: transactionConfig.data })
  }
  if (!transactionConfig.gasPrice || transactionConfig.gasPrice === '0' || transactionConfig.gasPrice === 0 || transactionConfig.gasPrice === '0x0') {
    transactionConfig.gasPrice = await klayGetGasPriceInWei(client)
  }
  // @ts-ignore
  return (await client.klay.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string
}

export const getKlayErc20ContractDecimals = async (testnet: boolean, contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await prepareKlaytnClient(testnet, provider)
  // @ts-ignore
  const contract = new client.klay.Contract(erc20_abi, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Sign Klay generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnGenerateCustodialWalletSignedTransaction = async (testnet: boolean, body: GenerateCustodialAddress, provider?: string) => {
  await validateBody(body, GenerateCustodialAddress)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  const { abi, code } = obtainCustodialAddressType(body)
  // @ts-ignore
  const contract = new client.klay.Contract(abi)
  const data = contract.deploy({
    data: code,
  }).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnSignedTransaction = async (testnet: boolean, body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20);
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey);
  let data;
  let to = body.to;
  if (body.currency === Currency.KLAY) {
    data = body.data ? (isHex(body.data) ? stringToHex(body.data) : toHex(body.data)) : undefined;
  } else {
    to = CONTRACT_ADDRESSES[body.currency as string];
    // @ts-ignore
    const contract = new client.klay.Contract([TRANSFER_METHOD_ABI], to);
    const digits = new BigNumber(10).pow(CONTRACT_DECIMALS[body.currency as string]);
    data = contract.methods.transfer(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  }
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.to, body.amount, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord);
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey);
  const hexData = isHex(body.data) ? stringToHex(body.data) : toHex(body.data);
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.to || client.klay.accounts.wallet.getAccount(0).address, undefined, body.nonce, hexData,
    body.ethFee?.gasLimit, body.ethFee?.gasPrice);
}

/**
 * Sign Klay mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintErc20SignedTransaction = async (testnet: boolean, body: MintErc20, provider?: string) => {
  await validateBody(body, MintErc20)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.klay.Contract(erc20TokenABI, body.contractAddress.trim().trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods
    .mint(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnBurnErc20SignedTransaction = async (testnet: boolean, body: BurnErc20, provider?: string) => {
  await validateBody(body, BurnErc20)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.klay.Contract(erc20TokenABI, body.contractAddress.trim().trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods
    .burn(`0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnTransferErc20SignedTransaction = async (testnet: boolean, body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20);
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey);
  const decimals = new BigNumber(10).pow(body.digits as number);
  // @ts-ignore
  const data = new client.klay.Contract(erc20TokenABI, body.contractAddress.trim().trim()).methods
    .transfer(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(decimals).toString(16)}`).encodeABI();
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, (body.contractAddress as string).trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice);
};

/**
 * Sign Klay deploy erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnDeployErc20SignedTransaction = async (testnet: boolean, body: DeployErc20, provider?: string) => {
  await validateBody(body, DeployErc20)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.klay.Contract(erc20TokenABI)
  const data = contract.deploy({
    data: erc20TokenBytecode,
    arguments: [
      body.name,
      body.symbol,
      body.address.trim(),
      body.digits,
      `0x${new BigNumber(body.totalCap || body.supply).multipliedBy(new BigNumber(10).pow(body.digits)).toString(16)}`,
      `0x${new BigNumber(body.supply).multipliedBy(new BigNumber(10).pow(body.digits)).toString(16)}`,
    ],
  }).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay mint erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintErc721SignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) => {
  await validateBody(body, EthMintErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc721CashbackTokenABI, body.contractAddress.trim()).methods
    .mintWithTokenURI(body.to.trim(), body.tokenId, body.url).encodeABI()
  if (body.contractAddress) {
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
      body.fee?.gasLimit, body.fee?.gasPrice)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign Klay mint cashback erc721 provenance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintErc721ProvenanceSignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) => {
  await validateBody(body, EthMintErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  const cb: string[] = []
  const fv: string[] = []
  if (body.cashbackValues && body.fixedValues && body.authorAddresses) {
    body.cashbackValues.map(c => cb.push(`0x${new BigNumber(c).multipliedBy(100).toString(16)}`));
    body.fixedValues.map(c => fv.push(`0x${new BigNumber(toWei(c, 'ether')).toString(16)}`));
  }
  if (body.erc20) {
    // @ts-ignore
    const data = new client.klay.Contract(erc721Provenance_abi, body.contractAddress.trim()).methods
      .mintWithTokenURI(body.to.trim(), body.tokenId, body.url, body.authorAddresses ? body.authorAddresses : [], cb, fv, body.erc20).encodeABI()
    if (body.contractAddress) {
      return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice)
    }
    throw new Error('Contract address should not be empty!')
  } else {
    // @ts-ignore
    const data = new client.klay.Contract(erc721Provenance_abi, body.contractAddress.trim()).methods
      .mintWithTokenURI(body.to.trim(), body.tokenId, body.url, body.authorAddresses ? body.authorAddresses : [], cb, fv).encodeABI()
    if (body.contractAddress) {
      return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice)
    }
    throw new Error('Contract address should not be empty!')
  }

}
/**
 * Sign Klay mint cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintCashbackErc721SignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) => {
  await validateBody(body, EthMintErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  const cashbacks: string[] = body.cashbackValues!
  const cb = cashbacks.map(c => `0x${new BigNumber(toWei(c, 'ether')).toString(16)}`)
  if (body.erc20) {
    // @ts-ignore
    const data = new client.klay.Contract(erc721CashbackTokenABI, body.contractAddress.trim()).methods
      .mintWithCashback(body.to.trim(), body.tokenId, body.url, body.authorAddresses, cb, body.erc20).encodeABI()
    if (body.contractAddress) {
      return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice)
    }
    throw new Error('Contract address should not be empty!')
  } else {
    // @ts-ignore
    const data = new client.klay.Contract(erc721CashbackTokenABI, body.contractAddress.trim()).methods
      .mintWithCashback(body.to.trim(), body.tokenId, body.url, body.authorAddresses, cb).encodeABI()
    if (body.contractAddress) {
      return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
        body.fee?.gasLimit, body.fee?.gasPrice)
    }
    throw new Error('Contract address should not be empty!')
  }

}
/**
 * Sign Klay mint multiple cashback erc721 provenance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintMultipleErc721ProvenanceSignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) => {
  await validateBody(body, EthMintMultipleErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  const cb: string[][] = []
  const fv: string[][] = []
  if (body.cashbackValues && body.fixedValues && body.authorAddresses) {
    for (let i = 0; i < body.cashbackValues.length; i++) {
      const cb2: string[] = []
      const fv2: string[] = []
      for (let j = 0; j < body.cashbackValues[i].length; j++) {
        cb2.push(`0x${new BigNumber(body.cashbackValues[i][j]).multipliedBy(100).toString(16)}`);
        fv2.push(`0x${new BigNumber(toWei(body.fixedValues[i][j], 'ether')).toString(16)}`);
      }
      cb.push(cb2)
      fv.push(fv2)
    }
  }
  if (body.erc20) {
    // @ts-ignore
    const data = new client.klay.Contract(erc721Provenance_abi, body.contractAddress.trim()).methods
      .mintMultiple(body.to.map(t => t.trim()), body.tokenId, body.url,
        body.authorAddresses ? body.authorAddresses : [], cb, fv, body.erc20).encodeABI()
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
      body.fee?.gasLimit, body.fee?.gasPrice)
  } else {
    // @ts-ignore
    const data = new client.klay.Contract(erc721Provenance_abi, body.contractAddress.trim()).methods
      .mintMultiple(body.to.map(t => t.trim()), body.tokenId, body.url,
        body.authorAddresses ? body.authorAddresses : [], cb, fv).encodeABI()
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
      body.fee?.gasLimit, body.fee?.gasPrice)
  }

}
/**
 * Sign Klay mint multiple cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintMultipleCashbackErc721SignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) => {
  await validateBody(body, EthMintMultipleErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  const cashbacks: string[][] = body.cashbackValues!
  const cb = cashbacks.map(cashback => cashback.map(c => `0x${new BigNumber(toWei(c, 'ether')).toString(16)}`))
  if (body.erc20) {
    // @ts-ignore
    const data = new client.klay.Contract(erc721CashbackTokenABI, body.contractAddress.trim()).methods
      .mintMultipleCashback(body.to.map(t => t.trim()), body.tokenId, body.url,
        body.authorAddresses, cb, body.erc20).encodeABI()
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
      body.fee?.gasLimit, body.fee?.gasPrice)
  } else {
    // @ts-ignore
    const data = new client.klay.Contract(erc721CashbackTokenABI, body.contractAddress.trim()).methods
      .mintMultipleCashback(body.to.map(t => t.trim()), body.tokenId, body.url,
        body.authorAddresses, cb).encodeABI()
    return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
      body.fee?.gasLimit, body.fee?.gasPrice)
  }

}

/**
 * Sign Klay mint multiple erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintMultipleErc721SignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) => {
  await validateBody(body, EthMintMultipleErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc721CashbackTokenABI, body.contractAddress.trim())
    .methods.mintMultiple(body.to.map(t => t.trim()), body.tokenId, body.url).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay burn erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnBurnErc721SignedTransaction = async (testnet: boolean, body: EthBurnErc721, provider?: string) => {
  await validateBody(body, EthBurnErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc721CashbackTokenABI, body.contractAddress.trim()).methods.burn(body.tokenId).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay transfer erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnTransferErc721SignedTransaction = async (testnet: boolean, body: EthTransferErc721, provider?: string) => {
  await validateBody(body, EthTransferErc721);
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey);
  // @ts-ignore
  const contract = new client.klay.Contract(body.provenance ? erc721Provenance_abi : erc721CashbackTokenABI, body.contractAddress.trim());
  const dataBytes = body.provenance ? Buffer.from(body.provenanceData + '\'\'\'###\'\'\'' + toWei(body.tokenPrice!, 'ether'), 'utf8') : '';
  const data = body.provenance ? contract.methods.safeTransfer(body.to.trim(), body.tokenId, `0x${dataBytes.toString('hex')}`).encodeABI() : contract.methods.safeTransfer(body.to.trim(), body.tokenId).encodeABI();
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), body.value, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice);
}

/**
 * Sign Klay update cashback for author erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnUpdateCashbackForAuthorErc721SignedTransaction = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) => {
  await validateBody(body, UpdateCashbackErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc721CashbackTokenABI, body.contractAddress.trim()).methods
    .updateCashbackForAuthor(body.tokenId, `0x${new BigNumber(toWei(body.cashbackValue, 'ether')).toString(16)}`).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay deploy erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnDeployErc721SignedTransaction = async (testnet: boolean, body: EthDeployErc721, provider?: string) => {
  await validateBody(body, EthDeployErc721)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  if (body.provenance && body.cashback) {
    throw new Error('Only one of provenance or cashback must be present and true.')
  }
  let abi = erc721GeneralTokenABI
  let deployData = erc721GeneralTokenBytecode
  if (body.provenance) {
    abi = erc721Provenance_abi
    deployData = erc721Provenance_bytecode
  } else if (body.cashback) {
    abi = erc721CashbackTokenABI
    deployData = erc721CashbackTokenBytecode
  }
  // @ts-ignore
  const data = new client.klay.Contract(abi).deploy({
    arguments: [body.name, body.symbol, body.publicMint ? body.publicMint : false],
    data: deployData,
  }).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareKlaytnDeployMarketplaceListingSignedTransaction = async (testnet: boolean, body: DeployMarketplaceListing, provider?: string) => {
  await validateBody(body, DeployMarketplaceListing);
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey);
  // @ts-ignore
  const data = new client.klay.Contract(listing.abi).deploy({
    arguments: [body.marketplaceFee, body.feeRecipient],
    data: listing.data,
  }).encodeABI();
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice);
}
/**
 * Sign Klay deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareKlaytnDeployAuctionSignedTransaction = async (testnet: boolean, body: DeployNftAuction, provider?: string) => {
  await validateBody(body, DeployNftAuction);
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey);
  // @ts-ignore
  const data = new client.klay.Contract(auction.abi).deploy({
    arguments: [body.auctionFee, body.feeRecipient],
    data: auction.data,
  }).encodeABI();
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice);
};

/**
 * Sign Klay burn multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnBurnMultiTokenSignedTransaction = async (testnet: boolean, body: EthBurnMultiToken, provider?: string) => {
  await validateBody(body, EthBurnMultiToken)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .burn(body.account.trim(), body.tokenId, body.amount).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay burn multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: EthBurnMultiTokenBatch, provider?: string) => {
  await validateBody(body, EthBurnMultiTokenBatch)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .burnBatch(body.account.trim(), body.tokenId, body.amounts).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  await validateBody(body, TransferMultiToken)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .safeTransfer(body.to.trim(), body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0').encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay batch transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnBatchTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
  await validateBody(body, TransferMultiTokenBatch)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  const amts = body.amounts.map(amt => `0x${new BigNumber(amt).toString(16)}`)
  // @ts-ignore
  const data = new client.klay.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .safeBatchTransfer(body.to.trim(), body.tokenId.map(token => token.trim()), amts, body.data ? body.data : '0x0').encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay mint multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintMultiTokenSignedTransaction = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  await validateBody(body, MintMultiToken)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .mint(body.to.trim(), body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0').encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay mint multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
  await validateBody(body, MintMultiTokenBatch)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  const batchAmounts = body.amounts.map(amts => amts.map(amt => `0x${new BigNumber(amt).toString(16)}`))
  // @ts-ignore
  const data = new client.klay.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .mintBatch(body.to, body.tokenId, batchAmounts, body.data ? body.data : '0x0').encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, body.contractAddress.trim(), undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay deploy multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnDeployMultiTokenSignedTransaction = async (testnet: boolean, body: EthDeployMultiToken, provider?: string) => {
  await validateBody(body, EthDeployMultiToken)
  const client = await prepareKlaytnClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.klay.Contract(erc1155TokenABI).deploy({
    arguments: [body.uri, body.publicMint ? body.publicMint : false],
    data: erc1155TokenBytecode,
  }).encodeABI()
  return prepareGeneralTx(client, testnet, body.fromPrivateKey, body.signatureId, undefined, undefined, body.nonce, data,
    body.fee?.gasLimit, body.fee?.gasPrice)
}

/**
 * Sign Klay smart contract write method invocation transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klay Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKlaytnSmartContractWriteMethodInvocation = async (testnet: boolean, body: SmartContractMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractMethodInvocation)
  const {
    fromPrivateKey,
    fee,
    params,
    methodName,
    methodABI,
    contractAddress,
    nonce,
    amount,
    signatureId,
  } = body
  const client = await prepareKlaytnClient(testnet, provider, fromPrivateKey)

  const data = new client.klay.Contract([methodABI]).methods[methodName as string](...params).encodeABI()
  return prepareGeneralTx(client, testnet, fromPrivateKey, signatureId, contractAddress.trim(), amount, nonce, data,
    fee?.gasLimit, fee?.gasPrice)
}

export const sendKlaytnSmartContractReadMethodInvocationTransaction = async (testnet: boolean, body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const {
    params,
    methodName,
    methodABI,
    contractAddress,
  } = body
  const client = prepareKlaytnClient(testnet, provider)
  const contract = new client.klay.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send Klay smart store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnStoreDataTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintErc20SignedTransaction = async (testnet: boolean, body: MintErc20, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnMintErc20SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnBurnErc20SignedTransaction = async (testnet: boolean, body: BurnErc20, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnBurnErc20SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnTransferErc20SignedTransaction = async (testnet: boolean, body: TransferErc20, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnTransferErc20SignedTransaction(testnet, body, provider), body.signatureId);

/**
 * Send Klay deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnDeployErc20SignedTransaction = async (testnet: boolean, body: DeployErc20, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnDeployErc20SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintErc721SignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) => {
  if (!body.fromPrivateKey) {
    return mintNFT(body)
  }
  return klaytnBroadcast(await prepareKlaytnMintErc721SignedTransaction(testnet, body, provider), body.signatureId)
}

/**
 * Send Klay mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintCashbackErc721SignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnMintCashbackErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay mint cashback erc721 provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintErc721ProvenanceSignedTransaction = async (testnet: boolean, body: EthMintErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnMintErc721ProvenanceSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintMultipleCashbackErc721SignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnMintMultipleCashbackErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay mint multiple erc721 Provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintMultipleErc721ProvenanceSignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnMintMultipleErc721ProvenanceSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintMultipleErc721SignedTransaction = async (testnet: boolean, body: EthMintMultipleErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnMintMultipleErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnBurnErc721SignedTransaction = async (testnet: boolean, body: EthBurnErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnBurnErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay transfer erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnTransferErc721SignedTransaction = async (testnet: boolean, body: EthTransferErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnTransferErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnUpdateCashbackForAuthorErc721SignedTransaction = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnUpdateCashbackForAuthorErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnDeployErc721SignedTransaction = async (testnet: boolean, body: EthDeployErc721, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnDeployErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay burn multiple tokens erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnBurnMultiTokenSignedTransaction = async (testnet: boolean, body: BurnMultiToken, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnBurnMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnBurnMultiTokenBatchSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiToken, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnTransferMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay batch transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnBatchTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnBatchTransferMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintMultiTokenSignedTransaction = async (testnet: boolean, body: MintMultiToken, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnMintMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnMintMultiTokenBatchSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnDeployMultiTokenSignedTransaction = async (testnet: boolean, body: EthDeployMultiToken, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnDeployMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnGenerateCustodialWalletSignedTransaction = async (testnet: boolean, body: GenerateCustodialAddress, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnGenerateCustodialWalletSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Klay smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKlaytnSmartContractMethodInvocationTransaction = async (testnet: boolean,
                                                                         body: SmartContractMethodInvocation | SmartContractReadMethodInvocation, provider?: string) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendKlaytnSmartContractReadMethodInvocationTransaction(testnet, body as SmartContractReadMethodInvocation, provider)
  }
  return klaytnBroadcast(await prepareKlaytnSmartContractWriteMethodInvocation(testnet, body, provider), (body as SmartContractMethodInvocation).signatureId)
}
/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendKlaytnDeployMarketplaceListingSignedTransaction = async (testnet: boolean, body: DeployMarketplaceListing, provider?: string) =>
  klaytnBroadcast(await prepareKlaytnDeployMarketplaceListingSignedTransaction(testnet, body, provider), body.signatureId)

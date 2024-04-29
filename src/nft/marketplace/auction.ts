import BigNumber from 'bignumber.js';
import { get, post, put, validateBody } from '../../connector/tatum';
import erc1155_abi from '../../contracts/erc1155/erc1155_abi';
import erc721_abi from '../../contracts/erc721Cashback/erc721_abi';
import { auction } from '../../contracts/marketplace';
import { getErc20Decimals, prepareApproveErc20 } from '../../fungible';
import { helperBroadcastTx, helperGetWeb3Client, helperPrepareSCCall, normalizeAddress } from '../../helpers';
import {
  ApproveErc20,
  ApproveNftTransfer,
  CreateAuction,
  Currency,
  DeployNftAuction,
  InvokeAuctionOperation,
  UpdateAuctionFee,
  UpdateMarketplaceFeeRecipient,
} from '../../model';
import {
  prepareBscDeployAuctionSignedTransaction,
  prepareCeloDeployAuctionSignedTransaction,
  prepareEthDeployAuctionSignedTransaction,
  prepareKlaytnDeployAuctionSignedTransaction,
  prepareOneDeployAuctionSignedTransaction,
  preparePolygonDeployAuctionSignedTransaction,
} from '../../transaction';
import Caver from 'caver-js'
import { ZERO_ADDRESS } from '../../constants'

export interface Auction {
  /*
   address of the seller
   */
  seller: string;
  /*
   address of the token to sale
   */
  nftAddress: string;
  /*
   ID of the NFT
   */
  tokenId: string;
  /*
   if the auction is for ERC721 - true - or ERC1155 - false
   */
  isErc721: boolean;
  /*
   Block height of end of auction
   */
  endedAt: string;
  /*
   Block height, in which the auction started.
   */
  startedAt: string;
  /*
   optional - if the auction is settled in the ERC20 token or in native currency
   */
  erc20Address?: string;
  /*
   for ERC-1155 - how many tokens are for sale
   */
  amount: string;
  /*
   Ending price of the asset at the end of the auction
   */
  endingPrice: string;
  /*
   Actual highest bidder
   */
  bidder?: string;

  /*
   Actual highest bid
   */
  highestBid?: string;
}

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/MPAuctionFee" target="_blank">Tatum API documentation</a>
 */
export const getAuctionFee = async (chain: Currency, contractAddress: string): Promise<number> =>
  get(`/v3/blockchain/auction/auction/${chain}/${contractAddress}/fee`);

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/MPAuction" target="_blank">Tatum API documentation</a>
 */
export const getAuction = async (chain: Currency, contractAddress: string, auctionId: string): Promise<Auction> =>
  get(`/v3/blockchain/auction/auction/${chain}/${contractAddress}/auction/${auctionId}`);

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/MPAuctionRecipient" target="_blank">Tatum API documentation</a>
 */
export const getAuctionFeeRecipient = async (chain: Currency, contractAddress: string): Promise<{ address: string }> =>
  get(`/v3/blockchain/auction/auction/${chain}/${contractAddress}/recipient`);


/**
 * Deploy new smart contract for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
 * Before auction is created, seller must approve transfer of the NFT to the auction contract.
 * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
 * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
 * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
 * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const deployAuction = async (testnet: boolean, body: DeployNftAuction, provider?: string) => {
  if (body.signatureId) {
    return await post(`/v3/blockchain/auction`, body);
  }
  return helperBroadcastTx(body.chain, await prepareDeployAuction(testnet, body, provider))
};

/**
 * Prepare signed transaction for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
 * Before auction is created, seller must approve transfer of the NFT to the auction contract.
 * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
 * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
 * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
 * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareDeployAuction = async (testnet: boolean, body: DeployNftAuction, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return await prepareCeloDeployAuctionSignedTransaction(testnet, body, provider);
    case Currency.ONE:
      return await prepareOneDeployAuctionSignedTransaction(testnet, body, provider);
    case Currency.ETH:
      return await prepareEthDeployAuctionSignedTransaction(body, provider);
    case Currency.BSC:
      return await prepareBscDeployAuctionSignedTransaction(body, provider);
    case Currency.MATIC:
      return await preparePolygonDeployAuctionSignedTransaction(testnet, body, provider);
    case Currency.KLAY:
      return await prepareKlaytnDeployAuctionSignedTransaction(testnet, body, provider);
    default:
      throw new Error('Unsupported chain');
  }
};

/**
 * Update auction fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFee = async (testnet: boolean, body: UpdateAuctionFee, provider?: string) => {
  await validateBody(body, UpdateAuctionFee);
  const params = [`0x${new BigNumber(body.auctionFee).toString(16)}`];
  return await helperPrepareSCCall(testnet, body, UpdateAuctionFee, 'setAuctionFee', params, undefined, provider, auction.abi);
};

/**
 * Update auction fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFeeRecipient = async (testnet: boolean, body: UpdateMarketplaceFeeRecipient, provider?: string) => {
  await validateBody(body, UpdateMarketplaceFeeRecipient);
  const params = [body.feeRecipient];
  return await helperPrepareSCCall(testnet, body, UpdateMarketplaceFeeRecipient, 'setAuctionFeeRecipient', params, undefined, provider, auction.abi);
};

/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionApproveNftTransfer = async (testnet: boolean, body: ApproveNftTransfer, provider?: string) => {
  await validateBody(body, ApproveNftTransfer);
  const params = body.isErc721 ? [body.spender, `0x${new BigNumber(body.tokenId).toString(16)}`] : [body.spender, true];
  return await helperPrepareSCCall(testnet, body, ApproveNftTransfer, body.isErc721 ? 'approve' : 'setApprovalForAll', params, undefined, provider,
    body.isErc721 ? erc721_abi : erc1155_abi);
};

/**
 * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionApproveErc20Transfer = async (testnet: boolean, body: ApproveErc20, provider?: string) => {
  return prepareApproveErc20(testnet, body, provider);
};

/**
 * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
 * After auction is created, auction contract transfers the asset to the auction smart contract.
 * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCreate = async (testnet: boolean, body: CreateAuction, provider?: string) => {
  await validateBody(body, CreateAuction);

  if (await existsAuction(testnet, body.chain, body.id, body.contractAddress, provider )) {
    throw new Error(`Auction with id ${body.id} already exist`);
  }

  const params = [body.id, body.isErc721, body.nftAddress.trim(), `0x${new BigNumber(body.tokenId).toString(16)}`,
    body.seller.trim(), `0x${new BigNumber(body.amount || 0).toString(16)}`,
    `0x${new BigNumber(body.endedAt).toString(16)}`, body.erc20Address || '0x0000000000000000000000000000000000000000'];
  body.amount = undefined;
  return await helperPrepareSCCall(testnet, body, CreateAuction, 'createAuction', params, undefined, provider, auction.abi);
};

export const existsAuction = async (testnet: boolean, chain: Currency, id: string, contractAddress: string, provider?: string) => {
    let data = []
    try {
        const web3 = helperGetWeb3Client(testnet, chain, provider);
        const c = web3 instanceof Caver ? web3.klay : web3.eth
        // @ts-ignore
        const contract = new c.Contract(auction.abi, normalizeAddress(chain, contractAddress))
        data = await contract.methods.getAuction(id).call()
        if (data[0] === ZERO_ADDRESS.ZERO_ADDRESS_42_CHARS) {
            return false
        }
    } catch (e) {
        return false
    }
    return true
}

/**
 * Bid on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionBid = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  await validateBody(body, InvokeAuctionOperation);

  const web3 = helperGetWeb3Client(testnet, body.chain, provider);
  const c = web3 instanceof Caver ? web3.klay : web3.eth
  // @ts-ignore
  const a = await (new c.Contract(auction.abi, body.contractAddress)).methods.getAuction(body.id).call();
  let decimals = 18;
  let methodName = 'bid';
  const b: any = { ...body };
  if (a[6] !== '0x0000000000000000000000000000000000000000') {
    // @ts-ignore
    decimals = await getErc20Decimals(testnet, body.chain, a[6], provider);
    if (body.bidder) {
      methodName = 'bidForExternalBidder';
    }
  } else if (body.bidder) {
    throw new Error('Bidder could be present only for ERC20 based auctions.');
  } else {
    b.amount = body.amount ? body.amount : body.bidValue;
  }

  const params = [body.id, `0x${new BigNumber(body.bidValue).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`];
  if (body.bidder) {
    params.push(body.bidder.trim());
  }
  return await helperPrepareSCCall(testnet, b, InvokeAuctionOperation, methodName, params, undefined, provider, auction.abi);
};

/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCancel = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  await validateBody(body, InvokeAuctionOperation);
  const params = [body.id];
  return await helperPrepareSCCall(testnet, body, InvokeAuctionOperation, 'cancelAuction', params, undefined, provider, auction.abi);
};

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionSettle = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  await validateBody(body, InvokeAuctionOperation);
  const params = [body.id];
  return await helperPrepareSCCall(testnet, body, InvokeAuctionOperation, 'settleAuction', params, undefined, provider, auction.abi);
};

/**
 * Update auction fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionUpdateFee = async (testnet: boolean, body: UpdateAuctionFee, provider?: string) => {
  if (body.signatureId) {
    return await put(`v3/blockchain/auction/fee`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAuctionUpdateFee(testnet, body, provider))
}
/**
 * Update auction fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionUpdateFeeRecipient = async (testnet: boolean, body: UpdateMarketplaceFeeRecipient, provider?: string) => {
  if (body.signatureId) {
    return await put(`v3/blockchain/auction/recipient`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAuctionUpdateFeeRecipient(testnet, body, provider))
}
/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionApproveNftTransfer = async (testnet: boolean, body: ApproveNftTransfer, provider?: string) => {
  if (body.signatureId) {
    return await post(`/v3/blockchain/auction/approve`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAuctionApproveNftTransfer(testnet, body, provider))
}
/**
 * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionApproveErc20Transfer = async (testnet: boolean, body: ApproveErc20, provider?: string) => {
  if (body.signatureId) {
    return await post(`/v3/blockchain/token/approve`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAuctionApproveErc20Transfer(testnet, body, provider))
}
/**
 * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
 * After auction is created, auction contract transfers the asset to the auction smart contract.
 * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionCreate = async (testnet: boolean, body: CreateAuction, provider?: string) => {
  if (body.signatureId) {
    return await post(`/v3/blockchain/auction/sell`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAuctionCreate(testnet, body, provider))
};
/**
 * Bid auction on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionBid = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  if (body.signatureId) {
    return await post(`/v3/blockchain/auction/bid`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAuctionBid(testnet, body, provider))
}
/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionCancel = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  if (body.signatureId) {
    return await post(`/v3/blockchain/auction/cancel`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAuctionCancel(testnet, body, provider))
}

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionSettle = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  if (body.signatureId) {
    return await post(`/v3/blockchain/auction`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAuctionSettle(testnet, body, provider))
}


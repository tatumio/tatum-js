import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ethSDK = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const ethAuctionExample = async () => {
  const auction = await ethSDK.nft.auction.getAuction('0xe6e7340394958674cdf8606936d292f565e4ecc4', '1')

  const auctionFee = await ethSDK.nft.auction.getAuctionFee('0xe6e7340394958674cdf8606936d292f565e4ecc4')

  const auctionFeeRecipient = await ethSDK.nft.auction.getAuctionFeeRecipient(
    '0xe6e7340394958674cdf8606936d292f565e4ecc4',
  )

  const updateFeeTx = await ethSDK.nft.auction.updateFee({
    contractAddress: '0xe6e7340394958674cdf8606936d292f565e4ecc4',
    marketplaceFee: 1,
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const deployAuctionTx = await ethSDK.nft.auction.prepare.deployAuctionSignedTransaction('contractAddress')

  const updateFeeRecipientTx = await ethSDK.nft.auction.prepare.auctionUpdateFeeRecipientSignedTransaction({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const createAuctionTx = await ethSDK.nft.auction.prepare.createAuctionSignedTransaction({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nftAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    seller: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    erc20Address: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    amount: '1',
    tokenId: '100000',
    endedAt: 100000,
    isErc721: true,
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const approveNftSpendingTx = await ethSDK.nft.auction.prepare.auctionApproveNftTransferSignedTransaction({
    spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    isErc721: true,
    tokenId: '100000',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const approveErc20SpendingTx =
    await ethSDK.nft.auction.prepare.auctionApproveErc20TransferSignedTransaction(true, {
      amount: '100000',
      spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
      nonce: 0,
    })

  const bidAuctionTx = await ethSDK.nft.auction.prepare.auctionBidSignedTransaction(true, {
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    erc20Address: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    bidder: '0x587422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    bidValue: '1',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const cancelAuctionTx = await ethSDK.nft.auction.prepare.auctionCancelSignedTransaction({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    erc20Address: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })

  const settleAuctionTx = await ethSDK.nft.auction.prepare.auctionSettleSignedTransaction({
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    erc20Address: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
  })
}

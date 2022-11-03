import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const celoAuctionExample = async () => {
  const auction = await celoSDK.marketplace.auction.getAuction(
    '0xe6e7340394958674cdf8606936d292f565e4ecc4',
    '1',
  )

  const auctionFee = await celoSDK.marketplace.auction.getAuctionFee(
    '0xe6e7340394958674cdf8606936d292f565e4ecc4',
  )

  const auctionFeeRecipient = await celoSDK.marketplace.auction.getAuctionFeeRecipient(
    '0xe6e7340394958674cdf8606936d292f565e4ecc4',
  )

  const deployAuctionTx = await celoSDK.marketplace.auction.prepare.deployAuctionSignedTransaction({
    auctionFee: 100,
    feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    chain: 'CELO',
    feeCurrency: 'CELO',
  })

  const updateFeeRecipientTx =
    await celoSDK.marketplace.auction.prepare.auctionUpdateFeeRecipientSignedTransaction({
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
      fee: {
        gasLimit: '40000',
        gasPrice: '20',
      },
      amount: '10000',
      chain: 'CELO',
      feeCurrency: 'CELO',
    })

  const createAuctionTx = await celoSDK.marketplace.auction.prepare.createAuctionSignedTransaction({
    chain: 'CELO',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    nftAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    seller: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    erc20Address: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    amount: '1',
    endedAt: 100000,
    tokenId: '100000',
    isErc721: true,
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    feeCurrency: 'CELO',
  })

  const approveNftSpendingTx =
    await celoSDK.marketplace.auction.prepare.auctionApproveNftTransferSignedTransaction({
      chain: 'CELO',
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
      amount: '10000',
      feeCurrency: 'CELO',
    })

  const approveErc20SpendingTx =
    await celoSDK.marketplace.auction.prepare.auctionApproveErc20TransferSignedTransaction({
      chain: 'CELO',
      amount: '100000',
      spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
      nonce: 0,
      isErc721: true,
      tokenId: '1234',
      feeCurrency: 'CELO',
    })

  const bidAuctionTx = await celoSDK.marketplace.auction.prepare.auctionBidSignedTransaction({
    chain: 'CELO',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    bidder: '0x587422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    bidValue: '1',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    feeCurrency: 'CELO',
  })

  const cancelAuctionTx = await celoSDK.marketplace.auction.prepare.auctionCancelSignedTransaction({
    chain: 'CELO',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    feeCurrency: 'CELO',
  })

  const settleAuctionTx = await celoSDK.marketplace.auction.prepare.auctionSettleSignedTransaction({
    chain: 'CELO',
    contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    id: 'string',
    fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    nonce: 1,
    fee: {
      gasLimit: '40000',
      gasPrice: '20',
    },
    feeCurrency: 'CELO',
  })
}

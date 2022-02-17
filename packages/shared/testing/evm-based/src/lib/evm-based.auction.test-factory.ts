import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'
import {
  ChainApproveErc20,
  ChainApproveNftTransfer,
  ChainAuctionBid,
  ChainCancelAuction,
  ChainCreateAuction,
  ChainDeployAuction,
  ChainSettleAuction,
  ChainUpdateFeeRecipient,
} from '@tatumio/shared-blockchain-evm-based'

export const auctionTestFactory = {
  prepare: {
    deployAuctionSignedTransaction: (sdk: SdkWithAuctionFunctions, testData: BlockchainTestData) => {
      it('valid', async () => {
        const tx = await sdk.prepare.deployAuctionSignedTransaction(testData.AUCTIONS.DEPLOY.VALID)
        expectHexString(tx)
      })
      it('invalid address', async () => {
        try {
          await sdk.prepare.deployAuctionSignedTransaction(testData.AUCTIONS.DEPLOY.INVALID)
        } catch (e) {
          expect(e.toString()).toEqual(
            'Error: bad address checksum (argument="address", value="0x687422eEA2cB73B5d3e242bA5456b782919AFc86", code=INVALID_ARGUMENT, version=address/5.5.0) (argument="feeRecipient", value="0x687422eEA2cB73B5d3e242bA5456b782919AFc86", code=INVALID_ARGUMENT, version=abi/5.0.7)',
          )
        }
      })
    },
    auctionUpdateFeeRecipientSignedTransaction: (
      sdk: SdkWithAuctionFunctions,
      testData: BlockchainTestData,
    ) => {
      it('valid', async () => {
        const tx = await sdk.prepare.auctionUpdateFeeRecipientSignedTransaction(
          testData.AUCTIONS.UPDATE_FEE_RECIPIENT.VALID,
        )
        expectHexString(tx)
      })
      it('invalid address', async () => {
        try {
          await sdk.prepare.auctionUpdateFeeRecipientSignedTransaction(
            testData.AUCTIONS.UPDATE_FEE_RECIPIENT.INVALID,
          )
        } catch (e) {
          expect(e.toString()).toEqual(
            "Error: Provided address 0x687422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.",
          )
        }
      })
    },
    createAuctionSignedTransaction: (sdk: SdkWithAuctionFunctions, testData: BlockchainTestData) => {
      it('valid', async () => {
        const tx = await sdk.prepare.createAuctionSignedTransaction(testData.AUCTIONS.CREATE_AUCTION.VALID)
        expectHexString(tx)
      })
      it('invalid address', async () => {
        try {
          await sdk.prepare.createAuctionSignedTransaction(testData.AUCTIONS.CREATE_AUCTION.INVALID)
          fail()
        } catch (e) {
          expect(e.toString()).toEqual(
            "Error: Provided address 0x687422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.",
          )
        }
      })
    },
    auctionApproveNftTransferSignedTransaction: (
      sdk: SdkWithAuctionFunctions,
      testData: BlockchainTestData,
    ) => {
      it('valid', async () => {
        const tx = await sdk.prepare.auctionApproveNftTransferSignedTransaction(
          testData.AUCTIONS.APPROVE_NFT_SPENDING.VALID,
        )
        expectHexString(tx)
      })
      it('invalid address', async () => {
        try {
          await sdk.prepare.auctionApproveNftTransferSignedTransaction(
            testData.AUCTIONS.APPROVE_NFT_SPENDING.INVALID,
          )
        } catch (e) {
          expect(e.toString()).toEqual(
            "Error: Provided address 0x687422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.",
          )
        }
      })
    },
    auctionApproveErc20TransferSignedTransaction: (
      sdk: SdkWithAuctionFunctions,
      testData: BlockchainTestData,
    ) => {
      it('valid', async () => {
        const tx = await sdk.prepare.auctionApproveErc20TransferSignedTransaction(
          true,
          testData.AUCTIONS.APPROVE_ERC20_SPENDING.VALID,
        )
        expectHexString(tx)
      })
      it('invalid address', async () => {
        try {
          await sdk.prepare.auctionApproveErc20TransferSignedTransaction(
            true,
            testData.AUCTIONS.APPROVE_ERC20_SPENDING.INVALID,
          )
        } catch (e) {
          expect(e.toString()).toEqual(
            "Error: Provided address 0x687422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.",
          )
        }
      })
    },
    auctionBidSignedTransaction: (sdk: SdkWithAuctionFunctions, testData: BlockchainTestData) => {
      it('valid', async () => {
        const tx = await sdk.prepare.auctionBidSignedTransaction(true, testData.AUCTIONS.BID.VALID)
        expectHexString(tx)
      })
      it('invalid address', async () => {
        try {
          await sdk.prepare.auctionBidSignedTransaction(true, testData.AUCTIONS.BID.INVALID)
        } catch (e) {
          expect(e.toString()).toEqual(
            "Error: Provided address 0x487422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.",
          )
        }
      })
    },
    auctionCancelSignedTransaction: (sdk: SdkWithAuctionFunctions, testData: BlockchainTestData) => {
      it('valid', async () => {
        const tx = await sdk.prepare.auctionCancelSignedTransaction(testData.AUCTIONS.CANCEL.VALID)
        expectHexString(tx)
      })
      it('invalid address', async () => {
        try {
          await sdk.prepare.auctionCancelSignedTransaction(testData.AUCTIONS.CANCEL.INVALID)
        } catch (e) {
          expect(e.toString()).toEqual(
            "Error: Provided address 0x687422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.",
          )
        }
      })
    },
    auctionSettleSignedTransaction: (sdk: SdkWithAuctionFunctions, testData: BlockchainTestData) => {
      it('valid', async () => {
        const tx = await sdk.prepare.auctionSettleSignedTransaction(testData.AUCTIONS.SETTLE.VALID)
        expectHexString(tx)
      })
      it('invalid address', async () => {
        try {
          await sdk.prepare.auctionSettleSignedTransaction(testData.AUCTIONS.SETTLE.INVALID)
        } catch (e) {
          expect(e.toString()).toEqual(
            "Error: Provided address 0x687422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.",
          )
        }
      })
    },
  },
}

export interface SdkWithAuctionFunctions {
  getAuction(contractAddress: string, auctionId: string): Promise<Auction>
  getAuctionFee(contractAddress: string): Promise<number>
  getAuctionFeeRecipient(contractAddress: string): Promise<{ address?: string }>
  prepare: {
    deployAuctionSignedTransaction(body: ChainDeployAuction, provider?: string): Promise<string>
    auctionUpdateFeeRecipientSignedTransaction(body: ChainUpdateFeeRecipient, provider?): Promise<string>
    createAuctionSignedTransaction(body: ChainCreateAuction, provider?): Promise<string>
    auctionApproveNftTransferSignedTransaction(body: ChainApproveNftTransfer, provider?): Promise<string>
    auctionApproveErc20TransferSignedTransaction(testnet, body: ChainApproveErc20, provider?): Promise<string>
    auctionBidSignedTransaction(testnet, body: ChainAuctionBid, provider?): Promise<string>
    auctionCancelSignedTransaction(body: ChainCancelAuction, provider?): Promise<string>
    auctionSettleSignedTransaction(body: ChainSettleAuction, provider?): Promise<string>
  }
}

type Auction = {
  /**
   * Amount of NFTs to sold in this auction. Valid only for ERC1155 listings.
   */
  amount?: string
  /**
   * Address of the highest buyer, if exists.
   */
  bidder?: string
  /**
   * Address of the ERC20 token smart contract, which should be used for paying for the asset..
   */
  erc20Address?: string
  /**
   * If the listing is for ERC721 or ERC1155 token.
   */
  isErc721?: boolean
  /**
   * Block height this auction started at.
   */
  startedAt?: string
  /**
   * Block height this auction ended at.
   */
  endedAt?: string
  /**
   * Address of the NFT smart contract.
   */
  nftAddress?: string
  /**
   * Final auction price of the NFT asset in native currency or ERC20 token based on the presence of erc20Address field.
   */
  endingPrice?: string
  /**
   * Address of the seller.
   */
  seller?: string
  /**
   * Current highest bid of the NFT asset in native currency or ERC20 token based on the presence of erc20Address field.
   */
  highestBid?: string
}

import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'
import {
  ChainApproveErc20,
  ChainApproveNftTransfer,
  ChainAuctionBid,
  ChainCancelAuction,
  ChainDeployAuction,
  ChainSettleAuction,
  ChainUpdateFeeRecipient,
  CreateAuction,
} from '@tatumio/shared-blockchain-evm-based'
import { GanacheAccount } from './ganacheHelper'

export const auctionTestFactory = {
  prepare: {
    deployAuctionSignedTransaction: (sdk: SdkWithAuctionFunctions, accounts: GanacheAccount[]) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.deployAuctionSignedTransaction({
          feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          auctionFee: 150,
          fromPrivateKey: accounts[0].privateKey,
          nonce: 1,
          fee: {
            gasLimit: '300000',
            gasPrice: '20',
          },
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const nonce = 1
        const tx = await sdk.prepare.deployAuctionSignedTransaction({
          feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          auctionFee: 150,
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          nonce,
          fee: {
            gasLimit: '300000',
            gasPrice: '20',
          },
        })

        const json = JSON.parse(tx)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
      })
      it('invalid address', async () => {
        await expect(async () =>
          sdk.prepare.deployAuctionSignedTransaction({
            feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
            auctionFee: 150,
            fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
            nonce: 1,
            fee: {
              gasLimit: '300000',
              gasPrice: '20',
            },
          }),
        ).rejects.toThrow(
          'bad address checksum (argument="address", value="0x687422eEA2cB73B5d3e242bA5456b782919AFc86", code=INVALID_ARGUMENT, version=address/5.5.0) (argument="feeRecipient", value="0x687422eEA2cB73B5d3e242bA5456b782919AFc86", code=INVALID_ARGUMENT, version=abi/5.0.7)',
        )
      })
    },
    auctionUpdateFeeRecipientSignedTransaction: (
      sdk: SdkWithAuctionFunctions,
      accounts: GanacheAccount[],
    ) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.auctionUpdateFeeRecipientSignedTransaction({
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          fromPrivateKey: accounts[0].privateKey,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const tx = await sdk.prepare.auctionUpdateFeeRecipientSignedTransaction({
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
        })

        const json = JSON.parse(tx)

        expect(json.gasPrice).toBe('20000000000')
      })
      it('invalid address', async () => {
        await expect(async () =>
          sdk.prepare.auctionUpdateFeeRecipientSignedTransaction({
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
            feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
            fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
            fee: {
              gasLimit: '40000',
              gasPrice: '20',
            },
          }),
        ).rejects.toThrow(
          `Provided address 0x687422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.`,
        )
      })
    },
    createAuctionSignedTransaction: (sdk: SdkWithAuctionFunctions, accounts: GanacheAccount[]) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.createAuctionSignedTransaction({
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          nftAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          seller: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          erc20Address: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          id: 'string',
          amount: '1',
          tokenId: '100000',
          endedAt: 100000,
          isErc721: true,
          fromPrivateKey: accounts[0].privateKey,
          nonce: 1,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const nonce = 1

        const tx = await sdk.prepare.createAuctionSignedTransaction({
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          nftAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          seller: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          erc20Address: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          id: 'string',
          amount: '1',
          tokenId: '100000',
          endedAt: 100000,
          isErc721: true,
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          nonce: 1,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
        })

        const json = JSON.parse(tx)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
      })
      it('invalid address', async () => {
        await expect(async () =>
          sdk.prepare.createAuctionSignedTransaction({
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
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
          }),
        ).rejects.toThrow(
          `Provided address 0x687422eEA2cB73B5d3e242bA5456b782919AFc86 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.`,
        )
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
    createAuctionSignedTransaction(body: CreateAuction, provider?): Promise<string>
    auctionApproveNftTransferSignedTransaction(body: ChainApproveNftTransfer, provider?): Promise<string>
    auctionApproveErc20TransferSignedTransaction(testnet, body: ChainApproveErc20, provider?): Promise<string>
    auctionBidSignedTransaction(testnet, body: ChainAuctionBid, provider?): Promise<string>
    auctionCancelSignedTransaction(body: ChainCancelAuction, provider?): Promise<string>
    auctionSettleSignedTransaction(body: ChainSettleAuction, provider?): Promise<string>
  }
}

// TODO get rid of it
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

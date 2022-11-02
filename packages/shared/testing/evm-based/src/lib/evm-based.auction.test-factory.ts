import { expectHexString } from '@tatumio/shared-testing-common'
import {
  ApproveNftTransfer,
  AuctionBid,
  CancelAuction,
  CreateAuctionEvm,
  DeployNftAuction,
  SettleAuction,
  UpdateAuctionFeeRecipient,
} from '@tatumio/shared-blockchain-evm-based'
import { GanacheAccount } from './ganacheHelper'
import { invalidProvidedAddressWeb3ErrorMessage } from './evm-based.utils'

export const auctionTestFactory = {
  prepare: {
    deployAuctionSignedTransaction: (sdk: SdkWithAuctionFunctions, accounts: GanacheAccount[]) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.deployAuctionSignedTransaction({
          chain: 'ETH',
          feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          auctionFee: 150,
          fromPrivateKey: accounts[0].privateKey,
          nonce: 1,
          fee: {
            gasLimit: '300000',
            gasPrice: '1',
          },
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const nonce = 1
        const tx = await sdk.prepare.deployAuctionSignedTransaction({
          chain: 'ETH',
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
            chain: 'ETH',
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
          'bad address checksum (argument="address", value="0x687422eEA2cB73B5d3e242bA5456b782919AFc86", code=INVALID_ARGUMENT, version=address/5.7.0) (argument="feeRecipient", value="0x687422eEA2cB73B5d3e242bA5456b782919AFc86", code=INVALID_ARGUMENT, version=abi/5.7.0)',
        )
      })
    },
    auctionUpdateFeeRecipientSignedTransaction: (
      sdk: SdkWithAuctionFunctions,
      accounts: GanacheAccount[],
    ) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.auctionUpdateFeeRecipientSignedTransaction({
          chain: 'ETH',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          fromPrivateKey: accounts[0].privateKey,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
          amount: '1',
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const tx = await sdk.prepare.auctionUpdateFeeRecipientSignedTransaction({
          chain: 'ETH',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
          amount: '10000',
        })

        const json = JSON.parse(tx)

        expect(json.gasPrice).toBe('20000000000')
      })
      it('invalid address', async () => {
        await expect(async () =>
          sdk.prepare.auctionUpdateFeeRecipientSignedTransaction({
            chain: 'ETH',
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
            feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
            fromPrivateKey: accounts[0].privateKey,
            fee: {
              gasLimit: '40000',
              gasPrice: '20',
            },
            amount: '0.001',
          }),
        ).rejects.toThrowErrorWithMessageThatIncludes(
          invalidProvidedAddressWeb3ErrorMessage('0x687422eEA2cB73B5d3e242bA5456b782919AFc86'),
        )
      })
    },
    createAuctionSignedTransaction: (sdk: SdkWithAuctionFunctions, accounts: GanacheAccount[]) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.createAuctionSignedTransaction({
          chain: 'ETH',
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
          chain: 'ETH',
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
            chain: 'ETH',
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
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
          }),
        ).rejects.toThrowErrorWithMessageThatIncludes(
          invalidProvidedAddressWeb3ErrorMessage('0x687422eEA2cB73B5d3e242bA5456b782919AFc86'),
        )
      })
    },
    auctionApproveNftTransferSignedTransaction: (
      sdk: SdkWithAuctionFunctions,
      accounts: GanacheAccount[],
    ) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.auctionApproveNftTransferSignedTransaction({
          chain: 'ETH',
          spender: accounts[0].address,
          isErc721: true,
          tokenId: '100000',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          fromPrivateKey: accounts[0].privateKey,
          nonce: 1,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
          amount: '0.001',
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const nonce = 1
        const tx = await sdk.prepare.auctionApproveNftTransferSignedTransaction({
          chain: 'ETH',
          spender: accounts[0].address,
          isErc721: true,
          tokenId: '100000',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          nonce,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
          amount: '10000',
        })

        const json = JSON.parse(tx)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
      })
      it('invalid address', async () => {
        await expect(async () =>
          sdk.prepare.auctionApproveNftTransferSignedTransaction({
            chain: 'ETH',
            spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
            isErc721: true,
            tokenId: '100000',
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
            fromPrivateKey: accounts[0].privateKey,
            nonce: 1,
            fee: {
              gasLimit: '40000',
              gasPrice: '20',
            },
            amount: '0.001',
          }),
        ).rejects.toThrowErrorWithMessageThatIncludes(
          invalidProvidedAddressWeb3ErrorMessage('0x687422eEA2cB73B5d3e242bA5456b782919AFc86'),
        )
      })
    },
    auctionApproveErc20TransferSignedTransaction: (
      sdk: SdkWithAuctionFunctions,
      accounts: GanacheAccount[],
    ) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.auctionApproveErc20TransferSignedTransaction({
          chain: 'ETH',
          amount: '100000',
          spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          fromPrivateKey: accounts[0].privateKey,
          nonce: 0,
          isErc721: false,
          tokenId: '1',
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const nonce = 1

        const tx = await sdk.prepare.auctionApproveErc20TransferSignedTransaction({
          chain: 'ETH',
          amount: '100000',
          spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          nonce: 0,
          isErc721: false,
          tokenId: '1',
        })

        const json = JSON.parse(tx)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
      })
      it('invalid address', async () => {
        await expect(async () =>
          sdk.prepare.auctionApproveErc20TransferSignedTransaction({
            chain: 'ETH',
            amount: '100000',
            spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
            fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
            nonce: 0,
            isErc721: false,
            tokenId: '1',
          }),
        ).rejects.toThrowErrorWithMessageThatIncludes(
          invalidProvidedAddressWeb3ErrorMessage('0x687422eEA2cB73B5d3e242bA5456b782919AFc86'),
        )
      })
    },
    auctionBidSignedTransaction: (sdk: SdkWithAuctionFunctions, accounts: GanacheAccount[]) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.auctionBidSignedTransaction({
          chain: 'ETH',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          bidder: accounts[0].address,
          id: 'string',
          bidValue: '1',
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

        const tx = await sdk.prepare.auctionBidSignedTransaction({
          chain: 'ETH',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          bidder: accounts[0].address,
          id: 'string',
          bidValue: '1',
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
          sdk.prepare.auctionBidSignedTransaction({
            chain: 'ETH',
            contractAddress: '0x487422eEA2cB73B5d3e242bA5456b782919AFc85',
            bidder: '0x587422eEA2cB73B5d3e242bA5456b782919AFc85',
            id: 'string',
            bidValue: '1',
            fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
            nonce: 1,
            fee: {
              gasLimit: '40000',
              gasPrice: '20',
            },
          }),
        ).rejects.toThrowErrorWithMessageThatIncludes(
          invalidProvidedAddressWeb3ErrorMessage('0x687422eEA2cB73B5d3e242bA5456b782919AFc86'),
        )
      })
    },
    auctionCancelSignedTransaction: (sdk: SdkWithAuctionFunctions, accounts: GanacheAccount[]) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.auctionCancelSignedTransaction({
          chain: 'ETH',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          id: 'string',
          fromPrivateKey: accounts[0].privateKey,
          nonce: 1,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
          amount: '1',
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const nonce = 1

        const tx = await sdk.prepare.auctionCancelSignedTransaction({
          chain: 'ETH',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          id: 'string',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          nonce: 1,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
          amount: '1',
        })

        const json = JSON.parse(tx)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
      })
      it('invalid address', async () => {
        await expect(async () =>
          sdk.prepare.auctionCancelSignedTransaction({
            chain: 'ETH',
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
            id: 'string',
            fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
            nonce: 1,
            fee: {
              gasLimit: '40000',
              gasPrice: '20',
            },
            amount: '1',
          }),
        ).rejects.toThrowErrorWithMessageThatIncludes(
          invalidProvidedAddressWeb3ErrorMessage('0x687422eEA2cB73B5d3e242bA5456b782919AFc86'),
        )
      })
    },
    auctionSettleSignedTransaction: (sdk: SdkWithAuctionFunctions, accounts: GanacheAccount[]) => {
      it('valid from privateKey', async () => {
        const tx = await sdk.prepare.auctionSettleSignedTransaction({
          chain: 'ETH',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          id: 'string',
          fromPrivateKey: accounts[0].privateKey,
          nonce: 1,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
          amount: '1',
        })

        expectHexString(tx)
      })
      it('valid from signatureId', async () => {
        const nonce = 1

        const tx = await sdk.prepare.auctionSettleSignedTransaction({
          chain: 'ETH',
          contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          id: 'string',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          nonce: 1,
          fee: {
            gasLimit: '40000',
            gasPrice: '20',
          },
          amount: '10000',
        })

        const json = JSON.parse(tx)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
      })
      it('invalid address', async () => {
        await expect(async () =>
          sdk.prepare.auctionSettleSignedTransaction({
            chain: 'ETH',
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
            id: 'string',
            fromPrivateKey: accounts[0].privateKey,
            nonce: 1,
            fee: {
              gasLimit: '40000',
              gasPrice: '20',
            },
            amount: '0.001',
          }),
        ).rejects.toThrowErrorWithMessageThatIncludes(
          invalidProvidedAddressWeb3ErrorMessage('0x687422eEA2cB73B5d3e242bA5456b782919AFc86'),
        )
      })
    },
  },
}

export interface SdkWithAuctionFunctions {
  prepare: {
    deployAuctionSignedTransaction(body: DeployNftAuction, provider?: string): Promise<string>
    auctionUpdateFeeRecipientSignedTransaction(body: UpdateAuctionFeeRecipient, provider?): Promise<string>
    createAuctionSignedTransaction(body: CreateAuctionEvm, provider?): Promise<string>
    auctionApproveNftTransferSignedTransaction(body: ApproveNftTransfer, provider?): Promise<string>
    auctionApproveErc20TransferSignedTransaction(body: ApproveNftTransfer, provider?): Promise<string>
    auctionBidSignedTransaction(body: AuctionBid, provider?): Promise<string>
    auctionCancelSignedTransaction(body: CancelAuction, provider?): Promise<string>
    auctionSettleSignedTransaction(body: SettleAuction, provider?): Promise<string>
  }
}

import { BlockchainTestData } from '../shared-testing'

export const ETH_TEST_DATA: BlockchainTestData = {
  MAINNET: {
    XPUB: 'xpub6EmVHAqPHkSRgsS7Km6Ynmjg4Kup6aD2NjX1zmVEwuwvJZPGefgmmg5a36eBX8QZpfhtPu7qHgcMmehDMLivrm8gY2L7v8iQDmxyYVhxPUs',
    XPUB_REGEX: /xpub/,
    ADDRESS_0: '0xb9e379f99ca17a5009471bd2e8194123ec9eb497',
    ADDRESS_100: '0xc6776c6230adf9216646da8f68c9863493cf81df',
    PRIVATE_KEY_0: '0x1612736ca819d2c5907a07d4e4dfb91dd5a8b3691079289afaee824ddcfdf495',
    PRIVATE_KEY_100: '0x01c0a301a5387999ecd48f05c2485f895463332e503db22ac09361bae6af4dd5',
    CONTRACT_ADDRESS: '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea',
    ERC_721: {
      PRIVATE_KEY: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
      CONTRACT_ADDRESS: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
    },
  },
  TESTNET: {
    XPUB: 'xpub6Dwu4pG9LS4S3cSdR1nAoGL18AWLttx3WCYPqdvx3TPAEuemkbgdLSAQG13xPwTku21pkQsZjSuERGtiMsiNCVzzPnh1BVhwis2f1bYSYoH',
    XPUB_REGEX: /xpub/,
    ADDRESS_0: '0xe73f05a8b3b28e1afec4ab759101e79b28542440',
    ADDRESS_100: '0x7246d8f7184bdfbe730d309f337b9f706b2f15cc',
    PRIVATE_KEY_0: '0x254ac28e10916b3c2def004a37fec216649288ae71c8cac41faf106193263792',
    PRIVATE_KEY_100: '0x310d6940acde2a3e629e36fcd0f4bed1c2a1bc2613946836ffdd8d46e0e7cd15',
    CONTRACT_ADDRESS: '0xe6e7340394958674cdf8606936d292f565e4ecc4',
    ERC_20: {
      CONTRACT_ADDRESS: '0xa089e2375e315a911816dcf9ad482bd3bfc8ec11',
      PRIVATE_KEY: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
      ADDRESS: '0xfb99F8aE9b70A0C8Cd96aE665BBaf85A7E01a2ef',
    },
    MULTITOKEN: {
      CONTRACT_ADDRESS: '0xf659eb344f8226331a7c85778c4d02847e120d96',
      PRIVATE_KEY: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
      ADDRESS: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
    },
  },
  BLOCK_HASH: '0xa12dd4f56064bf056dd0a4b6f922894f61dd6d1bad9c929709d7f9941ae83945',
  BLOCK_HEIGHT: 10995793,
  TX_HASH: '0x52fcb688992398b5c517f70ad7f1828d08ca0d896686f72ce02823700ff502ec',
  INVALID_XPUB_ERROR: 'Non-base58 character',
  INVALID_XPUB_CHILD_INDEX_ERROR:
    'The value of "value" is out of range. It must be >= 0 and <= 4294967295. Received -1',
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR:
    'The value of "value" is out of range. It must be >= 0 and <= 4294967295. Received -1',
  INVALID_PRIVATE_KEY_ERROR: 'Expected private key to be an Uint8Array with length 32',
  AUCTIONS: {
    DEPLOY: {
      VALID: {
        feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        auctionFee: 150,
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '300000',
          gasPrice: '20',
        },
      },
      INVALID: {
        feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
        auctionFee: 150,
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '300000',
          gasPrice: '20',
        },
      },
    },
    CREATE_AUCTION: {
      VALID: {
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
        bidValue: '10',
      },
      INVALID: {
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
        bidValue: '10',
      },
    },
    UPDATE_FEE_RECIPIENT: {
      VALID: {
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
      },
      INVALID: {
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
        feeRecipient: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
      },
    },
    UPDATE_FEE: {
      VALID: {
        contractAddress: '0xe6e7340394958674cdf8606936d292f565e4ecc4',
        marketplaceFee: 1,
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
      },
      INVALID: {
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
        marketplaceFee: 150,
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
      },
    },
    APPROVE_NFT_SPENDING: {
      VALID: {
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
      },
      INVALID: {
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
      },
    },
    APPROVE_ERC20_SPENDING: {
      VALID: {
        amount: '100000',
        spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 0,
      },
      INVALID: {
        amount: '100000',
        spender: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 0,
      },
    },
    BID: {
      VALID: {
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
      },
      INVALID: {
        contractAddress: '0x487422eEA2cB73B5d3e242bA5456b782919AFc86',
        bidder: '0x587422eEA2cB73B5d3e242bA5456b782919AFc85',
        id: 'string',
        bidValue: '1',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
      },
    },
    CANCEL: {
      VALID: {
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        id: 'string',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
        bidValue: '10',
      },
      INVALID: {
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
        id: 'string',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
        bidValue: '10',
      },
    },
    SETTLE: {
      VALID: {
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        id: 'string',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
        bidValue: '10',
      },
      INVALID: {
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc86',
        id: 'string',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
        nonce: 1,
        fee: {
          gasLimit: '40000',
          gasPrice: '20',
        },
        bidValue: '10',
      },
    },
  },
}

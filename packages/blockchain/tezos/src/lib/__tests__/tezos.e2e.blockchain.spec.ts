import { TatumTezosSDK } from '../tezos.sdk'
import {
  AddRemoveTokenMinter,
  BurnTezosToken,
  MintTezosToken,
  Token,
  TransferTezosToken,
  UpdateOperatorTezosToken,
} from '../services/tezos.tzip'

describe.skip('TatumTezosSDK - blockchain', () => {
  jest.setTimeout(15000)

  describe('Tezos NFT', () => {
    const testnet = 'https://rpc.ghostnet.teztnets.xyz'
    const contractAddress = 'KT1BwzBhJAQHz9oU2accmwJqLWDUom6P8gne'
    const addr1 = 'tz1cCRCbBwnazV6howgD84a6fuhikKTnsWHZ'
    const addr2 = 'tz1f1nboqWEhZJHwZnxnokQ9QoTiT21qMZxG'
    const addr3 = 'tz1LszyhzQS6JgySBSNkM55szM18inGwEgPa'
    const privateKey =
      'edskRvJQqeNih91dkoRkTG1PWxV5AruYbtrkp5DKibL2iMkPGWBbdYp8jpsY3N3skCNrwf9socTv9Sstonkckc4jTb4vMQCSpn'
    const privateKey2 =
      'edskSAMSXCK8bm5E1xfGGUJ8MrJjrTPBEr9oHfU1ULt6nR6e4Wg2xXufLxZpcKUdu5rDXrzhWZw8NnTak9cxpJ7hjvbojR7b4p'
    const privateKey3 =
      'edskRpaX9TSUavKNrE8t4AZNebieuFqqgAa9gJgvTnLNv4Yfq59CLhgEpiDeKLAwdDMvJk1gCdcNZJiGepmfJSiwNeVhHMNQSE'

    it('Should deploy TZIP-12 contract on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body = {
        privateKey: privateKey2,
        owner: addr1,
        metadata: JSON.stringify({
          name: 'contract name',
          symbol: 'TZ-gold',
          version: '1.26.0',
        }),
        minter: addr1,
      }

      const opHash = await sdk.nft({ tezosWeb }).deploy.tzip12(body, testnet)
      console.log(opHash)
    })

    it('Should mint a Tzip-12 tokens on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const token: Token = {
        id: '1',
        ipfs: 'ipfs://Qmcz7iquheYehi4rmA2v9ZWakxMJCJusC5K7Harz8WNdza',
      }

      const token2: Token = {
        id: '2',
        ipfs: 'ipfs://QmS7W7vtC6f3kSPUUkapVtW5bAXQvtn2tDDBDiBH1R3g2h',
      }
      const body: MintTezosToken = {
        contractAddress,
        owner: addr3,
        nfts: [token, token2],
        privateKey: privateKey2,
      }

      const tx = await sdk.nft({ tezosWeb }).mintTzip12(body, testnet)
      console.log(tx)
    })

    it('Should burn a Tzip-12 token on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: BurnTezosToken = {
        contractAddress,
        owner: addr1,
        tokens: ['1'],
        privateKey: privateKey3,
      }

      const tx = await sdk.nft({ tezosWeb }).burnTzip12(body, testnet)
      console.log(tx)
    })

    it('Should add an operator to a token on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: UpdateOperatorTezosToken = {
        contractAddress,
        owner: addr1,
        operator: addr2,
        tokenId: '7',
        privateKey,
      }

      const tx = await sdk.nft({ tezosWeb }).updateOperator(body, true, testnet)

      console.log(tx)
    })

    it('Should add a token minter', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: AddRemoveTokenMinter = {
        contractAddress,
        minter: addr3,
        privateKey: privateKey,
      }

      const tx = await sdk.nft({ tezosWeb }).addRemoveMinter(body, true, testnet)

      console.log(tx)
    })

    it('Should transfer a Tzip-12 token on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: TransferTezosToken = {
        contractAddress,
        from: addr2,
        to: addr3,
        tokenId: '1',
        amount: '1',
        privateKey: privateKey2,
      }

      const tx = await sdk.nft({ tezosWeb }).transferTzip12(body, testnet)
      console.log(tx)
    })

    it('Should estimate contract origination on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body = {
        privateKey,
        owner: addr1,
        metadata: JSON.stringify({
          name: 'contract name',
          symbol: 'TZ-gold',
          version: '1.26.0',
        }),
        minter: addr2,
      }

      const totalCost = await sdk.nft({ tezosWeb }).estimate.contractDeploy(body, testnet)
      console.log(totalCost)
    })

    it('Should estimate a token mint on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const token: Token = {
        id: '1',
        ipfs: 'ipfs://Qmcz7iquheYehi4rmA2v9ZWakxMJCJusC5K7Harz8WNdza',
      }

      const token2: Token = {
        id: '2',
        ipfs: 'ipfs://QmS7W7vtC6f3kSPUUkapVtW5bAXQvtn2tDDBDiBH1R3g2h',
      }

      const body: MintTezosToken = {
        contractAddress,
        owner: addr1,
        nfts: [token, token2],
        privateKey,
      }

      const totalCost = await sdk.nft({ tezosWeb }).estimate.tokenMint(body, testnet)

      console.log(totalCost)
    })

    it('Should estimate a token transfer on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb
      const body: TransferTezosToken = {
        contractAddress,
        from: addr2,
        to: addr3,
        tokenId: '1',
        amount: '1',
        privateKey: privateKey2,
      }

      const totalCost = await sdk.nft({ tezosWeb }).estimate.tokenTransfer(body, testnet)

      console.log(totalCost)
    })
  })
})

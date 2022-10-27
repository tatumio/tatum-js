import { TatumSolanaSDK } from '@tatumio/solana'
import { Currency } from '@tatumio/api-client'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Mint
 */
export async function solanaSplTokenExample() {
  // Lets create new SPL token
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const { txId, contractAddress } = (await solanaSDK.transaction.createSplToken({
    digits: 6,
    supply: '1000000',
    chain: Currency.SOL,
    address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    fromPrivateKey:
      '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
  })) as { txId: string; contractAddress: string }
  console.log(`Created SPL token: ${contractAddress} in tx: ${txId}`)

  const { txId: transferTx } = (await solanaSDK.transaction.transferSplToken({
    digits: 6,
    chain: Currency.SOL,
    to: '2NeZDp7HD1BEZ1Hpgx8RYwVY5GneGruvkYzoBY5iGK3g',
    from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
    amount: '100',
    fromPrivateKey:
      '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
    contractAddress,
  })) as { txId: string }
  console.log(`Transfered SPL tokens: ${contractAddress} in tx: ${transferTx}`)
}

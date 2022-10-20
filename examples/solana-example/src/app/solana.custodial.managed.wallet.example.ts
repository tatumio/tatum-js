import { TatumSolanaSDK } from '@tatumio/solana'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { Currency } from '@tatumio/api-client'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress
 */
export async function solanaTxWithCustodialManagedWallet() {
  // FROM represents a specific walletId from v3/custodial/wallet
  const from = 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ'
  const to = 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU'
  const amount = '0.000001'
  const FEE_PAYER = 'DSpHmb7hLnetoybammcJBJiyqMVR3pDhCuW6hqVg9eBF'

  const fromPubkey = new PublicKey(from)

  const transaction = new Transaction({ feePayer: new PublicKey(FEE_PAYER) })
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey(to),
      lamports: new BigNumber(amount).multipliedBy(LAMPORTS_PER_SOL).toNumber(),
    }),
  )
  // ANY RANDOM HASH SHOULD BE HERE - IT WILL BE REPLACED WITH CORRECT ONE
  transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
  const txData = transaction.compileMessage().serialize().toString('hex')

  const walletId = '5f9f1b9b-8c9e-4b9c-9b9b-8c9e4b9c9b9b'
  const { txId } = await solanaSDK.custodialManagedWallet.transfer({
    chain: Currency.SOL,
    txData,
    walletIds: [{ key: walletId, type: 'MANAGED' }],
  })
  console.log(`Transaction id is ${txId}`)
}

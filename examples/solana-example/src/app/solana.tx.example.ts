import { TatumSolanaSDK } from '@tatumio/solana'
import { TransactionHash } from '@tatumio/api-client'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Solana#operation/SolanaBlockchainTransfer
 */
export async function solanaTxWithPrivateKeyExample(): Promise<void> {
  // Send SOL from address to address
  const { txId } = (await solanaSDK.transaction.send({
    from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
    fromPrivateKey:
      'cb6ef9dc81967be3f9157a2dedf14d89fcf4b5fbb7cd2a9fcab7a600179d929cd840de2a454960308f688cd3ee308c1fa01ecfa0b03770aaaf3b52d71d46c31d',
    to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
    amount: '1',
  })) as TransactionHash
  console.log(`Transaction hash is ${txId}`)

  // You can use external fee payer, so SOL will be send from 1 address, but fees will be paid from another address
  // Send SOL from address to address
  const { txId: externalFeePayerTxId } = (await solanaSDK.transaction.send(
    {
      from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
      fromPrivateKey:
        'cb6ef9dc81967be3f9157a2dedf14d89fcf4b5fbb7cd2a9fcab7a600179d929cd840de2a454960308f688cd3ee308c1fa01ecfa0b03770aaaf3b52d71d46c31d',
      to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
      amount: '1',
    },
    undefined,
    'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
    '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
  )) as TransactionHash
  console.log(`Transaction hash is ${externalFeePayerTxId}`)
}

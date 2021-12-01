import { ASSOCIATED_TOKEN_PROGRAM_ID, MintLayout, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js'
import { BigNumber } from 'bignumber.js'
import BN from 'bn.js'
import { serialize } from 'borsh'
import { Currency, TATUM_API_URL, TransactionKMS, TransferErc721, validateBody } from '@tatumio/tatum-core'
import {
  createAssociatedTokenAccountInstruction,
  createMasterEditionInstruction,
  createMetadataInstruction,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
} from './solanaSchema/instructions'
import { CreateMasterEditionArgs, CreateMetadataArgs, METADATA_SCHEMA } from './solanaSchema/schema'
import { SolanaMintNft, SolanaNftMetadata, SolanaNftMetadataCreator, TransferSolana } from '../model'

const generateSolanaKeyPair = (privateKey: string) => Keypair.fromSecretKey(Buffer.from(privateKey, 'hex'))

export const getSolanaClient = (provider?: string) => {
  const url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/solana/node/${process.env.TATUM_API_KEY}`
  return new Connection(url, 'confirmed')
}

/**
 * Transfer SOL from account to another account.
 * @param body body of the request
 * @param provider optional URL of the Solana cluster
 */
export const sendSolana = async (body: TransferSolana, provider?: string) => {
  const transaction = new Transaction()

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(body.from),
      toPubkey: new PublicKey(body.to),
      lamports: new BigNumber(body.amount).multipliedBy(LAMPORTS_PER_SOL).toNumber(),
    })
  )

  if (body.signatureId) {
    return transaction.serialize().toString('hex')
  }

  return await sendAndConfirmTransaction(getSolanaClient(provider), transaction, [generateSolanaKeyPair(body.fromPrivateKey as string)])
}

// export const transferSolanaSlpToken = async (body: TransferSolanaSlp, provider?: string) => {
//   await validateBody(body, TransferSolanaSlp)
//   const connection = getSolanaClient(provider)
//   const from = new PublicKey(body.from as string)
//   const transaction = new Transaction({ feePayer: from })
//
//   const mint = new PublicKey(body.contractAddress)
//
//   const toTokenAccountAddress = (
//     await PublicKey.findProgramAddress(
//       [new PublicKey(body.to).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
//       SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
//     )
//   )[0]
//   try {
//     const data = await connection.getAccountInfo(new PublicKey(body.to))
//     if (!data) {
//       transaction.add(createAssociatedTokenAccountInstruction(toTokenAccountAddress, from, new PublicKey(body.to), mint))
//     }
//   } catch (e) {
//     transaction.add(createAssociatedTokenAccountInstruction(toTokenAccountAddress, from, new PublicKey(body.to), mint))
//   }
//
//   const fromTokenAddress = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mint, from)
//   transaction.add(
//     Token.createTransferInstruction(
//       TOKEN_PROGRAM_ID,
//       fromTokenAddress,
//       toTokenAccountAddress,
//       from,
//       [],
//       new BigNumber(body.amount).multipliedBy(10 ^ body.decimals).toNumber()
//     )
//   )
//
//   if (body.signatureId) {
//     return { txData: transaction.serialize().toString('hex') }
//   }
//
//   const wallet = generateSolanaKeyPair(body.fromPrivateKey as string)
//   return {
//     txId: await sendAndConfirmTransaction(connection, transaction, [wallet]),
//   }
// }

/**
 * Signs Solana KMS transaction
 * @param tx KMS pending transaction to sign
 * @param fromPrivateKey private key to sign
 * @param provider optional URL of the Solana cluster
 */
export const signSolanaKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, provider?: string) => {
  if (tx.chain !== Currency.SOL) {
    throw Error('Unsupported chain.')
  }
  const connection = getSolanaClient(provider)
  const transaction = JSON.parse(tx.serializedTransaction)
  const wallet = generateSolanaKeyPair(fromPrivateKey as string)
  const signers = []
  if (transaction.mintPK) {
    signers.push(generateSolanaKeyPair(transaction.mintPK))
  }
  signers.push(wallet)
  return await sendAndConfirmTransaction(connection, transaction.txData, signers)
}

/**
 * Transfer NFT on Solana network.
 * @param body body of the request
 * @param provider optional URL of the Solana cluster
 */
export const transferSolanaNft = async (body: TransferErc721, provider?: string) => {
  await validateBody(body, TransferErc721)
  const connection = getSolanaClient(provider)
  const from = new PublicKey(body.from as string)
  const transaction = new Transaction({ feePayer: from })

  const mint = new PublicKey(body.contractAddress)
  const toTokenAccountAddress = (
    await PublicKey.findProgramAddress(
      [new PublicKey(body.to).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0]
  transaction.add(createAssociatedTokenAccountInstruction(toTokenAccountAddress, from, new PublicKey(body.to), mint))

  const fromTokenAddress = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mint, from)
  transaction.add(Token.createTransferInstruction(TOKEN_PROGRAM_ID, fromTokenAddress, toTokenAccountAddress, from, [], 1))

  if (body.signatureId) {
    return { txData: transaction.serialize().toString('hex') }
  }

  const wallet = generateSolanaKeyPair(body.fromPrivateKey as string)
  return {
    txId: await sendAndConfirmTransaction(connection, transaction, [wallet]),
  }
}

/**
 * Mint new NFT on Solana. Fee is being paid by the minter.
 * @param body body of the request
 * @param provider optional URL of the Solana cluster
 */
export const mintSolanaNft = async (body: SolanaMintNft, provider?: string) => {
  await validateBody(body, SolanaMintNft)
  const connection = getSolanaClient(provider)
  const from = new PublicKey(body.from)
  const transaction = new Transaction({ feePayer: from })
  const mintRent = await connection.getMinimumBalanceForRentExemption(MintLayout.span)
  const mint = Keypair.generate()
  const instructions = []
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: from,
      newAccountPubkey: mint.publicKey,
      lamports: mintRent,
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID,
    })
  )
  instructions.push(Token.createInitMintInstruction(TOKEN_PROGRAM_ID, mint.publicKey, 0, from, null))

  const userTokenAccountAddress = (
    await PublicKey.findProgramAddress(
      [new PublicKey(body.to).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0]

  instructions.push(createAssociatedTokenAccountInstruction(userTokenAccountAddress, from, new PublicKey(body.to), mint.publicKey))

  const metadataAccount = (
    await PublicKey.findProgramAddress(
      [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0]
  const metadata = new SolanaNftMetadata(
    body.metadata.name,
    body.metadata.symbol,
    body.metadata.uri,
    body.metadata.sellerFeeBasisPoints,
    body.metadata.creators
  )
  if (body.metadata.creators) {
    metadata.creators = body.metadata.creators.map((c) => new SolanaNftMetadataCreator(c.address, c.verified, c.share))
  }
  const txnData = Buffer.from(
    serialize(
      METADATA_SCHEMA,
      new CreateMetadataArgs({
        data: metadata,
        isMutable: true,
      })
    )
  )

  instructions.push(createMetadataInstruction(metadataAccount, mint.publicKey, from, from, from, txnData))

  instructions.push(Token.createMintToInstruction(TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, from, [], 1))

  const editionAccount = (
    await PublicKey.findProgramAddress(
      [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer(), Buffer.from('edition')],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0]

  const masterEditionTxnData = Buffer.from(serialize(METADATA_SCHEMA, new CreateMasterEditionArgs({ maxSupply: new BN(0) })))

  instructions.push(createMasterEditionInstruction(metadataAccount, editionAccount, mint.publicKey, from, from, from, masterEditionTxnData))

  transaction.add(...instructions)

  if (body.signatureId) {
    return { txData: transaction.serialize().toString('hex'), mintPK: Buffer.from(mint.secretKey).toString('hex') }
  }

  const wallet = generateSolanaKeyPair(body.fromPrivateKey as string)
  const signers = [mint, wallet]
  return {
    txId: await sendAndConfirmTransaction(connection, transaction, [wallet, ...signers]),
    nftAddress: mint.publicKey.toBase58(),
    nftAccountAddress: userTokenAccountAddress.toBase58(),
  }
}

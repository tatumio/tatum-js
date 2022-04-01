import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { MintNftSolana, TransferNftSolana, TransferSolanaBlockchain } from '@tatumio/api-client'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { SolanaWeb3 } from './solana.web3'
import { ASSOCIATED_TOKEN_PROGRAM_ID, MintLayout, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {
  createAssociatedTokenAccountInstruction,
  createMasterEditionInstruction,
  createMetadataInstruction,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
} from '../schema/instructions'
import { serialize } from 'borsh'
import {
  CreateMasterEditionArgs,
  CreateMetadataArgs,
  METADATA_SCHEMA,
  SolanaNftMetadata,
  SolanaNftMetadataCreator,
} from '../schema'
import BN from 'bn.js'

export type TransferSolana = FromPrivateKeyOrSignatureId<TransferSolanaBlockchain>
export type TransferSolanaNft = FromPrivateKeyOrSignatureId<TransferNftSolana>
export type MintSolanaNft = FromPrivateKeyOrSignatureId<MintNftSolana>

const send = async (
  body: TransferSolana,
  web3: SolanaWeb3,
  provider?: string,
): Promise<{ txData: string } | { txId: string }> => {
  const fromPubkey = new PublicKey(body.from)
  const connection = web3.getClient(provider)

  const transaction = new Transaction({ feePayer: fromPubkey })
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey(body.to),
      lamports: new BigNumber(body.amount).multipliedBy(LAMPORTS_PER_SOL).toNumber(),
    }),
  )

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const signers = web3.generateKeyPair(body.fromPrivateKey)

  return {
    txId: await connection.sendTransaction(transaction, [signers]),
  }
}

const transferNft = async (body: TransferSolanaNft, web3: SolanaWeb3, provider?: string) => {
  const connection = web3.getClient(provider)
  const from = new PublicKey(body.from as string)
  const transaction = new Transaction({ feePayer: from })
  const walletAddress = new PublicKey(body.to)

  const mint = new PublicKey(body.contractAddress)

  const toTokenAccountAddress = (
    await PublicKey.findProgramAddress(
      [new PublicKey(body.to).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0]
  transaction.add(createAssociatedTokenAccountInstruction(toTokenAccountAddress, from, walletAddress, mint))

  const fromTokenAddress = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mint,
    from,
  )
  transaction.add(
    Token.createTransferInstruction(TOKEN_PROGRAM_ID, fromTokenAddress, toTokenAccountAddress, from, [], 1),
  )

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return { txData: transaction.compileMessage().serialize().toString('hex') }
  }

  const wallet = web3.generateKeyPair(body.fromPrivateKey)
  return {
    txId: await connection.sendTransaction(transaction, [wallet]),
  }
}

const mintNft = async (body: MintSolanaNft, web3: SolanaWeb3, provider?: string) => {
  const connection = web3.getClient(provider)
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
    }),
  )
  instructions.push(Token.createInitMintInstruction(TOKEN_PROGRAM_ID, mint.publicKey, 0, from, null))

  const userTokenAccountAddress = (
    await PublicKey.findProgramAddress(
      [new PublicKey(body.to).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    )
  )[0]

  instructions.push(
    createAssociatedTokenAccountInstruction(
      userTokenAccountAddress,
      from,
      new PublicKey(body.to),
      mint.publicKey,
    ),
  )

  const metadataAccount = (
    await PublicKey.findProgramAddress(
      [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0]

  const metadata = new SolanaNftMetadata(
    body.metadata.name,
    body.metadata.symbol,
    body.metadata.uri,
    body.metadata.sellerFeeBasisPoints,
    body.metadata.creators,
  )
  if (body.metadata.creators) {
    metadata.creators = body.metadata.creators.map(
      (c) => new SolanaNftMetadataCreator(c.address, c.verified, c.share),
    )
  }
  const txnData = Buffer.from(
    serialize(
      METADATA_SCHEMA,
      new CreateMetadataArgs({
        data: metadata,
        isMutable: true,
      }),
    ),
  )

  instructions.push(createMetadataInstruction(metadataAccount, mint.publicKey, from, from, from, txnData))

  instructions.push(
    Token.createMintToInstruction(TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, from, [], 1),
  )

  const editionAccount = (
    await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.publicKey.toBuffer(),
        Buffer.from('edition'),
      ],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0]

  const masterEditionTxnData = Buffer.from(
    serialize(METADATA_SCHEMA, new CreateMasterEditionArgs({ maxSupply: new BN(0) })),
  )

  instructions.push(
    createMasterEditionInstruction(
      metadataAccount,
      editionAccount,
      mint.publicKey,
      from,
      from,
      from,
      masterEditionTxnData,
    ),
  )

  transaction.add(...instructions)

  if (body.signatureId) {
    transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
    return {
      txData: transaction.compileMessage().serialize().toString('hex'),
      mintPK: Buffer.from(mint.secretKey).toString('hex'),
    }
  }

  const wallet = web3.generateKeyPair(body.fromPrivateKey as string)
  const signers = [mint, wallet]
  return {
    txId: await connection.sendTransaction(transaction, [wallet, ...signers]),
    nftAddress: mint.publicKey.toBase58(),
    nftAccountAddress: userTokenAccountAddress.toBase58(),
  }
}

export const solanaTxService = (args: { web3: SolanaWeb3 }) => {
  return {
    /**
     * Transfer SOL from account to another account.
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     */
    send: async (body: TransferSolana, provider?: string) => send(body, args.web3, provider),
    /**
     * Transfer NFT on Solana network.
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     */
    transferNft: async (body: TransferSolanaNft, provider?: string) => transferNft(body, args.web3, provider),
    /**
     * Mint new NFT on Solana. Fee is being paid by the minter.
     * @param body body of the request
     * @param provider optional URL of the Solana cluster
     */
    mintNft: async (body: MintSolanaNft, provider?: string) => mintNft(body, args.web3, provider),
  }
}
